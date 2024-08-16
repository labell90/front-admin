import {QSpinnerGears, useQuasar} from 'quasar'
import moment from "moment-jalaali";

export default {

    mounted() {
        const $q = useQuasar();
        console.log(moment().format('jYYYY/jM/jD'))
    },
    methods:{

        //All notifications methods
        Methods_Notify_Generator(message,color='pink-7',icon='fas fa-envelope-open-text',caption=null,timeout=null,position='bottom'){
            this.$q.notify({
                message: message,
                color : color,
                icon : icon,
                progress : true,
                classes : 'glossy',
                caption : caption,
                timeout : timeout,
                badgeColor : 'dark',
                badgeClass : 'glossy',
                position : position
            })
        },
        Methods_Notify_Generator_Spinner(message,color='pink-7'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                spinner : QSpinnerGears
            })
        },
        Methods_Notify_Generator_Avatar(message,color='pink-7',avatar='assets/images/logo.png'){
            this.$q.notify({
                message: message,
                color : color,
                progress : true,
                classes : 'glossy',
                avatar : avatar
            })
        },

        //Default notification message
        Methods_Notify_Update(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت بروزرسانی شد','green-7','fa fa-check ');
        },
        Methods_Notify_Create(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت ثبت شد','green-7','fa fa-check ');

        },
        Methods_Notify_Delete(){
            this.Methods_Notify_Generator('اطلاعات باموفقیت حذف شد','green-7','fa fa-check ');

        },

        Methods_Notify_Error_Server(){
            this.Methods_Notify_Generator('خطای سرور : سرور پاسخگو نیست !','red-7','fa fa-times ');
        },

        Methods_Notify_Error_Internal(){
            this.Methods_Notify_Generator('خطای داخلی : سیستم پاسخگو نیست !','red-7','fa fa-times ');
        },

        Methods_Notify_Error_NotFound(){
            this.Methods_Notify_Generator('آیتم مورد نظر یافت نشد ! اطلاعات را بررسی کنید','red-7','fa fa-times ');
        },

        //Validations check and error message methods
        Methods_Validation_Check(errors=[],field){
            return !!(errors[field] && errors[field].length);
        },
        Methods_Validation_Notify(){
            this.Methods_Notify_Generator('اطلاعات ارسالی ناقص است!','red-7','fas fa-triangle-exclamation')
        },
        Methods_Validation_Errors(errors=[],field){
            return errors[field] && errors[field].length ? errors[field] : {};
        }



    }

}