import axios from "axios";

export default {
    actions:{
        Module_Folders_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/folders',
                    {
                        params: items,
                    }
                    ).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Folders_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/folders/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Folders_Action_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/folders',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Folders_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/folders/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Folders_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/folders/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}