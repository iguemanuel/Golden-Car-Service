import { createApp } from 'vue'

import App from './App.vue'
import { injectStructuredData } from './utils/structuredData'

import './styles/index.css'

createApp(App).mount('#app')
injectStructuredData()
