import axios from "axios";

export default {
    actions:{
        Module_Campaign_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaigns?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/campaigns/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaigns/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaigns/trash/restore'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/campaigns',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/campaigns/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaigns/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Campaign_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/campaigns/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Campaign_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/campaigns/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}