<template>
  <div id="app">
    <div id="nav">
      <el-row class="tac">
        <el-col :span="12">
          <h5>目前还不知道叫什么</h5>
          <el-menu
                  :default-openeds="['1']"
                  class=""
                  @open="handleOpen"
                  @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span>这个也不知道</span>
              </template>
              <router-link to="/"><el-menu-item index="1-1">Home</el-menu-item></router-link>
              <router-link to="/bezier-path-example"><el-menu-item index="1-2">BezierPathExample</el-menu-item></router-link>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div id="view_container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  #nav {
    position: fixed;
    left: 30px;
    top: 30px;
    width: 400px;
    height: 100%;
    a {
    }
  }

  #view_container {
    display: inline-block;
    margin-left: 430px;
    width: calc(100% - 460px);
    padding-top: 80px;
    height: calc(100% - 80px);
  }
</style>
