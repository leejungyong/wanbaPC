<template>
  <div id="line_edit">
    <Input
      icon="ios-search-outline"
      placeholder="请输入关键字"
      v-model="keyword"
      @on-enter="searchUser"
      @on-click="searchUser"
      style="width:200px;margin-bottom:10px;"
    />
    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>
    <div class="pagebox">
      <Page
        :total="total"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :current="currentPage"
        :page-size="pageSize"
        show-sizer
      />

      <span style="float:left;margin-left: 185px;margin-top:-20px;">共{{total}}条线路</span>
    </div>
    <Modal v-model="showEdit" title="线路编辑" @on-ok="submitEdit" :loading="modalLoading">
      <p class="text_line">
        <i>*</i> 线路名称
      </p>
      <Input v-model="lineObjEdit.title" />
      <p class="text_line">
        <i>*</i>背景故事
      </p>
      <Input v-model="lineObjEdit.memo1" type="textarea" :rows="4" placeholder />
      <p class="text_line">
        <i>*</i>经典玩法
      </p>
      <Input v-model="lineObjEdit.memo2" type="textarea" :rows="4" placeholder />
      <p class="text_line">
        <i>*</i>场景介绍
      </p>
      <Input v-model="lineObjEdit.memo3" type="textarea" :rows="4" placeholder />
      <p class="text_line">
        <i>*</i>区域
      </p>
      <Input v-model="lineObjEdit.city" placeholder="多个区域请用|符号分隔，例如 杭州|浙江|江浙沪" />
      <p class="text_line">标签</p>
      <Input v-model="lineObjEdit.tag" placeholder="如 古镇|定向" />
      <p class="text_line">定价</p>
      <!-- <Input style="width:200px;" /> -->
      <InputNumber :max="99" :min="0" v-model="lineObjEdit.price" placeholder="请输入0-99之间的数字"></InputNumber>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import { setTimeout } from "timers";
import { truncate } from "fs";
export default {
  data() {
    return {
      tableTitle: [
        {
          key: "num",
          title: "序号",
          width: 80
        },
        {
          key: "title",
          title: "线路",
          width: 100
        },
        {
          key: "memo1",
          title: "背景故事",
          ellipsis: true,
          width: 230,
          tooltip: true
        },
        {
          key: "memo2",
          title: "经典玩法",
          ellipsis: true,
          width: 230,
          tooltip: true
        },
        {
          key: "memo3",
          title: "场景介绍",
          ellipsis: true,
          width: 240,
          tooltip: true
        },
        {
          key: "action",
          title: "操作",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showEdit = true;
                      this.lineObjEdit.aid = params.row.aid;
                      this.lineObjEdit.title = params.row.title;
                      this.lineObjEdit.memo1 = params.row.memo1;
                      this.lineObjEdit.memo2 = params.row.memo2;
                      this.lineObjEdit.memo3 = params.row.memo3;
                      this.lineObjEdit.city = params.row.city;
                      this.lineObjEdit.tag = params.row.tag;
                      this.lineObjEdit.price=parseInt(params.row.price) ;
                      this._index=params.row._index
                      console.log(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      //    this.$router.push({name:'点位修改',params:{applyid:params.row.id,aid:params.row.aid,title:params.row.title,nick:params.row.nick,date:params.row.date,route_desc:params.row.memo}})
                      this.$router.push({
                        name: "点位修改",
                        params: { aid: params.row.aid }
                      });
                    }
                  }
                },
                "点位"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                      this.$Modal.confirm({
                        title: "删除确认",
                        content: "确认删除该线路吗？",
                        onOk: () => {
                          this.tableData.splice(params.row._index, 1);
                          axios
                            .post(
                              serverUrl + "/api/pcindex.php?act=delRouteByAid",
                              { aid: params.row.aid }
                            )
                            .then(res => {
                              // console.log(res.data);
                              if (res.data.status) {
                                this.$Message.success("删除成功！");
                                this.fetchData();
                              }
                            });
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      tableLoading: false,
      showEdit: false,
      lineObjEdit: {
        aid: "",
        title: "",
        memo1: "",
        memo2: "",
        memo3: "",
        city: "",
        tag: "",
        price:99
      },
      modalLoading: true,
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      total: null,
      _index:null
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    openid() {
      return this.$store.state.user.userId;
    },
    token() {
      return this.$store.state.user.token;
    }
  },
  methods: {
    fetchData() {
      this.tableLoading = true;
      axios
        .post(serverUrl + "/api/pcindex.php?act=getRouteList", {
          uid: this.openid,
          token: this.token,
          keyword: this.keyword,
          currentpage: this.currentPage - 1,
          pagesize: this.pageSize
        })
        .then(res => {
          if(res.data){

          }
          let arr = res.data.list;
          this.total=parseInt(res.data.count) 
          console.log(res.data);
          arr.forEach((item, index) => {
            item.num = index + 1;
            item.memo1 = item.route_desc.memo1;
            item.memo2 = item.route_desc.memo2;
            item.memo3 = item.route_desc.memo3;
          });

          (this.tableData = arr), (this.tableLoading = false);
         
        });
    },

    /** 提交线路编辑 */
    submitEdit() {
      if (
        this.lineObjEdit.title == "" ||
        this.lineObjEdit.memo1 == "" ||
        this.lineObjEdit.memo2 == "" ||
        this.lineObjEdit.memo3 == "" ||
        this.lineObjEdit.city == ""
      ) {
        setTimeout(() => {
          this.modalLoading = false;
          this.$nextTick(() => {
            this.$Message.error("*星号为必填项！");
            this.modalLoading = true;
          }, 500);
        });
      } else {
        if(this.lineObjEdit.price==''){
          this.lineObjEdit.price=0
        }
        console.log(this.lineObjEdit)
        axios
          .post(
            serverUrl + "/api/pcindex.php?act=editRouteList",
            this.lineObjEdit
          )
          .then(res => {
            console.log(res.data);
            if (res.data.status) {
              this.modalLoading = false;
              this.showEdit = false;
              this.tableData[this._index].title=this.lineObjEdit.title
              this.tableData[this._index].memo1=this.lineObjEdit.memo1
              this.tableData[this._index].memo2=this.lineObjEdit.memo2
              this.tableData[this._index].memo3=this.lineObjEdit.memo3
              this.tableData[this._index].city=this.lineObjEdit.city
              this.tableData[this._index].tag=this.lineObjEdit.tag
              this.tableData[this._index].price=this.lineObjEdit.price
              this.$Message.success("修改成功!");

            }
          });
      }
    },
    /** 点击某一页 */
    pageChange(index) {
      this.currentPage = index;
      this.fetchData();
    },
    /** 改变数量多少 */
    pageSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },
    /** 搜索框查询 */
    searchUser() {
      this.currentPage = 1;
      this.tableLoading = true;
      this.fetchData()
      // axios
      //   .post(serverUrl + "/api/pcindex.php?act=getUserList", {
      //     keyword: this.keyword,
      //     currentpage: this.currentPage - 1,
      //     pagesize: this.pageSize
      //   })
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data) {
      //       this.total = parseInt(res.data.total);
      //       let arr = res.data.list;
      //       arr.forEach((item, index) => {
      //         // item.num=(this.currentPage-1)*this.pageSize+index+1
      //         item.date = new Date(parseInt(item.date) * 1000)
      //           .toLocaleString()
      //           .replace(/:\d{1,2}$/, " ");
      //         item.lastlogin = new Date(parseInt(item.lastlogin) * 1000)
      //           .toLocaleString()
      //           .replace(/:\d{1,2}$/, " ");
      //       });
      //       this.tableData = arr;
      //       this.tableLoading = false;
      //     }
      //   });
    }
  }
};
</script>

<style lang="less">
.text_line i {
  color: red;
}

.text_line {
  margin: 5px 0;
}
.pagebox {
  text-align: center;
  margin-top: 20px;
}
</style>

