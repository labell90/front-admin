import axios from "axios";

export default {
    actions:{
        Module_Campaign_Types_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Campaign_Types_Action_All(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },


        Module_Campaign_Types_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Types_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Types_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Types_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/campaign_types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Types_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/campaign_types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Types_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaign_types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Types_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaign_types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Types_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Types_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/campaign_types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}