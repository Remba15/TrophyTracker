import { HttpService } from './HttpService';

export async function logInService(data) {
  return await HttpService
    .post('/Authorization/token', data)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Authorization problem '}});
}