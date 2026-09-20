<script setup lang="ts">
interface Props {
  title: string;
  textColor?: string;
  ornamentColor?: string;
  maxWidth?: string;
}

withDefaults(defineProps<Props>(), {
  textColor: 'text-sprout-title',
  ornamentColor: '#42845A',
  maxWidth: '824px',
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full max-w-[824px] mb-8 text-center">
    <h2 :class="['font-sans font-bold text-4xl lg:text-5xl leading-tight mb-1', textColor]">
      {{ title }}
    </h2>
    <UiOrnamentLine :color="ornamentColor" :max-width="maxWidth" />
  </div>
</template>
