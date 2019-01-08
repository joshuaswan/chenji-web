<template>
  <div>
    <p>用户</p>
    <div>
      <!--<span>查询:</span>-->
      <!--<input name="query">-->
      <button class="btn" style="float: right;margin-right: 5px;" v-on:click="addUserInfo">新增</button>
    </div>
    <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>员工类型</th>
          <th>出生年月日</th>
          <th>电话</th>
          <th>密码</th>
          <th>登陆名</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in userInfo">
          <td>
            <input type="text" v-model="userInfo[index].name">
          </td>
          <td>
            <select class="select" v-model="userInfo[index].gender">
              <option value=0></option>
              <option v-for="gender in genders" v-bind:value="gender.gender">
                {{ gender.gender }}
              </option>
            </select>
          </td>
          <td>
            <select class="select" v-model="userInfo[index].staffType">
              <option value=0></option>
              <option v-for="staffType in staffType" v-bind:value="staffType">
                {{ staffType.name }}
              </option>
            </select>
          </td>
          <td>
            <el-date-picker v-model="userInfo[index].birthday" type="date" placeholder="出生日期">
            </el-date-picker>
          </td>
          <td><input type="tel" v-model="userInfo[index].phoneNumber"></td>
          <td><input type="password" v-model="userInfo[index].password"></td>
          <td><input type="text" v-model="userInfo[index].loginName"></td>
          <td>
            <button class="btn" v-on:click="saveUserInfo(index)">保存</button>
            <button class="btn" v-on:click="delUserInfo(index)">删除</button>
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
    name: 'userInfo',
    data() {
      return {
        userInfo: [],
        genders: [
          {
            gender: "男"
          }, {
            gender: "女"
          }
        ],
        staffType: [],
      }
    },
    components: {},
    methods: {
      addUserInfo: function () {
        console.log("adduserInfo")
        this.userInfo.push({})
      },
      saveUserInfo: function (index) {
        API.post("/userInfo/add", this.userInfo[index]).then(

        );
      },
      delUserInfo: function (index) {
        axios.delete(API.data().http + "/userInfo/delete?id=" + this.userInfo[index].id).then(
          this.userInfo.splice(index, 1)
        )
      },
      insertUserInfo: function (res) {
        this.userInfo = res;
        console.log("insert")
      },
      insertStaffType: function (res) {
        this.staffType = res;
      },
      init: function () {
        this.userInfo = null;
        var that = this;
        console.log(API.data().http)
        axios.get(API.data().http + "/userInfo/all").then(function (d) {
          console.log(d.data);
          that.insertUserInfo(d.data)
        });
        axios.get(API.data().http + "/staffType/all").then(function (d) {
          that.insertStaffType(d.data)
        });
      }
    },
    created: function () {
      this.init();
    }
  }
</script>

<style>

</style>
