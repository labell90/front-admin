import axios from "axios";

export default {
    actions:{
        Module_Client_Groups_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Groups_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Client_Groups_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Groups_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Groups_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/client_groups',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Groups_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/client_groups/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Groups_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/client_groups/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Groups_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/client_groups/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Client_Groups_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Client_Groups_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/client_groups/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}