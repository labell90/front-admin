import axios from "axios";

export default {
    actions:{
        Module_Lead_Type_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Type_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Type_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Type_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Type_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}