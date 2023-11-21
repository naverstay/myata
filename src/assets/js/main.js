import {debounce} from "throttle-debounce";

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
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

function getScrollTop() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

const appHeight = () => {
  const doc = document.documentElement;
  const sab =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--sab")
    ) || 0;
  doc.style.setProperty(
    "--app-height",
    `${Math.max(300, window.innerHeight - 1 - sab)}px`
  );
  doc.style.setProperty("--app-scroll-size", getScrollbarWidth() + "px");
};

document.addEventListener('DOMContentLoaded', function () {
  appHeight();
  initBurger();
  initOverlay();
});

const debounceScrollUpCheck = debounce(20, (newScrollTop) => {
  document.documentElement.classList.toggle(
    "__scroll-hide",
    newScrollTop > 100
  );
  document.documentElement.classList.toggle(
    "__scroll-up",
    newScrollTop === 0 ? false : prevScrollPos > newScrollTop
  );
  prevScrollPos = newScrollTop;
});


function checkWindowScroll() {
  const newScrollTop = getScrollTop();
  document.documentElement.classList.toggle("__scrolled", newScrollTop > 0);
  debounceScrollUpCheck(newScrollTop);
}

checkWindowScroll();

window.addEventListener("resize", () => {
  appHeight();
});

window.addEventListener("scroll", (e) => {
  checkWindowScroll();
});
