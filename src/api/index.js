import service from '../service';

/* post
-----------------*/
export function postMethod(data) {
    return service.post('/url', data);
}
/* get
-----------------*/
export function getMethod(params) {
    return service.get('/url', { params });
}
