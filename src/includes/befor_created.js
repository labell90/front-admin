import store from "../store/index.js"
export default {
    beforeCreate() {
        store.commit("Modules_Authenticate_Mutation_Sync")
    }

}