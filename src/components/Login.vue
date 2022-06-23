<template>
  <van-popup v-model="show" position="bottom" :overlay="true" lock-scroll>
    <div class="login">
      <h1>快捷登录</h1>
      <div v-if="way">
        <input type="text" placeholder="请输入手机号" />
        <div class="codes">
          <input type="text" placeholder="请输入短信验证码" />
          <div class="code">获取验证码</div>
        </div>
      </div>
      <div v-else>
        <input type="text" placeholder="请输入账号/密码" />
        
          <input type="text" placeholder="请输入密码" />
          
       
      </div>

      <div class="login-choose">
        <span @click="chooseWay">{{way?'账号密码登录':'验证码登录'}}</span>
        <span @click="jumpRegister">注册账号</span>
      </div>
      <div class="btn">登录</div>
      <div class="protocol">
        登录即同意
        <span>用户协议</span>
        和
        <span>隐私政策</span>
      </div>
      <div class="other-way">
        <h5>其它方式登录</h5>
        <img src="../assets/img/qq.png" alt="" />
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      way:true,
    };
  },
  methods: {
    jumpRegister() {
      this.$router.push("/Register");
    },
    chooseWay(){
        this.way=!this.way;
    }
  },
};
</script>
<style lang="less" scoped>
.login {
  padding: 0.8rem;
  text-align: center;
  background-image: url(../assets/img/login-bg.png);
  h1 {
    font-size: 0.4rem;
    margin-bottom: 0.47rem;
  }
  input {
    background-color: transparent;
    height: 0.81rem;
    width: 5.79rem;
    color: gray;
    border: none;
    line-height: 0.81rem;
    margin-bottom: 0.2rem;
    outline: none;
    font-size: 0.3rem;
    border-bottom: 1px solid rgb(153, 154, 153);
  }
  .codes {
    position: relative;
  }
  .code {
    position: absolute;

    height: 0.49rem;
    line-height: 0.49rem;
    padding: 0 0.3rem;
    font-size: 0.22rem;
    border-radius: 0.4rem;
    background-color: #f7f8f9;
    right: 0;
    bottom: 0.35rem;
  }
  .login-choose {
    display: flex;
    justify-content: space-between;
    font-size: 0.21rem;
    color: #0773fc;
    margin-bottom: 0.63rem;
  }
  .btn {
    font-size: 0.27rem;
    height: 0.8rem;
    line-height: 0.8rem;
    opacity: 0.4;
    color: #fff;
    border-radius: 0.5rem;
    background-color: #0773fc;
    margin-bottom: 0.2rem;
  }
  .protocol {
    font-size: 0.18rem;
    color: #00000066;
    span {
      color: #0773fc;
    }
    margin-bottom: 0.9rem;
  }
  .other-way {
    display: flex;
    flex-direction: column;
    align-items: center;
    h5 {
      font-size: 0.22rem;
      margin-bottom: 0.34rem;
    }
    img {
      width: 0.85rem;
    }
  }
}
</style>