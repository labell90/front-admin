import axios from "axios";

export default {
    actions:{
        Module_Stores_Types_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Stores_Types_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Stores_Types_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Stores_Types_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Stores_Types_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Types_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Stores_Types_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/stores/types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Types_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/stores/types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Types_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Types_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Stores_Types_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}