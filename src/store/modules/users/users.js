import axios from "axios";

export default {
    actions:{
        Module_User_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/users?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/users/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/users',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/users/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/users/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/users/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_User_Action_Features_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/users/accesses/'+items.id,items.accesses).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



    }





}