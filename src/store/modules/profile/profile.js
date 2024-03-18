import axios from "axios";

export default {
    actions : {
        Modules_Profile_Action_Get_Information(){
            return new Promise((resolve, reject) => {
                axios.get('profile').then(response =>{
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        }



    }



}