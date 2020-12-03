<template>
  <div class="main">
    <el-steps
      :active="active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="原辅料" />
      <el-step title="生产加工" />
      <el-step title="物流记录" />
      <el-step title="经营销售" />
    </el-steps>
    <div
      v-if="active == 0"
      class="table1"
    >
      <table
        class="mailTable"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="column">
            原辅料名称
          </td>
          <td>
            {{ rawMaterial.material_name }}
          </td>
          <td class="column">
            生产公司
          </td>
          <td class="hover">
            <span
              style="border-bottom: 1px solid #909399; color: green;"
              @click="companyDialog = true;company = companys[0]"
            >{{ rawMaterial.comp_name }}</span>
          </td>
        </tr>
        <tr>
          <td class="column">
            规格
          </td>
          <td>{{ rawMaterial.format }}</td>
          <td class="column">
            购货方
          </td>
          <td>{{ rawMaterial.user_name }}</td>
        </tr>
        <tr>
          <td class="column">
            数量
          </td>
          <td>{{ rawMaterial.amount }}</td>
          <td class="column">
            购货方地址
          </td>
          <td>{{ rawMaterial.user_address }}</td>
        </tr>
        <tr>
          <td class="column">
            销售日期
          </td>
          <td>{{ rawMaterial.sale_date }}</td>
          <td class="column">
            购货方联系电话
          </td>
          <td>{{ rawMaterial.user_phone }}</td>
        </tr>
      </table>
    </div>
    <div
      v-if="active == 1"
      class="table1"
    >
      <table
        class="mailTable"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="column">
            统一社会信用代码
          </td>
          <td>{{ manufacture.manufacture_soical_code }}</td>
          <td class="column">
            企业名称
          </td>
          <td class="hover">
            <span
              style="border-bottom: 1px solid #909399;color: green;"
              @click="companyDialog = true;company = companys[1]"
            >{{ manufacture. manufacture_name }}</span>
          </td>
        </tr>
        <tr>
          <td class="column">
            产品质量检验合格证明
          </td>
          <td>{{ manufacture. product_code }}</td>
          <td class="column">
            产品名称
          </td>
          <td>{{ manufacture.product_name }}</td>
        </tr>
        <tr>
          <td class="column">
            生产批次
          </td>
          <td>{{ manufacture.product_batch }}</td>
          <td class="column">
            主要原辅料供应商
          </td>
          <td>{{ manufacture.material_name }}</td>
        </tr>
        <tr>
          <td class="column">
            生产企业地址
          </td>
          <td>{{ manufacture.comp_address }}</td>
          <td class="column">
            产品规格
          </td>
          <td>{{ manufacture.product_format }}</td>
        </tr>
        <tr>
          <td class="column">
            主要成分
          </td>
          <td>{{ manufacture.main_ingredients }}</td>
          <td class="column">
            主要成分采购批次
          </td>
          <td>{{ manufacture.ingredients_purchase_batch }}</td>
        </tr>
        <tr>
          <td class="column">
            生产日期
          </td>
          <td>{{ manufacture.production_date }}</td>
          <td class="column">
            保质期
          </td>
          <td>{{ manufacture.shelf_life }}</td>
        </tr>

        <tr>
          <td class="column">
            主要原料名称
          </td>
          <td>{{ manufacture.material_name }}</td>
          <td class="column">
            主要原辅料批次
          </td>
          <td>{{ manufacture.material_batch }}</td>
        </tr>
        <tr>
          <td class="column">
            储存环境
          </td>
          <td>{{ manufacture.storage_envir }}</td>
        </tr>
      </table>
    </div>
    <div
      v-if="active == 2"
      class="table1"
    >
      <el-table
        :data="logistic"
        style="width:100%;"
      >
        <el-table-column
          :key="Math.random()"
          label="物流承运企业名称"
          align="center"
        >
          <template v-slot="scope">
            <span
              class="link-type"
              @click="companyDialog = true;company = companys[2]"
            >{{ scope.row.logistic_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物流承运车辆牌号"
          prop="logistic_car_license"
          align="center"
        />
        <el-table-column
          label="仓储企业名称"
          prop="storage_comp_name"
          align="center"
        />
        <el-table-column
          label="仓库名称"
          prop="warehouse_name"
          align="center"
        />
        <el-table-column
          label="仓储地址"
          prop="warehouse_address"
          align="center"
        />
        <!-- vue会对相同的dom节点复用，可能会对后面table会有影响，因此指定一个唯一的key，标识这个dom节点是唯一的，即无法复用 -->
        <el-table-column
          :key="Math.random()"
          label="出库/入库"
          align="center"
        >
          <template v-slot="scope">
            <span v-show="scope.row.inorout === '0'">入库</span>
            <span v-show="scope.row.inorout === '1'">出库</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实际入库/出库数量"
          prop="bound_amount"
          align="center"
        />
        <el-table-column
          label="入库/出库时间"
          prop="bound_time"
          align="center"
        />
        <el-table-column
          label="生产企业名称"
          prop="manufacture_name"
          align="center"
        />
        <el-table-column
          label="食品名称"
          prop="food_name"
          align="center"
        />
      </el-table>
    </div>
    <div
      v-if="active==3"
      class="table1"
    >
      <el-table :data="sales">
        <el-table-column
          label="食品名称"
          prop="food_name"
          align="center"
        />
        <el-table-column
          label="生产企业名称"
          prop="manufacture_name"
          align="center"
        />
        <el-table-column
          :key="Math.random()"
          label="经营企业名称"
          align="center"
        >
          <template v-slot="scope">
            <span
              class="link-type"
              @click="companyDialog = true;company = companys[3]"
            >{{ scope.row.dealer_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="生产日期"
          prop="production_date"
          align="center"
        />
        <el-table-column
          label="销售日期"
          prop="sale_date"
          align="center"
        />
        <el-table-column
          label="生产批次"
          prop="product_batch"
          align="center"
        />
        <el-table-column
          label="购货人"
          prop="user_name"
          align="center"
        />
      </el-table>
    </div>
    <div class="footer">
      <el-button
        v-if="active != 0"
        @click="pre"
      >
        上一步
      </el-button>
      <el-button
        v-if="active != 3"
        @click="next"
      >
        下一步
      </el-button>
    </div>
    <el-dialog
      title="公司信息"
      :visible.sync="companyDialog"
    >
      <table
        class="mailTable"
        cellspacing="0"
        cellpadding="0"
      >
        <tr>
          <td class="column">
            企业名称
          </td>
          <td>
            {{ company.comp_name }}
          </td>
          <td class="column">
            法定代表人
          </td>
          <td class="hover">
            {{ company.legal_person }}
          </td>
        </tr>
        <tr>
          <td class="column">
            登记状态
          </td>
          <td>{{ company.register_state }}</td>
          <td class="column">
            成立日期
          </td>
          <td>{{ company.establish_date }}</td>
        </tr>
        <tr>
          <td class="column">
            注册资本
          </td>
          <td>{{ company.registered_capital }}</td>
          <td class="column">
            实缴资本
          </td>
          <td>{{ company.paidIn_capital }}</td>
        </tr>
        <tr>
          <td class="column">
            核实日期
          </td>
          <td>{{ company.verify_date }}</td>
          <td class="column">
            所属行业
          </td>
          <td>{{ company.industry }}</td>
        </tr>
        <tr>
          <td class="column">
            企业类型
          </td>
          <td>{{ company.enterprise_type }}</td>
          <td class="column">
            营业期限
          </td>
          <td>{{ company.operating_period }}</td>
        </tr>
        <tr>
          <td class="column">
            登记机关
          </td>
          <td>{{ company.register_agency }}</td>
          <td class="column">
            人员规模
          </td>
          <td>{{ company.staff_size }}</td>
        </tr>
        <tr>
          <td class="column">
            所属地区
          </td>
          <td>{{ company.area }}</td>
          <td class="column">
            经营范围
          </td>
          <td>{{ company.business_scope }}</td>
        </tr>
      </table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="companyDialog = false"
        >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      active: 0,
      companyDialog: false,
      // 原辅料表格对象
      rawMaterial: {},

      // 生产加工表格对象
      manufacture: {},

      // 物流企业表格对象
      logistic: [],

      // 经营销售表格对象
      sales: [],

      // 所有公司
      companys: [],

      company: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {

    // 获取表格数据
    getData() {
      const self = this
      const sessionStorage = window.sessionStorage
      window.executeContract('FoodManagment', 'association', sessionStorage.getItem('keyword'), (res) => {
        const data = JSON.parse(res.result)
        console.log(data.data)
        let company = {}

        // 原材料数据初始化
        const origin_rawMaterial = data.data.raw_materials_sale_record.data[0]
        const origin_rawMaterial_columns = data.data.raw_materials_sale_record.columns
        const rawMaterial_company = data.data.raw_materials_sale_record.registration_info
        for (let i = 0; i < origin_rawMaterial_columns.length; i++) {
          // vue不能检测到对象属性的添加或删除，要调用vue.set方法将响应式属性添加到嵌套的对象上
          Vue.set(self.rawMaterial, origin_rawMaterial_columns[i], origin_rawMaterial[i])
        }
        for (let j = 0; j < rawMaterial_company.columns.length; j++) {
          company[rawMaterial_company.columns[j]] = rawMaterial_company.data[0][j]
        }
        self.companys.push(company)

        // 生产加工数据初始化
        const origin_manufacture = data.data.manufacture_product_info.data[0]
        const origin_manufacture_columns = data.data.manufacture_product_info.columns
        const manufacture_company = data.data.manufacture_product_info.registration_info
        for (let i = 0; i < origin_manufacture_columns.length; i++) {
          Vue.set(self.manufacture, origin_manufacture_columns[i], origin_manufacture[i])
        }
        company = {}
        for (let j = 0; j < manufacture_company.columns.length; j++) {
          company[manufacture_company.columns[j]] = manufacture_company.data[0][j]
        }
        self.companys.push(company)

        // 物流记录初始化
        const origin_logistic = data.data.storage_inandoutbound.data // 物流记录会有多条
        const origin_logistic_columns = data.data.storage_inandoutbound.columns
        const logistic_company = data.data.storage_inandoutbound.registration_info
        let obj = {}
        for (const v of origin_logistic) {
          for (let i = 0; i < origin_logistic_columns.length; i++) {
            obj[origin_logistic_columns[i]] = v[i]
          }
          self.logistic.push(obj)
        }
        company = {}
        for (let j = 0; j < logistic_company.columns.length; j++) {
          company[logistic_company.columns[j]] = logistic_company.data[0][j]
        }
        self.companys.push(company)

        //  经营销售初始化
        const origin_sales = data.data.food_sales_record.data
        const origin_sales_columns = data.data.food_sales_record.columns
        const sales_company = data.data.food_sales_record.registration_info
        obj = {}
        for (const v of origin_sales) {
          for (let i = 0; i < origin_sales_columns.length; i++) {
            obj[origin_sales_columns[i]] = v[i]
          }
          self.sales.push(obj)
        }
        company = {}
        for (let j = 0; j < sales_company.columns.length; j++) {
          company[sales_company.columns[j]] = sales_company.data[0][j]
        }
        self.companys.push(company)
      })
    },

    // 下一步
    next() {
      this.active++
    },

    // 上一步
    pre() {
      this.active--
    }
  }
}
</script>

<style>
.main {
  position: relative;
  width: 100%;
  height: 100%;
}
.table1 {
  margin-top: 30px;
}
.mailTable {
  width: 80%;
  margin: 0 auto;
  border-top: 1px solid #E6EAEE;
  border-left: 1px solid #E6EAEE;
}
.mailTable tr td {
  width: 100px;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  padding: 0 10px;
  border-bottom: 1px solid #E6EAEE;
  border-right: 1px solid #E6EAEE;
}
.mailTable tr td.column {
  background-color: #EFF3F6;
  color: #393C3E;
  width: 20%;
}
.footer {
  position: absolute;
  right: 60px;
  bottom: 280px;
}
.hover {
  cursor: pointer;
}
</style>
