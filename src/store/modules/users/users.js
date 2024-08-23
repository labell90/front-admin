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
        Module_User_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/users/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
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
        Module_User_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/users/trash/restore/'+item).then(response =>{
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
        Module_User_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/users/trash/delete/'+items).then(response =>{
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

        Module_User_Action_Accesses_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/users/accesses/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_User_Action_Accesses_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/users/accesses/'+items.id,{access : items.access}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },





    }





}