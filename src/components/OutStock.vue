<template>
  <div>
    <h1 style="text-align: center">已出库</h1>
    <div>
      品名：
      <Select v-model="goodsName" multiple style="width:500px">
        <Option v-for="item in allGoodsName" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
      <Button v-on:click="searchOrderList()">查询</Button>
    </div>
    <div>
      <Table :data="showInStock" :columns="column"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InStock",
    data() {
      return {
        column: [
          {
            title: '编号',
            key: 'id',
            sortable: true
          },
          {
            title: '品名',
            key: 'goodsName',
            sortable: true
          },
          {
            title: '品类',
            key: 'goodsType',
            sortable: true
          },
          {
            title: '数量',
            key: 'quantity',
          },
          {
            title: '单位',
            key: 'measureUnit'
          },
          {
            title: '出库时间',
            key: 'stockOutDate'
          },
          {
            title: '货物流向',
            key: 'orderTo'
          },
          {
            title: '入库时间',
            key: 'createDate',
            sortable: true
          },
          {
            title: '备注',
            key: 'comments'
          }
        ],
        inStock: [],
        goodsName: [],
        allGoodsName: [],
        showInStock: []
      }
    },
    methods: {
      initPage() {
        var currentPage = this
        this.$http.get('api/orderList/getStockOut').then(
          function (response) {
            currentPage.inStock = response.data
            currentPage.showInStock = []
            var order = {}
            for (var i = 0; i < 100; i++) {
              order = currentPage.inStock[i]
              order.goodsName = order.goodsName.name
              order.goodsType = order.goodsType.name
              order.measureUnit = order.measureUnit.unit
              currentPage.showInStock.push(order)
            }
          }
        )
        this.$http.get('api/goodsName/all').then(
          function (response) {
            currentPage.allGoodsName = response.data
          }
        )
      },
      searchOrderList() {
        var currentPage = this
        this.showInStock = []
        console.log(this.goodsName)
        console.log(this.inStock.length)
        this.inStock.forEach(function (value) {
          if (currentPage.in_array(value.goodsName, currentPage.goodsName)) {
            currentPage.showInStock.push(value)
          } else {

          }
        })
      },
      in_array(search, array) {
        for (var i in array) {
          if (array[i] == search) {
            return true;
          }
        }
        return false;
      }
    },
    created() {
      this.initPage()
    }
  }
</script>

<style scoped>

</style>
