<template>
  <div class="scene-details">
    <div class="scene-top">
      <div class="search">
        <router-link to="/search">
          <van-search
            placeholder="在当前场景下搜索"
            input-align="center"
            shape="round"
          />
        </router-link>
      </div>
      <div class="scene-title">
        <div class="scroll">
          <span
            @click="changeUse(0, '全部')"
            :class="{ active: name == '全部' }"
            >全部</span
          >
          <span
            @click="changeUse(tag.tagId, tag.name)"
            :class="{ active: name == tag.name }"
            v-for="tag in repoTag"
            :key="tag.tagId"
            >{{ tag.name }}</span
          >

          <div class="tag-wrap">
            <div v-for="tag in repoTag" :key="tag.tagId">
              {{ tag.name }}
            </div>
          </div>
        </div>
        <div class="arrow">
          <van-icon size=".2rem" class-prefix="arrow-up" name="extra" />
        </div>
      </div>
      <div class="scene-option">
        <div class="option-sort">
          <span
            @click="changeSort(s.type)"
            :class="{ blue: sort_type == s.type }"
            v-for="s in sort"
            :key="s.type"
            >{{ s.name }}</span
          >
          <span @click="changShow">筛选</span>
        </div>
        <div class="option-price" v-if="show">
          <span
            @click="changePrice(p.type)"
            :class="{ blue: price_type == p.type }"
            v-for="p in price"
            :key="p.type"
            >{{ p.name }}</span
          >
        </div>
      </div>
    </div>

    <div class="patterns">
      <div class="pic" v-for="p in pattern" :key="p.designTemplateId">
        <router-link :to="`/tempDetail?id=${p.designTemplateId}`">
          <img
            :src="p.designTemplateImageUrl || p.designTemplateThumbUrls[0]"
            alt=""
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repoTag: [],
      pattern: [],
      use_id: 0,
      price_type: 0,
      sort_type: 0,
      name: "全部",
      page_no: 1,
      show: false,
      hide: false,
      sort: [
        { name: "最热", type: 0 },
        { name: "最新", type: 1 },
        { name: "使用最多", type: 2 },
        { name: "最多收藏", type: 3 },
      ],
      price: [
        { name: "全部", type: 0 },
        { name: "免费", type: 1 },
        { name: "付费", type: 2 },
      ],
    };
  },
  created() {
    this.getTag();
    this.getSceneData();
  },
  methods: {
    getTag() {
      var kindId = this.$route.query.kindId;
      this.$api.getType(kindId).then((res) => {
        console.log(res);
        this.repoTag = res.data.body.secondKindInfo.repoTag.use;
        console.log(this.repoTag);
      });
    },
    getSceneData() {
      var sid = this.$route.query.kindId;
      this.$api
        .getTempQuery(
          sid,
          this.use_id,
          this.price_type,
          this.sort_type,
          this.name,
          this.page_no
        )
        .then((res) => {
          console.log(res);
          let cacheUrl = res.data.body.cacheUrl;
          this.$api.getTemplates(cacheUrl).then((res) => {
            console.log(res);
            if (
              res.data.body.totalCount / res.data.body.resultCount + 1 >=
              this.page_no
            ) {
              this.pattern = [...this.pattern, ...res.data.body.templates];
              console.log(this.pattern);
            }
          });
        });
    },
    changeUse(val1, val2) {
      this.use_id = val1;
      this.name = val2;

      this.pattern = [];
      this.getSceneData();
    },
    changePrice(val) {
      this.price_type = val;

      this.pattern = [];
      this.getSceneData();
    },
    changeSort(val) {
      this.sort_type = val;
      this.pattern = [];
      this.getSceneData();
    },
    changShow() {
      this.show = !this.show;
    },
    changehide() {
      this.hide = !this.hide;
    },
  },
};
</script>

<style lang="less" scoped>
.scene-details {
  padding: 0 0.2rem;
  .scene-top {
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 2;
  }
}
.tag-wrap {
  display: flex;
  .tag {
    width: 0.126rem;
    height: 0.51rem;
    border-radius: 0.3rem;
    font-size: 0.2rem;

    background-color: rgb(243, 244, 249);
  }
}
.patterns {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.9rem;
  .pic {
    img {
      width: 2.89rem;
    }
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
  }
}
.option-sort,
.option-price {
  padding: 0.2rem 0;
  span {
    padding: 0.15rem 0.25rem;
    border-radius: 30px;
    background-color: rgb(243, 244, 249);
    font-size: 0.2rem;
    margin-right: 0.2rem;
  }
}
.search {
  background-color: #fff;

  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 1;
  .van-search {
    width: 6rem;
    margin: 0 auto;
  }
}
.blue {
  background-color: #0773fc !important;
  color: #fff;
}
.active::after {
  content: "";
  display: inline-block;
  width: 0.34rem;
  height: 0.05rem;
  border-radius: 3px;
  background-color: #0773fc;
  position: absolute;
  bottom: 0;
  left: calc(50% - 0.34rem / 2);
}
.active {
  font-weight: bold;
  position: relative;
}
.scene-title::-webkit-scrollbar {
  height: 0;
}
.scene-title {
  margin-top: 50px;
  overflow-x: scroll;
  border-bottom: 1px solid #eee;
  position: relative;
  .arrow {
    position: absolute;
    right: 0;
  }
  .scroll {
    display: flex;
    height: 0.72rem;
    line-height: 0.72rem;
    span {
      flex-shrink: 0;
      margin-right: 0.34rem;
      font-size: 0.25rem;
    }
  }
}
</style>