import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    tresholds: {
        http_req_duration: ['p(95)<100'],
        http_req_failed: ['rate<0.01'],

        //Metric types
        http_reqs: ['count>20'], // count type              1,2,3,4...
        http_reqs: ['rate>4'], // rate type -               jedn/sek
        http_req_failed: ['rate<0.1'], // rate type
        vus: ['value>9'], // gauge type                     between 2 values
        http_req_duration: ['max<2000'] //trend             min, max, avg, p(90), p(95) 2000ms=2sek
    }
}

export default function () {
    const res = http.get('https://test.k6.io');
    console.log(res.status)


    check (res, {
        'status is 200': (r) => r.status === 200,
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    });

}