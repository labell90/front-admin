import {createStore} from "vuex";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports Modules
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import authenticate from "@/store/modules/authenticate/authenticate.js";
import profile from "@/store/modules/profile/profile.js";
import location from "@/store/modules/location/location.js";
import role from "@/store/modules/role/role.js";
import folders from "@/store/modules/folders/folders.js";
import medias from "@/store/modules/media/media.js";
import users from "@/store/modules/users/users.js";
import lead_categories from "@/store/modules/leads/categories/leads_categories.js";
import lead_resources from "@/store/modules/leads/resources/leads_resources.js";
import lead_statuses from "@/store/modules/leads/statuses/leads_statuses.js";
import campaigns from "@/store/modules/campaigns/campaigns.js";
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
        profile,
        location,
        role,
        folders,
        medias,
        users,
        lead_categories,
        lead_resources,
        lead_statuses,
        campaigns
    }





})

export default store;