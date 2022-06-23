<template>
    <div class="themes">
          <ThemeItem v-for="t in themeExtends" :key="t.id" :themes="t"></ThemeItem>
    </div>
</template>

<script>
import ThemeItem from "../components/ThemeItem.vue";
export default {
    components:{
        ThemeItem,
},
    created() {
        this.getDatas();
    },
    data() {
        return {
            themeExtends:[],
        }
    },
    methods: {
        getDatas(){
            this.$api.getThemes(this.$route.query.themeId).then(res=>{
                console.log(res);
                this.themeExtends=res.data.body.data.theme.themeExtends;
            })
        }
    },
}
</script>

<style>

</style> 