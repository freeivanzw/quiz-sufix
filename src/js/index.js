
jQuery.fn.dropdown = function (options) {

    var settings = $.extend({
        arrow: '',
        prevent: true,
        onChange: ''
    }, options);

    return this.each(function () {
        var $this = $(this);

        if ($this.find('.selected').length > 0) {
            if ($(this).find('.overflow input').length > 0) {
                $this.find('input:eq(0)')
                    .val($this.find('.selected').text())
                    .end()
                    .find('input').eq(1).val($this.find('.selected a').data('value'))
                    .end()
                    .find('.selected').closest('li').hide();
            } else {
                $this.find('span:eq(0)')
                    .html($this.find('.selected').text() + settings.arrow)
                    .end()
                    .find('input').val($this.find('.selected a').data('value'))
                    .end()
                    .find('.selected').closest('li').hide();
            }
        }

        $this.on('click', '.overflow', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (!$(this).closest('.dropdown').hasClass('dropdown-open') || e.target.tagName === 'INPUT') {
                $this.addClass('dropdown-open').find('ul:eq(0)').stop().slideDown(function () {
                    var h = parseInt($(this).outerHeight(true, true)),
                        top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                        wh = parseInt($(window).height());

                    if (top + h > wh) {
                        var dwh = wh - top - 10;

                        if (dwh < 200) {
                            dwh = 200;
                        }

                        $(this).css({
                            'max-height': dwh
                        });
                    } else {
                        $(this).css({
                            'max-height': 'auto'
                        });
                    }
                });
            } else {
                $this.removeClass('dropdown-open').find('ul:eq(0)').stop().slideUp();
            }
        });

        $this.on('keyup paste', '.overflow input', function () {
            var val = $.trim($(this).val()).toLowerCase();

            if (val === '') {
                $this.find('.search_hidden').removeClass('search_hidden').removeClass('hidden');
            } else {
                $this.find('li').map(function () {
                    if ($(this).find('a').text().toLowerCase().search(val) > -1) {
                        $(this).removeClass('search_hidden').removeClass('hidden');
                    } else {
                        $(this).addClass('search_hidden').addClass('hidden');
                    }
                });
            }
        });

        $this.find('ul').eq(0).on('click', 'a', function (e) {
            e.preventDefault();

            if (!$(this).hasClass('disabled')) {
                if (settings.prevent === false) {
                    window.location.href = $(this).attr('href');
                } else {
                    $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected').hide();

                    if ($(this).find('.overflow input').length > 0) {
                        $this.find('input:eq(0)').val($(this).text()).end().find('input:eq(1)').val($(this).data('value'));
                    } else {
                        $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
                    }

                    $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                    if ($.isFunction(settings.onChange)) settings.onChange($(this));
                }
            }
        });
    });
};


$(function () {
    let $dark = $('.shadow');

    $dark.on('click', function (e) {
        e.preventDefault();
        $(this).addClass('hidden');
    })

    function showPopup(popup) {
        $('body').addClass('overflow');
        $('.popup_wrap').removeClass('hidden');
        $(popup).addClass('active');
    }

    function hiddenPopup(popup) {
        $('body').removeClass('overflow');
        $('.popup_wrap').addClass('hidden');
        $(popup).removeClass('active')
    }

    $('.close_popup').on('click', function (e) {
        e.preventDefault();

        hiddenPopup($(this.closest('.login_popup')))
    })

    $(document).on('click', function (e) {
        if($(e.target).hasClass('popup_wrap')) {
            $('.popup_wrap').addClass('hidden');
            $('.popup').removeClass('active');
            $('body').removeClass('overflow');
        }
    })

    $('.user_btn').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('login')) {
            showPopup('.login_popup')
        } else {
            if ($(this).is('.user_btn-active')){
                $('.header_menu.menu_opened').removeClass('menu_opened');
                $(this).removeClass('user_btn-active');
            } else {
                $(this).addClass('user_btn-active');
                $('.header_menu').addClass('menu_opened');
            }
        }
    })

    $(document).on('click', function (e) {
        if($(e.target).closest('.header_menu.menu_opened').length == 0 && !$(e.target).closest('.user_btn').is('.user_btn-active')) {
            $('.header_menu.menu_opened').removeClass('menu_opened');

            $('.user_btn').removeClass('user_btn-active')
        }
    })

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    $('.copy_quiz').on('click', function (e) {
        var btnCopy = $(this);
        var textCopy = $(this).prev()
        e.preventDefault();

        btnCopy.addClass('active');
        setTimeout(function () {
            btnCopy.removeClass('active');
        }, 500)
        copyToClipboard(textCopy);
    })

    $('.quiz_list-more').on('click', function (e) {
        console.log($(this).parent('li'))
        $(this).closest('li').find('.quiz_list-control').toggleClass('active');
    })

    $('.change_btn').on('click', function (e) {
        e.preventDefault();

        $(this).parent().addClass('active');
    })

    $('.close_change').on('click', function (e) {
        e.preventDefault();

        $(this).closest('.change_setting').prev('.setting_info').removeClass('active');
    })

    $('.edit_social').on('click', function (e) {
        e.preventDefault();

        $(this).parent().addClass('active');
    })

    if($(window).width() >= 768) {
        $('#start').on('click', function (e) {
            if (!$('.start_page').hasClass('temp-2')) {
                e.preventDefault();
                $('.start_page').addClass('anim');
            }

            setTimeout(function () {
                document.location = $('#start').attr('href')
            }, 1500)
        })
    }

    $('.open-menu_quiz').on('click', function (e) {
        e.preventDefault();

        $('.menu_quiz').toggleClass('active');
    })

    $('.close-menu_quiz').on('click', function (e) {
        e.preventDefault();

        $('.menu_quiz').removeClass('active');
    })

    $('.select_dropdown').dropdown()
    $('.position_dropdown').dropdown()
    $('.category_dropdown').dropdown()

})