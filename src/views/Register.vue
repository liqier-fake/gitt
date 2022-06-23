<template>
    <div class="register">
        <input type="text" placeholder="请输入手机号">
        <input type="text" placeholder="请输入验证码">
        <div class="">

        </div>
        <div class="code">
            获取验证码
        </div>
        <input type="text" placeholder="设置密码">
        <input type="text" placeholder="确认密码">
        <div class="btn">
            注册
        </div>
        <div class="protocol">
            注册即表示同意
            <span>《账号服务协议》</span>
            和
            <span>《隐私协议》</span>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped> 
    .register{
      padding-top: .3rem;
      padding: .3rem .6rem;
       text-align: center;
       input{
           width: 6.48rem;
           padding: .25rem  0;
           font-size: .25rem;
           border: none;
           border-bottom:1px solid gray;
       }
       .code{
           padding: .1rem  .3rem;
           border-radius: .4rem;
           opacity: 0.3;
           background-color: #0773fc;
           color: #fff;
           font-size: .22rem;
           position: absolute;
        margin-top: .15rem;
           right: .5rem;
       }
       .btn{
           height: 0.73rem;
           line-height: .73rem;
           border-radius: .4rem;
           color: #fff;
           font-size:.27rem;
           margin-top: .2rem;
            margin-bottom: .2rem;
            opacity: 0.4;
            background-color: #0773fc;
       }
       .protocol{
           font-size: .18rem;
           color: gray;
           span{
               color: black;
           }
       }
    }
</style>