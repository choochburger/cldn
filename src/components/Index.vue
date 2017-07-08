<template>
  <div>
    <div>Hi, I'm Chris. I make web apps. I'm also a recovering musician.</div>
    <hr>
    <ul>
      <li>
        <router-link to="development">Development</router-link>
      </li>
      <li>
        <router-link to="music">Music</router-link>
      </li>
    </ul>
    <hr>
    <h3>Other links:</h3>
    <ul>
      <li>
        <a href="http://www.github.com/choochburger" target="_blank">Github</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/chris-lyons-8130b317/" target="_blank">LinkedIn</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
