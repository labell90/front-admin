import axios from "axios";

export default {
    actions:{
        Module_Product_Groups_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_Groups_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_Groups_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/groups/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Groups_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Groups_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Groups_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Groups_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/groups',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Groups_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/groups/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Groups_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/groups/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Groups_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/groups/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Product_Groups_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/groups/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}