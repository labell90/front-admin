import axios from "axios";

export default {
    actions:{

        Module_Lead_Logs_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/logs/'+items.params.lead_id+'?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },





    }


}