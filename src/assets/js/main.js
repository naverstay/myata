let openMobileMenu = false;
let prevScrollPos = 0;

const toggleMobileMenu = (e) => {
  e?.preventDefault();
  openMobileMenu = !openMobileMenu;
  document.documentElement.classList.toggle("__open-mob-menu", openMobileMenu);
  return false;
};

const closeMobileMenu = (e) => {
  e?.preventDefault();
  openMobileMenu = false;
  document.documentElement.classList.toggle("__open-mob-menu", openMobileMenu);
  return false;
};

const initBurger = () => {
  document.querySelectorAll(".js-toggle-menu").forEach((item) => {
    item.addEventListener("click", toggleMobileMenu);
  });
};

const initOverlay = () => {
  document.querySelectorAll(".js-close-menu").forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });
};

const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

function getScrollTop() {
  return (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
}

const appHeight = () => {
  const doc = document.documentElement;
  const sab = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--sab")) || 0;
  doc.style.setProperty("--app-height", `${Math.max(300, window.innerHeight - 1 - sab)}px`);
  doc.style.setProperty("--app-scroll-size", getScrollbarWidth() + "px");
};

const initSliders = () => {
  let sliderRegPhoto, sliderRegText;
  const AUTO_PLAY_DELAY = 3000;
  const regPagination = document.getElementById('js-slider-reg-pagination');
  const regPhoto = document.getElementById('js-slider-reg-photo');
  const regText = document.getElementById('js-slider-reg-text');

  if (regPhoto && regText) {
    new Promise((res, rej) => {
      new Swiper(regText, {
        //loop: true,
        centeredSlides: true,
        allowTouchMove: false,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: "#js-slider-reg-next",
          prevEl: "#js-slider-reg-prev"
        },
        on: {
          init: (swp) => {
            res(swp);
          }
        }
        //modules: [Navigation]
      });
    }).then(s => {
      sliderRegText = s;

      new Promise((res, rej) => {
        new Swiper(regPhoto, {
          //modules: [EffectCoverflow, Controller, Mousewheel, Navigation, Keyboard, Autoplay, Pagination],
          effect: 'coverflow',
          //loop: true,
          centeredSlides: true,
          pagination: {
            el: regPagination,
            clickable: true,
            type: "bullets"
          },
          navigation: {
            nextEl: "#js-slider-reg-next",
            prevEl: "#js-slider-reg-prev"
          },
          controller: {
            by: "container",
            control: "#js-slider-reg-text"
          },
          keyboard: {
            enabled: true
          },
          //autoplay: {
          //  delay: AUTO_PLAY_DELAY
          //},
          mousewheel: {
            thresholdDelta: 70
          },
          on: {
            init: (swp) => {
              res(swp);
            }
          },
          slidesPerView: 2.3,
          coverflowEffect: {
            rotate: 0,
            depth: 230,
            stretch: 60,
            slideShadows: false
          },
          breakpoints: {
            1024: {
              coverflowEffect: {
                stretch: 60
              }
            },
            1280: {
              coverflowEffect: {
                stretch: 84
              }
            },
            1440: {
              coverflowEffect: {
                stretch: 94
              }
            },
            1920: {
              coverflowEffect: {
                stretch: 142
              }
            }
          }
        });
      }).then(s => {
        sliderRegPhoto = s;

        regPagination.style.setProperty("--slider-delay", AUTO_PLAY_DELAY + `ms`);

        sliderRegPhoto.slideTo(1);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  appHeight();
  initBurger();
  initOverlay();
  initSliders();
});

const scrollUpCheck = (newScrollTop) => {
  document.documentElement.classList.toggle("__scroll-hide", newScrollTop > 100);
  document.documentElement.classList.toggle("__scroll-up", newScrollTop === 0 ? false : prevScrollPos > newScrollTop);
  document.documentElement.classList.toggle("__scroll-screen", newScrollTop > window.innerHeight);
  prevScrollPos = newScrollTop;
};

const debounceScrollUpCheck = scrollUpCheck.debounce(20);

const checkWindowScroll = () => {
  const newScrollTop = getScrollTop();
  document.documentElement.classList.toggle("__scrolled", newScrollTop > 0);
  debounceScrollUpCheck(newScrollTop);
};

checkWindowScroll();

window.addEventListener("resize", () => {
  appHeight();
});

window.addEventListener("scroll", (e) => {
  checkWindowScroll();
});
