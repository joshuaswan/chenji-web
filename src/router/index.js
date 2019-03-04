import Vue from 'vue'
import Router from 'vue-router'
import InStock from "../components/InStock";
import OutStock from "../components/OutStock";
import Index from "../components/Index";

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        name: 'index',
        component: Index,
        children: [
          {
            path: 'inStock',
            name: 'inStock',
            component: InStock
          },
          {
            path: 'outStock',
            name: 'outStock',
            component: OutStock
          }
        ]
      }
    ]
  }
)
