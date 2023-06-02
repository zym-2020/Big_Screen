import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import DataVVue3 from "@kjgl77/datav-vue3";

const app = createApp(App);
app.use(DataVVue3);
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(ElementPlus, { locale });
app.use(store).use(router).mount("#app");
