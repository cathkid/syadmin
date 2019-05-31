<template>
  <div align="center">
  		<h5 class="table-menu">FAQ</h5>
  		<div class="search-box">
				 <div class="el-col el-col-4">
						  <el-button  @click="dialogFormVisible = true"  style="float: left;" type="primary">添加</el-button>
				 </div>
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="title" sortable label="标题" > </el-table-column>
		    <el-table-column  prop="content"  label="内容"> </el-table-column>
		    <el-table-column  prop="time"  label="添加时间"> </el-table-column>
		    <el-table-column  label="操作"> 
		    	 <template slot-scope="scope">
		        <el-button @click.native.prevent="del_data(scope.$index,scope.row.id,tableData)" type="text" size="small">
		          	移除
		        </el-button>
		         <el-button @click.native.prevent="edit_data(scope.row.id,tableData[scope.$index])" type="text" size="small">
		          	编辑
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
  		
  		<div class="pagebox">
				<el-pagination background layout="total,prev, pager, next" :total="pagetotal" :page-sizes="pagesize"  @current-change="handleCurrentChange">
				</el-pagination>  			
  		</div>
  		
  		<el-dialog title="添加faq" :visible.sync="dialogFormVisible">
			  <el-form >
			    <el-form-item label="faq标题"  >
			      <el-input v-model="faq[0].title" value="100" auto-complete="off" placeholder="请输入faq标题"></el-input>
			    </el-form-item>
			    
			    <el-form-item label="faq内容"  >
			      <el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="faq[0].content">
					 </el-input>
		    	</el-form-item>
		    	 
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="submit1()">确 定</el-button>
			  </div>
			</el-dialog>
			
			<el-dialog title="编辑" :visible.sync="dialogFormVisible1">
			  <el-form >
			    <el-form-item label="faq标题"  >
			      <el-input v-model="faq[0].title" value="100" auto-complete="off" placeholder="请输入faq标题"></el-input>
			    </el-form-item>
			    
			    <el-form-item label="faq内容"  >
			      <el-input
					  type="textarea"
					  :rows="2"
					  placeholder="请输入内容"
					  v-model="faq[0].content">
					 </el-input>
		    	</el-form-item>
		    	 
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="submit2(faq[0].id)">确 定</el-button>
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
        pagesize:[],
        pagetotal:100,
        loading:false,
        search:null,
        dialogFormVisible:false,
        dialogFormVisible1:false,
        faq:[{ "title":"","content":"","id":0}],
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'faq')
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
					 params.append('status', 'pagedeve')
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
		    del_data:function(index,id,rows){
		    		if(confirm('确认删除?')){
		    			 rows.splice(index,1);
		    			  var _this = this 	
								 _this.loading=true 
								 var params = new URLSearchParams() 
										 params.append('status', 'del_faq')
										 params.append('id', id) 
								 		 axios.post('../data/admindata.php',params)
									  .then(function (response){
									  	alert('删除成功！'); 
									  	_this.getinfo() 
									  	_this.loading=false 
									  })
		    		}
		    } ,
		    edit_data:function(id,rows){
		    	 console.info(rows)
		    	 this.faq[0] = rows;
		    	 this.dialogFormVisible1 = true
		    },
		    submit1:function(){
		    	var _this = this
		    	if(_this.faq[0].title == '' && _this.faq[0].content == ''){
		    		alert('请填写完整');
		    		return false;
		    	}
		    	var params = new URLSearchParams() 
						 params.append('status', 'add_faq')
						 params.append('title',_this.faq[0].title)
						 params.append('content', _this.faq[0].content)
						 var _this = this 		 
						 _this.loading=true 
		    	 	 axios.post('../data/admindata.php',params)
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
		    	if(_this.faq[0].title == '' && _this.faq[0].content == ''){
		    		alert('请填写完整');
		    		return false;
		    	}
		    	var params = new URLSearchParams() 
						 params.append('status', 'edit_faq')
						 params.append('title',_this.faq[0].title)
						 params.append('content', _this.faq[0].content)
						 params.append('id', _this.faq[0].id)
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