<template>
  <div class="dashboard-container">
    <!-- div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <div class="dashboard-img" style=" ">
      <img :src="img_dashboard" width="700px" />
    </div>
    <!-- <div>
      <h2 style="text-align:center" >政务大数据算法平台</h2>
      <br/>
      <h4 style="font-family:times;">政务大数据算法平台是面向政府治理的数据共享融合平台。主要研制基于中间件与云服务的政务系统数据共享融合平台；支撑北京地区政府部门示范应用，形成以大数据为核心的政府治理服务体系。该平台目前包含的模块有组织管理模块、算法管理模块、任务中心模块、数据处理模块和可视化分析五大模块。用户可以在任务中心模块中添加任务，通过数据源和算法的选择，生成任务。用户可以查看任务的结果并对其进行可视化的操作。</h4>
      <br/>
      <h4 style="font-family:times;">可视化是决策分析的工具与结果，一张图胜过千言万语，面向政府治理的数据共享融合平台共提供20类以上可视化方法，例如折线图、条形图、饼图、热点图等。也可以将各个展示方式集中在一起，并实现模块化和定制化，同时开放相应的调用接口。</h4>
      <br/>
      <h4 style="font-family:times;">平台提供的服务可以为政府部门提供决策支持和可视化分析功能。平台针对的用户主要分为两大类，对计算机知识相对专业和熟练的政府人员和非专业人员。针对不同的角色，平台将开放不同的服务。</h4>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import img_dashboard from '@/assets/dashboard/dashboard.png' // 政务大数据算法平台
// import img_dashboard from '@/assets/dashboard2.png'//政务智能平台

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  data() {
    return {
      img_dashboard
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-img {
    width: 700px;
    margin: 0 auto;
  }
  &-img img {
    transform: scale(1);
  }
}
</style>
