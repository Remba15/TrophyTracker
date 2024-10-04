import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Player')
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Error while fetching player'}
    })
}

async function deletion(id){
    return await HttpService.delete('/Player/' + id)
    .then(()=>{
        return {error: false, message: 'Deleted'}
    })
    .catch(()=>{
        return {error: true, message: 'Error while deleting player'}
    })
}

async function add(player){
    return await HttpService.post('/Player', player)
    .then(()=>{
        return {error: true, message: 'Error while adding player'}
    })
}

async function getById(id){
    return await HttpService.get('/Player/'+id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        return {error: true, message: 'Error while fetching player'}
    })
}

async function update(id, player){
    return await HttpService.put('/Player/' + id, player)
    .then(()=>{
        return {error: false, message: 'Updated'}
    })
    .catch(()=>{
        return {error:true, message: 'Error while updating player'}
    })
}

export default{
    get,
    deletion,
    add,
    getById,
    update
}