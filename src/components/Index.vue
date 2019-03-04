<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider :collapsed-width="78">
        <Menu active-name="inStock" @on-select="selectMenu" theme="dark" width="auto">
          <MenuItem name="inStock">
            <span>库存</span>
          </MenuItem>
          <MenuItem name="outStock">
            <span>已出库</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    methods: {
      selectMenu(name) {
        this.$router.push({path: name})
      }
    }
  }
</script>

<style scoped>
  .layout-con {
    height: 100%;
    width: 100%;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
