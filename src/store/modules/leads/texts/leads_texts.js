import axios from "axios";

export default {
    actions:{

        Module_Lead_Text_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/'+items.params.lead_id+'/texts?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Text_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                let data = new FormData();
                if (items.text){data.append( 'text', items.text)}
                axios.post('users/leads/leads/'+ items.lead_id +'/texts',data).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Text_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/texts/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }


}