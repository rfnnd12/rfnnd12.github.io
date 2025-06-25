/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const portfolioContainer = isotopeItem.querySelector('.isotope-container');
    const portfolioItems = Array.from(portfolioContainer.querySelectorAll('.isotope-item')); // Get all items once

    const initialRandomLimit = 5; // Jumlah item yang akan ditampilkan secara acak

    // Function to shuffle an array (Fisher-Yates shuffle)
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }

    // Function to apply random filter for "Highlights" tab
    function applyRandomFilterForHighlights() {
        // First, show all items (temporarily) so Isotope can re-evaluate them
        // This is crucial to reset any previous display:none
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.classList.remove('random-selected'); // Clear previous selection
        });
        
        // Shuffle all items and select the first 'initialRandomLimit'
        const shuffledItems = shuffleArray([...portfolioItems]); 
        const selectedItems = shuffledItems.slice(0, initialRandomLimit);

        // Add a temporary class to the selected items
        selectedItems.forEach(item => {
            item.classList.add('random-selected');
        });

        // Tell Isotope to filter by the newly added class
        initIsotope.arrange({ filter: '.random-selected' });
    }

    // Function to reset all items' visibility and Isotope filter to show all
    function resetAllItemsAndFilter() {
        portfolioItems.forEach(item => {
            item.classList.remove('random-selected'); // Clean up temporary class
            item.style.display = 'block'; // Ensure they are visible for Isotope filtering
        });
        initIsotope.arrange({ filter: '*' }); // Tell Isotope to show everything
    }


    imagesLoaded(portfolioContainer, function() {
      initIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter, // Initial filter from data-default-filter
        sortBy: sort
      });

      // Apply random initial filter for "Highlights" on page load if it's the active filter
      const highlightsFilterButton = isotopeItem.querySelector('.isotope-filters li[data-filter="*"]');
      if (highlightsFilterButton && highlightsFilterButton.classList.contains('filter-active')) {
        applyRandomFilterForHighlights();
      }
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        // Remove active class from previous filter
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        // Add active class to clicked filter
        this.classList.add('filter-active');

        let currentFilter = this.getAttribute('data-filter');

        if (currentFilter === '*') { // "Highlights" filter
          applyRandomFilterForHighlights();
        } else if (currentFilter === 'show-all') { // "Show All" custom filter
          resetAllItemsAndFilter();
        } else { // Specific category filters (e.g., .filter-Activity)
          resetAllItemsAndFilter(); // Reset to show all, then filter
          initIsotope.arrange({ filter: currentFilter });
        }

        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        // This function is not defined in the provided template,
        // so if you use swiper-tab, you'd need to define initSwiperWithCustomPagination
        // new Swiper(swiperElement, config); // Fallback if custom pagination is not defined
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
