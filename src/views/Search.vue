<template>
  <div class="search">
    <div class="inp">
      <van-search
        v-model="kw"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="getContent"
      >
        <div slot="action" @click="onCancel">取消</div>
      </van-search>
    </div>
    <div v-if="isShow">
      <h1>热门搜索</h1>
      <div class="hot-key">
        <span v-for="k in keys" :key="k.keyword" @click="changeKw(k.keyword)">{{ k.keyword }}</span>
      </div>
      <h1>历史搜索</h1>
      <div class="history-key">
        <span v-for="h in historyWord" :key="h">{{h}}</span>
      </div>
    </div>
    <div v-if="!isShow">
        <div class="search-title">
            <div class="scroll">
                <span :class="{'active':kindId==s.kindId}" @click="handle(s.kindId)" v-for="s in  secondLabels" :key="s.kindId">{{s.kindTitle}}</span>
            </div>
        </div>
        <div class="content-title">
            <h1>{{totalCount}}个模板</h1>
            <div>
                <span :style="{color:order?'gray':'black'}" @click="changeOrder(0)">最热</span> | <span :style="{color:order?'black':'gray'}" @click="changeOrder(1)">最新</span>
            </div>

        </div>
        <div> 
            <WaterFall :templates="templates"/>
        </div>
    </div>
  </div>
</template>

<script>
import WaterFall from "../components/WaterFall.vue";
export default {

    created() {
        this.getKey();
        this.getTitle();

        this.getCk();
    },
    mounted() {
        window.addEventListener('scroll',this.handleBottom);
    },
    beforeDestroy() {
        window.removeEventListener('scroll',this.handleBottom)
    },
    data() {
        return {
            keys: [],
            kw: "",
            secondLabel: [],
            isShow: true,
            kindId: 0,
            pageNo: 1,
            pageSize: 20,
            totalCount: 0,
            order:0,
            templates: [],
            historyWord:[],
        };
    },
    computed: {
        secondLabels() {
            var secondLabelss;
            var str = { kindTitle: "全部", kindId: 0 };
            secondLabelss = [str, ...this.secondLabel];
            return secondLabelss;
        }
    },
    methods: {
        onCancel() {
            this.$router.go(-1);
        
        },
        getKey() {
            this.$api.getSearchKey().then((res) => {
                this.keys = res.data.body.data;
            });
        },
        getTitle() {
            this.$api.getSearchTitle().then(res => {
                this.secondLabel = res.data.body.data.secondLabel;
            });
        },
        
        getContent() {
            
            if(this.historyWord.indexOf(this.kw)==-1){
                this.historyWord.push(this.kw);
            }
            
            console.log(this.historyWord);
            
            this.$cookies.set('historyWord',this.historyWord);
         
            this.isShow=false;

            this.$api.getSearchContent(this.kw, this.pageNo,this.kindId,this.order).then(res => {
                console.log(res);
               
                this.totalCount = res.data.body.totalCount;
                this.templates = [...this.templates, ...res.data.body.templates];
                 
            });
        },
        handleBottom() {
            if (this.$utils.isBottom()) {

                if (this.totalCount > this.pageNo * this.pageSize) {
                    this.pageNo++;
                    this.getContent();
                }
            }
        },
        handle(kindId) {
            this.kindId = kindId;

            // 清空templates
            this.templates=[];

            this.getContent()
        },
        changeOrder(val){
            this.order=val;

            // 清空templates
            this.templates=[];
            this.getContent()
        },
        changeKw(val){
            this.kw=val;

            this.getContent()
        },
        getCk(){
            var arr=this.$cookies.get('historyWord').split(',');
            this.historyWord= [...arr];
            

        }
    },
    components: { WaterFall }
};
</script>

<style lang="less" scoped>
.search {
  padding: 0 0.2rem;
}
h1 {
  font-size: 0.23rem;
  margin-bottom: 0.25rem;
}  
.active::after{
    content: "";
    display:inline-block;
    width: 0.34rem;
    height: 0.05rem;
    border-radius: 3px;
    background-color:#0773fc;
    position: absolute;
    bottom: 0;
    left: calc(50% - 0.34rem/2);
    
}
.active{
    font-weight: bold;
    position: relative;
}
 .search-title::-webkit-scrollbar{height: 0;}
.search-title{
    overflow-x: scroll;
    border-bottom: 1px solid #eee;
    .scroll{
        display: flex;
        height:.72rem;
        line-height: .72rem;
        span{
            flex-shrink: 0;
            margin-right: .34rem;
        }
    }
}
.content-title{
    display: flex;
    justify-content: space-between;
    margin: .3rem 0 .3rem 0;
    h1{
        font-size: .29rem;
        font-weight: normal;
    }
    div{
        span{
            font-size: .20rem;
            color: #000000cc;
        }
    }
}
.hot-key {
  display: flex;
  flex-wrap: wrap;
  span {
    padding: 0.1rem 0.2rem;
    border-radius: 0.5rem;
    background-color: #f3f4f9;
    font-size: 0.2rem;
    margin: 0 0.2rem 0.2rem 0;
  }
}
.history-key{
    display: flex;
   flex-wrap: wrap;
  span {
    padding: 0.1rem 0.2rem;
    border-radius: 0.5rem;
    background-color: #f3f4f9;
    font-size: 0.2rem;
    margin: 0 0.2rem 0.2rem 0;
  }
}
</style>