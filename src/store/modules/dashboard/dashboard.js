import axios from "axios";


export default {

    actions : {
        Module_Dashboard_Users_Online(){
            return new Promise((resolve, reject) => {
                axios.get('users/dashboard/users/onlines').then(response =>{
                    return resolve(response);
                }).catch(error =>{
                    return reject(error);
                })
            })

        }

    }

}