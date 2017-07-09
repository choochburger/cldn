<template>
  <div>
    <h1>Music</h1>
    <ul v-for="item in items">
      <li class="item">
        <img class="thumbnail" v-bind:src="item.thumbnail_url" />
        <div class="info">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <audio controls="controls" preload="none">
            <source v-bind:src="item.asset_url" />
          </audio>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import musicItems from '@/data/music';

  const urlPrefix = 'https://dl.dropboxusercontent.com/u/4323064/cldn_assets';
  const formattedItems = musicItems.map(item =>
    Object.assign({}, item, {
      asset_url: `${urlPrefix}${item.asset_url}`,
      thumbnail_url: `${urlPrefix}${item.thumbnail_url}`,
    }),
  );

  export default {
    name: 'music',
    data: () => ({
      items: formattedItems,
    }),
  };
</script>

<style lang="scss" scoped>
  .item {
    align-items: center;
    display: flex;
    margin: 12px 0;
    width: 100%;
  }

  .thumbnail {
    width: 250px;
    height: 196px;
    margin-right: 12px;
  }
</style>
