import {QSpinnerGears, useQuasar} from 'quasar'


export default {

    mounted() {
        const $q = useQuasar();
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

        //Validations check and error message methods
        Methods_Validation_Check(errors=[],field){
            return !!(errors[field] && errors[field].length);
        },
        Methods_Validation_Notify(){
            this.Methods_Notify_Generator('اطلاعات ارسالی ناقض است!','red-7','fas fa-triangle-exclamation')
        },
        Methods_Validation_Errors(errors=[],field){
            return errors[field] && errors[field].length ? errors[field] : {};
        }


    }

}