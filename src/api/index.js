import Vue from 'vue'

Vue.prototype.$api = {
    // 场景 关键字
    getType(kindId) {
        var url = `/capi/home/getDesignType.do?_dataType=json&client_type=40&second_kind_id=${kindId}&_dataClientType=3`;
        return Vue.prototype.$axios.get(url);
    },
    //场景 模板参数 
    getTempQuery( sid,use_id,price_type,sort_type,name,page_no){
        var url=`/capi/designtemplate/getWxAppTemplateByKindId.do?_dataType=json&client_type=40&fid=0&type=0&page_no=${page_no}&sid=${sid}&is_new=1&price_type=${price_type}&sort_type=${sort_type}&name=${name}&use_id=${use_id}&key=use&_dataClientType=3`;
        return Vue.prototype.$axios.get(url);
    },
     
    // 场景 模板s
    getTemplates(url){
        var path=url.split('/cache')[1];
         path = `/papi/cache${path}`;
        return Vue.prototype.$axios.get(path);
    },
    // 模板
    getDetail(dId) {
        var url = `/capi/designtemplate/getDetailCacheFileUrl.do?_dataType=json&_dataClientType=3`
        
        return Vue.prototype.$axios.post(url,`client_type=40&id=${dId}`,{
        })
    },
    // 主题 主页
    getThemes(themeId) {
        var url = `/api/solutionSubject/themeDetail.do?_dataType=json&_dataClientType=3&client_type=40&themeId=${themeId}&templatePageSize=6`
        return Vue.prototype.$axios.get(url)
    },
    // 主题加载关键字
    getTemp(id,pageNum) {
        var url = `/api/solutionSubject/themeExtend/template.do?_dataType=json&_dataClientType=3&client_type=40&themeExtendId=${id}&pageSize=6&pageNum=${pageNum}`
        return Vue.prototype.$axios.get(url)
    },
    // 搜索关键词
    getSearchKey(id,pageNum) {
        var url = `/api/template/getRecommendKeyword.do?_dataType=json`
        return Vue.prototype.$axios.get(url)
    },
    
    // 搜索
    getSearchContent(kw,pageNo,kindId,order){
        var url='/api/template/wxSmallAppSearch.do?_dataType=json';
        return Vue.prototype.$axios.post(url,
            `client_type=40&pageNo=${pageNo}&pageSize=20&kw=${kw}&second_kind_id=${kindId}&time_order=${order}&use_times_order=0&collection_times_order=0&_dataClientType=3`)
    },
    // 搜索标题
    getSearchTitle(){
        var url='/api/designkind/getDesignKindBasicInfo.do?_dataType=json';
        return Vue.prototype.$axios.post(url,'client_type=40&type=2&_dataClientType=3')

    },

  
    
    
    
}