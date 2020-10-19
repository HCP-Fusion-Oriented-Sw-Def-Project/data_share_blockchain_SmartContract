import echarts from "echarts";
//pictorialbar
var Sym_margin = "5%";
var Sym_size = 30;
var Sym_url = "image://data:image/png;base64,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";

var options = {
  bar: {
    tooltipXOffset: 0,
    tooltipYOffset: 0,
    barCategoryGap: 10,
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    title: {
      show: true,
      text: "",
      top: 30,
      left: 30,
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      //position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },

    legend: {
      show: true,
      type: "plain",
      data: [],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",
      left: "30",

    },
    grid: {
      top: "80",
      left: "30",
      right: "30",
      bottom: "30",
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: [
      {
        type: "category",

        boundaryGap: true,
        name: "",
        nameLocation: "end",

        nameRotate: null,
        inside: false,
        offset: 0,
        axisLine: {
          lineStyle: {
            color: "#000000",
            width: 1,//这里是为了突出显示加上的
          },
          symbol: ["none", "arrow"]
        },
        axisLabel: {
          show: true,
          rotate: 45,
          margin: 10,
          interval: 0,
          textStyle: {
            color: "#444645",
            fontSize: "12",
            fontWeight: "normal"
          }

        },
        splitLine: {
          show: false,
          lineStyle: {
            // 使用深浅的间隔色
            color: "#aaa"
          }
        },
        data: [],

      }
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        // min:function(value) {
        //     return value.min.toFixed(0)-10;
        // },
        // max: function(value) {
        //     return value.max.toFixed(0);
        // },

        boundaryGap: false,
        nameLocation: "end",

        nameRotate: null,

        axisLine: {
          lineStyle: {
            color: "#000000",
            width: 1,
          },
          symbol: ["none", "arrow"]
        },
        splitLine: {
          show: false,
          lineStyle: {
            // 使用深浅的间隔色
            color: "#aaa"
          }
        },
        axisLabel: {
          show: true,
          formatter: null,
          rotate: 0,
          margin: 0,
          textStyle: {
            color: "#444645",
            fontSize: "12",
            fontWeight: "normal"
          }

        },
      },
    ],
    // axisPointer: {
    //     show: false,
    //     type: 'line',
    //
    //     lineStyle: {
    //         color: '#555',
    //         width: 1,
    //         type: 'solid'
    //     }
    // },
    series: [
      {
        name: "",
        type: "bar",
        data: []
      }
    ]
  },
  blank: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      }
    },

    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    angleAxis: {
      type: "category",
      data: [],
      show: true,
      startAngle: 90,
      axisLine: {
        lineStyle: {
          width: 1,
          color: "#333",
          type: "solid"
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        margin: 5
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#ccc",
          width: 1,
          type: "solid"
        }
      },
      // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      z: 10
    },
    radiusAxis: {
      show: true,
      axisLine: {
        lineStyle: {
          width: 1,
          color: "#333",
          type: "solid"
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        margin: 5
      }
    },
    polar: {
      center: ["50%", "50%"],
      radius: 170
    },
    legend: {
      show: true,
      // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他'],
      data: [],
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 150,
      top: 20
    },
    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },

    series: [
      {
        name: "",
        type: "bar",
        stack: "总量",
        coordinateSystem: "polar",
        data: []
      }
    ],
    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: 300
  },
  boxplot: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {
        show: true,
        type: "line",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    grid: {
      top: "100",
      left: "0",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: [{
      type: "category",
      inverse: false,
      boundaryGap: true,
      offset: 0,
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameRotate: null,
      inside: false,
      axisLine: {
        lineStyle: {
          color: "#000000",
          width: 1,//这里是为了突出显示加上的
        },
        symbol: ["none", "arrow"]
      },
      axisLabel: {
        show: true,
        rotate: 0,
        //formatter: 'expr {value}',
        textStyle: {
          color: "#444645",
          fontSize: "16",
          fontWeight: "normal"
        }

      },
      splitLine: {
        show: true,
        lineStyle: {
          // 使用深浅的间隔色
          color: "#aaa"
        }
      },
      data: [],
      splitArea: {
        show: false
      }
    }],
    yAxis: [
      {
        type: "value",
        name: "",
        min: "dataMin",
        max: "dataMax",
        inverse: false,
        boundaryGap: false,
        nameLocation: "end",
        nameGap: 15,
        nameRotate: null,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            color: "#000000",
            width: 1,
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            // 使用深浅的间隔色
            color: "#aaa"
          },
          symbol: ["none", "arrow"]
        },
        axisLabel: {
          show: true,
          formatter: null,
          rotate: 0,
          margin: 10,
          textStyle: {
            color: "#444645",
            fontSize: "16",
            fontWeight: "normal"
          }

        },
      }
    ],
    legend: {
      show: true,
      type: "plain",
      data: [],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "auto",
      bottom: "auto",
      left: "center",
      right: "auto"
    },
    series: [
      {
        name: "",
        type: "boxplot",
        layout: "horizontal",
        boxWidth: [7, 50],
        data: [],
        itemStyle: {
          color: "#fff",
          borderColor: "#000",
          borderWidth: 1,
          borderType: "solid"
        },
        tooltip: {
          formatter: function (param) {
            return [
              "Experiment " + param.name + ": ",
              "upper: " + param.data[5],
              "Q3: " + param.data[4],
              "median: " + param.data[3],
              "Q1: " + param.data[2],
              "lower: " + param.data[1]
            ].join("<br/>");
          }
        }
      },
      {
        name: "outlier",
        type: "scatter",
        data: []
      }
    ]
  },
  bubble: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    textStyle: {
      fontFamily: "Arial"
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    legend: {
      show: true,
      data: [],
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 30,
      top: 20
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {show: true},
        saveAsImage: {}
      }
    },
    xAxis: {
      data: [],
      name: "",
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 45,
        margin: 10

      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {//第一个y轴

      name: "",//单位
      scale: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        margin: 10,
        //formatter: this.getFormatFunc(i)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    series: [
      {
        name: "",
        data: [],
        type: "scatter",
        symbolSize: [],
        label: {
          emphasis: {
            show: true,
            // formatter: function (param) {
            //   var msg = "";
            //   for (let i = 0; i < param.data.length; i++) {
            //     if (i == 2) continue;
            //     msg += param.data[i] + "\n";
            //   }
            //   return msg;
            // },
            position: "top"
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: "rgb(251, 118, 123)"
            }, {
              offset: 1,
              color: "rgb(204, 46, 72)"
            }])
          }
        }
      }
    ],
    //有点问题  折线动画不显示 动画缓动效果差距不明显
    // animationDuration:1000,
    animationEasing: "linear",
    animationDurationUpdate: 300,
  },
  calendar: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: function (params) {
        return params.value[0] + ": " + params.value[1];
      },
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    legend: {
      data: [],
      left: "center",
      top: "top"

    },
    calendar: [{
      top: 100,
      left: 60,
      range: ["2017-01-02", "2017-11-23"],
      cellSize: [18, 20],
      orient: "horizontal",
      dayLabel: {
        color: "#000",
        fontSize: 12,
        margin: 10,
        firstDay: "0",
        nameMap: "cn",
      },
      monthLabel: {
        color: "#000",
        fontSize: 16,
        margin: 5,
        nameMap: "cn",
        position: "start"
      },
      yearLabel: {
        show: true,
        color: "#000",
        fontSize: 18,
        fontWeight: "normal",
        margin: 30
      }
    }],
    visualMap: {
      show: true,
      //type: 'scroll',
      min: 0,
      max: 10000,
      left: "left",
      top: 25,
      //right:'auto',
      splitNumber: 5,
      orient: "horizontal",
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      textGap: 10,

    },
    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    series: [{
      name: "",
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: 0,
      data: []
    }],
    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: function (idx) {
      return idx * 100;
    }
  },
  funnel: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",

      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      formatter: "{a} <br/>{b} : {c}",
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    legend: {
      show: true,
      type: "scroll",
      data: [],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",

      left: "30",

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    calculable: true,
    series: [
      {
        name: "",
        type: "funnel",
        left: 60,
        top: 60,
        //x2: 80,
        bottom: 60,
        right: 60,
        width: "80%",
        // height: {totalHeight} - y - y2,
        min: 0,
        max: 100,
        minSize: "0%",
        maxSize: "100%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
          color: null,
          fontWeight: "normal",
          fontFamily: "sans-serif",
          fontSize: 12,
          align: "center",
          verticalAlign: "middle"

        },
        labelLine: {
          length: 10,
          lineStyle: {
            color: null,
            width: 1,
            type: "solid"
          }
        },
        itemStyle: {
          color: null,
          borderColor: "#fff",
          borderWidth: 1,
          borderType: "solid"
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: []
      }
    ]
  },
  gantte: {
    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "center",
      top: "auto",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    dataZoom: [
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        },
        formatter: function (params) {
          var res = params[0].name + "</br>";
          var date0 = params[0].data;
          var date1 = params[1].data;
          var date2 = params[2].data;
          var date3 = params[3].data;
          date0 = date0.getFullYear() + "-" + (date0.getMonth() + 1) + "-" + date0.getDate();
          date1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
          date2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
          date3 = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate();
          res += params[0].seriesName + "~" + params[1].seriesName + ":</br>" + date0 + "~" + date1 + "</br>";
          res += params[2].seriesName + "~" + params[3].seriesName + ":</br>" + date2 + "~" + date3 + "</br>";
          return res;
        }
      }
    },


    textStyle: {
      fontFamily: "Arial"
    },
    legend: {
      show: true,
      y: "bottom",
      data: [],
      // data: ['计划时间', '实际时间'], //修改的地方1
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 150,
      top: 20
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "time",

      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10,
        //interval:0
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {//y轴
      //type: 'value',
      name: "",//单位
      data: [],
      z: 20,
      // max:200,
      // min:0,
      // data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七'],
      //splitNumber:5,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        margin: 10,
        //formatter: this.getFormatFunc(i)
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        //barWidth:20,
        data: [],
        stack: "test1",
        z: 10,
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        },
        silent: true,
        itemStyle: {
          normal: {
            barBorderColor: "#F2F6FC",
            color: "#F2F6FC"
          }//,
          // emphasis: {
          //     barBorderColor: 'rgba(0,0,0,0)',
          //     color: 'rgba(0,0,0,0)'
          // }
        }

      },
      {
        name: "",
        type: "bar",
        data: [],
        stack: "test1",
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        },
        //修改地方2
        itemStyle: {
          normal: {
            barBorderColor: "#F2F6FC",
            color: "#F98563"
          }
        }

      },
      {
        name: "",
        type: "bar",
        data: [],
        stack: "test2",
        z: 10,
        silent: true,
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        },
        itemStyle: {
          normal: {
            barBorderColor: "#F2F6FC",
            color: "#F2F6FC"
          }
        }
      },
      {
        name: "",
        type: "bar",
        data: [],
        stack: "test2",
        //修改地方3
        itemStyle: {
          normal: {
            barBorderColor: "#F2F6FC",
            color: "#A2E068"
          }
        },
        label: {
          normal: {
            show: true,
            position: "insideTop"
          }
        }
      }
    ],
    //有点问题  折线动画不显示 动画缓动效果差距不明显
    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: 300,
  },
  gauge: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",

      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    series: [
      {
        name: "",
        type: "gauge",
        radius: 200,
        startAngle: 225,
        endAngle: -45,
        clockwise: true,
        min: 0,
        max: 100,
        splitNumber: 10,

        axisLine: {
          lineStyle: {
            //color: null,
            width: 30
          }
        },
        splitLine: {
          show: true,
          length: 30,
          lineStyle: {
            color: "#eee",
            width: 2,
            type: "solid"
          }
        },
        axisLabel: {
          show: true,
          distance: 5,
          color: null,
          fontFamily: "sans-serif",
          fontSize: 12,
          fontWeight: "normal"
        },
        pointer: {
          show: true,
          length: 140,
          width: 8
        },
        itemStyle: {
          //color: null,
          borderColor: null,
          borderWidth: 0,
          borderType: "solid"
        },
        detail: {formatter: "{value}"},
        data: []
      }
    ]
  },
  heatmap: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      formatter: function (params) {
        let strs = params.name.split(","); //字符分割
        let str = "";
        for (let i = 0; i < strs.length; i++) {
          str += strs[i] + "<br/>";
        }
        str += params.value[2];
        return str;
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    visualMap: {
      show: true,
      min: 0,
      max: 10,
      //range: [4, 15],
      calculable: true,
      orient: "horizontal",
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      textGap: 10,
      left: 150,
      top: 20
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      name: "",
      type: "category",
      data: [],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: 12,
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10,

      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      splitArea: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {//第一个y轴
      type: "category",
      data: [],
      name: "",//单位
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        margin: 10
      },
      splitArea: {
        show: true
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    series: [{
      name: "",
      type: "heatmap",
      data: [],
      label: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }],
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
  },
  lineArea: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    grid: {
      top: "100",
      left: "0",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    xAxis: [{
      type: "category",
      inverse: false,
      boundaryGap: false,
      name: "",
      nameLocation: "end",
      nameGap: 15,
      nameRotate: null,
      inside: false,
      min: "dataMin",
      max: "dataMax",
      offset: 0,
      axisLine: {
        lineStyle: {
          color: "#000000",
          width: 1,//这里是为了突出显示加上的
        },
        symbol: ["none", "arrow"]
      },
      axisLabel: {
        show: true,
        rotate: 45,
        margin: 10,
        textStyle: {
          color: "#444645",
          fontSize: "12",
          fontWeight: "normal"
        }

      },
      splitLine: {
        show: false,
        lineStyle: {
          // 使用深浅的间隔色
          color: "#aaa"
        }
      },
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        type: "shadow"
      }
    }],
    yAxis: [{
      type: "value",
      name: "",
      min: "dataMin",
      max: "dataMax",
      offset: 0,
      inverse: false,
      boundaryGap: false,
      nameLocation: "end",
      nameGap: 15,
      nameRotate: null,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: "#000000",
          width: 1,
        },
        symbol: ["none", "arrow"]
      },
      splitLine: {
        show: false,
        lineStyle: {
          // 使用深浅的间隔色
          color: "#aaa"
        }
      },
      axisLabel: {
        show: true,
        formatter: null,
        rotate: 0,
        textStyle: {
          color: "#444645",
          fontSize: "12",
          fontWeight: "normal"
        }

      },
    }],
    legend: {
      show: true,
      type: "plain",
      data: [],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",

      left: "30"

    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    series: [{
      data: [],
      type: "line",
      name: "",
      smooth: false,
      areaStyle: {
        color: null,
        origin: "auto"
      },
    }]
  },
  lineBar: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "center",
      top: "auto",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        filterMode: "none",
        start: 0,
        end: 100
      }

    ],
    textStyle: {
      fontFamily: "Arial"
    },
    legend: {
      show: true,
      data: [],
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 150,
      top: 20
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      name: "",
      data: [],
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 45,
        margin: 10
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: [{//第一个y轴
      name: "",//单位
      max: "dataMax",
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        margin: 10,
        rotate: 0
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
      {
        name: "",
        max: "dataMax",
        axisLabel: {
          show: true,
          textStyle: {
            color: "#2f4554",
            fontSize: "12",
            fontWeight: "normal"
          },
          margin: 10,

        },
        splitLine: {
          show: false,
          lineStyle: {
            color: "rgba(197, 152, 152, 0.31)"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#000",
          },
          symbol: ["none", "arrow"]
        }
      }],

    series: [{
      name: "",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        color: ""
      },
      yAxisIndex: 0,
      barGap: 20,
      data: []
    }, {
      name: "",
      type: "line",
      lineStyle: {
        width: 1,
        type: "solid",
      },
      smooth: false,
      yAxisIndex: 1,
      data: []
    }],

    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: 300
  },
  line: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    grid: {
      top: "80",
      left: "30",
      right: "30",
      bottom: "30",
      containLabel: true
    },
    title: {
      show: true,
      text: "",
      link: "",
      top: 30,
      left: 30,
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,

      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    xAxis: [{
      // type: 'category',
      inverse: false,
      boundaryGap: false,
      name: "",
      nameLocation: "end",
      //nameGap: 15,
      nameRotate: null,
      inside: false,
      min: "dataMin",
      max: "dataMax",
      offset: 0,
      axisLine: {
        lineStyle: {
          color: "#000000",
          width: 1,//这里是为了突出显示加上的
        },
        symbol: ["none", "arrow"]
      },
      axisLabel: {
        show: true,
        rotate: 45,
        margin: 10,
        textStyle: {
          color: "#444645",
          fontSize: "12",
          fontWeight: "normal"
        }

      },
      splitLine: {
        show: false,
        lineStyle: {
          // 使用深浅的间隔色
          color: "#aaa"
        }
      },
      data: []

    }],
    yAxis: [{
      // type: 'value',
      name: "",
      min: "dataMin",
      max: "dataMax",
      offset: 0,
      inverse: false,
      boundaryGap: false,
      nameLocation: "end",
      //nameGap: 15,
      nameRotate: null,

      axisLine: {
        lineStyle: {
          color: "#000000",
          width: 1,
        },
        symbol: ["none", "arrow"]
      },
      splitLine: {
        show: false,
        lineStyle: {
          // 使用深浅的间隔色
          color: "#aaa"
        }
      },
      axisLabel: {
        show: true,
        formatter: null,
        rotate: 0,
        textStyle: {
          color: "#444645",
          fontSize: "12",
          fontWeight: "normal"
        }

      },
    }],
    legend: {
      show: true,
      type: "plain",
      data: ["line"],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "10",

      left: "10",

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],

    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      //position: null,
      borderColor: "#333",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {

        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    series: [{
      data: [],
      type: "line",
      name: "line",
      smooth: false
    }]
  },
  liquidfill: {
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    title: {
      show: true,
      text: "",
      subtext: "",
      link: "",
      target: "blank",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "center",
      top: "auto",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      formatter: "{c} ",
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {
        show: true,
        type: "line",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    series: [{
      type: "liquidFill",
      data: [],

      color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
      center: ["50%", "50%"],
      radius: "50%",
      amplitude: "8%",
      waveLength: "80%",
      phase: "auto",
      period: "auto",
      direction: "right",
      shape: "circle",

      waveAnimation: true,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
      animationDuration: 2000,
      animationDurationUpdate: 1000,

      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: "none",
          borderColor: "#294D99",
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.25)"
        }
      },

      backgroundStyle: {
        color: "#E3F7FF"
      },

      itemStyle: {
        opacity: 0.95,
        shadowBlur: 50,
        shadowColor: "rgba(0, 0, 0, 0.4)"
      },

      label: {
        show: true,
        color: "#294D99",
        insideColor: "#fff",
        fontSize: 50,
        fontWeight: "bold",

        align: "center",
        baseline: "middle",
        position: "inside"
      },

      emphasis: {
        itemStyle: {
          opacity: 0.8
        }
      }
    }]
  },
  nanding: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei"
    },
    title: {
      show: true,
      text: "",
      subtext: "",
      link: "",
      target: "blank",

      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      formatter: "{b} : {c} ({d}%)",
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {

      data: [],
      show: true,
      type: "scroll",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",

      left: "30",

    },
    series: [
      {
        name: "",
        type: "pie",
        radius: [0, "75%"],
        center: ["50%", "50%"],
        roseType: "area",
        selectedMode: false,
        selectedOffset: 10,
        clockWise: true,
        startAngle: 90,
        minAngle: 0,
        //minShowLabelAngle: 0,
        avoidLabelOverlap: true,
        stillShowZeroSum: true,
        data: [],
        label: {
          show: true,
          position: "outside",
          color: null,
          fontWeight: "normal",
          fontSize: 12,
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 10,
          smooth: false,
          lineStyle: {
            color: null,
            width: 1,
            type: "solid"
          }
        },
        itemStyle: {
          color: null,
          borderColor: null,
          borderWidth: 0,
          borderType: "solid"
        }
      }
    ]
  },
  parallel: {
    //backgroundColor: '#333',
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,

    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    legend: {
      show: true,
      type: "plain",
      data: [],
      textStyle: {
        fontSize: 14,
        color: "#000",
        fontWeight: "Normal"
      },
      itemGap: 10,
      top: "auto",
      bottom: "auto",
      left: "center",
      right: "auto"
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      axisPointer: {
        show: true,
        type: "line",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    // dataZoom: {
    //     show: true,
    //     orient: 'vertical',
    //     parallelAxisIndex: [0]
    // },
    parallelAxis: [],
    visualMap: {
      show: true,
      dimension: 2,
      min: 0,
      max: 100000000,
      inRange: {
        color: ["#d94e5d", "#eac736", "#50a3ba"].reverse(),
        // colorAlpha: [0, 1]
      }
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    parallel: {
      left: 30,
      top: 100,
      right: 100,
      bottom: 30,
      layout: "horizontal",
      axisExpandable: true,
      axisExpandWidth: 50,
      axisExpandTriggerOn: "click",
      parallelAxisDefault: {
        type: "value",
        name: "",
        nameLocation: "end",
        nameGap: 20,
        nameRotate: 0,
        inverse: false,
        nameTextStyle: {
          color: "#000",
          fontSize: 12,
          fontWeight: "normal",
          align: null,
          verticalAlign: null
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#000",
            width: 1,
            type: "solid"
          }
        },
        axisTick: {
          show: true,
          inside: false,
          length: 5,
          lineStyle: {
            color: "#000",
            width: 1,
            type: "solid"
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          inside: false,
          rotate: 0,
          margin: 8,
          color: "#000",
          fontWeight: "normal",
          fontSize: 12,

        }
      }
    },
    series: [
      {
        name: "",
        type: "parallel",
        smooth: false,
        lineStyle: {
          color: null,
          width: 2,
          type: "solid"
        },
        data: []
      }
    ]
  },
  pictorialBar: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    xAxis: {
      name: "",
      //type: 'category',
      //data: [],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {//第一个y轴
      //type: 'value',
      data: [],
      name: "",//单位
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]//代表是否带有箭头
      }
    },
    series: [{
      // current data
      type: "pictorialBar",
      symbol: Sym_url,
      symbolRepeat: "fixed",
      symbolMargin: Sym_margin,
      symbolClip: true,
      symbolSize: Sym_size,
      //symbolBoundingData: maxData,
      data: [],
      markLine: {
        symbol: "none",
        label: {
          normal: {
            formatter: "max: {c}",
            position: "end"
          }
        },
        lineStyle: {
          normal: {
            color: "green",
            type: "dotted",
            opacity: 0.2,
            width: 2
          }
        },
        data: [{
          type: "max"
        }]
      },
      z: 10
    }, {
      // full data
      type: "pictorialBar",
      itemStyle: {
        normal: {
          opacity: 0.2
        }
      },
      label: {show: false},
      // label: {
      //    normal: {
      //        show: true,
      //        formatter: function (params) {
      //            return (params.value / maxData * 100).toFixed(1) + ' %';
      //        },
      //        position: 'right',
      //        offset: [10, 0],
      //        textStyle: {
      //            color: 'green',
      //            fontSize: 18
      //        }
      //    }
      // },
      animationDuration: 0,
      symbolRepeat: "fixed",
      symbolMargin: Sym_margin,
      symbol: Sym_url,
      symbolSize: Sym_size,
      //symbolBoundingData: maxData,
      data: [],
      z: 5
    }],
    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    animationDuration: 2000,
    animationEasing: "linear",
    animationDurationUpdate: function (idx) {
      return idx * 100;
    }
  },
  pie: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei"
    },
    title: {
      show: true,
      text: "",
      subtext: "",
      link: "",
      target: "blank",

      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      formatter: "{b} : {c} ({d}%)",
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    legend: {
      // orient: 'vertical',
      data: [],
      show: true,
      type: "scroll",
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",

      left: "30",

    },
    series: [
      {
        name: "",
        type: "pie",
        radius: [0, "75%"],
        center: ["50%", "60%"],
        selectedMode: false,
        selectedOffset: 10,
        clockWise: true,
        startAngle: 90,
        minAngle: 0,
        minShowLabelAngle: 0,
        avoidLabelOverlap: true,
        stillShowZeroSum: true,
        data: [],
        label: {
          show: true,
          position: "outside",
          color: null,
          fontWeight: "normal",
          fontSize: 12,
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 10,
          smooth: false,
          lineStyle: {
            color: null,
            width: 1,
            type: "solid"
          }
        },
        itemStyle: {
          color: null,
          borderColor: null,
          borderWidth: 0,
          borderType: "solid"
        }
      }
    ]
  },
  radar: {
    //backgroundColor: '#161627',
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    title: {
      show: true,
      link: "",
      text: "",
      target: "blank",
      subtext: "",

      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#eee",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },

    legend: {
      selectedMode: "single",
      show: true,
      type: "plain",
      data: [],
      textStyle: {
        color: "#000",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 20,
      top: "30",

      left: "30",

    },
    // visualMap: {
    //     show: true,
    //     min: 0,
    //     max: 20,
    //     dimension: 6,
    //     inRange: {
    //         colorLightness: [0.5, 0.8]
    //     }
    // },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    radar: {
      radius: "75%",
      startAngle: 90,
      name: {
        show: true,
        color: "#000",
        fontWeight: "normal",
        fontSize: 12
      },
      nameGap: 15,
      shape: "circle",
      splitNumber: 5,
      indicator: [{name: "销售（sales）", max: 6500}],
      splitLine: {
        lineStyle: {
          color: [
            "rgba(238, 197, 102, 0.1)", "rgba(238, 197, 102, 0.2)",
            "rgba(238, 197, 102, 0.4)", "rgba(238, 197, 102, 0.6)",
            "rgba(238, 197, 102, 0.8)", "rgba(238, 197, 102, 1)"
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(238, 197, 102, 0.5)",
          width: 1,
          type: "solid"
        }
      }
    },
    series: [
      {
        name: "",
        type: "radar",
        lineStyle: {
          color: null,
          width: 1,
          type: "solid"
        },
        data: [
          {
            value: [],
            name: "",
            label: {
              show: true
            }
          }
        ],
        itemStyle: {
          color: "#F9713C",
          borderColor: "#000",
          borderWidth: 0,
          borderType: "solid"
        },
        areaStyle: {
          normal: {
            opacity: 0.1
          }
        }
      }
    ]
  },
  sankey: {
    color: [
      "#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"
    ],
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    series: [
      {
        type: "sankey",
        left: 30,
        top: 80,
        right: 30,
        bottom: 30,
        nodeWidth: 20,
        nodeGap: 8,
        nodeAlign: "justify",
        layoutIterations: 50,
        draggable: true,
        focusNodeAdjacency: "allEdges",
        data: [],
        links: [],
        orient: "horizontal",
        label: {
          show: true,
          position: "top",
          distance: 5,
          rotate: 0,
          offset: [0, 0],
          color: "#000",
          fontSize: 12,
          fontWeight: "normal",

        },
        itemStyle: {
          color: null,
          borderColor: "#aaa",
          borderWidth: 1,
          borderType: "solid"
        },
        lineStyle: {
          color: "source",
          opacity: 0.2,
          curveness: 0.5
        }
      }
    ]
  },
  scatter: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      // position: null,
      borderColor: "#333",
      borderWidth: 1,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      },
      formatter: function (params) {
        console.log(params);
        // let strs = params.name.split(","); //字符分割
        // let str = "";
        // for (let i=0; i<strs.length; i++ ){
        //     str += strs[i]+"<br/>";
        // }
        // str += params.value[2];
        // return str;
      },
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }

    },
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    legend: {
      show: true,
      type: "scroll",
      data: ["scatter"],
      textStyle: {
        fontSize: 12,
        color: "#000000",
        fontWeight: "normal"
      },
      itemGap: 10,
      top: "30",
      left: "10",
    },
    grid: {
      top: "80",
      left: "30",
      right: "30",
      bottom: "30",
      containLabel: true
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      },
      {
        type: "inside",
        yAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: [
      {
        type: "value",

        min: "dataMin",
        max: "dataMax",
        name: "",
        nameLocation: "end",

        nameRotate: null,
        inside: false,
        offset: 0,
        axisLine: {
          lineStyle: {
            color: "#000000",
            width: 1,//这里是为了突出显示加上的
          },
          symbol: ["none", "arrow"]
        },
        axisLabel: {
          show: true,
          rotate: 45,
          margin: 10,
          textStyle: {
            color: "#444645",
            fontSize: "16",
            fontWeight: "normal"
          }

        },
        splitLine: {
          show: true,
          lineStyle: {
            // 使用深浅的间隔色
            color: null
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        min: "dataMin",
        max: "dataMax",

        boundaryGap: false,
        nameLocation: "end",
        nameGap: 15,
        nameRotate: null,

        axisLine: {
          lineStyle: {
            color: "#000000",
            width: 1,
          },
          symbol: ["none", "arrow"]
        },
        splitLine: {
          show: true,
          lineStyle: {
            // 使用深浅的间隔色
            color: null
          }
        },
        axisLabel: {
          show: true,
          formatter: null,
          rotate: 0,
          textStyle: {
            color: "#444645",
            fontSize: "16",
            fontWeight: "normal"
          }

        },
      },
    ],
    series: [{
      type: "scatter",
      name: "",
      symbolSize: 20,
      itemStyle: {
        borderColor: "#000",
        borderWidth: 0,
        borderType: "solid"
      },
      data: [],
    }]
  },
  stackedBar: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },

    grid: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    legend: {
      show: true,
      // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他'],
      data: [],
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 150,
      top: 20
    },
    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      name: "",
      // type: 'category',
      // data: ['周一','周二','周三','周四','周五','周六','周日'],
      data: [], //this.xAxis[0].list
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 45,
        margin: 10
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000"
        },
        symbol: ["none", "arrow"]
      }
    },
    yAxis: {
      //第一个y轴
      // type: 'value',
      name: "", //单位
      //max:3000,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10
        // formatter: this.getFormatFunc(i)
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000"
        },
        symbol: ["none", "arrow"] //代表是否带有箭头
      }
    },
    series: [
      {
        name: "",
        type: "bar",
        stack: "总量",
        data: [], //this.yAxis[0].list
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        barWidth: 10
      }
    ],
    // data: [320, 302, 301, 334, 390, 330, 320]
    // },
    // {
    //    name: '邮件营销',
    //    type: 'bar',
    //    stack: '总量',
    //    label: {
    //        normal: {
    //            show: true,
    //            position: 'insideRight'
    //        }
    //    },
    //    data: [120, 132, 101, 134, 90, 230, 210]
    // },
    // {
    //    name: '联盟广告',
    //    type: 'bar',
    //    stack: '总量',
    //    label: {
    //        normal: {
    //            show: true,
    //            position: 'insideRight'
    //        }
    //    },
    //    data: [220, 182, 191, 234, 290, 330, 310]
    // },
    // {
    //    name: '视频广告',
    //    type: 'bar',
    //    stack: '总量',
    //    label: {
    //        normal: {
    //            show: true,
    //            position: 'insideRight'
    //        }
    //    },
    //    data: [150, 212, 201, 154, 190, 330, 410]
    // },
    // {
    //    name: '搜索引擎',
    //    type: 'bar',
    //    stack: '总量',
    //    label: {
    //        normal: {
    //            show: true,
    //            position: 'insideRight'
    //        }
    //    },
    //    data: [820, 832, 901, 934, 1290, 1330, 1320]
    // }
    // ],
    //有点问题  折线动画不显示 动画缓动效果差距不明显
    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: function (idx) {
      return idx * 100;
    }
  },
  sunburst: {
    animationDuration: 1000,
    animationEasing: "cubicOut",
    animationDurationUpdate: 300,
    textStyle: {
      fontFamily: "Microsoft YaHei",
    },
    title: {
      show: true,
      text: "",
      subtext: "",
      sublink: "",
      link: "",
      target: "blank",
      subtarget: "",
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontSize: 14,
        align: "center",
        fontWeight: "normal",
        color: "#333"
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 12,
      }

    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      hideDelay: 100,
      backgroundColor: "rgba(50,50,50,0.7)",
      padding: [5, 5, 5, 5],
      position: null,
      borderColor: "#333",
      borderWidth: 0,
      textStyle: {
        color: "#fff",
        fontFamily: "sans-serif",
        fontSize: 12,
        fontWeight: "normal"
      }
      // axisPointer: {
      //     show: true,
      //     type: 'line',
      //     lineStyle: {
      //         color: '#555',
      //         width: 1,
      //         type: 'solid'
      //     }
      // }
    },
    series: {
      type: "sunburst",
      highlightPolicy: "ancestor",
      data: [],
      radius: [0, "95%"],
      center: ["50%", "50%"],
      sort: null,
      label: {
        show: true,
        rotate: "radial",
        position: "inside",
        distance: 5,
        color: null,
        fontSize: 12,
        fontWeight: "normal"
      },
      itemStyle: {
        color: null,
        borderColor: "white",
        borderWidth: 1,
        borderType: "solid"
      },
      levels: [
        {}]
    }
  },
  themeRiver: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#555",
          width: 1,
          type: "solid"
        }
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      sublink: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    legend: {
      // data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'],
      show: true,
      type: "scroll",
      data: [],
      textStyle: {
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      itemGap: 10,
      left: 150,
      top: 20
    },
    dataZoom: [
      {
        type: "inside",
        singleAxisIndex: [0],
        filterMode: "none",
        start: 0,
        end: 100
      }
    ],
    singleAxis: {
      left: 30,
      right: 30,
      bottom: 30,
      top: 80,
      containLabel: true,
      type: "time",

      axisLabel: {
        show: true,
        textStyle: {
          color: "#2f4554",
          fontSize: "12",
          fontWeight: "normal"
        },
        rotate: 0,
        margin: 10,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "rgba(197, 152, 152, 0.31)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
        symbol: ["none", "arrow"]
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        type: "themeRiver",
        itemStyle: {
          borderColor: "",
          borderWidth: 1,
          opacity: 0.8,
          emphasis: {
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.8)"
          }
        },
        data: []
      }],

    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: function (idx) {
      return idx * 100;
    }
  },
  treemap: {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 1,
      padding: [5, 5, 5, 5],
      hideDelay: 100,
      textStyle: {
        fontFamily: "sans-serif",
        color: "#3BAEFE",
        fontSize: 14,
        fontWeight: "normal"
      },
      formatter: function (info) {
        var value = info.value;
        var treePathInfo = info.treePathInfo;
        var treePath = [];

        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        return [
          "<div class=\"tooltip-title\">" + formatUtil.encodeHTML(treePath.join("/")) + "</div>",
          formatUtil.addCommas(value),
        ].join("");
      }
    },
    textStyle: {
      fontFamily: "Arial"
    },

    // 工具栏选项设置
    toolbox: {
      show: true,
      feature: {
        dataView: {readOnly: false},
        restore: {},
        saveAsImage: {}
      }
    },
    title: {
      show: true,
      text: "",
      link: "",
      target: "blank",
      subtext: "",
      subtarget: "",
      textAlign: "auto",
      itemGap: 10,
      left: "30",
      top: "30",
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      },
      subtextStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    series: [{
      name: "",
      type: "treemap",
      leafDepth: null,
      left: 80,
      top: 80,
      width: 500,
      height: 500,
      roam: "move",
      upperLabel: {
        show: true
      },
      itemStyle: {
        borderWidth: 1,
        borderColor: "#333",
        GapWidth: 1
      },
      data: []
    }],
    animationDuration: 1000,
    animationEasing: "linear",
    animationDurationUpdate: 300
  },
  chinaMap:{
    title: {
      show: true,
      text: "",
      top: '30',
      left: 'center',
      textAlign: "auto",
      textVerticalAlign: "auto",
      itemGap: 10,
      textStyle: {
        fontWeight: "normal",
        color: "#333",
        fontSize: 18,
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        if (params.data !== undefined) {
          if(typeof params.data.value === 'number'){
            return params.data.fromName + '->' + params.data.toName + ':' + params.data.value;
          }else{
            return params.data.name + ' : ' + params.data.value[2];
          }
        }
      }
    },
    roam: true,
    visualMap: {
      min: 0,
      max: 200,
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true,
      realtime: false,
      show: true,
      color: ["#0348dd", "#93c2ff"]
    },
    geo: {
      show: true,
      map: 'LL',
      label: {
        normal:{
          show: false
        },
        emphasis: {
          show: true
        }
      },
      roam: true,
      itemStyle: {
        normal: {
          areaColor: '#ecedf4',
          borderColor: '#0692a4',
          textStyle: {
            fontWeight: "normal",
            color: "#333",
            fontSize: 18,
          }
        },
        emphasis: {
          areaColor: '#a8d5ff',
          textStyle: {
            fontWeight: "normal",
            color: "#333",
            fontSize: 18,
          }
        }
      }
    },
    series: [
      {
        name: 'type0',
        type: 'map',
        mapType: 'LL',
        geoIndex: 0,
        // aspectScale: 0.75, //长宽比
        // showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#ecedf4',
            borderColor: '#0692a4',
          },
          emphasis: {
            areaColor: '#a8d5ff'
          }
        },
        data: []
      },
      {
        name: 'type1',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: function (val) {
          let min = options.chinaMap.visualMap.min;
          let max = options.chinaMap.visualMap.max;
          let finVal = (val[2]-min)/(max-min)*50+20;
          // console.log(finVal);
          return finVal;
        },
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
            formatter:function(params)
            {
              return params.value[2];
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#141414', //标志颜色
          }
        },
        data: [],
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true
      },
      {
        name: 'type2',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'circle', //气泡
        symbolSize: 15,
        label: {
          normal: {
            show: true,
            position: 'right',
            textStyle: {
              color: '#000',
              fontSize: 10,
            },
            formatter:function(params){return params.value[2];}
          }
        },
        itemStyle:{
          color: '#000'
        },
        zlevel: 6,
        data: []
      },
      {
        name: 'type3',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          color: '#7097ff',
          symbolSize: 5, //图标大小
        },
        lineStyle: {
          normal: {
            width: 1, //尾迹线条宽度
            opacity: 1, //尾迹线条透明度
            curveness: .3, //尾迹线条曲直度
            color: '#7097ff'
          }
        },
        data: []
      },
      {
        name: 'type4',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          brushType: 'stroke'
        },
        color: '#ff7c49',
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: 10,
        data: []
      }
    ]
  }
};

export {options};

