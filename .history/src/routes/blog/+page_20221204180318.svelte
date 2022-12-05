<script lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
	import postcss from 'postcss';

  let blogPosts: any = [];
  let categories: any = [];

  onMount(async () => {
    blogPosts = await load();
    blogPosts.sort(function( a , b){
      if(Number(a.attributes.order) > Number(b.attributes.order)) return 1;
      if(Number(a.attributes.order) < Number(b.attributes.order)) return -1;
      return 0;
    });
    categories = categorize(blogPosts);
  })

  export const load: Load = async () => {
  const res = await fetch('https://jellyfish-app-9zisi.ondigitalocean.app/api/categories?populate=*');
    const response = await res.json();
    return response.data;
  };

  const categorize = (array: any) => {
    let categories: any = [];

    array.forEach((item: any) => {
      if (!categories.includes(item.attributes.category) && item.attributes.visible_on_homepage) categories.push(item.attributes.category);
    });

    return categories;
  }
</script>

  <div class="main--blog--page">
    <div class="container">
      {#if (blogPosts.length > 0)}
      {#each categories as category}
        <div class="blog--row--wrapper">
          <h1 class="blog--category">{category}</h1>
          <div class="blog--row">
            {#each blogPosts as postCategory}
              {#each postCategory.attributes.posts.data as post}
                {#if (postCategory.attributes.category == category && postCategory.attributes.visible_on_homepage)}
                  <div class="blog--post" on:click={() => goto('/blog/' + post.attributes.Slug)}>
                    <span class="blog--post-category">{postCategory.attributes.category}</span>
                    <h2 class="blog--post--title">{post.attributes.title}</h2>
                    <div class="blog--post--data">
                      <span class="blog--post--author">{post.attributes.author}</span>
                      <div class="blog--post--likes">
                        <img src="/images/heart.svg" alt="Heart Icon">
                        <span>
                          {post.attributes.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                {/if}
              {/each}
            {/each}
          </div>
        </div>
      {/each}
    {/if}
    </div>
  </div>

<style lang=scss>
  .main--blog--page {
    height: 100%;
    width: 100%;
    @include flex(column, flex-start, flex-start);
    row-gap: 50px;
    padding-bottom: 50px;

    .container {
      padding: 0 !important;
    }

    .blog--row--wrapper {
      width: 100%;

      .blog--category {
        font-size: 200%;
        font-weight: 600;
        color: #fff;
        margin: 10px 0 20px;
      }
    }

    .container {
      @include flex(column, flex-start, flex-start);
      row-gap: 50px;
    }

    .blog--row {
      @include flex(row, flex-start, flex-start);
      flex-wrap: wrap;
      gap: 20px;

      .blog--post {
        transition: all ease-in-out .3s;
        &:hover {
          cursor: pointer;
          background-color: #fff;
          position: relative;
          transform: translateY(-10px);
        }

        height: 220px;
        width: 380px;
        background-color: #e5e5e5;
        border: 2.5px solid #e5e5e5;
        color: #000107;
        padding: 15px;
        border-radius: 5px;
        @include flex(column, flex-start, flex-start);

        .blog--post-category {
          font-weight: 600;
          font-size: 110%;
          text-transform: uppercase;
          height: 15%;
        }

        .blog--post--title {
          font-weight: 600;
          font-size: 160%;
          height: 70%;
        }

        .blog--post--data {
          width: 100%;
          height: 15%;
          @include flex(row, flex-end, space-between);

          .blog--post--author {
            font-size: 115%;
          }

          .blog--post--likes {
            width: 50%;
            @include flex(row, center, flex-end);
            column-gap: 5px;

            img {
              height: 20px;
            }

            span {
              font-size: 110%;
            }
          }
        }
      }
    }
  }
</style>