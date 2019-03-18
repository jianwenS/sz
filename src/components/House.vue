<template>
    <div class="House">
        <el-row class="tac">
          <el-col :span="4" class="nav_left">
            <el-menu
             :default-openeds="activeArr"
             default-active="1-3"
             :unique-opened="true"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
                  <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-mobile-phone"></i>
                        <span>配租管理</span>
                      </template>
                        <el-menu-item index="1-1">新增批次</el-menu-item>
                        <el-menu-item index="1-2">批次管理</el-menu-item>
                        <el-menu-item index="1-3">选房管理</el-menu-item>
                        <el-menu-item index="1-4">签约管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>销售管理</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>产业配套住房</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>企事业单位自有住房</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>补贴管理</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>批次查询</span>
                        </template>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-mobile-phone"></i>
                            <span>合同查询</span>
                        </template>
                    </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="20">
            <h5>默认颜色</h5>
          </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
      return {
        activeArr:['1']
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
    }
}
</script>

<style>
 .el-icon-arrow-down:before{content: "" !important;}
 .el-submenu__title:hover, .el-submenu .el-menu-item:hover{background-color: transparent;color:rgb(49, 193, 248);}
 .el-submenu{position: relative;}
 .nav_left{border-radius: 15px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    -moz-box-shadow: 1px 1px 8px rgba(215, 215, 215, 0.349019607843137);
    -webkit-box-shadow: 1px 1px 8px rgba(215, 215, 215, 0.349019607843137);
    box-shadow: 1px 1px 8px rgba(215, 215, 215, 0.349019607843137);}
 .el-submenu:hover::after{content: "";background:rgba(49, 193, 248, 1);position: absolute;right:0px;top:6px;width:2px;height:40px; display:inline-block;}
 .el-menu-item.is-active::before{content: "\B7";font-size: 60px;display: inline-block;position: absolute;left: 10%;top: -2px;}
</style>
