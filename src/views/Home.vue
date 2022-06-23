<template>
<!-- 主页 -->
  <div class="home">
    <div class="search">
      <router-link to="/search">
         <van-search
        placeholder="200000+ 免费模板任你搜索"
        input-align="center"
        shape="round"
      />
      </router-link>
     
    </div>

    <div class="scene">
      <div v-for="s in scene.slice(0,8)" :key="s.designKindId" class="scene-item" @click="jumpScene(s.designKindId,s.name)">
          <img :src="s.thumbUrl" alt="">
          <p>{{s.name}}</p>
      </div>
    </div>

    <div class="theme">
      <div class="title">
          <h1>推荐专题</h1>
      </div>
      <div class="themes">
<div class="theme-box">
        <div class="theme-item" v-for="(t,i) in theme" :key="t.id" @click="changeThemes(t.id)">
            <p>{{t.title}}</p>
            <span>{{t.themeDescribe}}</span>
            <div class="cicle" :style="{ 'border-top-color':formatColor(i)}">
             
            </div>
        </div>
      </div>
      </div>
    </div>  

      <SceneItem @getother="getOther" :sceneDetail="s" v-for="(s,i) in sceneDetails" :key="i" :i="i" @scroll="getScenes"/>



    <!-- 底部 -->
    <div class="footer">
      <van-tabbar
        v-model="active"
        active-color="black"
        inactive-color="#999"
       
      >
        <van-tabbar-item icon="wap-home"  to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="smile" to="/myDesign">我的设计</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/userCenter">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script >
import SceneItem from "../components/SceneItem.vue";
export default {
  components:{
    SceneItem,
  },
    data() {
        return {
            active: 0,
            scene: [],//分类
            sceneDetails: [],
            theme: [],//主题
            pageN:2,
        };
    },
    created() {
        this.getHomeData();
        this.getTheme();
    },
    mounted() {
      // 添加全局滚动监听
      window.addEventListener('scroll',this.handleBottom);
   
    },
    destroyed() {
      // 去除全局滚动监听
      window.removeEventListener('scroll',this.handleBottom)
    },
    methods: {
        getHomeData() {
            var url = "/api/mobile/main/getMainMiniProgramHomeInfo.do?_dataType=json&_dataClientType=3&client_type=40";
            this.$axios.get(url).then(res => {
                this.scene = res.data.body.data.scene;
                this.sceneDetails = res.data.body.data.sceneDetails.sceneDetail;
                console.log(this.sceneDetails);
            });
        },
        getTheme() {
            var url = "/api/solutionSubject/theme.do?_dataType=json&_dataClientType=3&client_type=40&solutionSubjectId=1&pageNum=1&pageSize=6&templatePageSize=6&type=3&device=2";
            this.$axios.get(url).then(res => {
                this.theme = res.data.body.data.themes;
            });
        },
        getScenes() {
            var url = `/api/mobile/main/getSceneDetail.do?_dataType=json&_dataClientType=3&client_type=40&page_no=${this.pageN}`;
            this.$axios.get(url).then(res => {
                
                // if(res.data.body.data.sceneDetail.length==0){
                //   return
                // }
                this.sceneDetails = [...this.sceneDetails,...res.data.body.data.sceneDetail];
            });
        },
        changeThemes(id){
          this.$router.push('/ThemeDetails?themeId='+id);
        },
        //触底后加载数据
        handleBottom(){
       
            if(this.$utils.isBottom()){
            
              this.getScenes();
              this.pageN++;
            }
         
        },

        formatColor(val) {
            switch (val) {
                case 0:
                    return "#ff406c";
                    break;
                case 1:
                    return "#ffc11b";
                    break;
                case 2:
                    return "#00cb47";
                    break;
                case 3:
                    return "#c86efd";
                    break;
                case 4:
                    return "#3ba9ff";
                    break;
                default:
                    return "#ff406c";
                    break;
            }
        },

        // 跳转到 场景页
        jumpScene(kindId,n){
          this.$router.push(`/sceneDetails?kindId=${kindId}&n=${n}`)
        },
        
          // 换一批
     async getOther(i){
      console.log(i);
      var url=`/capi/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&sid=447&page_size=6&page_no=3&_dataClientType=3`;
      var urlv=await this.$axios.get(url); 
       urlv=urlv.data.body.cacheUrl;
       urlv="/papi/cache"+urlv.split("cache")[1]+"&client_type=40&_dataClientType=3";
      this.$axios.get(urlv).then(res=>{
        console.log(res.data.body.templates);
        if(res){
          console.log(this.sceneDetails);
           this.sceneDetails.splice(i,1,res.data.body);
          console.log(this.sceneDetails);
        }
      })

    }

    },
};
</script>

<style lang="less" scoped>

.home{
  background-color:#eeee;
}
.title{
  padding: .51rem 0 .34rem;
  background-color: #fff;
  h1{
    font-size: .27rem;
    color: #000;
  }
}
.cicle{
  width: 0.85em;
  height: 0.85em;
  border-radius: 50%;
  border: .425rem solid transparent;
  // border-top-color: #0773FC;
  transform: rotate(-45deg);
  position: absolute;
  right: -.35rem;
  bottom: -.35rem;
}
 
    .search{
      background-color: #fff;
        border-bottom: 1px solid #0773FC;
        position: fixed;
        width: 100vw;
        top: 0;
        z-index: 1;
        .van-search{
            width: 6rem;
            margin: 0 auto;
            .van-field__control  {
            height: .58rem !important;
              
            }
        }
    }
    .scene{
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: .5rem 0 .2rem 0;
      margin-top: 55px;
      margin-bottom: .1rem;
      .scene-item{
        width: 1.57rem;
        margin: 0 0 .27rem;
        text-align: center;
        img{
          width: 0.93rem;
          height: 0.93rem;
        }
        p{
          margin-top: .2rem;
          font-size: .20rem;
          color: #000;
          white-space: nowrap;
        }
      }
    }
    .theme{
      background-color: #fff;
    
      padding-left: .2rem;
      .themes{  
        //  width: 97vw;
       
         overflow: scroll;
         padding-right: .2rem;
      }

      .themes::-webkit-scrollbar{height: 0;}
      .theme-box{
        display: flex;
        height: 1.57rem;
        .theme-item:nth-child(1){
          margin-left: 0 !important;
        }
        .theme-item{
          position: relative;
          flex-shrink: 0;
          width: 2.04rem;
          height: 1.1rem;
          border-radius: 2px;
          padding-left: .27rem;
          margin: .2rem 0 .27rem .2rem;
          overflow: hidden;
          box-shadow: 0px 0px 3px 0px #eee;
          p{
            font-size: .23rem;
            font-weight: bold;
            margin-top: .27rem;
          }
          span{
            font-size: .18rem;
            color: #00000099;
          }
        }
      }
    }
</style>