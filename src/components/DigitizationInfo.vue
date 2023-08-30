<script setup lang="ts">
import { useChain } from '@/composables';

const { cluster } = useChain()
</script>

<template>
  <ul class="digitization">
    <li class="mui-fl-vert mui-fl-btw">
      <p>You will receive</p>
      <p>0.000000 {{ cluster.rpc.symbol }}</p>
    </li>
    <li class="mui-fl-vert mui-fl-btw">
      <p>Staking APY</p>
      <p>6.17%</p>
    </li>
    <li class="mui-fl-vert mui-fl-btw">
      <p>Deposit fee</p>
      <p>0%</p>
    </li>
    <li class="mui-fl-vert mui-fl-btw">
      <p>Staking rewards fee</p>
      <p>6%</p>
    </li>
  </ul>
</template>

<style scoped>
.digitization {
  margin-top: 20px;
}
.digitization li {
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
}</style>
