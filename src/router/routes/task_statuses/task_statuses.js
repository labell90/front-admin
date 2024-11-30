
import Task_Statuses_Create from "@/views/task_statuses/Task_Statuses_Create.vue";
import Task_Statuses_Index from "@/views/task_statuses/Task_Statuses_Index.vue";
import Task_Statuses_Edit from "@/views/task_statuses/Task_Statuses_Edit.vue";
import Task_Statuses_Trash from "@/views/task_statuses/Task_Statuses_Trash.vue";

const route_task_statuses = [
    {
        path : "/tasks/statuses",
        name : "task_statuses_index",
        component : Task_Statuses_Index,
        meta : {
            title : ' وضعیت وظایف',
            subtitle : 'لیست وضعیت وظایف '
        },
    },
    {
        path : "/tasks/statuses/trash",
        name : "task_statuses_trash",
        component : Task_Statuses_Trash,
        meta : {
            title : ' وضعیت وظایف',
            subtitle : 'موارد حذف شده وضعیت وظایف '
        },
    },
    {
        path : "/tasks/statuses/create",
        name : "task_statuses_create",
        component : Task_Statuses_Create,
        meta : {
            title : ' وضعیت وظایف',
            subtitle : 'ایجاد وضعیت وظایف'
        },
    },
    {
        path : "/tasks/statuses/edit/:id",
        name : "task_statuses_edit",
        component : Task_Statuses_Edit,
        meta : {
            title : ' وضعیت وظایف',
            subtitle : 'ویرایش وضعیت  وظایف'
        },
    },



]

export default route_task_statuses;