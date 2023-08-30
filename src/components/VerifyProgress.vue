<script setup lang="ts">
import loading from '@/assets/img/loading.svg'
import { useChain } from '@/composables'

defineProps({
  connectedAddress: {
    type: String,
    required: true
  },
  checkingApproval: {
    type: Boolean,
    required: true
  },
  kycStatus: {
    type: String,
    validator(value: string) {
      return ['unknown', 'unauthorized', 'valid', 'invalid'].includes(value)
    },
    required: true
  },
  kycType: {
    type: String,
    validator(value: string) {
      return ['1', '2'].includes(value)
    },
    default: '1'
  },
  animation: {
    type: Boolean
  }
})

defineEmits(['verify'])

const { cluster } = useChain()
</script>

<template>
<div class="tip-wrap mui-fl-hori">
  <Transition name="fade">
    <div v-if="!connectedAddress" class="tip">
      First step: connect to a wallet.
    </div>

    <div v-else-if="checkingApproval" class="tip process mui-fl-vert">
      <ElIcon class="is-loading">
        <img :src="loading" />
      </ElIcon>zkMe Verifying...
    </div>

    <div v-else-if="kycStatus === 'unauthorized'" :class="{'tip wraning': 1, 'animation': animation}">
      <span class="action taplight2" @click="$emit('verify')">
        {{ kycType === '2' ? 'Verify your DID' : 'Verify your identity' }}
      </span>
      {{ kycType === '2' ? 'through our third party service provider, zkMe.' : 'through our third party service provider, zkMe.' }}
    </div>

    <div v-else-if="kycStatus === 'valid'" class="tip success">
      {{ kycType === '2' ? `Congratulations, you have passed the verification and start earning ${cluster.rpc.symbol} now!` : `Congratulations, you have passed zkMe KYC and start earning ${cluster.rpc.symbol} now!` }}
    </div>

    <div v-else-if="kycStatus === 'invalid'" :class="{'tip wraning': 1, 'animation': animation}">
      Sorry, your identity information does not meet our KYC requirements.
    </div>

    <div v-else class="tip">
      Oops! Something went wrong.
    </div>
  </Transition>
</div>
</template>

<style scoped>
.tip {
  position: absolute;
  font-size: 16px;
  padding: 6px 20px;
  border-radius: 30px;
  box-sizing: border-box;
}
.tip-wrap {
  width: 100%;
  position: relative;
  line-height: 1.5;
  height: 36px;
}
.tip.wraning {
  background-color: var(--color-warning);
}
.tip.process {
  font-weight: bold;
}
.tip.success {
  background-color: var(--color-success);
}
.tip.wraning.animation {
  animation: checkboxAnimation 0.9s cubic-bezier(.36, .07, .19, .97);
}
.tip .is-loading {
  margin-right: 10px;
}
.action {
  cursor: pointer;
  font-weight: bold;
  user-select: none;
}

@media screen and (max-width: 539px) {
  .tip {
    padding: 6px 30px;
    font-size: 14px;
  }
}
</style>
