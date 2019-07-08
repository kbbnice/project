<template>
  <div id="dept-table" class="dept-table">
    <div class="title">{{ tableInfo.title }}</div>
    <div>{{ tableInfo.titleDetail }}</div>
    <!-- <div v-for="item in thisWeekList" :key="item.id"> -->
    <div>
      <span>&nbsp;</span>
      <span></span>
      <span>'所属项目'</span>
      <table-td
        v-for="item in thisWeekOption"
        :key="item.ke"
        :label="item.label"
        :type="item.type"
        :options="item.options"
      ></table-td>
    </div>
  </div>
</template>

<script>
import tableTd from "@/components/tableTd";
export default {
  name: "DeptTable",
  components: {
    tableTd
  },
  data() {
    return {
      thisWeekOption: [
        {
          key: "type",
          label: "",
          type: "select",
          options: ["1", "2"]
        },
        {
          key: "item",
          label: "所属项目"
        },
        {
          key: "target",
          label: "任务名称"
        },
        {
          key: "description",
          label: "详细内容",
          type: "textarea"
        },
        {
          key: "status",
          label: "任务状态"
        },
        {
          key: "progress",
          label: "完成比率"
        },
        {
          key: "startTime",
          label: "开始时间"
        },
        {
          key: "planedTime",
          label: "计划时间"
        },
        {
          key: "totalTime",
          label: "本周合计"
        },
        {
          key: "remark",
          label: "备注"
        }
      ],
      tableInfo: {
        title: "研发部周报",
        titleDetail: "本周工作任务情况",
        titleList: ["序号"],
        thisWeekList: [
          {
            type: 0,
            item: "远程",
            target: "",
            description: "",
            status: 0,
            progress: "",
            startTime: "",
            planedTime: "",
            totalTime: "",
            remark: "" // 备注
          }
        ],
        nextWeekList: [
          {
            type: 0,
            item: "远程",
            target: "",
            progress: "",
            startTime: "",
            planedTime: "",
            remark: "" // 备注
          }
        ]
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="less">
table {
  border: 1px solid grey;
  border-collapse: collapse;
  text-align: center;

  th {
  }
}
</style>
