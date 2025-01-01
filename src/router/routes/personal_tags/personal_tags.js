
import Personal_Tags_Create from "@/views/personal_tags/Personal_Tags_Create.vue";
import Personal_Tags_Index from "@/views/personal_tags/Personal_Tags_Index.vue";
import Personal_Tags_Edit from "@/views/personal_tags/Personal_Tags_Edit.vue";
import Personal_Tags_Trash from "@/views/personal_tags/Personal_Tags_Trash.vue";



const route_personal_tags = [
    {
        path : "/tags/personal",
        name : "personal_tags_index",
        component : Personal_Tags_Index,
        meta : {
            title : 'تگ شخصی',
            subtitle : 'لیست تگ شخصی '
        },
    },

    {
        path : "/tags/personal/create",
        name : "personal_tags_create",
        component : Personal_Tags_Create,
        meta : {
            title : 'تگ شخصی',
            subtitle : 'ایجاد تگ شخصی'
        },
    },

    {
        path : "/tags/personal/trash",
        name : "personal_tags_trash",
        component : Personal_Tags_Trash,
        meta : {
            title : 'تگ شخصی',
            subtitle : 'موارد حذف شده تگ شخصی '
        },
    },
    {
        path : "/tags/personal/edit/:id",
        name : "personal_tags_edit",
        component : Personal_Tags_Edit,
        meta : {
            title : 'تگ شخصی',
            subtitle : 'ویرایش  تگ شخصی'
        },
    },



]

export default route_personal_tags;