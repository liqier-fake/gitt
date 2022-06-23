<template>
  <div class="scene-item">
    <!-- 遮罩 -->
      <div class="wrap" v-if="isShow"></div>
    <div class="title">
      <h1>{{ sceneDetail.name }}</h1>
      <span>进入场景</span>
    </div>

    <div class="scene-img">
      <div class="img-box" v-for="t in sceneDetail.templates" :key="t.designTemplateId">
     
        <router-link :to="`/tempDetail?id=`+t.designTemplateId">
          <img :src="t.designTemplateImageUrl" alt=""  v-longpress="handleLongpress(t.designTemplateId)"/>
        </router-link>
      

        <div class="img-wrap" v-if="isShow">
          <div class="wrap-box">
            <img :src="t.designTemplateImageUrl" v-if="active==t.designTemplateId"/>
            <div class="like" v-if="active==t.designTemplateId">
              <img :src="like" alt="" />
              <p>收藏</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scene-btn">
      <div class="scene-more">更多</div>
      <div class="scene-else" @click="getOther">换一批</div>
    </div>

  
  </div>
 
</template>

<script>
 
import like from "../assets/like.png";
export default {
  props: ["sceneDetail",'i'],
  mounted() {
    window.addEventListener('click',this.changeShow)
  },
  destroyed() {
    window.removeEventListener('click',this.changeShow)
  },
  data() {
    return {
      isShow: false,
      like: like,
      active:0,
    };
  },
  methods: {
    changeShow(){
      this.isShow=false;
    },
    handleLongpress(val){
       var that=this;
        return function(){
            that.active=val;
            that.isShow=!that.isShow;
        }
    },
    // 换一批
    getOther(){
      this.$emit('getother',this.i)
    }
  },
};
</script>

<style lang="less" scoped>
.wrap{
  position:fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(0,0,0,0.2);
  filter: blur(50px);
  // z-index: 100;
}
.scene-item {
  // filter: blur(5px);
  background-color: #fff;
  padding: 0 0.2rem;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0.51rem 0 0.34rem;
    background-color: #fff;
    h1 {
      font-size: 0.27rem;
      color: #000;
    }
  }

  .scene-img {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    img {
      width: 1.86rem;
      border-radius: 2px;
      border: 1px solid silver;
      margin-bottom: 0.2rem;
    }
    .img-wrap {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: block;
      // background-color: red;
      z-index: 3;
      .wrap-box{
         width: 4.8rem;
        position: absolute;
        padding: 1.0rem 0;
        // left: calc(50% - 4.8rem / 2);
        // top: calc(50% - 8.53rem/2);
        // background-color: green;
        border: 1px solid #000;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto auto;
        img{
            width: 4.8rem;
        // height: 8.53rem;
        }
      }
      
      .like {
       width: 0.85rem;
        padding-top: .50rem;
        margin: 0 auto;
        img {
          width: 0.85rem !important;
          height: 0.85rem !important;
          margin-bottom: 0;
          border-radius: 50%;
        }
        p {
          text-align: center;
          margin-top: 0.3rem;
          color: #fff;
          font-size: 0.22rem !important;
        }
      }
    }
  }
  .scene-btn {
    display: flex;
    justify-content: space-between;
    margin-top: 0.2rem;
    div {
      width: 2.9rem;
      height: 0.68rem;
      border-radius: 0.4rem;
      background-color: #f3f4f9;
      line-height: 0.68rem;
      font-size: 0.22rem;
      text-align: center;
    }
  }
}
</style>