<template>
  <div class="relative location-form-component">

    <div
      class="btn-action absolute w-6 z-20 text-white right-0 mr-6 flex flex-col justify-center transition-colors duration-200 delay-100"
      :class="{
        'text-grayChateau': isFormOpen
      }">
      <icon-component
        class="transition-transform duration-200 delay-200 cursor-pointer"
        :class="{
          'transform rotate-45': isFormOpen
        }"
        name="app-plus"
        @iconClicked="toggleForm()"></icon-component>
    </div>

    <transition name="fade">
      <div
        v-if="!isFormOpen"
        class="add-location flex absolute w-full rounded-md shadow-lg px-6 py-3 cursor-pointer z-0 bg-geraldine"
        @click="openForm()">
        <div class="flex flex-row text-white w-full">
            <p class="flex flex-auto items-center">Add New Location</p>
        </div>
      </div>
    </transition>

    <transition name="slide-up-open">
      <div v-if="isFormOpen" class="form-wrapper relative bg-white p-6 pt-3 rounded-md z-10">
        <div class="flex flex-row">
          <h3 class="flex-grow font-medium text-oxfordBlue">{{formTitle}}</h3>
        </div>

        <color-input-component
          class="mt-5"
          :input="colorInput"></color-input-component>

        <text-input-component
          class="mt-5"
          v-for="(input, index) of officeInputs"
          :key="`office-input-${index}`"
          :input="input"></text-input-component>

        <div class="mt-6 pb-3 border-b border-catskillWhite text-xxs uppercase text-pelorous">Contact Information</div>

        <text-input-component
          class="mt-5"
          v-for="(input, index) of contactInputs"
          :key="`contact-input-${index}`"
          :input="input"></text-input-component>

        <button
          :class="[
            'py-2 px-5 rounded text-white mt-5',
            {
              'bg-pelorous': isValid,
              'bg-iron': !isValid
            }
          ]"
          @click="submitForm()">Save</button>
      </div>
    </transition>

  </div>
</template>

<script lang="ts" src="./location-form.component.ts"></script>
<style scoped lang="scss" src="./location-form.component.scss"></style>
