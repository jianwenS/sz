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
          <el-col :span="20" class="navRight">
            <el-row class="navRight_main">
                <el-col :span="24" class="title_close">
                    <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        closable
                        :type="tag.type">
                        {{tag.name}}
                    </el-tag>
                </el-col>
                <el-col :span="24" class="cc_message">
                   <router-view></router-view>
                </el-col>
            </el-row>
          </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
      return {
        activeArr:['1'],
        input:'',
        tags: [
          { name: '选房管理', type: '' },
          { name: '123', type: '' }
        ],
        options: [],
        value: '',
        value1: '',
        piciArray:[],
        tableData: [],
        dialogVisible: false,
        restaurants: [],
        state4: null,
        timeout:  null
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      loadAll() {
        return this.piciArray;
      },
      querySearchAsync(queryString, cb) {
        // 获取批次
        getChoose_house('/choose_house/batch/list')
        .then((res) => {
            const {data} = res.data;
            var restaurants =  data;
            cb(restaurants);
        }).catch(err => {
            console.log(err);
        })
    },
      handleSelect(item) {
         // 获取队列
         getChoose_house('/choose_house/queue/list',{batchCode:item.code})
        .then((res) => {
            const {data} = res.data;
            this.options = data;
        }).catch(err => {
            console.log(err);
        })
      }
    },
     mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>

<style>
 .House,.tac,.nav_left,.el-menu,.navRight,.navRight_main,.cc_message{height:100%;}
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
.title_close{background-color: rgba(230, 240, 252, 1);height:40px;line-height: 40px;}
/* 场次 */
.cc_message{background-color: rgba(247, 248, 248, 1);padding:20px;}
.el_input{width: 230px;}
.demo-input{margin-left:30px;}
.demo-input{display:inline-block;min-width: 180px;}
.cc_message_search{background-color:#ffffff;border:1px solid #e5e5e5;padding:20px 0;}
.add_button{margin:10px;}
.el-table thead{color:#000000;font-size:12px;font-weight:400;background-color:#ccc;}
.green{color:green;}
.blue{color:blue;}
.red{color:red;}
.dialog_div{width:100%;}
.dialog_div{margin:10px 0;}
.dialog_div_input,.dialog_div_input>el-select{width: 80%;}
.el-dialog__footer{text-align: center;}
</style>
