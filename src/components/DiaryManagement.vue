<template>
  <div class="diary-wrapper">
      <el-row>
          <el-col :span="14">
            <div class="send-box">
                <el-input class="text" type="textarea" rows="5" v-model="content" placeholder="发表你的看法"></el-input>
                <div class="btn-box">
                    <el-button class="btn" type="primary" size="small" @click="send">发表</el-button>
                    <el-button class="btn" type="info" size="small" @click="clear">清空</el-button>
                </div>
            </div>
            <el-collapse
                v-model="activeName"
                @change="handleChange"
             >
                 <el-collapse-item title="我是一" name="111">
                     <div>hello,我是内1</div>
                     <div class="btn-box" >
                         <el-button class="btn" type="primary" size="small">更改</el-button>
                         <el-button class="btn" type="danger" size="small">删除</el-button>
                     </div>
                 </el-collapse-item>
                 <el-collapse-item title="我是二" name="222">
                     <div>hello,2</div>
                 </el-collapse-item>
             </el-collapse>

          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            activeName: [],
            updateId: '',
            updateContent: '',
            deleteId: ''
        }
    },
    methods: {
        handleChange(val) {
            window.console.log(val);
        },
        //清空内容
        clear() {
            this.content = ''
        },
        //发表内容
        send() {
            window.console.log(this.content)
        },
        clearUpdateContent() {
            this.updateContent = '';
        },
        sendUpdateContent() {
            window.console.log(this.updateContent);
        },
        deleteConfirm() {
            window.console.log(this.deleteId)
        },
        deleteCancel() {
            this.deleteId = ''
        }
    }
}
</script>

<style scoped>
.send-box {
    clear: both;
    overflow: hidden;
    margin-bottom: 20px;
}

.btn-box {
    margin-top: 15px;
    margin-bottom: 10px;
}
.btn-box .btn {
    margin-left: 15px;
    margin-right: 10px;
    float: right;
}
</style>