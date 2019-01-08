<template>
  <div>
    <p>规格</p>
    <div>
      <!--<span>查询:</span>-->
      <!--<input name="query">-->
      <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addStaffType">新增</button>

    </div>

    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>序号</th>
          <th>员工类型</th>
          <th>描述</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in staffType">
          <td>
            {{staffType[index].id}}
          </td>
          <td>
            <input type="text" v-model="staffType[index].name">
          </td>
          <td>
            <input type="text" v-model="staffType[index].des">
          </td>
          <td>
            <button class="btn" v-on:click="saveStaffType(index)">保存</button>
            <button class="btn" v-on:click="delStaffType(index)">删除</button>
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


  let staffType = []
  export default {
    name: 'staffType',
    data() {
      return {
        staffType: [],
      }
    },
    components: {},
    methods: {
      addStaffType: function () {
        this.staffType.push({

        })
      },
      saveStaffType: function (index) {
        API.post("/staffType/add", this.staffType[index]).then(

        );
      },
      delStaffType: function (index) {
        axios.delete(API.data().http + "/staffType/delete?id=" + this.staffType[index].id).then(
          this.staffType.splice(index, 1)
        )
      },
      insertStaffType: function (res) {
        this.staffType = res;
        console.log("insert")
      },
      init: function () {
        this.staffType = null;
        var that = this;
        axios.get(API.data().http + "/staffType/all").then(function (d) {
          console.log(d.data);
          that.insertStaffType(d.data)
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
