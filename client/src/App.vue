
<template>
    <div>
        <div class="navbar" v-if="true">
            <img alt="Factory logo" class="navbar-logo" src="@/assets/factory-icon.png" width="60" height="60" />
            <div class="navbar-username">{{authStore.getUsername}}</div>
        </div>
        <span v-if="false">
            <img alt="Factory logo" class="logo" src="@/assets/factory-icon.png" width="60" height="60" />
        </span>
    </div>
  <!-- <button @click="action">Action</button>
  <button @click="action2">Action2</button>
  <button @click="action3">Action3</button>
  <br>
  <RouterLink to='/register'>Register</RouterLink>
  <RouterLink to='/login'>Login</RouterLink>
  <RouterLink to='/factorylist'>Factory List</RouterLink>
  <RouterLink to='/factorydetails'>Factory Details</RouterLink> -->
  <RouterView />
  <ErrorView :errorMessage="pageStore.getErrorMessage" :showModal="pageStore.getShowError"/>
  <LoadingView v-if="pageStore.getLoading"/>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useFactoryStore } from './stores/factory'
import ErrorView from './components/modals/Error.vue'
import { usePageStore } from './stores/pageState'
import LoadingView from './components/Loading.vue'

export default {
    components: {
        ErrorView,
        LoadingView
    },
    setup(){
        const pageStore = usePageStore()
        const authStore = useAuthStore()
        return { pageStore, authStore }
    },
    created: () => {
        const authStore = useAuthStore()

        //authStore.login('enes2@gmail.com', '12312312')
        //authStore.register('test2@gmail.com', 'Aa111111', 'testtesta', 0)
        //console.log();
    },
    methods: {
      action(){
        const authStore = useAuthStore()
        //authStore.logout()
        authStore.login('enes2@gmail.com', '12312312')
        
        //authStore.renewToken()
      },
      action2(){
        //const authStore = useAuthStore()
        //authStore.renewToken()
        //const factoryStore = useFactoryStore()
        //factoryStore.loadFactoryList(1)
        //factoryStore.loadFactoryDetailsList("722e4577-8a79-4ef1-a004-94ec891bea82", 2)
      },
      action3(details){
        //const authStore = useAuthStore()

        //const factoryStore = useFactoryStore()
        // factoryStore.changeFactoryDetail(
        //     "dbf28db3-b453-8e96-ba09-3d7674d86554",
        //     {
        //     id:"dbf28db3-b453-8e96-ba09-3d7674d86554",
        //     factory_id:"722e4577-8a79-4ef1-a004-94ec891bea82",
        //     start_date:"12/12/2021",
        //     end_date:"12/12/2021",
        //     unit:"cal",
        //     usage:0,
        //     usage_fee:0,
        //     discounted_fee:true,
        //     paid: true
        // })

        // factoryStore.changeFactoryInformation("2ba133bd-574e-4dc9-9307-e0d184070373", {
        //     id:"2ba133bd-574e-4dc9-9307-e0d184070373",
        //     factory_name:"agasgag",
        //     subscription_begin_date:"01/01/1870",
        //     subscription_end_date:"01/01/1871",
        //     no_of_workers:6700,
        //     free_user:false,
        //     ceo: "enes"
        // })

        //factoryStore.addColumnFactoryTable('newColumn1', 'text')
        //factoryStore.addColumnFactoryDetailsTable('newColumn1', 'text')
        //factoryStore.deleteColumnFactoryTable('newcolumn1')
      }
    }
}
</script>

<style scoped>
.logo {
    margin: 20px;
    position: fixed;
    left: 5px;
    top: 5px;
}
.navbar{
    position: fixed;
    top:0px;
    left: 0px;
    width: 100%;
    background-color: rgb(5, 129, 11);
    display:flex;
    justify-content: space-between;
    align-items: center;
}

.navbar-logo{
    margin: 10px
}

.navbar-username{
    margin-right: 20px;
    font-size: 20px;
}
</style>