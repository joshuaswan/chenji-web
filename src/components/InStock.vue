<template>
  <div>
    <h1 style="text-align: center">库存</h1>
    <div>
      品名：
      <Select v-model="goodsName" multiple style="width:500px">
        <Option v-for="item in allGoodsName" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
      <Button v-on:click="searchOrderList()">查询</Button>
      <Button v-on:click="orderModel = true" style="margin-left: 300px">入库</Button>
    </div>
    <div>
      <Table :data="showInStock" :columns="column"></Table>
    </div>
    <Modal
      v-model="orderModel"
      title="入库"
      @on-ok="stockIn"
      @on-cancel="cancel">
      <Form :model="orderInfo" :label-width="80" :rules="ruleValidate">
        <FormItem label="品名:" prop="goodsName">
          <Select v-model="orderInfo.goodsName">
            <Option v-for="(item,index) in allGoodsName" :value="index" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="规格:" prop="goodsType">
          <Select v-model="orderInfo.goodsType">
            <Option v-for="(item,index) in allGoodsType" :value="index" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="数量：" prop="quantity">
          <InputNumber v-model="orderInfo.quantity"/>
        </FormItem>
        <FormItem label="单位:" prop="measureUnit">
          <Select v-model="orderInfo.measureUnit">
            <Option v-for="(item,index) in allMeasureUnit" :value="index" :key="index">{{item.unit}}</Option>
          </Select>
        </FormItem>
        <FormItem label="入库人:" prop="stockInUser">
          <Select v-model="orderInfo.stockInUser">
            <Option v-for="(item,index) in allUserInfo" :value="index" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="orderInfo.comments"/>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="isOutStock"
      title="出库"
      @on-ok="stockOut"
      @on-cancel="cancel">
      <div>
        <p>{{orderInfo.id}}</p>
        <p>{{orderInfo.goodsName}}</p>
        <p>{{orderInfo.goodsType}}</p>
      </div>
      <Form :model="orderInfo" :label-width="80">
        <FormItem label="出库人:">
          <Select v-model="orderInfo.stockOutUser">
            <Option v-for="item in allUserInfo" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="去向：">
          <Input v-model="orderInfo.to"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "InStock",
    data() {
      return {
        orderInfo: {},
        isOutStock: false,
        orderModel: false,
        ruleValidate: {
          goodsName: [
            {required: true, message: '请填写品名', trigger: 'blur'}
          ],
          goodsType: [
            {required: true, message: '请填写规格', trigger: 'blur'}
          ],
          quantity: [
            {required: true, message: '请填写数量', trigger: 'blur'}
          ],
          measureUnit: [
            {required: true, message: '请填写单位', trigger: 'blur'}
          ],
          stockInUser: [
            {required: true, message: '请填写入库人', trigger: 'blur'}
          ],
        },
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
            title: '规格',
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
            title: '入库时间',
            key: 'createDate',
            sortable: true
          },
          {
            title: `来源`,
            key: 'orderFrom'
          },
          {
            title: '备注',
            key: 'comments'
          },
          {
            title: '出库',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.stockOutFun(params.index)
                    }
                  }
                }, '出库'),
              ]);
            }
          }
        ],
        inStock: [],
        goodsName: [],
        allGoodsName: [],
        showInStock: [],
        allGoodsType: [],
        allUserInfo: [],
        allMeasureUnit: []
      }
    },
    methods: {
      initPage() {
        var currentPage = this
        this.$http.get('api/orderList/getStockIn').then(
          function (response) {
            currentPage.inStock = response.data
            currentPage.showInStock = []
            var order = {}
            for (var i = 0; i < 100; i++) {
              order = currentPage.inStock[i]
              order.goodsName = order.goodsName.name
              order.goodsType = order.goodsType.name
              if (order.measureUnit === null) {
              } else {
                order.measureUnit = order.measureUnit.unit
              }
              currentPage.showInStock.push(order)
            }
          }
        )
        this.$http.get('api/goodsName/all').then(
          function (response) {
            currentPage.allGoodsName = response.data
          }
        )
        this.$http.get('api/goodsType/all').then(
          function (response) {
            currentPage.allGoodsType = response.data
          }
        )
        this.$http.get('api/userInfo/all').then(
          function (response) {
            currentPage.allUserInfo = response.data
          }
        )
        this.$http.get('api/measureUnit/all').then(
          function (response) {
            currentPage.allMeasureUnit = response.data
          }
        )
      },
      stockOutFun(index) {
        console.log(index)
        console.log(this.showInStock[index])
        this.orderInfo = this.showInStock[index]
        this.isOutStock = true
      },
      stockIn() {
        console.log(this.orderInfo)
        var currentPage = this
        this.orderInfo.isStock = 1
        this.orderInfo.goodsName = this.allGoodsName[this.orderInfo.goodsName]
        this.orderInfo.goodsType = this.allGoodsType[this.orderInfo.goodsType]
        this.orderInfo.measureUnit = this.allMeasureUnit[this.orderInfo.measureUnit]
        this.orderInfo.stockInUser = this.allUserInfo[this.orderInfo.stockInUser]
        this.orderInfo.createDate = new Date()
        this.$http.post('api/stockIn/save', this.orderInfo).then(
          function (response) {
            console.log(response)
            currentPage.orderInfo = {}
            currentPage.$Notice.success({
              title: response.data
            })
            currentPage.initPage()
          }
        ).catch(
          function (error) {
            currentPage.$Notice.success({
              title: '入库失败，请重新入库'
            })
          }
        )
      },
      stockOut() {
        var currentPage = this
        this.$http.post('api/stockOut/stockOut?orderNumber=' + this.orderInfo.orderNumber +
          '&userId=' + this.orderInfo.stockOutUser + '&to=' + this.orderInfo.to).then(
            function (response) {
              if (response.data === 'success') {
                currentPage.$Notice.success({
                  title: '出库成功！'
                })
                currentPage.initPage()
              }
            }
        ).catch(function (response) {
          currentPage.$Notice.error({
            title: '出库失败！'
          })
        })
      },
      cancel() {

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
      },
    },
    created() {
      this.initPage()
    }
  }
</script>

<style scoped>

</style>
