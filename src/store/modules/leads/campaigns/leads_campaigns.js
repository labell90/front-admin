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
                let formData = new FormData();
                if (items.title){formData.append('title', items.title);}
                if (items.document){formData.append('document', items.document,items.document.name);}
                if (items.description){formData.append('description', items.description);}
                axios.post('users/leads/leads/'+ items.lead_id +'/campaigns/'+items.id,formData).then(response =>{
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