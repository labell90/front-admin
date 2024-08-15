import axios from "axios";

export default {
    actions:{

        Module_Lead_Utmmedium_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/mediums?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmmedium_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/mediums/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmmedium_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/utm/mediums',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmmedium_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/utm/mediums/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmmedium_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/utm/mediums/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Utmmedium_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/utm/mediums/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}