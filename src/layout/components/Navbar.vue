<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" />

          <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

          <screenfull id="screenfull" class="right-menu-item hover-effect" />

          <el-tooltip
            :content="$t('navbar.size')"
            effect="dark"
            placement="bottom"
          >
            <size-select
              id="size-select"
              class="right-menu-item hover-effect"
            />
          </el-tooltip>

          <!-- <lang-select class="right-menu-item hover-effect" /> -->
        </template>

        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img :src="imageUrl" class="user-avatar" />
            <!-- https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80 -->
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <router-link to="/profile/index">
              <el-dropdown-item>
                {{ $t('navbar.profile') }}
              </el-dropdown-item>
            </router-link>-->
            <el-dropdown-item divided>
              <span
                style="display:block;"
                @click="dialogFormVisible = true"
              >个人信息</span>
            </el-dropdown-item>
            <router-link to="/">
              <el-dropdown-item divided>
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span
                style="display:block;"
                @click="dialogChangePassword = true"
              >修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dialog
        title="个人信息"
        :visible.sync="dialogFormVisible"
        top="8vh"
        :append-to-body="true"
      >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="userInfo"
          label-position="right"
          label-width="90px"
          style=" margin-left:50px;margin-right:50px;  "
        >
          <el-form-item label="头像 :">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip" style="margin-top:-20px">
                点击图片可更改头像
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="账号 :" style="margin-top:-10px">
            {{ loginName }}
          </el-form-item>
          <el-form-item label="姓名 :" prop="name">
            <el-input v-model="userInfo.name" style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱 :" prop="email">
            <el-input
              v-model="userInfo.email"
              style="width:400px"
              suffix-icon="el-icon-message"
            />
          </el-form-item>
          <el-form-item label="电话 :" prop="phone">
            <el-input
              v-model="userInfo.phone"
              style="width:400px"
              suffix-icon="el-icon-phone"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="handleUserInfo">
            确认
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogChangePassword"
        top="8vh"
        :append-to-body="true"
      >
        <el-form
          ref="passwordForm"
          :rules="passwordRules"
          :model="password"
          label-position="right"
          label-width="90px"
          style=" margin-left:50px;margin-right:50px;  "
        >
          <el-form-item label="原密码 :" prop="old" style="margin-top:-10px">
            <el-input v-model="password.old" style="width:400px" />
          </el-form-item>
          <el-form-item label="新密码 :" prop="new">
            <el-input v-model="password.new" style="width:400px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChangePassword = false">
            取消
          </el-button>
          <el-button type="primary" @click="handlePasswordChange">
            确认
          </el-button>
        </div>
      </el-dialog>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'
import { updateUser, getUserInfo, updatePassword } from '@/api/user'
import store from '@/store'
// import { uploadImage } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    Screenfull,
    SizeSelect,
    // LangSelect,
    Search
  },
  data() {
    return {
      dialogChangePassword: false,
      userInfo: [],
      dialogFormVisible: false,
      loginName: '',
      temp: {
        name: '',
        email: '',
        mobile: '',
        phone: '',
        photo: ''
      },
      password: {
        old: '',
        new: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'title is required',
            trigger: ['change', 'blur']
          }
        ]
      },
      passwordRules: {
        old: [
          {
            required: true,
            message: 'password is required',
            trigger: ['change', 'blur']
          }
        ],
        new: [
          {
            required: true,
            message: 'password is required',
            trigger: ['change', 'blur']
          }
        ]
      },
      imageUrl:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3343963646,576364510&fm=26&gp=0.jpg',
      // image: '',
      upLoadData: {
        filePath: '/mycode/dataset'
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device']),
    headers() {
      return {
        'X-AOHO-UserId': store.getters.id,
        Authorization: 'Bearer ' + store.getters.token
      }
    },
    action() {
      return 'http://140.143.189.38:7979/' + 'spark/hdfs/createWriteFileByFile'
    }
  },
  created() {
    this.getUserAllInfo()
    // if (this.temp.photo != null) {
    //   this.changePhoto()
    // }
  },
  methods: {
    getImage() {},
    getUserAllInfo() {
      getUserInfo().then(response => {
        console.log(response.data)
        this.loginName = response.data.loginName
        this.userInfo = response.data
        // this.imageUrl = 'http://10.4.20.100:7979/spark/hdfs/downloadFile?filePath=' + this.temp.photo
        // this.password.oldPassword = response.data.password
      })
    },
    changePhoto() {
      // downloadImageFile(this.temp.photo).then(response => {
      //   return 'data:image/png;base64,' + btoa(
      //     new Uint8Array(response.data)
      //       .reduce((data, byte) => data + String.fromCharCode(byte), '')
      //   )
      // }).then(data => {
      //   this.image = data
      //   this.imageUrl = data
      // })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = file.url
    },
    beforeAvatarUpload(file) {
      // this.upLoadData.filePath += file.name
      const fd = new FormData()
      fd.append('file', file)
      // console.log(fd.get('file'))
      // uploadImage(fd).then(res => {

      // })
    },
    handleUserInfo() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          // if(this.password.newPassword!=''){
          //   updatePassword(this.password).then(() => {
          //     console.log("1")
          //   })
          // }else{
          //   this.password.newPassword=this.password.oldPassword
          // }
          // this.temp.photo = this.upLoadData.filePath
          updateUser(this.userInfo).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: response.data.msg,
              type: 'success',
              duration: 2000
            })
          })
          this.getUserAllInfo()
          // this.changePhoto()
        }
      })
    },
    // 修改密码
    handlePasswordChange() {
      this.$refs['passwordForm'].validate(valid => {
        if (valid) {
          const newData = {
            id: this.userInfo.id,
            passwordOld: this.password.old,
            passwordNew: this.password.new
          }
          updatePassword(newData).then(res => {
            console.log(res)
          })
          this.dialogChangePassword = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
