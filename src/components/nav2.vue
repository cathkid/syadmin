<template>
  <div align="center">
  		<h5 class="table-menu">客户留言</h5>
  		<div class="search-box">
				  
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="name" sortable label="姓名" > </el-table-column>
		    <el-table-column  prop="content"  label="主题"> </el-table-column>
		    <el-table-column  prop="country" label="国家"> </el-table-column>
		    <el-table-column  prop="mess" label="内容"> </el-table-column>
		    <el-table-column  prop="time" label="时间"> </el-table-column>
		    <el-table-column  label="操作"> 
		    	 <template slot-scope="scope">
		        <el-button @click.native.prevent="del_data(scope.$index,scope.row.id,tableData)" type="text" size="small">
		          	移除
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
  		
  		<div class="pagebox">
				<el-pagination background layout="total,prev, pager, next" :total="pagetotal" :page-sizes="pagesize"  @current-change="handleCurrentChange">
				</el-pagination>  			
  		</div>
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
        deve:[{ "weight":100, "year":2017,"month":1,"title":'',"content":'',"top":2,"id":0}],
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'bbs')
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
					 params.append('status', 'page_bbs')
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
										 params.append('status', 'del_bbs')
										 params.append('id', id) 
								 		 axios.post('../data/admindata.php',params)
									  .then(function (response){
									  	alert('删除成功！'); 
									  	_this.getinfo() 
									  	_this.loading=false 
									  })
		    		}
		    } ,
    },
    mounted:function(){
    	 this.getinfo() 
    } 
  }
</script>