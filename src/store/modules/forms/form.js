import axios from "axios";

export default {
    actions:{
        Module_Form_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/forms?per_page='+items.per_page+'&page='+items.page).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_All(){
            return new Promise((resolve, reject) => {
                axios.get('users/forms/all').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/forms/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/forms',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/forms/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/forms/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Form_Action_Activation(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/forms/change/activation/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}