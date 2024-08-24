import axios from "axios";

export default {
    actions:{
        Module_Lead_Advsource_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/advsources?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Advsource_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/advsources/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Advsource_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/advsources/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Advsource_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/advsources/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Advsource_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/advsources',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Advsource_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/advsources/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Advsource_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/advsources/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Advsource_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/advsources/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Advsource_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/advsources/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}