<script setup lang="ts">
import { useWallet, useChain, useVerify, useZkMe, useStake, useMchConf } from '@/composables';
import { ZKME_POPUP_ORIGIN } from '@/utils/config';
import { switchChain } from '@/utils/eth';

const zkMePopupNode = shallowRef<HTMLIFrameElement>()

const lv = computed(() => {
  const { lv = '' }: { lv?: string } = useRoute().query
  return lv
})

const {
  connect,
  connecting,
  connectedAddress,
  signer,
  signingCosmWasmClient,
  balance,
  connBtnTxt
} = useWallet(zkMePopupNode)

const {
  chainId,
  cluster,
} = useChain()

const {
  verify,
  kycStatus,
  checkingApproval,
  needKyc,
  accessToken
} = useVerify(connectedAddress, lv)

const {
  onFinished,
  showPopup,
} = useZkMe(connect, connectedAddress, signer, signingCosmWasmClient)

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
const popupUrl = computed(() => {
  const { appId } = useMchConf()
  return `${ZKME_POPUP_ORIGIN}?mchNo=${appId.value}&name=zkMe%20SDK%20DEMO&lv=${lv.value}&chainId=${chainId.value}&accessToken=${accessToken.value}`
})

onFinished((verifiedAddress, kycResults) => {
  if (verifiedAddress !== connectedAddress.value) {
    return
  }
  if (lv.value === '2') {
    showPopup.value = false
    kycStatus.value = 'valid'
  } else {
    kycResults === 'matching'
      ? verify(connectedAddress.value)
      : (kycStatus.value = 'invalid')
  }
})

async function handleVerifyClick () {
  // cosmos
  if (cluster.value.type === 'cosmos') {
    showPopup.value = true
    return
  }

  // EVM
  if (window.ethereum.chainId === cluster.value.rpc.chainId) {
    showPopup.value = true
  } else {
    await switchChain()
    try {
      const rp = await signer.value?.provider.getNetwork()
      if (`0x${rp?.chainId.toString(16)}` === cluster.value.rpc.chainId) {
        showPopup.value = true
      }
    } catch (err: any) {
      console.log(err.message)
      if (
        err.message.includes('network changed') &&
        new RegExp(`\\b => ${parseInt(cluster.value.rpc.chainId).toString()}\\b`).test(err.message)
      ) {
        showPopup.value = true
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
          :kyc-type="lv"
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

  <Transition name="fade">
    <div class="popup-mask mui-fl-central" v-show="showPopup && needKyc">
      <div class="popup-wrap">
        <iframe v-if="needKyc" ref="zkMePopupNode" :src="popupUrl" width="100%" height="100%"></iframe>
      </div>
    </div>
  </Transition>
</template>

<style src="@/assets/css/views/dapp-home.css" scoped>
</style>
