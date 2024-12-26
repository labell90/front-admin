<script>
import {mapActions} from "vuex";

export default {
  name: "Products_Prices",
  props:['product'],
  mounted() {
    this.Get_Prices();
    this.Get_Client_Group();
    this.Get_Group();
  },
  data() {
    return {
      show_add:false,
      jalali_start_date:null,
      jalali_end_date:null,
      jalali_start_date_edit:[],
      jalali_end_date_edit:[],
      get_loading:true,
      add_loading:false,
      edit_loading:[],
      delete_loading:false,
      dialog_edit:[],
      add:{
        product_id:null,
        price:null,
        sale:null,
        client_group_id:null,
        group_id:null,
        start_at:null,
        end_at:null,
      },
      errors:[],
      client_groups:[],
      groups:[],
      prices:[],
      columns : [
        {
          name: 'client_group_id',
          value: 'client_group_id',
          label: 'نمایندگان',
          align: 'left',
          sortable: false,
          field: row => row.client_group_id,
        },
        {
          name: 'group_id',
          value: 'group_id',
          label: 'کاربران',
          align: 'left',
          sortable: false,
          field: row => row.group_id,
        },
        {
          name: 'price',
          value: 'price',
          label: 'قیمت',
          align: 'left',
          sortable: true,
          field: row => row.price,
        },
        {
          name: 'sale',
          value: 'sale',
          label: 'تخفیف',
          align: 'left',
          sortable: true,
          field: row => row.sale,
        },

        {
          name: 'start_at',
          value: 'start_at',
          label: 'شروع',
          align: 'left',
          sortable: false,
          field: row => row.start_at,
        },
        {
          name: 'end_at',
          value: 'end_at',
          label: 'پایان',
          align: 'left',
          sortable: false,
          field: row => row.end_at,
        },
        {
          name: 'is_active',
          value: 'is_active',
          label: 'وضعیت',
          align: 'left',
          sortable: false,
          field: row => row.is_active,
        },

        {
          name: 'created_by',
          value: 'created_by',
          label: 'ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_by,
        },
        {
          name: 'created_at',
          value: 'created_at',
          label: 'ت ایجاد',
          align: 'left',
          sortable: true ,
          field: row => row.created_at,
        },
        {
          name: 'updated_by',
          value: 'updated_by',
          label: 'ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_by,
        },
        {
          name: 'updated_at',
          value: 'updated_at',
          label: 'ت ویرایش',
          align: 'left',
          sortable: true ,
          field: row => row.updated_at,
        },
        {
          name: 'tools',
          value: 'tools',
          label: 'عملیات',
          align: 'left',
        }
      ],

    }
  },
  methods: {
    ...mapActions([
        "Module_Client_Groups_All",
        "Module_Group_Action_All",
        "Module_Product_Prices_Index",
        "Module_Product_Prices_Create",
        "Module_Product_Prices_Edit",
        "Module_Product_Prices_Delete",
    ]),
    Get_Client_Group(){
      this.Module_Client_Groups_All().then(res => {
        if (res.data.result){
          this.client_groups=[];
          res.data.result.forEach(item => {
            this.client_groups.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code
            })
          })
        }
      }).catch(error => {
        return this.Methods_Notify_Error_Server();
      })
    },
    Filter_Client_Group_Select (val, update, abort) {
      update(() => {
        if (val){
          this.client_groups =  this.client_groups.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Client_Group();
        }
      })
    },
    Get_Group(){
      this.Module_Group_Action_All().then(res => {
        if (res.data.result){
          this.groups=[];
          res.data.result.forEach(item => {
            this.groups.push({
              label : item.name,
              value : item.id,
              color_code : item.color_code
            })
          })
        }
      }).catch(error => {
        return this.Methods_Notify_Error_Server();
      })
    },
    Filter_Group_Select (val, update, abort) {
      update(() => {
        if (val){
          this.groups =  this.groups.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Group();
        }
      })
    },
    Get_Prices(){
      this.Module_Product_Prices_Index({product_id:this.product.id}).then(res => {
        this.prices = res.data.result;
        //generate edits dates
        res.data.result.forEach(item => {
          if (item.start_at){
            this.jalali_start_date_edit[item.id] = this.Methods_Date_Gregorian_To_Jalali(item.start_at)

          }
          if (item.end_at){
            this.jalali_end_date_edit[item.id] = this.Methods_Date_Gregorian_To_Jalali(item.end_at)

          }
        })


        this.get_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.get_loading=false;
      })

    },
    Create_Product_Price(){
      this.add.product_id = this.product.id;
      this.add_loading = true;

      //convert dates
      if (this.jalali_start_date){
        this.add.start_at = this.Methods_Date_Jalali_To_Gregorian(this.jalali_start_date)
      }
      if (this.jalali_end_date){
        this.add.end_at= this.Methods_Date_Jalali_To_Gregorian(this.jalali_end_date)
      }
      this.Module_Product_Prices_Create(this.add).then(res => {
        this.prices.push(res.data.result);
        this.Methods_Notify_Create();
        this.add = {
          product_id:null,
          price:null,
          sale:null,
          client_group_id:null,
          group_id:null,
          start_at:null,
          end_at:null,
        }
        this.show_add=false;
        this.add_loading = false;
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.add_loading=false;
      })
    },
    Edit_Product_Price(item){
      this.edit_loading[item.id] = true;
      let edit_data = item
      if (this.jalali_start_date_edit[item.id]){
        edit_data.start_at = this.Methods_Date_Jalali_To_Gregorian(this.jalali_start_date_edit[item.id])
      }else {
        edit_data.start_at=null;
      }
      if (this.jalali_end_date_edit[item.id]){
        edit_data.end_at= this.Methods_Date_Jalali_To_Gregorian(this.jalali_end_date_edit[item.id])
      }else {
        edit_data.end_at=null;
      }
      this.Module_Product_Prices_Edit(edit_data).then(res => {
        this.edit_loading[item.id]=false;
        this.dialog_edit[item.id]=false;
        this.Methods_Notify_Update();
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.edit_loading[item.id]=false;
      })



    },
    Item_Delete(item){
      this.delete_loading=true;
      this.Module_Product_Prices_Delete({id:item,product_id:this.product.id}).then(res => {
        this.prices = this.prices.filter(price => {
          return price.id !== item;
        })
        this.Methods_Notify_Delete();
        this.delete_loading=false;
      }).catch(error => {
        this.Methods_Notify_Error_Server();
        this.delete_loading=false;
      })


    }

  }

}
</script>

<template>
  <div class="q-mt-sm">
    <strong>لیست قیمت ها : </strong>
    <q-btn @click="show_add= ! show_add;" glossy size="sm" class="font-12 float-right" color="blue-7" rounded icon="fas fa-plus" label="افزودن قیمت جدید"></q-btn>
  </div>
  <q-separator class="q-mt-lg"/>
  <div class="q-mt-md q-mb-md">
    <template v-if="show_add">
      <div class="animation-fade-in">
        <strong class="text-blue-8">افزودن قیمت جدبد برای محصول</strong>
        <div class="q-mt-sm row">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
            <q-input dense :error="this.Methods_Validation_Check(errors,'price')" outlined v-model="add.price"  type="number" label="قیمت (تومان)">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'price')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
            <q-input dense :error="this.Methods_Validation_Check(errors,'sale')" outlined v-model="add.sale"  type="number" label="قیمت با تخفیف (تومان)">
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sale')" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
            <q-select
                dense
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="add.client_group_id"
                label="گروه نمایندگان"
                :options="client_groups"
                @filter="Filter_Client_Group_Select"
                emit-value
                map-options
                use-input
                clearable
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
                    <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'client_group_id')" />
              </template>
            </q-select>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
            <q-select
                dense
                outlined
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="add.group_id"
                label="گروه کاربری"
                :options="groups"
                @filter="Filter_Group_Select"
                emit-value
                map-options
                use-input
                clearable
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
                    <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'group_id')" />
              </template>
            </q-select>

          </div>
          <div class="col-12 q-mt-md">
            <q-banner dense class="bg-teal-7 glossy rounded-borders text-white" >
              <q-icon name="fas fa-info-circle fa-fade" size="xs" class="q-mr-sm"></q-icon>
              <span class="font-13">
                              در صورت انتخاب کردن تاریخ شروع یا پایان ، قیمت مورد نظر فقط در بازه تاریخی مورد نظر اعمال میشود و در غیر این صورت محدودیت زمانی ندارد.
              </span>
            </q-banner>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs q-mt-md">
            <q-input dense :error="this.Methods_Validation_Check(errors,'start_date')" outlined v-model="jalali_start_date" mask="date" label="تاریخ شروع">
              <template v-slot:append>
                <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date color="pink-7" dark v-model="jalali_start_date" calendar="persian" mask="YYYY/MM/DD">
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'start_date')" />
              </template>
            </q-input>

          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs q-mt-md">
            <q-input dense :error="this.Methods_Validation_Check(errors,'end_date')" outlined v-model="jalali_end_date" mask="date" label="تاریخ پایان">
              <template v-slot:append>
                <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date color="pink-7" dark v-model="jalali_end_date" calendar="persian" mask="YYYY/MM/DD">
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:error>
                <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'end_date')" />
              </template>
            </q-input>

          </div>
          <div class="col-12 text-right">
            <q-btn @click="Create_Product_Price" :loading="add_loading" class="font-13" color="blue-7" glossy icon="fas fa-check" label="افزودن قیمت"></q-btn>
          </div>

        </div>
        <q-separator class="q-mt-md"/>
      </div>
    </template>
    <global_loading_shape size="50" v-if="get_loading"></global_loading_shape>
    <div v-else>

      <q-table
          flat
          bordered
          :loading="get_loading"
          :rows="prices"
          title-class="text-teal-8 font-18 font-weight-500"
          table-header-class="text-red-8"
          :columns="columns"
          separator="cell"
          row-key="id"
          hide-pagination
      >
        <template v-slot:body-cell-client_group_id="props">
          <q-td :props="props">
            <strong v-if="props.row.client_group" class="text-grey-9">{{props.row.client_group.name}}</strong>
          </q-td>
        </template>
        <template v-slot:body-cell-group_id="props">
          <q-td :props="props">
            <strong v-if="props.row.group" class="text-grey-9">{{props.row.group.name}}</strong>
          </q-td>
        </template>
        <template v-slot:body-cell-price="props">
          <q-td :props="props">
            <strong class="text-blue-9 font-14">
              {{this.$filters.number_format(props.row.price)}}
            </strong>
          </q-td>
        </template>
        <template v-slot:body-cell-sale="props">
          <q-td :props="props">
            <strong v-if="props.row.sale" class="text-teal-9 font-14">
              {{this.$filters.number_format(props.row.sale)}}
            </strong>
            <span v-else> --- </span>
          </q-td>
        </template>

        <template v-slot:body-cell-start_at="props">
          <q-td :props="props">
            <global_filter_date_start v-if="props.row.start_at" :date="props.row.start_at"></global_filter_date_start>
          </q-td>
        </template>

        <template v-slot:body-cell-end_at="props">
          <q-td :props="props">
            <global_filter_date_end v-if="props.row.start_at" :date="props.row.end_at"></global_filter_date_end>
          </q-td>
        </template>

        <template v-slot:body-cell-tools="props">
          <q-td :props="props">
            <div class="text-center">
              <q-btn @click="dialog_edit[props.row.id]=true" glossy title="ویرایش آیتم" class="q-ma-xs" color="blue-8" icon="fas fa-edit" size="9px" round  />
              <global_actions_delete_item @Set_Ok="Item_Delete(props.row.id)" :loading="delete_loading"></global_actions_delete_item>

              <q-dialog
                  v-model="dialog_edit[props.row.id]"
                  position="top"
              >
                <q-card style="width:80%; max-width: 80vw;">
                  <q-card-section>
                    <strong class="text-grey-9 font-16">ویرایش قیمت محصول </strong>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-section>
                    <div class="row">

                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
                        <q-input dense :error="this.Methods_Validation_Check(errors,'price')" outlined v-model="props.row.price"  type="number" label="قیمت (تومان)">
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'price')" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
                        <q-input dense :error="this.Methods_Validation_Check(errors,'sale')" outlined v-model="props.row.sale"  type="number" label="قیمت با تخفیف (تومان)">
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'sale')" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
                        <q-select
                            dense
                            outlined
                            transition-show="flip-up"
                            transition-hide="flip-down"
                            v-model="props.row.client_group_id"
                            label="گروه نمایندگان"
                            :options="client_groups"
                            @filter="Filter_Client_Group_Select"
                            emit-value
                            map-options
                            use-input
                            clearable
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
                                <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'client_group_id')" />
                          </template>
                        </q-select>

                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs">
                        <q-select
                            dense
                            outlined
                            transition-show="flip-up"
                            transition-hide="flip-down"
                            v-model="props.row.group_id"
                            label="گروه کاربری"
                            :options="groups"
                            @filter="Filter_Group_Select"
                            emit-value
                            map-options
                            use-input
                            clearable
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
                                <q-chip :style="'background-color:'+scope.opt.color_code"></q-chip>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'group_id')" />
                          </template>
                        </q-select>

                      </div>
                      <div class="col-12 q-mt-md">
                        <q-banner dense class="bg-teal-7 glossy rounded-borders text-white" >
                          <q-icon name="fas fa-info-circle fa-fade" size="xs" class="q-mr-sm"></q-icon>
                          <span class="font-13">
                              در صورت انتخاب کردن تاریخ شروع یا پایان ، قیمت مورد نظر فقط در بازه تاریخی مورد نظر اعمال میشود و در غیر این صورت محدودیت زمانی ندارد.
              </span>
                        </q-banner>
                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs q-mt-md">
                        <q-input dense :error="this.Methods_Validation_Check(errors,'start_date')" outlined v-model="jalali_start_date_edit[props.row.id]" mask="date" label="تاریخ شروع">
                          <template v-slot:append>
                            <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date color="pink-7" dark v-model="jalali_start_date_edit[props.row.id]" calendar="persian" mask="YYYY/MM/DD">
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'start_date')" />
                          </template>
                        </q-input>

                      </div>
                      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-px-xs q-mt-md">
                        <q-input dense :error="this.Methods_Validation_Check(errors,'end_date')" outlined v-model="jalali_end_date_edit[props.row.id]" mask="date" label="تاریخ پایان">
                          <template v-slot:append>
                            <q-icon color="pink-7" name="fas fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date color="pink-7" dark v-model="jalali_end_date_edit[props.row.id]" calendar="persian" mask="YYYY/MM/DD">
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                          <template v-slot:error>
                            <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'end_date')" />
                          </template>
                        </q-input>

                      </div>

                    </div>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn glossy color="pink-7" :loading="edit_loading[props.row.id]" @click="Edit_Product_Price(props.row)" label="ویرایش قیمت"  />
                    <q-btn glossy color="dark" label="بستن" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>



            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-created_by="props">
          <q-td :props="props" >
            <global_items_user :user="props.row.created_by" />
          </q-td>
        </template>
        <template v-slot:body-cell-created_at="props">
          <q-td :props="props" >
            <global_filter_date :date="props.row.created_at" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_by="props">
          <q-td :props="props" >
            <global_items_user :user="props.row.updated_by" />
          </q-td>
        </template>
        <template v-slot:body-cell-updated_at="props">
          <q-td :props="props" >

            <global_filter_date :date="props.row.updated_at" />

          </q-td>
        </template>
      </q-table>

    </div>
  </div>


</template>

<style scoped>

</style>