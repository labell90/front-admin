import axios from "axios";

export default {
    actions:{
        Module_Task_Statuses_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Task_Statuses_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Task_Statuses_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/statuses/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Statuses_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Statuses_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Statuses_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Task_Statuses_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/tasks/statuses',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Statuses_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/tasks/statuses/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Statuses_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/statuses/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Task_Statuses_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tasks/statuses/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Task_Statuses_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/tasks/statuses/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}