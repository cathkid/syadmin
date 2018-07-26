<template>
  <div align="center">
  		<h5 class="table-menu">广告图上传</h5>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="name" label="分类" > </el-table-column>
				<el-table-column   label="图片">
						<template scope="scope">
							<img :src="scope.row.img" height="40" />
						</template>
				</el-table-column>
		    <el-table-column  label="操作(只能上传jpg/png文件，且不超过500kb)">
		    	 <template  scope="scope">
		        <el-upload
						  class="upload-demo"
						  :action="UploadUrl(scope.row.id)"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						  :on-success="uploaddone"
						   multiple
						  :limit="1"
						  :on-exceed="handleExceed"
						  :file-list="fileList">
						  <el-button data="scope.row.id" size="small" type="primary">点击上传</el-button>
						</el-upload>
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
        tableData: [],
        currentPage:1, 
        pagesize:[],
        pagetotal:100,
        loading:false,
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams()
						 params.append('status', 'banner')
				 var _this = this
				 //_this.loading=true
    	 	 axios.post('/data/eadmindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info
				  	_this.pagetotal = parseInt(response.data.total.AllNum) 
				  })
				  .catch(function (response) {
				    console.log(response)
				  })
    	 },
    	   handleRemove(file) {
        	console.log(file);
	      },
	      handlePreview(file) {
	        console.log(file);
	      },
	      handleExceed(files) {
	        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
	      },
	      beforeRemove(file) {
	        return this.$confirm(`确定移除 ${ file.name }？`);
	      },
	      UploadUrl:function(id){
	      	return '/data/euploadifive.php?id='+id
	      },
	      uploaddone:function(response, file){
	      	 this.getinfo();
	      },
				 handleCurrentChange: function(currentPage){ 
				 this.currentPage = currentPage 
				 var _this = this 	
				 _this.loading=true 
				 var params = new URLSearchParams() 
						 params.append('status', 'pagebanner')
						 params.append('page', currentPage) 
				 		 axios.post('/data/eadmindata.php',params)
					  .then(function (response) {
					  	_this.tableData = response.data.info 
					  	_this.loading=false 
					  })
				 
				 } 
	      
    },
    mounted:function(){
    	 this.getinfo()
    } 
  }
</script>