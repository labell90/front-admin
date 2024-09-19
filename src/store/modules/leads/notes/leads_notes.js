import axios from "axios";

export default {
    actions:{

        Module_Lead_Note_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/'+items.params.lead_id+'/notes?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Note_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                let data = new FormData();
                if (items.reply_id){data.append( 'reply_id', items.reply_id)}
                if (items.note){data.append( 'note', items.note)}
                if (items.file){data.append( 'file', items.file,items.file.name)}
                axios.post('users/leads/leads/'+ items.lead_id +'/notes',data).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Lead_Note_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                let data = new FormData();
                if (items.reply_id){data.append( 'reply_id', items.reply_id)}
                if (items.note){data.append( 'note', items.note)}
                if (items.file){data.append( 'file', items.file,items.file.name)}
                axios.post('users/leads/leads/'+ items.lead_id +'/notes/'+items.id,data).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Note_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/'+ items.lead_id +'/notes/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }


}