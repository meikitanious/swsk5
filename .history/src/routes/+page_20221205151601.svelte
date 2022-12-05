<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import { Autoplay } from 'swiper';
  import "swiper/css";
	import { onMount } from "svelte";

  let logosPerView = 0;
  let darkMode = false;

  onMount(() => {
    logosPerView = window.innerWidth > 1200 ? 3 : window.innerWidth > 500 ? 2 : 1;
  });
</script>

<div class="main-page">
  <section class="hero">
    <video autoplay="autoplay" muted loop id="video" playsinline style="pointer-events: none;">
        <source src="/videos/whales.mp4" type="video/mp4" />
    </video>
    <div class="hero-content">
        <h1>We Tackle Your <br>Growth Problems</h1>
        <p>Scalewhale is a Paid Media agency<br> with expertise in Analytics, and MarOps</p>
        <a style="color: {darkMode ? "#056AFF" : "black"}" id="get-in-touch" href="/contact">Get in Touch</a>
    </div>
  </section>
  <section class="container">
    <div class="clients">
      <h2>We've had the pleasure<br> of working with:</h2>
      {#if logosPerView > 0}
      <Swiper
        slidesPerView={logosPerView}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        class="slides"
        loop={true}
        modules={[Autoplay]}
        style="width: 60%;"
      >
        <SwiperSlide>
          <a href="https://nzxt.com/" target="_blank">
            <img src="/images/clients-icons/nzxt-icon.png" alt="NZXT">
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://cushion.ai/" target="_blank">
            <img src="/images/clients-icons/cushion-icon.png" alt="Cushion">
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://www.irl.com/" target="_blank">
            <img src="/images/clients-icons/irl-icon.png" alt="IRL">
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://kyla.com/p/" target="_blank">
            <img src="/images/clients-icons/kyla.png" alt="Kyla">
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#" target="_blank">
            <img src="/images/clients-icons/outco-icon.png" alt="Outco">
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://fellowproducts.com/" target="_blank">
            <img src="/images/clients-icons/ficon.png" alt="Fellow">
          </a>
        </SwiperSlide>
      </Swiper>
      {/if}
    </div>
  </section>
</div>

<style lang=scss>
  .main-page {
    height: calc(100vh - 100px);
    overflow: hidden;
    width: 100%;
    
    .hero {
      position: relative;
      height: calc(100% - 150px);
      width: 100%;

      #video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .hero-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        @include flex(column, center, center);
        row-gap: 10px;

        h1 {
          font-size: 700%;
          font-weight: 800;
          text-align: center;
        }

        p {
          font-size: 350%;
          text-align: center;
          font-weight: 600;
        }
      }
    }

    .clients {
      @include flex(row, center, space-between);
      height: 150px;
      
      h2 {
        font-size: 180%;
        color: white;
        font-weight: 600;
        width: 50%;
      }

      .swiper-slide {
        a {
          @include flex(row, center, center);
        }

        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        a {
          text-decoration: none;

          img {
            height: 150px;
            object-fit: contain;
          }
        }
      }
    }
  }
</style>