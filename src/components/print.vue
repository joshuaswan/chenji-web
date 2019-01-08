<template>
  <div>
    <div id="PrintContentDiv" style="width: 388px">
      <img src="../assets/barcode.png" alt="">
      <div>
        <span style="display:block;width: 150px;float: left;">品名：五年陈</span>
        <span>规格：十头</span>
      </div>
      <div>
        <span style="display:block;width: 150px;float: left;">重量：20Kg</span>
        <span>生产日期：2018-04-03</span>
      </div>
      <div>
        <span>入库日期：2018-04-21 09:20</span>
      </div>
      <p style="font-size: 153px">0027</p>
    </div>
    <div id="divButton">
      <input type="button" v-on:click="printdiv()" value="打 印"/><br/>

    </div>
  </div>

</template>

<script>
  import API from '../api'
  import axios from 'axios'


  export default {
    name: 'print',
    data(){
      return {}
    },
    components: {},
    methods: {
      printdiv: function () {
        var newstr = document.getElementById("PrintContentDiv").innerHTML;   //获得需要打印的内容
        // alert(newstr);
        var oldstr = document.body.innerHTML;   //保存原先网页的代码
        document.body.innerHTML = newstr; //将网页内容更改成需要打印
        window.print();
        document.body.innerHTML = oldstr;   //将网页还原
        return false;
      },
//
//      //打印页面预览
//      printpreview: function () {
//        var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
//        document.getElementById("divButton").style.display = "none";//隐藏打印及其打印预览页面
//        document.body.insertAdjacentHTML('beforeEnd', WebBrowser); //在body标签内加入html（WebBrowser activeX控件）
//        WebBrowser1.ExecWB(7, 1); //打印预览
//      },
//      preview: function (oper) {
//        if (oper < 10)
//        {
//          bdhtml = window.document.body.innerHTML;//获取当前页的html代码
//          sprnstr = "<!--startprint" + oper + "-->";//设置打印开始区域
//          eprnstr = "<!--endprint" + oper + "-->";//设置打印结束区域
//          prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html
//
//          prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));//从结束代码向前取html
//          window.document.body.innerHTML = prnhtml;
//          window.print();
//          window.document.body.innerHTML = bdhtml;
//        }
//      }
    }
  }
</script>

<style>

</style>
