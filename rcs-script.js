const rcsCore = require('rcs-core');
const rcs = require('rename-css-selectors');
const fs = require('fs');
const path = require('path');

rcs.config.load();

const htmlFolderPath = 'deploy';

async function updateFile(filePath, fileHandler) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const updatedContent = await fileHandler(fileContent, );

  console.log('fileContent', filePath, fileContent.length, updatedContent.length);

  fs.writeFileSync(filePath.replace(/\.(\w+)$/, '-r.$1'), updatedContent, 'utf-8');
}

async function findAllStyles(folderPath, fileHandler) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      console.log('SKIP FOLDER', filePath);
      await findAllStyles(filePath, fileHandler);
    } else {
      if (file.endsWith('.css')) {
        rcsCore.fillLibraries(fs.readFileSync(filePath, 'utf8'));
      }
    }
  }
}

async function processFilesInFolder(folderPath, fileHandler) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      console.log('SKIP FOLDER', filePath);
      await processFilesInFolder(filePath, fileHandler);
    } else {
      if (file.endsWith('.css')) {
        await updateFile(filePath, rcsCore.replace.css);
      } else if (file.endsWith('.js')) {
        await updateFile(filePath, rcsCore.replace.js);
      } else if (file.endsWith('.html')) {
        await updateFile(filePath, rcsCore.replace.any);
      }
    }
  }
}

// Настройте rcs

rcsCore.warnings.warn();

/*[
  'swiper',
  'swiper-vertical',
  'swiper-wrapper',
  'swiper-android',
  'swiper-slide',
  'swiper-ios',
  'swiper-horizontal',
  'swiper-slide-invisible-blank',
  'swiper-autoheight',
  'swiper-backface-hidden',
  'swiper-3d',
  'swiper-css-mode',
  'swiper-cube-shadow',
  'swiper-free-mode',
  'swiper-centered',
  'swiper-slide-shadow',
  'swiper-slide-shadow-bottom',
  'swiper-slide-shadow-left',
  'swiper-slide-shadow-right',
  'swiper-slide-shadow-top',
  'swiper-lazy-preloader',
  'swiper-watch-progress',
  'swiper-slide-visible',
  'swiper-lazy-preloader-white',
  'swiper-lazy-preloader-black',
  'swiper-fade',
  'swiper-slide-active',
  'swiper-button-disabled',
  'swiper-pagination-bullet-active',
  'swiper-slide-prev'
].forEach(cls => {
  rcsCore.baseLibrary.setExclude(cls);
});*/

rcsCore.baseLibrary.setExclude(/^swiper/);
rcsCore.baseLibrary.setExclude(/^--swiper/);

//rcs.nameGenerator.type = 'random';

//rcs.nameGenerator.setAlphabet('abcde');

//rcs.selectorLibrary.generateSelectorLibrary();
//rcs.nameGenerator.reset();

// Асинхронная функция для обработки файлов
async function processFiles() {
  // Обработайте файлы в каждой из папок
  await findAllStyles(htmlFolderPath).then(() => {

    rcsCore.baseLibrary.setExclude(/.*swiper.*/);

    const mapping = rcsCore.mapping.generate();

    rcsCore.optimize();

    /*
        rcs.baseLibrary.setMultiple({
          'section--end': 't',
          '__left': 'n',
          'section--holder': 'r',
          '__start': 'i',
          '__end': 's',
          '__white': 'o',
          '__gray': 'u',
          'page': 'a',
          'page--overlay': 'f',
          'page--popups': 'l',
          '__open-mob-menu': 'c',
          '__open-popup': 'h',
          'link--green': 'p',
          'flex': 'd',
          '__column': 'v',
          '__wrap': 'm',
          '__between': 'g',
          '__center': 'y',
          '__start-align': 'b',
          '__center-align': 'w',
          '__end-align': 'x',
          '__stretch-align': 'k',
          'relative': '_',
          'ovh': 'j',
          'hide': 'q',
          'btn': 'z',
          'btn--round': 'te',
          'btn--green': 'tt',
          '__s-48': 'tn',
          '__s-54': 'tr',
          '__s-64': 'ti',
          'burger': 'ts',
          'htop': 'to',
          'htop--holder': 'tu',
          '__fixed': 'ta',
          'logo': 'tf',
          'navigation': 'tl',
          'download': 'tc',
          'promo': 'th',
          'promo--left': 'tp',
          'promo--right': 'td',
          'promo--screen': 'tv',
          'promo--app': 'tm',
          'promo--stat': 'tg',
          'promo--stat_item': 'ty',
          'promo--text': 'tb',
          'promo--title': 'tw',
          'hide__after-xs': 'tx',
          'hide__after-sm': 'tk',
          'hide__after-md': 't_',
          'hide__after-lg': 'tj',
          '__scroll-hide': 'tq',
          '__scroll-screen': 'tz',
          'hide__after-xl': 'ne',
          'hide__after-xxl': 'nt',
          'hide__after-wide': 'nn',
          'hide__before-wide': 'nr',
          'hide__before-xxl': 'ni',
          'hide__before-xl': 'ns',
          'hide__before-lg': 'no',
          '__scrolled': 'nu',
          'hide__before-md': 'na',
          'hide__before-sm': 'nf',
          'hide__before-xs': 'nl',
          'slider--button': 'rc',
          'slider--reg': 'rp',
          'slider--reg_controls': 'rd',
          'slider--reg_pagination': 'rv',
          'slider--reg_text': 'rg',
          'slider--reg_photo': 'ry',
          '__fade': 'rb',
          'slider--reg_photo-inner': 'rw',
          'slide': 'rx',
          'slider--reg_aside': 'rk',
          'slider--reg_image': 'r_',
          'reviews': 'rj',
          'reviews--title': 'rq',
          'reviews--slider': 'rz',
          'reviews--slider_rating': 'ie',
          'reviews--slider_caption': 'it',
          'reviews--slider_more': 'in',
          'reviews--slider_text': 'ir',
          'reviews--slider_controls': 'ii',
          'reviews--slider_item': 'is',
          'reviews--download': 'io',
          'screens--slider': 'iu',
          'screens--slider_back': 'ia',
          'screens--slider_block': 'if',
          'screens--slider_wrapper': 'il',
          'functions': 'ic',
          'functions--title': 'ih',
          'functions--slider': 'ip',
          '__active': 'id',
          'functions--slider_caption': 'iv',
          'functions--slider_icon': 'im',
          'functions--slider_text': 'ig',
          'functions--slider_controls': 'iy',
          'functions--slider_item': 'ib',
          'datings': 'iw',
          'datings--app': 'ix',
          'datings--title': 'ik',
          'datings--slider': 'i_',
          'datings--slider_holder': 'ij',
          'datings--slider_island': 'iq',
          'datings--slider_item': 'iz',
          'item-1': 'se',
          'item-2': 'st',
          'item-3': 'sn',
          'item-4': 'sr',
          'item-5': 'si',
          'item-6': 'ss',
          'item-7': 'so',
          'item-8': 'su',
          'item-9': 'sa',
          'faq': 'sl',
          'faq--list': 'sc',
          'faq--item': 'sh',
          'faq--item_title': 'sp',
          'faq--item_text': 'sd',
          'faq--title': 'sv',
          'popup': 'sm',
          'popup--close': 'sg',
          'popup--title': 'sy',
          'popup--app': 'sb',
          'footer--copy': 'sw',
          'footer--app': 'sx',
          'footer--download': 'sk',
          'faq--list_more': 'sj',

          // SWIPER
          'swiper': 'swiper',
          'swiper-vertical': 'swiper-vertical',
          'swiper-wrapper': 'swiper-wrapper',
          'swiper-android': 'swiper-android',
          'swiper-slide': 'swiper-slide',
          'swiper-ios': 'swiper-ios',
          'swiper-horizontal': 'swiper-horizontal',
          'swiper-slide-invisible-blank': 'swiper-slide-invisible-blank',
          'swiper-autoheight': 'swiper-autoheight',
          'swiper-backface-hidden': 'swiper-backface-hidden',
          'swiper-3d': 'swiper-3d',
          'swiper-css-mode': 'swiper-css-mode',
          'swiper-cube-shadow': 'swiper-cube-shadow',
          'swiper-free-mode': 'swiper-free-mode',
          'swiper-centered': 'swiper-centered',
          'swiper-slide-shadow': 'swiper-slide-shadow',
          'swiper-slide-shadow-bottom': 'swiper-slide-shadow-bottom',
          'swiper-slide-shadow-left': 'swiper-slide-shadow-left',
          'swiper-slide-shadow-right': 'swiper-slide-shadow-right',
          'swiper-slide-shadow-top': 'swiper-slide-shadow-top',
          'swiper-lazy-preloader': 'swiper-lazy-preloader',
          'swiper-watch-progress': 'swiper-watch-progress',
          'swiper-slide-visible': 'swiper-slide-visible',
          'swiper-lazy-preloader-white': 'swiper-lazy-preloader-white',
          'swiper-lazy-preloader-black': 'swiper-lazy-preloader-black',
          'swiper-fade': 'swiper-fade',
          'swiper-slide-active': 'swiper-slide-active',
          'swiper-button-disabled': 'swiper-button-disabled',
          'swiper-pagination-bullet-active': 'swiper-pagination-bullet-active',
          'swiper-slide-prev': 'swiper-slide-prev',
          '-swiper-wrapper-transition-timing-function': '-swiper-wrapper-transition-timing-function',
          '-swiper-theme-color': '-swiper-theme-color',
          '-swiper-preloader-color': '-swiper-preloader-color',
          // VARS
          '-fancybox-bg': 't',
          '-app-height': 'n',
          '-app-scroll-size': 'r',
          '-sat': 'i',
          '-sar': 's',
          '-sab': 'o',
          '-sal': 'u',
          '-scroll-thumb': 'a',
          '-scroll-track': 'f',
          '-section-radius': 'c',
          '-btn-size': 'h',
          '-btn-gap': 'p',
          '-btn-font-size': 'd',
          '-nav-font-size': 'v',
          '-screen-offset': 'm',
          '-app-image-gap': 'g',
          '-slider-btn-size': 'w',
          '-slider-delay': 'x',
          '-slider-gap': 'k',
          '-aside-offset-x': '_',
          '-aside-offset-y': 'j',
          '-rating-font-size': 'q',
          '-screen-offset-top': 'z',
          '-screen-offset-left': 'te',
          '-icon-size': 'tt'
        });

        */
    console.log('Selectors updated.', rcsCore.baseLibrary.get('swiper-slide-prev'), rcsCore.baseLibrary.get('swiper'), mapping);

    processFilesInFolder(htmlFolderPath).then(() => {
      const stats = rcsCore.statistics.generate();

      console.log('Selectors replaced in all files.', stats);
    });
  });
}

// Запустите асинхронную функцию
processFiles().then(() => {
  console.log('processFiles finished');
});
