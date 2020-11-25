<template>
  <div>
    <el-container>
      <el-header style="height:200px;">
        <div class="top">
          <div style="margin-top:15px; margin-left: 12px; height:215x;">
            <span style="font-size:15px; font-weight:bold;">基础信息:</span>
          </div>
          <div class="top-main">
            <div class="circle">
              <el-form
                ref="basicForm"
                :rules="basic_rules"
                :model="basicInfo"
                label-position="right"
                label-width="150px"
                :inline="true"
              >
                <el-col :span="10">
                  <el-form-item
                    label="所属分类:"
                    prop="type"
                  >
                    <el-input
                      v-model="basicInfo.type"
                      class="filter-item"
                      :disabled="typeVisible||isAllEdited"
                      size="small"
                      @focus="typeVisible = true"
                    />
                  </el-form-item>
                  <el-form-item
                    label="资源名称:"
                    prop="name"
                  >
                    <el-input
                      v-model="basicInfo.name"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited||isPartEdited"
                      placeholder="请输入合约名"
                    />
                  </el-form-item>
                  <el-form-item
                    label="资源描述:"
                    style="height:25px; "
                  >
                    <el-input
                      v-model="basicInfo.discription"
                      type="textarea"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="资源提供方:">
                    <el-input
                      v-model="basicInfo.provider"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                  <el-form-item label="资源提供方内部机构:">
                    <el-input
                      v-model="basicInfo.providerOffice"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                  <el-form-item
                    label="所属行业:"
                    prop="work"
                  >
                    <el-select
                      v-model="basicInfo.work"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    >
                      <el-option
                        v-for="item in optionWork"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="更新周期:"
                    prop="cyc"
                  >
                    <el-select
                      v-model="basicInfo.cyc"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    >
                      <el-option
                        v-for="item in optionCyc"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div style="margin-top:15px; margin-left: 12px; height:215x;">
          <span style="font-size:15px; font-weight:bold;">共享控制:</span>
        </div>
        <div class="middle">
          <el-form
            ref="controlForm"
            :rules="control_rules"
            :model="shareControl"
            label-position="right"
            label-width="150px"
            :inline="true"
          >
            <el-col :span="10">
              <el-form-item
                label="访问权限:"
                prop="permiss"
              >
                <el-select
                  v-model="shareControl.permiss"
                  class="filter-item"
                  size="small"
                  :disabled="isAllEdited||isPartEdited"
                >
                  <el-option
                    v-for="item in optionPermiss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="共享类型:"
                prop="shareType"
              >
                <el-select
                  v-model="shareControl.shareType"
                  class="filter-item"
                  size="small"
                  :disabled="isAllEdited"
                >
                  <el-option
                    v-for="item in optionType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="社会公开:"
                prop="public"
              >
                <el-select
                  v-model="shareControl.public"
                  class="filter-item"
                  size="small"
                  :disabled="isAllEdited"
                >
                  <el-option
                    v-for="item in optionPublic"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="默认授权使用:"
                prop="defaultPermiss"
              >
                <el-select
                  v-model="shareControl.defaultPermiss"
                  class="filter-item"
                  size="small"
                  :disabled="isAllEdited"
                >
                  <el-option
                    v-for="item in optionDefaultPermiss"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="共享说明:"
                prop="discription"
                style="height:25px; "
              >
                <el-input
                  v-model="shareControl.discription"
                  type="textarea"
                  :disabled="isAllEdited"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="接入文件类型:"
                prop="fileType"
              >
                <el-select
                  v-model="shareControl.fileType"
                  class="filter-item"
                  size="small"
                  :disabled="isAllEdited||isPartEdited"
                  @change="handleChange()"
                >
                  <el-option
                    v-for="item in optionFile"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <div v-if="shareControl.fileType ==='1' && !isAllEdited">
                <el-form-item
                  label="数据库链接:"
                  style="margin-left:-1px;"
                >
                  <el-input
                    v-model="shareControl.dataLink"
                    size="small"
                    style="width:290px;"
                    :disabled="isAllEdited||isPartEdited"
                  >
                    <template slot="prepend">
                      jdbc:mysql://
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item label="数据库用户名:">
                  <el-input
                    v-model="shareControl.dataName"
                    class="filter-item"
                    size="small"
                    :disabled="isAllEdited||isPartEdited"
                  />
                </el-form-item>
                <!-- <div v-if="isAllEdited"> -->
                <el-form-item
                  v-if="!isAllEdited"
                  label="数据库密码:"
                >
                  <el-input
                    v-model="shareControl.dataPassword"
                    class="filter-item"
                    size="small"
                    :disabled="isPartEdited"
                  />
                </el-form-item>
                <!-- </div> -->
                <el-form-item label="选择数据源:">
                  <el-select
                    v-model="shareControl.dataSource"
                    class="filter-item"
                    size="small"
                    :disabled="isAllEdited||isPartEdited"
                  >
                    <el-option
                      v-for="item in optionData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="数据表名称:">
                  <el-input
                    v-model="shareControl.dataTable"
                    size="small"
                    :disabled="isAllEdited||isPartEdited"
                    @input="handleChange()"
                  />
                </el-form-item>
              </div>
              <div v-if="shareControl.fileType ==='2'">
                <el-form-item label="上传csv文件:">
                  <el-upload
                    class="upload-demo"
                    action="#"
                    accept="text/csv"
                    :before-upload="beforeUpload"
                    :on-exceed="handleExceed"
                    :limit="1"
                    :file-list="fileList"
                    :http-request="httpRequest"
                  >
                    <el-button
                      size="small"
                      type="primary"
                      :disabled="isAllEdited || isPartEdited"
                    >
                      点击上传
                    </el-button>
                    <div
                      slot="tip"
                      class="el-upload__tip"
                    >
                      只能上传csv/txt/excel文件，且不超过1M
                    </div>
                  </el-upload>
                </el-form-item>
              </div>
            </el-col>
          </el-form>
        </div>
        <div class="addParam">
          <div
            v-if="tableVisible && !isPartEdited"
            style="float: left;"
          >
            <span style="font-size:15px; font-weight:bold;margin-right:10px;">共享字段:</span>
            <el-button
              icon="el-icon-plus"
              type="info"
              circle
              size="small"
              :disabled="isAllEdited"
              @click="handleAddParam()"
            />
          </div>
        </div>

        <div
          v-if="tableVisible"
          class="tableShow"
        >
          <el-form
            ref="tableForm"
            :model="formTable"
            :rules="formTable.tableRules"
          >
            <el-table
              :data="formTable.tableData"
              border
              fit
              highlight-current-row
              style="width: 100%"
              :height="fullHeight-330"
            >
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center"
              />
              <el-table-column
                label="字段名称"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.chineseName'"
                    :rules="tableRules.chineseName"
                    style="height:33px;"
                  >
                    <el-input
                      v-model="scope.row.chineseName"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="英文编码"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.englishName'"
                    :rules="tableRules.englishName"
                    style="height:33px;"
                  >
                    <el-input
                      v-model="scope.row.englishName"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="字段类型"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.fieldType'"
                    :rules="tableRules.fieldType"
                    style="height:33px;"
                  >
                    <el-select
                      v-model="scope.row.fieldType"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    >
                      <el-option
                        v-for="item in paramType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="关键字"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.key'"
                    :rules="tableRules.keyword"
                    style="height:33px;"
                  >
                    <el-input
                      v-model="scope.row.keyword"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="字段描述"
                width="200"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.discription'"
                    :rules="tableRules.discription"
                    style="height:33px;"
                  >
                    <el-input
                      v-model="scope.row.discription"
                      :disabled="isAllEdited"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="访问权限"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'tableData.' + scope.$index +'.accessRight'"
                    :rules="tableRules.accessRight"
                    style="height:33px;"
                  >
                    <el-select
                      v-model="scope.row.accessRight"
                      class="filter-item"
                      size="small"
                      :disabled="isAllEdited"
                    >
                      <el-option
                        v-for="item in optionPermiss"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                v-if="related && !isAllEdited"
                label="关联字段"
                width="140"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.referenceField }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="170"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    style="margin-left:10px"
                    :disabled="isAllEdited"
                    @click="relateDialog = true;handleRelate(scope.$index)"
                  >
                    关联
                  </el-button>
                  <el-popover
                    placement="top"
                    width="160"
                    trigger="click"
                  >
                    <p>确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="cancelPopover(scope.row, scope.$index)"
                      >
                        取消
                      </el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="cancelPopover(scope.row, scope.$index),handleDelete(scope.row,scope.$index)"
                      >
                        确定
                      </el-button>
                    </div>
                    <el-button
                      :ref="'btn'+scope.$index"
                      slot="reference"
                      size="mini"
                      type="danger"
                      style="margin-left:10px"
                      :disabled="isAllEdited"
                    >
                      删除
                    </el-button>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      v-dialogDrag
      title="分类选择"
      :visible.sync="typeVisible"
      width="400px"
      top="7vh"
      append-to-body
    >
      <el-tree
        ref="tree1"
        :data="typeTree"
        default-expand-all
        accordion
        node-key="id"
        highlight-current
        :props="defaultProps"
        style="width:360px"
        @node-click="handleNodeClick"
      />
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="typeVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="typeVisible = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :title="shareControl.dataTable"
      :visible.sync="relateDialog"
      width="800px"
      top="7vh"
      append-to-body
    >
      <el-table
        :data="tableRelateData"
        border
        fit
        highlight-current-row
        style="width: 80%"
        :height="fullHeight-200"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          align="center"
        />
        <el-table-column
          label="字段名称"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="字段类型"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="相关术语"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.discription }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="96"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              style="margin-left:10px"
              @click="chooseRelate(scope.row)"
            >
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="relateDialog = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="relateDialog = false"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件传进来的对象
    data: Object,
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入名称'))
      } else {
        callback()
      }
    }
    var validateWork = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入行业'))
      } else {
        callback()
      }
    }
    var validateCyc = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入更新周期'))
      } else {
        callback()
      }
    }
    var validateFileType = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入接入文件类型'))
      } else {
        callback()
      }
    }
    var validateShareType = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择共享类型'))
      } else {
        callback()
      }
    }
    var validatePermiss = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择访问权限'))
      } else {
        callback()
      }
    }
    var validatePublic = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择是否公开'))
      } else {
        callback()
      }
    }
    var validateDefaultPermiss = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择是否默认授权使用'))
      } else {
        callback()
      }
    }
    return {
      // 关联dialog
      relateDialog: false,
      // 选择分类dialog
      typeVisible: false,
      // 是否显示关联字段
      related: false,
      // 关联字段的当前对象
      curRow: '',
      // 基本信息表单
      basicInfo: {
        type: '',
        typeId: '',
        name: '',
        discription: '',
        provider: '',
        providerOffice: '',
        work: '',
        cyc: ''
      },
      // 行业选项
      optionWork: [
        {
          value: '1',
          label: '医疗'
        },
        {
          value: '2',
          label: '城管'
        },
        {
          value: '3',
          label: '公安'
        },
        {
          value: '4',
          label: '军事'
        },
        {
          value: '5',
          label: '人口'
        }
      ],
      optionCyc: [
        {
          value: '1',
          label: '实时'
        },
        {
          value: '2',
          label: '每日'
        },
        {
          value: '3',
          label: '每周'
        },
        {
          value: '4',
          label: '每月'
        },
        {
          value: '5',
          label: '每季度'
        },
        {
          value: '6',
          label: '每半年'
        },
        {
          value: '7',
          label: '每年'
        },
        {
          value: '8',
          label: '其它'
        }
      ],
      // 共享控制
      shareControl: {
        permiss: '',
        shareType: '',
        discription: '',
        public: '',
        dataSource: '1',
        dataTable: 'iris',
        dataLink: '152.136.214.48:3306/cluster',
        dataName: 'root',
        dataPassword: 'Root@123',
        defaultPermiss: '',
        fileType: '',
        base64EncodedData: ''
      },
      // 访问权限
      optionPermiss: [
        {
          value: '1',
          label: '禁止访问'
        },
        {
          value: '2',
          label: '申请后访问'
        },
        {
          value: '3',
          label: '可申请访问但禁止查看详情'
        }
      ],
      // 共享类型
      optionType: [
        {
          value: '1',
          label: '文件'
        },
        {
          value: '2',
          label: '接口'
        },
        {
          value: '3',
          label: '不允许直接调用'
        }
      ],
      optionPublic: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      optionDefaultPermiss: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      // 选择数据源
      optionData: [
        {
          value: '1',
          label: 'sql'
        },
        {
          value: '2',
          label: 'hive'
        },
        {
          value: '3',
          label: 'hbase'
        }
      ],
      // 选择文件类型
      optionFile: [
        {
          value: '1',
          label: '数据库表'
        },
        {
          value: '2',
          label: 'csv文件'
        }
      ],
      // 字段类型
      paramType: [
        {
          value: '1',
          label: 'int'
        },
        {
          value: '2',
          label: 'long'
        },
        {
          value: '3',
          label: 'double'
        },
        {
          value: '4',
          label: 'String'
        }
      ],
      // 表格数据
      formTable: {
        tableData: []
      },
      tableRules: {
        chineseName: [
          {
            required: true,
            message: '字段名称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        discription: [
          {
            required: true,
            message: '字段描述不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },

      // 基础信息输入验证
      basic_rules: {
        name: [{ required: true, validator: validateName, trigger: ['blur', 'change'] }],
        work: [{ required: true, validator: validateWork, trigger: ['blur', 'change'] }],
        cyc: [{ required: true, validator: validateCyc, trigger: ['blur', 'change'] }]
      },
      // 共享控制输入验证
      control_rules: {
        permiss: [{ required: true, validator: validatePermiss, trigger: ['blur', 'change'] }],
        shareType: [{ required: true, validator: validateShareType, trigger: ['blur', 'change'] }],
        public: [{ required: true, validator: validatePublic, trigger: ['blur', 'change'] }],
        defaultPermiss: [{ required: true, validator: validateDefaultPermiss, trigger: ['blur', 'change'] }],
        fileType: [{ required: true, validator: validateFileType, trigger: ['blur', 'change'] }],
      },
      // 表格数据验证

      // 表格是否可见
      tableVisible: false,
      // 分类选择树结构
      typeTree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 关联表对象
      tableRelateData: [
        {
          name: 'id',
          type: 'int',
          discription: 'key'
        }
      ],
      fullHeight: document.documentElement.clientHeight - 200,
      isAllEdited: false,
      isPartEdited: false,
      // 上传文件列表
      fileList: [],
      dataToPar: {}
    }
  },
  watch: {
    dataToPar(val) {
      this.$store.commit('setDataToPar', this.dataToPar)
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return () => {
        window.clientHeight = document.body.clientHeight
        that.fullHeight = window.clientHeight - 200
      }
    }
    console.log(this.data)
    this.isAllEdited = this.data.isAllEdited
    this.isPartEdited = this.data.isPartEdited
    if (this.isAllEdited || this.isPartEdited) {
      this.basicInfo = this.data.basicInfo
      this.shareControl = this.data.shareControl
      this.formTable.tableData = this.data.tableData
    }
    // this.shareControl = this.data.shareControl
    if (this.data.tableData.length > 0) {
      this.tableVisible = true
      this.related = true
    }
  },
  methods: {
    getData() { },
    // 表格增加字段

    handleAddParam() {
      if (this.formTable.tableData.length === 0) {
        const args = {
          tableName: this.shareControl.dataTable,
          url: 'jdbc:mysql://' + this.shareControl.dataLink,
          userName: this.shareControl.dataName,
          pwd: this.shareControl.dataPassword
        }
        var that = this
        window.executeContract(
          'MySQLTool',
          'queryMeta',
          JSON.stringify(args),
          (ret) => {
            console.log(ret)
            var temp = JSON.parse(ret.result)
            that.tableRelateData = []
            for (const v of temp.fieldList) {
              v.discription = ''
              that.tableRelateData.push(v)
            }
          }
        )
      }
      const temp = {
        chineseName: '',
        englishName: '',
        fieldType: '',
        keyword: '',
        discription: '',
        accessRight: '',
        referenceField: ''
      }
      this.formTable.tableData.push(temp)
    },
    // 表格删除字段
    handleDelete(row, index) {
      // console.log(row);
      let flag = false
      console.log(this.formTable.tableData)
      this.formTable.tableData.splice(index, 1)
      console.log(this.formTable.tableData)
      for (const v of this.formTable.tableData) {
        if (v.referenceField !== '') flag = true
      }
      this.related = flag
    },
    // 出现表格
    handleChange(value) {
      if (
        this.shareControl.fileType === '1' &&
        this.shareControl.dataTable !== undefined
      ) {
        this.tableVisible = true
        console.log(this.tableVisible)
      } else this.tableVisible = false
    },
    cancelPopover(row, index) {
      this.$refs['btn' + index].$el.click()
    },
    // 处理选中的树结点
    handleNodeClick(data) {
      // console.log(data);
      this.basicInfo.type = data.label
      this.basicInfo.typeId = data.id
    },
    // 选择关联字段
    chooseRelate(row) {
      this.$confirm('此操作将关联该字段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('关联')
          this.related = true
          this.formTable.tableData[this.curRow].referenceField =
            this.shareControl.dataTable + '.' + row.name
          this.$message({
            type: 'success',
            message: '关联成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消关联'
          })
        })
    },
    // 获得当前关联字段的行对象
    handleRelate(index) {
      this.curRow = index
    },
    // 提交审核
    // handleSubmit() {
    //   // console.log(executeContract());

    //   executeContract("885896290", "isOwner", "", () => {});
    // },
    checkForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve()
          } else reject()
        })
      })
    },
    getDataToPar() {
      const list = []
      var _this = this
      list.push(
        this.checkForm('basicForm'),
        this.checkForm('controlForm'),
      )
      Promise.all(list)
        .then(() => {
          const data = {
            basicInfo: _this.basicInfo,
            shareControl: _this.shareControl,
            formTable: _this.formTable
          }
          console.log('通过检测', data)
          _this.dataToPar = data
          // return data
        })
        .catch(() => {
          console.log('未通过')
          return null
        })
    },
    // 向父组件传递数据
    transferToPar() {
      this.getDataToPar()

      // setTimeout(() => {
      //   console.log(this.dataToPar)
      //   return this.dataToPar
      // }, 30)
    },
    resetAllParams() {
      this.resetBasicInfo()
      this.resetShareControl()
      this.resetFormTable()
      // this.$nextTick(() => {
      //   this.$refs.basicForm.clearValidate();
      // });
      // this.$nextTick(() => {
      //   this.$refs.controlForm.clearValidate();
      // });
      // this.$nextTick(() => {
      //   this.$refs.tableForm.clearValidate();
      // });
    },
    resetBasicInfo() {
      this.basicInfo = {
        type: '',
        typeId: '',
        name: '',
        discription: '',
        provider: '',
        providerOffice: '',
        work: '',
        cyc: ''
      }
    },
    resetShareControl() {
      this.shareControl = {
        permiss: '',
        shareType: '',
        discription: '',
        public: '',
        dataSource: '',
        dataTable: '',
        dataLink: '',
        dataName: '',
        dataPassword: '',
        defaultPermiss: '',
        fileType: '',
        base64EncodedData: ''
      }
    },
    resetFormTable() {
      this.formTable.tableData = []
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isLt2M
    },
    httpRequest(data) {
      const _this = this
      const rd = new FileReader() // 创建文件读取对象
      const file = data.file
      rd.readAsDataURL(file) // 文件读取装换为base64类型
      rd.onload = function(e) {
        // _this.data.imageUrl = this.result // this指向当前方法onloadend的作用域
        // console.log(rd.result)
        _this.shareControl.base64EncodedData = rd.result.split(',')[1]
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      )
    }
  }
}
</script>
<style scoped>
.el-container {
  min-width: 1210px;
  /* background-color: #B3C0D1;
    color: #333; */
}

.el-main {
  height: 100%;
  /* background-color: #E9EEF3;
    color: #333; */
}

body > .el-container {
  margin-bottom: 40px;
}
.top-main {
  margin-top: 10px;
}
.circle {
  height: 165px;
  width: 940px;
  margin: 5px 10px 5px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding-left: 20px;
  padding-top: 10px;
}
.middle {
  height: 235px;
  width: 940px;
  margin: 5px 10px 5px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding-left: 20px;
  padding-top: 10px;
}
.el-form-item {
  height: 15px;
  font-size: 13px;
}
.addParam {
  /* style="margin-top:15px; margin-left: 12px; height:15x; float:left"
     */
  width: 920px;
  height: 15px;

  margin-top: 15px;
  margin-left: 12px;
}
.tableShow {
  clear: both;
  margin-top: 25px;
  margin-left: 12px;
  float: left;
  width: 1200px;
}
.el-tree {
  /* width: 100%; */
  overflow-y: scroll;
  height: 250px;
  /* width: 400px; */
  border: 1px solid #dcdfe6;
  margin-top: 5px;
}
</style>
