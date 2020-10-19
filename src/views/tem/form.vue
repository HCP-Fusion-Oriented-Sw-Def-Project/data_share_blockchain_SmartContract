<template>
  <div>
    <el-button size="mini" @click="dialogFormVisible = true">点击</el-button>
    <el-dialog title="xxx表单" :visible.sync="dialogFormVisible" top="8vh">
      <el-form
        :inline="true"
        ref="dataForm"
        :model="temp"
        label-position="right"
        label-width="100px"
      >
        <el-col :span="12">
          <el-form-item label="账号 :" prop="loginName">
            <el-input v-model="temp.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码 :" prop="password2">
            <el-input v-model="temp.password2" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="password">
            <el-input v-model="temp.password" type="password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称 :" prop="name">
            <el-input v-model="temp.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱 :" prop="email">
            <el-input v-model="temp.email"></el-input>
          </el-form-item>
          <el-form-item label="电话 :" prop="phone">
            <el-input v-model.number="temp.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="add">确认</el-button>
        <el-button v-else type="primary" @click="null">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        loginName: '',
        name: '',
        email: '',
        phone: '',
        officeId: '',
        uacOffice: '',
        delFlag: 0,
        password2: '',
        password: '',
        roles: []
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
}
</style>
