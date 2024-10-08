import axios from "axios";

export default {
    actions : {
        Modules_Profile_Action_Get_Information(){
            return new Promise((resolve, reject) => {
                axios.get('users/profile').then(response =>{
                    return resolve(response);
                }).catch(error => {
                    return reject(error);
                })
            })
        },
        Modules_Profile_Action_Edit_Information(_,item){
            return new Promise((resolve, reject) => {
                axios.put('users/profile',item).then(response =>{
                    return resolve(response);
                }).catch(error => {
                    return reject(error);
                })
            })
        },

    }



}