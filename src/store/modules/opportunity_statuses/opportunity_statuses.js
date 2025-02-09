import axios from "axios";

export default {
    actions:{
        Module_Opportunity_Statuses_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Statuses_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Statuses_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Statuses_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/opportunity/statuses',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/opportunity/statuses/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunity/statuses/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunity/statuses/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Statuses_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Statuses_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/statuses/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
    }

}