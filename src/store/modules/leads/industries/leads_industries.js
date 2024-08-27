import axios from "axios";

export default {
    actions:{

        Module_Lead_Industry_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/industries?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/industries/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Show(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/industries/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },
        Module_Lead_Industry_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/industries/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/industries',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Lead_Industry_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/industries/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/industries/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/industries/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Lead_Industry_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/industries/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Industry_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/industries/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



    }


}