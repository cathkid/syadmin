<template>
	<div class="main">
	  <div align="center">
	  	 <div class="login-box">
	  	 		 <h5>登录后台管理系统</h5>
	  	 		 <el-input type="text" v-model="input_name" placeholder="请输入账号"></el-input>
	  	 		 <el-input type="password"  v-model="input_password" placeholder="请输入密码"></el-input>
	  	 		 <el-button type="primary" @click="login">登录</el-button>
	  	 </div>
	  </div>
	  
		<el-dialog
		  title="提示信息"
		  :visible.sync="centerDialogVisible"
		  width="30%"
		  center>
		  <span>{{message}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	  
  </div>
</template>
 
<script>
  export default {
  	name:'login',
    data() {
      return {
            input_name:null,
            input_password:null,
            centerDialogVisible:false,
            message:null
      }
    },
    methods:{
    	login:function(){
    	    if(this.input_name ==''|| this.input_password ==''){
    	           this.message='账号密码不能为空' 
                   this.centerDialogVisible=true 
    	           return false 
    	    }
    	     var _this = this  
					 var params = new URLSearchParams() 
							 params.append('status', 'login') 
							 params.append('username',this.input_name) 
							 params.append('password',this.input_password) 
							 axios.post('/data/admindata.php',params)
						.then(function (response) {
									if(response.data.code != '0'){
												localStorage.login = response.data.username 
												_this.$router.push('/frame/nav1') 
									}else{
												_this.message = '登陆失败' 
												_this.centerDialogVisible=true 
									}
						})
    	}
    },
    mounted:function(){
    } 
  }
</script>