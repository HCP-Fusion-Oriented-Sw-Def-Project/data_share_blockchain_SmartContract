<template>
  <div id="mapID" :style="{height:height,width:width}">
    <!-- <baidu-map class="map"
        :center="{lng:116.404,lat:39.945}"
        :zoom='13'
        :scroll-wheel-zoom='true'
    >-->
    <!-- <el-button @click="drawBoundary()" /> -->
    <baidu-map class="map" id="map">
      <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale> -->
      <!-- <bm-marker :position="{lng:116.404,lat:39.915}" :dragging="true" animation='BMAP_ANIMATION_BOUNCE'>
        <bm-label content='北京市' :labelStyle="{color:'red',fontSize:'12px'}" :offset="{width:-35,height:30}" />  
      </bm-marker>-->
    </baidu-map>
  </div>
</template>

<script >
import { getSingleInfo, getSingleList } from "@/api/visualization";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    point_info: {
      type: Array,
      default: []
    },
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "800px"
    },
    parentHeight: {
      type: Number,
      default: 0
    },
    parentWidth: {
      type: Number,
      default: 0
    },
    dim: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
      default: []
    },
    lon: {
      type: Number,
      default: 116.404
    },
    lat: {
      type: Number,
      default: 39.915
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "treemap"
    },
    title: {
      type: String,
      default: ""
    },
    columnList: {
      type: Object,
      default: null
    },
    toolbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var temp = [];
    temp.push(this.point_info[0]);
    temp.push(this.point_info[1]);
    return {
      streetName: this.name + "街道", // 街道名字
      map: null, // 地图实例变量
      targetPointList: [], // 建筑信息
      boundaryData: null, // 边界线数据
      singleTargetPoint: temp, // 某次查看部件出问题所在地点名和街道地址
      isDrawStreet: this.point_info[2] ? false:true, // 判断是否绘制街区划分
      pointToChild: [] // 通过名字查询， 第一位是 0/1 判断查询是否成功；第二位是二维数组，表示坐标信息；第三位是展示的内容信息
    };
  },
  mounted() {
    const self = this;
    self.map = new BMap.Map("map"); // 创建地图实例
    var map = self.map;
    self.map.centerAndZoom(new BMap.Point(116.229612,39.911353), 18);
    map.enableScrollWheelZoom(true);
    if (self.isDrawStreet) {
        var point = new BMap.Point(self.lon, self.lat);  // 创建点坐标
        self.map.panTo(point);
        self.getPointlist("9f96549fa0174d59ad46b77838561ed3");
        self.getBoundaryData(); // 获取边界线坐标数据并划分行政区域
        // console.log(this.targetPointList);
        // this.showPoint();
    } else {
        // console.log(self.singleTargetPoint)
        self.getPointLocationByname(self.singleTargetPoint);
    }
  },
  methods: {
    getPointlist(id) {
      // 从数据库获取中获取数据并调用showPoint函数展示得到的数据
      const self = this;
      getSingleInfo("9f96549fa0174d59ad46b77838561ed3").then(response => {
        const data = response.data;
        self.targetPointList.push(JSON.parse(data.data.visChartInfo.xAxis));
        self.showPoint(JSON.parse(data.data.visChartInfo.xAxis));
      });
    },
    showPoint(targetPointList) {
      // 在地图中标注targetPointList中的点
      // console.log('绘制');
      const self = this;
      var map = self.map;
      const targetPoint = targetPointList;
      for (var i = 1; i < targetPoint[3].list.length; i++) {
        if (targetPoint[4].list[i].includes(this.streetName)) {
          var temp = targetPoint[3].list[i].split(","),
            pointToChild = []; // 点坐标处理
          pointToChild.push(parseFloat(temp[0]));
          pointToChild.push(parseFloat(temp[1]));

          const name = "<p>" + targetPoint[0].list[i] + "</p>"; // 点内容处理
          const businessScope = "<p>" + targetPoint[1].list[i] + "</p>";
          const originAddress = "<p>" + targetPoint[2].list[i] + "</p>";
          const searchTownship = "<p>" + targetPoint[4].list[i] + "</p>";
          const regCapital = "<p>" + targetPoint[5].list[i] + "</p>";
          const contents =
            name + businessScope + originAddress + searchTownship + regCapital; // 信息窗中的内容，可以支持css样式

          self.drawPoint(pointToChild, contents);
        }
      }
      // console.log('绘制完毕');
    },
    drawPoint(point, content) {
      // 绘制单个点
      const self = this;
      var tempPoint = new BMap.Point(point[0], point[1]); // 生成一个点实例
      var tempmarkers = new BMap.Marker(tempPoint); // 生成一个标记实例
      self.map.addOverlay(tempmarkers);

      self.addInfoWindow(tempmarkers, content);
      // console.log('绘制点成功')
    },
    addInfoWindow(marker, content) {
        const self = this;
        // 闭包添加信息窗口，防止因JavaScript的闭包问题导致的信息窗中内容的覆盖
        var tempInfoWindow = new BMap.InfoWindow(content, {
            height: 100,
            width: 200,
            enableCloseOnClick: false,
            enableMessage: false,
            enableAutoPan: false
        });
        tempInfoWindow.setHeight(0);
        tempInfoWindow.setWidth(0);
        marker.addEventListener("mouseover", function() {
            this.openInfoWindow(tempInfoWindow);
        });
        marker.addEventListener("mouseout", function() {
            this.closeInfoWindow();
        });
        marker.addEventListener("click",function() {
            this.closeInfoWindow();
            self.$emit('updateKnowledgeGraphVisible', true);
        });
    },
    drawBoundary() {
      const self = this;
      var bdary = new BMap.Boundary();
      bdary.get("北京市石景山区", function(rs) {
        // self.map.clearOverlays();
        var pointArray = [],
          newRs = [];
        for (var j = 1; j < self.boundaryData.length; j++) {
          const tempBoundaryData = self.boundaryData[j];
          if (
            tempBoundaryData.properties.name != null &&
            tempBoundaryData.properties.name === self.streetName
          ) {
            // 判断是否是当前街区
            // console.log(tempBoundaryData.geometry.coordinates[0])
            for (var i in tempBoundaryData.geometry.coordinates[0]) {
              newRs.push(tempBoundaryData.geometry.coordinates[0][i]);
            }
          }
        }

        const rsBoundaries = self.arrayToString(newRs);
        var strs = new Array();
        strs = rsBoundaries;
        // 给目标行政区划添加边框，其实就是给目标行政区划添加一个没有填充物的遮罩层

        var ENWS = "";
        for (var i = 0; i < strs.length; i++) {
          ENWS += strs[i] ;
        }
        var E_JW = "170.672126, 39.623555;"; //东
        var EN_JW = "170.672126, 81.291804;"; //东北角
        var N_JW = "105.913641, 81.291804;"; //北
        var NW_JW = "-169.604276,  81.291804;"; //西北角
        var W_JW = "-169.604276, 38.244136;"; //西
        var WS_JW = "-169.604276, -68.045308;"; //西南角
        var S_JW = "114.15563, -68.045308;"; //南
        var SE_JW = "170.672126, -68.045308 ;"; //东南角
        //3.添加环形遮罩层
        var ply1 = new BMap.Polygon(ENWS +E_JW +SE_JW + S_JW +WS_JW +W_JW +NW_JW +N_JW +EN_JW + E_JW, {
            strokeColor: "none",
            strokeOpacity: 0,
            fillColor: "#fff",
            fillOpacity: "0.6"
          }
        ); //建立多边形覆盖物
        self.map.addOverlay(ply1); //遮罩物是半透明的，如果需要纯色可以多添加几层
        // //4. 添加环形遮罩
       
        var ply = new BMap.Polygon(rsBoundaries, {
          strokeWeight: 3,
          strokeColor: "#114bf3",
          fillColor: ""
        });
        self.map.addOverlay(ply); // 添加覆盖物

        pointArray = pointArray.concat(ply.getPath());
        self.map.setViewport(pointArray); // 调整视野
      });
    },
    getBoundaryData() {
      // 从geojosn文件中获取街区边界线数据
      const self = this;
      $.get("http://localhost:9528/static/sjs.geojson", function(geoJson) {
        self.boundaryData = geoJson.features;
        for (var j = 1; j < self.boundaryData.length; j++) {
          var tempBoundaryData = self.boundaryData[j];
          tempBoundaryData.properties.name += "街道";
        }
        self.drawBoundary(); // 获取数据后将边界划出
      });
    },
    arrayToString(data) {
      // 将数组型边界数据拼接成字符串
      var str = "";
      for (var i of data) {
        str += i[0].toString() + ", " + i[1].toString() + ";";
      }
      return str;
    },
    getPointLocationByname(singleTargetPoint) {
      const self = this;

      self.map.clearOverlays();
      var pointToChild = [];
      pointToChild.push(0);
      var local = new BMap.LocalSearch(self.map, {
        readerOptions: { map: self.map },
        onSearchComplete: function(results) {
            // for (var i = 0; i < results.getCurrentNumPois(); i++) { // 判断结果对不对
            //     console.log(results.getPoi(i));
            //     console.log(results.getPoi(i).address.includes(singleTargetPoint[1]));
            //     if (results.getPoi(i).address.includes(singleTargetPoint[1])) {
            //             pointpointToChild[0] = 1;
            //             pointToChild.push(results.getPoi(i).point);
            //     }
            // }
            pointToChild[0] = 1;
            pointToChild.push([results.getPoi(0).point.lng,results.getPoi(0).point.lat]);
            pointToChild.push(singleTargetPoint[0]);
            
            if (pointToChild[0] == 1) {
                var point = new BMap.Point(pointToChild[1][0],pointToChild[1][1]);  // 创建点坐标
                self.map.panTo(point);
                self.drawPoint(pointToChild[1], pointToChild[2]);
            } else {
                alert("未找到该地点!");
            }
        }
      });

      local.search(singleTargetPoint[0]);
    }
  }
};
</script>

<style scoped>
.map {
  height: 90%;
  width: 100%;
}
</style>