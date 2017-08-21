<template>
  <div>
    <h1>Music</h1>
    <ul v-for="item in items">
      <li class="item">
        <img class="thumbnail" v-bind:src="item.thumbnail_url" />
        <h2 class="title">{{ item.title }}</h2>
        <p class="description">{{ item.description }}</p>
        <audio controls="controls" preload="none">
          <source v-bind:src="item.asset_url" />
        </audio>
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
  $rowHeight: 196px;

  @mixin mobile {
    @media only screen and (max-device-width : 667px) {
      @content;
    }
  }

  .item {
    border-bottom: 1px solid #ccc;
    display: grid;
    grid-template-rows: 1fr 2fr 1fr;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "thumbnail title"
      "thumbnail description"
      "thumbnail player";
    height: $rowHeight;
    padding: 12px 0;
    width: 100%;
  }

  .thumbnail {
    grid-area: thumbnail;
    width: 250px;
    margin-right: 12px;
  }

  .title {
    grid-area: title;
  }

  .description {
    grid-area: description;
  }

  audio {
    grid-area: player;
    width: 100%;
  }

  @include mobile {
    .item {
      grid-template-rows: auto;
      grid-template-columns: 100%;
      grid-template-areas:
        "title"
        "thumbnail"
        "description"
        "player";
      height: initial;
      min-width: 350px;
    }

    .thumbnail {
      width: 100%;
    }

    audio {
      width: 100%;
    }
  }
</style>
