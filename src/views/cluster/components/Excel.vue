<template>
  <div id="hot-preview">
    <HotTable
      ref="myTable"
      :root="root"
      :settings="hotSettings"
      :data="getData"
      :col-headers="colHeaders"
    />
  </div>
</template>

<script>
    import { HotTable } from '@handsontable/vue'
    import { mapMutations } from 'vuex'

    export default {
        name: 'Excel',
        props: ['data', 'colHeaders'],
        data: function() {
            return {
                root: 'test-hot',
                trimmedRows: [],
                // test: Handsontable.helper.createSpreadsheetData(400000,2),
                filterConditions: [],
                pos: 0,
                hot: Object,
                hotSettings: {
                    height: 320,
                    width: 584,
                    // viewportRowRenderingOffset: 50,
                    // data:  Handsontable.helper.createSpreadsheetData(400000,2),
                    // stretchH: 'all',
                    // autoWrapRow: true,
                    // manualRowResize: true,
                    // manualColumnResize: true,

                    // manualRowMove: true,
                    // manualColumnMove: true,

                    // fixedRowsTop: 2,
                    // fixedRowsBottom: 2,
                    // fixedColumnsLeft: 3,

                    // autoColumnSize: {
                    //     samplingRatio: 23
                    // },
                    // search: true,
                    // mergeCells: true,
                    rowHeaders: true,
                    contextMenu: true,
                    dropdownMenu: true,
                    colWidth: [40, 70, 70, 70, 70],
                    // columnSorting: {
                    //     indicator: true
                    // },
                    afterChange: this.updateData,
                    afterGetColHeader: this.addInput,
                    beforeOnCellMouseDown: function(event, coords) {
                        if (coords.row === -1 && event.realTarget.nodeName === 'INPUT') {
                            event.stopImmediatePropagation()
                            this.deselectCell()
                        }
                    },
                    afterRemoveRow: this.afterRemoveRows,
                    afterCreateRow: this.afterCreateRows,
                    afterScrollVertically: this.loadData
                }
            }
        },
        computed: {
            getData: function() {
                if (this.trimmedRows.length === 0) { return this.data }
                return this.trimmedRows.map((index) => {
                    return this.data[index]
                })
                // return Handsontable.helper.createSpreadsheetData(1000, 1000);
            }
            // getData: {
            //     get: function () {
            //         if (this.trimmedRows.length === 0)
            //             return this.data;
            //         return this.trimmedRows.map((index) => {
            //             return this.data[index]
            //         });
            //     }
            // }
        },
        mounted() {
            // this.test = Handsontable.helper.createSpreadsheetData(1000,1000);
            // this.hot = new HandsonTable(document.getElementById('hot-preview'), this.hotSettings);
            this.hot = this.$refs.myTable.hotInstance
        },
        methods: {
            ...mapMutations('table', { updateCsv: 'updateCsv', removeRow: 'removeRow', createRow: 'createRow' }),
            loadData: function() {

                // this.hot.selectCell(this.pos, 0);
                // console.log(this.hot.getSelected()[0]);
                // this.pos++;
                // if (this.hot.getSelected()[0][0] === 11){
                //     console.log('next part of data');
                //     this.test = this.data.slice(this.pos, this.pos+13);
                //     console.log(this.test);
                // }
                // var rowCount = this.hot.countRows();
                // var rowOffset = this.hot.rowOffset();
                // var visibleRows = this.hot.countVisibleRows();
                // var lastRow = rowOffset + (visibleRows * 1);
                // var lastVisibleRow = rowOffset + visibleRows + (visibleRows/2);
                // var threshold = 15;
                // console.log('rowCount'+rowCount, 'rowOffset'+rowOffset, 'visibleRows'+visibleRows, 'lastRow'+lastRow, 'lastVisibleRow'+lastVisibleRow)
                // if(lastVisibleRow > (rowCount - threshold)) {
                //     this.pos++;
                //     this.test.push(this.data.slice(this.pos*rowCount, this.pos*rowCount+threshold));
                // }
            },
            updateData: function(changes) {
                if (changes == null) { return }
                changes.forEach(function([row, prop, oldValue, newValue]) {
                    this.updateCsv({ row: row, prop: prop, newValue: newValue })
                }.bind(this))
            },
            debounceFn: function() {
                this.trimmedRows = []
                this.data.forEach(function(data_v, data_i) {
                    if (data_v.length === this.colHeaders.length) {
                        let match_success = true
                        this.filterConditions.forEach((filter_v, filter_i) => {
                            if (filter_v !== '' && data_v[filter_i].toString().indexOf(filter_v) < 0) {
                                match_success = false
                            }
                        })
                        if (match_success) {
                            this.trimmedRows.push(data_i)
                        }
                    }
                }.bind(this))
            },
            addEventListeners: function(input, colIndex) {
                input.addEventListener('keyup', function(e) {
                    // this.$refs.myTable.hotInstance.debounce(() => { this.debounceFn(colIndex, event); }, 200);
                    this.filterConditions[colIndex] = event.target.value
                    if (e.which === 13) {
                        this.$worker.run((filterConditions, data, colHeaders) => {
                            console.log('start')
                            var results = []
                            data.forEach(function(data_v, data_i) {
                                if (data_v.length === colHeaders.length) {
                                    let match_success = true
                                    filterConditions.forEach((filter_v, filter_i) => {
                                        if (filter_v !== '' && data_v[filter_i].toString().indexOf(filter_v) < 0) {
                                            match_success = false
                                        }
                                    })
                                    if (match_success) {
                                        results.push(data_i)
                                    }
                                }
                            })
                            return results
                        }, [this.filterConditions, this.data, this.colHeaders]).then(results => {
                            this.trimmedRows = results
                        }).catch(e => {
                            console.log(e)
                        })
                    }
                }.bind(this))
            },
            getInitializedElements: function(colIndex) {
                var div = document.createElement('div')
                var input = document.createElement('input')

                div.className = 'filterHeader'

                this.addEventListeners(input, colIndex)

                div.appendChild(input)

                return div
            },
            addInput: function(col, TH) {
                // Hooks can return value other than number (for example `columnSorting` plugin use this).
                if (typeof col !== 'number') {
                    return col
                }

                if (col >= 0 && TH.childElementCount < 2) {
                    TH.appendChild(this.getInitializedElements(col))
                }
            },
            afterRemoveRows: function(index, amount, array) {
                this.removeRow({ start: index, amount: amount })
            },
            afterCreateRows: function(index, amount, array) {
                this.createRow(index)
            }
        },
        watch: {
            colHeaders: {
                helper: function() {
                    if (this.colHeaders !== undefined && this.colHeaders.length > 0) {
                        this.filterConditions = new Array(this.colHeaders.length)
                    }
                },
                deep: true
            }
        },
        components: {
            HotTable
        }
    }
</script>
<style scoped src="../../../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style scoped>

    #hot-preview {
        height: 100%;
        overflow: scroll;
    }
</style>

