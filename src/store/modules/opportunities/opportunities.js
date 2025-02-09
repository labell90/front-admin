import axios from "axios";

export default {
    actions:{
        Module_Opportunities_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunities_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunities_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunities_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunities_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/opportunities',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunities_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/opportunities/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunities_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunities/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunities_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunities/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunities_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunities_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunities/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }
    }

}