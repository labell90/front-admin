import axios from "axios";

export default {
    actions:{
        Module_Role_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/roles?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Role_Action_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Role_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Role_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Role_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/roles',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/roles/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/roles/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/roles/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




        Module_Role_Action_Accesses_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/accesses/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Accesses_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/roles/accesses/'+items.id,{access : items.access}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Role_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/roles/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}