import axios from "axios";

export default {
    actions:{
        Module_Product_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Product_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/products/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Product_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Product_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/products/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Action_Update_Special_Code(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/actions/update/special_code/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}