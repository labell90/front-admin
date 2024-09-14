import axios from "axios";

export default {
    actions:{

        Module_Lead_Document_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/'+items.params.lead_id+'/documents?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Document_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                //create form data
                let formData = new FormData();
                if (items.title){formData.append('title', items.title);}
                if (items.document){formData.append('document', items.document,items.document.name);}
                if (items.description){formData.append('description', items.description);}
                axios.post('users/leads/leads/'+ items.lead_id +'/documents',formData).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Lead_Document_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/leads/'+ items.lead_id +'/documents/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Document_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/'+ items.lead_id +'/documents/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }


}