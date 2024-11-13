
import Tags_Create from "@/views/tags/Tags_Create.vue";
import Tags_Index from "@/views/tags/Tags_Index.vue";
import Tags_Edit from "@/views/tags/Tags_Edit.vue";


const route_tags = [
    {
        path : "/tags",
        name : "tags_index",
        component : Tags_Index,
        meta : {
            title : 'تگ ها',
            subtitle : 'لیست تگ ها '
        },
    },

    {
        path : "/tags/create",
        name : "tags_create",
        component : Tags_Create,
        meta : {
            title : 'تگ ها',
            subtitle : 'ایجاد تگ'
        },
    },
    {
        path : "/tags/edit/:id",
        name : "tags_edit",
        component : Tags_Edit,
        meta : {
            title : 'تگ ها',
            subtitle : 'ویرایش  تگ'
        },
    },



]

export default route_tags;