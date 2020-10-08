<template>
  <div class="color-input-component">

    <div
      class="flex flex-row text-white justify-center items-center relative rounded-md shadow-lg px-6 py-10 cursor-pointer z-10 font-medium"
      :class="[`bg-${activeColor}`]"
      @click="toogleColorList()">
        Select Color
        <icon-component
          class="text-white w-4 transition-transform duration-200 ease-linear ml-1"
          name="app-arrow-down"
          :class="[{'transform rotate-180': showList}]"></icon-component>
    </div>

    <transition name="open">
      <div class="color-list-wrapper overflow-hidden" v-if="showList">
        <div
          class="flex flex-row text-white justify-center items-center relative rounded-md shadow-lg px-6 py-12 cursor-pointer z-10 font-medium mt-2"
          v-for="color of colors"
          :key="color"
          :class="[`bg-${color}`]"
          @click="selectColor(color)">
            <icon-component v-if="isActiveColor(color)" class="absolute text-white w-6 transition-transform duration-200 ease-linear ml-1" name="app-check"></icon-component>
        </div>
      </div>
    </transition>

  </div>
</template>

<script lang="ts" src="./color-input.component.ts"></script>
<style scoped lang="scss" src="./color-input.component.scss"></style>
