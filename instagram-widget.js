/**
 * Instagram Widget - Standalone Version for Daniel Schacht Photography
 * No backend needed - uses local images directly
 */

(function(window) {
  'use strict';

  const InstagramWidget = {
    config: {
      container: '',
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 3,
      slidesToShowMobile: 1,
      slidesToShowTablet: 2
    },

    // Your actual photography portfolio
    data: {
      username: 'headshot_sandiego',
      full_name: 'Daniel Schacht Photography',
      profile_pic: '/images/about/daniel-headshot.jpg',
      bio: 'Professional Headshot Photographer | San Diego',
      posts: [
        {
          id: '1',
          image: '/images/Intagram Widget/_DSF5880.jpg',
          caption: 'Professional headshot session. Capturing confidence and personality. 📸',
          url: 'https://www.instagram.com/headshot_sandiego/'
        },
        {
          id: '2',
          image: '/images/Intagram Widget/_DSF5887.jpg',
          caption: 'Executive portrait photography. Professional and polished. 💼',
          url: 'https://www.instagram.com/headshot_sandiego/'
        },
        {
          id: '3',
          image: '/images/Intagram Widget/_DSF5905.jpg',
          caption: 'Corporate headshots that make an impact. Perfect for LinkedIn. ✨',
          url: 'https://www.instagram.com/headshot_sandiego/'
        },
        {
          id: '4',
          image: '/images/Intagram Widget/_DSF6295 2.jpg',
          caption: 'Professional photography in San Diego. Natural and authentic. 🌟',
          url: 'https://www.instagram.com/headshot_sandiego/'
        },
        {
          id: '5',
          image: '/images/portfolio/photo-1.jpg',
          caption: 'Business headshot perfection. Your professional image matters. 💼',
          url: 'https://www.instagram.com/headshot_sandiego/'
        },
        {
          id: '6',
          image: '/images/portfolio/photo-5.jpg',
          caption: 'Professional headshot photography for your personal brand. 📸',
          url: 'https://www.instagram.com/headshot_sandiego/'
        }
      ]
    },

    currentSlide: 0,
    autoplayInterval: null,

    init: function(options) {
      this.config = { ...this.config, ...options };

      if (!this.config.container) {
        console.error('Instagram Widget: Container required');
        return;
      }

      this.render();
    },

    render: function() {
      const container = document.querySelector(this.config.container);
      if (!container) return;

      container.innerHTML = `
        <div class="ig-widget-simple">
          <div class="ig-slider-container">
            <button class="ig-nav ig-prev" aria-label="Previous">‹</button>
            <div class="ig-slider">
              <div class="ig-track">
                ${this.data.posts.map(post => `
                  <div class="ig-slide">
                    <a href="${post.url}" target="_blank" rel="noopener">
                      <img src="${post.image}" alt="${post.caption}" loading="lazy">
                      <div class="ig-overlay">
                        <p>${post.caption}</p>
                      </div>
                    </a>
                  </div>
                `).join('')}
              </div>
            </div>
            <button class="ig-nav ig-next" aria-label="Next">›</button>
          </div>
        </div>
      `;

      this.injectStyles();
      this.attachEvents();

      if (this.config.autoplay) {
        this.startAutoplay();
      }
    },

    attachEvents: function() {
      const widget = document.querySelector('.ig-widget-simple');
      if (!widget) return;

      const prev = widget.querySelector('.ig-prev');
      const next = widget.querySelector('.ig-next');

      if (prev) prev.addEventListener('click', () => this.prevSlide());
      if (next) next.addEventListener('click', () => this.nextSlide());

      const slider = widget.querySelector('.ig-slider-container');
      if (slider && this.config.autoplay) {
        slider.addEventListener('mouseenter', () => this.stopAutoplay());
        slider.addEventListener('mouseleave', () => this.startAutoplay());
      }
    },

    prevSlide: function() {
      const total = Math.ceil(this.data.posts.length / this.getSlidesToShow());
      this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : total - 1;
      this.updateSlider();
    },

    nextSlide: function() {
      const total = Math.ceil(this.data.posts.length / this.getSlidesToShow());
      this.currentSlide = this.currentSlide < total - 1 ? this.currentSlide + 1 : 0;
      this.updateSlider();
    },

    updateSlider: function() {
      const track = document.querySelector('.ig-track');
      if (!track) return;

      const slides = this.getSlidesToShow();
      const offset = -this.currentSlide * (100 / slides);
      track.style.transform = `translateX(${offset}%)`;
    },

    getSlidesToShow: function() {
      const width = window.innerWidth;
      if (width < 640) return this.config.slidesToShowMobile;
      if (width < 1024) return this.config.slidesToShowTablet;
      return this.config.slidesToShow;
    },

    startAutoplay: function() {
      this.stopAutoplay();
      this.autoplayInterval = setInterval(() => this.nextSlide(), this.config.autoplaySpeed);
    },

    stopAutoplay: function() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    },

    injectStyles: function() {
      if (document.getElementById('ig-widget-simple-styles')) return;

      const style = document.createElement('style');
      style.id = 'ig-widget-simple-styles';
      style.textContent = `
        .ig-widget-simple {
          width: 100%;
          max-width: 100%;
        }

        .ig-slider-container {
          position: relative;
          padding: 0 50px;
        }

        .ig-slider {
          overflow: hidden;
          border-radius: 8px;
        }

        .ig-track {
          display: flex;
          gap: 15px;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ig-slide {
          flex: 0 0 calc(33.333% - 10px);
          min-width: 0;
        }

        @media (max-width: 1024px) {
          .ig-slide {
            flex: 0 0 calc(50% - 7.5px);
          }
        }

        @media (max-width: 640px) {
          .ig-slide {
            flex: 0 0 100%;
          }
          .ig-slider-container {
            padding: 0 40px;
          }
        }

        .ig-slide a {
          display: block;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-decoration: none;
        }

        .ig-slide img {
          width: 100%;
          height: auto;
          aspect-ratio: 1;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .ig-slide a:hover img {
          transform: scale(1.05);
        }

        .ig-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 20px 15px 15px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ig-slide a:hover .ig-overlay {
          opacity: 1;
        }

        .ig-overlay p {
          margin: 0;
          color: white;
          font-size: 13px;
          line-height: 1.4;
        }

        .ig-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          z-index: 10;
          color: #262626;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .ig-nav:hover {
          background: #f0f0f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .ig-prev {
          left: 0;
        }

        .ig-next {
          right: 0;
        }
      `;
      document.head.appendChild(style);
    }
  };

  window.InstagramWidget = InstagramWidget;

})(window);
