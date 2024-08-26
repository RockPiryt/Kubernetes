import http from 'k6/http';
import { sleep } from 'k6';
import exec from 'k6/execution';


export const options = {
    vus: 10,
    duration: '60s'
}

export default function () {
    let res = http.get('https://test.k6.local/some-page');
    
    if (res.error){
        exec.test.abort('Abort test. Application is Down.');
    }


    sleep(1);
}