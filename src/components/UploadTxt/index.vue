<template>
  <div>
    <input id="txt-upload-input" ref="txt-upload-input" type="file" accept=".txt" class="c-hide" @change="handkeFileChange" >
    <div>
      <el-button style="width:120px; font-size:15px;" size="mini" type="primary" @click="handleUpload">上传TXT文件</el-button>
    </div>
  </div>
</template>

<script>
import {saveSingleFile} from '@/api/file'

export default {
  data() {
    return {
      loading: false,
      fileString:"",
      txtData: {
        header: null,
        results: null,
        filename:"",
        filepath:""
      },
      filepath:"",
      txtheader:[]
    }
  },
  methods: {
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const itemFile = files[0] // only use files[0]
      this.filename= files[0].name
      this.readerData(itemFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      document.getElementById('txt-upload-input').click()
    },
    handkeFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      this.filename=itemFile.name
      this.filepath='/platform/dataset/'+this.filename

      let formData = new FormData();
      formData.append('filePath', this.filepath);
      formData.append('file', itemFile);
      saveSingleFile(formData).then(response=>{
        const data = response.data
      })


      if (!itemFile) return
      this.readerData(itemFile)
      this.$refs['txt-upload-input'].value = null // fix can't select the same excel
    },
    readerData(itemFile) {
      console.log("txt:readerData");
      const reader = new FileReader() // 首先需要实例化FileReader对象：
      reader.readAsText(itemFile, "UTF-8");//读取文件
      reader.onload = e => {
        const data = e.target.result
        var headerArray=data.split("\n")
        for(let i = 0;i<headerArray.length;i++){
          headerArray[i]=headerArray[i].replace(/[\r\n]/g,"")//去掉回车换行符
        }
        const header = headerArray[0].split(",")
        const results = []
        // for(var i=0;i<=columNum;i++){
        // 	header.push(title[i])
        // }
        // console.log((headerArray-1).length)
        // for(var l=0;l<(headerArray-1).length;l++){
        // 	results[l]=[]
        // }

        for(var j=1;j<headerArray.length;j++){
          // var a = JSON.parse(JSON.stringify(j))
          if(headerArray[j] !== ""){
              results[j-1]=headerArray[j].split(",")
          }
        }
        // 	var temp=[]
        // 	 for(var k=0;k<columNum;k++){
        // 	 	var index=k+1
        // 	 	var key="第"+index+"列"
        // 	 	// temp[key]=headerArray[j].split(",")[k]
        // 	 //	temp.push{key:headerArray[j].split(",")[k]}
        // 	 	 temp={
        // 	 	 	key:123,
        // 	 		"第2列":123,

        // 	 	}
        // 	 }

        // 	results[j].push(temp)
        // 	}
        let regex1 = /\d{4}\/\d{1,2}\/\d{1,2}/; //短日期
        let regex2 = /\d{4}年\d{1,2}月\d{1,2}日/; //长日期
        for(let i=0; i<results.length; i++){
            for(let j=0; j<results[i].length; j++){
                if(regex1.exec(results[i][j]) != null){
                    results[i][j] = results[i][j].replace(/\//g,"-");
                }else if(regex2.exec(results[i][j]) != null){
                    results[i][j] = results[i][j].replace(/年/,"-");
                    results[i][j] = results[i][j].replace(/月/,"-");
                    results[i][j] = results[i][j].replace(/日/,"");
                }
            }
        }

        // console.log(header);
        // console.log(results);
        const name=this.filename
        const path=this.filepath

        this.txtData.header = header
        this.txtData.results = results
        this.txtData.filename=name
        this.txtData.filepath=path
        this.$emit('on-selected-file', this.txtData)
        // this.generateDate({ header, results,name,path })

      }
     // reader.readAsArrayBuffer(itemFile) // 读取file对象并存放为ArrayBuffer对象（ArrayBuffer对象是什么我暂时没有搞清，应该是一种为了高效存取数据而产生的数据结构）。
    },
    generateData({ header, results,name,path }) {
      this.txtData.header = header
      this.txtData.results = results
      this.txtData.filename=name
      this.txtData.filepath=path
      console.log(this.txtData);
      this.$emit('on-selected-file', this.txtData)
    },
  }
}
</script>

<style scoped>
#txt-upload-input{
  display: none;
  z-index: -9999;
  color: #bbb;
}
#drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
