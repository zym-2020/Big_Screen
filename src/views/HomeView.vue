<template>
  <div class="main">
    <div class="container" ref="container"></div>
    <div class="head">
      <el-row>
        <el-col :span="9">
          <div class="nav">
            <div
              :class="active ? 'active nav-item' : 'nav-item'"
              @click="active = true"
            >
              水位监测
            </div>
            <div
              :class="active ? 'nav-item' : 'active nav-item'"
              @click="active = false"
            >
              设备监测
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="head-center">实时监测</div>
        </el-col>
        <el-col :span="9">
          <div class="head-time">{{ time }}</div>
        </el-col>
      </el-row>
    </div>
    <water-level-line-chart />
    <prediction-line-chart />
    <waterlevel-table />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import mapBoxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import WaterLevelLineChart from "@/components/WaterLevelLineChart.vue";
import PredictionLineChart from "@/components/PredictionLineChart.vue";
import WaterlevelTable from "@/components/WaterLevelTable.vue";
export default defineComponent({
  components: {
    WaterLevelLineChart,
    PredictionLineChart,
    WaterlevelTable,
  },
  setup() {
    const container = ref<HTMLElement>();
    const active = ref(true);
    const time = ref("");
    let timeout: string | number;
    let map: mapBoxGl.Map;
    const initMap = () => {
      map = new mapBoxGl.Map({
        container: container.value!,
        style: "mapbox://styles/johnnyt/cl39v9pcv009614qp3gnmcpos",
        center: [121.18, 31.723],
        zoom: 8.8,
        accessToken:
          "pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg",
      });
    };

    const getTimesInterval = () => {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let hours: number | string = new Date().getHours();
      let minutes: number | string = new Date().getMinutes();
      let seconds: number | string = new Date().getSeconds();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      time.value =
        year +
        "年" +
        month +
        "月" +
        day +
        "日--" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    };

    onMounted(() => {
      timeout = setInterval(getTimesInterval, 1000).toString();
      initMap();
    });

    onUnmounted(() => {
      if (timeout) clearInterval(timeout);
    });

    return { container, active, time };
  },
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  position: relative;
  .container {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .head {
    position: absolute;
    background-color: #030829;
    z-index: 99;
    height: 4vw;
    width: 100%;
    .el-row {
      height: 100%;
      .el-col {
        height: 100%;
      }
      .nav {
        color: white;
        font-size: 1vw;
        height: calc(100% - 30px);
        line-height: calc(4vw - 30px);
        display: flex;
        padding: 15px;
        .nav-item {
          width: 7vw;
          text-align: center;
          box-sizing: border-box;
          border-radius: 4px;
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            box-shadow: -10px 0px 15px #034c6a inset,
              0px -10px 15px #034c6a inset, 10px 0px 15px #034c6a inset,
              0px 10px 15px #034c6a inset;
          }
          transition: all 0.5s linear 0s;
        }
        .active {
          border-bottom: 4px solid #4b8df8;
          box-shadow: -10px 0px 15px #034c6a inset, 0px -10px 15px #034c6a inset,
            10px 0px 15px #034c6a inset, 0px 10px 15px #034c6a inset;
          box-sizing: border-box;
        }
      }
      .head-center {
        color: white;
        height: 100%;
        line-height: 3.5vw;
        font-size: 1.2vw;
        background-image: url("/public/resource/logoBg.png");
        background-size: 100% 100%;
        font-family: "微软雅黑" !important;
        text-align: center;
      }
      .head-time {
        height: 100%;
        line-height: 4vw;
        color: white;
        float: right;
        padding-right: 50px;
      }
    }
  }

  .water-level-line-chart {
    position: absolute;
    top: 10vh;
    right: 1vw;
  }

  .prediction-line-chart {
    position: absolute;
    bottom: 5vh;
    right: 1vw;
  }

  .water-level-table {
    position: absolute;
    top: 10vh;
    left: 1vw;
  }

  .water-level-center {
    top: calc(10vh + 2px);
    left: 36vw;
  }
}
</style>

