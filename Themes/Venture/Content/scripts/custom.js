var images = document.querySelectorAll('img');
images.forEach(function (img) {
  img.setAttribute('loading', 'lazy');
});

$(document).ready(function () {

  var isLoginPage = location.href.includes('login');
  var isVendorRegisterPage = location.href.includes('vendor-registration');
  var isRegisterPage = location.href.includes('register') || isVendorRegisterPage;

  // Menu Visibility
  function setMenuVisibility() {
    var w = $(window).width();
    if (w > 1182) {
      $('#pc-menu').show();
      $('#mob-menu').hide();
    } else {
      $('#mob-menu').show();
      $('#pc-menu').hide();
    }
  }

  setMenuVisibility();
  $(window).resize(_ => setMenuVisibility());

  // ********************************** //

  function resizeContainers() {
    var w = $(window).width();

    if (isLoginPage || isRegisterPage) {
      if (w < 500) {
        $('.card-body').addClass('p-0');
        $('.form-fields').removeClass('pl-4 pr-4 pl-5 pr-5').addClass('pl-2 pr-2');
        $('.fieldset').removeClass('pl-5 pr-5').addClass('pl-2 pr-2');
        $('#Phone').css('width', '70%');
      } else {
        $('.card-body').removeClass('p-0');
        $('.form-fields').removeClass('pl-2 pr-2').addClass('pl-4 pr-4');
        $('.fieldset').removeClass('pl-2 pr-2');
        if (isVendorRegisterPage) {
          $('.fieldset').addClass('pl-5 pr-5');
        }
        $('#Phone').css('width', '75%');
      }
    }

  }

  resizeContainers();
  $(window).resize(_ => resizeContainers());


  // ********************************** //
  // ********************************** //

  $(window).on('scroll', function () {
    setHeaderPosition();
    setAdsSpace();
  });

  function setHeaderPosition() {
    var w = $(window).width();
    if (w > 1182) {
      if ($(window).scrollTop() > 38) {
        $('.header-lower').addClass('is-fixed-on-top');
      } else {
        $('.header-lower').removeClass('is-fixed-on-top');
      }
    }
  }

  function setAdsSpace() {

    $('.spc-categories').each(function () {

      // I hate this this -_-
      var spcEl = $(this);

      // Make sure Categories grid is visible
      // Otherwise numerous AJAX call sent (basically foreach pixel scrolled)
      if (spcEl.find('.product-grid').length > 0) {

        var categoryInfoEl = spcEl.find('.category-info');

        // Again, prevent multiple AJAX call by adding a class-flag that we are preparing
        if (!categoryInfoEl.hasClass('preparing-ads')) {
          categoryInfoEl.addClass('preparing-ads');

          var categoryId = spcEl.data('categorygroupid');
          var url = '/Advertisement/HomepageCategoryWiseAdsPartialView?categoryId=' + categoryId;

          $.get(url, function (data) {
            $(data).insertBefore(categoryInfoEl);
            spcEl.find('.ads-space').addClass('spc-revolving-ad-' + categoryId);
            $('.spc-revolving-ad-' + categoryId).slick({
              autoplay: true,
              arrows: false
            });
            categoryInfoEl.addClass('ads-displayed');
          });
        }

      }

    });
  }

  $('.home-page .home-page-product-grid .title strong').click(function () {
    $(location).attr('href', '/featured-products');
  });

  $('[data-toggle="tooltip"]').tooltip();

  $('.k-button-icon').click(function () {
    $('.k-overlay').remove();
  });

  $(document).click(function () {
    if ($('.k-widget').length > 0) {
      $(document).on('click', '.k-button', function (e) {
        $('.k-overlay').remove();
      });
      $(document).on('click', '.k-widget', function (e) {
        if ($(e.target).prop("tagName") == 'A') {
          $('.k-overlay').remove();
        }
      });
    }
  });

  $('.k-button').click(function () {
    $('.k-overlay').remove();
  });

  $('.show-mob-accounts-menu').click(function () {
    $('.accounts-menu-wrap').is(':visible')
      ? $('.accounts-menu-wrap').hide('slide')
      : $('.accounts-menu-wrap').show('slide');
  });

  $('.menu-close-btn').click(function () {
    $('.accounts-menu-wrap').hide('slide');
  });

});