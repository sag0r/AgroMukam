$(function () {
  "use strict";
  document.addEventListener("touchstart", function () { }, false);

  function getComputedStyleValue(item, prop) {
    return parseInt(
      window.getComputedStyle(item)
        .getPropertyValue(prop)
    );
  }

  function getClientRect(item, elem, prop) {
    return item.querySelector(elem)
      .getBoundingClientRect()[prop];
  }

  function resizeAllMasonryItems(grid) {
    var rowGap = getComputedStyleValue(grid, 'grid-row-gap');
    var rowHeight = getComputedStyleValue(grid, 'grid-auto-rows');
    var items = grid.querySelectorAll('.masonry-item');
    for (var item of items) {
      var height = getClientRect(item, '.masonry-content', 'height');
      var rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    }
  }

  function refreshMasonryGrid(force) {
    if ($('.wsmenu').hasClass('masonry-initialize') && !force) {
      return;
    }

    $('.subcategory-ul').sliderMenu();

    var grids = document.querySelectorAll('.masonry');
    for (var grid of grids) {
      resizeAllMasonryItems(grid);
    }
    $('.wsmenu').addClass('masonry-initialize');
  }

  $(function () {
    $("body").wrapInner('<div class="wsmenucontainer" />');
    $('<div class="overlapblackbg"></div>').prependTo("\.wsmenu");
    $("#wsnavtoggle").click(function () {
      $("body").toggleClass("wsactive")
    });
    $("\.overlapblackbg").click(function () {
      $("body").removeClass("wsactive")
    });
    $("\.wsmenu-list> li").has("\.sub-menu").prepend('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
    $("\.wsmenu-list > li").has("\.wsshoptabing").prepend('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
    $("\.wsmenu-list > li").has("\.wsmegamenu").prepend('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
    $("\.wsmenu-click").on("click", function () {
      $(this).toggleClass("ws-activearrow").parent().siblings().children().removeClass("ws-activearrow");
      $("\.sub-menu, \.wsshoptabing, \.wsmegamenu").not($(this).siblings("\.sub-menu, \.wsshoptabing, \.wsmegamenu")).slideUp("slow");
      $(this).siblings("\.sub-menu").slideToggle("slow");
      $(this).siblings("\.wsshoptabing").slideToggle("slow");
      $(this).siblings("\.wsmegamenu").slideToggle("slow");
      return false
    });
    $("\.wstabitem > li").has("\.wstitemright").prepend('<span class="wsmenu-click02"><i class="wsmenu-arrow"></i></span>');
    $("\.wsmenu-click02").on("click", function () {
      $(this).siblings("\.wstitemright").slideToggle("slow");
      $(this).toggleClass("ws-activearrow02").parent().siblings().children().removeClass("ws-activearrow02");
      $("\.wstitemright").not($(this).siblings("\.wstitemright")).slideUp("slow");
      return false
    });
    $("\.wstabitem02 > li").has("\.wstbrandbottom").prepend('<span class="wsmenu-click03"><i class="wsmenu-arrow"></i></span>');
    $("\.wsmenu-click03").on("click", function () {
      $(this).siblings("\.wstbrandbottom").slideToggle("slow");
      $(this).toggleClass("ws-activearrow03").parent().siblings().children().removeClass("ws-activearrow03");
      $("\.wstbrandbottom").not($(this).siblings("\.wstbrandbottom")).slideUp("slow");
      return false
    });
    $(window).ready(function () {
      $("\.wsshoptabing\.wtsdepartmentmenu > \.wsshopwp > \.wstabitem > li").on("mouseenter", function () {
        $(this).addClass("wsshoplink-active").siblings(this).removeClass("wsshoplink-active");
        refreshMasonryGrid(false);
        return false
      });
      $("\.wsshoptabing\.wtsbrandmenu > \.wsshoptabingwp > \.wstabitem02 > li").on("mouseenter", function () {
        $(this).addClass("wsshoplink-active").siblings(this).removeClass("wsshoplink-active");
        refreshMasonryGrid(false);
        return false
      });
    });
    _0x291ax2();
    $(window).on("load resize", function () {
      var _0x291ax1 = $(window).outerWidth();
      if (_0x291ax1 <= 991) {
        $("\.wsshopwp").css("height", "100%");
        $("\.wstitemright").css("height", "100%")
      } else {
        _0x291ax2()
      }
    });

    function _0x291ax2() {
      var _0x291ax3 = 1;
      $("\.wstabitem > li").each(function () {
        var _0x291ax4 = $(this).find("\.wstitemright").innerHeight();
        _0x291ax3 = _0x291ax4 > _0x291ax3 ? _0x291ax4 : _0x291ax3;
        $(this).find("\.wstitemright").css("height", "auto")
      });
      $("\.wsshopwp").css("height", _0x291ax3 + 0)
    }
    $(document).ready(function (_0x291ax5) {
      function _0x291ax6() {
        if (_0x291ax5(window).outerWidth() >= 991) {
          _0x291ax5("\.wsshoptabing, \.wstitemright, \.wstbrandbottom, \.wsmegamenu, ul\.sub-menu").css({
            "display": ""
          })
        }
      }
      _0x291ax6();
      _0x291ax5(window).resize(_0x291ax6);
    });
    $(window).on("resize", function () {
      if ($(window).outerWidth() <= 991) {
        $("\.wsmenu").css("height", $(this).height() + "px");
        $("\.wsmenucontainer").css("min-width", $(this).width() + "px")
      } else {
        $("\.wsmenu").removeAttr("style");
        $("\.wsmenucontainer").removeAttr("style");
        $("body").removeClass("wsactive");
        $("\.wsmenu-click").removeClass("ws-activearrow");
        $("\.wsmenu-click02").removeClass("ws-activearrow02");
        $("\.wsmenu-click03").removeClass("ws-activearrow03")
      }
    });
    $(window).trigger("resize")
  });
  $(window).on("load", function () {
    $("\.wsmobileheader \.wssearch").on("click", function () {
      $(this).toggleClass("wsopensearch")
    });
    $("body, \.wsopensearch \.wsclosesearch").on("click", function () {
      $("\.wssearch").removeClass("wsopensearch")
    });
    $("\.wssearch, \.wssearchform form").on("click", function (_0x291ax7) {
      _0x291ax7.stopPropagation()
    });
  });


  $.fn.sliderMenu = function () {
    $(this).each(function () {
      var $menu = $(this).clone(),
        $newMenu = $('<div>').addClass('slider-menu'),
        $nav = $('<nav>').addClass('slider-menu__container')
          .attr({
            'role': 'navigation',
            'aria-label': 'Menu'
          }),
        currentLeft = 0;

      // Build the new menu.
      $menu.attr('class', 'slider-menu__menu');
      $('ul', $menu).addClass('slider-menu__menu')
        .prepend('<li><a href="#" class="slider-menu__back"><span class="slider-menu__text">Back</span></a>')
        .parent().addClass('slider-menu--has-children');
      $('li', $menu).addClass('slider-menu__item');
      $('a', $menu).addClass('slider-menu__link');
      $nav.html($menu);
      $('[data-vertical="true"]', $nav).addClass('slider-menu__item--vertical');
      $newMenu.html($nav);

      // Interaction functionality.
      $($newMenu).on('click', '.slider-menu__link', function (e) {
        var $clickedLink = $(this),
          $container = $clickedLink.closest('.slider-menu'),
          $parentItem = $clickedLink.parent('.slider-menu__item'),
          $parentMenu = $parentItem.parent('.slider-menu__menu'),
          $childMenu = $('> .slider-menu__menu', $parentItem);

        if ($childMenu.length || $clickedLink.hasClass('slider-menu__back')) {
          if ($clickedLink.hasClass("slider-menu__back")) {
            e.preventDefault();
          } else {
            var parentOffset = $(this).parent().offset();
            var relX = e.pageX - parentOffset.left;

            if (relX > 105) {
              e.preventDefault();
            } else {
              return;
            }
          }

          if ($parentItem.data('vertical')) {
            // Vertical menu.
            if ($childMenu.is(':visible')) {
              // Hide
              $parentMenu.addClass('slider-menu--active');
              $childMenu.hide();
              $container.css('height', $parentMenu.height());
              /*$childMenu.slideUp( 200, function() {
                $container.css( 'height', $parentMenu.height() );
              });*/
              $clickedLink.removeClass('slider-menu__link--active-link');
            } else {
              // Show
              $childMenu.show();
              $container.css('height', $parentMenu.height());
              /*$childMenu.slideDown( 200, function() {
                $container.css( 'height', $parentMenu.height() );
              });*/
              $clickedLink.addClass('slider-menu__link--active-link');
            }
          } else {
            $('.slider-menu__item--vertical .slider-menu__menu', $container).hide();
            $('.slider-menu__item--vertical .slider-menu__link', $container).removeClass('slider-menu__link--active-link');

            // Horizontal menu.
            if ($clickedLink.hasClass('slider-menu__back')) {
              // Go back.
              var $activeMenu = $parentMenu.parent().parent();

              currentLeft -= 100;

              $nav.css('left', '-' + currentLeft + '%');

              $parentMenu.removeClass('slider-menu--active');
              $activeMenu.addClass('slider-menu--active')
                .parents('.slider-menu__menu').addClass('slider-menu--active');

              $container.css('height', $activeMenu.height());
            } else {
              currentLeft += 100;

              $nav.css('left', '-' + currentLeft + '%');

              $parentMenu.removeClass('slider-menu--active');
              $childMenu.addClass('slider-menu--active')
                .parents('.slider-menu__menu').addClass('slider-menu--active');

              $container.css('height', $childMenu.height());
            }
          }
        }
        refreshMasonryGrid(true);
      });

      $('.slider-menu__back').each(function () {
        $(this)
          .html('<i class="fa fa-chevron-left mr-2"></i>' +
            $(this)
              .parent().parent()
              .prev()
              .text().trim());
      });

      // Replace the current menu.
      $(this).replaceWith($newMenu);
    });
  };



}())