<template>
 		<div class="main">
 				<!-- 头部  -->
 				<div class="header el-col el-col-24">
 				<!-- logo  -->	
    			<div class="logo el-col el-col-8">后台管理系统</div>
    			<div class= "top_menu el-col el-col-10"></div>
    			<div class= "system_btn el-col el-col-6" >
    			<!-- 下拉菜单  -->	
    				<el-dropdown  trigger="click"  @command="handleCommand" >
					      <span class="el-dropdown-link">
					        	{{username}},操作中心<i class="el-icon-arrow-down el-icon--right"></i>
					      </span>
					      <el-dropdown-menu slot="dropdown">
							<el-dropdown-item   ><a target="_blank" href="/">前端首页</a></el-dropdown-item>
							<el-dropdown-item  command="2">APP地址</el-dropdown-item>
							<el-dropdown-item  command="3">paypal账号</el-dropdown-item>
							<el-dropdown-item  command="1">修改密码</el-dropdown-item>
					        <el-dropdown-item  command="0">注销</el-dropdown-item>
					      </el-dropdown-menu>
					 </el-dropdown>
    			</div>
			  </div>
			  
		    <div class="contents el-container el-col el-col-24">
           <div class="el-col el-col-3">
                	 <!-- 左侧菜单  -->
                     <el-col :span="24">
                        <el-menu
                          default-active="2"
                          class="el-menu-vertical-demo"
													:default-openeds="openeds"
                          @open="handleOpen"
                          @close="handleClose">
                          <el-submenu index="1">
                            <template slot="title">
                               <i class="el-icon-menu"></i>
                              <span>后台管理</span>
                            </template>
                            <el-menu-item-group>
							  <el-menu-item  index="1-1" @click="router_path('/frame/nav1')" >广告图</el-menu-item>
							  <el-menu-item  index="1-5" @click="router_path('/frame/nav5')" >修改背景</el-menu-item> 
                              <el-menu-item  index="1-2" @click="router_path('/frame/nav2')" >查看留言</el-menu-item>
                           	  <el-menu-item  index="1-3" @click="router_path('/frame/nav3')" >支付信息</el-menu-item> 
                           	  <el-menu-item  index="1-4" @click="router_path('/frame/nav4')" >套餐内容</el-menu-item> 
                            </el-menu-item-group>
                          </el-submenu>
                          <!--<el-submenu index="2">
                            <template slot="title">
                               <i class="el-icon-menu"></i>
                              <span>管理(英文)</span>
                            </template>
                            <el-menu-item-group>
							  <el-menu-item  index="2-1" @click="router_path('/frame/enav1')" >广告图</el-menu-item>
                              <el-menu-item  index="2-2" @click="router_path('/frame/enav2')" >栏目1</el-menu-item>
                           	  <el-menu-item  index="2-3" @click="router_path('/frame/enav3')" >栏目1</el-menu-item> 
                           	  <el-menu-item  index="4-4" @click="router_path('/frame/enav4')" >栏目1</el-menu-item>
                            </el-menu-item-group>
                          </el-submenu>-->
                        </el-menu>
                      </el-col>
                    </el-row>
                </div>
		    		
		    	 <div class="main el-col el-col-21">
		    	 		 <!-- 内容  -->
		    	 		 <router-view/>
		    	 </div>
		    </div>
		    
		    <!-- 修改密码  -->
		    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
			  <el-form :model="form">
			    <el-form-item type="password" label="新密码" :label-width="formLabelWidth">
			      <el-input v-model="newpass" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="sureEditPass">确 定</el-button>
			  </div>
			</el-dialog>
			
			
			<!-- 修改下载地址  -->
		    <el-dialog title="修改下载地址" :visible.sync="dialogFormVisible1">
			  <el-form :model="form">
			    <el-form-item type="text" label="下载地址" :label-width="formLabelWidth">
			      <el-input v-model="url" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="sureUrl">确 定</el-button>
			  </div>
			</el-dialog>
			
			<!-- 修改下Paypal账号  -->
		    <el-dialog title="修改下Paypal账号" :visible.sync="dialogFormVisible2">
			  <el-form :model="form">
			    <el-form-item type="text" label="Paypal账号" :label-width="formLabelWidth">
			      <el-input v-model="paypal" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
			    <el-button type="primary" @click="surePaypal">确 定</el-button>
			  </div>
			</el-dialog>
			
			
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
  name: 'frame',
  data(){
  	return {
  	    username:null,
  		system_status:false,
  		dialogFormVisible:false,
  		dialogFormVisible1:false,
  		dialogFormVisible2:false,
  		newpass:null,
  		centerDialogVisible:false,
  		message:null,
  		url:'',
  		paypal:'',
        openeds:['1']
  		}
  },
  mounted(){
  	this.username = localStorage.login
  },
  methods:{
  	router_path:function(url){
  		this.$router.push({ path:url })
  	},
  	handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    unlogin:function(){
    	localStorage.login = ''
    	this.$router.push('/login')
    },
    editpass:function(){
    	this.dialogFormVisible = true
    },
    editUrl:function(){
    	this.dialogFormVisible1 = true
    },
    editPaypal:function(){
    	this.dialogFormVisible2 = true
    },
    sureEditPass:function(){
    	if(this.newpass == null){
    		this.message = '密码不得为空！'
    		this.centerDialogVisible = true
    		return;
    		
    	}
    	var _this = this 		 
		_this.loading=true 
    	var params = new URLSearchParams() 
		  params.append('status', 'editpass')
		  params.append('password', _this.newpass)
    	 	 axios.post('../data/admindata.php',params)
		  .then(function (response) {
		  	 _this.message = '密码修改成功！'
	    	 _this.centerDialogVisible = true
	    	 _this.dialogFormVisible = false
		  })
		  .catch(function (response) {
		    console.log(response) 
		  }) 
    },
    sureUrl:function(){
    	if(this.url == null){
    		this.message = '下载地址不能为空！'
    		this.centerDialogVisible = true
    		return;
    	}
    	var _this = this 		 
		_this.loading=true 
    	var params = new URLSearchParams() 
		  params.append('status', 'editUrl')
		  params.append('url', _this.url)
    	 	 axios.post('../data/admindata.php',params)
		  .then(function (response) {
		  	 _this.message = '下载地址修改成功！'
	    	 _this.centerDialogVisible = true
	    	 _this.dialogFormVisible1 = false
		  })
		  .catch(function (response) {
		    console.log(response) 
		  }) 
    },
    surePaypal:function(){
    	if(this.paypal == null){
    		this.message = 'paypal账号不能为空！'
    		this.centerDialogVisible = true
    		return;
    	}
    	var _this = this 		 
		_this.loading=true 
    	var params = new URLSearchParams() 
		  params.append('status', 'editPaypal')
		  params.append('paypal', _this.paypal)
    	 	 axios.post('../data/admindata.php',params)
		  .then(function (response) {
		  	 _this.message = 'paypal账号修改成功！'
	    	 _this.centerDialogVisible = true
	    	 _this.dialogFormVisible2 = false
		  })
		  .catch(function (response) {
		    console.log(response) 
		  }) 
    },
    handleCommand(command) {
        if(command == '0'){
        	this.unlogin()
        }
        if(command == '1'){
        	this.editpass()
        }
        if(command == '2'){
        	this.editUrl()
        }
        if(command == '3'){
        	this.editPaypal()
        }
    }
  }
}
</script>