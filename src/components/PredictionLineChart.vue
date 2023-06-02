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
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
export default defineComponent({
  setup() {
    const chart = ref<HTMLElement>();
    let myChart: echarts.ECharts;
    let option: any = {};

    const initData = () => {
      option = {
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
          top: "20",
          right: "30",
          bottom: "15",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 16,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },

            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
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
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 16,
              },
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
            name: "结算率",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#dddc6b",
                width: 4,
              },
            },
            areaStyle: {
              normal: {
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
            },
            itemStyle: {
              normal: {
                color: "#dddc6b",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4],
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
