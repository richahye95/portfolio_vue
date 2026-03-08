<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  
</template>

<style scoped>

</style> -->

<template>
  <div class="app-container">
    <ThreeScene />
    
    <Works />

    <Skills />

    <Intro />
  </div>
</template>



<script setup>
import Works from './components/Works.vue';
import ThreeScene from './components/ThreeScene.vue';
import Skills from './components/Skills.vue';
import Intro from './components/intro.vue';
</script>
