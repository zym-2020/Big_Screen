<template>
  <div class="prediction-line-chart">
    <dv-border-box8 :dur="5" :reverse="true">
      <dv-border-box10>
        <div class="chart" ref="chart"></div>
      </dv-border-box10>
    </dv-border-box8>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType } from "vue";
import * as echarts from "echarts";
import { StationInfo } from "@/type";
import { dateFormat, timestamp2time } from "@/utils/common";
export default defineComponent({
  props: {
    prediction: {
      type: Object as PropType<{ time: string; value: number[] }>,
    },
    stationInfo: {
      type: Object as PropType<StationInfo>,
    },
  },

  setup(props) {
    const chart = ref<HTMLElement>();
    let myChart: echarts.ECharts;
    let option: any = {};

    const initData = () => {
      const startTime = props.prediction!.time;
      const time: string[] = [];

      for (let i = 0; i < props.prediction!.value.length; i++) {
        time.push(
          timestamp2time(Date.parse(startTime) + 3600000 * i).slice(11, 16)
        );
      }
      option = {
        title: {
          show: true,
          text: "水位预报图",
          x: "center",
          top: "15",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        grid: {
          left: "15",
          top: "50",
          right: "30",
          bottom: "45",
          containLabel: true,
        },
        dataZoom: [
          {
            xAxisIndex: [0],
            filterMode: "filter",
            start: 0,
            end: 50,
          },
        ],

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: 16,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },

            data: time,
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: 16,
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "水文预报",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              color: "#dddc6b",
              width: 4,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(221, 220, 107, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(221, 220, 107, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            itemStyle: {
              color: "#dddc6b",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            data: props.prediction!.value,
          },
        ],
      };
    };

    onMounted(() => {
      initData();
      myChart = echarts.init(chart.value!);
      myChart.setOption(option);
    });

    return { chart };
  },
});
</script>

<style lang="scss" scoped>
.prediction-line-chart {
  z-index: 99;
  width: 30vw;
  height: 40vh;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>
