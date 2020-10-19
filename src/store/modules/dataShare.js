export default {
  state: {
    startContract: {},
    listProjects: [],
    contractProcessList: [],
    contractLogList: [],
    countContractLog: {
      '7': {},
      '30': {},
      '360': {}
    },
    // countContractLogByContractName: [],
    contractLogListByDate: [],
    visited: false,
    dataToPar: {}
  },
  mutations: {
    setStartContract: (state, startContract) => {
      state.startContract = startContract
    },
    setListProjects: (state, listProjects) => {
      // for (const v of listProjects) {
      //   state.listProjects.push(v);
      // }
      state.listProjects = listProjects
    },
    setContractProcessList: (state, getContractProcessList) => {
      state.contractProcessList = getContractProcessList
    },
    setVisited: (state, visited) => {
      state.visited = visited
    },
    setContractLogList: (state, contractLogList) => {
      state.contractLogList = contractLogList
    },
    setCountContractLog: (state, countContractLog) => {
      for (const contract in countContractLog.data) {
        if (countContractLog.data[contract].length === 7) {
          state.countContractLog['7'] = countContractLog.data
        } else if (countContractLog.data[contract].length === 6) {
          state.countContractLog['30'] = countContractLog.data
        } else {
          state.countContractLog['360'] = countContractLog.data
        }
        break
      }
    },
    // setCountContractLogByContractName: (state, countContractLogByContractName) => {
    //   state.countContractLogByContractName = countContractLogByContractName
    // },
    setContractLogListByDate: (state, contractLogListByDate) => {
      state.contractLogListByDate = contractLogListByDate
    },
    setDataToPar: (state, dataToPar) => {
      state.dataToPar = Object.assign({}, state.dataToPar, dataToPar)
    }

  }
}
