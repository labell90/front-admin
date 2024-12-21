import axios from "axios";

export default {
    actions:{
        Module_Stores_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Stores_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Stores_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



        Module_Stores_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Stores_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/stores',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/stores/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Stores_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/stores/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



        Module_Stores_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/stores/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}