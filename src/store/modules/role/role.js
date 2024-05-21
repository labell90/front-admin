import axios from "axios";

export default {
    actions:{
        Module_Role_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/roles?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/roles',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}