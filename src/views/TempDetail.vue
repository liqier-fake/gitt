<template>
  <div class="detail">
    <div class="pic-box">
      <img :src="currentTemplate.designTemplateImageUrl" alt="" />
    </div>
    <div class="detail-text">
      <h1>{{ currentTemplate.templateTitle }}</h1>
      <span>{{ currentTemplate.kindTitle }}</span>
      <div class="text"></div>
      <div class="keys" v-if="currentTemplate.keywords">
        <span v-for="(c, i) in currentTemplate.keywords.split(' ')" :key="i">{{
          c
        }}</span>
      </div>
    </div>
    <div class="recommend">
      <h1>为你推荐</h1>
      <div>
        <div class="" v-for="(r, i) in recommendedTemplates" :key="i">
          <div class="pic">
            <img
              :src="r.designTemplateImageUrl"
              alt=""
              @click="changeRoute(r.designTemplateId)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      currentTemplate: {},
      designerInfo: {},
      recommendedTemplates: {},
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(111);
    next();
    this.getData();
  },
  methods: {
    formatKey(str) {
      console.log(111);
      return str.split(" ");
    },
    getData() {
      var id = this.$route.query.id;
      
      this.$api.getDetail(id).then((res) => {
       
        this.currentTemplate = res.data.body.currentTemplate;
        this.designerInfo = res.data.body.designerInfo;
        this.recommendedTemplates = res.data.body.recommendedTemplates;
        console.log(this.currentTemplate);
      });
    },
    changeRoute(id) {
      this.$router.push(`/tempDetail?id=${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  padding: 0 0.2rem;
  background-color: #fff;
  .pic-box {
    border-radius: 0.05rem;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7.1rem;
    height: 7.73rem;
    img {
      width: 4.04rem;
     
    }
    margin-bottom: 0.25rem;
  }
  .detail-text {
    padding: 0 0 0.2rem 0;
    h1 {
      margin-bottom: 0.2rem;
      font-size: 0.3rem;
    }
    & > span {
      color: gray;
      font-size: 0.23rem;
    }
    .keys {
      display: flex;
      flex-wrap: wrap;
      span {
        padding: 0.2rem 0.27rem;
        border-radius: 0.5rem;
        margin: 0.2rem 0.15rem 0 0;
        background-color: #f3f4f9;
      }
    }
  }
  .recommend {
    h1 {
      margin-bottom: 0.2rem;
      font-size: 0.3rem;
    }
    & > div {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      div {
        margin-bottom: 0.2rem;
      }
      img {
        width: 2.89rem;
      }
    }
  }
}
</style>