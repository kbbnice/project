<template>
  <div>
    <div class="label">{{label}}</div>
    <div class="key">
      <span v-if="type === 'text'">{{key}}</span>
      <select v-else-if="type === 'select'" v-model="key" name="select" id="select">
        <option v-for="item in options" :key="item.id" :value="item">{{item}}</option>
      </select>
      <textarea v-else-if="type === 'textarea'" v-model="key" name="textarea" id="textarea" cols="30" rows="10"></textarea>
    </div>

  </div>
</template>

<script>
export default {
  name: 'tableTd',
  data() {

  },
  props: {
    label: {
      type: String,
      default: ''
    },
    key: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      default: []
    }
  },
  created(){

  }
}
</script>

<style lang="less" scoped>

</style>
