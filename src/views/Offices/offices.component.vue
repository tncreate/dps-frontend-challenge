<template>
  <div class="offices-component">
    <notification-component></notification-component>
    <div class="container mx-auto px-4 py-40 w-80 text-sm">
      <h1 ref="AppTitle" class="text-pelorous text-6xl text-center">Offices</h1>

      <div class="pt-8">
        <location-form-component></location-form-component>
      </div>

      <div v-if="hasOffices" class="list-location">
        <office-item-component
          class="mt-6"
          v-for="office of offices"
          :key="office.id"
          :office="office"></office-item-component>
      </div>

    </div>
  </div>
</template>

<script lang="ts" src="./offices.component.ts"></script>
<style scoped lang="scss" src="./offices.component.scss"></style>
