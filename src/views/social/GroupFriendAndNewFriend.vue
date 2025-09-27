
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
      <!-- <el-aside width="200px">Aside</el-aside> -->
    </el-container>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<style lang="scss" scoped>
    .el-aside{
        border: 1px solid grey;
        background-color: beige;
    }
    .el-main{
        border: 1px solid grey;
        background-color: beige;
    }
</style>