<template>
  <div>
    <h1>个人中心</h1>

    
    <Login/> 
    
    <!-- 底部 -->
    <div class="footer">
      <van-tabbar v-model="active" active-color="black" inactive-color="#999">
        <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="smile" to="/myDesign">我的设计</van-tabbar-item>
        <van-tabbar-item icon="manager" to="/userCenter"
          >个人中心</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  data() {
    return {
      active: 2,
      
    };
  },
  components:{
      Login,
  }
};
</script>

<style lang="less">
  
</style>