import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Achievement')
    .then((response)=>{
        return response.data
    })
    .catch((e)=>{console.error(e)})
}

async function getById(id){
    return await HttpService.get('/Achievement/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Achievement does not exist!'}
    })
}

async function add(Achievement){
    return await HttpService.post('/Achievement', Achievement)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        switch(e.status){
            case 400:
            let messages='';
            for(const key in e.response.data.errors){
                messages += key + ': ' + e.response.data.errors[key][0] + '\n';
            }
            return {error: true, message: messages}
        default:
            return {error: true, message: 'Achievement cannot be added!'}
        }
    })
}

async function remove(id){
    return await HttpService.delete('/Achievement/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Achievement cannot be deleted!'}
    })
}

export default{
    get,
    getById,
    remove,
    add
    
}