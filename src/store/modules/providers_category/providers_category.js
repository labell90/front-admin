import axios from "axios";

export default {
    actions:{
        Module_Providers_Category_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Providers_Category_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Providers_Category_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/providers/categories/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Category_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Category_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Category_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Category_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/providers/categories',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Category_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/providers/categories/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Category_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/providers/categories/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Category_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/providers/categories/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Providers_Category_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/providers/categories/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}