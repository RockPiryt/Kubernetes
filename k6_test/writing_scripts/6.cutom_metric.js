import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        // built-in metrics
        http_req_duration: ['p(95)<200'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['rate>4'],

        // custom metrics
        my_counter: ['count>10'],
        response_time_news_page: ['p(95)<150']
    }
}

// Create variable for custom metric
let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend ('response_time_news_page');


export default function () {
    let res = http.get('https://test.k6.io');
    myCounter.add(1); //use variable

    
    res = http.get('https://test.k6.io/news.php')
    newsPageResponseTrend.add(res.timings.duration);

    sleep(2);
}