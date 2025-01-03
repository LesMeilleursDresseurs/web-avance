import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from 'vuex'
import vue3GoogleLogin from 'vue3-google-login'
import Notification from './components/Notification.vue'

const app = createApp(App)

app.use(router)
app.component('NotificationComponent', Notification)
app.use(vuex)
app.use(vue3GoogleLogin, {
  clientId: '97179479469-25icv2nfm405m6u4qm89kktc3cdgklsb.apps.googleusercontent.com',
})

app.mount('#app')
