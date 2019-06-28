<template>
  <div align="center">
  		<h5 class="table-menu">套餐内容</h5>
  		<div class="search-box">
				 <!--<div class="el-col el-col-4">
						  <el-button  @click="dialogFormVisible = true"  style="float: left;" type="primary">添加</el-button>
				 </div>-->
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="name" sortable label="套餐内容" > </el-table-column>
		    <el-table-column  prop="show"  label="是否展示(0 不展示 , 1展示)"> </el-table-column>
		    <el-table-column  label="操作"> 
		    	 <template slot-scope="scope">
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
			
			<el-dialog title="编辑" :visible.sync="dialogFormVisible1">
			  <el-form >
			    <el-form-item label="套餐内容"  >
			      <el-input v-model="deve[0].name" value="" auto-complete="off" placeholder="套餐内容"></el-input>
			    </el-form-item>
			    <el-form-item label="是否展示"  >
			      <el-select style="width: 100%;" v-model="deve[0].show" placeholder="请选择是否展示" >
			        <el-option label="不展示" value="0">不展示</el-option>
			        <el-option label="展示" value="1">展示</el-option>
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
        deve:[{ "name":'', "show":''}],
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'package')
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
		    edit_data:function(id,rows){
		    	 console.info(rows)
		    	 this.deve[0] = rows;
		    	 this.dialogFormVisible1 = true
		    },
		    submit2:function(id){
		    	var _this = this
		    	if(_this.deve[0].name == ''){
		    		alert('请填写完整');
		    		return false;
		    	}
		    	var params = new URLSearchParams() 
						 params.append('status', 'edit_package')
						 params.append('id', id) 
						 params.append('name',_this.deve[0].name)
						 params.append('show', _this.deve[0].show)
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