import axios from "axios";

export default {
    actions:{
        Module_Product_Types_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_Types_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_Types_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Types_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Types_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Types_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Types_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Types_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Types_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Types_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Product_Types_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}