<template>
  <div>
    <p>订单列表</p>

    <div>
      <span>查询:</span>
      <input name="query">
      <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addOrderList">新增</button>

    </div>
    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>订单号</th>
          <th>品名</th>
          <th>规格</th>
          <th>数量</th>
          <th>单位</th>
          <th>生产日期</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderList">
          <td>
            {{orderList[index].orderNumber}}
          </td>
          <td>
            <select class="select" v-model="orderList[index].goodsName">
              <option value=0></option>
              <option v-for="goodsName in goodsNames" v-bind:value="goodsName">
                {{ goodsName.name }}
              </option>
            </select>
          </td>
          <td>
            <select class="select" v-model="orderList[index].goodsType">
              <option value=0></option>
              <option v-for="goodsType in goodsTypes" v-bind:value="goodsType">
                {{ goodsType.name }}
              </option>
            </select>
          </td>
          <td><input type="number" v-model="orderList[index].quantity" ></td>
          <td>
            <select class="select" v-model="orderList[index].measureUnit">
              <option value=0></option>
              <option v-for="measureUnit in measureUnits" v-bind:value="measureUnit">
                {{ measureUnit.unit }}
              </option>
            </select>
          </td>
          <td>
            <el-date-picker v-model="orderList[index].releaseDate" type="date" placeholder="生产日期">
            </el-date-picker>
          </td>
          <td>
            <button class="btn" v-on:click="saveOrderList(index)">保存</button>
            <!--<button class="btn" v-on:click="delOrderList(index)">删除</button>-->
            <button class="btn" v-on:click="printOrder(index)">打印</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
//  import print from "./print"
  import API from '../api'
  import JsBarcode from 'jsbarcode'
  export default {
    name: '',
    data () {
        return {
            orderList:[],
          goodsNames:[],
          goodsTypes:[],
          measureUnits:[]
        }
    },
    components: {},
    methods: {
      addOrderList: function () {
        console.log("addOrderList")
        this.orderList.push({})
      },
      saveOrderList: function (index) {
        API.post("/orderList/addOrder", this.orderList[index]).then(

        );
      },
      delOrderList: function (index) {
        axios.delete(API.data().http + "/orderList/delete?id=" + this.orderList[index].id).then(
          this.orderList.splice(index, 1)
        )
      },
      printOrder: function (index) {
          console.log("print function")
      },
      insertOrderList: function (res) {
        this.orderList = res;
      },
      insertGoodsName: function (res) {
        this.goodsNames = res;
      },
      insertGoodsType: function (res) {
        this.goodsTypes = res;
      },
      insertMeasureUnit: function (res) {
        this.measureUnits = res;
      },
      init: function () {
        this.orderList = null;
        var that = this;
        console.log(API.data().http)
        axios.get(API.data().http + "/orderList/getOrderList").then(function (d) {
          console.log(d.data);
          that.insertOrderList(d.data)
        });
        axios.get(API.data().http + "/goodsName/all").then(function (d) {
          that.insertGoodsName(d.data)
        });
        axios.get(API.data().http + "/goodsType/all").then(function (d) {
          that.insertGoodsType(d.data)
        });
        axios.get(API.data().http + "/measureUnit/all").then(function (d) {
          that.insertMeasureUnit(d.data)
        });
      }
    },
    created: function () {
      this.init();
    },

  }
</script>

<style>
  @import "../assets/css/bootstrap.css";

</style>
