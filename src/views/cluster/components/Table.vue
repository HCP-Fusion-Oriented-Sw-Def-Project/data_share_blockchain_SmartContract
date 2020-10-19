<template>
  <div>
    <div style="margin-top: 5px;margin-bottom: 5px">
      <!--            <el-button type="primary" size="small" @click="$refs.file.click()">上传数据集</el-button>-->
      <!--            <input class="input is-hidden" type="file" ref="file"-->
      <!--                   id="open_csv" @change="openCsv" accept="text/csv">-->
      <!--            <button class="button"  v-on:click="onBtAdd()">增加数据</button>-->
      <!--            <button class="button" v-on:click="onBtRemove()">删除数据</button>-->
      <div class="dropdown is-hoverable">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
            <span>增/删 属性</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div id="dropdown-menu4" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <div v-if="colHeaders.length" class="feature-list">
              <div v-for="header in colHeaders" :key="header.key" class="dropdown-item level">
                <div class="level-left">
                  <input
                    :id="header.headerName"
                    type="checkbox"
                    name="switchExample"
                    class="switch is-rtl is-thin"
                    checked="checked"
                    @change="updateFeature(header.headerName, $event)"
                  />
                  <label :for="header.headerName">{{ header.headerName }}</label>
                </div>
                <button class="delete is-small" @click="removeFeature(header.headerName)"></button>
              </div>
            </div>
            <hr class="dropdown-divider" />
            <input placeholder="增加新属性" class="input" @keyup.enter="addFeature($event)" />
          </div>
        </div>
      </div>
      <el-button type="success" size="small" style="margin-left: 150px" @click="exportToCSV()">
        CSV
      </el-button>
      <el-button type="success" size="small" @click="exportToExcel()">
        Excel
      </el-button>
      <el-button type="success" size="small" @click="exportToPDF()">
        PDF
      </el-button>
    </div>
    <ag-grid-vue
      ref="table"
      style="width: 100%;height: 100%"
      class="ag-theme-balham"
      :column-defs="getHeaders"
      :grid-options="gridOptions"
      :row-selection="rowSelection"
      :row-model-type="rowModelType"
      :infinite-initial-row-count="infiniteInitialRowCount"
      @grid-ready="onGridReady"
      @cell-value-changed="onCellValueChanged"
      @filter-changed="onFilterChanged"
    />
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import { mapActions, mapMutations } from 'vuex'
// import MyCellEditor from './MyCellEditor'

export default {
  name: 'Table',
  components: {
    AgGridVue
    // MyCellEditor
  },
  props: ['data', 'colHeaders'],
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridApi: null,
      rowSelection: 'single',
      gridOptions: {
        defaultColDef: {
          editable: true,
          cellEditorFramework: 'MyCellEditor'
        },
        getRowNodeId: (data) => data.id
      },
      infiniteInitialRowCount: 500,
      rowModelType: 'infinite'
    }
  },
  computed: {
    getData: function() {
      return Object.freeze(
        this.data.map((row) => {
          return row
        })
      )
    },
    getHeaders: function() {
      return this.colHeaders.filter((header) => header.show === true)
    }
  },
  beforeMount() {},
  mounted() {
    this.gridApi = this.gridOptions.api
    this.gridApi.sizeColumnsToFit()
  },
  methods: {
    ...mapMutations('table', {
      updateTableData: 'updateTableData',
      updateTableHeader: 'updateTableHeader',
      saveAsCSV: 'saveAsCSV',
      saveAsExcel: 'saveAsExcel',
      saveAsPDF: 'saveAsPDF'
    }),
    ...mapActions('table', {
      removeRow: 'removeRow',
      createRow: 'createRow',
      cellValueChanged: 'cellValueChanged',
      addTableFeature: 'addTableFeature',
      removeTableFeature: 'removeTableFeature',
      showOrHideColumn: 'showOrHideColumn'
    }),
    ...mapActions('table', {
      addCsvFile: 'addCsvFile',
      connectDatasource: 'connectDatasource'
    }),
    ...mapMutations('scatter', {
      addScatterLinePointByIndex: 'addScatterLinePointByIndex',
      addScatterLinePointByData: 'addScatterLinePointByData'
    }),
    openCsv: function(evt) {
      var files = evt.target.files
      var reader = new FileReader()
      for (var i = 0, f; (f = files[i]); i++) {
        // if (!f.type.match('csv')) {
        //     continue;
        // }
        reader.onload = function(f) {
          return function(e) {
            this.connectDatasource()
            // this.addCsvFile({
            //     name: f.name.substring(0, f.name.indexOf('.')),
            //     content: e.target.result,
            //     vm: this
            // })
          }.bind(this)
        }.bind(this)(f)
        reader.readAsText(f)
      }
    },
    updateData(data) {
      const dataSource = {
        rowCount: null,
        getRows: function(params) {
          setTimeout(function() {
            var rowsThisPage = data.slice(params.startRow, params.endRow)
            var lastRow = -1
            if (data.length <= params.endRow) {
              lastRow = data.length
            }
            params.successCallback(rowsThisPage, lastRow)
          }, 0)
        }
      }
      this.gridApi.setDatasource(dataSource)
    },
    updateFeature(headerName, e) {
      this.showOrHideColumn({ headerName: headerName, show: e.target.checked })
    },
    removeFeature(headerName) {
      this.removeTableFeature(headerName)
    },
    addFeature(e) {
      if (e.target.value !== '') {
        this.addTableFeature(e.target.value)
        e.target.value = ''
      }
    },
    exportToCSV() {
      this.saveAsCSV('hello')
    },
    exportToExcel() {
      this.saveAsExcel('excel')
    },
    exportToPDF() {
      this.saveAsPDF('pdf')
    },
    onGridReady(params) {
      this.updateData(this.data)
      params.api.sizeColumnsToFit()
    },
    onBtRemove() {
      const selectedRows = this.gridApi.getSelectedNodes()
      if (!selectedRows || selectedRows.length === 0) {
        return
      }
      var selectedRow = selectedRows[0]
      this.removeRow({ id: selectedRow.data.id })
    },
    onBtAdd() {
      var selectedRows = this.gridApi.getSelectedNodes()
      if (!selectedRows || selectedRows.length === 0) {
        this.createRow(0)
        return
      }

      var selectedRow = selectedRows[0]
      this.createRow(selectedRow.rowIndex)
    },
    onStartEditing(id) {
      // let dataIndex = node.rowIndex;
      let dataIndex = 0
      console.log('双击点')
      console.log(this.data)
      for (let i = 0; i < this.data.length; ++i) {
        if ((this.data[i].id = i)) {
          dataIndex = i
          break
        }
      }
      if (this.gridApi.getInfiniteRowCount() < dataIndex) {
        this.gridApi.setInfiniteRowCount(dataIndex + 1, false)
      }
      this.gridApi.ensureIndexVisible(dataIndex)
      this.gridApi.setFocusedCell(
        dataIndex,
        this.colHeaders[0].headerName,
        null
      )
      const node = this.gridApi.getRowNode(id)
      node.setSelected(true)
    },
    onCellValueChanged(params) {
      // this.addScatterLinePointByIndex(params.rowIndex);
      this.cellValueChanged({
        id: params.data.id,
        colId: params.column.colId,
        value: params.value
      })
    },
    onFilterChanged(params) {}
  },
  watch: {
    data: function() {
      this.updateData(this.data)
    }
  }
}
</script>

<style src="ag-grid-community/dist/styles/ag-grid.css">
</style>
<style src="ag-grid-community/dist/styles/ag-theme-balham.css"></style>

<style src="bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css"></style>
<style scoped>
.feature-list {
  height: 200px;
  overflow: scroll;
}
</style>
