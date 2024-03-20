import store from "../store/index.js"
import {mapGetters} from "vuex";
export default {
    beforeCreate() {
        store.commit("Modules_Authenticate_Mutation_Sync")
    },
    computed : {
        ...mapGetters([
            "Modules_Authenticate_Getter_Token"
        ])
    },
    mounted() {
        // if (!window.axios.defaults.headers.common['Authorization'] ){
            window.axios.defaults.headers.common['Authorization'] ="Bearer "+ this.Modules_Authenticate_Getter_Token

        // }

    }

}