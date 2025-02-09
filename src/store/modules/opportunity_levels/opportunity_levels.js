import axios from "axios";

export default {
    actions:{
        Module_Opportunity_Levels_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Levels_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Levels_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Action_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Levels_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/opportunity/levels',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/opportunity/levels/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunity/levels/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/opportunity/levels/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Opportunity_Levels_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Opportunity_Levels_Action_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/opportunity/levels/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


    }

}