<template>
  <el-container style="width: 100%; height: 100%">
    <li style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer" class="el-icon-xy-return"
        @click="leftsideHide" v-show="leftsideLeft"></li>
    <!-- <el-col style="margin-top:50px;height: 700px;width:0;border: 0.5px solid gray;"></el-col> -->
    <li style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer" class="el-icon-xy-enter"
        @click="leftsideShow" v-show="leftsideRight"></li>

    <div :class="centerClass">
      <BarChart style="height: 100%; width: 100%" ref="bar" :dim="xAxis" :value="yAxis" :valueY="zAxis" :columnList="columnList" :toolbox="true"
                 :option="option"/>
    </div>
    <li style="margin-top:400px;font-size: 30px;cursor: pointer" class="el-icon-xy-return" @click="rightsideShow"
        v-show="rightsideLeft"></li>
    <!-- <el-col style="margin-top:50px;height: 700px;width:0;border: 0.5px solid gray;"></el-col> -->
    <li style="margin-left:0px;margin-top:400px;font-size: 30px;cursor: pointer" class="el-icon-xy-enter"
        @click="rightsideHide" v-show="rightsideRight"></li>

    <div class="rightBar" style="width: 350px;height: 850px;background-color: #FFF;box-shadow: 0 0 2px #AAA;" v-show="rightside">
      <div style="margin-left: 30px;margin-right: 30px">
        <BarSetting  v-bind:option="option" @change="updateOption"></BarSetting>
      </div>
    </div>
  </el-container>

</template>

<script>
    import BarChart from "./BarChart";
    import BarSetting from "./BarSetting";
    import LineSetting from "./LineSetting";
    import ScatterSetting from "./ScatterSetting";
    import RadarSetting from "./RadarSetting";
    import PieSetting from "./PieSetting";
    import ChartSettingGenerator from "./ChartSettingGenerator";
    import FunnelSetting from "./FunnelSetting";
    import GaugeSetting from "./GaugeSetting";
    import BoxplotSetting from "./BoxplotSetting";
    import SunburstSetting from "./SunburstSetting";
    import SankeySetting from "./SankeySetting";
    import ParallelSetting from "./ParallelSetting";
    import NandingSetting from "./NandingSetting";
    export default {
        name: "BarView",
        components: {
            NandingSetting,
            ParallelSetting,
            SankeySetting,
            SunburstSetting,
            BoxplotSetting,
            GaugeSetting,
            FunnelSetting,
            ChartSettingGenerator, PieSetting, RadarSetting, ScatterSetting, LineSetting, BarSetting, BarChart},
        data() {
            return {
                //侧边栏
                rightside: true,
                leftsideLeft: true,
                leftsideRight: false,
                rightsideLeft: false,
                rightsideRight: true,
                sideHide: false,
                sideShow: false,

                centerClass: 'centerMain',
                option: {}
            }
        },
        methods: {
            updateOption: function (noption) {
                this.option = noption;
            },
            //侧边栏收起展开
            leftsideHide() {
                this.leftsideLeft = false;
                this.leftsideRight = true;
                this.$emit('leftsideHide');
                this.$refs.bar.resize();

            },
            leftsideShow() {
                this.leftsideLeft = true;
                this.leftsideRight = false;
                this.$emit('leftsideShow');
                this.$refs.bar.resize();
            },
            rightsideHide() {
                this.centerClass = 'centerMainRight';
                this.rightside = false;
                this.rightsideLeft = true;
                this.rightsideRight = false;
                this.$refs.bar.resize();
            },
            rightsideShow() {
                this.centerClass = 'centerMain';
                this.rightside = true;
                this.rightsideLeft = false;
                this.rightsideRight = true;
                this.$refs.bar.resize();
            },
        }
    }
</script>

<style scoped>


  .rightBar {
    position: absolute;
    overflow-y: scroll;
    /*face-color：#AAA;*/
    top: 100px;
    right: 30px;
    /*box-shadow: 0 0 2px #AAA;*/
  }

  .centerMain {
    width: calc(100% - 450px);
    margin-top: 30px;
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: auto;
    height: 100%
  }

  .centerMainRight {

    margin-top: 30px;
    width: 100%;
    height: 100%;
    background-color: #F2F6FC;
    border-radius: 20px 20px 20px 20px;
    overflow: auto
  }



</style>
