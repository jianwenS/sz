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
                    <div class="cc_message_search">
                        <div class="demo-input">
                            批次简称
                            <el-input class="el_input"
                                v-model="input">
                            </el-input>
                        </div>
                        <div class="demo-input">
                            选房日期
                            <el-date-picker 
                            class="el_input"
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </div>
                        <div class="demo-input">
                            批次简称
                            <el-select v-model="value" placeholder="请选择" class="el_input">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button type="primary">保存</el-button>
                        </div>
                        
                    </div>
                    <div class="cc_message_reslut">
                       <el-button class="add_button" @click="dialogVisible = true" type="primary">新增场次</el-button>
                       <el-table
                            :data="tableData"
                            border
                            :header-cell-style="{background:'(233, 233, 233)'}"
                            style="width: 100%;">
                            <el-table-column
                            prop="batchCode"
                            label="批次代码"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="batchName"
                            label="批次名称"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="chooseDate"
                            label="队列">
                            </el-table-column>
                            <el-table-column
                            prop="endTime"
                            label="选定日期">
                            </el-table-column>
                            <el-table-column
                            prop="queueName"
                            label="选房日期">
                            </el-table-column>
                            <el-table-column
                            prop="sceneNo"
                            label="场次号">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态">
                            <template slot-scope="scope">
                                <span class="green" v-if="scope.row.status == 0">待选房</span>
                                <span class="blue" v-else-if= "scope.row.status == 1">正在选房</span>
                                <span class="red" v-else= "scope.row.status == 2">结束选房</span>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 对话框 -->
        <el-dialog
          title="新增场次"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
            <div class="dialog_div">
                选择批次
                <el-autocomplete
                 class="dialog_div_input"
                  v-model="state4"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入关键词,例如龙悦居"
                  @select="handleSelect"
                ></el-autocomplete>
            </div>
             <div class="dialog_div">
                选择队列
                 <el-select style="width:80%;" v-model="value" placeholder="请选择">
                    <el-option
                        size="medium"
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
             <div class="dialog_div">
                选择日期
                 <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                选择时间
                <el-time-select
                  v-model="value1"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="选择时间">
                </el-time-select>
            </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import {getChoose_house} from "@/api/api.js"
export default {
    created() {
        getChoose_house('/choose_house/list',{
            pageIndex: 1,
            pageSize : 6
        }).then((res) => {
            const {data} = res.data;
            this.tableData = data.content;
        }).catch(err => {
            console.log(err);
        })
    },
    data() {
      return {
        activeArr:['1'],
        input:'',
        tags: [
          { name: '选房管理', type: '' },
          { name: '123', type: '' }
        ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value1: '',
        tableData: [],
        dialogVisible: false,
        restaurants: [],
        state4: '',
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
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
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
