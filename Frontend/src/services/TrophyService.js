import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Trophy')
    .then((response)=>{
        return response.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getById(id){
    return await HttpService.get('/Trophy/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Trophy does not exist!'}
    })
}

