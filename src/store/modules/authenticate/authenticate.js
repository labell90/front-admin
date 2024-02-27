export default {

    state(){
        return {
            Auth_User : []
        }


    },

    actions :{
        //login
        Modules_Authenticate_Action_Login(_,item){
            return new Promise((resolve, reject) => {
                axios.post('auth/login',item).then(response => {
                     resolve(response)
                }).catch(error =>{
                     reject(error);
                })

            })
        },

        //commit login
        Modules_Authenticate_Action_Save(state,item){
            state.commit("Modules_Authenticate_Mutation_Login",item);
        }

    },

    mutations : {
        Modules_Authenticate_Mutation_Login(state,item){
            //fill Auth_User state and Save data in local storage
            state.Auth_User = item;
            localStorage.setItem('auth_token',item.token);
            localStorage.setItem('auth_user',JSON.stringify(item.user));
        }

    },

    getters : {
        //check is authenticated
        Modules_Authenticate_Getter_Check(state){
            return !! state.Auth_User.token;
        }

    }



}