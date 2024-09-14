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
import lead_industries from "@/store/modules/leads/industries/leads_industries.js";
import lead_types from "@/store/modules/leads/types/leads_types.js";
import campaigns from "@/store/modules/campaigns/campaigns.js";
import leads_utmsource from "@/store/modules/leads/utmsource/leads_utmsource.js";
import leads_utmmedium from "@/store/modules/leads/utmmedium/leads_utmmedium.js";
import leads_advsource from "@/store/modules/leads/advsource/leads_advsource.js";
import leads_notes from "@/store/modules/leads/notes/leads_notes.js";
import leads_documents from "@/store/modules/leads/documents/leads_documents.js";
import leads from "@/store/modules/leads/leads/leads.js";
import features from "@/store/modules/features/features.js";
import user_group from "@/store/modules/groups/user_group.js";
import form from "@/store/modules/forms/form.js";
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
        lead_industries,
        lead_types,
        campaigns,
        leads_utmmedium,
        leads_utmsource,
        leads_notes,
        leads_documents,
        leads,
        leads_advsource,
        features,
        user_group,
        form
    }





})

export default store;