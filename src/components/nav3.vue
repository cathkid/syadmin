<template>
  <div align="center">
  		<h5 class="table-menu">新闻管理</h5>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="title" label="标题" > </el-table-column>
		    <el-table-column prop="desc" label="简介" > </el-table-column>
				<el-table-column   label="图片">
						<template scope="scope">
							<img :src="scope.row.img" height="40" />
						</template>
				</el-table-column>
		    <el-table-column  label="操作 "> 
		    	 <template  scope="scope">
		        
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
  	name:'nav1',
    data() {
      return {
        tableData: []
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'newslist') 
				 var _this = this 		 
				 //_this.loading=true 
    	 	 axios.post('http://127.0.0.1/data/admindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info 
				  })
				  .catch(function (response) {
				    console.log(response) 
				  }) 
    	 },
    	   handleRemove(file, fileList) {
        	console.log(file, fileList);
	      },
	      handlePreview(file) {
	        console.log(file);
	      },
	      handleExceed(files, fileList) {
	        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
	      },
	      beforeRemove(file, fileList) {
	        return this.$confirm(`确定移除 ${ file.name }？`);
	      },
	      UploadUrl:function(id){
	      	return 'http://127.0.0.1/data/uploadifive.php?id='+id
	      },
	      uploaddone:function(response, file, fileList){
	      	 this.getinfo();
	      }
	      
    },
    mounted:function(){
    	 this.getinfo() 
    } 
  }
</script>