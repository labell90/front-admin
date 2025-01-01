
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports packages and libs
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import { Quasar , Notify ,LoadingBar, Dialog} from 'quasar'
import quasarLang from 'quasar/lang/fa-IR'
import methods from "@/includes/methods.js";

import '@/includes/axios.js';

import quasarIconSet from 'quasar/icon-set/mdi-v7'
// Import icon libraries
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
// Import Quasar css
import 'quasar/dist/quasar.css'
import '/src/assets/css/fonts.css'
import '/src/assets/css/animations.css'
import '/src/assets/css/helper.css'
import '/src/assets/css/responsive.css'
import moment from "moment-jalaali";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports Global Components
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import Global_Validations_Errors from "@/components/globals/validations/Global_Validations_Errors.vue";
import before_created from "@/includes/before_created.js";
import Template_Menu_Components_Sub_Menu from "@/components/template/menu/components/Template_Menu_Components_Sub_Menu.vue";
import Global_Loading_Shape from "@/components/globals/loadings/Global_Loading_Shape.vue";
import Global_Images_Select from "@/components/globals/images/Global_Images_Select.vue";
import Global_Actions_Delete_Item from "@/components/globals/actions/Global_Actions_Delete_Item.vue";
import Global_Actions_Activation_Item from "@/components/globals/actions/Global_Actions_Activation_Item.vue";
import Medias_Breadcrumb_Item from "@/views/medias/components/Medias_Breadcrumb_Item.vue";
import Global_Filter_Date from "@/components/globals/filters/Global_Filter_Date.vue";
import Global_Items_User from "@/components/globals/items/Global_Items_User.vue";
import Global_Actions_Restore_Item from "@/components/globals/actions/Global_Actions_Restore_Item.vue";
import Global_Searching_Full_Search from "@/components/globals/searching/Global_Searching_Full_Search.vue";
import Global_Searching_Sorting from "@/components/globals/searching/Global_Searching_Sorting.vue";
import Global_Images_Animation_No_Data from "@/components/globals/images/Global_Images_Animation_No_Data.vue";
import Global_Chips_Bool_Status from "@/components/globals/chips/Global_Chips_Bool_Status.vue";
import Global_Items_Form_Type_Icon from "@/components/globals/items/Global_Items_Form_Type_Icon.vue";
import Global_Filter_File_Type from "@/components/globals/filters/Global_Filter_File_Type.vue";
import Global_Item_File_View_By_Type from "@/components/globals/items/Global_Item_File_View_By_Type.vue";
import Leads_Profile_Notes_Item from "@/views/leads/leads/profile/components/Leads_Profile_Notes_Item.vue";
import Global_Images_Animation_Info from "@/components/globals/images/Global_Images_Animation_Info.vue";
import Global_Items_Lead from "@/components/globals/items/Global_Items_Lead.vue";
import Global_Actions_Multi_Actions from "@/components/globals/actions/Global_Actions_Multi_Actions.vue";
import Global_Actions_Header_Buttons from "@/components/globals/actions/Global_Actions_Header_Buttons.vue";
import Global_Item_Extra_Fields from "@/components/globals/items/Global_Item_Extra_Fields.vue";
import Global_Items_Tag_Single from "@/components/globals/items/Global_Items_Tag_Single.vue";
import Global_Filter_Date_Start from "@/components/globals/filters/Global_Filter_Date_Start.vue";
import Global_Filter_Date_End from "@/components/globals/filters/Global_Filter_Date_End.vue";



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = createApp(App)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals Components
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.component('global_validations_errors',Global_Validations_Errors)
app.component('global_menu_item',Template_Menu_Components_Sub_Menu)
app.component('global_loading_shape',Global_Loading_Shape)
app.component('global_images_select',Global_Images_Select)
app.component('global_images_animation_no_data',Global_Images_Animation_No_Data)
app.component('global_images_animation_info',Global_Images_Animation_Info)
app.component('global_actions_delete_item',Global_Actions_Delete_Item)
app.component('global_actions_restore_item',Global_Actions_Restore_Item)
app.component('global_actions_activation_item',Global_Actions_Activation_Item)
app.component('global_actions_multi_actions',Global_Actions_Multi_Actions)
app.component('global_actions_header_buttons',Global_Actions_Header_Buttons)
app.component('global_medias_breadcrumb',Medias_Breadcrumb_Item)
app.component('global_filter_date',Global_Filter_Date)
app.component('global_filter_date_start',Global_Filter_Date_Start)
app.component('global_filter_date_end',Global_Filter_Date_End)
app.component('global_filter_file_type',Global_Filter_File_Type)
app.component('global_items_user',Global_Items_User)
app.component('global_items_lead',Global_Items_Lead)
app.component('global_items_tag_single',Global_Items_Tag_Single)
app.component('global_items_extra_fields',Global_Item_Extra_Fields)
app.component("global_searching_full_search",Global_Searching_Full_Search)
app.component("global_searching_sorting",Global_Searching_Sorting)
app.component("global_chips_bool_status",Global_Chips_Bool_Status)
app.component("global_form_type_icon",Global_Items_Form_Type_Icon)
app.component("global_items_file_view_by_type",Global_Item_File_View_By_Type)
app.component("global_leads_note_item",Leads_Profile_Notes_Item)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// App configs and uses
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(router)
app.use(store)
app.use(Quasar, {

    plugins: {
        Notify,
        LoadingBar,
        Dialog
    }, // import Quasar plugins and add here
    lang: quasarLang,
    iconSet: quasarIconSet,

    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {

      },

    }

})
app.mixin(methods);
app.mixin(before_created);
window.moment = moment;


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals Filters
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.config.globalProperties.$filters={

    date_jalali(value,format='jYYYY/jM/jD  H:m:s'){
        return moment(value).format(format);
    },
    file_size(value){
        if (value === 0) return '0 Bytes';

        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(value) / Math.log(1024));

        return parseFloat((value / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    },
    number_format(value){
        if (value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.mount('#app')
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



