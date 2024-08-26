<script>
import  {mapActions} from "vuex";

export default {
  name: "Forms_Create",
  data(){
    return{
      loading:false,
      errors:[],
      item_counter:1,
      items:{
        name:null,
        title:null,
        hint:null,
        placeholder:null,
        type : 'text',
        items : []
      },
      type_options : [
        {
          label : 'متنی',
          value: 'text',
          icon : "fas fa-file-lines"
        },
        {
          label : 'عددی',
          value: 'number',
          icon : "fas fa-hashtag"

        },
        {
          label : 'چند گزینه ای ',
          value: 'select',
          icon : "fas fa-table-list"

        },
        {
          label : 'انتخابی',
          value: 'checkbox',
          icon : "fas fa-square-check"

        },
        {
          label : 'متن طولانی',
          value: 'textarea',
          icon : "fas fa-file"

        },
        {
          label : 'آدرس ایمیل',
          value: 'email',
          icon : "fas fa-envelope"

        },
        {
          label : 'گذرواٰژه',
          value: 'password',
          icon : "fas fa-lock"

        },
      ]

    }
  },
  methods : {
    ...mapActions([
        "Module_Form_Action_Create"
    ]),
    Add_Items() {
      this.items.items.push({id : this.item_counter,value:null})
      this.item_counter++;
    },
    Remove_Item(id){
      this.items.items = this.items.items.filter(item => item.id !== id)

    },
    Create_Item(){
      this.loading=true;
      //get options
      if (this.items.items.length){
        let options=[];
        this.items.items.forEach(item => {
          options.push(item.value);
        })
        this.items.items = options;
      }
          this.Module_Form_Action_Create(this.items).then(res => {
          this.Methods_Notify_Create();
          this.$router.push({name:'forms_index'});
      }).catch(error => {
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        this.loading=false;
      })


    }
  }

}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10">افزودن فرم جدید</strong>
      <q-btn :to="{name : 'forms_index'}" class="float-right" color="blue-8"  glossy icon="fas fa-list" label="لیست موارد"></q-btn>

    </q-card-section>
    <q-card-section>
      <q-banner class="bg-teal-7 rounded-borders">
        <template v-slot:avatar>
          <q-icon name="fas fa-info-circle" color="white" />
        </template>
        <strong class="text-white">
          لیست فرم های سفارشی برای افزودن موارد اضافه به ویژگی ها ، برای مدیریت موارد اضافه هر ویژگی ، از منو ویژگی (مثال : سرنخ ها) گزینه فیلد های اضافه را انتخاب کنید
        </strong>
      </q-banner>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'name')" outlined v-model="items.name"  type="text" label="نام فرم (مشاهده در مدیریت)">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'title')" outlined v-model="items.title"  type="text" label="عنوان">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'title')" />
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-select
              outlined
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="items.type"
              label="نوع فرم"
              :options="type_options"
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
                <q-icon class="q-mr-sm q-mt-xs" size="20px" color="teal-8" :name="scope.opt.icon" />
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'type')" />
            </template>
          </q-select>

        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'hint')" outlined v-model="items.hint"  type="text" label="توضیحات راهنما">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'hint')" />
            </template>
          </q-input>
        </div>
        <div v-if="items.type === 'select'" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <div>
            <strong class="text-red">افزودن گزینه های انتخابی</strong>
            <div class="q-mt-md">
              <q-btn size="md" @click="Add_Items" glossy color="blue-8" icon="fas fa-plus" label="افزودن گزینه"></q-btn>
            </div>
          </div>
          <div class="q-mt-md q-mb-md row">
            <div v-for="(option,index) in items.items" class="col-md-3 q-px-sm q-mb-sm">
              <q-input outlined v-model="option.value"  type="text" :label="'گزینه ' + option.id">
                <template v-slot:append>
                  <q-btn round dense glossy size="sm" color="red-6" icon="fas fa-times" @click="Remove_Item(option.id)"/>
                </template>
              </q-input>
            </div>
          </div>
          <q-separator/>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-sm">
          <q-input :error="this.Methods_Validation_Check(errors,'placeholder')" outlined v-model="items.placeholder"  type="text" label="مثال فرم (placeholder)">
            <template v-slot:error>
              <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'placeholder')" />
            </template>
          </q-input>
        </div>

        <div class="col-12 q-pa-sm">
          <q-btn color="teal-8" :loading="loading" @click="Create_Item" glossy icon="fas fa-plus-circle" label="افزودن آیتم جدید"></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<style scoped>

</style>