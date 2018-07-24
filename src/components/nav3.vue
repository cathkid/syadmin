<template>
  <div align="center">
  		<h5 class="table-menu">新闻管理</h5>
			<div class="search-box">
				<div class="el-col el-col-4">
					<el-button  @click="add_data"  style="float: left;" type="primary">添加</el-button>
				</div>
			</div>
  	  <el-table  v-loading="loading"  :data="tableData" border style="width: 100% overflow: hidden ">
		    <el-table-column prop="id" label="编号" > </el-table-column>
		    <el-table-column prop="title" label="标题" > </el-table-column>
		    <el-table-column prop="desc1" label="简介" > </el-table-column>
				<el-table-column   label="图片">
						<template scope="scope">
							<img :src="scope.row.img" height="40" />
						</template>
				</el-table-column>
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
  		
  </div>
</template>
 
<script>
  export default {
  	name:'nav1',
    data() {
      return {
        tableData: [],
        pagesize:0,
        pagetotal:0,
        loading:false
      }
    },
    methods:{
    	 getinfo:function(){
    	 	 var params = new URLSearchParams() 
						 params.append('status', 'newslist') 
				 var _this = this
         _this.loading=true
         axios.post('/data/admindata.php',params)
				  .then(function (response) {
				  	_this.tableData = response.data.info
            _this.pagetotal = parseInt(response.data.total.AllNum)
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
        params.append('status', 'pagenews_list')
        params.append('page', currentPage)
        axios.post('/data/admindata.php',params)
          .then(function (response) {
            _this.tableData = response.data.info
            _this.loading=false
          })

      },
      del_data:function(index,id,rows){
        if(confirm('确认删除?')){
          rows.splice(index,1);
          var _this = this
          _this.loading=true
          var params = new URLSearchParams()
          params.append('status', 'del_news_list')
          params.append('id', id)
          axios.post('/data/admindata.php',params)
            .then(function (response){
              alert('删除成功！');
              _this.getinfo()
              _this.loading=false
            })
        }
      },
      edit_data:function(id){
          //alert(id);
          this.$router.push({ path:'/frame/newsedit',query:{code:id}})
			},
      add_data:function(id){
        //alert(id);
        this.$router.push({ path:'/frame/newsadd'})
      }
	      
    },
    mounted:function(){
    	 this.getinfo() 
    } 
  }
</script>