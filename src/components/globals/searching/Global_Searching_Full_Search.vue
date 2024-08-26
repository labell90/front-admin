<script>
export default {
  name: "Global_Searching_Full_Search",
  props : ['items'],
  mounted() {
    if (this.items.length) {
      this.items.forEach(item => {
        this.options.push({
          label:item.label,
          value:item.field,
        })
      })
    }
  },
  data(){
    return {
      conditions : [
      ],
      condition_counter : 1,
      options:[],
      condition_options:[
        {
          label : "برابر",
          value : "=",
        },
        {
          label : "شامل",
          value : "LIKE",
        },
        {
          label : "بزرگتر از",
          value : ">",
        },
        {
          label : "کوچکتر از",
          value : "<",
        },
        {
          label : "نا مساوی",
          value : "!=",
        },
      ]
    }
  },
  methods : {
    Add_Condition(){
      this.conditions.push({
        "id" : this.condition_counter,
        "field" : null,
        "condition" : null,
        "value" : null
      })
      this.condition_counter ++;
    },
    Remove_Condition(id){
      this.conditions = this.conditions.filter(item => {
        return item.id!==id
      });

    }
  }


}
</script>

<template>

  <div v-if="items">
    <div>
      <q-btn @click="Add_Condition" color="dark" class="font-12" icon="fas fa-plus" glossy label="افزودن شرط"></q-btn>
    </div>
    <div class="q-mt-md">

      <div v-for="item in conditions" class="row">
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
          <q-select
              outlined
              dense
              v-model="item.field"
              transition-show="flip-up"
              transition-hide="flip-down"
              label="انتخاب فیلد"
              :options="options"
              emit-value
              map-options
          >

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

          </q-select>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">
          <q-select
              outlined
              v-model="item.condition"
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              label="انتخاب شرط"
              :options="condition_options"
              emit-value
              map-options
          >

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

          </q-select>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12 q-pa-sm">

          <q-input v-model="item.value" dense outlined  type="text" label="مقدار">
            <template v-slot:append>
              <q-btn round dense glossy size="xs" color="red-8" @click="Remove_Condition(item.id)" icon="fas fa-times" />
            </template>
          </q-input>

        </div>
      </div>

    </div>


  </div>

</template>

<style scoped>

</style>