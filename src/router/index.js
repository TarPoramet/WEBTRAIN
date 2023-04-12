import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/03_Home.vue'

const routes = [
  {
    path: '/01',
    name: '01_Register',
    component: () => import('../views/Login and Register/01_Register.vue')
  },
  {
    path: '/02',
    name: '02_Login',
    component: () => import('../views/Login and Register/02_Login.vue')
  },
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/03',
    name: '03_Home',
    component: HomeView
  },
  {
    path: '/04',
    name: '04_TrainNumber',
    component: () => import('../views/04_TrainNumber.vue')
  },
  {
    path: '/05',
    name: '05_AvailableTrain',
    component: () => import('../views/05_AvailableTrain.vue')
  },
  {
    path: '/06',
    name: '06_Seat',
    component: () => import('../views/06_Seat.vue')
  },
  {
    path: '/07',
    name: '07_Examine',
    component: () => import('../views/07_Examine.vue')
  },
  {
    path: '/08',
    name: '08_MyTicket',
    component: () => import('../views/08_MyTicket.vue')
  },
  {
    path: '/09',
    name: '09_DownlodeTicket',
    component: () => import('../views/09_DownlodeTicket.vue')
  },
  {
    path: '/10',
    name: '10_PrintTicket',
    component: () => import('../views/10.PrintTicket.vue')
  },
  {
    path: '/100',
    name: '100_adminhomepage',
    component: () => import('../views/foradmin/100_adminhomepage.vue')
  },
  {
    path: '/101',
    name: '101_admincheckbooked',
    component: () => import('../views/foradmin/101_admincheckbooked.vue')
  },
  {
    path: '/102',
    name: '102_admincheckpayment',
    component: () => import('../views/foradmin/102_admincheckpayment.vue')
  },
  {
    path: '/103',
    name: '103_adminchecktrain',
    component: () => import('../views/foradmin/103_adminchecktrain.vue')
  },
  {
    path: '/104',
    name: '104_adminedittrain',
    component: () => import('../views/foradmin/104_adminedittrain.vue')
  },
  {
    path: '/104D',
    name: '104D_adminedittrainDEL',
    component: () => import('../views/foradmin/104D_adminedittrainDEL.vue')
  },
  {
    path: '/105',
    name: '105_admineditavailabletrain',
    component: () => import('../views/foradmin/105_admineditavailabletrain.vue')
  },
  {
    path: '/105D',
    name: '105D_admineditavailabletrainDEL',
    component: () => import('../views/foradmin/105D_admineditavailabletrainDEL.vue')
  },
  {
    path: '/106',
    name: '106_admineditroute',
    component: () => import('../views/foradmin/106_admineditroute.vue')
  },
  {
    path: '/106D',
    name: '106D_admineditrouteDEL',
    component: () => import('../views/foradmin/106D_admineditrouteDEL.vue')
  },
  {
    path: '/103-2',
    name: '103-2_admincheckavailabletrain',
    component: () => import('../views/foradmin/103-2_admincheckavailabletrain.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
