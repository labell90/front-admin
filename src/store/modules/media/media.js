import axios from "axios";

export default {
    actions:{
        Module_Media_Action_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/media',
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
        Module_Media_Action_Show(_,item){
            return new Promise((resolve, reject) => {
                axios.get('users/media/'+item).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Media_Action_Create(_,items){
            //create form data
            let data = new FormData();
            if (items.folder_id){data.append('folder_id',items.folder_id)}
            if (items.title){data.append('title',items.title)}
            if (items.password){data.append('password',items.password)}
            if (items.media){data.append('media',items.media)}

            return new Promise((resolve, reject) => {
                axios.post('users/media',data).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Media_Action_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/media/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },
        Module_Media_Action_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/media/'+items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },




    }





}