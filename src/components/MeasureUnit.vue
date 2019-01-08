<template>
  <div>
  <p>单位</p>

  <div>
    <!--<span>查询:</span>-->
    <!--<input name="query">-->
    <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addMeasureUnit">新增</button>

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
      <tr v-for="(item, index) in measureUnit">
        <td>
          {{measureUnit[index].id}}
        </td>
        <td>
          <input type="text" v-model="measureUnit[index].unit">
        </td>
        <td>
          <input type="text" v-model="measureUnit[index].des">
        </td>
        <td>
          <button class="btn" v-on:click="saveMeasureUnit(index)">保存</button>
          <button class="btn" v-on:click="delMeasureUnit(index)">删除</button>
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


  export default {
    name: 'measureUnit',
    data() {
      return {
        measureUnit: [],
      }
    },
    components: {},
    methods: {
      addMeasureUnit: function () {
          console.log("addMeasureUnit")
        this.measureUnit.push({
        })
      },
      saveMeasureUnit: function (index) {
        API.post("/measureUnit/add",this.measureUnit[index]).then(

        );
      },
      delMeasureUnit: function (index) {
        axios.delete(API.data().http + "/measureUnit/delete?id=" + this.measureUnit[index].id).then(
          this.measureUnit.splice(index,1)
        )
      },
      insertMeasureUnit:function (res) {
        this.measureUnit =res;
        console.log("insert")
      },
      init: function () {
        this.measureUnit=null;
        var that = this;
        axios.get(API.data().http + "/measureUnit/all").then(function(d){
          console.log(d.data);
          that.insertMeasureUnit(d.data)
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
