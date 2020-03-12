<template>
  <div class="index-wrapper">
      <div class="title-box">
          <img src="../assets/img/izone.jpg" alt="">
          <h1>管理中心</h1>
      </div>
      
      <el-tabs tab-position="left">
          <el-tab-pane label="用户管理">
              <User />
          </el-tab-pane>
          <el-tab-pane label='成长日记'>
              <Diary />
          </el-tab-pane>
          <el-tab-pane label="其它案例">
              <Other />
          </el-tab-pane>
          <el-tab-pane label="网站公告">
              <Bulletin />
          </el-tab-pane>
      </el-tabs>

  </div>
</template>

<script>
import User from '@/components/UserManagement.vue';
import Other from '@/components/OtherManagement.vue';
import Diary from '@/components/DiaryManagement.vue';
import Bulletin from '@/components/BulletinManagement.vue';
export default {
    components: {
        User,
        Other,
        Diary,
        Bulletin
    }
}
</script>

<style scoped>
.index-wrapper {
    width: 1024px;
    max-width: 1024px;
    min-width: 1024px;
    background-color: rgba(236, 231, 231, 0.582);
    margin: 0 auto;
}
.title-box {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    border-bottom: 2px dashed rgb(207, 204, 204);
    background-color: #Fff;
    padding-bottom: 40px;
    margin-top: 30px;
}
.title-box img {
    display: inline-block;
    height: 70px;
    margin: 0 40px;
}
.title-box h1 {
    margin-left: 100px;
    letter-spacing: 1em;
}
</style>