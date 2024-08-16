import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
    tresholds: {
        http_req_duration: ['p(95)<100'],
        http_req_failed: ['rate<0.01']

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