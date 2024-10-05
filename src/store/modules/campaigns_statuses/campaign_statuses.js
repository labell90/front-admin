import axios from "axios";

export default {
    actions:{
        Module_Campaign_Statuses_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Campaign_Statuses_Action_All(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Campaign_Statuses_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Statuses_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Statuses_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Statuses_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/campaign_statuses',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Statuses_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/campaign_statuses/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Statuses_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaign_statuses/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Statuses_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaign_statuses/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Statuses_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Statuses_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_statuses/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}