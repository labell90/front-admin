import axios from "axios";

export default {
    actions:{
        Module_Products_Coding_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Products_Coding_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Products_Coding_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/coding/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Products_Coding_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Products_Coding_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Products_Coding_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Products_Coding_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/coding',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Products_Coding_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/coding/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Products_Coding_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/coding/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Products_Coding_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/coding/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Products_Coding_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/coding/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}