import axios from "axios";

export default {
    actions:{
        Module_Customer_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/customers?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Customer_Search(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/search',{params : items}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Customer_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Customer_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Customer_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Customer_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/customers',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Customer_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/customers/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Customer_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/customers/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Customer_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/customers/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Customer_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Customer_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/customers/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}