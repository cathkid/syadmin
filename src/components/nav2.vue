<template>
  <div align="center">
  		<h5 class="table-menu">发展路线</h5>
  		<div class="search-box">
				 <div class="el-col el-col-4">
						  <el-button  @click="dialogFormVisible = true"  style="float: left;" type="primary">添加</el-button>
				 </div>
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="weight" sortable label="权重" > </el-table-column>
		    <el-table-column  prop="year"  label="年份"> </el-table-column>
		    <el-table-column  prop="month" label="月份"> </el-table-column>
				<el-table-column  prop="title" label="标题"> </el-table-column>
		    <el-table-column  prop="content" label="内容"> </el-table-column>
		    <el-table-column  label="操作"> 
		    	 <template slot-scope="scope">
		        <el-button @click.native.prevent="del_data(scope.$index,tableData)" type="text" size="small">
		          	移除
		        </el-button>
		         <el-button @click.native.prevent="edit_data(scope.$index,tableData)" type="text" size="small">
		          	编辑
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
  		
  		<div class="pagebox">
				<el-pagination background layout="total,prev, pager, next" :total="pagetotal" :page-sizes="pagesize"  @current-change="handleCurrentChange">
				</el-pagination>  			
  		</div>
  		
  		
  		<el-dialog title="添加发展" :visible.sync="dialogFormVisible">
			  <el-form >
			    <el-form-item label="权重排序" :label-width="formLabelWidth">
			      <el-input v-model="deve.weight" auto-complete="off" placeholder="100的倍数,数值越小越靠前"></el-input>
			    </el-form-item>
			    <el-form-item label="发展年份" :label-width="formLabelWidth">
			      <el-select style="width: 100%;" v-model="deve.year" placeholder="请选择年份" >
			        <el-option label="2017" value="2017"></el-option>
			        <el-option selected="selected" label="2018" value="2018"></el-option>
			        <el-option label="2019" value="2019"></el-option>
			        <el-option label="2020" value="2020"></el-option>
			        <el-option label="2021" value="2021"></el-option>
			        <el-option label="2022" value="2022"></el-option>
			        <el-option label="2023" value="2023"></el-option>
			        <el-option label="2024" value="2024"></el-option>
			      </el-select>
		    	</el-form-item>
			    <el-form-item label="发展月份" :label-width="formLabelWidth">
			      <el-select style="width: 100%;" v-model="deve.month" placeholder="请选择月份" >
			        <el-option label="1" value="1"></el-option>
			        <el-option label="2" value="2"></el-option>
			        <el-option label="3" value="3"></el-option>
			        <el-option label="4" value="4"></el-option>
			        <el-option label="5" value="5"></el-option>
			        <el-option label="6" value="6"></el-option>
			        <el-option label="7" value="7"></el-option>
			        <el-option label="8" value="8"></el-option>
			        <el-option label="9" value="9"></el-option>
			        <el-option label="10" value="10"></el-option>
			        <el-option label="11" value="11"></el-option>
			        <el-option label="12" value="12"></el-option>
			      </el-select>
		    	</el-form-item>		    	
		    	
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        deve:[{ "weight": 0, "year":2017,"month":1,"title":'',"content":''}]
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'deve')
				 var _this = this 		 
				 _this.loading=true 
    	 	 axios.post('http://127.0.0.1/data/admindata.php',params)
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
			 		 axios.post('http://127.0.0.1/data/admindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info 
				  	_this.tableData.time = _this.getLocalTime(_this.tableData.time) 
				  	_this.loading=false 
				  })
			 
			 },
			 	getLocalTime:function(nS) {     
		    		return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17) 
		    },
		    del_data:function(index,rows){
		    		if(confirm('确认删除?')){
		    			 rows.splice(index,1) 
		    		}
		    },
      searchIp:function(){
		    if(this.search == null){
						return;
				}
        var params = new URLSearchParams() 
        params.append('status', 'searchdeve')
        params.append('username',this.search)
        var _this = this 
        _this.loading=true 
        axios.post('http://127.0.0.1/data/admindata.php',params)
          .then(function (response) {
            _this.tableData = response.data.info 
            _this.pagetotal = parseInt(response.data.total.AllNum) 
            _this.tableData.time = _this.getLocalTime(_this.tableData.time) 
            _this.loading=false 
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