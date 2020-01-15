<template>
  <div>
    <div class="result" v-loading="loading">
      <el-row :gutter="12">
        <el-col :span="24" class="d2-mt" v-for="(item,index) in installList" :key="item.stepName">
          <el-card v-if="item.stepName!=='step_install_component'" shadow="hover">
            <install-component
              :item="item"
              :index="index"
              :dialogVisible="dialogVisible"
              @onhandleDialogVisible="dialogVisible=true"
            ></install-component>
          </el-card>

          <el-card v-else class="box-card">
            <div slot="header" class="clearfix">
              <install-component
                :item="item"
                :index="index"
                :dialogVisible="dialogVisible"
                @onhandleDialogVisible="dialogVisible=true"
              ></install-component>
            </div>
            <div class="text item" v-show="componentList">
              <el-row :gutter="12" class="d2-mb">
                <el-col :span="14" class="d2-f-16">组件名称</el-col>
                <el-col :span="5" class="d2-f-16 d2-text-cen">组件副本数</el-col>
                <el-col :span="4" class="d2-f-16 d2-text-cen">已就绪副本数</el-col>
              </el-row>

              <el-collapse accordion>
                <el-collapse-item
                  v-for="item in componentList"
                  :key="item.name"
                  class="componentTitle"
                >
                  <template slot="title">
                    <el-col :span="15" class="d2-f-14">{{item.name}}</el-col>
                    <el-col :span="4" class="d2-f-14 d2-text-cen">{{item.replicas}}</el-col>
                    <el-col :span="5" class="d2-f-14 d2-text-cen">{{item.readyReplicas}}</el-col>
                  </template>
                  <div class="d2-mt">
                    <div v-for="items in item.podStatus" :key="items.name">
                      <div class="componentBox">
                        <el-col :span="4" class="d2-f-14 minComponentColor">名称</el-col>
                        <el-col :span="20" class="d2-f-14 descColor">{{items.name}}</el-col>
                      </div>
                      <div class="componentBox">
                        <el-col :span="4" class="d2-f-14 minComponentColor">阶段</el-col>
                        <el-col
                          :span="20"
                          class="d2-f-14 descColor"
                          :style="{
                      color:componentColor[items.phase]
                      }"
                        >{{items.phase}}</el-col>
                      </div>

                      <div class="componentBox" v-show="items.reason">
                        <el-col :span="4" class="d2-f-14 minComponentColor">原因</el-col>
                        <el-col :span="20" class="d2-f-14 descColor">{{items.reason}}</el-col>
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <Uploads
      :nextLoading="nextLoading"
      :dialogVisible="dialogVisible"
      @onSubmitForm="dialogVisible=false"
    />
  </div>
</template>
<script>
import Uploads from "../upload";
import InstallComponent from "./installComponent";

export default {
  name: "installResults",
  components: {
    Uploads,
    InstallComponent
  },
  data() {
    return {
      nextLoading: false,
      dialogVisible: false,
      num: 0,
      installList: [],
      loading: true,
      phaseMap: {
        step_setting: "配置环境",
        step_download: "下载安装包",
        step_prepare_infrastructure: "准备基础设施",
        step_unpacke: "解压安装包",
        step_handle_image: "处理镜像",
        step_install_component: "安装Rainbond组件"
      },
      componentColor: {
        Pending: "rgba(0, 0, 0, 0.45)",
        Running: "#52c41a",
        Waiting: "rgba(0, 0, 0, 0.45)",
        Terminated: "#f5222d"
      },
      componentState: {
        Running: "成功",
        Waiting: "等待",
        Terminated: "停止"
      },
      componentList: []
    };
  },
  created() {
    this.fetchClusterInstallResults();
    this.fetchClusterInstallResultsState();
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    this.timers && clearInterval(this.timers);
  },
  methods: {
    format(percentage) {
      return "";
    },
    fetchClusterInstallResults() {
      this.$store.dispatch("fetchClusterInstallResults").then(res => {
        if (res) {
          this.loading = false;
          this.installList = res.data;
          let arrs = res.data;
          if (arrs && arrs.length > 0) {
            let resuitsList = arrs.filter(
              item =>
                item.status != "status_waiting" &&
                item.status != "status_processing"
            );

            let isSuccess = arrs.every(function(value, index, arrs) {
              if (value === "status_finished") {
                return true;
              }
            });

            isSuccess &&
              this.$router.push({
                name: "successfulInstallation"
              });

            if (resuitsList.length > 0) {
              this.timer = setTimeout(() => {
                this.fetchClusterInstallResults();
              }, 8000);
            }
          }
        }
      });
    },
    fetchClusterInstallResultsState() {
      this.$store.dispatch("fetchClusterInstallResultsState").then(res => {
        if (res && res.code === 200) {
          this.componentList = res.data;
          this.num += 1;
          this.timers = setTimeout(() => {
            this.fetchClusterInstallResultsState();
          }, 8000);
        } else if (this.num <= 3) {
          this.timers = setTimeout(() => {
            this.fetchClusterInstallResultsState();
          }, 8000);
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.d2-h-50 {
  height: 50px;
  line-height: 50px;
}
.componentBox {
  min-height: 39px;
  line-height: 39px;
}
.minComponentColor {
  color: #99a9bf !important;
}
.errorTitleColor {
  color: #303133 !important;
}
.d2-text-cen {
  text-align: center;
}
.descColor {
  color: #606266;
}
.d2-f-14 {
  font-size: 14px;
}
.result {
  width: 1000px;
  min-height: 300px;
  margin: 0 auto;
  .d2-animation {
    animation: rotating 1s linear infinite;
  }
  .success {
    color: #52c41a;
  }
  .loadings {
    color: #303133;
  }
  .error {
    color: #f5222d;
  }
  .d2-f-20 {
    font-size: 20px;
  }
  .d2-f-16 {
    font-size: 16px;
  }
  .icon {
    font-size: 72px;
    line-height: 72px;
    margin-bottom: 24px;
  }

  .title {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 16px;
  }

  .description {
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    margin: 5px 0;
  }

  .extra {
    background: #fafafa;
    padding: 24px 40px;
    border-radius: rgba(0, 0, 0, 0.45);
    text-align: left;
  }
}
</style>
<style lang="scss" >
.componentTitle {
  .el-collapse-item__header {
    border-bottom: 1px solid #ebeef5 !important;
    width: 100% !important;
  }
  .el-collapse-item__header:hover {
    background: #f5f7fa;
  }
}
</style>
