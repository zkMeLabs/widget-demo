<script setup lang="ts">
defineProps({
  connecting: {
    type: Boolean
  },
  connBtnTxt: {
    type: String,
    required: true
  }
})

defineEmits(['connet'])

const navList = ref(['Stake', 'Defi', 'MEST', 'Vote'])
</script>

<template>
  <div class="header mui-fl-btw mui-fl-vert">
    <div class="logo mui-fl-1">zkMe SDK DEMO</div>
    <div class="logo-mini mui-fl-1">zkMe</div>

    <ul class="mui-fl-vert nav mui-shr-0">
      <li
        v-for="(i, index) of navList"
        :key="index"
        :class="{'active': index === 0, 'taplight': 1}"
      >
        {{ i }}
      </li>
    </ul>

    <div class="mui-fl-1 mui-fl-end">
      <ElButton type="primary" size="large" class="sty1-btn" :loading="connecting" @click="$emit('connet')">{{ connBtnTxt }}</ElButton>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 0;
  max-width: 1024px;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}
.logo,
.logo-mini {
  font-size: 24px;
  font-weight: bold;
}
.logo-mini {
  display: none;
}
/* .nav {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 320px;
} */
.nav li{
  width: 80px;
  padding: 7px 0;
  font-size: 18px;
  text-align: center;
}
.nav li.active {
  border-bottom: 3px solid var(--color-theme);
  padding: 7px 0 4px;
  color: var(--color-theme);
}

@media screen and (max-width: 860px) {
  .nav li {
    width: 60px;
    font-size: 16px;
  }
  .logo{
    font-size: 20px;
  }
}
@media screen and (max-width: 767px) {
  .nav {
    display: none;
  }
  .logo{
    display: none;
  }
  .logo-mini {
    display: block;
  }
}
</style>
