import axios from "axios";


export default {

    actions : {

        //Users

        Module_Dashboard_Users_Online(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/users/onlines').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Dashboard_Users_Latest(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/users/latest').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        //Information
        Module_Dashboard_Info_Main(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/info/counter').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        //Leads

        Module_Dashboard_Leads_Latest(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/leads/latest').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },

        Module_Dashboard_Leads_Status(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/leads/statuses').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        },



    }

}