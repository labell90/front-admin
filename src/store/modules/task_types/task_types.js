import axios from "axios";

export default {
    actions:{
        Module_Task_Types_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Task_Types_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Task_Types_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Types_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Types_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Types_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Types_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/tasks/types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Types_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/tasks/types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Types_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Types_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Task_Types_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}