<template>
  <div id="finance">
    <div style="margin-bottom:10px;">
           <div style="display:inline-block; margin-right:20px;">
        <span>起始时间</span>
        <DatePicker
          v-model="date"
          format="yyyy-MM-dd"
          type="daterange"
          placement="bottom-end"
          placeholder="选择起始时间"
          style="width: 200px;margin-left:10px;"
          @on-change='changeDate'
        ></DatePicker>
      </div>
      <Input
        icon="ios-search-outline"
        placeholder="请输入关键字"
        v-model="keyword"
        @on-enter="search"
        @on-click="search"
        style="width:200px;"
      />
   
    </div>

    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading" @on-sort-change="sort"></Table>
    <div class="pagebox">
      <Page
        :total="total"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :current="currentPage"
        :page-size="pageSize"
        show-sizer
      />

      <span style="float:left;margin-left: 185px;margin-top:-20px;">共{{total}}条记录</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import expandRow from "./table-expand.vue";
export default {
  components: { expandRow },
  data() {
    return {
      tableTitle: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "订单号",
          key: "orderno",
          sortable:true
        },
        {
          key: "date",
          title: "付款时间",
          sortable:true
        },
        {
          key: "eventtype",
          title: "订单类型",
          sortable:true
        },
        {
          key: "amount",
          title: "金额",
          sortable:true
        },
        {
          key: "memo",
          title: "摘要"
        },
        {
          key: "nick",
          title: "付款人"
        }
      ],
      tableData: [],
      tableLoading: false,
      total: null,
      keyword: "",
      date: [],
      currentPage: 1,
      pageSize: 10,

      column:'date',
      orderby:'desc'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.tableLoading = true;
      let begindate=this.date.length==0?'':this.date[0]
      let enddate=this.date.length==0?'':this.date[1]
      axios
        .post(serverUrl + "/api/pcindex.php?act=getOrderList", {
          keyword: this.keyword,
          currentpage: this.currentPage - 1,
          pagesize: this.pageSize,
          begindate:begindate,
          enddate:enddate,
          column:this.column,
          orderby:this.orderby
        })
        .then(res => {
          console.log(res.data);
          if (res) {
              let arr=res.data.list
              arr.forEach((item,index)=>{
                  item.amount=parseInt(item.amount)
              })
            this.tableData = arr
            this.total = parseInt(res.data.total);
            this.tableLoading = false;
          }
        });
    },
    search() {
      this.currentPage = 1;
      this.fetchData();
    },
    /** 点击某一页 */
    pageChange(index) {
      console.log(index);
      this.currentPage = index;
      this.fetchData();
    },
    /** 改变数量多少 */
    pageSizeChange(size) {
      this.pageSize = size;
      this.fetchData();
    },

    /**选择起始时间 */
    changeDate(){
        console.log(this.date)
        this.currentPage=1
        this.fetchData()
    },

    /**排序 */
    sort(column){
        this.column=column.key
        this.orderby=column.order
        this.currentPage=1
        this.fetchData()
    }
  }
};
</script>

<style>
.pagebox {
  text-align: center;
  margin-top: 20px;
}
</style>

