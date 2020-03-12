<template>
  <div class="other-wrapper">
    <el-row>
      <el-col :span="14">
        <!-- 发表区域 -->
        <div>
          <el-form
            :model="formData"
            ref="form"
            :rules="rules"
            label-width="100px"
            hide-required-asterisk
          >
            <el-form-item label="项目图片">
              <el-upload 
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="uploadAvatarChange"
                action="/api/insertOtherImg"
                :auto-upload="false"
                :multiple="false"
                name="img"
                ref="uploadImg"
                :file-list="imgFileList"
                accept="image/*"
              >
                <img :src="imgurl" v-if="imgurl" class="avatar" alt="">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="项目名称" prop="name" >
              <el-input type="text" v-model="formData.name" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input type="text" v-model="formData.author" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="在线地址">
              <el-input type="text" v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="简述" prop="desc">
              <el-input type="textarea" v-model="formData.desc" show-word-limit maxlength="60" rows="3"></el-input>
            </el-form-item>
                        <el-form-item label="项目文件">
              <el-upload
                action="/api/insertOtherZip"
                ref="uploadFile"
                :auto-upload= "false"
                :on-success="uploadFileSuccess"
                :on-change="uploadFileChange"
                :on-remove="removeFile"
                :multiple="false"
                name="otherZip"
                :file-list="zipFileList"
                accept="application/zip"
              >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip">暂只支持zip格式文件，且不超过50M</div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="info" @click="clearData">清空</el-button>
              <el-button type="primary" @click="submitData" :loading="isLoading">{{isLoading ? '发布中...' : '发布'}}</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 展示区域 -->
        <div class="case-wrapper">
            <el-row class="rows">
              <el-col :span="6">项目名称</el-col>
              <el-col :span="6">作者</el-col>
              <el-col :span="6">发布时间</el-col>
              <el-col :span="6">操作</el-col>
            </el-row>
            <div class="showCaseInfo" v-loading="isLoadingCase">
              <el-row class="rows" v-for="(item,index) in caseInfo" :key="index">
                <el-col :span="6">{{item.name}}</el-col>
                <el-col :span="6">{{item.author}}</el-col>
                <el-col :span="6">{{item.ctime}}</el-col>
                <el-col :span="6">
                  <el-button type="danger" size="mini" @click="deleteCase(item.id,item.imgpath,item.packagePath,index)">删除</el-button>
                </el-col>
              </el-row>
              <div class="nomore" v-show="isShowNoMore">
                sorry！ 我也是有底线的 ┐(-｡ｰ;)┌
              </div>
            </div>
            <el-pagination
              background
              prev-click
              :hide-on-single-page=true
              @current-change="pageChange" 
              layout="prev, pager, next"
              :page-size="this.pageSize"
              class="pagination"
              :total="this.total">
            </el-pagination>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    var validateName = (rule,value,callback) => {
      if (!value || value.trim().length == 0 ) {
        callback(new Error('请输入项目名称！'))
      } else {
        callback();
      }
    }
    var validateAuthor = (rule,value,callback) => {
      if (!value || value.trim().length == 0 ) {
        callback(new Error('请输入作者名称!'))
      } else {
        callback();
      }
    }
    var validateDesc = (rule,value,callback) => {
      if (!value || value.trim().length == 0 ) {
        callback(new Error('请输入项目简述!'))
      } else {
        callback();
      }
    }

    return {
      formData: {
        name: '',
        author: '',
        url: '',
        desc: '',
        imgpath: '',
        zipPath: ''
      },
      imgurl: '',  
      rules: {
        name: [
          { max: 20, message: '最多不得超过20个字符！（一个英文字为1个字符，中文字为2个字符）',trigger: 'blur'},
          { validator: validateName, trigger: 'blur'}
        ],
        author: [
          { max: 20, messge: '最多不得超过20个字符！（一个英文字为1个字符，中文字为2个字符）', trigger: 'blur'},
          {validator: validateAuthor, trigger: 'blur'}
        ],
        desc: [
          {validator: validateDesc, trigger: 'blur'}
        ]
      },
      imgFileList: [],
      zipFileList: [],
      isLoading: false,
      caseInfo: [] , //要渲染的案例信息
      isLoadingCase: false,
      total: 100, 
      pageSize: 20,
      start: 1,
      isShowNoMore: false
    }
  },
  methods: {
    
    //当上传图片发生改变的时候
    uploadAvatarChange(file,fileList) {
      //判断当前是否准备上传
      if (file.status == 'ready') {
        fileList = [];
        fileList.push(file);
        //生成预览路径
        this.imgurl = URL.createObjectURL(file.raw);
        this.imgFileList = fileList;
      }
    },
    //图片上传成功
    handleAvatarSuccess(res) {
      if (res.type == 'success') {
        this.formData.imgpath = res.data;
      }
    },
    //添加压缩包
    uploadFileChange(file,fileList) {
      if (file.status == 'ready') {
        if (file.size > 50 * 1024) {
          this.$confirm('请选择不超过50M大小的压缩包文件!','提示',{
            type: 'warning',
            showConfirmButton: false,
            showCancelButton: false
          })
          return ;
        }
        fileList = [];
        fileList.push(file);
        this.zipFileList = fileList;
      }
    },
    //移除要上传的压缩包时
    removeFile() {
      this.zipFileList = [];
    },
    //压缩包文件上传成功
    uploadFileSuccess(res) {
      if (res.type == 'success') {
        this.formData.zipPath = res.data;
      }
    },
    //清除所有数据
    clearData() {
      this.imgFileList = [];
      this.zipFileList = [];
      this.$refs.form.resetFileds(); 
    },
    //最后提交数据
    submitData() {
        //判断有没有上传图片和压缩包
        if (this.imgFileList.length == 0) {
          this.$message({
            type: 'warning',
            message: '请您上传一张图片！'
          })
          return ;
        }
        if (this.zipFileList.length == 0) {
          this.$message({
            type: 'warning',
            message: '请选择要上传的文件！'
          })
          return;
        }
        this.postData();

    },
    postData() {
      this.isLoading = true;
      var time = null;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.uploadImg.submit();
          this.$refs.uploadFile.submit();
          // 放到异步去执行，主要是解决必须先等到压缩包和图片上传完毕才可以
          time = setTimeout(() => {
            if (this.formData.imgpath != '' || this.formData.zipPath != '') {
              this.axios.post('/api/insertOtherContent',this.formData)
                .then((res) => {
                  this.isLoading = false;
                  if (res.data.type == 'success') {
                      this.$message({
                        type: 'success',
                        message: '发布成功！'
                      })
                  } else {
                    this.$message({
                      type: 'error',
                      message: '发布失败，请稍后再试！'
                    })
                  }
                })
              time = 0;
              return;
            } else {
              this.$message({
                type: 'error',
                message: '图片或压缩包上传失败！'
              })
            }
            clearTimeout(time)
          },1000)
          
          
          

          
        }
      })
    },
    async getCaseInfo(start) {
      this.isLoadingCase = true;
        var res = await this.axios.get('/api/getOtherData',{params: {start: (start - 1)* this.pageSize,limit: this.pageSize}})
        if (res.data.type == 'success') {
          this.isLoadingCase = false;
          this.isShowNoMore = false;
          this.total = res.data.count;
          if (res.data.data.length  < this.pageSize) {
            this.isShowNoMore = true;
          }
          this.caseInfo = res.data.data;
        } else {
          this.isLoadingCase = false;
          this.$message({
            type: 'error',
            message: '服务端可能发生了错误！'
          })
        }
    },
    async deleteCase(id,imgpath,packagePath,index) {
      this.$confirm('你确定要删除此项目吗？','提示',{
        type: 'warning',
        confirmButtonText: '是的',
        cancelButtonText: '再想想'
      }).then(() => {
        this.axios.post('/api/deleteCase',{id: id, imgpath: imgpath, packagePath: packagePath})
          .then((res) => {
            window.console.log(res);
            if (res.data.type == 'success') {
              this.$message({
                type:'success',
                message: '删除成功！'
              })
              this.caseInfo.splice(index,1);
              this.total = this.total - 1;

            } else {
              this.$message({
                type: 'error',
                message:'删除失败，请刷新重试！'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '取消操作'
        })
      })
      
    },
    pageChange(currentPage) {
      this.start = currentPage;
      this.getCaseInfo(this.start);
    }
  },
  created() {
    this.getCaseInfo(this.start)
  }
}
</script>

<style scoped>
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  width: 100px;
  height: 100px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.rows .el-col {
  height: 45px;
  text-align: center;
  line-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  
}
.case-wrapper {
  color: #fff;
}
.rows {
  border-bottom: 1px solid #f1d9d9;
  background-color: #57abff;
  
}
.showCaseInfo {
  background-color: #fff;
  min-height: 920px;
  color: #45484e;
}
.showCaseInfo .el-row:nth-child(odd) {
  background-color: #d4e2bb;
}
.showCaseInfo .el-row:nth-child(even) {
  background-color: #fff;
}
.nomore {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 15px;
  color: #a55c5c;
  background-color: #fbc1c1;
}

</style>