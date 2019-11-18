<template>
  <div>
    <Button type="primary" icon="ios-add" style="margin-bottom:10px;" @click="clickAdd">新增管理员</Button>
    <Table :columns="tableTitle" :data="tableData" :loading="tableLoading"></Table>

    <Modal :title="modalTitle" v-model="showModal" @on-ok="submitAdd" :loading="modalLoading">
      <Row style="padding-left:20px">
        <div v-if="modalTitle=='新增管理员'">
          <div class="role_text fl">搜索:</div>
          <Col span="12" style="padding-right:10px;margin-left:15px;">
            <Select
              v-model="nickSelect"
              filterable
              remote
              :loading="selectloading"
              @on-query-change="queryChange"
            >
              <Option
                v-for="(option, index) in options"
                :value="option.value"
                :key="index"
              >{{option.label}}</Option>
            </Select>
          </Col>
        </div>
      </Row>
      <Row style="margin-top:30px;padding-left:20px" class="clearfix">
        <div class="role_text">角色:</div>
        <RadioGroup v-model="role" style="margin-left:15px;" @on-change="roleChange">
          <Radio label="super">超级管理员</Radio>
          <Radio label="admin">管理员</Radio>
          <Radio label="user">普通用户</Radio>
        </RadioGroup>
      </Row>
      <Row style="margin-top:20px;padding-left:20px" class="clearfix">
        <div class="role_text fl">权限:</div>
        <div class="fl check_box_holder">
          <!-- <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll1"
              @click.prevent.native="handleCheckAll(1)"
              style="font-weight: bold;"
              :disabled="disabled1"
            >活动管理</Checkbox>
            <CheckboxGroup
              v-model="actManage"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(1)"
            >
              <Checkbox label="活动列表" :disabled="disabled1">活动列表</Checkbox>
            </CheckboxGroup>
          </div> -->

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll2"
              @click.prevent.native="handleCheckAll(2)"
              style="font-weight: bold;"
              :disabled="disabled2"
            >线路管理</Checkbox>
            <CheckboxGroup
              v-model="lineManage"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(2)"
            >
              <Checkbox label="线路审核" :disabled="disabled2">线路审核</Checkbox>
              <Checkbox label="线路编辑" :disabled="disabled2">线路编辑</Checkbox>
            </CheckboxGroup>
          </div>

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll3"
              @click.prevent.native="handleCheckAll(3)"
              style="font-weight: bold;"
              :disabled="disabled3"
            >合伙人管理</Checkbox>
            <CheckboxGroup
              v-model="cityPartner"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(3)"
            >
              <Checkbox label="合伙人申请" :disabled="disabled3">合伙人申请</Checkbox>
            </CheckboxGroup>
          </div>

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll4"
              @click.prevent.native="handleCheckAll(4)"
              style="font-weight: bold;"
              :disabled="disabled4"
            >题库管理</Checkbox>
            <CheckboxGroup
              v-model="quesBank"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(4)"
            >
              <Checkbox label="题库审核" :disabled="disabled4">题库审核</Checkbox>
              <Checkbox label="题库编辑" :disabled="disabled4">题库编辑</Checkbox>
            </CheckboxGroup>
          </div>

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll5"
              @click.prevent.native="handleCheckAll(5)"
              style="font-weight: bold;"
              :disabled="disabled5"
            >系统管理</Checkbox>
            <CheckboxGroup
              v-model="systemManage"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(5)"
            >
              <Checkbox label="角色管理" :disabled="disabled5">角色管理</Checkbox>
              <!-- <Checkbox label="用户管理" :disabled="disabled5">用户管理</Checkbox> -->
              <Checkbox label="系统设置" :disabled="disabled5">系统设置</Checkbox>
            </CheckboxGroup>
          </div>

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll8"
              @click.prevent.native="handleCheckAll(8)"
              style="font-weight: bold;"
              :disabled="disabled8"
            >用户</Checkbox>
            <CheckboxGroup
              v-model="userManage"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(8)"
            >
              <Checkbox label="用户管理" :disabled="disabled8">用户管理</Checkbox>
            </CheckboxGroup>
          </div>

          <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll6"
              @click.prevent.native="handleCheckAll(6)"
              style="font-weight: bold;"
              :disabled="disabled6"
            >投诉管理</Checkbox>
            <CheckboxGroup
              v-model="userSuggest"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(6)"
            >
              <Checkbox label="投诉与建议" :disabled="disabled6">投诉与建议</Checkbox>
            </CheckboxGroup>
          </div>
        <div style="margin-bottom:5px;">
            <Checkbox
              :value="checkAll7"
              @click.prevent.native="handleCheckAll(7)"
              style="font-weight: bold;"
              :disabled="disabled7"
            >财务</Checkbox>
            <CheckboxGroup
              v-model="financeManage"
              style="margin:5px 0 0 20px;"
              @on-change="checkAllGroup(7)"
            >
              <Checkbox label="财务管理" :disabled="disabled7">财务管理</Checkbox>
            </CheckboxGroup>
          </div>
        </div>
      </Row>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "@/common.js";
import { constants } from "crypto";
import {
  activity,
  myquestion,
  line,
  linemanage,
  lineedit,
  cityPartner,
  cityapply,
  system,
  rolemanage,
  settings,
  question,
  itemaudit,
  editques,
  suggest,
  suggestindex,
  finance,
  financemanage,
  user,
  usermanage
} from "./routetext.js";
import { forEach, hasOneOf, objEqual } from "@/libs/tools";
export default {
  data() {
    return {
      tableTitle: [
        {
          key: "num",
          title: "序号"
        },
        {
          key: "nick",
          title: "用户昵称"
        },
        {
          key: "adminrole",
          title: "角色"
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
                      console.log(params.row);
                      this.role = "";
                      this.disabled1 = this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7=this.disabled8= false;
                      this.checkAll1 = this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 =this.checkAll7=this.checkAll8= false;
                      this.actManage = [];
                      this.lineManage = [];
                      this.cityPartner = [];
                      this.quesBank = [];
                      this.systemManage = [];
                      this.userSuggest = [];
                      this.financeManage=[]
                      this.userManage=[]

                      this.routeArray = [];
                      this.role = params.row.adminrole;

                      this.checkLimit(params.row.adminrole,params.row.menu);

                      this.modalTitle = "管理员修改";
                      this.uid = params.row.openid;
                      this.showModal = true;
                    }
                  }
                },
                "管理"
              )
            ]);
          }
        }
      ],
      tableData: [],
      tableLoading: false,
      modalTitle: "",
      showModal: false,
      selectloading: false,
      modalLoading: true,
      options: [],
      nickSelect: "", //选择的用户
      role: "", //选择的角色
      actManage: [],
      checkAll1: false,

      myquesManage:[],
      lineManage: [],
      checkAll2: false,
      cityPartner: [],
      checkAll3: false,
      quesBank: [],
      checkAll4: false,
      systemManage: [],
      checkAll5: false,
      userSuggest: [],
      checkAll6: false,
      financeManage:[],
      checkAll7:false,
      userManage:[],
      checkAll8:false,

      routeArray: [],
      disabled1: false,
      disabled2: false,
      disabled3: false,
      disabled4: false,
      disabled5: false,
      disabled6: false,
      disabled7:false,
      disabled8:false,
      uid: ""
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
        .post(serverUrl + "/api/pcindex.php?act=getAdminList", {
          uid: this.openid,
          token: this.token
        })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            let arr = res.data;
            arr.forEach((item, index) => {
              item.num = index + 1;
            });
            this.tableData = arr;
            this.tableLoading = false;
          }
        });
    },
    /** 递归路由数组获得该用户的权限 */
    findLimits(menus) {
      let check = [];
      forEach(menus, menu => {
        if (menu.children && menu.children.length !== 0) {
          menu.children.map(item => {
            check.push(item.name);
          });
        }
      });
      return check;
    },

    checkLimit(role,menus) {
      let arr = this.findLimits(menus);
      if(role=='super'){
        this.disabled1 = this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7=this.disabled8= true;
        this.checkAll1 = this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 =this.checkAll7=this.checkAll8= true;
        this.actManage = ["活动列表"];
        this.myquesManage=["我的题库"]
        this.lineManage = ["线路审核", "线路编辑"];
        this.cityPartner = ["合伙人申请"];
        this.quesBank = ["题库审核", "题库编辑"];
        this.systemManage = ["角色管理","系统设置"];
        this.userSuggest = ["投诉与建议"];
        this.financeManage=["财务管理"]
        this.userManage=["用户管理"]
      } else if(role=='admin'){
          this.disabled5 = true;
      }
    if (arr.indexOf("活动列表") != -1) {
        this.actManage.push("活动列表");
      }
      if (arr.indexOf("我的题库") != -1) {
        this.myquesManage.push("我的题库");
      }
      if (arr.indexOf("线路审核") != -1) {
        this.lineManage.push("线路审核");
      }
      if (arr.indexOf("线路编辑") != -1) {
        this.lineManage.push("线路编辑");
      }
      if (arr.indexOf("合伙人申请") != -1) {
        this.cityPartner.push("合伙人申请");
      }
      if (arr.indexOf("题库审核") != -1) {
        this.quesBank.push("题库审核");
      }
      if (arr.indexOf("题库编辑") != -1) {
        this.quesBank.push("题库编辑");
      }
      if (arr.indexOf("角色管理") != -1) {
        this.systemManage.push("角色管理");
      }
      // if(arr.indexOf("用户管理")!=-1){
      //   this.systemManage.push("用户管理")
      // }
      if (arr.indexOf("系统设置") != -1) {
        this.systemManage.push("系统设置");
      }
      if (arr.indexOf("投诉与建议") != -1) {
        this.userSuggest.push("投诉与建议");
      }
      if(arr.indexOf("财务管理")!=-1){
        this.financeManage.push("财务管理")
      }
      if(arr.indexOf("用户管理")!=-1){
        this.userManage.push("用户管理")
      }
      if (this.actManage.length == 1) this.checkAll1 = true;
      if (this.lineManage.length == 2) this.checkAll2 = true;
      if (this.cityPartner.length == 1) this.checkAll3 = true;
      if (this.quesBank.length == 2) this.checkAll4 = true;
      if (this.systemManage.length == 2) this.checkAll5 = true;
      if (this.userSuggest.length == 1) this.checkAll6 = true;
      if (this.financeManage.length == 1) this.checkAll7 = true;
      if(this.userManage.length==1)this.checkAll8=true
      
    },

    /**点击新增按钮 */
    clickAdd() {
      this.modalTitle = "新增管理员";
      this.showModal = true;
      this.role = "";
      this.disabled1 = this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7=this.disabled8= false;
      this.checkAll1 = this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 = this.checkAll7=this.checkAll8= false;
      this.actManage = [];
      this.myquesManage=[]
      this.lineManage = [];
      this.cityPartner = [];
      this.quesBank = [];
      this.systemManage = [];
      this.userSuggest = [];
      this.financeManage=[]
      this.userManage=[]
    },

    /** 搜索功能 */
    queryChange(query) {
      if (query !== "") {
        this.selectloading = true;
        axios
          .post(serverUrl + "/api/pcindex.php?act=getUserByNick", { nick: query })
          .then(res => {
            console.log(res.data);
            let arr = res.data;
            if (res.data) {
              const list = arr.map(item => {
                return {
                  value: item.openid,
                  label: item.nick
                };
              });
              this.options = list.filter(
                item =>
                  item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
              );
            }
          });
      } else {
        this.options = [];
      }
    },

    /** 角色切换时 */
    roleChange(role) {
      this.disabled1 = this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7 =this.disabled8= false;
      this.checkAll1 = this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 =this.checkAll7= this.checkAll8=false;
      this.actManage = [];
      this.myquesManage=[]
      this.lineManage = [];
      this.cityPartner = [];
      this.quesBank = [];
      this.systemManage = [];
      this.userSuggest = [];
      this.financeManage=[]
      this.userManage=[]
      if (role == "super") {
        this.disabled1 = this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7=this.disabled8= true;
        this.checkAll1 = this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 =this.checkAll7= this.checkAll8=true;
        this.actManage = ["活动列表"];
        this.myquesManage=["我的题库"]
        this.lineManage = ["线路审核", "线路编辑"];
        this.cityPartner = ["合伙人申请"];
        this.quesBank = ["题库审核", "题库编辑"];
        this.systemManage = ["角色管理", "系统设置"];
        this.userSuggest = ["投诉与建议"];
        this.financeManage=["财务管理"]
        this.userManage=['用户管理']
      } else if (role == "user") {
        this.checkAll1 = true;
        this.disabled2 = this.disabled3 = this.disabled4 = this.disabled5 = this.disabled6 =this.disabled7=this.disabled8= true;
        this.checkAll2 = this.checkAll3 = this.checkAll4 = this.checkAll5 = this.checkAll6 =this.checkAll7=this.checkAll8= false;
        this.actManage = ["活动列表"];
        this.myquesManage=["我的题库"]
      } else if (role == "admin") {
        this.disabled5 = true;
      }
    },
    /** 点击全选 */
    handleCheckAll(num) {
      if (num == 1) {
        this.checkAll1 = !this.checkAll1;
        if (this.checkAll1) {
          this.actManage = ["活动列表"];
        } else {
          this.actManage = [];
        }
      } else if (num == 2) {
        this.checkAll2 = !this.checkAll2;
        if (this.checkAll2) {
          this.lineManage = ["线路审核", "线路编辑"];
        } else {
          this.lineManage = [];
        }
      } else if (num == 3) {
        this.checkAll3 = !this.checkAll3;
        if (this.checkAll3) {
          this.cityPartner = ["合伙人申请"];
        } else {
          this.cityPartner = [];
        }
      } else if (num == 4) {
        this.checkAll4 = !this.checkAll4;
        if (this.checkAll4) {
          this.quesBank = ["题库审核", "题库编辑"];
        } else {
          this.quesBank = [];
        }
      } else if (num == 5) {
        this.checkAll5 = !this.checkAll5;
        if (this.checkAll5) {
          this.systemManage = ["角色管理","系统设置"];
        } else {
          this.systemManage = [];
        }
      } else if (num == 6) {
        this.checkAll6 = !this.checkAll6;
        if (this.checkAll6) {
          this.userSuggest = ["投诉与建议"];
        } else {
          this.userSuggest = [];
        }
      }else if(num==7){
        this.checkAll7=!this.checkAll7
        if (this.checkAll7) {
          this.financeManage = ['财务管理'];
        } else {
          this.financeManage= [];
        }
      }else if(num==8){
        this.checkAll8=!this.checkAll8
        if (this.checkAll8) {
          this.userManage = ['用户管理'];
        } else {
          this.userManage= [];
        }
      }
    },

    /** 所有都选中时，全选按钮 */
    checkAllGroup(num) {
      if (num == 1) {
        if (this.actManage.length == 1) {
          this.checkAll1 = true;
        } else {
          this.checkAll1 = false;
        }
      } else if (num == 2) {
        if (this.lineManage.length == 2) {
          this.checkAll2 = true;
        } else {
          this.checkAll2 = false;
        }
      } else if (num == 3) {
        if (this.cityPartner.length == 1) {
          this.checkAll3 = true;
        } else {
          this.checkAll3 = false;
        }
      } else if (num == 4) {
        if (this.quesBank.length == 2) {
          this.checkAll4 = true;
        } else {
          this.checkAll4 = false;
        }
      } else if (num == 5) {
        if (this.systemManage.length == 2) {
          this.checkAll5 = true;
        } else {
          this.checkAll5 = false;
        }
      } else if (num == 6) {
        if (this.userSuggest.length == 1) {
          this.checkAll6 = true;
        } else {
          this.checkAll6 = false;
        }
      }else if (num == 7) {
        if (this.financeManage.length == 1) {
          this.checkAll7= true;
        } else {
          this.checkAll7= false;
        }
      }else if (num == 8) {
        if (this.userManage.length == 1) {
          this.checkAll8= true;
        } else {
          this.checkAll8= false;
        }
      }
    },
    /** 远程搜索 */
    remoteMethod(query) {
      if (query !== "") {
        this.selectloading = true;
        setTimeout(() => {
          this.selectloading = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options = [];
      }
    },

    /** 提交新增管理员 */
    submitAdd() {

        this.routeArray.push(activity);
        this.routeArray.push(myquestion)
      if (this.lineManage.length != 0) {
        let arrChild = [];
        if (this.lineManage.indexOf("线路审核") != -1) {

          arrChild.push(linemanage[0]);
          arrChild.push(linemanage[1]);
        }
        if (this.lineManage.indexOf("线路编辑") != -1) {
          arrChild.push(lineedit[0]);
          arrChild.push(lineedit[1])
        }
        line.children = arrChild;
        this.routeArray.push(line);
      }

      if (this.quesBank.length != 0) {
        let arrChild = [];
        if (this.quesBank.indexOf("题库审核") != -1) {

          arrChild.push(itemaudit[0]);
        }
        if (this.quesBank.indexOf("题库编辑") != -1) {
    
          arrChild.push(editques[0]);
        }
        question.children = arrChild;
        this.routeArray.push(question);
      }
      if (this.cityPartner.length != 0) {
        let arrChild = [];
        if (this.cityPartner.indexOf("合伙人申请") != -1) {

          arrChild.push(cityapply[0]);
        }
        cityPartner.children = arrChild;
        this.routeArray.push(cityPartner);
      }
      if (this.userSuggest.length != 0) {
        let arrChild = [];
        if (this.userSuggest.indexOf("投诉与建议") != -1) {
 
          arrChild.push(suggestindex[0]);
        }
        suggest.children = arrChild;
        this.routeArray.push(suggest);
      }
      if (this.financeManage.length != 0) {
        let arrChild = [];
        if (this.financeManage.indexOf("财务管理") != -1) {
          arrChild.push(financemanage[0]);
        }
        finance.children = arrChild;
        this.routeArray.push(finance);
      }

       if (this.userManage.length != 0) {
        let arrChild = [];
        if (this.userManage.indexOf("用户管理") != -1) {
          arrChild.push(usermanage[0]);
        }
        user.children = arrChild;
        this.routeArray.push(user);
      }

      if (this.systemManage.length != 0) {
        let arrChild = [];
        if (this.systemManage.indexOf("角色管理") != -1) {

          arrChild.push(rolemanage[0]);
        }
        if (this.systemManage.indexOf("系统设置") != -1) {

          arrChild.push(settings[0]);
        }
        // if(this.systemManage.indexOf("用户管理")!=-1){
        //   arrChild.push(usermanage[0])
        // }
        system.children = arrChild;
        this.routeArray.push(system);
      }

      if (this.modalTitle == "新增管理员") {
        if (
          this.nickSelect == "" ||
          this.role == "" 
        ) {
          setTimeout(() => {
            //解决modal的确定按钮关闭问题
            this.modalLoading = false;
            this.$nextTick(() => {
              this.$Message.error("*星号为必填项！");
              this.modalLoading = true;
            });
          }, 500);
        } else {
          axios
            .post(serverUrl + "/api/pcindex.php?act=assignUserAccess", {
              openid: this.nickSelect,
              adminrole: this.role,
              menu: this.routeArray
            })
            .then(res => {
              if (res.data.status) {
                this.modalLoading = false;
                this.showModal = false;
                this.routeArray = [];
                this.fetchData();
              }
            });
        }
      } else if (this.modalTitle == "管理员修改") {
          console.log(this.modalTitle)
        if (this.role == "") {
          setTimeout(() => {
            //解决modal的确定按钮关闭问题
            this.modalLoading = false;
            this.$nextTick(() => {
              this.$Message.error("*星号为必填项！");
              this.modalLoading = true;
            });
          }, 500);
        } else {
          console.log(this.routeArray);
          axios
            .post(serverUrl + "/api/pcindex.php?act=assignUserAccess", {
              openid: this.uid,
              adminrole: this.role,
              menu: this.routeArray
            })
            .then(res => {
              console.log(res.data);
              if (res.data.status) {
                this.modalLoading = false;
                this.showModal = false;
                this.routeArray = [];
                this.fetchData();
              }
            });
        }
      }
    }
  }
};
</script>

<style>
.role_text::before {
  content: "*";
  color: red;
}
.role_text {
  display: inline-block;
}
.check_box_holder {
  width: 270px;
  margin-left: 15px;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
  font-size: 0;
}
.fl {
  float: left;
}
</style>
