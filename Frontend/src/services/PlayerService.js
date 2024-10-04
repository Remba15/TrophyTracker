import { HttpService } from "./HttpService";

async function get(){
    return await HttpService.get('/Player')
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Problem kod dohvaćanja igrača'}
    })
}

async function deletion(sifra){
    return await HttpService.delete('/Player/' + id)
    .then(()=>{
        return {error: false, message: 'Deleted'}
    })
    .catch(()=>{
        return {error: true, message: 'Error while deleting player'}
    })
}

export default{
    get,
    deletion
}