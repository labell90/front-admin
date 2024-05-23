
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports packages and libs
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import { Quasar , Notify ,LoadingBar, Dialog} from 'quasar'
import quasarLang from 'quasar/lang/fa-IR'
import '/src/assets/css/fonts.css'
import '/src/assets/css/animations.css'
import methods from "@/includes/methods.js";
import '@/includes/axios.js';
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'
// Import icon libraries
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
// Import Quasar css
import 'quasar/dist/quasar.css'
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




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const app = createApp(App)


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals Components
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.component('global_validations_errors',Global_Validations_Errors)
app.component('global_menu_item',Template_Menu_Components_Sub_Menu)
app.component('global_loading_shape',Global_Loading_Shape)
app.component('global_images_select',Global_Images_Select)
app.component('global_actions_delete_item',Global_Actions_Delete_Item)


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
app.mount('#app')

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



