<template>
  <div>
    <div class="header"></div>
    <div class="container">
      <ul>
        <li v-for="item in links"><a @click="$goRoute(item.route)">{{item.text}}</a></li>
      </ul>
      <router-view></router-view>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        links: [
          {
            text: '库存',
            route: '/OrderList'
          },
          {
            text: '出库查询',
            route: '/Storage'
          },
          {
            text: '品名',
            route: '/GoodsName'
          },
          {
            text: '规格',
            route: '/GoodsType'
          },
          {
            text: '单位',
            route: '/MeasureUnit'
          },
          {
            text: '用户类型',
            route: '/StaffType'
          },
          {
            text: '用户',
            route: '/UserInfo'
          }
        ]
      }
    }
  }
</script>

<style>

  @import "assets/css/chenji.css";
  @import "assets/css/bootstrap.css";
  .text-center {
    text-align: center;
  }
  .spacing {
    margin-top: 30px;
  }
  .red {
    color: darkred;
  }
  ul li {
    display: inline-block;
    margin-right: 10px;
  }
  ul li a{
    display: inherit;
    padding: 5px 10px;
    border: 1px solid #ccc;
  }
  ul li a:hover{
    cursor: pointer;
    color: #fff;
    background-color: #138bec;
    border: 1px solid #138bec;
  }
</style>
