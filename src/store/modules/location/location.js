import axios from "axios";

export default {

    actions : {
        Module_Location_Action_Index(){
            return new Promise((resolve, reject) => {
                axios.get('public/location').then(response =>{
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                })
            })
        },
        Module_Location_Action_Country_Selectable(_,items){
            return new Promise((resolve, reject) => {
                let data =[ ];
                items.forEach(item => {
                    data.push({label : item.name , image:item.flag , value : item.id})
                })
                resolve(data);
            })
        },
        Module_Location_Action_Province_Selectable(_,items){
            return new Promise((resolve, reject) => {
                let locations = items.locations;
                let id = items.country_id;
                let data=[];
                locations.forEach(country => {
                    if (country.id === id){
                        country.provinces.forEach(province => {
                            data.push({label : province.name , value : province.id, cities : province.cities,id : province.id})
                        })
                    }
                })
                return resolve(data);
            })

        },
        Module_Location_Action_City_Selectable(_,items){
            return new Promise((resolve, reject) => {
                let provinces = items.provinces;
                let id = items.province_id;
                let data=[];
                provinces.forEach(province => {
                    if (province.id === id){
                        province.cities.forEach(city => {
                            data.push({label : city.name , value : city.id})
                        })
                    }
                })
                return resolve(data);
            })

        },

    },
}