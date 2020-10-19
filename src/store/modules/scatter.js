import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        scatter_data_start_pos_in_series: 1,
        scatter_options: {
            tooltip: { trigger: 'item' },
            // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            //     offset: 0,
            //     color: '#f7f8fa'
            // }, {
            //     offset: 1,
            //     color: '#cdd0d5'
            // }]),
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataZoom: { show: true },
                    dataView: { show: true },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            title: {
                show: false,
                text: ''
            },
            legend: {
                type: 'scroll',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['c1']
            },
            dataZoom: [
                // {
                //     type: 'slider',
                //     show: true,
                // },
                // {
                //     type: 'inside',
                // },
                // {
                //     type: 'slider',
                //     show: true,
                //     yAxisIndex: 0,
                //     filterMode: 'empty'
                // }
            ],
            grid: {},
            xAxis: {
                show: false,
                type: 'value',
                scale: true,
                axisLine: { onZero: false }
            },
            yAxis: {
                show: false,
                // splitLine: {
                //     lineStyle: {
                //         type: 'dashed'
                //     }
                // },
                scale: true,
                type: 'value',
                axisLine: { onZero: false }
            },
            dataset: [{
                dimensions: null,
                source: []
            }, {
                dimensions: ['A', 'B'],
                source: [{
                    'id': 'c4a9ad2b-7b85-4b37-8439-b535b0dff733',
                    'A': -1.1133308410644531,
                    'B': -0.24856367707252502
                }, {
                    'id': '48fce49e-f8cc-4890-93ab-2db7ec4d411d',
                    'A': -1.0943140983581543,
                    'B': -0.28566449880599976
                }, {
                    'id': 'e53e6715-e7ad-4851-b215-43b07da64dec',
                    'A': -1.0784374475479126,
                    'B': -0.31660065054893494
                }, {
                    'id': '9b171de1-4736-42b2-813b-b9f15580bf8c',
                    'A': -1.0717812776565552,
                    'B': -0.3295331597328186
                }, {
                    'id': '581c9633-fb3f-4e33-827c-33fb5dda4b75',
                    'A': -1.0668888092041016,
                    'B': -0.3390037417411804
                }, {
                    'id': 'a720a1b4-2566-4381-85a1-7b4ecad99018',
                    'A': -1.0431008338928223,
                    'B': -0.38532257080078125
                }, {
                    'id': 'd10d0d82-a146-46a8-98dc-4849b346e020',
                    'A': -1.0272427797317505,
                    'B': -0.41605257987976074
                }, {
                    'id': '13d98cf9-3f4c-428b-8318-2991899047b9',
                    'A': -1.0261306762695312,
                    'B': -0.4181082844734192
                }, {
                    'id': 'fab51a0b-a625-4b2c-af1a-6610e70dba6e',
                    'A': -1.0248068571090698,
                    'B': -0.42062580585479736
                }, {
                    'id': '7a971211-3260-4c1d-a717-66c93a82ead1',
                    'A': -1.0304930210113525,
                    'B': -0.4094550609588623
                }, {
                    'id': '9c71f98f-64df-48f5-ba63-ddf84fcc02e1',
                    'A': -1.0392036437988281,
                    'B': -0.39226558804512024
                }, {
                    'id': '9c245f51-2b45-4035-8780-9f7fb32dc0f3',
                    'A': -1.072803020477295,
                    'B': -0.32647091150283813
                }, {
                    'id': '069d392b-a9ee-4721-9824-8f3e30a09fc6',
                    'A': -1.0940912961959839,
                    'B': -0.2847331166267395
                }, {
                    'id': 'c2942e01-6d40-455b-8c4f-4a8538e19eae',
                    'A': -1.0925296545028687,
                    'B': -0.28760430216789246
                }, {
                    'id': 'cbf60394-1fe6-47ac-95c0-d009e04cb649',
                    'A': -1.067004680633545,
                    'B': -0.3372972011566162
                }, {
                    'id': '6a5a857d-e5ac-4935-95fc-e2de566f9a6c',
                    'A': -1.0511817932128906,
                    'B': -0.368116557598114
                }, {
                    'id': 'e251187f-8b70-4b38-bff9-2d4cb855dc18',
                    'A': -1.0719473361968994,
                    'B': -0.3274107277393341
                }, {
                    'id': '77859571-8880-493c-adf4-c5124e3a85dd',
                    'A': -1.079591155052185,
                    'B': -0.3123910427093506
                }, {
                    'id': '9f74c683-0428-4396-893b-aee1a0498c64',
                    'A': -1.0693304538726807,
                    'B': -0.33234718441963196
                }, {
                    'id': 'f439ee5d-f620-410d-9e5d-04f42303f591',
                    'A': 0.9328588247299194,
                    'B': -0.2673759460449219
                }, {
                    'id': '8b7228c2-f622-40ba-88d6-06eec1a0f7be',
                    'A': 0.8190022706985474,
                    'B': -0.04534190893173218
                }, {
                    'id': '97eae093-10ab-4e09-b5e7-88c49b396864',
                    'A': 0.9932133555412292,
                    'B': 1.256016731262207
                }, {
                    'id': '1f667b79-e732-47f9-927e-dfef4fc22dd8',
                    'A': 1.0098010301589966,
                    'B': 1.2234852313995361
                }, {
                    'id': '0cc14d2b-0d80-483d-801c-6e30167db15b',
                    'A': 1.022940754890442,
                    'B': 1.1976509094238281
                }, {
                    'id': '1a252498-48e6-43eb-99d3-6e20049a20bb',
                    'A': 1.0458928346633911,
                    'B': 1.1525609493255615
                }, {
                    'id': '5038cc50-3814-4f95-b2e3-023d132c292e',
                    'A': 1.055586338043213,
                    'B': 1.1334729194641113
                }, {
                    'id': 'ff09af11-2062-48ba-93f4-56362246e174',
                    'A': 1.079176664352417,
                    'B': 1.0869982242584229
                }, {
                    'id': 'c86aa814-f2ab-4d31-b656-26e5acd4a622',
                    'A': 1.0850343704223633,
                    'B': 1.0754789113998413
                }, {
                    'id': '03a1d920-b595-4a4c-ac09-ac3b3a299eb7',
                    'A': 1.08750319480896,
                    'B': 1.0706024169921875
                }, {
                    'id': '0d9e4aa7-f347-498c-bf76-fa4d0a9c1421',
                    'A': 1.086778163909912,
                    'B': 1.0719581842422485
                }, {
                    'id': '643bd175-8238-4130-a5ff-eee256c15c57',
                    'A': 1.086604118347168,
                    'B': 1.072235107421875
                }, {
                    'id': 'd760f39a-896b-439b-90b7-248457e265d8',
                    'A': 1.116618275642395,
                    'B': 1.0137406587600708
                }, {
                    'id': '746d26ab-4d2d-40d8-86c5-69035c7d1c5d',
                    'A': 1.0560904741287231,
                    'B': 1.1323723793029785
                }, {
                    'id': 'a7ec7933-cf0d-419b-957d-31074c6c4e09',
                    'A': 1.134676456451416,
                    'B': 0.977900505065918
                }, {
                    'id': '2b119e39-61d4-4b7c-84ca-0e3734ed5006',
                    'A': 1.0763801336288452,
                    'B': 1.092329740524292
                }, {
                    'id': '1102e771-9fc9-4815-b1dc-bbaf8be0195d',
                    'A': -1.5620501041412354,
                    'B': 0.9683429002761841
                }, {
                    'id': '0b59532e-f529-4031-8474-7ea9dc9a3705',
                    'A': -1.5565710067749023,
                    'B': 0.9576948285102844
                }, {
                    'id': 'c1355d3c-80bf-43f7-b0da-70474ee4c0b5',
                    'A': -1.5487563610076904,
                    'B': 0.9438486099243164
                }, {
                    'id': 'ed4873cd-2ec1-4678-ad0f-6294f8e95697',
                    'A': -1.550018548965454,
                    'B': 0.946489155292511
                }, {
                    'id': '9669405b-0a57-4cac-ab65-5ccc3011ec28',
                    'A': -1.5541917085647583,
                    'B': 0.9548294544219971
                }, {
                    'id': '60cd0531-c605-40eb-a79c-d2e01b7ec709',
                    'A': -1.554063081741333,
                    'B': 0.9546461701393127
                }, {
                    'id': '23b73228-842b-4907-8eb6-735bf0011acf',
                    'A': 0.9640612602233887,
                    'B': -1.0649428367614746
                }, {
                    'id': '10781851-a014-4845-a978-ad9fe1d265ac',
                    'A': 0.9396176338195801,
                    'B': -1.0171233415603638
                }, {
                    'id': 'a480b23b-1486-47ba-8bff-30996ed52730',
                    'A': 0.9128737449645996,
                    'B': -0.9644296169281006
                }, {
                    'id': '7fdb9d7e-1795-45da-ae5d-27a428d421c4',
                    'A': 0.9524727463722229,
                    'B': -1.0413259267807007
                }, {
                    'id': 'b60879ad-b123-4380-b815-ac6f8d3f842c',
                    'A': 0.9799346923828125,
                    'B': -1.0945185422897339
                }, {
                    'id': '07095ce1-cf46-4c53-a08c-7d70e1a383b3',
                    'A': 0.9881035089492798,
                    'B': -1.1104211807250977
                }, {
                    'id': 'c8e2a51b-4305-4587-877b-8d1a12440e18',
                    'A': 1.0150067806243896,
                    'B': -1.1618808507919312
                }, {
                    'id': '3845dadb-2ef0-4f81-addb-decefdc26aec',
                    'A': 0.9864507913589478,
                    'B': -1.1052488088607788
                }, {
                    'id': 'e18d25f7-675a-472d-bb50-ff63ab7277f9',
                    'A': 1.0201661586761475,
                    'B': -1.1703875064849854
                }, {
                    'id': '841403dc-3e3d-463a-89b4-ca5cfa138f76',
                    'A': 1.0087463855743408,
                    'B': -1.1480278968811035
                }, {
                    'id': 'e0db7432-595b-49a5-b310-f481160700dc',
                    'A': 1.0001306533813477,
                    'B': -1.1309797763824463
                }, {
                    'id': '26b29161-c89e-4a3c-8b2d-d21aece6c1f8',
                    'A': 1.0332307815551758,
                    'B': -1.1950763463974
                }, { 'id': 'cb9412f2-27e8-47de-81ca-ee0bf902d17b', 'A': 1.0507655143737793, 'B': -1.2280755043029785 }]
            }],
            series: [{
                id: 'line',
                type: 'line',
                smooth: true,
                animation: true,
                symbolSize: 15,
                datasetIndex: 0,
                data: [],
                large: true,
                zlevel: 100
            }, {
                name: 'c1',
                type: 'scatter',
                symbolSize: 10,
                datasetIndex: 1,
                large: true,
                largeThreshold: 2000,
                progressive: 400,
                progressiveThreshold: 3000
            }]
        },
        scatter_graphic_points: [],
        pca: { dataset: [], series: [] },
        mds: { dataset: [], series: [] },
        rawData: { dataset: [], series: [] },
        idx: {},
        dimensions: [],
        currentData: [],
        mode: {
            rawData: 0,
            pca: 1,
            mds: 2
        },
        currentMode: 0,
        samplingRate: 1,
        samplingNum: 0,
        samplingSliderMaxValue: 100,
        maxSamplingNum: 30000,
        lastHighlightPointIndex: 0
    },
    mutations: {
        displayData(state) {
            const idx = state.idx

            const data = state.currentData
            const dimensions = state.dimensions
            const dataset = []
            const series = []
            // state.samplingSliderMaxValue = parseInt(data.length/10);
            let samplingRate = state.samplingRate
            if (data.length > state.maxSamplingNum) {
                samplingRate = state.maxSamplingNum / data.length * state.samplingRate
            }
            state.samplingNum = 0
            let n = 0
            let u = data.length
            while (u / 10 >= 10) {
                ++n
                u /= 10
            }
            state.samplingSliderMaxValue = parseInt(data.length > 100 ? Math.pow(10, n) : 100)

            if (data.length > 0 && state.samplingRate > 0) {
                if (Object.keys(idx).length > 0) {
                    data.forEach((v, i) => {
                        const cluster = idx[v.id]
                        if (dataset[cluster] === undefined) {
                            dataset[cluster] = { dimensions: dimensions, source: [] }
                            series.push({
                                type: 'scatter',
                                symbolSize: 10,
                                datasetIndex: series.length + 1, // series和dataset从下标1开始
                                large: true,
                                largeThreshold: 2000,
                                progressive: 400,
                                progressiveThreshold: 3000
                            })
                        }
                        dataset[cluster].source.push(v)
                    })
                } else {
                    dataset.push({ dimensions: dimensions, source: data })
                    series.push({
                        type: 'scatter',
                        symbolSize: 10,
                        datasetIndex: 1,
                        large: true,
                        largeThreshold: 2000,
                        progressive: 400,
                        progressiveThreshold: 3000
                        // itemStyle: {
                        //     normal: {
                        //         color: api.getRandomColor(1)
                        //     }
                        // }
                    })
                }

                // sampling

                for (let i = 0; i < dataset.length; ++i) {
                    const samplingData = []
                    const totalDataNum = dataset[i].source.length
                    const samplingNum = parseInt(totalDataNum * samplingRate)
                    const samplingDataIndexSet = new Set()
                    while (samplingDataIndexSet.size < samplingNum) {
                        const randomIndex = Math.floor(Math.random() * (totalDataNum))
                        if (!samplingDataIndexSet.has(randomIndex)) {
                            samplingData.push(dataset[i].source[randomIndex])
                            samplingDataIndexSet.add(randomIndex)
                        }
                    }
                    dataset[i].source = samplingData

                    const name = 'c' + i + '(' + dataset[series[i].datasetIndex - 1].source.length + ')'
                    Vue.set(series[i], 'name', name)
                    state.scatter_options.legend.data.push(name)
                    state.samplingNum += dataset[series[i].datasetIndex - 1].source.length
                }

                state.scatter_options.dataset = state.scatter_options.dataset.concat(dataset)
                state.scatter_options.series = state.scatter_options.series.concat(series)
            }
        },
        displayRawData(state) {
            if (state.rawData.dataset.length > 0 && state.rawData.series.length > 0) {
                state.scatter_options.dataset = state.rawData.dataset
                state.scatter_options.series = state.rawData.series
                state.currentMode = state.mode.rawData
            }
        },
        displayPCAData(state) {
            if (state.pca.dataset.length > 0 && state.pca.series.length > 0) {
                state.scatter_options.dataset = state.pca.dataset
                state.scatter_options.series = state.pca.series
                state.currentMode = state.mode.pca
            }
        },
        displayMDSData(state) {
            if (state.mds.dataset.length > 0 && state.mds.series.length > 0) {
                state.scatter_options.dataset = state.mds.dataset
                state.scatter_options.series = state.mds.series
                state.currentMode = state.mode.mds
            }
        },
        updateEchartsOptions(state, obj) {
            state.scatter_options = { ...state.scatter_options, ...obj }
            // if (state.scatter_options.hasOwnProperty(key)){
            //     state.scatter_options = { ...state.scatter_options, key: value};
            // } else
            //     Vue.set(state.scatter_options, key, value);
        },
        updateScatterData(state, dataIndex) {
            Vue.set(state.scatter_options.dataset[0].source, dataIndex, state.scatter_options.dataset[0].source[dataIndex])
        },
        addScatterLinePointByData(state, data) {
            if (state.scatter_options.dataset[0].source.length >= 2) {
                Vue.set(state.scatter_options.dataset[0].source, 1, data)
            } else { state.scatter_options.dataset[0].source.push(data) }
        },

        clearScatterLinePoint(state) {
            // state.scatter_options.dataset[0].source = [];
            state.scatter_options.series[0].data = []
            state.lastHighlightPointIndex = -1
        },
        addScatterLinePointByIndex(state, totalLength) {
            // let seriesIndex = 0, dataIndex = 0, currentLength = 0,
            //     nextPartLength = state.scatter_options.series[seriesIndex].length;
            // while (currentLength + nextPartLength <= totalLength) {
            //     currentLength += nextPartLength;
            //     nextPartLength = state.scatter_options.series[++seriesIndex].length;
            // }
            //
            // dataIndex = totalLength - currentLength;
            state.scatter_options.series[0].data.push(state.scatter_options.dataset[1].source[totalLength])
        },
        updateScatterGraphicPointByData(state, data) {
            state.scatter_graphic_points.push(data)
        },
        clearScatter(state) {
            state.scatter_options.dataset[0].source = []
            state.scatter_options.dataset[0].dimensions = []
            state.scatter_options.dataset.splice(1)
            state.scatter_options.legend.data = []
            state.scatter_options.series.splice(1)
            state.scatter_options.series[0].data = []
            state.lastHighlightPointIndex = -1
        },
        highlightLinePointByIndex(state, index) {
            if (state.lastHighlightPointIndex >= 0 && state.lastHighlightPointIndex < state.scatter_options.series[0].data.length) {
                Vue.set(state.scatter_options.series[0].data, state.lastHighlightPointIndex, state.scatter_options.series[0].data[state.lastHighlightPointIndex].value)
            }
            if (index < state.scatter_options.series[0].data.length) {
                Vue.set(state.scatter_options.series[0].data, index,
                    {
                        value: state.scatter_options.series[0].data[index],
                        itemStyle: {
                            color: 'red'
                        }
                    })
            }

            state.lastHighlightPointIndex = index
        }
    },
    actions: {
        displayRawData({ state, rootState, rootGetters, commit }, { headers }) {
            if (rootState.table.csv_file.data.length > 0) {
                commit('clearScatter')
                state.dimensions = headers
                state.currentData = rootState.table.csv_file.data
                commit('displayData')
                state.rawData.dataset = state.scatter_options.dataset
                state.rawData.series = state.scatter_options.series
                state.currentMode = state.mode.rawData
            }
        },
        redisplayPCAData({ state, commit }, { headers, rows }) {
            commit('clearScatter')
            state.dimensions = headers
            state.currentData = Object.freeze(rows)
            commit('displayData')
            state.pca.dataset = state.scatter_options.dataset
            state.pca.series = state.scatter_options.series
            state.currentMode = state.mode.pca
        },
        redisplayMDSData({ state, commit }, { headers, rows }) {
            commit('clearScatter')
            state.dimensions = headers
            state.currentData = Object.freeze(rows)
            commit('displayData')
            state.mds.dataset = state.scatter_options.dataset
            state.mds.series = state.scatter_options.series
            state.currentMode = state.mode.mds
        },
        cluster({ state, commit, rootState }) {
            state.idx = rootState.table.csv_file.idx
            commit('clearScatter')
            commit('displayData')
        },
        fppcaAddScatterLinePoints({ state, commit }, { data }) {
            const ndata = data.map((obj) => {
                return state.dimensions.map((v, i) => {
                    return obj[v]
                })
            })
            state.scatter_options.series[0].data = ndata
            const index = state.lastHighlightPointIndex
            state.lastHighlightPointIndex = -1
            commit('highlightLinePointByIndex', index)
        },
        addScatterLinePoints({ state, rootState, dispatch }, { current_node_id, data }) {
            state.scatter_options.dataset[0].dimensions = state.dimensions
            const ndata = data.map((obj) => {
                return state.dimensions.map((v, i) => {
                    return obj[v]
                })
            })
            switch (state.currentMode) {
                case state.mode.rawData:
                    state.scatter_options.series[0].data = ndata
                    break
                case state.mode.pca:
                    dispatch('fppca', { x: data, headers: state.dimensions, id: current_node_id }, { root: true })
                    break
                case state.mode.mds:
                    break
            }
        },
        changeSamplingRate({ state, commit }, samplingRate) {
            state.samplingRate = samplingRate
            commit('clearScatter')
            commit('displayData')
        }
    },
    getters: {
        getOptions: (state, getters, rootState, rootGetters) => {
            return state.scatter_options
        },
        getScatterGraphicPoints: state => {
            return state.scatter_graphic_points
        },
        getScatterDataStartPosInSeries: state => {
            return state.scatter_data_start_pos_in_series
        },
        getDataset: state => {
            return state.scatter_options.dataset.source
        },
        getSamplingNum: state => {
            return state.samplingNum
        },
        getSamplingRate: state => {
            return state.samplingRate
        },
        getSamplingSliderMaxValue: state => {
            return state.samplingSliderMaxValue
        }
    }

}
