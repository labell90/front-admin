import axios from "axios";

export default {
    actions:{

        Module_Lead_Status_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Status_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Status_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/statuses',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/statuses/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/statuses/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/statuses/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Status_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Status_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/statuses/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}