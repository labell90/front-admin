import axios from "axios";

export default {
    actions:{
        Module_personal_tags_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_personal_tags_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Personal_Tags_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Personal_Tags_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tags/personal/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_personal_tags_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_personal_tags_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/tags/personal',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_personal_tags_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/tags/personal/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Personal_Tags_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_personal_tags_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/tags/personal/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



        Module_personal_tags_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/tags/personal/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }




    }





}