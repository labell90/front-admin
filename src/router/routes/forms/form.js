
import Forms_Index from "@/views/forms/Forms_Index.vue";
import Forms_Create from "@/views/forms/Forms_Create.vue";
import Forms_Edit from "@/views/forms/Forms_Edit.vue";

const route_forms = [
    {
        path : "/forms",
        name : "forms_index",
        component : Forms_Index,
        meta : {
            title : 'فرم ها',
            subtitle : 'لیست فرم ها'
        },
    },
    {
        path : "/forms/create",
        name : "forms_create",
        component : Forms_Create,
        meta : {
            title : 'فرم ها',
            subtitle : 'ایجاد فرم'
        },
    },
    {
        path : "/forms/edit/:id",
        name : "forms_edit",
        component : Forms_Edit,
        meta : {
            title : 'فرم ها',
            subtitle : 'ویرایش فرم'
        },
    },



]

export default route_forms;