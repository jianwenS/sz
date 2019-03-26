<template>
    <div>
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
                value-key="name"
                ></el-autocomplete>
            </div>
            <div class="dialog_div">
                选择队列
                <el-select style="width:80%;" v-model="value" placeholder="请选择">
                    <el-option
                        size="medium"
                        v-for="item in options"
                        :key="item.queueName"
                        :label="item.queueName"
                        :value="item.queueName">
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
<style lang="less" scoped>

</style>