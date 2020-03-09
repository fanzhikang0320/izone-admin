<template>
  <div class="index-wrapper">
      <div class="title-box">
          <h1>izone管理中心</h1>
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
    },
    data() {
        return {

        }
    },
    methods: {

    },
    created() {

    }
}
</script>

<style scoped>
.index-wrapper {
    width: 1024px;
    max-width: 1024px;
    min-width: 1024px;
    background-color: rgb(180, 176, 176);
    margin: 0 auto;
}
</style>