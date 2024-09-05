<script>
import {mapActions} from "vuex";

export default {
  name: "Lead_Fields",
  mounted() {
    this.Get_Items();
  },
  data(){
    return {
      dialog_add : false,
      loading : true,
      activation_loading : false,
      required_loading : false,
      delete_loading : false,
      loading_add : false,
      required_options : [
        {
          label:"خیر",
          value : 0,
        },
        {
          label:"بله",
          value : 1,
        }
      ],
      items:{
        form_id : null,
        is_required:0,
      },
      forms:[],
      forms_options:[],
      errors:[],
      pagination: {
        page: 1,
        rowsPerPage: 100000,
        rowsNumber: 15
      },
      columns : [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          sortable: true,
          field: row => '# ' + row.id,
        },
        {
          name: 'form',
          required: true,
          label: 'فرم',
          align: 'left',
          sortable: true,
        },
        {
          name: 'is_required',
          required: true,
          label: 'اجباری بودن',
          align: 'left',
          sortable: true,
        },
        {
          name: 'is_active',
          required: true,
          label: 'وضعیت',
          align: 'left',
          sortable: true,
        },
        {
          name: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],
      items_selected:[],
      selected: [],

    }
  },
  methods :{
    ...mapActions([
        "Module_Form_Action_All",
        "Module_Lead_Action_Add_Field",
        "Module_Lead_Action_Get_Field",
        "Module_Lead_Action_Activation_Field",
        "Module_Lead_Action_Required_Field",
        "Module_Lead_Action_Delete_Field",
    ]),
    Add_Item(){
      this.loading_add=true;
      this.Module_Lead_Action_Add_Field(this.items).then(res =>{
        this.forms.push(res.data.result);
        this.loading_add=false;
        this.dialog_add=false;
        this.Methods_Notify_Create();
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          console.log(this.errors)
          this.loading_add=false;
          return this.Methods_Validation_Notify();
        }
        this.Methods_Notify_Error_Server();
        this.loading_add=false;
      })

    },
    Get_Items(){
      this.Module_Lead_Action_Get_Field().then(res => {
        this.forms = res.data.result;
        this.loading=false;
      }).catch(error => {
        this.loading=false;
        this.Methods_Notify_Error_Server();
      })
    },
    Get_Forms(){
      this.Module_Form_Action_All().then(res => {
        this.forms_options=[];
        res.data.result.forEach(item => {
          this.forms_options.push({
            label : item.name,
            value : item.id,
            type : item.type,
            title : item.title,
            items:item.items
          })
        })


      }).catch(error => {
        this.Methods_Notify_Error_Server();
      })
    },
    Filter_Forms_Select (val, update, abort) {
      update(() => {
        if (val){
          this.forms_options =  this.forms_options.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Forms();
        }
      })
    },
    updateSelected(newSelection) {
      this.selected = newSelection;
      this.items_selected = newSelection.map(item => item.id);
    },
    Item_Activation(id){
      this.activation_loading=true;
      this.Module_Lead_Action_Activation_Field(id).then(res => {
        this.forms = this.forms.filter(item => {
          if (item.id === id){
            item.is_active = !item.is_active;
          }
          return item;
        })
        this.activation_loading=false;
      }).catch(error =>{

        this.Methods_Notify_Error_Server();
        this.activation_loading=false;
      })

    },
    Item_Required(id){
      this.required_loading=true;
      this.Module_Lead_Action_Required_Field(id).then(res => {
        this.forms = this.forms.filter(item => {
          if (item.id === id){
            item.is_required = !item.is_required;
          }
          return item;
        })
        this.required_loading=false;
      }).catch(error =>{

        this.Methods_Notify_Error_Server();
        this.required_loading=false;
      })

    },
    Item_Delete(id){
      this.delete_loading=true;
      this.Module_Lead_Action_Delete_Field(id).then(res => {
        this.forms = this.forms.filter(item => {
          return item.id !== id;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        if (error.response.status === 409) {
          this.Methods_Notify_Generator( error.response.data.error,'red-8','fas fa-times')
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.delete_loading=false;

      })

    },


  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <q-btn @click="dialog_add=true" class="float-right" color="pink-7"  glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
      <q-dialog
          v-model="dialog_add"
          position="top"
      >
        <q-card style="width: 960px; max-width: 90vw;">
          <q-card-section>
            <strong class="font-16">افزودن فیلد جدید به اطلاعات سرنخ </strong>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-banner dense class="bg-pink-7 rounded-borders">
              <q-icon name="fas fa-info-circle fa-spin" color="white" size="30px"/>
              <span class="text-white q-ml-sm">
                در صورت وجود نداشتن فیلد مورد نظر در گزینه ها ، میتوانید از بخش فرم ها این فیلد را ایجاد کنید
              </span>
            </q-banner>
          </q-card-section>
          <q-card-section>
            <div class="q-mb-lg">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.form_id"
                  label="انتخاب فیلد"
                  :options="forms_options"
                  @filter="Filter_Forms_Select"
                  emit-value
                  map-options
                  use-input
                  :error="this.Methods_Validation_Check(errors,'form_id')"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-red">
                      گزینه ای یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <div>
                        <global_form_type_icon :type="scope.opt.type" ></global_form_type_icon>
                        <span class="text-red q-ml-sm font-12">({{scope.opt.type}})</span>
                      </div>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }} : {{scope.opt.title}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'form_id')" />
                </template>
              </q-select>
            </div>
            <div class="q-mb-lg">
              <q-select
                  outlined
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="items.is_required"
                  label="اجباری باشد ؟ "
                  :options="required_options"
                  emit-value
                  map-options
                  use-input
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-red">
                      گزینه ای یافت نشد
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:error>
                  <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'is_required')" />
                </template>
              </q-select>

            </div>

          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn glossy label="بستن" icon="fas fa-times" color="red" v-close-popup />
            <q-btn @click="Add_Item" glossy label="افزودن فیلد" color="green-8" icon-right="fas fa-check" :loading="loading_add" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-section>
    <q-card-section>
      <q-table
          class="q-mt-lg"
          flat
          bordered
          :loading="loading"
          :rows="forms"
          title="لیست فرم ها"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          separator="cell"
          selection="multiple"
          row-key="id"
          :selected="selected"
          hide-pagination
          @update:selected="updateSelected"
          v-model:pagination="pagination"
      >
        <template v-slot:body-cell-form="props">
          <q-td :props="props">
            <strong v-if="props.row.form">
              {{props.row.form.name}}
            </strong>
          </q-td>
        </template>
        <template v-slot:body-cell-is_required="props">
          <q-td :props="props">
            <q-btn @click="Item_Required(props.row.id)" v-if="props.row.is_required" color="green-7" label="فعال" size="sm" class="font-12" rounded glossy icon="fas fa-check"></q-btn>
            <q-btn @click="Item_Required(props.row.id)" v-else color="red-7" label="غیرفعال" size="sm" class="font-12" rounded glossy icon="fas fa-times"></q-btn>

          </q-td>
        </template>
        <template v-slot:body-cell-is_active="props">
          <q-td :props="props">
            <global_actions_activation_item @Set_Ok="Item_Activation(props.row.id)" :status="props.row.is_active"></global_actions_activation_item>

          </q-td>
        </template>
        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>
          </q-td>
        </template>

      </q-table>
    </q-card-section>

  </q-card>

</template>

<style scoped>

</style>