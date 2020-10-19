<template>
    <div>
      <el-collapse v-model="activeCol" accordion>
        <el-collapse-item title="字段匹配设置" name="1">
          <el-row>
            <label>省：</label>
            <el-select v-model="province" size="mini">
              <el-option
                v-for="item in provinceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <el-button class="refresh" size="mini" icon="el-icon-refresh" @click="province='请选择'"></el-button>
          </el-row>
          <el-row>
            <label>市：</label>
            <el-select v-model="city" size="mini">
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <label>区县：</label>
            <el-select v-model="district" size="mini">
              <el-option
                v-for="item in districtOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
        </el-collapse-item>

        <el-collapse-item v-if="geoProperties.type !== 3" title="图表样式" name="2">
          <el-row>
            <el-button @click="changeType(0)">颜色</el-button>
            <el-button @click="changeType(1)">气泡</el-button>
            <el-button @click="changeType(2)">标签</el-button>
          </el-row>
          <el-row>
            <el-form>
              <el-form-item label="显示地名" size="mini">
                <el-switch v-model="myOption.geo.label.normal.show"  @change="setMyOption"> </el-switch>
              </el-form-item>
              <el-form-item v-if="geoProperties.type === 1" label="标签符号" size="mini">
                <el-radio v-model="myOption.series[1].symbol" label="circle">圆形</el-radio>
                <el-radio v-model="myOption.series[1].symbol" label="pin">大头针</el-radio>
                <el-radio v-model="myOption.series[1].symbol" label="diamond">菱形</el-radio>
              </el-form-item>
              <el-form-item v-if="geoProperties.type === 2" label="标签符号" size="mini">
                <el-radio v-model="myOption.series[2].symbol" label="circle">圆形</el-radio>
                <el-radio v-model="myOption.series[2].symbol" label="pin">大头针</el-radio>
                <el-radio v-model="myOption.series[2].symbol" label="roundRect">矩形</el-radio>
                <el-radio v-model="myOption.series[2].symbol" label="triangle">三角形</el-radio>
                <el-radio v-model="myOption.series[2].symbol" label="diamond">菱形</el-radio>
              </el-form-item>
            </el-form>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
	export default {
		name: "ChinaMapSetting",
    props:{
      option: {
        type: Object,
        default: {}
      },
      geoProperties: {
        type:Object,
        default:{
          adcode: 100000,
          acroutes:[],
          childrenNum: 34,
          type: 0
        },
      }
    },
    data(){
		  return {
        provinceOptions: [{
          value: "请选择",
          label: "请选择"
        }],
        cityOptions: [{
          value: "请选择",
          label: "请选择"
        }],
        districtOptions: [{
          value: "请选择",
          label: "请选择"
        }],
        province: '请选择',
        city:'请选择',
        district:'请选择',
        specialCode:[110000, 120000, 310000, 500000, 810000, 820000],
        specialCity:["北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"],
        activeCol: "1",
        myOption: {
        },
      }
    },
    created(){
      this.myOption = this.option;
      this.provinceOptions = this.initOptions('../static/map/100000.geojson');
      this.initSelect();
    },
    watch:{
      province(val){
        // console.log("province change");
        if(val !== '请选择'){
          // console.log("val !== '请选择'");
          let index = this.specialCode.indexOf(this.province);
          if(index >= 0){ //如若是直辖市
            this.cityOptions = [{
              value: "请选择",
              label: "请选择"
            },{
              value: this.specialCode[index],
              label: this.specialCity[index]
            }];
          }else{  //不是直辖市
            this.cityOptions = this.initOptions('../static/map/100000/'+val+'.geojson');
          }
          // console.log(this.cityOptions);
          this.$emit("changeGeo", {
            adcode: this.province,
            acroutes:[100000],
            childrenNum: this.cityOptions.length,
            type: this.geoProperties.type
          });
        }else{
          // console.log("val === '请选择'");
          this.cityOptions = [{
            value: "请选择",
            label: "请选择"
          }];
          this.$emit("changeGeo", {
            adcode: 100000,
            acroutes:[],
            childrenNum: this.provinceOptions.length,
            type: this.geoProperties.type
          });
        }
        this.city = "请选择";
      },
      city(val){
        // console.log("city change");
        let acroutes = [100000];
        if(val !== '请选择'){
          // console.log("val !== '请选择'");
          this.districtOptions = this.initOptions('../static/map/100000/'+this.province+'/'+val+'.geojson');
          acroutes.push(this.province);
          this.$emit("changeGeo", {
            adcode: this.city,
            acroutes: acroutes,
            childrenNum: this.districtOptions.length,
            type: this.geoProperties.type
          });
        }else{
          // console.log("val === '请选择'");
          this.districtOptions = [{
            value: "请选择",
            label: "请选择"
          }];
          if(this.province !== '请选择'){
            this.$emit("changeGeo", {
              adcode: this.province,
              acroutes: acroutes,
              childrenNum: this.cityOptions.length,
              type: this.geoProperties.type
            });
          }
        }
        this.district = "请选择";
      },
      district(val){
        // console.log("district change");
        let acroutes = [100000];
        acroutes.push(this.province);
        if(val !== '请选择'){
          // console.log("val !== '请选择'");
          acroutes.push(this.city);
          this.$emit("changeGeo", {
            adcode: this.district,
            acroutes: acroutes,
            childrenNum: 0,
            type: this.geoProperties.type
          });
        }else if(val === '请选择' && this.city !== '请选择'){
          // console.log("val === '请选择'");
          this.$emit("changeGeo", {
            adcode: this.city,
            acroutes: acroutes,
            childrenNum: this.districtOptions.length,
            type: this.geoProperties.type
          });
        }
      },
      geoProperties(val){
        // console.log("geoProperties change");
        this.initSelect();
      },
      option: {
        handler(nval) {
          this.myOption = nval;
        },
        deep: true
      }
    },
    methods:{
      setMyOption: function () {
        this.$emit('change', this.myOption);
      },
		  initOptions(index){
		    // console.log("initOptions");
        // console.log(index);
        let options = [{
          value: "请选择",
          label: "请选择"
        }];
        $.get(index, function(geoJson){
          // console.log("in");
          for(let geo of geoJson.features){
            options.push({
              value: geo.properties.adcode,
              label: geo.properties.name
            });
          }
        });
        return options;
      },
      initSelect(){
		    // console.log("initSelect");
		    // console.log(this.geoProperties);
        switch(this.geoProperties.acroutes.length){
        case 0:
          this.province = '请选择';
          break;
        case 1:
          this.province = this.geoProperties.adcode;
          if(this.specialCode.indexOf(this.province) >= 0){
            this.city = this.province;
          }
          break;
        case 2:
          if(this.specialCode.indexOf(this.province)<0){
            this.province = this.geoProperties.acroutes[1];
            this.city = this.geoProperties.adcode;
          }else{
            if(this.geoProperties.adcode !== this.province){
              this.district = this.geoProperties.adcode;
            }
          }
          break;
        case 3:
          this.province = this.geoProperties.acroutes[1];
          this.city = this.geoProperties.acroutes[2];
          this.district = this.geoProperties.adcode;
          break;
        }
      },
      changeType(type){
        this.geoProperties.type = type;
        this.$emit("changeGeo", this.geoProperties);
      }
    }
	};
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
  .el-row {
    margin-bottom: 20px;
    float: left;
    width: 100%;
  }
  。label {
    color: #606266;
    font-size:14px;
  }
  .item {
    margin: 4px;
  }
  .refresh {
    float: right;
    border: none;
  }
  .el-form{
    .el-radio{
      margin-left: 10%;
      width: 100%;
    }
    .el-switch{
      float: right;
    }
  }

</style>
