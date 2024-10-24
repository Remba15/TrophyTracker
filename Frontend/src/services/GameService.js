import { HttpService } from "./HttpService";


async function get(){
    return await HttpService.get('/Game')
    .then((response)=>{
        return response.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getById(id){
    return await HttpService.get('/Game/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error:false, message: 'Game does not exist'}
    })
}

async function remove(id) {
    return await HttpService.delete('/Game/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Game cannot be deleted!'}
    })
}

async function add(Game){
    return await HttpService.post('/Game', Game)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        switch (e.status){
            case 400:
                let messages='';
                for(const key in e.response.data.errors){
                    messages += key + ": " + e.response.data.error[key][0] + '\n';
                }
                return {error: true, message: messages}
            default:
                return {error: true, message: 'Game cannot be added!'}
        }
    })
}

async function update(id, Game){
    return await HttpService.put('/Game/' + id, Game)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch((e)=>{
        switch (e.status){
            case 400:
                let messages=''
                for(const key in e.response.data.errors){
                    messages += key + ': ' + e.response.data.error[key][0] + '\n';
                }
                return {error: true, message: messages}
            default:
                return {error: true, message: 'Game cannot be changed!'}
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