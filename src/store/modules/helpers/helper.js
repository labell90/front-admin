import axios from "axios";

export default {
    actions:{
        Module_Helpers_Action_All_Users(_,params){
            return new Promise((resolve, reject) => {
                axios.get('users/helpers/all/users',{params : params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },





    }





}