import {createStore} from "vuex";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports Modules
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import authenticate from "@/store/modules/authenticate/authenticate.js";
import profile from "@/store/modules/profile/profile.js";
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



const store = createStore({
    //States
    state(){
        return {

        }
    },

    //modules
    modules:{
        authenticate,
        profile
    }





})

export default store;