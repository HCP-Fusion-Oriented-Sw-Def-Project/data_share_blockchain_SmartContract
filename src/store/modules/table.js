import Papa from 'papaparse'
import Vue from 'vue'
import api from '../../utils'
import { json2excel } from 'js2excel'
import JSPDF from 'jspdf'
import 'jspdf-autotable'
import {
    sm2
} from 'sm-crypto'
import store from '@/store'

Papa.SCRIPT_PATH = '../../../static/js/papaparse.js'

var FileSaver = require('file-saver')

export default {
    namespaced: true,
    state: {
        csv_file: {
            name: '',
            containHeaders: true,
            headers: [],
            data: [],
            idx: {},
            col_width: {},
            stds: {}
        },
        test: 0
    },
    mutations: {
        updateTest(state) {
            console.log('update test')
            ++state.test
        },
        addCsvFile(state, { name, headers, data }) {
            state.csv_file.name = name
            state.csv_file.headers = headers
            state.csv_file.data = data
        },
        updateCsv(state, { row, prop, newValue }) {
            // state.scatter_options.series = [ { data: nval, type: 'scatter'  } ]
            state.csv_file.data[row][prop] = newValue
            Vue.set(state.csv_file.data, row, state.csv_file.data[row])
        },
        updateTableData(state, rowData) {
            state.csv_file.data = rowData
        },
        updateTableHeader(state, { headerName, show }) {
            for (var i in state.csv_file.headers) {
                if (state.csv_file.headers[i].headerName === headerName) {
                    state.csv_file.headers[i].show = show
                    Vue.set(state.csv_file.headers, i, state.csv_file.headers[i])
                    break
                }
            }
        },
        removeTableFeature(state, headerName) {
            // remove header
            for (var i in state.csv_file.headers) {
                if (state.csv_file.headers[i].headerName === headerName) {
                    state.csv_file.headers.splice(i, 1)
                    break
                }
            }
            // delete data
            state.csv_file.data.forEach((value, i) => {
                Vue.delete(value, headerName)
            })
        },
        addTableFeature(state, headerName) {
            state.csv_file.headers.push({
                headerName: headerName,
                field: headerName,
                sortable: true,
                filter: true,
                show: true
            })
            state.csv_file.data.forEach((v, i) => Vue.set(v, headerName, 0.0))
        },
        saveAsCSV(state, path) {
            var items = state.csv_file.data
            const replacer = (key, value) => value === null ? '' : value
            const header = state.csv_file.headers.map(item => item.headerName)
            const csv = items.map(row => header.map(headerName => JSON.stringify(row[headerName], replacer)).join(','))
            csv.unshift(header.join(','))
            const str = csv.join('\r\n')
            var blob = new Blob([str], { type: 'text/csv;charset=utf-8' })
            FileSaver.saveAs(blob, 'hello world.csv')
        },
        saveAsExcel(state, filename) {
            const data = state.csv_file.data
            try {
                json2excel({
                    data,
                    name: 'excel',
                    formatDate: 'yyyy/mm/dd'
                })
            } catch (e) {
                console.error('export error')
            }
        },
        saveAsPDF(state, filename) {
            const doc = new JSPDF()
            doc.autoTable({
                columns: [
                    { header: 'A', dataKey: 'A' },
                    { header: 'B', dataKey: 'B' },
                    { header: 'C', dataKey: 'C' },
                    { header: 'D', dataKey: 'D' }
                ],
                body: state.csv_file.data
            })
            doc.save(filename)
        },
        setIdx(state, { idx }) {
            state.csv_file.idx = idx
        }
    },
    actions: {
        connectDatasource({ commit, state, dispatch, context }, { contractID, method, args }) {
            const init = function(res) {
                const result = JSON.parse(res.result)
                var headers = Object.keys(result.data[0])
                state.csv_file.headers = headers.map(function(item) {
                    return { headerName: item, field: item, sortable: true, filter: true, show: true }
                })

                state.csv_file.data = result.data
                dispatch('corrcoef', {}, { root: true })
                dispatch('kmeans', 10, { root: true })
                dispatch('pca', {}, { root: true })
            }
            const getData = function(args) {
                window.executeContract('cluster', 'getData', JSON.stringify(args), init)
                return (res) => {
                    console.log('setDatasource')
                }
            }

            const pubkey = store.state.user.pubKey.split(',')[0]
            const prikey = store.state.user.pubKey.split(',')[1]
            const signature = sm2.doSignature(contractID + '|' +
                method + '|' + JSON.stringify(args) + '|' + pubkey,
                prikey)
            const setDatasourceArgs = {
                contractID: contractID,
                method: method,
                args: JSON.stringify(args),
                signature: signature,
                pubkey: pubkey
            }
            window.executeContract('cluster', 'setDatasource', JSON.stringify(setDatasourceArgs), getData(args))
        },
        addCsvFile({ commit, state, dispatch }, { name, content, vm }) {
            const parseData = (data, headers, totalDataLength, containHeaders) => {
                vm.$worker.run((data, headers, containHeaders) => {
                    const guid = function() {
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
                            return v.toString(16)
                        })
                    }

                    if (containHeaders) {
                        let i = 1
                        return data.map((row) => {
                            var j = i++
                            row['id'] = '' + j
                            return row
                        })
                    } else {
                        return data.map((row) => {
                            const nrow = {}
                            nrow['id'] = guid()
                            for (const j in headers) {
                                nrow[headers[j]] = row[j]
                            }
                            return nrow
                        })
                    }
                }, [data, headers, containHeaders]).then((res) => {
                    state.csv_file.data = state.csv_file.data.concat(res)
                    if (state.csv_file.data.length === totalDataLength) {
                        dispatch('uploadCsv', {
                            headers: state.csv_file.headers,
                            data: state.csv_file.data
                        }, { root: true })
                    }
                }
                )
            }
            state.csv_file.headers = []
            state.csv_file.data = []
            Papa.parse(content, {
                header: state.csv_file.containHeaders,
                worker: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    if (state.csv_file.containHeaders) {
                        const headers = results.meta.fields
                        state.csv_file.headers = headers.map(function(item) {
                            return { headerName: item, field: item, sortable: true, filter: true, show: true }
                        })
                        const totalDataLength = results.data.length
                        const data = results.data
                        const data1 = data.splice(0, 1000)
                        parseData(data1, headers, totalDataLength, state.csv_file.containHeaders)
                        parseData(data, headers, totalDataLength, state.csv_file.containHeaders)
                    } else {
                        const headers = api.generateHeaders(results.data[0].length)
                        state.csv_file.headers = headers.map(function(item) {
                            return { headerName: item, field: item, sortable: true, filter: true, show: true }
                        })
                        const totalDataLength = results.data.length
                        const data = results.data
                        const data1 = data.splice(0, 1000)
                        parseData(data1, headers, totalDataLength, state.csv_file.containHeaders)
                        parseData(data, headers, totalDataLength, state.csv_file.containHeaders)
                    }
                }
            })
        },
        createRow({ commit, state, dispatch }, i) {
            const nrow = { id: api.guid() }
            state.csv_file.headers.forEach(function(item) {
                nrow[item.field] = 0
            })
            state.csv_file.data.splice(i, 0, nrow)
            dispatch('createRow', {
                index: i,
                row: nrow,
                headers: state.csv_file.headers.map(item => item.field)
            }, { root: true })
        },
        removeRow({ commit, state, dispatch }, { start, id }) {
            state.csv_file.data.splice(start, 1)
            dispatch('removeRow', { id: id }, { root: true })
        },
        cellValueChanged({ commit, state, dispatch }, { id, colId, value }) {
            dispatch('cellValueChanged', { id: id, colId: colId, value: value }, { root: true })
        },
        removeTableFeature({ commit, state, dispatch }, headerName) {
            commit('removeTableFeature', headerName)
            dispatch('removeColumn', { colId: headerName }, { root: true })
        },
        addTableFeature({ commit, state, dispatch }, headerName) {
            commit('addTableFeature', headerName)
            dispatch('addColumn', { colId: headerName }, { root: true })
        },
        showOrHideColumn({ commit, state, dispatch }, { headerName, show }) {
            commit('updateTableHeader', { headerName: headerName, show: show })
            dispatch('showOrHideColumn', { colId: headerName, show: show }, { root: true })
        },
        std({ state }, { colId, std }) {
            Vue.set(state.csv_file.stds, colId, std)
        },
        getStd({ dispatch }, { colId }) {
            dispatch('std', { colId: colId }, { root: true })
        }

    },
    getters: {
        getCsv: function(state) {
            return {
                colHeaders: state.csv_file.headers,
                data: state.csv_file.data
            }
        },
        getCsvData: state => {
            return state.csv_file.data
        },
        getCsvHeaders: state => {
            return state.csv_file.headers
        },
        getTest: state => {
            return state.test
        },
        getStds: state => {
            return state.csv_file.stds
        }
    }
}
