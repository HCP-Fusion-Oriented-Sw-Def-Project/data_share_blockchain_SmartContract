<template>
  <div class="box1">
    <div class="search">
      <h1>食品数据信息追溯系统</h1>
      <h4 style="margin-top:0px">
        Food Data Information Traceback System
      </h4>
      <div style="margin-top:30px">
        <el-form
          ref="submit"
          :model="key"
          :rules="rule"
        >
          <el-form-item prop="keyword">
            <el-input
              v-model="key.keyword"
              :placeholder="placeholder"
              prefix-icon="el-icon-search"
              style="width: 350px; margin-right: 10px"
              clearable
              @clear="search"
              @keydown.enter.native="search"
            />
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="search"
            >
              搜索
            </el-button>
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="searchChain"
            >
              全链条追溯
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { initWSocket } from '@/utils/wsCluster'
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: '请输入企业名称...'
    }
  },
  data() {
    return {
      key: {
        keyword: '2020110132'
      },
      rule: {
        keyword: [{ required: true, message: '请输入搜索内容' }],
      }
    }
  },
  created() {
    initWSocket()
  },
  methods: {
    search() {
      this.$refs['submit'].validate((valid) => {
        if (valid) {
          const sessionStorage = window.sessionStorage
          sessionStorage.setItem('keyword', this.key.keyword)
          this.$router.push({ name: 'process' })
        }
      })
    },

    searchChain() {
      this.$refs['submit'].validate((valid) => {
        if (valid) {
          const sessionStorage = window.sessionStorage
          sessionStorage.setItem('keyword', this.key.keyword)
          this.$router.push({ name: 'graph' })
        }
      })
    }
  }
}
</script>
<style >
.box1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.search {
  width: 700px;
  height: 400px;
}
h1 {
  font-family: 'Helvetica Neue';
  letter-spacing: 0.1em;
  color: #685110;
}
h4 {
  color: #c8a039;
}
</style>
