<template>
  <div align="center">
  		<h5 class="table-menu">添加新闻</h5>

		<el-row>
			<el-col :span="12" :offset="6">
				<el-form >
					<el-form-item label="新闻标题"  >
							<el-input v-model="news[0].title" value="" auto-complete="off" placeholder="新闻标题20字节以内"></el-input>
					</el-form-item>
					<el-form-item label="新闻描述"  >
						<el-input v-model="news[0].desc1" value="" auto-complete="off" placeholder="新闻描述40字节以内"></el-input>
					</el-form-item>
					<el-form-item label="新闻图片"  >
						<el-col :span="6" >
						<el-upload
							class="upload-demo"
							action="http://127.0.0.1/data/uploadifive_addnews.php"
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
						</el-col>
						<el-col :span="6" >
								<img style="max-height: 40px" :src ='news[0].img' />
						</el-col>
					</el-form-item>

					<el-form-item  >
					<quill-editor ref="myTextEditor"
												v-model="news[0].content"
												:config="editorOption"
												@blur="onEditorBlur($event)"
												@focus="onEditorFocus($event)"
												@ready="onEditorReady($event)">
					</quill-editor>
					</el-form-item>

					<el-form-item  >
						<el-button type="primary" @click="submit1"> 提交 </el-button>
					</el-form-item>

				</el-form>
			</el-col>
		</el-row>
  		
  </div>
</template>
 
<script>
  export default {
  	name:'nav1',
    data() {
      return {
        tableData: [],
				news:[{'title':'','desc1':'','content':'','img':''}]
      }
    },
    methods:{
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
								uploaddone:function(response, file, fileList){
										console.info(response.fileName)
										this.news[0].img = response.fileName;
								},
								onEditorBlur(editor) {
									console.log('editor blur!', editor)
								},
								onEditorFocus(editor) {
									console.log('editor focus!', editor)
								},
								onEditorReady(editor) {
									console.log('editor ready!', editor)
								},
								onEditorChange({ editor, html, text }) {
									// console.log('editor change!', editor, html, text)
									this.news[0].content = html
								},
      					submit1:function(){
									console.info(this.news[0]);
                  var _this = this
                  if(_this.news[0].title == '' && _this.news[0].content == ''){
                    alert('请填写完整标题和内容');
                    return false;
                  }

                  var params = new URLSearchParams()
                  params.append('status', 'add_news')
                  params.append('title',_this.news[0].title)
                  params.append('content', _this.news[0].content)
                  params.append('desc1',_this.news[0].desc1)
                  params.append('img', _this.news[0].img)
                  var _this = this
                  _this.loading=true
                  axios.post('http://127.0.0.1/data/admindata.php',params)
                    .then(function (response) {
                      alert('添加成功！');
                      _this.loading=false
                      _this.dialogFormVisible = false
                      _this.$router.push({ path:'/frame/nav3'})
                    })
                    .catch(function (response) {
                      console.log(response)
                    })
                }
				},
			mounted:function(){

			}
  }
</script>