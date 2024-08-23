import axios from "axios";

export default {
    actions:{

        Module_Lead_Utmsource_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/sources?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmsource_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/sources/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Utmsource_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/sources/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmsource_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/sources/trash/restore'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Utmsource_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/utm/sources',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmsource_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/utm/sources/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmsource_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/utm/sources/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmsource_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/utm/sources/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Utmsource_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/sources/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}