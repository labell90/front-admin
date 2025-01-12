import axios from "axios";

export default {
    actions:{
        Module_Production_Types_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Production_Types_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },
        Module_Production_Types_Restore_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/productions/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Production_Types_Trash_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/trash?per_page='+items.per_page+'&page='+items.page,{params : items.params}).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Production_Types_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Production_Types_Restore(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/trash/restore/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Production_Types_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/productions/types',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Production_Types_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/productions/types/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Production_Types_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/productions/types/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Production_Types_Trash_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/productions/types/trash/delete/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },


        Module_Production_Types_Searchable(){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/searchable').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Production_Types_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/productions/types/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },





    }





}