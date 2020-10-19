<template>
  <div>
    <div style=" margin-left:15px;">
      <div style="margin-bottom: 10px;margin-top: 10px">
        <el-button
          size="small"
          @click="typeVisible=true;handleCreate()"
          type="primary"
          icon="el-icon-plus"
        >添加</el-button>
        <el-button size="small" @click="deleteInBatches" type="info">
          <svg-icon icon-class="delete"></svg-icon>批量删除
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        :data="typeTree"
        v-loading="listLoading"
        element-loading-text="给我一点时间"
        fit
        highlight-current-row
        :height="fullHeight-200"
        @selection-change="handleBatchDelete"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column min-width="65px" align="center" label="类别名称" width="200">
          <template slot-scope="scope">
            <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="110px" align="center" label="描述">
          <template slot-scope="scope">
            <span>{{scope.row.discription}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="数据量" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="350" class-name="small-padding">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="typeVisible=true;handleUpdate(scope.row)"
              style="margin-left:10px"
            >编辑</el-button>
            <el-popover placement="top" width="160" trigger="click">
              <p>确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="cancelPopover(scope.row, scope.$index)"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="cancelPopover(scope.row, scope.$index),handleDelete(scope.row)"
                >确定</el-button>
              </div>
              <el-button
                :ref="'btn'+scope.$index"
                slot="reference"
                size="mini"
                type="danger"
                style="margin-left:10px"
              >删除</el-button>
            </el-popover>
            <el-button
              type="primary"
              size="mini"
              @click="addSubMenu(scope.row)"
              style="margin-left:10px"
            >添加下级菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="typeVisible"
      v-dialogDrag
      width="400px"
      top="7vh"
    >
      <el-form
        :rules="addTypeRule"
        ref="addTypeForm"
        :model="addType"
        label-position="right"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="上级分类:" prop="type">
          <el-input
            @focus="typeChooseVisible = true"
            class="filter-item"
            v-model="addType.parentType"
            placeholder="请选择..."
          ></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="name">
          <el-input v-model="addType.name"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="discription">
          <el-input type="textarea" v-model="addType.discription"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="typeVisible = false">取 消</el-button>
        <el-button type="primary" @click="typeVisible = false;handleCreateType()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分类选择" :visible.sync="typeChooseVisible" v-dialogDrag width="400px" top="7vh">
      <el-tree
        :data="typeTree"
        accordion
        node-key="id"
        ref="tree1"
        highlight-current
        :props="defaultProps"
        style="width:360px"
        @node-click="handleNodeClick"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="typeChooseVisible = false">取 消</el-button>
        <el-button type="primary" @click="typeChooseVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选择分类dialog
      typeVisible: false,
      typeChooseVisible: false,
      // 所有分类
      typeTree: [
        {
          id: 1,
          discription: "1",
          name: "王0   ",
          num: 5,
        },
        {
          id: 2,
          discription: "2",
          name: "王1   ",
          num: 5,
        },
        {
          id: 3,
          discription: "20",
          name: "王2   ",
          num: 6,
          children: [
            {
              id: 31,
              discription: "2",
              name: "王3",
              num: 15,
            },
            {
              id: 32,
              discription: "01",
              name: "王   ",
              num: 18,
            },
          ],
        },
        {
          id: 4,
          discription: "20",
          name: "王 ",
          num: 151,
        },
      ],

      defaultProps: {
        children: "children",
        label: "name",
      },
      addType: {},
      addTypeRule: {},
      tableKey: 0,
      listLoading: false,
      // 批量删除对象
      sels: [],
      textMap: {
        create: "添加",
        update: "编辑",
      },
      dialogStatus: "create",
      fullHeight: document.documentElement.clientHeight,
    };
  },
  mouted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight;
        that.fullHeight = window.clientHeight;
      })();
    };
  },
  methods: {
    // 添加子菜单
    addSubMenu(row) {
      this.dialogStatus = "create";
      this.typeVisible = true;
      this.addType.parentType = row.name;
    },
    // 删除菜单
    handleDelete() {},
    // 批量删除菜单
    deleteInBatches() {},
    // 编辑菜单
    handleUpdate(row) {
      this.dialogStatus = "update";
      this.addType = {
        parentType: "",
        name: row.name,
        discription: row.discription,
      };
    },
    // 添加菜单
    handleCreate() {
      this.dialogStatus = "create";
      this.resetAddType();
    },
    // 处理选中的树结点
    handleNodeClick(data) {
      console.log(data);
    },
    // 添加分类
    handleCreateType() {},
    //获取批量删除的对象
    handleBatchDelete() {
      this.sels = sels;
    },
    // 重置
    resetAddType() {
      this.addType = {
        parentType: "",
        name: "",
        discription: "",
      };
    },
  },
};
</script>
<style scoped>
</style>