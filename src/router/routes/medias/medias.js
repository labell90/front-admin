import Medias_Index from "@/views/medias/Medias_Index.vue";

const route_medias =[
    {
        path : "/medias",
        name : "medias_index",
        component : Medias_Index,
        meta : {
            title : 'رسانه ها و فایل ها',
            subtitle : 'لیست فایل ها'
        },
    },


]
export default route_medias;