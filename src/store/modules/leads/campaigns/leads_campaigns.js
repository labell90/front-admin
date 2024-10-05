import axios from "axios";

export default {
    actions:{

        Module_Lead_Campaign_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/'+items.params.lead_id+'/campaigns?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Campaign_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads/'+ items.lead_id +'/campaigns',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Lead_Campaign_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/leads/'+ items.lead_id +'/campaigns/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Campaign_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/'+ items.lead_id +'/campaigns/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }


}