<template>
  <div>
    <p>规格</p>
    <div>
      <!--<span>查询:</span>-->
      <!--<input name="query">-->
      <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addGoodsType">新增</button>

    </div>

    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>序号</th>
          <th>规格</th>
          <th>规格描述</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in goodsType">
          <td>
            {{goodsType[index].id}}
          </td>
          <td>
            <input type="text" v-model="goodsType[index].name">
          </td>
          <td>
            <input type="text" v-model="goodsType[index].des">
          </td>
          <td>
            <button class="btn" v-on:click="saveGoodsType(index)">保存</button>
            <button class="btn" v-on:click="delGoodsType(index)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import API from '../api'
  import axios from 'axios'


  let goodsType = []
  export default {
    name: 'goodsType',
    data() {
      return {
        goodsType: [],
      }
    },
    components: {},
    methods: {
      addGoodsType: function () {
        this.goodsType.push({

        })
      },
      saveGoodsType: function (index) {
        API.post("/goodsType/add", this.goodsType[index]).then(

        );
      },
      delGoodsType: function (index) {
        axios.delete(API.data().http + "/goodsType/delete?id=" + this.goodsType[index].id).then(
          this.goodsType.splice(index, 1)
        )
      },
      insertGoodsType: function (res) {
        this.goodsType = res;
        console.log("insert")
      },
      init: function () {
        this.goodsType = null;
        var that = this;
        axios.get(API.data().http + "/goodsType/all").then(function (d) {
          console.log(d.data);
          that.insertGoodsType(d.data)
        })

      }
    },
    created: function () {
      this.init();
    }
  }
</script>

<style>

</style>
