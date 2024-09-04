import http from 'k6/http';
import { check } from 'k6';


export default function () {
    const res = http.get('https://test.k6.io');
    console.log(res.status)
    check (true, {
        'true is true': (value) => value === true
    });


    check (res, {
        'status is 200': (r) => r.status === 200
    });
    check (res, {
        'page is startpage': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    });


    const restwo = http.get('https://test.k6.io/foo');
    check (restwo, {
        'status is 404': (rb) => rb.status === 404
    });

}