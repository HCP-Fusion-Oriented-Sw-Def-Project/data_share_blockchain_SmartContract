export const RegionBar = {
  color: ['#003366', '#006699', '#4cabce', '#e5323e'],
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
      }
  }]
}

export const IndustryBar = {
  color: ['#003366', '#006699', '#4cabce', '#e5323e'],
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
      }
  }]
}
