import { createApp, Vue } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

createApp(App).use(createPinia()).mount("#fa-card-designer");
