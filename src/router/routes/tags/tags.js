
import Tags_Create from "@/views/tags/Tags_Create.vue";
import Tags_Index from "@/views/tags/Tags_Index.vue";
import Tags_Edit from "@/views/tags/Tags_Edit.vue";
import Tags_Trash from "@/views/tags/Tags_Trash.vue";


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
        path : "/tags/trash",
        name : "tags_trash",
        component : Tags_Trash,
        meta : {
            title : 'تگ ها',
            subtitle : 'موارد حذف شده تگ ها '
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