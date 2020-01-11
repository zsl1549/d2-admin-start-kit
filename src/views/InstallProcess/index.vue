<template>
  <d2-container type="full">
    <div class="d2-ml-115">
      <el-collapse class="clbr" v-model="activeName" accordion>
        <el-collapse-item name="cluster" class="installationStepTitle" title="集群安装配置">
          <cluster-configuration @onResults="handlePerform('startrRsults')" class="d2-mt"></cluster-configuration>
        </el-collapse-item>
        <el-collapse-item
          v-if="resultShow"
          class="installationStepTitle"
          title="安装"
          name="startrRsults"
        >
          <install-results></install-results>
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
      resultShow: false
    };
  },
  created() {
    document.documentElement.scrollTop = 0;
  },
  methods: {
    handlePerform(name) {
      this.activeName = name;
      this.resultShow = true;
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
