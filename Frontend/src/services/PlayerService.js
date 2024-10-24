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

async function remove(id){
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
    .then((response) =>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let messages='';
                for(const key in e.response.data.errors){
                    messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                }
                return {error: true, message: messages}
            default:
                return {error: true, message: 'Player cannot be added!'}
        }
    })
}

async function getById(id){
    return await HttpService.get('/Player/' + id)
    .then((response) => {
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        return {error: true, message: 'Error while fetching player with id ' + id}
    })
}

async function update(id, player){
    return await HttpService.put('/Player/' + id, player)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let messages='';
                for(const key in e.response.data.errors){
                    messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                }
                console.log(messages)
                return {error: true, message: messages}
            default:
                return {error: true, message: 'Unable to update player info'}
        }
    })
}

export default{
    get,
    remove,
    add,
    getById,
    update
}