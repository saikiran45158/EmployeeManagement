import axios from "axios";
import { userType } from "../types/user.types";

export default async  function authenticate(data:userType){
    const logina=`${process.env.HOST}/login`
    try{
        const receivedResponse=await axios.post(logina,data)
        const token:string=receivedResponse.data.token
        localStorage.setItem('token',token)
        return true
    }
    catch(err){
        if(axios.isAxiosError(err)){
            if(err.status===401||err.status===404)
                throw new Error('incorrect username or password')
            else{
                throw new Error(`server down wait for some time`)
            }
        }
        throw new Error('unexpected error occurs')
        
    }
}
