<template>
  <div class="diary-wrapper">
      <el-row>
          <el-col :span="14">
            <div class="send-box">
                <el-input class="text" type="textarea" rows="5" v-model="content" placeholder="发表你的看法"></el-input>
                <div class="btn-box">
                    <el-button class="btn" type="primary" size="small" @click="send" :loading="isLoading">{{isLoading ? '发表中...' : '发表'}}</el-button>
                    <el-button class="btn" type="info" size="small" @click="clear">清空</el-button>
                </div>
            </div>
            <el-collapse>
                 <el-collapse-item :title="getTime(item.ctime)" :name="index" v-for="(item,index) in diaryInfo" :key="index">
                     <div>{{item.content}}</div>
                     <div class="btn-box" >
                         <el-button class="btn" type="primary" size="small" @click="updateDiary(item.id,index)">更改</el-button>
                         <el-button class="btn" type="danger" size="small" @click="deleteDiary(item.id,index)">删除</el-button>
                     </div>
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
            content: '', //发布的内容
            updateContent: '', //需要修改的日记的内容
            isLoading: false,
            diaryInfo: []
        }
    },
    methods: {
        //清空内容
        clear() {
            this.content = ''
        },
        //发表内容
        async send() {
            this.isLoading = true;
            var res = await this.axios.post('/api/insertDiary',{content: this.content})
            if (res.data.type == 'success') {
                this.isLoading = false;
                this.$message({
                    type:'success',
                    message: '发表成功！'
                })
            } else {
                this.isLoading = false;
                this.$message({
                    type: 'error',
                    message: '发表失败，请稍后重试！'
                })
            }
            this.clear();
        },
        //点击更改
        updateDiary(id,index) {
           this.$prompt('请输入要更改的内容','提示',{
               confirmButtonText: '发表',
               cancelButtonText: '不了，再想想',
               inputValidator: (value) => {
                   if (!value || value.trim().length == 0) {
                       return '输入内容不可以为空'
                   }
               }
           }).then(({value}) => {
               this.axios.post('/api/updateDiary',{id: id, content: value.trim()})
                .then((res) => {
                    if (res.data.type == 'success') {
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        })
                        this.diaryInfo[index].content = value;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '更新失败，请稍后重试！'
                        })
                    }
                }) 
           }).catch(() => {
               this.$message({
                   type: 'info',
                   message: '已取消当前操作！'
               })
           })
        },
        //点击删除
        deleteDiary(id,index) {
            this.$confirm('你确定要删除当前日记吗？','提示',{
                type: 'warning',
                confirmButtonText: '确定',
                cancelButtonText: '再想想'
            }).then(() => {
                this.axios.post('/api/deleteDiary',{id: id})
                    .then((res) => {
                        if (res.data.type == 'success') {
                            this.$message({
                                type:'success',
                                message:'删除成功！'
                            })
                            this.diaryInfo.splice(index,1);
                        } else {
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            })
                        }
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消当前操作'
                })
            }) 
        },
        //清空要修改的内容
        clearUpdateContent() {
            this.updateContent = '';
        },
        //发送修改的内容
        sendUpdateContent() {
            window.console.log(this.updateContent);
        },
        deleteConfirm() {
            window.console.log(this.deleteId)
        },
        deleteCancel() {
            this.deleteId = ''
        },
        //获取日记的内容
        async getDiaryInfo() {
            var res = await this.axios.get('/api/getDiary');
            window.console.log(res);
            if (res.data.type == 'success') {
                this.diaryInfo = res.data.data;
            }
        },
        getTime(time) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`
        }
    },
    created() {
        this.getDiaryInfo();
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