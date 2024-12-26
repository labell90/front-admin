import axios from "axios";

export default {
    actions:{
        Module_Product_Prices_Index(_,items){
            return new Promise((resolve, reject) => {
                axios.get('users/products/'+items.product_id+'/prices').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })
        },

        Module_Product_Prices_Create(_,items){
            return new Promise((resolve, reject) => {
                axios.post('users/products/'+items.product_id+'/prices',items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Prices_Edit(_,items){
            return new Promise((resolve, reject) => {
                axios.put('users/products/'+items.product_id+'/prices/'+items.id,items).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Product_Prices_Delete(_,items){
            return new Promise((resolve, reject) => {
                axios.delete('users/products/'+items.product_id+'/prices/'+items.id).then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },






    }





}