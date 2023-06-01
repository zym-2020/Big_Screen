<template>
  <div class="notice">
    <div class="notice-content">
      <div class="notice-head">最&nbsp;近&nbsp;更&nbsp;新</div>
      <el-table :data="tableData">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <div class="border1"></div>
    <div class="border2"></div>
    <div class="border3"></div>
    <div class="border4"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "@/css/border.css";
export default defineComponent({
  setup() {
    const tableData = [
      {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];

    return { tableData };
  },
});
</script>

<style lang="scss" scoped>
.notice {
  z-index: 99;
  .notice-content {
    width: 20vw;
    padding: 15px;
    background: #0c2854;
    border: 1px solid #3486da;
    .notice-head {
      color: white;
      text-align: center;
      font-family: "微软雅黑" !important;
    }
    >>> .el-table__body {
      background-color: #0c2854;
    }
  }
}
</style>