(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-607d29b1"],{"3e8f":function(t,e){},"8ff7":function(t,e,i){},a001:function(t,e,i){"use strict";var a=i("8ff7"),n=i.n(a);n.a},a4b6:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Button",{staticStyle:{"margin-bottom":"5px"},attrs:{type:"primary"},on:{click:t.replaceAll}},[t._v("全部替换")]),i("Card",{staticClass:"card",attrs:{title:"活动信息"}},[i("Row",[i("span",{staticClass:"a_info"},[t._v("建立时间:")]),i("span",{staticClass:"a_info_act"},[t._v(t._s(t.aObj.date))])]),i("Row",{staticClass:"margin-top-10"},[i("span",{staticClass:"a_info"},[t._v("活动名称:")]),i("span",{staticClass:"a_info_act"},[t._v(t._s(t.aObj.title))])]),i("Row",{staticClass:"margin-top-10"},[i("span",{staticClass:"a_info"},[t._v("图片:")]),i("span",{staticClass:"a_info_act"},[t._v(t._s(t.aObj.sharepic))])])],1),i("Row",{staticClass:"margin-top-20"},[i("Table",{attrs:{columns:t.tableTitle,data:t.tableData},scopedSlots:t._u([{key:"name",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editName,callback:function(e){t.$set(t.editObj,"editName",e)},expression:"editObj.editName"}}):i("span",[t._v(t._s(a.name))])]}},{key:"pmemo",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editPmemo,callback:function(e){t.$set(t.editObj,"editPmemo",e)},expression:"editObj.editPmemo"}}):i("span",[t._v(t._s(a.pmemo))])]}},{key:"poi",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editPoi,callback:function(e){t.$set(t.editObj,"editPoi",e)},expression:"editObj.editPoi"}}):i("span",[t._v(t._s(a.poi))])]}},{key:"latlng",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editlatlng,callback:function(e){t.$set(t.editObj,"editlatlng",e)},expression:"editObj.editlatlng"}}):i("span",[t._v(t._s(a.latlng))])]}},{key:"memo",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editMemo,callback:function(e){t.$set(t.editObj,"editMemo",e)},expression:"editObj.editMemo"}}):i("span",[t._v(t._s(a.memo))])]}},{key:"qtype",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Select",{staticStyle:{width:"100px"},model:{value:t.editObj.editQtype,callback:function(e){t.$set(t.editObj,"editQtype",e)},expression:"editObj.editQtype"}},t._l(t.typeList,function(e){return i("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1):i("span",[t._v(t._s(a.qtype))])]}},{key:"answer",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("Input",{attrs:{type:"text"},model:{value:t.editObj.editAnswer,callback:function(e){t.$set(t.editObj,"editAnswer",e)},expression:"editObj.editAnswer"}}):i("span",[t._v(t._s(a.answer))])]}},{key:"action",fn:function(e){var a=e.row,n=e.index;return[t.editIndex===n?i("div",[i("Button",{attrs:{size:"small"},on:{click:function(e){return t.saveEdit(a,n)}}},[t._v("保存")]),i("Button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small"},on:{click:function(e){return t.cancelEdit()}}},[t._v("取消")])],1):i("div",[i("Button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.handleEdit(a,n)}}},[t._v("编辑")]),i("Button",{staticStyle:{"margin-left":"4px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.uploadPicture(a,n)}}},[t._v("图片")]),i("Button",{staticStyle:{"margin-left":"4px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.uploadMp3(a,n)}}},[t._v("音频")]),i("Button",{staticStyle:{"margin-left":"4px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.uploadMp4(a,n)}}},[t._v("视频")])],1)]}}])})],1),i("Modal",{attrs:{title:"上传图片"},on:{"on-ok":t.ok,"on-cancel":t.cancel},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[t._l(t.uploadList,function(e){return i("div",{staticClass:"demo-upload-list"},["finished"===e.status?[i("img",{attrs:{src:e.url}}),i("div",{staticClass:"demo-upload-list-cover"},[i("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(i){return t.handleView(e.name)}}}),i("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(i){return t.handleRemove(e)}}})],1)]:[e.showProgress?i("Progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()]],2)}),i("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"58px"},attrs:{"show-upload-list":!1,"on-success":t.handleSuccess,"default-file-list":t.defaultList,format:["jpg"],"max-size":1024,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,data:t.myparams,multiple:"",type:"drag",action:t.uploadImgUrl}},[i("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[i("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),i("Modal",{attrs:{title:"View Image"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[i("div",{staticClass:"imgLarge"},[t.visible?i("img",{staticStyle:{width:"100%"},attrs:{src:t.imgName}}):t._e()])])],2),i("Modal",{attrs:{title:"上传音频"},on:{"on-ok":t.ok,"on-cancel":t.cancel},model:{value:t.modalAvi,callback:function(e){t.modalAvi=e},expression:"modalAvi"}},[i("Upload",{ref:"uploadMp3",attrs:{action:t.uploadMp3Url,format:["mp3"],"max-size":8192,"on-format-error":t.handleFormatMp3,"on-exceeded-size":t.handleMaxSizeMp3,"on-success":t.handleSuccessMp3,"on-remove":t.handleRemoveMp3,data:t.myparams,"default-file-list":t.defaultListofMp3,"show-upload-list":!0,"before-upload":t.handleBeforeUploadMp3,"on-preview":t.linkToMp3}},[i("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传音频")])],1)],1),i("Modal",{attrs:{title:"上传视频"},on:{"on-ok":t.ok,"on-cancel":t.cancel},model:{value:t.modalMp4,callback:function(e){t.modalMp4=e},expression:"modalMp4"}},[i("Upload",{ref:"uploadMp4",attrs:{action:t.uploadMp4Url,format:["mp4"],"max-size":8092,"on-format-error":t.handleFormatMp4,"on-exceeded-size":t.handleMaxSizeMp4,"on-success":t.handleSuccessMp4,"on-remove":t.handleRemoveMp4,data:t.myparamsOfvideo,"default-file-list":t.defaultListofMp4,"show-upload-list":!0,"before-upload":t.handleBeforeUploadMp4,"on-preview":t.linkToMp4}},[i("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传视频")])],1)],1)],1)},n=[],o=(i("28a5"),i("7f7f"),i("bc3a")),s=i.n(o),l=(i("3e8f"),i("69d9")),d=(i("2f62"),{data:function(){return{tableTitle:[{key:"displayorder",title:"序号",width:60},{slot:"name",title:"点位名称",width:90},{slot:"pmemo",title:"点位说明",width:120,ellipsis:!0,tooltip:!0},{slot:"poi",title:"原始gps坐标",width:90},{slot:"latlng",title:"腾讯地图坐标",width:90},{slot:"memo",title:"任务介绍",width:150,ellipsis:!0,tooltip:!0},{slot:"qtype",title:"问题类型",width:90},{slot:"answer",title:"答案",width:150},{slot:"action",title:"操作"}],tableData:[],tableLoading:!1,modal:!1,modalAvi:!1,modalMp4:!1,imgName:"",visible:!1,myparams:{},myparamsOfvideo:{},uploadList:[],currentIndex:0,defaultList:[],defaultListofMp3:[],defaultListofMp4:[],uploadImgUrl:l["serverUrl"]+"/api/pcupload.php",uploadMp3Url:l["serverUrl"]+"/api/mp3upload.php",uploadMp4Url:l["serverUrl"]+"/api/videoupload.php",editIndex:-1,editObj:{editName:"",editPmemo:"",editPoi:"",editlatlng:"",editMemo:"",editQtype:"",editAnswer:""},type:["0","1","2","3","4","5","6"],typeList:l["questionType"]}},created:function(){this.initList()},computed:{aObj:function(){return this.$store.state.app.aObj},openId:function(){return this.$store.state.user.userId}},mounted:function(){this.uploadList=this.$refs.upload.fileList},methods:{initList:function(){var t=this;if(console.log(this.openId),void 0==this.openId||""==this.openId)return this.tableData=[],void console.log(this.tableData);this.tableLoading=!0,s.a.post(l["serverUrl"]+"/api/pcindex.php?act=getTaskList",{aid:this.aObj.aid,openid:this.openId}).then(function(e){e&&(console.log(e.data),t.tableData=e.data,t.tableLoading=!1)})},handleView:function(t){for(var e=0;e<this.uploadList.length;e++)t==this.uploadList[e].name&&(this.imgName=this.uploadList[e].url);this.visible=!0},handleRemove:function(t){var e=this;this.$Modal.confirm({title:"删除确认",content:"确认删除该图片吗？",onOk:function(){var i=e.$refs.upload.fileList,a=i.indexOf(t);e.$refs.upload.fileList.splice(i.indexOf(t),1),e.tableData[e.currentIndex].pics.splice(a,1),s.a.post(l["serverUrl"]+"/api/pcindex.php?act=delPicById",{picid:t.name,openid:e.myparams.uid}).then(function(t){t&&console.log(t.data)})},onCancel:function(){}})},handleSuccess:function(t,e){e.url="http://www.wondfun.com/wanba/api/"+t.files.file.url,e.name=t.files.file.name;var i={displayorder:"0",picid:t.files.file.picid,taskid:t.files.file.taskid,url:e.url};this.tableData[this.currentIndex].pics.push(i)},handleFormatError:function(t){this.$Notice.warning({title:"图片格式错误",desc:"请上传jpg格式的图片！"})},handleMaxSize:function(t){this.$Notice.warning({title:"图片大小超出限制",desc:"图片大小不能超过1M!"})},handleBeforeUpload:function(t){var e=this.uploadList.length<5;return e||this.$Notice.warning({title:"最多只能上传5张图片！"}),e},handleFormatMp3:function(t){this.$Notice.warning({title:"文件格式错误",desc:"请上传mp3格式！"})},handleSuccessMp3:function(t,e){e.url="http://www.wondfun.com/wanba/api/"+t.files.file.url,e.name="试听.mp3",this.tableData[this.currentIndex].media=t.files.file.media,this.tableData[this.currentIndex].url=t.files.file.url,this.$Message.info("音频上传成功")},handleBeforeUploadMp3:function(){this.$refs.uploadMp3.fileList&&this.$refs.uploadMp3.fileList.shift()},handleRemoveMp3:function(t){var e=this;console.log(this.defaultListofMp3),this.$Modal.confirm({title:"音频删除",content:"确认删除该音频吗？",onOk:function(){s.a.post("/api/pcindex.php?act=delMp3ById",{uid:e.myparams.uid,taskid:e.myparams.taskid,url:t.url}).then(function(t){t&&(console.log(t.data),console.log("删除成功"),e.tableData[e.currentIndex].media="0",e.tableData[e.currentIndex].url="",e.defaultListofMp3.name="",e.defaultListofMp3.url="")})},onCancel:function(){}})},handleMaxSizeMp3:function(t){console.log(t),this.$Notice.warning({title:"音频大小超出限制",desc:"请上传小于8M的音频！"})},linkToMp3:function(t){window.open(t.url,"_blank")},handleFormatMp4:function(t){this.$Notice.warning({title:"文件格式错误",desc:"请上传mp4格式！"})},handleMaxSizeMp4:function(t){console.log(t),this.$Notice.warning({title:"视频大小超出限制",desc:"请上传小于8M的视频！"})},handleSuccessMp4:function(t,e){console.log(t),e.url="http://www.wondfun.com/wanba/api/"+t.files.file.url,e.name="试看.mp4",this.tableData[this.currentIndex].media=t.files.file.media,this.tableData[this.currentIndex].url=t.files.file.url,this.$Message.info("视频上传成功")},handleBeforeUploadMp4:function(){this.$refs.uploadMp4.fileList&&this.$refs.uploadMp4.fileList.shift()},handleRemoveMp4:function(t){var e=this;console.log(this.defaultListofMp4),this.$Modal.confirm({title:"视频删除",content:"确认删除该视频吗？",onOk:function(){s.a.post("/api/pcindex.php?act=delMp4ById",{uid:e.myparamsOfvideo.uid,taskid:e.myparamsOfvideo.taskid,url:t.url}).then(function(t){t&&(console.log(t.data),console.log("删除成功"),e.tableData[e.currentIndex].media="0",e.tableData[e.currentIndex].url="",e.defaultListofMp4.name="",e.defaultListofMp4.url="")})},onCancel:function(){}})},linkToMp4:function(t){window.open(t.url,"_blank")},handleEdit:function(t,e){console.log(t),this.editObj.editName=t.name,this.editObj.editPmemo=t.pmemo,this.editObj.editPoi=t.poi,this.editObj.editlatlng=t.latlng,this.editObj.editMemo=t.memo,this.editObj.editQtype=t.qtype,this.editObj.editAnswer=t.answer,this.editIndex=e},saveEdit:function(t,e){if(this.editObj.editName&&this.editObj.editMemo&&this.editObj.editQtype){var i=/^[0-9]+(\.\d+)?[,][0-9]+(\.\d+)?$/;if(this.editObj.editPoi||this.editObj.editlatlng){var a=this.editObj.editPoi||this.editObj.editlatlng;if(i.test(a)){var n=a.split(",");if(n[0]<0||n[0]>90)this.$Modal.error({title:"纬度错误",content:"纬度范围必须在0-90之间!"});else if(n[1]<0||n[1]>180)this.$Modal.error({title:"经度错误",content:"经度必须在0-180之间!"});else{var o=this.editObj.editQtype;if(24!=e){if(-1==this.type.indexOf(o))return void this.$Modal.error({title:"错误",content:"问题类型填写错误，必须是0-6之间的一个数"});if(2==o||6==o){if(!this.editObj.editAnswer)return void this.$Modal.error({title:"错误",content:"问题类型为2或6时，答案不能为空"});if(-1==this.editObj.editAnswer.indexOf("|"))return void this.$Modal.error({title:"错误",content:"问题类型为2或6时，答案必须包含'|'"})}else if((1==o||3==o||4==o)&&!this.editObj.editAnswer)return void this.$Modal.error({title:"错误",content:"问题类型为1、3、4时，答案不能为空"})}this.tableData[e].name=this.editObj.editName,this.tableData[e].pmemo=this.editObj.editPmemo,this.tableData[e].poi=this.editObj.editPoi,this.tableData[e].latlng=this.editObj.editlatlng,this.tableData[e].memo=this.editObj.editMemo,this.tableData[e].qtype=this.editObj.editQtype,this.tableData[e].answer=this.editObj.editAnswer,this.editIndex=-1,this.myparams.taskid=t.taskid,this.myparams.uid=this.openId;var d={uid:this.myparams.uid,poiObj:this.tableData[e]};console.log(d),s.a.post(l["serverUrl"]+"/api/pcindex.php?act=pcEditPoi",d).then(function(t){t&&console.log(t.data)})}}else this.$Modal.error({title:"错误",content:"请输入正确的经纬度格式，例如(30,120)，注意：请用英文的逗号"})}else this.$Modal.error({title:"错误",content:"请至少填写'原始gps坐标'或'腾讯地图坐标'的一种"})}else this.$Modal.error({title:"错误",content:"点位名称、任务介绍、问题类型为必填项！"})},cancelEdit:function(){this.editIndex=-1},uploadPicture:function(t,e){var i=this;this.modal=!0,this.myparams.taskid=t.taskid,this.myparams.uid=this.openId,this.currentIndex=e;var a=t.pics.map(function(t,e){return{name:t.picid,url:t.url}});setTimeout(function(){i.defaultList=a,i.$nextTick(function(){i.uploadList=i.$refs.upload.fileList})},1e3)},uploadMp3:function(t,e){var i=this;this.modalAvi=!0,this.myparams.taskid=t.taskid,this.myparams.uid=this.openId,this.currentIndex=e;var a=[];a.push(t);var n=a.map(function(t,e){if(t.url)return{name:"试听.mp3",url:t.url}});void 0!=n[0]&&setTimeout(function(){i.defaultListofMp3=n,i.$nextTick(function(){})},100)},uploadMp4:function(t,e){var i=this;this.modalMp4=!0,this.myparamsOfvideo.taskid=t.taskid,this.myparamsOfvideo.uid=this.openId,this.currentIndex=e;var a=[];a.push(t);var n=a.map(function(t,e){if(t.url)return{name:"试看.mp4",url:t.url}});void 0!=n[0]&&setTimeout(function(){i.defaultListofMp4=n,i.$nextTick(function(){})},100)},replaceAll:function(){var t=this;this.$Modal.confirm({title:"警告",content:"确认要进行此操作吗？你所有点位的任务都将被替换为系统默认任务。",onOk:function(){s.a.post(l["serverUrl"]+"/api/pcindex.php?act=replaceWithSysTasks",{aid:t.aObj.aid}).then(function(e){e.data.status&&(t.tableData=e.data.tasklist,t.$Message.success("替换成功！"))})},onCancel:function(){}})},ok:function(){},cancel:function(){}}}),r=d,p=(i("a001"),i("2877")),c=Object(p["a"])(r,a,n,!1,null,null,null);e["default"]=c.exports}}]);