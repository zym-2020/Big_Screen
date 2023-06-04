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
import { defineComponent, onMounted, ref, PropType } from "vue";
import * as echarts from "echarts";
import {
  StationInfo,
  YangtzeWaterLevelRes,
  JSWaterLevelRes,
  ZJWaterLevelRes,
  AHWaterLevelRes,
  HBWaterLevelRes,
} from "@/type";
export default defineComponent({
  props: {
    stationInfo: {
      type: Object as PropType<StationInfo>,
    },
    waterLevelData: {
      type: Object as PropType<
        | YangtzeWaterLevelRes[]
        | JSWaterLevelRes[]
        | ZJWaterLevelRes[]
        | AHWaterLevelRes[]
        | HBWaterLevelRes[]
      >,
    },
  },
  setup(props) {
    const chart = ref<HTMLElement>();
    let myChart: echarts.ECharts;
    let option: any = {};
    const colors = ["#87cefa", "#ff7f50", "#32cd32", "#da70d6"];
    const initData = () => {
      const timeList: string[] = [];
      const series: any[] = [];
      const keysCN: string[] = JSON.parse(props.stationInfo!.keys_cn).key;
      const keys: string[] = JSON.parse(props.stationInfo!.keys).key;
      keysCN.forEach((item) => {
        series.push({
          name: item,
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                shadowColor: "rgba(0,0,0,0.4)",
              },
            },
          },
          data: [],
        });
      });

      props.waterLevelData!.forEach((item) => {
        timeList.push(item.time.slice(11, 16));
        let index = 0;
        while (index < keys.length) {
          series[index].data.push((item as any)[keys[index]]);
          index++;
        }
      });
      option = {
        color: colors.slice(0, keysCN.length),
        legend: {
          x: "center",
          bottom: "50",
          textStyle: {
            color: "#ffffff",
          },
          data: keysCN,
        },
        calculable: false,
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{c}",
        },
        yAxis: [
          {
            type: "value",
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
            },
            splitLine: {
              lineStyle: {
                width: 0,
                type: "solid",
              },
            },
          },
        ],
        dataZoom: [
          {
            xAxisIndex: [0],
            filterMode: "filter",
            start: 50,
            end: 100,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: timeList,
            axisLine: {
              lineStyle: {
                color: "#034c6a",
              },
            },
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
        series: series,
      };
    };

    const refreshData = () => {
      initData();
      myChart.setOption(option);
    };

    onMounted(() => {
      initData();
      myChart = echarts.init(chart.value!);
      myChart.setOption(option);
    });

    return { chart, refreshData };
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