
import Task_Types_Create from "@/views/task_types/Task_Types_Create.vue";
import Task_Types_Index from "@/views/task_types/Task_Types_Index.vue";
import Task_Types_Edit from "@/views/task_types/Task_Types_Edit.vue";
import Task_Types_Trash from "@/views/task_types/Task_Types_Trash.vue";

const route_task_types = [
    {
        path : "/tasks/types",
        name : "task_types_index",
        component : Task_Types_Index,
        meta : {
            title : 'وظایف',
            subtitle : 'لیست وظایف '
        },
    },
    {
        path : "/tasks/types/trash",
        name : "task_types_trash",
        component : Task_Types_Trash,
        meta : {
            title : 'وظایف',
            subtitle : 'موارد حذف شده وظایف '
        },
    },
    {
        path : "/tasks/types/create",
        name : "task_types_create",
        component : Task_Types_Create,
        meta : {
            title : 'وظایف',
            subtitle : 'ایجاد وظایف'
        },
    },
    {
        path : "/tasks/types/edit/:id",
        name : "task_types_edit",
        component : Task_Types_Edit,
        meta : {
            title : 'وظایف',
            subtitle : 'ویرایش  وظایف'
        },
    },



]

export default route_task_types;