<template>
  <div>
    <div class="result">
      <el-row :gutter="12">
        <el-col :span="24" class="d2-mt" v-for="(item) in installList" :key="item.stepName">
          <el-card v-if="item.stepName!=='step_install_component'" shadow="hover">
            <el-row :gutter="12">
              <el-col :span="23" class="d2-f-16">{{phaseMap[item.stepName]}}</el-col>
              <el-col :span="1">
                <i
                  v-if="item.status==='status_finished'"
                  class="el-icon-circle-check success d2-f-20"
                ></i>
                <i
                  v-else-if="item.status==='status_failed'"
                  class="el-icon-circle-close error d2-f-20"
                ></i>
                <i v-else class="el-icon-refresh d2-animation success d2-f-20"></i>
              </el-col>
              <el-col :span="24" class="description">{{item.message}}</el-col>
              <el-progress :percentage="item.progress"></el-progress>
            </el-row>
          </el-card>

          <el-card v-else class="box-card">
            <div slot="header" class="clearfix">
              <el-row :gutter="12">
                <el-col :span="23" class="d2-f-16">{{phaseMap[item.stepName]}}</el-col>
                <el-col :span="1">
                  <i
                    v-if="item.status==='status_finished'"
                    class="el-icon-circle-check success d2-f-20"
                  ></i>
                  <i
                    v-else-if="item.status==='status_failed'"
                    class="el-icon-circle-close error d2-f-20"
                  ></i>
                  <i v-else class="el-icon-refresh d2-animation success d2-f-20"></i>
                </el-col>
                <el-col :span="24" class="description">{{item.message}}</el-col>
                <el-progress :percentage="item.progress"></el-progress>
              </el-row>
            </div>
            <div class="text item">
              <el-row :gutter="12" class="d2-mb">
                <el-col :span="14" class="d2-f-16">组件名称</el-col>
                <el-col :span="5" class="d2-f-16 d2-text-cen">组件副本数</el-col>
                <el-col :span="5" class="d2-f-16 d2-text-cen">已就绪副本数</el-col>
              </el-row>

              <el-row :gutter="12" v-for="item in componentList" :key="item.name">
                <el-col :span="14" class="d2-f-14">{{item.name}}</el-col>
                <el-col :span="5" class="d2-f-14 d2-text-cen">{{item.replicas}}</el-col>
                <el-col :span="5" class="d2-f-14 d2-text-cen">{{item.readyReplicas}}</el-col>

                <el-col :span="24" v-for="items in item.podStatus" :key="items.name">
                  <el-col :span="14" class="d2-f-14 descColor">{{items.name}}</el-col>
                  <el-col
                    :span="5"
                    class="d2-f-14 d2-text-cen"
                    :style="{
                      color:componentColor[items.phase]
                      }"
                  >{{items.phase}}</el-col>
                  <el-col :span="5" class="d2-f-14 descColor d2-text-cen">{{items.reason}}</el-col>
                </el-col>

                <!-- <el-col :span="24" class="description">{{item.message}}</el-col> -->
                <!-- <el-progress :percentage="item.progress"></el-progress> -->
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "installResults",
  data() {
    return {
      installList: [],
      loading: true,
      phaseMap: {
        step_setting: "配置环境",
        step_download: "下载安装包",
        step_prepare_storage: "准备存储",
        step_prepare_image_hub: "准备镜像仓库",
        step_unpacke: "解压安装包",
        step_load_image: "加载镜像",
        step_push_image: "上传镜像",
        step_install_component: "安装基础服务"
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
          if (res.data && res.data.length > 0) {
            let resuitsList = res.data.filter(
              item =>
                item.status != "status_waiting" &&
                item.status != "status_processing"
            );
            if (resuitsList.length > 0) {
              this.timer = setTimeout(() => {
                this.fetchClusterInstallResults();
              }, 8000);
            }else{
              this.$emit("onResults");
            }
          }
        }
      });
    },
    fetchClusterInstallResultsState() {
      this.$store.dispatch("fetchClusterInstallResultsState").then(res => {
        if (res && res.code === 200) {
          this.componentList = res.data;
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
.d2-text-cen {
  text-align: center;
}
.descColor {
  color: rgba(0, 0, 0, 0.45);
}
.d2-f-14 {
  font-size: 14px;
}
.result {
  width: 767px;
  .d2-animation {
    animation: rotating 1s linear infinite;
  }
  .success {
    color: #52c41a;
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
    margin-bottom: 24px;
  }

  .extra {
    background: #fafafa;
    padding: 24px 40px;
    border-radius: rgba(0, 0, 0, 0.45);
    text-align: left;
  }
}
</style>
