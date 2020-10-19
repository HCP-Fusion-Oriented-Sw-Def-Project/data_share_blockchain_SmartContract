
import axios from 'axios'
import api from '@/utils'

export default {
    namespace: true,
    state: {
        URL_ROOT: 'http://localhost:8070'
    },
    mutations: {},
    actions: {
        uploadCsv: {
            root: true,
            handler({ state, dispatch }, { headers, data }) {
              let nheaders = []
              if (data.length > 0) {
                nheaders = Object.keys(data[0])
              }
              const args = {
                db: 'cluster',
                tableName: 'test',
                headers: nheaders,
                // data: [Object.values(data[0]), Object.values(data[1])]
                data: data.map(row => {
                  // eslint-disable-next-line no-mixed-spaces-and-tabs
                	return Object.values(row)
                })
              }
                executeContract('cluster', 'uploadData', JSON.stringify(args), (args) => { // 初始化
                  dispatch('corrcoef')
                  dispatch('kmeans', 10)
                })
            }
        },
        createRow: {
            root: true,
            handler({ state }, { index, row, headers }) {
                const data = []
                headers.forEach((v, i) => {
                    data[i] = row[v]
                })
                axios.post(state.URL_ROOT + '/table/createRow', { id: row.id, data: data }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        removeRow: {
            root: true,
            handler({ state }, { id }) {
                axios.post(state.URL_ROOT + '/table/removeRow', { id: id }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        cellValueChanged: {
            root: true,
            handler({ state }, { id, colId, value }) {
                axios.post(state.URL_ROOT + '/table/cellValueChanged', {
                    id: id,
                    colId: colId,
                    value: value
                }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        removeColumn: {
            root: true,
            handler({ state }, { colId }) {
                axios.post(state.URL_ROOT + '/table/removeColumn', { colId: colId }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        addColumn: {
            root: true,
            handler({ state }, { colId }) {
                axios.post(state.URL_ROOT + '/table/addColumn', { colId: colId }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        showOrHideColumn: {
            root: true,
            handler({ state }, { colId, show }) {
                axios.post(state.URL_ROOT + '/table/showOrHideColumn', { colId: colId, show: show }).then(
                    function(response) {

                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        pca: {
            root: true,
            handler({ state, dispatch }) {
                executeContract('cluster', 'pca', 2, (data) => { // 初始化
                  data = api.serverDataToClientData(JSON.parse(data.result).pca)
                  dispatch('scatter/redisplayPCAData', data)
                })
            }
        },
        mds: {
            root: true,
            handler({ state, dispatch }) {
                axios.post(state.URL_ROOT + '/home/mds').then(
                    function(response) {
                        const data = api.serverDataToClientData(response.data.mds)
                        dispatch('scatter/redisplayMDSData', data)
                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        kmeans: {
            root: true,
            handler({ state, dispatch, commit }, max_cluster) {
                 executeContract('cluster', 'kmeans', max_cluster, (data) => { // 初始化
                        data = JSON.parse(data.result)
                 		dispatch('heatmap/redisplayKMeansData', {
                            centroids: data.centroids,
                            headers: data.headers,
                            count: data.count
                        })
                        commit('table/setIdx', { idx: data.idx })
                        dispatch('scatter/cluster')
                })
            }
        },
        anova: {
            root: true,
            handler({ state, commit }, { x1id, x2id, colId }) {
                axios.post(state.URL_ROOT + '/home/anova', { x1id: x1id, x2id: x2id, colId: colId }).then(
                    function(response) {
                        commit('anova/setAnovaResult', { feature: colId, data: response.data })
                        // dispatch('heatmap/redisplayKMeansData', {data: response.data.centroids});
                        // dispatch('scatter/cluster', {idx: response.data.idx});
                    }
                ).catch(function(error) {
                    console.log(error)
                })
            }
        },
        corrcoef: {
            root: true,
            handler({ state, dispatch }) {
            	executeContract('cluster', 'corrcoef', '', (data) => { // 初始化
                        data = JSON.parse(data.result)
                 		dispatch('corrcoef/displayCorrcoef', { corrcoef: data.corrcoef })
                })
            }
        },
        fppca: {
            root: true,
            handler({ state, dispatch }, { x, headers, id }) {
                axios.post(state.URL_ROOT + '/home/fppca', { x: x.map(obj => api.getObjectValueExcept(obj, ['id'])) }).then(
                    function(response) {
                        const data = response.data.fppca
                        const ndata = data.map(item => {
                            const nx = { id: id }
                            headers.forEach((v, i) => {
                                nx[v] = item[i]
                            })
                            return nx
                        })
                        dispatch('scatter/fppcaAddScatterLinePoints', { data: ndata })
                    }
                ).catch(function(error) {

                })
            }
        },
        std: {
            root: true,
            handler({ state, dispatch }, { colId }) {
                axios.post(state.URL_ROOT + '/table/std', { colId: colId }).then(
                    function(response) {
                        dispatch('table/std', { colId: response.data.colId, std: response.data.std })
                    }
                ).catch(function(error) {

                })
            }
        }
    },
    getters: {}
}
