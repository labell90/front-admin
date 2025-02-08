import axios from "axios";

export default {
    actions:{
        Module_Providers_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/providers?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Providers_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/providers/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Providers_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/providers/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/providers/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/providers/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/providers/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Providers_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/providers',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/providers/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/providers/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Providers_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/providers/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Providers_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/providers/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}