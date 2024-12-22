import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index.js"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports routes
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import route_main from "../router/routes/main.js";
import route_setting_profile from "@/router/routes/settings/profile.js";
import route_role from "@/router/routes/roles/roles.js"
import route_users from "@/router/routes/users/users.js"
import route_medias from "@/router/routes/medias/medias.js"
import route_lead_categories from "@/router/routes/leads/leads_categories.js"
import route_lead_resources from "@/router/routes/leads/leads_resources.js"
import route_lead_statuses from "@/router/routes/leads/leads_statuses.js"
import route_leads_industries from "@/router/routes/leads/leads_industries.js";
import route_campaigns from "@/router/routes/campaigns/campaigns.js"
import route_leads_types from "@/router/routes/leads/leads_types.js";
import route_leads from "@/router/routes/leads/leads.js";
import route_leads_utmmedium from "@/router/routes/leads/leads_utmmedium.js";
import route_leads_utmsource from "@/router/routes/leads/leads_utmsource.js";
import route_groups from "@/router/routes/groups/user_group.js";
import route_lead_advsource from '@/router/routes/leads/leads_advsource.js';
import route_forms from "@/router/routes/forms/form.js";
import route_features from "@/router/routes/features/features.js";
import route_campaigns_statuses from "@/router/routes/campaigns_statuses/campaigns_statuses.js";
import route_campaigns_types from "@/router/routes/campaigns_types/campaigns_types.js";
import route_client_groups from "@/router/routes/client_groups/client_groups.js";
import route_client from "@/router/routes/client/client.js";
import route_task_types from "@/router/routes/task_types/task_types.js";
import route_tags from "@/router/routes/tags/tags.js";
import route_personal_tags from "@/router/routes/personal_tags/personal_tags.js";
import route_task_statuses from "@/router/routes/task_statuses/task_statuses.js";
import route_product_groups from "@/router/routes/product_groups/product_groups.js";
import route_product_types from "@/router/routes/product_types/product_types.js";
import route_products from "@/router/routes/products/products.js";
import route_customer from "@/router/routes/customer/customer.js";
import units from "@/router/routes/units/units.js";
import route_units from "@/router/routes/units/units.js";
import route_options from "@/router/routes/options/options.js"
import route_stores_types from "@/router/routes/stores_types/stores_types.js";


const routes = [
    ...route_main,
    ...route_setting_profile,
    ...route_role,
    ...route_users,
    ...route_medias,
    ...route_lead_categories,
    ...route_lead_resources,
    ...route_lead_statuses,
    ...route_campaigns,
    ...route_leads_industries,
    ...route_leads_types,
    ...route_leads,
    ...route_leads_utmmedium,
    ...route_leads_utmsource,
    ...route_groups,
    ...route_lead_advsource,
    ...route_forms,
    ...route_features,
    ...route_campaigns_statuses,
    ...route_campaigns_types,
    ...route_client_groups,
    ...route_client,
    ...route_tags,
    ...route_personal_tags,
    ...route_customer,
    ...route_task_types,
    ...route_task_statuses,
    ...route_product_groups,
    ...route_product_types,
    ...route_products,
    ...route_units,
    ...route_options,
    ...route_stores_types

]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
 routes
})

// Check Authenticate
router.beforeEach((to, from, next) => {
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (to.path !== '/login' && !store.getters.Modules_Authenticate_Getter_Check) {
        next('/login');
    }else if (to.path === '/login' && store.getters.Modules_Authenticate_Getter_Check){
        next('/');
    }
    else {
        next();
    }
});

export default router;
