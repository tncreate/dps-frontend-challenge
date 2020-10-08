<template>
  <span
    class="icon-component"
    v-if="icon"
    v-html="icon"
    @click="iconClicked"></span>
</template>

<script lang="ts" src="./icon.component.ts"></script>
<style scoped lang="scss" src="./icon.component.scss"></style>
