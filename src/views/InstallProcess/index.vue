<template>
  <d2-container type="full">
    <div class="d2-ml-115 d2-w-1100">
      <el-collapse class="clbr" v-model="activeName" accordion>
        <el-collapse-item name="cluster" class="installationStepTitle" title="集群安装配置">
          <cluster-configuration @onResults="handlePerform('startrRsults')" class="d2-mt"></cluster-configuration>
        </el-collapse-item>
        <el-collapse-item
          v-if="resultShow"
          class="installationStepTitle"
          title="安装"
          name="startrRsults"
          @onResults="handlePerform('rsultSucess')"
        >
          <install-results></install-results>
        </el-collapse-item>
        <el-collapse-item
          v-if="rsultSucessShow"
          name="rsultSucess"
          class="installationStepTitle"
          title="结果"
        >
          <div class="installSuccess dr-mt">
            <span class="el-icon-circle-check"></span>恭喜你，安装成功
          </div>
          <router-link to tag="p" class="successLink">wwww.hyf521.com</router-link>
        </el-collapse-item>
      </el-collapse>
    </div>
  </d2-container>
</template>

<script>
import ClusterConfiguration from "./components/clusterConfiguration";
import PackageTesting from "./components/packageTesting";
import InstallResults from "./components/installResults";

export default {
  name: "InstallProcess",
  components: {
    ClusterConfiguration,
    PackageTesting,
    InstallResults
  },
  data() {
    return {
      activeName: "cluster",
      resultShow: false,
      rsultSucessShow: false
    };
  },
  created() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    handlePerform(name) {
      this.activeName = name;
      this.resultShow = true;
      if (name && name === "rsultSucess") {
        this.rsultSucessShow = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.clbr {
  border: none;
}
.d2-ml-115 {
  margin-left: 115px;
}
.el-icon-circle-check {
  color: #67c23a;
  font-size: 50px;
  margin-right: 20px;
}
.d2-w-1100 {
  width: 1100px;
  margin: 0 auto;
}
.successLink {
  width: 767px;
  text-align: center;
  font-size: 28px;
  margin: 0;
  padding: 0;
}
.installSuccess {
  font-size: 40px;
  width: 767px;
  margin-top: 20px;
  text-align: center;
  color: #67c23a;
}
</style>
<style lang="scss" >
.installationStepTitle {
  .el-collapse-item__wrap {
    border: none;
  }
  .el-collapse-item__header {
    font-family: PingFangSC;
    font-size: 21px;
    color: #606266;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #409eff;
    width: 767px;
  }
}
</style>
