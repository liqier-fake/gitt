<template>
  <div class="water-fall">
    
      <div>
        <lazy-component>
            <div class="pic" v-for="t in template1" :key="t.designTemplateId">
                 <router-link :to="`/tempDetail?id=${t.designTemplateId}`">  <img :src="t.designTemplateThumbUrls[0]" alt="" v-lazy="t.designTemplateThumbUrls[0]"  >
            </router-link>
            </div>
        </lazy-component>
      </div>
      <div>
        <lazy-component >
            <div class="pic" v-for="t in template2" :key="t.designTemplateId">
            <router-link :to="`/tempDetail?id=${t.designTemplateId}`">  <img :src="t.designTemplateThumbUrls[0]" alt="" v-lazy="t.designTemplateThumbUrls[0]"  >
            </router-link>
              
            </div>
        </lazy-component>
      </div>
    
     
  </div>
</template>

<script>
export default {
  props: ["templates"],
  data() {
    return {};
  },
  computed: {
    template1() {
     return this.templates.slice(0, this.templates.length / 2);
    },
    template2() {
     return this.templates.slice(this.templates.length / 2, this.templates.length);
    },
  },
};
</script>

<style lang="less" scoped>
.water-fall{
    display: flex;
    &>div{
      .pic{
        margin: 0 .2rem .2rem 0;
      }
        img{
            width: 2.9rem;
            border-radius: .1rem;
            border: 1px solid silver;
        }

    }
}
</style>