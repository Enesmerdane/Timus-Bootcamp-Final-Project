import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from '../components/Register.vue'
import LoginView from '../components/Login.vue'
import FactoryTableView from '../components/FactoryList.vue'
import FactoryDetailsView from '../components/FactoryDetails.vue'
import FactoryInformationUpdateView from '../components/FactoryInformationUpdate.vue'
import FactoryDetailsUpdateView from '../components/FactoryDetailsUpdate.vue'
import FactoryInformationAddColumnModal from '../components/modals/FactoryInformationAddColumnModal.vue'
import FactoryListLayout from '../layouts/FactoryListLayout.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'register_page',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login_page',
            component: LoginView
        },
        {
            path: '/factorylist',
            name: 'factory_list_page',
            component: FactoryListLayout,
            children: [
                {
                    path: '',
                    component: FactoryTableView,
                    name: 'factorylisttableview'
                },
                {
                    path: 'edit/:factory_id',
                    component: FactoryInformationUpdateView,
                    name: 'factorylistedit'
                },
                {
                    path: 'addcolumn',
                    component: FactoryInformationAddColumnModal
                }
            ]
        },
        {
            path: '/factorydetails',
            name: 'factory_details_page',
            component: FactoryDetailsView,
            children: [
                {
                    path: 'edit/:detail_id',
                    component: FactoryDetailsUpdateView
                }
            ]
        },
        {
            path: '/',
            redirect: '/factorylist'
        }
    ]
})

export default router
