<template>
  <transition name="fade">
    <div
      class="notification-component fixed w-full bg-white py-6 border-t-2 z-50 shadow-sm"
      :class="{
        'border-pelorous': isSuccess,
        'border-geraldine': !isSuccess,
      }"
      v-if="showNotification">
      <div class="flex mx-auto w-80 text-xxs uppercase justify-center items-center">
        <icon-component
          class="w-5 mr-2"
          :class="{
            'text-pelorous': isSuccess,
            'text-geraldine': !isSuccess,
          }"
          :name="icon"></icon-component>
        {{text}}
      </div>
      <div class="absolute w-6 text-grayChateau inset-y-0 right-0 mr-6 flex flex-col justify-center">
        <icon-component
          class="cursor-pointer transform rotate-45"
          name="app-plus"
          @iconClicked="hide()"></icon-component>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./notification.component.ts"></script>
<style scoped lang="scss" src="./notification.component.scss"></style>
