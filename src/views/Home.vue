<template>
  <div class="home">
      <!-- {{lister}} -->
     <input class="ipt" type="text" placeholder="例如:吃饭睡觉打豆豆,回车添加任务" v-model="txt"  v-on:keydown="addFn"> <button @click="sou">搜索</button>
     <p>总任务: <span>{{lister.length}}</span> <label for=""><input type="checkbox"  @click="soued">未完成</label><label for=""><input type="checkbox" @click="souer">完成</label></p>
     <div v-for="(iteme,index1) in lister" :key="index1">
       {{index1+1}} .
        <span v-if="!iteme.flag">{{iteme.name}}</span>
        <input type="text" v-else v-model="iteme.name" @blur="guang(iteme.id)">
        <button @click="antd(iteme.id)">编辑</button>
        <button @click="shan(iteme.id)">删除</button>
        <button v-if="!iteme.flager" :class="!iteme.flager?'green':'red'"  @click="antder(iteme.id)">未完成</button>
        <button v-else  @click="antded(iteme.id)" :class="iteme.flager?'red':'green'">已完成</button>
      </div>
      <div>
          <div v-for="(item,index) in list" :key="index">
        <dl class="dls">
          <dt><img :src="item.img" alt=""></dt>
          <dd>
            <p>{{item.name}}</p>
          </dd>
           <p class="ps"><button @click="handleDel(index)">-</button> <span>{{item.count}}</span> <button @click="handleAdd(index)">+</button></p>
        </dl>
      </div>
      </div>
      <div class="bottom"> 
         <p>总价: <span>{{total}}</span></p>
       </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      txt:'',
      list: [],
      lister:[
        {name:"吃饭",flag:false,flager:false,id:0,}
        ],
       copyList:[],
    };
  },
  computed: {
    total() {
      console.log(this.list);
      let total = 0;
      this.list.forEach(item => {
        total += item.count * item.price;
      });
      return total;
    }
  },
  methods: {
    handleAdd(index) {
      console.log(this.list[index].count++);
    },
    handleDel(index) {
      if(this.list[index].count>0){
         console.log(this.list[index].count--);
      }
     
    },
    addFn(e){
        if(e.keyCode ===13){
           let obj={
            name:this.txt,
            flag:false,
            flager:false,
            id: new Date()*1,
           }
           this.copyList=JSON.parse(JSON.stringify(this.lister))
           this.lister.push(obj)
        }
    },
    antd(id){
       this.lister.find(item=>item.id === id).flag=true
    },

    antder(id){
         this.lister.find(item=>item.id === id).flager=true
    },
    antded(id){
       this.lister.find(item=>item.id === id).flager=false
    },

    guang(id){
      this.lister.find(item=>item.id===id).flag=false
    },
    shan(id){
     let index=this.lister.filter(item=>item.id===id)
     this.lister.splice(index,1)
    },
    sou(){
     this.lister=this.lister.filter(item=>item.name.includes(this.txt))
    },
    //已完成
    souer(){
      console.log(this.lister)
      this.lister=this.lister.filter(item=>item.flager === true)
      this.copyList=JSON.parse(JSON.stringify(this.lister))
    },
    //未完成
    soued(){
      console.log(this.lister)
      this.lister=this.lister.filter(item=>item.flager === false)
       this.copyList=JSON.parse(JSON.stringify(this.lister))
      }
    },
    created() {
     this.copyList=JSON.parse(JSON.stringify(this.lister))
     console.log(this.copyList);
      axios.get("/getData").then(res => {
      this.list = res.data.data;
    });
    }
   };
</script>
<style>
.home{
    width:100%;
    height:100%;
    position:absolute;
}
.bottom{
   position:fixed;
   top:10px;
   right:20px;
}
.dls {
  display: flex;
  margin-top: 30px;
}
.dls dt {
  width: 200px;
  height: 200px;
}
.dls dt img {
  width: 100%;
  height: 100%;
}
.dls dd {
  flex: 1;
  height: 200px;
  line-height: 200px;
}
.dls .ps{
    height:200px;
    line-height:200px;
}
.ipt{
    width:70%;
    height:35px;
}
.red{
  background:red;
}
.green{
  background:green;
}
</style>

