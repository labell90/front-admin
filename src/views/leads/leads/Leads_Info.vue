<script>
import {mapActions} from "vuex";

export default {
  name: "Leads_Info",
  mounted() {
    this.Get_Item();
    this.Get_Location();
    this.Get_Lead_Categories();
    this.Get_Lead_Types();
    this.Get_Lead_Resources();
    this.Get_Lead_Industries();
    this.Get_Lead_Statuses();

  },
  data(){
    return {
      loading:true,
      edit_loading:false,
      errors:[],
      countries:[],
      provinces:[],
      cities:[],
      lead_categories:[],
      lead_resources:[],
      lead_statuses:[],
      lead_industries:[],
      lead_types:[],
      items:{
        country_id : null,
        province_id : null,
        city_id : null,
        lead_category_id : null,
        lead_resource_id : null,
        lead_status_id : null,
        lead_industry_id : null,
        lead_type_id : null,
        name : null,
        phone : null,
        email : null,
        company : null,
        tel : null,
        fax : null,
        postal_code : null,
        website : null,
        instagram : null,
        telegram : null,
        brand : null,
        company_position : null,
        address : null,
        description : null,
        is_special : 0
      }
    }
  },
  methods:{
    ...mapActions([
      "Module_Location_Action_Index",
      "Module_Location_Action_Country_Selectable",
      "Module_Location_Action_Province_Selectable",
      "Module_Location_Action_City_Selectable",
      "Module_Lead_Category_Action_Index",
      "Module_Lead_Industry_Action_Index",
      "Module_Lead_Resource_Action_Index",
      "Module_Lead_Types_Action_Index",
      "Module_Lead_Status_Action_Index",
      "Module_Lead_Action_Show",
      "Module_Lead_Action_Edit"

    ]),
    Get_Item(){
      this.Module_Lead_Action_Show(this.$route.params.id).then(response => {
        this.items = response.data.result;
        this.loading=false;
      }).catch(error =>{

      })
    },
    Edit_Item(){
      this.loading=true;
      this.Module_Lead_Action_Edit(this.items).then(response => {
        this.loading=false;
        this.Methods_Notify_Update();
        this.$router.push({name:'lead_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })
    },

    Get_Location(){
      this.Module_Location_Action_Index().then(response => {
        this.location = response.data.result;
        this.Get_Country();
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })

    },

    Get_Country(){
      if (this.location.length){
        this.Module_Location_Action_Country_Selectable(this.location).then(response => {
          this.countries = response;
          this.Get_Provinces()
        }).catch(error => {
          this.Methods_Notify_Error_Internal();
        })
      }
    },
    Get_Provinces(){
      if (this.items.country_id){
        let items = {
          locations : this.location,
          country_id : this.items.country_id
        }
        console.log(items)
        this.Module_Location_Action_Province_Selectable(items).then(response => {
          this.provinces = response;
          this.Get_Cities();
        });
      }
    },
    Get_Cities(){
      if (this.items.province_id){
        let items= {
          provinces : this.provinces,
          province_id : this.items.province_id
        }
        this.Module_Location_Action_City_Selectable(items).then(response => {
          this.cities = response;
        });
      }
    },


    Get_Lead_Categories(){
      this.Module_Lead_Category_Action_Index({per_page:1000}).then(response => {
        this.lead_categories=[];
        if (response.data.result.data){
          response.data.result.data.forEach(category => {
            this.lead_categories.push({label:category.name, value: category.id,color_code : category.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Resources(){
      this.Module_Lead_Resource_Action_Index({per_page:1000}).then(response => {
        this.lead_resources=[];

        if (response.data.result.data){
          response.data.result.data.forEach(resource => {
            this.lead_resources.push({label:resource.name, value: resource.id,color_code : resource.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Statuses(){
      this.Module_Lead_Status_Action_Index({per_page:1000}).then(response => {
        this.lead_statuses=[];
        if (response.data.result.data){
          response.data.result.data.forEach(status => {
            this.lead_statuses.push({label:status.name, value: status.id,color_code : status.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Industries(){
      this.Module_Lead_Industry_Action_Index({per_page:1000}).then(response => {
        this.lead_industries=[];
        if (response.data.result.data){
          response.data.result.data.forEach(industry => {
            this.lead_industries.push({label:industry.name, value: industry.id,color_code : industry.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Lead_Types(){
      this.Module_Lead_Types_Action_Index({per_page:1000}).then(response => {
        this.lead_types=[];
        if (response.data.result.data){
          response.data.result.data.forEach(type => {
            this.lead_types.push({label:type.name, value: type.id,color_code : type.color_code});
          })
        }
      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },


    Filter_Countries_Select (val, update, abort) {
      update(() => {
        if (val){
          this.countries =  this.countries.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Country();
        }
      })
    },
    Filter_Provinces_Select (val, update, abort) {
      update(() => {
        if (val){
          this.provinces =  this.provinces.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {

        }
      })
    },
    Filter_Cities_Select (val, update, abort) {
      update(() => {
        if (val){
          this.cities =  this.cities.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {

        }
      })
    },

    Filter_Lead_Categories_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_categories =  this.lead_categories.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Categories();
        }
      })
    },
    Filter_Lead_Resources_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_resources =  this.lead_resources.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Resources();
        }
      })
    },
    Filter_Lead_Industries_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_industries =  this.lead_industries.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Industries();
        }
      })
    },
    Filter_Lead_Statuses_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_statuses =  this.lead_statuses.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Statuses();
        }
      })
    },
    Filter_Lead_Types_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lead_types =  this.lead_types.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lead_Types();
        }
      })
    },
    computed : {
      Computed_Get_Province(){
        if (this.items.country_id){
          let items = {
            locations : this.location,
            country_id : this.items.country_id
          }
          console.log(items)
          this.Module_Location_Action_Province_Selectable(items).then(response => {
            this.provinces = response;
          });
        }
      },
      Computed_Get_Cities(){
        if (this.items.province_id){
          let items= {
            provinces : this.provinces,
            province_id : this.items.province_id
          }
          this.Module_Location_Action_City_Selectable(items).then(response => {
            this.items.city_id = null;
            this.cities = response;
          });
        }
      }
    }
  }
}
</script>

<template>


</template>

<style scoped>

</style>