import axios from "axios";

export default {
    actions:{
        Module_Lead_Category_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Category_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Category_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Category_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Category_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/categories',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Category_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/categories/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Category_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/categories/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Category_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/categories/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Category_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Category_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/categories/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}