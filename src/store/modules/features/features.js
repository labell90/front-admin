import axios from "axios";

export default {
    actions:{
        Module_Feature_Action_Index(){
            return new Promise((resolve, reject) => {
                axios.get('public/features').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

    }





}