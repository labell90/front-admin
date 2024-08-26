import axios from "axios";

export default {
    actions:{
        Module_Group_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/groups?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/groups/trash?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Group_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/groups/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/groups/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Group_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/groups',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/groups/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/groups/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/groups/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Group_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/groups/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Group_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/groups/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}