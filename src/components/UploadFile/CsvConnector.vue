<template>
  <div>
    <el-table
      :data="list"
      
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      max-height="600"
    >
      <el-table-column align="center" label width="70px" type="index" :index="indexMethod"></el-table-column>
     <!--  <el-table-column align="center" width="110px" label="数据源类别">
        <template slot-scope="scope">
          <span>{{scope.row.type }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" width="150px" label="链接名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110px" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createBy}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.updateDate | formatTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="118px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCsvLinkDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pages"
        :page-sizes="[5,10,20,30, 50]"
        :page-size="listQuery.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
    import { fetchDataList , fetchMyDataList, addDataset, updateDataset, deleteDataset, fetchDataFormatList,
        fetchDataTypeList,deleteDataSetInBatches,download} from '@/api/data';
    import Papa from 'papaparse';
    import { downloadFile } from '@/api/file';
    import Vue from 'vue';
    export default {
        name: "CsvConnector",
        data() {
          return {
              listQuery: {
                  name: "",
                  type: "",
                  createBy: "",
                  pages: 1,
                  rows: 10
                  // category: ''
              },
              mycsvTableListView: false,
              csvTableList: [],
              list: [],
              total: 0,
              listLoading: false,
              csvLinkDialogView: false,
              csvTableListView: false,
              position: ''
          }
        },
        created() {
            this.getList()
        },
        filters: {
            formatTimes(updateDate) {
                const y = new Date(updateDate).getFullYear();
                const m = new Date(updateDate).getMonth() + 1;
                const d = new Date(updateDate).getDate();
                const h = new Date(updateDate).getHours();
                const i = new Date(updateDate).getMinutes();
                const s = new Date(updateDate).getSeconds();

                var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
                // var t = Y + '-' + m + '-' + d;
                return t;
            }
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchMyDataList(this.listQuery).then(response => {
                    this.list = response.data.data.list
                    for(var i=0;i < this.list.length;i++){
                        this.list[i] = Object.assign({},this.list[i],this.list[i].dataDataset)
                    }
                    this.total = response.data.data.total;
                    this.listLoading = false;
                })
            },
            handleSizeChange(val) {
                this.listQuery.rows = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pages = val;
                this.getList();
            },
            indexMethod(index) {
                if (this.listQuery.pages === 1) {
                    return index + 1;
                } else {
                    return (
                        index +
                        (this.listQuery.pages - 1) * this.listQuery.rows +
                        1
                    );
                }
            },
            handleCsvLinkDetail(row) {
              let url = row.position;
              this.position = url;
              downloadFile(row.position).then(response => {
                let url = window.URL.createObjectURL(response.data)
                Papa.parse(url, {
                  download: true,
                  header: true,
                  dynamicTyping: true,
                  skipEmptyLines: true,
                  complete: this.uploadCsv
                })
              })
            },
            uploadCsv(results) {
              // let fileType = this.position.substr(this.position.lastIndexOf('.')+1);
              let filePath = this.position;
              let fileName = this.position.substr(this.position.lastIndexOf('/')+1);
              // let fileColumn = results.meta.fields;

              // let visFileColumnList = fileColumn.map((columnName)=> {
              //   let column = {
              //     colData: [],
              //     colName: columnName
              //   };
              //   results.data.forEach((row) => {
              //     column.colData.push(row[columnName])
              //   });
              //   return column;
              // })
              // let convertData = [
              //   {
              //     visFileColumnList: visFileColumnList,
              //     visFileInfo: {
              //       fileColumn: fileColumn,
              //       fileName: fileName,
              //       filePath: filePath,
              //       fileType: fileType
              //     }
              //   }
              // ];
              // let resultsCopy = results.data.map((v)=>{
              //     console.log(v);
              //     return v;
              // });
              let convertData = {
                  filename: fileName,
                  filepath: filePath,
                  header: results.meta.fields,
                  results: results.data
              };
              // console.log('results.data');
              // console.log(results.data);
              //  let convertData = {
              //     filename: fileName,
              //     filepath: filePath,
              //     header: ['56094.00', '2'],
              //     results: [
              //       { '56094.00 ': 2.95, '59305.00 ': 2.91},
              //       { '1': 2, '2': 3}
              //     ]
              // };
              this.$emit('change', convertData);
            }
        }
    }
</script>

<style scoped>

</style>
