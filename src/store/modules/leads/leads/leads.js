import axios from "axios";

export default {
    actions:{

        Module_Lead_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_All(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/all',{params : items}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Show(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/leads/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },

        Module_Lead_Action_Tags_Index(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/leads/'+item+'/tags').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },

        Module_Lead_Action_Tags_Update(_,items){

            return new Promise((resolve, reject) => {

                axios.post('users/leads/leads/'+items.id+'/tags',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },

        Module_Lead_Action_Restore(_,item){

            return new Promise((resolve, reject) => {

                axios.get('users/leads/leads/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })

            })

        },

        Module_Lead_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/leads/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Lead_Action_Single_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/leads/leads/single-update/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads/actions/delete',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Edit(_,items){
            return new Promise((resolve, reject) => {
                //Create Form data
                axios.post('users/leads/leads/actions/update',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Merge(_,items){
            return new Promise((resolve, reject) => {
                //Create Form data
                axios.post('users/leads/leads/actions/merge',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Text(_,items){
            return new Promise((resolve, reject) => {
                //Create Form data
                axios.post('users/leads/leads/actions/text',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Email(_,items){
            return new Promise((resolve, reject) => {
                //Create Form data
                axios.post('users/leads/leads/actions/email',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Actions_Note(_,items){
            return new Promise((resolve, reject) => {
                //Create Form data
                let data = new FormData();
                if (items.note){data.append( 'note', items.note)}
                if (items.ids) {
                    items.ids.forEach((id) => {
                        data.append('ids[]', id);
                    });
                }
                if (items.file){data.append( 'file', items.file,items.file.name)}
                axios.post('users/leads/leads/actions/note',data).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Lead_Action_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Lead_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Add_Field(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads/forms',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Get_Field(){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/forms').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Activation_Field(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/forms/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Required_Field(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/leads/leads/forms/change/required/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Delete_Field(_,item){
            return new Promise((resolve, reject) => {
                axios.delete('users/leads/leads/forms/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Lead_Action_Convert_Client(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads/convert/client/'+items.lead_id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Lead_Action_Convert_Customer(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/leads/leads/convert/customer/'+items.lead_id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



    }


}