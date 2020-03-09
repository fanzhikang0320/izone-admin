<template>
  <div class="login-wrapper">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" status-icon class="form-wrapper">
          <el-form-item label="管理员账号" prop="account">
              <el-input type="text" v-model="formData.account" placeholder="请输入管理员账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button type="success" @click="submitForm" :loading="isLoading">{{text}}</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
var cookieUtils = require('../utils/cookie.js');
export default {
    data() {
        var validateAccount = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'))
            } else {
                callback();
            }
        }
        var validatePassword = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'))
            } else {
                callback();
            }
        }
        
        return {
            formData: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    {validator: validateAccount}
                ],
                password: [
                    {validator: validatePassword}
                ]
            },
            checked: false,
            isLoading: false,
            text: '登录'
        }
    },
    methods: {
        submitForm() {
            this.isLoading = true;
            this.text = '登录中...'
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.axios.post('/api/adminLogin',this.formData)
                        .then((res) => {
                            if (res.data.type == 'success') {
                                this.isLoading = false;
                                this.text = '登录'
                                if (res.data.data) {
                                    // 判断是否点击记住密码
                                    if (this.checked) {
                                        cookieUtils.setCookie('account',this.formData.account,7)
                                    }
                                    sessionStorage.setItem('account',this.formData.account)
                                    this.$router.push({name: 'admin'})
                                } else {
                                    this.$confirm('管理员账号或密码错误！','提示',{
                                        showConfirmButton: false,
                                    })
                                }
                            } else {
                                this.isLoading = false;
                                this.text = '登录'
                            }
                        })
                }
            })
        }
    }
}
</script>

<style scoped>
.login-wrapper {
    width: 1024px;
    max-width: 1024px;
    min-width: 1024px;
    margin: 0 auto;
    background-color: aqua;
}
.form-wrapper {
    width: 500px;
    border: 1px solid #000;
    margin: 0 auto;
}
</style>