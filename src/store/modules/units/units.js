import axios from "axios";

export default {
    actions:{
        Module_Units_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/units?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Units_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/units/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Units_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/units/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Units_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/units/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Units_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/units/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Units_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/units/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Units_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/units',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Units_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/units/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Units_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/units/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Units_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/units/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}