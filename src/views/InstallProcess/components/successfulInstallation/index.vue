<template>
  <d2-container type="full">
    <div class="d2-ml-115 d2-w-1100">
      <el-collapse class="clbr" v-model="activeName" accordion>
        <el-collapse-item
          name="rsultSucess"
          class="installationStepTitle"
          title="访问地址"
        >
          <div class="installSuccess dr-mt">
            <span class="el-icon-circle-check"></span>恭喜你，安装成功
          </div>
          <router-link to tag="p" class="successLink d2-mt">wwww.hyf521.com</router-link>
        </el-collapse-item>
      </el-collapse>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: "successfulInstallation",
  data() {
    return {
      activeName: "rsultSucess",
    };
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
  font-size: 22px;
  margin-right: 20px;
}
.d2-w-1100 {
  width: 1100px;
  margin: 0 auto;
}
.successLink {
  text-align: center;
  font-size: 18px;
  margin: 0;
  padding: 0;
  color: #409EFF;
}
.installSuccess {
  font-size: 22px;
  margin-top: 20px;
  line-height: 22px;
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
  }
}
</style>
