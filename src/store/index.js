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
import leads_texts from "@/store/modules/leads/texts/leads_texts.js";
import leads_campaigns from "@/store/modules/leads/campaigns/leads_campaigns.js";
import leads_contacts from "@/store/modules/leads/contacts/leads_contacts.js";
import leads_emails from "@/store/modules/leads/emails/leads_emails.js";
import leads_logs from "@/store/modules/leads/logs/leads_logs.js";
import leads from "@/store/modules/leads/leads/leads.js";
import features from "@/store/modules/features/features.js";
import user_group from "@/store/modules/groups/user_group.js";
import form from "@/store/modules/forms/form.js";
import campaigns_statuses from "@/store/modules/campaigns_statuses/campaign_statuses.js"
import campaign_types from "@/store/modules/campaings_types/campaign_types.js";
import dashboard from "@/store/modules/dashboard/dashboard.js";
import client_groups from "@/store/modules/client_groups/client_groups.js";
import client from "@/store/modules/client/client.js";
import task_types from "@/store/modules/task_types/task_types.js";
import tags from "@/store/modules/tags/tags.js";
import personal_tags from "@/store/modules/peronal_tags/personal_tags.js";
import customer from "@/store/modules/customer/customer.js";
import product_groups from "@/store/modules/product_groups/product_groups.js";
import product_types from "@/store/modules/product_types/product_types.js";
import products from "@/store/modules/products/products.js";
import units from "@/store/modules/units/units.js";
import stores from "@/store/modules/stores/stores.js"
import options from "@/store/modules/options/options.js"
import stores_types from "@/store/modules/stores_types/stores_types.js";
import products_prices from "@/store/modules/products/products_prices.js";
import default_stores from "@/store/modules/default_stores/default_stores.js";
import production_types from "@/store/modules/production_types/production_types.js";
import helper from "@/store/modules/helpers/helper.js";
import providers_category from "@/store/modules/providers_category/providers_category.js";
import providers from "@/store/modules/providers/providers.js";
import opportunity_levels from "@/store/modules/opportunity_levels/opportunity_levels.js";
import opportunity_statuses from "@/store/modules/opportunity_statuses/opportunity_statuses.js";
import opportunities from "@/store/modules/opportunities/opportunities.js";
import products_coding from "@/store/modules/products_coding/products_coding.js";
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
        leads_texts,
        leads_emails,
        leads_logs,
        leads_campaigns,
        leads,
        leads_advsource,
        leads_contacts,
        features,
        user_group,
        form,
        campaigns_statuses,
        campaign_types,
        dashboard,
        client_groups,
        client,
        task_types,
        tags,
        personal_tags,
        customer,
        product_groups,
        product_types,
        products,
        units,
        options,
        stores_types,
        stores,
        products_prices,
        default_stores,
        production_types,
        helper,
        providers_category,
        providers,
        opportunity_levels,
        opportunity_statuses,
        opportunities,
        products_coding

    }


})

export default store;