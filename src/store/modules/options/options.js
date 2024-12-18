import axios from "axios";

export default {
    actions:{
        Module_Options_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/options?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Options_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/options/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Options_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/options/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Options_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/options/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Options_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/options/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Options_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/options/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Options_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/options',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Options_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/options/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Options_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/options/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Options_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/options/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Options_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/options/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}