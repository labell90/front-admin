import axios from "axios";

export default {
    actions:{
        Module_Lead_Resource_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/resources?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Resource_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/resources/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Resource_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/resources',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Resource_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/resources/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Resource_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/resources/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Resource_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/resources/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}