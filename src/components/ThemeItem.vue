<template>
  <div class="theme-item">
     
      <p>{{themes.title}}</p>
      <div class="theme-pic">
          <div class="pic" v-for="tp in templates" :key="tp.designTemplateId" >
              <img :src="tp.designTemplateImageUrl" alt="" @click="changeRoute(tp.designTemplateId)"> 
          </div>
           
      </div>
      <div class="more" @click="getMore(themes.id)">加载更多</div>
  </div> 
</template>

<script>
export default {
    data() {
        return {
            templates:[],
            pageNum:2,
            pageSize:6,
        }
    },
    props:['themes'],
    methods: {
         changeRoute(id){
            this.$router.push(`/tempDetail?id=${id}`)
        },
        getMore(id){
            console.log(111);
            this.$api.getTemp(id,this.pageNum).then(res=>{   
                console.log(res);
                if(res.data.body.data.count>this.pageNum*this.pageSize){
                    console.log(res);
                    this.templates=[...this.templates,...res.data.body.data.templates]
                }
                this.pageNum++;
            }) 
        }
    },
    watch:{
        themes:{
            immediate:true,
            handler(val){
                
            this.templates=val.templates;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.more{
    width: 2.6rem;
    height: 0.7rem;
    font-size: .17rem;
    color: #00000019;
    background-color:#f9fafd;
    text-align: center;
    line-height: .7rem;
    border-radius: .5rem;
    margin: 0 auto;
    margin-bottom:.3rem;
}
    .theme-item{
        padding: 0 .2rem;
        p{
            margin: .2rem 0 .4rem 0;
            text-align: center;
            font-size: .27rem;
        }
        .theme-pic{
            display: flex;
            flex-wrap: wrap;
            img{
                width: 2.89rem;
            // height: 3.31rem;
            border-radius: 2px;
            margin: 0 0 .25rem .25rem;
            }
        }
    }
</style>