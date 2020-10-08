<template>
  <div class="text-input-component">
    <label :for="input.id" class="label text-oxfordBlue">
      {{input.title}}
      <sup v-if="input.isRequired" class="text-xxs text-grayChateau">*</sup>
    </label>
    <div class="input-wrapper relative w-full mt-1">
      <input
        :id="input.id"
        :type="input.type"
        :placeholder="input.placeholder"
        v-model="input.value"
        class="w-full py-1 px-2 border rounded border-nevada text-oxfordBlue outline-none focus:border-pelorous"
        :class="{
          'border-geraldine focus:border-geraldine': activeError,
        }"
        @keydown="handleKeydown()"/>
      <icon-component v-if="activeError" class="absolute w-5 text-geraldine inset-y-0 right-0 flex flex-col justify-center" name="app-warning"></icon-component>
    </div>
      <span v-if="activeError" class="text-geraldine text-xxs">{{activeError}}</span>
  </div>
</template>

<script lang="ts" src="./text-input.component.ts"></script>
<style scoped lang="scss" src="./text-input.component.scss"></style>
