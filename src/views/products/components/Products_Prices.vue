<script>
import {mapActions} from "vuex";

export default {
  name: "Products_Prices",
  props:['product'],
  mounted() {
    this.Get_Client_Group();
  },
  data() {
    return {
      show_add:false,
      add:{
        price:null,
        sale:null,
        client_group_id:null,
        group_id:null,
        start_at:null,
        end_at:null,
      },
      errors:[],
      client_groups:[],
      groups:[]
    }
  },
  methods: {
    ...mapActions([
      "Module_Client_Groups_All"
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
          // this.Computed_Get_Cities();
        }
      })
    },

  }

}
</script>

<template>
  <div class="q-mt-sm">
    <strong>لیست قیمت ها : </strong>
    <q-btn @click="show_add= ! show_add;" glossy size="sm" class="font-12 float-right" color="blue-7" rounded icon="fas fa-plus" push label="افزودن قیمت جدید"></q-btn>
  </div>
  <q-separator class="q-mt-md"/>
  <div class="q-mt-md q-mb-md">
    <template v-if="show_add">
      <div class="animation-fade-in">
        <strong class="text-blue-8">افرودن قیمت جدبد برای محصول</strong>
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

        </div>
      </div>
    </template>


  </div>


</template>

<style scoped>

</style>