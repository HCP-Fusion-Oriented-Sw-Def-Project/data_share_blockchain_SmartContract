<template>
  <div>
    <input
      id="excel-upload-input"
      ref="excel-upload-input"
      type="file"
      accept=".xlsx, .xls, .csv"
      class="c-hide"
      @change="handkeFileChange"
    />
    <div>
      <el-button
        style="width:120px;font-size:15px;"
        size="mini"
        type="primary"
        @click="handleUpload"
      >上传CSV文件</el-button>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { saveSingleFile } from "@/api/file";

export default {
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
        filename: "",
        filepath: ""
      },
      filepath: ""
    };
  },
  methods: {
    generateDate({ header, results, name, path }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.excelData.filename = name;
      this.excelData.filepath = path;

      this.$emit("on-selected-file", this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const itemFile = files[0]; // only use files[0]
      this.filename = files[0].name;
      this.readerData(itemFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      document.getElementById("excel-upload-input").click();
    },
    handkeFileChange(e) {
      const files = e.target.files;
      const itemFile = files[0]; // only use files[0]
      this.filename = itemFile.name;

      this.filepath = "/platform/dataset/" + this.filename;
      let formData = new FormData();
      formData.append("filePath", this.filepath);
      formData.append("file", itemFile);
      console.log('itemFile')
      console.log(itemFile)
      saveSingleFile(formData).then(response => {
        const data = response.data;
        console.log("上传文件并保存");
        console.log(data);
      });

      if (!itemFile) return;
      this.readerData(itemFile);
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
    },
    formatDate(numb, format) {
        const time = new Date((numb - 1) * 24 * 3600000 + 1)
        time.setYear(time.getFullYear() - 70)
        const year = time.getFullYear() + ''
        const month = time.getMonth() + 1 + ''
        const date = time.getDate() + ''
        if (format && format.length === 1) {
            return year + format + month + format + date
        }
        return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    readerData(itemFile) {
      const reader = new FileReader(); // 首先需要实例化FileReader对象：
      reader.onload = e => {
        const data = e.target.result;
        const fixedData = this.fixdata(data);
        const workbook = XLSX.read(btoa(fixedData), { type: "base64" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        let regex1 = /\d{1,2}\/\d{1,2}\/\d{2}/; //短日期
        let regex2 = /[A-Za-z]*, [A-Za-z]* \d{2}, \d{4}/; //长日期
        let regex3 = /\d{4}年\d{1,2}月\d{1,2}日/; //长日期2
        for (const i in worksheet) {
            if (worksheet[i].w && (regex1.exec(worksheet[i].w) != null || regex2.exec(worksheet[i].w) != null)) {
                worksheet[i].w = this.formatDate(parseInt(worksheet[i].v), '-')
            }else if(regex3.exec(worksheet[i].v) != null){
                worksheet[i].v = worksheet[i].v.replace(/年/,"-");
                worksheet[i].v = worksheet[i].v.replace(/月/,"-");
                worksheet[i].v = worksheet[i].v.replace(/日/,"");
            }
        }

        const header = this.get_header_row(worksheet);
        const results = XLSX.utils.sheet_to_json(worksheet);
        // console.log("数据表");
        // console.log(results);
        // console.log(header);
        this.$emit("ListenUploadExcel", [results, header]);
        const name = this.filename;
        const path = this.filepath;
        this.generateDate({ header, results, name, path });
      };
      reader.readAsArrayBuffer(itemFile); // 读取file对象并存放为ArrayBuffer对象（ArrayBuffer对象是什么我暂时没有搞清，应该是一种为了高效存取数据而产生的数据结构）。
    },
    fixdata(data) {
      let o = "";
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    get_header_row(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r; /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        var cell =
          sheet[
            XLSX.utils.encode_cell({ c: C, r: R })
          ]; /* find the cell in the first row */
        var hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    }
  }
};
</script>

<style scoped>
#excel-upload-input {
  display: none;
  z-index: -9999;
  color: #bbb;
}
#drop {
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
