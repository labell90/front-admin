import axios from "axios";

export default {
    actions:{
        Module_Client_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/clients?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/clients/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Client_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/clients/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/clients/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/clients',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/clients/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/clients/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/clients/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/clients/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/clients/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}