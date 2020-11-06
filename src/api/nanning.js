
export function fetchIndustryList(args) {
    return new Promise((resolve, reject) => {
      window.executeContract('NanningFront', 'listDetailTable', JSON.stringify(args), (res) => {
        resolve(res)
      })
    })
}

export function fetchAlertCompList(args) {
    return new Promise((resolve, reject) => {
      window.executeContract('NanningFront', 'listAlertComp', JSON.stringify(args), (res) => {
        resolve(res)
      })
    })
}

export function analysisByDistinct(args) {
    return new Promise((resolve, reject) => {
      window.executeContract('NanningFront', 'analysisByDistinct', JSON.stringify(args), (res) => {
        resolve(res)
      })
    })
}

export function analysisByIndustry(args) {
  return new Promise((resolve, reject) => {
    window.executeContract('NanningFront', 'analysisByIndustry', JSON.stringify(args), (res) => {
      resolve(res)
    })
  })
}
