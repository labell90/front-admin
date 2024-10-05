import axios from "axios";

export default {
    actions:{

        Module_Lead_Email_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/'+items.params.lead_id+'/emails?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Email_Action_Create(_,items){
            return new Promise((resolve, reject) => {

                axios.post('users/leads/leads/'+ items.lead_id +'/emails',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },





    }


}