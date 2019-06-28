<template>
  <div align="center">
  		<h5 class="table-menu">支付信息</h5>
  		<div class="search-box">
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column  prop="name" sortable label="姓名" > </el-table-column>
		    <el-table-column  prop="name_last" sortable label="电话" > </el-table-column>
		    <el-table-column  prop="pay_time" sortable label="支付时间" > </el-table-column>
		    <el-table-column  prop="status"  label="状态"> </el-table-column>
		    <el-table-column  label="img">
						<template scope="scope">
							<img :src="scope.row.img" width="40" height="40" />
						</template>
				</el-table-column>
		    <el-table-column  prop="time" label="提交时间"> </el-table-column>
				<el-table-column  prop="content" label="购买种类"> </el-table-column>
		    <el-table-column  prop="username" label="账户"> </el-table-column>
		    <el-table-column  prop="password" label="密码"> </el-table-column>
		    <el-table-column  prop="code" label="查询CODE"> </el-table-column>
		    <el-table-column  label="操作"> 
		    	 <template slot-scope="scope">
		        <el-button @click.native.prevent="del_data(scope.$index,scope.row.id,tableData)" type="text" size="small">
		          	移除
		        </el-button>
		         <el-button @click.native.prevent="edit_data(scope.row.id,tableData[scope.$index])" type="text" size="small">
		          	编辑
		        </el-button>
		        <el-button @click.native.prevent="show_data(scope.row.id,tableData[scope.$index])" type="text" size="small">
		          	凭证
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
  		
  		<div class="pagebox">
				<el-pagination background layout="total,prev, pager, next" :total="pagetotal" :page-sizes="pagesize"  @current-change="handleCurrentChange">
				</el-pagination>  			
  		</div>
  		
  		<el-dialog title="查看凭证" :visible.sync="dialogFormVisible">
			   <img style="width: 100%;"  v-bind:src="myurl" />
			</el-dialog>
			
			
			
			<el-dialog title="编辑" :visible.sync="dialogFormVisible1">
			  <el-form >
			    <el-form-item label="账号"  >
			      <el-input v-model="deve[0].username" value="" auto-complete="off" placeholder="指派账号"></el-input>
			    </el-form-item>
 			    <el-form-item label="密码"  >
			      <el-input v-model="deve[0].password" auto-complete="off" placeholder="指派密码" value=""></el-input>
			    </el-form-item>
		    	<el-form-item label="状态"  >
			      <el-select style="width: 100%;" v-model="deve[0].pay_status" placeholder="操作状态" >
			        <el-option label="用户不可查询" value="0"></el-option>
			        <el-option label="用户可查询" value="1"></el-option>
			      </el-select>
		    	</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="submit2(deve[0].id)">确 定</el-button>
			  </div>
			</el-dialog>
			
  </div>
  
</template>
 
<script>
  export default {
  	name:'nav2',
    data() {
      return {
        tableData: [],
        currentPage:1, 
        pagesize:10,
        pagetotal:100,
        loading:false,
        search:null,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        myurl:'',
        deve:[{ "username":'', "password":'',"pay_status":0}],
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'payinfo')
				 var _this = this 		 
				 _this.loading=true 
    	 	 axios.post('../data/admindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info 
				  	_this.pagetotal = parseInt(response.data.total.AllNum) 
				  	_this.tableData.time = _this.getLocalTime(_this.tableData.time) 
				  	_this.loading=false 
				  })
				  .catch(function (response) {
				    console.log(response) 
				  }) 
    	 },
			 handleCurrentChange: function(currentPage){ 
			 this.currentPage = currentPage 
			 var _this = this 	
			 _this.loading=true 
			 var params = new URLSearchParams() 
					 params.append('status', 'pagepay')
					 params.append('page', currentPage) 
			 		 axios.post('../data/admindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info 
				  	_this.loading=false 
				  })
			 
			 },
			 	getLocalTime:function(nS) {     
		    		return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17) 
		    },
		     show_data:function(id,rows){
		     	   console.info(rows)
		     		 this.myurl = rows["img"];
		    		 this.dialogFormVisible = true;
		    },
		    del_data:function(index,id,rows){
		    		if(confirm('确认删除?')){
		    			 rows.splice(index,1);
		    			  var _this = this 	
								 _this.loading=true 
								 var params = new URLSearchParams() 
										 params.append('status', 'del_pay')
										 params.append('id', id) 
								 		 axios.post('../data/admindata.php',params)
									  .then(function (response){
									  	alert('删除成功！'); 
									  	_this.getinfo() 
									  	_this.loading=false 
									  })
		    		}
		    },
		    edit_data:function(id,rows){
		    	 console.info(rows)
		    	 this.deve[0] = rows;
		    	 this.dialogFormVisible1 = true
		    },
		    submit1:function(){
		    	var _this = this
		    	if(_this.deve[0].title == ''){
		    		alert('请填写完整');
		    		return false;
		    	}
		    	
		    	var params = new URLSearchParams() 
						 params.append('status', 'add_deve')
						 params.append('weight',_this.deve[0].weight)
						 params.append('year', _this.deve[0].year)
						 params.append('month',_this.deve[0].month)
						 params.append('title', _this.deve[0].title)
						 params.append('top',_this.deve[0].top)
						 var _this = this 		 
						 _this.loading=true 
		    	 	 axios.post('/data/eadmindata.php',params)
						  .then(function (response) {
						  	alert('添加成功！');
						  	_this.getinfo() 
						  	_this.loading=false
						  	_this.dialogFormVisible = false
						  })
						  .catch(function (response) {
						    console.log(response) 
						  }) 
		    },
		    submit2:function(id){
		    	var _this = this
		    	var params = new URLSearchParams() 
						 params.append('status', 'edit_pay')
						 params.append('username',_this.deve[0].username)
						 params.append('password', _this.deve[0].password)
						 params.append('pay_status',_this.deve[0].pay_status)
						 params.append('id',_this.deve[0].id)
						 var _this = this 		 
						 _this.loading=true 
		    	 	 axios.post('../data/admindata.php',params)
						  .then(function (response) {
						  	alert('修改成功！');
						  	_this.getinfo() 
						  	_this.loading=false
						  	_this.dialogFormVisible1 = false
						  })
						  .catch(function (response) {
						    console.log(response) 
						  }) 
		    } 
    },
    mounted:function(){
    	 this.getinfo() 
    } 
  }
</script>