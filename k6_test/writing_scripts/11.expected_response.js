import http from 'k6/http';
import { sleep, check, group} from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<2000'], //the most important metric
        'http_req_duration{expected_response:true}': ['p(95)<2000'], //the most important metric - page with staus 200/300 code

        'group_duration{group:::Main page}': ['p(95)<4000'], 
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'], 
        
        'group_duration{group:::News page}': ['p(95)<200']

    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/3b4fa360-ac51-4118-88f6-759244c1dcc9?mocky-delay=900ms');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () {
            http.get('https://run.mocky.io/v3/3b4fa360-ac51-4118-88f6-759244c1dcc9?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/3b4fa360-ac51-4118-88f6-759244c1dcc9?mocky-delay=900ms');
        })
    
    });

    group('News page', function () {
        http.get('https://run.mocky.io/v3/414a4e69-7ce0-43fe-aaa4-28ef3c950d45'); // http request status code 503 (unavailable)
        
    });

    sleep(1);
}