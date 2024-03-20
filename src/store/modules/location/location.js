import axios from "axios";

export default {

    actions : {
        Module_Location_Action_Index(){
            return new Promise((resolve, reject) => {
                axios.get('public/location').then(response =>{
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                })
            })
        }

    }



}