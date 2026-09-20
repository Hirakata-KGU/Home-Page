<script setup lang="ts">
    withDefaults(
    defineProps<{
        strokeColor?: string // 枠線の色
        fillColor?: string   // 中を埋める色
    }>(),
    {
        strokeColor: '#42845A', // 未指定時のデフォルト枠線色
        fillColor: 'none'       // デフォルトは透明（塗りつぶしなし）
    })
</script>

<template>
    <svg viewBox="0 0 460 460" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path d="M392.252 67.7471L459.458 230L392.252 392.252L230 459.458L67.7471 392.252L0.541016 230L67.7471 67.7471L230 0.541016L392.252 67.7471Z" :stroke="strokeColor" :fill="fillColor"/>
    </svg>
</template>