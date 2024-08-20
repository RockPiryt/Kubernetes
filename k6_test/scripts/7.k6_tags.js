import http from 'k6/http';


export const options = {
    thresholds: {
        http_req_duration: ['p(95)<100'],
        'http_req_duration{status:200}': ['p(95)<100'],
        'http_req_duration{status:201}': ['p(95)<100'],
    }
}

//https://designer.mocky.io/design/confirmation
export default function () {
    http.get('https://run.mocky.io/v3/6a89b353-d95b-4b9f-a958-cb22b8febcc9'); //200
    http.get('https://run.mocky.io/v3/39fea479-062c-4ec8-9722-d02762607e52?mocky-delay=2000ms'); //201 with delay
}