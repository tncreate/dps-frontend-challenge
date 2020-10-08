<template>
  <transition name="slide-up">
  <div ref="OfficeItem" v-if="isVisible && office" class="office-item-component">
    <div
      class="header-info relative rounded-md shadow-lg px-6 py-12 cursor-pointer z-10"
      :class="[`bg-${office.color}`]"
      @click="toggleOfficeDetails">
      <div class="flex flex-row text-white">
        <div class="flex-auto">
          <h3 class="text-2xl font-medium">{{office.name}}</h3>
          <p class="pt-1">{{office.address}}</p>
        </div>
        <div
          class="flex flex-col justify-center w-6 transition-transform duration-200 ease-linear"
          :class="[{'transform rotate-180': showDetails}]">
          <icon-component class="text-white" name="app-arrow-down"></icon-component>
        </div>
      </div>

    </div>

    <transition name="slide-down">
      <div v-if="showDetails" class="contact-info relative bg-white p-6 rounded-b-md z-0 overflow-hidden">
        <h3 class="text-xl font-medium text-oxfordBlue">{{office.contactName}}</h3>
        <p class="pt-3 text-sm">{{office.contactPosition}}</p>
        <p class="pt-3 text-sm"><a :class="[`text-${office.color}`]" :href="`mailto:${office.contactEmail}`">{{office.contactEmail}}</a></p>
        <p class="pt-3 text-sm">{{office.contactPhone}}</p>
        <div class="flex flex-row border-t border-catskillWhite mt-4 pt-4">
          <button class="flex flex-grow text-grayChateau items-center justify-start outline-none focus:outline-none" @click="editOffice()">
            <icon-component class="w-5" name="app-pencil"></icon-component> <span class="pl-2 text-xxs uppercase">Edit</span>
          </button>
          <button class="flex flex-grow text-geraldine items-center justify-end outline-none focus:outline-none"  @click="deleteOffice()">
            <icon-component class="w-5 text-geraldine" name="app-trash"></icon-component> <span class="pl-2 text-xxs uppercase">Delete</span>
          </button>
        </div>
      </div>
    </transition>

  </div>
  </transition>
</template>

<script lang="ts" src="./office-item.component.ts"></script>
<style scoped lang="scss" src="./office-item.component.scss"></style>
