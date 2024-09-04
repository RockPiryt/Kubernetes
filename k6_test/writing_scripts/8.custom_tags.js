import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<300'],// tag for http request

        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'], // tag for checks

        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'] //tag for custom metric
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/6a89b353-d95b-4b9f-a958-cb22b8febcc9');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, 
        {
        'status is 200': (r) => r.status === 200
        }
    );

    // Submit order
    res = http.get('https://run.mocky.io/v3/39fea479-062c-4ec8-9722-d02762607e52?mocky-delay=2000ms',
        {
            tags: {
                page:'order' // tag for http request
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' }); //tag for custom metric
    }

    check(  res, 
            {'status is 201': (r) => r.status === 201},
            {page:'order'}  // tag for checks
    );

    sleep(1);
}
