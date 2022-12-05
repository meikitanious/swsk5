<script lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  let blogPost: any = [];
  let blogContent: any;
  let showShareLinks: bool = false;
  let liked: bool = false;
  let likes;
  let shareClick = false;

  export let data;

  onMount(async () => {
    blogPost = await loadData(data.slug);
    likes = blogPost[0].attributes.likes;
  })

  export const loadData: Load = async (slug) => {
  const res = await fetch(`https://jellyfish-app-9zisi.ondigitalocean.app/api/posts?filters[slug][$eq]=${slug}`);
    const response = await res.json();

    if (res.status !== 200) {
      goto('/error');
      return;
    }

    return response.data;
  };

  const updateLikes = (blogPost, data) => {
    if (!liked) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = `{
        "data": {
          "likes": ${blogPost[0].attributes.likes + 1}
        }
      }`;

      let requestOptions: any = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
      };

      fetch(`https://jellyfish-app-9zisi.ondigitalocean.app/api/posts/${blogPost[0].id}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          liked = true;
        })
        .catch(error => console.log('error', error));
    } else {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = `{
        "data": {
          "likes": ${blogPost[0].attributes.likes}
        }
      }`;

      let requestOptions: any = {
        method: 'PUT',
        headers: myHeaders,
        body: raw
      };

      fetch(`https://jellyfish-app-9zisi.ondigitalocean.app/api/posts/${blogPost[0].id}`, requestOptions)
        .then(response => response.json())
        .then(async result => {
          liked = false;

        })
        .catch(error => console.log('error', error));
    }
  }
</script>

<div class="container">
  <div id="back" on:click={() => goto('/blog')}>
    <img src="/images/back.svg" alt="Back Arrow">
  </div>
  <div class="blog--page">
    {#if (blogPost.length > 0)} 
      <h1 class="blog--title">{blogPost[0].attributes.title}</h1>
      <div class="blog--author">by {blogPost[0].attributes.author}</div>
      <p class="blog--content">{@html blogPost[0].attributes.content}</p>
      <div class="controls">
        <div class="blog--likes {liked ? "liked" : ""}" on:click={async () => { 
          await updateLikes(blogPost, likes, data)
        }}>
          <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"><path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero" fill="currentColor"/></svg>
          <span>{liked ? likes + 1 : likes}</span>
        </div>
        <div class="share--menu">
          <div class="share" on:click={() => showShareLinks = !showShareLinks}>
            <img src="/images/share.svg" alt="Share Icon">
          </div>
          <div class="share--links" style="
            transform: {showShareLinks ? "scale(1)" : "scale(0)"}
          ">
            <a class="share--link fb" target="_blank" href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" fill="currentColor" /></svg>
            </a>
            <a class="share--link li" target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" fill="currentColor" /></svg>
            </a>
            <a class="share--link twi" target="_blank" href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blogPost[0].attributes.title}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" fill="currentColor"/></svg>
            </a>
            <a class="share--link reddit" target="_blank" href={`https://www.reddit.com/submit?url=${window.location.href}&title=${blogPost[0].attributes.title}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" fill="currentColor" /></svg>
            </a>
            <a class="share--link link" target="_blank" on:click={() => navigator.clipboard.writeText(window.location.href)}
              on:click={() => {
                shareClick = true;
                setTimeout(() => {
                  shareClick = false;
                }, 2000);
              }}
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" fill="currentColor" /></svg>
              <div class="copied" style="transform: {shareClick ? 'scale(1)' : 'scale(0)'}">
                Copied
              </div>
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang=scss>
  .copied {
    position: absolute;
    top: 50px;
    padding: 10px;
    font-size: 120%;
    background-color: white;
    color: black;
    border-radius: 10px;
    font-weight: 600;
    transform: scale(0);
  }

  #back {
    transition: .2s;
    position: relative;
    width: 55px;
    height: 55px;
    top: 30px;
    opacity: 1;

    background-color: #101019;
    border: 2px solid white;
    box-shadow: 0 0 15px rgba(255, 255, 255, .3);
    border-radius: 100%;

    img {
      height: 50px;
    }

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  .blog--page {
    margin: auto;
    padding: 20px 0 100px 0;
    @include flex(column, center, flex-start);
    color: white;
    overflow: hidden;
    
    .blog--category {
      font-size: 120%;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .blog--title {
      font-size: 220%;
      text-align: center;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .blog--author {
      font-size: 130%;

      margin-bottom: 50px;
    }

    .blog--content {
      font-size: 160%;
      margin-bottom: 50px;
    }

    .liked {
      background-color: #d00000 !important;
      box-shadow: 0 0 15px #d00000 !important;
      svg {
        color: white !important;
      }
      color: white !important;
    }

    .controls {
      @include flex(row, center, center);
      width: 100%;
      column-gap: 20px;

      display: flex;
        .blog--likes {
        transition-duration: .15s;
        position: relative;

        &:hover {
          cursor: pointer;
          transform: scale(1.1);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
        }

        &:active {
          transform: scale(.9);
        }
        
        @include flex(row, center, center);
        column-gap: 5px;
        background-color: #f2f2f2;
        font-size: 130%;
        color: #000;
        height: 30px;
        padding: 20px;
        border-radius: 5px;

        span {
          font-weight: 600;
        }

        svg {
          height: 25px;
          color: #000;
        }
      }
    }

    .share--menu {
      @include flex(row, flex-start, flex-start);
      column-gap: 10px;
      position: relative;

      .share {
        transition-duration: .15s;

        &:hover {
          background-color: #70e000;
          box-shadow: 0 0 15px #70e000;
          transform: scale(1.1);
          cursor: pointer;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
        }

        background-color: #f2f2f2;
        height: 40px;
        border-radius: 5px;
        padding: 0 20px;
        @include flex(row, center, center);

        img {
          height: 25px;
        }
      }

      .share--links {
        transition: transform .1s ease-in;
        @include flex(row, center, center);
        height: 40px;
        background-color: #f2f2f2;
        border-radius: 5px;
        position: absolute;
        left: 80px;
        transform: scale(0);
        transform-origin: left;

        a {
          position: relative;
        }

        svg {
          color: black;
        }

        .share--link {
          transition-duration: .15s;
          width: 50px;
          height: 100%;
          @include flex(row, center, center);
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
            border: 1.5px solid rgba(255, 255, 255, 0.5);
            
            svg {
              color: white;
            }
          }
        }

        .fb:hover {
          background-color: #3B5998;
          box-shadow: 0 0 15px #3B5998;
        }

        .li:hover {
          background-color: #0072B1;
          box-shadow: 0 0 15px #0072B1;
        }

        .twi:hover {
          background-color: #00ACEE;
          box-shadow: 0 0 15px #00ACEE;
        }

        .reddit:hover {
          background-color: #ff4500;
          box-shadow: 0 0 15px #ff4500;
        }
        
        .link:hover {
          background-color: black;
          box-shadow: 0 0 15px black;
        }
      }
    }
  }
</style>