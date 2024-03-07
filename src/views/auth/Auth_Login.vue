<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Auth_Login",
  data(){
    return{
      errors:[],
      login_loading:false,
      login : {
        email : null,
        password : null,
      },
    }
  },
  methods:{
    ...mapActions([
        "Modules_Authenticate_Action_Login",
        "Modules_Authenticate_Action_Save"
    ]),
    Login(){
      this.login_loading=true;
      this.Modules_Authenticate_Action_Login(this.login).then(response => {
        this.Modules_Authenticate_Action_Save(response.data.result)
        this.Methods_Notify_Generator('باموفقیت وارد حساب کاربریتان شدید !','green-8','fas fa-check')
        this.$router.push({name:'home'});
        return this.login_loading=false;
      }).catch(error => {
        //check validation code
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }
        if (error.response.status === 401){
          this.Methods_Notify_Generator('آدرس ایمیل یا گذرواژه نادرست است !','red-8','fas fa-times');
        }
        this.login_loading=false;
      })
    }



  }


}
</script>

<template>

  <div class="row justify-center">
    <div  class="col-md-6 col-sm-12 col-xs-12 ">
      <q-card class="q-mt-lg login-bg">
        <q-card-section>
          <div class="text-center">
            <q-img src="./src/assets/images/logo.png" loading="lazy" class="logo-image"  alt="test" ></q-img>
            <div class="q-mt-md text-center">
              <strong class="font-26 text-pink-9">ورود به مدیریت لابل</strong>
            </div>
            <div class="q-mt-sm">
              <p class="font-16">برای ورود به حساب کاربری اطلاعات خواسته شده را وارد نمایید</p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="q-mb-lg">
                <q-input :error="this.Methods_Validation_Check(errors,'email')" outlined v-model="login.email" type="text" label="آدرس ایمیل">
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'email')" />
                  </template>
                </q-input>
              </div>
              <div class="q-mb-lg">
                <q-input :error="this.Methods_Validation_Check(errors,'password')" outlined v-model="login.password" type="password" label="گذرواژه" >
                  <template v-slot:error>
                    <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'password')" />
                  </template>
                </q-input>
              </div>
              <div class="text-center q-mb-xl">
                <q-btn glossy color="pink-8" class="font-15" :loading="login_loading"  @click="Login" > ورود به حساب کاربری</q-btn>
              </div>
            </div>
          </div>
        </q-card-section>

      </q-card>
    </div>
  </div>

</template>
<style scoped>
.logo-image{
  width: 200px;
}
.login-bg{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAFVBMVEX////y8vL6+vr8/Pz29vb09PT4+PgYX3jnAAAE40lEQVR4Ae3dy3KjQBZF0bPvI///kxvbRJXCXS1lI2MhOGtEDTzZxYOw8ybaIqFlc7KhQzYnGlo2ybHmJaRsTtOySbRsVuo9mZmZmZmZmZmZmZnFIjXFWJSmWDvW82eW+Z5lZmZmZmZmZmaWKz1kzWpEapJjQWhSXTfWyJUmJXXZWKH/U0FqmmMNx5o0gNAGGYtrxUp6gDYoFteKFbSKsTFW6/1krrbEQkFfJ1bxx4ZYMTn87FgJm8fqM1NvJ+j8Q1tiKWhdQ9DaKqEmnwyOVSy6GwjHeqSqmk/lWDNiMSD167K+vE2sVebvl+KP7jxsrAMIPtQK6NAvCHjTxcaRWkX8Uq6M0JspoPO/T7XQdxZQ+c+EoW8se2i1uZZVp8zMzMzMzMzMzMzMzMzMzGxeEjqFXOwfixPkimgWHdpXNPTQC0WFnhOs9s+VL14TXtCd+VyryEUAoZ3FS3MVn0Zsb1VaFWhx3osxYQSLrtAGULflS/vLhvG6AcvM7m1TD4PSXwFDv2CUXqOoNRq9/adv/3lmkF+tYtNFnFeKlSAVkD8xbUHp1JoYa6unY+XZYwWLkdoimzj5Zbh5LsM3eFXHD42Ixd3s/rh107ObYlhC53rYoHssgYrFxOuHJauZR6pl0U2lzMzMzA71a2ILKO0nv+gUkkXsvgF0p86g9ozVEB8gdApFaScJeXNwjzV9c3SPBT37a1wrxve/ntvMnwgSQjb3p7q6//ZgA2J21YpBzb6fWNy8Z8keGNAfJi5CS1il7JGMLykzMzMzMzMzM7Ozy9QkCyA1xViUplgDQ3OsKc2y0GGZmZmZmZl5rtBzhSeQ/RelrbIgdHbNrdBmQV8gVkWsILQd9Pljxe3x87OSz8iRF4n1/BxbAnWRWEXpGQ0NnZeIFdSTrUoJ1BViidJmoyEl5YByrHuyoHNiv1Dfs771iYZwrKlWi4LKs8caP1W5IHQ8QK+ePPuDfv4njz3HW9xKbZc9nj+9jx1LcSP1Gs2YPUktIXUjQPYo1sSTxgatGyCb3nu+ZZPfgLj/CmNF5R99N5YFt0r3WDMfy/KG3puZ+TrebdNdx0I2Hav103xmWcZCb8HMzMzMzMzMzMzMzMzMzMyiFiF7KLvnFvtaFNBVJXskgBE6kDx0qzjUNvxFaSfH2sUlG0pPSchLtFKwyKen4g5pQOlgsYq6yoZ7UZV6RoIOCUqHA6kDGkdsFfRhR2YPZ9OLzKhr/h/2llhFd6b2kxwxVlGbh38rcsdYeZZYakazqCvFCnrzxTuAoZ0wdDgB2iJhAKGdBHGS2/siWVTs+ow+moSDbuuaOtHr+2DoYory1yxnNaFDMjMzMzMzMzMzM8v6ELKHilV36h6LAupDAyV7sPA7/x6XbHLhd9xZTWAFkws3rCD0YdQiJTUt+ycYtw/E/N8LlazWMgVV1ZCO9WjpQa6TUE1J5Vh3v9LYRBFru3Csu2sWm+g1li/DqVid1Y71OBZE8qGldqz7sQqUBeU3h8ex1jt7Sgklu/c0VEB3Khta9mCJZzRfSvZ4CCPiwWyMNWN2KbglhGxS/btWDtlsrSbefSuR2KnWSOlWNOSB5y8mjKZ2qkV9S0XqBRo69SN2ew3KZhH5qRvofPcvELII7aKKGx3v/3SOIrSXiObTiDjHThSpPeUnvVJA6Hr+AxEMEZdiJC+EAAAAAElFTkSuQmCC);
  background-color: #f4f7f642 !important;
  background-blend-mode: multiply;
}
</style>