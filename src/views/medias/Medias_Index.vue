<script>
export default {
  name: "Medias_Index",
  data(){
    return {
      dialog_add_file:false,
      dialog_add_folder:false,
      add_loading:false,
      options:{
        types:[
          {
            label : "تاریخ ایجاد",
            value : "created_at",
          },
          {
            label : "الفبا",
            value : "name"
          },
          {
            label : "حجم فایل",
            value : "size"
          },
          {
            label : "تعداد استفاده",
            value : "use_count"
          }
        ],
        sorts:[
            {
                label : "صعودی",
                value : "asc"
            },
            {
                label : "نزولی",
                value : "desc"
            }
        ]
      },
      sort_by:"created_at",
      sort_type:"desc",
      errors:[]
    }
  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <strong class="text-grey-10 font-15">مدیریت رسانه ها و فایل ها</strong>
      <q-btn @click="dialog_add_folder=true" class="float-right q-mx-xs" color="blue-7" glossy icon="fas fa-folder-plus" label="پوشه جدید"></q-btn>
      <q-btn @click="dialog_add_file=true" class="float-right q-mx-xs" color="deep-orange-7" glossy icon="fas fa-file-circle-plus" label="فایل جدید"></q-btn>

      <q-dialog
          v-model="dialog_add_file"
          persistent
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-red-8 font-16">ارسال فایل جدید</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>

          </q-card-section>

          <q-card-actions align="right">
            <q-btn glossy color="red-8" label="بستن" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
          v-model="dialog_add_folder"
          persistent
          position="top"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <strong class="text-blue-10 font-16">ایجاد پوشه جدید</strong>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'name')" outlined  type="text" label="نام پوشه">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'description')" outlined  type="textarea" label="توضیحات">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'description')" />
                  </template>
                </q-input>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-pa-xs">
                <q-input dense :error="this.Methods_Validation_Check(errors,'password')" outlined  type="text" label="گذرواژه ">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')" />
                  </template>
                </q-input>
              </div>

            </div>

          </q-card-section>
          <q-card-actions align="right">
            <q-btn glossy color="blue-8" label="افرودن پوشه"  />
            <q-btn glossy color="dark" label="بستن" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card-section>
    <q-card-section>
      <q-separator class="q-mb-md" />
      #TODO Address bar
      <div class="q-mt-md q-mb-md row justify-center">
        <div class="col-xl-6 col-lg-7 col-md-9 col-sm-12 col-xs-12">
          <q-input class="font-17" outlined label="جستجو در فایل ها ..." label-color="teal-7">
            <template v-slot:append>
              <q-icon name="fas fa-search" color="blue-8"></q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-6 col-sm-10 col-xs-12 row">
          <div class="col-12 q-mb-sm q-ml-sm">
            <strong class="text-red-8"> نمایش به ترتیب :</strong>
          </div>
          <div class="col q-mx-xs">
            <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                outlined
                dense
                map-options
                :options="options.types"
                v-model="sort_by"
            >
            </q-select>
          </div>
          <div class="col q-mx-xs">
            <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                outlined
                dense
                map-options
                :options="options.sorts"
                v-model="sort_type"
            >
            </q-select>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>

    </q-card-section>


  </q-card>

</template>

<style scoped>

</style>