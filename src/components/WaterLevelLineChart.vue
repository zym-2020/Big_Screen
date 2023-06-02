<template>
  <div class="water-level-line-chart">
    <dv-border-box8 :dur="5">
      <dv-border-box10>
        <div class="chart" ref="chart"></div>
      </dv-border-box10>
    </dv-border-box8>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  setup() {
    const chart = ref<HTMLElement>();
    let myChart: echarts.ECharts;
    let option: any = {};
    const initData = () => {
      option = {
        color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6"],
        legend: {
          x: "center",
          bottom: "30",
          textStyle: {
            color: "#ffffff",
          },
          data: ["厦门第一医院", "厦门中山医院", "厦门中医院", "厦门第五医院"],
        },
        calculable: false,
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}<br/>{c}条",
        },
        yAxis: [
          {
            type: "value",
            // axisLine: { onZero: false },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#034c6a",
              },
            },

            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              formatter: function (value: number) {
                return value + "k条";
              },
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: "solid",
              },
            },
          },
        ],
        xAxis: [
          {
            type: "category",
            data: [
              "8:00",
              "10:00",
              "12:00",
              "14:00",
              "16:00",
              "18:00",
              "20:00",
              "22:00",
            ],
            axisLine: {
              lineStyle: {
                color: "#034c6a",
              },
            },
            // splitLine: {
            //   show: false,
            // },
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
              formatter: function (value: number) {
                return value + "";
              },
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: "solid",
              },
              show: false,
            },
          },
        ],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          containLabel: true,
        },
        series: [
          {
            name: "厦门第一医院",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  shadowColor: "rgba(0,0,0,0.4)",
                },
              },
            },
            data: [15, 0, 20, 45, 22.1, 25, 70, 55, 76],
          },
          {
            name: "厦门中山医院",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  shadowColor: "rgba(0,0,0,0.4)",
                },
              },
            },
            data: [25, 10, 30, 55, 32.1, 35, 80, 65, 76],
          },
          {
            name: "厦门中医院",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  shadowColor: "rgba(0,0,0,0.4)",
                },
              },
            },
            data: [35, 20, 40, 65, 42.1, 45, 90, 75, 96],
          },
          {
            name: "厦门第五医院",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  shadowColor: "rgba(0,0,0,0.4)",
                },
              },
            },
            data: [45, 30, 50, 75, 52.1, 55, 100, 85, 106],
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
.water-level-line-chart {
  z-index: 99;
  width: 30vw;
  height: 40vh;
  .chart {
    height: 100%;
    width: 100%;
  }
}
</style>