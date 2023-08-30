<script setup lang="ts">
import { useChain } from '@/composables'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  balance: {
    type: [String, Number],
    required: true
  },
  stakeBtnTxt: {
    type: String
  },
  staking: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'update:staking', 'stake'])

const activeName = ref('stake')
const { cluster } = useChain()

const amount = computed({
  get () {
    return props.modelValue.toString()
  },
  set (val) {
    emit('update:modelValue', val)
  }
})

function handleInput (val: string) {
  amount.value = val.replace(/[^\d.]/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
}
</script>

<template>
  <div class="stake-wrap">
    <ElTabs v-model="activeName" class="sty1-tabs mui-fl-central">
      <ElTab-pane label="Stake" name="stake"></ElTab-pane>
      <ElTab-pane label="Unstake" name="unstake"></ElTab-pane>
    </ElTabs>

    <div class="token-info">
      <div class="mui-fl-vert mui-fl-btw token">
        <p class="mui-fl-vert">
          <img src="@/assets/img/eth_logo.svg" alt="">
          {{ cluster.rpc.symbol }}
        </p>
        <ElInput v-model="amount" class="sty1-input" placeholder="0.0" @input="handleInput"></ElInput>
      </div>
      <p class="b">Balance: {{ balance }} {{ cluster.rpc.symbol }}</p>
    </div>

    <ElButton type="primary" size="large" class="stake-btn sty1-btn" :loading="staking" @click="$emit('stake')">{{ stakeBtnTxt }}</ElButton>

    <DigitizationInfo />
  </div>
</template>

<style scoped>
.stake-wrap {
  max-width: 500px;
  min-height: 400px;
  margin: 30px auto 0;
  padding: 30px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0,0,0,.08);
  box-sizing: border-box;
}
.stake-btn {
  width: 100%;
  border-radius: 10px;
}

.token-info {
  padding: 8px 16px;
  border: 1px solid rgba(var(--vt-c-primary-1-rgb), 0.07);
  border-radius: 8px;
  margin-bottom: 30px;
  margin-top: 24px;
  background-color: rgba(var(--vt-c-primary-1-rgb), 0.1);
}
.token-info .token {
  height: 44px;
  font-size: 18px;
}
.token-info img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.token-info .b {
  font-size: 12px;
  margin-top: 12px;
}
</style>
