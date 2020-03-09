<template>
  <el-row>
    <el-col :span="15">
      <div class="user-wrapper">
        <el-input style="width: 250px;" size="small" placeholder="请输入账号"></el-input>
        <el-button type="primary" size="small">搜索</el-button>
        <div>
          <el-row class="rows">
            <el-col :span="5">账号</el-col>
            <el-col :span="5">昵称</el-col>
            <el-col :span="2">性别</el-col>
            <el-col :span="5">注册时间</el-col>
            <el-col :span="7">操作</el-col>
          </el-row>
          <el-row class="rows">
            <el-col :span="5">12345678901</el-col>
            <el-col :span="5">迪丽热bug</el-col>
            <el-col :span="2">女</el-col>
            <el-col :span="5">2020-02-10</el-col>
            <el-col :span="7">
              <el-button type="warning" size="mini">封禁</el-button>
              <el-button type="danger" size="mini">注销</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
  
</template>

<script>
export default {

}
</script>

<style scoped>
.user-wrapper {
  margin-left: 20px;
}
.title {
  border: 1px solid #000;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2em;
}
.rows {
  background-color: green;
}
.rows .el-col {
  height: 40px;
  line-height: 40px;
  font-size:14px;
  text-align: center;
  border: 1px solid #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>