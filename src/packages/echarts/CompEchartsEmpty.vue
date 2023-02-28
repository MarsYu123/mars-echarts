<template>
<div class="compEchartsEmpty echarts" :class="$attrs.type">
  <div class="echarts-top">
    <div class="echarts-yaxis">
      <div
        v-for="i in 6"
        :key="i"
        class="item"/>
    </div>
    <div class="echarts-grid">
      <div
        v-for="i in 2"
        :key="i"
        class="row" />
      <div
        v-for="i in 2"
        :key="i"
        class="col"/>
    </div>
  </div>
  <div class="echarts-bottom">
    <div
      v-for="i in 4"
      :key="i"
      class="item"
    />
  </div>
</div>
</template>

<style scoped lang="scss">
@import "../styles/echarts.scss";
.compEchartsEmpty {
  display: flex;
  flex-direction: column;
  .echarts{
   &-top {
     flex: 1;
     display: flex;
     margin-top: .24rem;
   }
    &-yaxis {
      width: .62rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-right: .04rem;
      .item{
        @include wh(100% .28);
        background: #F6F6F6;
      }
    }
    &-grid {
      flex: 1;
      height: 100%;
      border: 1px solid #e5e5e5;
      position: relative;
      .row {
        position: absolute;
        @include wh(100% 1px);
        left: 0;
        top: 33%;
        background: #e5e5e5;
        &+.row{
          top: 66%;
        }
      }
      .col {
        position: absolute;
        @include wh(1px 100%);
        left: 33%;
        top: 0;
        background: #e5e5e5;
        &+.col{
          left: 66%;
        }
      }
    }
    &-bottom{
      margin-top: .08rem;
      padding-left: .6rem;
      display: flex;
      justify-content: space-between;
      .item{
        @include wh(1.14.28);
        background: #F6F6F6;
      }
    }
  }
}
</style>