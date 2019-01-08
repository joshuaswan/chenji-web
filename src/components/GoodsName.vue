<template>
  <div>
    <p>品名</p>
    <div>
      <!--<span>查询:</span>-->
      <!--<input name="query">-->
      <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addGoodsName">新增</button>

    </div>

    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>序号</th>
          <th>品名</th>
          <th>品名描述</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in goodsName">
          <td>
            {{goodsName[index].id}}
          </td>
          <td>
            <input type="text" v-model="goodsName[index].name">
          </td>
          <td>
            <input type="text" v-model="goodsName[index].des">
          </td>
          <td>
            <button class="btn" v-on:click="saveGoodsName(index)">保存</button>
            <button class="btn" v-on:click="delGoodsName(index)">删除</button>
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


  let  goodsName = []
  export default {
    name: 'goodsName',
    data() {
      return {
        goodsName: [],
      }
    },
    components: {},
    methods: {
      addGoodsName: function () {
          this.goodsName.push({

          })
      },
      saveGoodsName: function (index) {
          API.post("/goodsName/add",this.goodsName[index]).then(

          );
      },
      delGoodsName: function (index) {
          axios.delete(API.data().http +  "/goodsName/delete?id=" + this.goodsName[index].id).then(
              this.goodsName.splice(index,1)
          )
      },
      insertGoodsName:function (res) {
        this.goodsName =res;
        console.log("insert")
      },
      init: function () {
          this.goodsName=null;
          var that = this;
        axios.get(API.data().http + "/goodsName/all").then(function(d){
            console.log(d.data);
            that.insertGoodsName(d.data)
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
