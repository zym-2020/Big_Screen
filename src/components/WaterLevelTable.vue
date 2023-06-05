<template>
  <div class="water-level-table">
    <dv-border-box8 :dur="5">
      <div class="table">
        <div class="title">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ stationInfo.name
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2 </el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <dv-decoration3 style="width: 250px; height: 30px; margin-left: 5px" />
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr class="table-head">
              <td class="time-col">时间</td>
              <td v-for="item in tableNameList" :key="item" class="attribute">
                {{ item }}
              </td>
            </tr>
          </thead>
        </table>
        <el-scrollbar>
          <table cellpadding="0" cellspacing="0">
            <tbody>
              <tr
                v-for="(item, index) in waterLevelData"
                :key="index"
                class="table-body"
              >
                <td class="time-col">{{ item.time }}</td>
                <td v-for="key in resultKeyList" :key="key" class="attribute">
                  {{ item[key] ? item[key] : "缺失" }}
                </td>
              </tr>
            </tbody>
          </table>
        </el-scrollbar>
      </div>
    </dv-border-box8>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
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
    const config = {
      data: [25],
      shape: "roundRect",
      formatter: "",
      waveOpacity: 1,
      waveHeight: 30,
    };

    const tableWidth = computed(() => {
      return `calc(65% / ${tableNameList.value.length})`;
    });

    const stationInfo = computed(() => {
      return props.stationInfo;
    });

    const tableNameList = computed(() => {
      return JSON.parse(props.stationInfo!.keys_cn).key;
    });
    const resultKeyList = computed(() => {
      return JSON.parse(props.stationInfo!.keys).key;
    });

    const waterLevelData = computed(() => {
      console.log(props.waterLevelData);
      return props.waterLevelData;
    });

    return {
      config,
      stationInfo,
      tableNameList,
      waterLevelData,
      resultKeyList,
      tableWidth,
    };
  },
});
</script>

<style lang="scss" scoped>
.water-level-table {
  z-index: 99;
  width: 30vw;

  height: 85vh;
  ::v-deep .dv-border-box-8 {
    padding-top: 3px;
  }
  .table {
    height: calc(100% - 3px);
    width: calc(100% - 6px);
    margin-left: 3px;
    background-color: #081832;
    box-shadow: -10px 0px 5px #034c6a inset, 0px -10px 5px #034c6a inset,
      10px 0px 5px #034c6a inset, 0px 10px 5px #034c6a inset;
    .title {
      height: 10vh;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .el-dropdown {
        color: white;
        font-size: 3vh;
      }
    }
    table {
      width: 100%;
      .table-head,
      .table-body {
        height: 5vh;
      }
      .table-head {
        color: #4dc6f9;
      }
      td {
        text-align: center;
      }
      .time-col {
        width: 35%;
      }
      .attribute {
        width: v-bind(tableWidth);
      }
    }
    .el-scrollbar {
      height: calc(70vh - 30px);
      table {
        .table-body {
          color: white;

          &:nth-child(2n + 1) {
            background-color: #072951;
            box-shadow: -10px 0px 15px #034c6a inset,
              10px 0px 15px #034c6a inset;
          }
        }
      }
    }
  }
}
</style>