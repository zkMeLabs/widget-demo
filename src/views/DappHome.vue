<script setup lang="ts">
import '@zkmelabs/widget/dist/style.css'
import { useWallet, useChain, useVerify, useZkMe, useStake } from '@/composables';
import { switchChain } from '@/utils/eth';

const {
  connect,
  connecting,
  connectedAddress,
  signer,
  balance,
  connBtnTxt
} = useWallet()

const {
  cluster,
} = useChain()

const {
  widget,
} = useZkMe(connect, connectedAddress, signer)

const {
  kycStatus,
  checkingApproval,
} = useVerify(connectedAddress)

const {
  stake,
  staking,
  showAnimation,
  amount,
  stakeBtnTxt
} = useStake(connect, signer, connecting, checkingApproval, kycStatus)

const feature = computed(() => {
  return [`100M ${cluster.value.rpc.symbol} staked`, '0% deposit fees', 'Unstake instantly']
})

widget.value.on('kycFinished', (kycResults) => {
  console.log('widget kycFinished', kycResults)
  const { isGrant, associatedAccount } = kycResults
  if (associatedAccount !== connectedAddress.value) {
    return
  }
  kycStatus.value = isGrant ? 'valid' : 'invalid'
})

async function handleVerifyClick () {
  if (window.ethereum.chainId === cluster.value.rpc.chainId) {
    widget.value.launch()
  } else {
    await switchChain()
    try {
      const rp = await signer.value?.provider.getNetwork()
      if (`0x${rp?.chainId.toString(16)}` === cluster.value.rpc.chainId) {
        widget.value.launch()
      }
    } catch (err: any) {
      console.log(err.message)
      if (
        err.message.includes('network changed') &&
        new RegExp(`\\b => ${parseInt(cluster.value.rpc.chainId).toString()}\\b`).test(err.message)
      ) {
        widget.value.launch()
      }
    }
  }
}
</script>

<template>
  <div class="demo-tip">zkMe SDK DEMO - Only to verify your zkMe identity</div>
  <div class="simulation-dapp-wrap">
    <div class="simulation-dapp">
      <NavBar
        :connecting="connecting"
        :conn-btn-txt="connBtnTxt"
        @connet="connect"
      />

      <ul class="dot mui-fl-central">
        <li v-for="(i, index) of feature" :key="index">
          {{ i }}
        </li>
      </ul>

      <div class="mui-fl-vert mui-fl-col">
        <h1 class="heading">zkMe SDK DEMO</h1>

        <VerifyProgress
          :connected-address="connectedAddress"
          :checking-approval="checkingApproval"
          :kyc-status="kycStatus"
          :kyc-type="'1'"
          :animation="showAnimation"
          @verify="handleVerifyClick"
        />
      </div>

      <StakePanel
        v-model="amount"
        :staking="staking || connecting"
        :balance="balance"
        :stake-btn-txt="stakeBtnTxt"
        @stake="stake"
      />
    </div>
  </div>
</template>

<style src="@/assets/css/views/dapp-home.css" scoped>
</style>
