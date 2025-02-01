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
                axios.post('users/auth/login',item).then(response => {
                     resolve(response)
                }).catch(error =>{
                     reject(error);
                })

            })
        },

        //commit login
        Modules_Authenticate_Action_Save(state,item){
            state.commit("Modules_Authenticate_Mutation_Login",item);
        },

        //commit logout
        Modules_Authenticate_Action_Logout(state){
            state.commit("Modules_Authenticate_Mutation_Logout");
        },

    },

    mutations : {
        //fill Auth_User state and Save data in local storage
        Modules_Authenticate_Mutation_Login(state,item){
            state.Auth_User = item;
            localStorage.setItem('auth_token',item.token);
            localStorage.setItem('auth_user',JSON.stringify(item.user));
        },


        //Sync auth data from localstorage
        Modules_Authenticate_Mutation_Sync(state){
            if (localStorage.getItem('auth_token') && localStorage.getItem('auth_user')){
                state.Auth_User = {
                    "token" : localStorage.getItem('auth_token'),
                    "user" : JSON.parse(localStorage.getItem('auth_user'))
                }
            }
        },

        Modules_Authenticate_Mutation_Logout(state){
            state.Auth_User = [];
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        },

    },

    getters : {
        //check is authenticated
        Modules_Authenticate_Getter_Check(state){
            return !! state.Auth_User.token;
        },

        //get authenticated user
        Modules_Authenticate_Getter_User(state) {
            return state.Auth_User.user;
        },

        //get authenticated token
        Modules_Authenticate_Getter_Token(state) {
            return state.Auth_User.token;
        }


    }



}