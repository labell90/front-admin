import axios from "axios";

export default {
    actions:{

        Module_Lead_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Show(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/leads/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },
        Module_Lead_Action_Restore(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/leads/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },

        Module_Lead_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Lead_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/leads/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

    }


}