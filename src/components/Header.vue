<template>
    <nav>
    <router-link to="/">home</router-link>
    <router-link to="/about">About</router-link>
    </nav>
    
</template>

<style scoped>
nav {
  font-size: 12px;
  text-align: left;
  margin-top: 2rem;
}

nav a {
  color: #96a4c8;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid #cccccc;
}

nav a:first-of-type {
  border: 0;
}
</style>