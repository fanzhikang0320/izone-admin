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
                :on-error="uploadAvatarError"
                :on-change="uploadAvatarChange"
                action="223"
                :auto-upload="false"
                :multiple="false"
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
                action="hkjh123"
                ref="uploadFile"
                :auto-upload= "false"
                :on-success="uploadFileSuccess"
                :on-error="uploadFileError"
                :on-change="uploadFileChange"
                :on-remove="removeFile"
                :multiple="false"
                :file-list="zipFileList"
                accept="application/zip"
              >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip">暂只支持zip格式文件，且不超过20M</div>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="info" @click="clearData">清空</el-button>
              <el-button type="primary" @click="submitData">发布</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 展示区域 -->
        <div>
            <el-row class="rows">
              <el-col :span="6">项目名称</el-col>
              <el-col :span="6">作者</el-col>
              <el-col :span="6">发布时间</el-col>
              <el-col :span="6">操作</el-col>
            </el-row>
            <el-row class="rows">
              <el-col :span="6">啦啦啦啦啦啦啦啦啦啦</el-col>
              <el-col :span="6">啦啦啦啦啦啦啦啦啦啦</el-col>
              <el-col :span="6">2020-03-08</el-col>
              <el-col :span="6">
                <el-button type="danger" size="mini">删除</el-button>
              </el-col>
            </el-row>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
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
        desc: ''
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
        window.console.log(file,fileList);
      }
    },
    // 上传图片失败
    uploadAvatarError(res,file) {
      window.console.log(res,file);
    },
    //图片上传成功
    handleAvatarSuccess(res,file) {
      window.console.log(res,file);
    },
    //添加压缩包
    uploadFileChange(file,fileList) {
      window.console.log(fileList);
      if (file.status == 'ready') {
        if (file.size > 1) {
          this.$confirm('请选择不超过20M大小的压缩包文件!','提示',{
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
      window.console.log('aaa',file,fileList);
    },
    //移除要上传的压缩包时
    removeFile() {
      this.zipFileList = [];
    },
    //压缩包文件上传成功
    uploadFileSuccess(res,file) {
      window.console.log(res,file);
    },
    //压缩包上传失败
    uploadFileError(res,file) {
      window.console.log(res,file);
    },
    
    
    //清除所有数据
    clearData() {
      this.imgFileList = [];
      this.zipFileList = [];
      this.$refs.form.resetFileds(); 
    },
    //最后提交数据
    submitData() {
      window.console.log('最终上传的数据：',this.imgFileList,this.zipFileList);
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
        this.$refs.form.validate((valid) => {
          if (valid) {
            window.console.log(this.formData)
            
        // this.$refs.uploadImg.submit();
        // this.$refs.uploadFile.submit();
          }
        })
    }

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
.rows {
  /* height: 45px;
  border: 1px solid #000; */
  background-color: #ccc;
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
</style>