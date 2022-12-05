<script>
  import { onMount } from 'svelte';

  let slideNumber = 0;

  onMount(() => {
    const slideTitles = Array.from(document.getElementsByClassName("slide-title"));
    const slides = Array.from(document.getElementsByClassName("services-slide"));
    const pages = Array.from(document.getElementsByClassName("page"));
    const previous = document.getElementById("left");
    const next = document.getElementById("right");

    const changeSlide = (idx) => {
      slides.forEach(slide => slide.style.display = 'none');
      slideTitles.forEach(title => title.classList.remove('active-title'));
      pages.forEach(page => page.classList.remove('active-page'));
      slides[idx].style.display = 'flex';
      slideTitles[idx].classList.add('active-title');
      pages[idx].classList.add('active-page');
    }

    changeSlide(slideNumber);
    
    previous.addEventListener('click', () => {
      if (slideNumber === 0) slideNumber = slides.length - 1;
      else slideNumber -= 1;
      changeSlide(slideNumber);
    });

    next.addEventListener('click', () => {
      if (slideNumber === slides.length - 1) slideNumber = 0;
      else slideNumber += 1;
      changeSlide(slideNumber);
    });

    slideTitles.forEach((title, idx) => {
      title.addEventListener("click", () => {
        slideNumber = idx;
        changeSlide(slideNumber);
      })
    })

    pages.forEach((page, idx) => {
      page.addEventListener("click", () => {
        slideNumber = idx;
        changeSlide(slideNumber);
      })
    })
  })
</script>

<div class="services">
  <div class="container">
    <div class="services-slide-name">
      <div class="slide-title">
        <span>Paid Media</span>
        <div class="underline"></div>
      </div>
      <div class="slide-title active-title">
        <span>Analytics</span>
        <div class="underline"></div>
      </div>
      <div class="slide-title">
        <span>MarTech</span>
        <div class="underline"></div>
      </div>
    </div>
    <div class="services-slider">
      <div class="services-slide">
        <img src="/images/paid-media.svg" alt="Paid Media Image">
        <div class="slide-content">
          <h2>Channels are just a tool to reach your customers.</h2>
          <p>We'll craft a media strategy inclusive of all the platforms your customers use.</p>
          <ul>
            <li>Awareness, lead gen, & conversion campaigns.</li>
            <li>Audits of existing campaigns and performance.</li>
            <li>Performance dashboards, updated by the hour.</li>
            <li>Full ad management, including creative & copy.</li>
          </ul>
        </div>
      </div>
      <div class="services-slide">
        <img src="/images/analytics.svg" alt="Analytics Image">
        <div class="slide-content">
          <h2>Bad data shouldn't dictate your marketing strategy</h2>
          <p>We're strong believers in using data to enhance our marketing campaigns.</p>
          <ul>
            <li>Server-side tracking consulting, including CDPs.</li>
            <li>Event taxonomy to cover all your data needs.</li>
            <li>Migration to new analytics tools, including GA4.</li>
            <li>Custom reports: attribution, path analysis, etc.</li>
          </ul>
        </div>
      </div>
      <div class="services-slide">
        <img src="/images/martech.svg" alt="Martech Image">
        <div class="slide-content">
          <h2>Spend less time on tedious work, more time marketing.</h2>
          <p>Pick the right MarTech stacks, & utilize automation to connect it all together.</p>
          <ul>
            <li>MarTech Stack Evaluations & Recommendations.</li>
            <li>Sync audiences to optimize ad targeting.</li>
            <li>Automate creatives, bidding, product feeds, etc.</li>
            <li>Streamline custom workflows with internal tools.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="services-pagination">
    <div class="arrow" id="left">
      <img src="/images/arr-left.svg" alt="Arrow Left Icon">
    </div>
    <div class="pages">
      <div class="page">
        <div class="page-dot"></div>
      </div>
      <div class="page">
        <div class="page-dot"></div>
      </div>
      <div class="page">
        <div class="page-dot"></div>
      </div>
    </div>
    <div class="arrow" id="right">
      <img src="/images/arr-right.svg" alt="Arrow Right Icon">
    </div>
  </div>
</div>

<style lang=scss>
  .dark-mode {
    .services-slide {
      background-color: $bColor2 !important;
      color: #fff !important;
    }
  }

  .active-title {
    opacity: 1 !important;
    .underline {
      opacity: 1 !important;
    }
  }

  .services {
    height: calc(100vh - 100px);
    overflow: hidden;
    width: 100%;
    position: absolute;
    
    .container {
      height: 100%;

      .services-slide-name {
        margin: 20px 0;
        @include flex(row, center, center);
        width: 100%;

        .slide-title {
          &:hover {
            position: relative;
            span {
              transform: translateY(-10px);
            }
          }

          &:nth-child(2) {
            border-left: 3px solid rgba(255, 255, 255, 0.8);
            border-right: 3px solid rgba(255, 255, 255, 0.8);
          }

          cursor: pointer;
          width: 20%;
          opacity: .8;
          @include flex(column, center, center);
          span {
            width: 100%;
            display: inline-block;
            color: white;
            font-size: 200%;
            font-weight: 500;
            text-align: center;
          }

          .underline {
            height: 5px;
            width: 40%;
            border-radius: 100px;
            background-color: white;
            opacity: 0;
          }
        }
      }
      
      .services-slider {
        position: relative;
        width: 100%;
        padding: 20px;

        .services-slide {
          box-shadow: 0 0 20px -5px rgba(0, 0, 0, .15);
          border-radius: 10px;
          padding: 50px;
          width: 100%;
          height: 600px;
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          background-color: white;
          @include flex(row, center, center);

          img {
            height: 180px;
            width: 40%;
            object-fit: contain;
          }

          .slide-content {
            width: 60%;
            height: 100%;
            @include flex(column, center, center);
            row-gap: 10px;

            h2 {
              font-size: 250%;
              font-weight: 600;
            }

            p {
              font-size: 200%;
            }

            ul {
              margin-right: 50px;
              li {
                list-style: disc;
                font-size: 165%;
              }
            }
          }
        }
      }
    }

    .services-pagination {
      cursor: pointer;
      position: absolute;
      @include flex(row, center, center);
      column-gap: 10px;
      width: 100%;
      top: 740px;


      .active-page {
        .page-dot {
          display: inline-block !important;
        }
      }

      .arrow {
        background-color: white;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        @include flex(row, center, center);
      }

      #left,
      #right {
        img {
          height: 25px;
        }

        &:hover {
          position: relative;
          transform: translateY(-5px);
        }
      }

      .pages {
        @include flex(row, center, center);
        column-gap: 10px;

        .page {
          &:hover {
            position: relative;
            transform: translateY(-5px);
          }
          
          cursor: pointer;
          height: 35px;
          width: 35px;
          border-radius: 100%;
          background-color: white;
          @include flex(row, center, center);

          .page-dot {
            height: 10px;
            width: 10px;
            border-radius: 100%;
            background-color: black;
            display: none;
          }
        }
      }
    }
  }
</style>