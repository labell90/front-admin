import axios from "axios";

export default {
    actions:{
        Module_Default_Stores_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Default_Stores_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Default_Stores_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/defaults/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Default_Stores_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Default_Stores_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Default_Stores_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Default_Stores_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/stores/defaults',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Default_Stores_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/stores/defaults/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Default_Stores_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/defaults/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Default_Stores_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/defaults/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



        Module_Default_Stores_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/defaults/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}