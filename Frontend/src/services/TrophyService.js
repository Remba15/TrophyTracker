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

async function remove(id){
    return await HttpService.delete('/Trophy/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Trophy cannot be deleted!'}
    })
}

async function add(Trophy){
    return await HttpService.post('/Trophy', Trophy)
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
            return {error: true, message: 'Trophy cannot be added!'}
        }
    })
}

async function update(id, Trophy){
    return await HttpService.put('/Trophy/' + id, Trophy)
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
                console.log(messages)
                return {error: true, message: messages}
            default:
                return {error: true, message: 'Trophy cannot be updated!'}
        }
    })
}

export default{
    get,
    getById,
    remove,
    add,
    update
    
}

