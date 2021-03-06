﻿(function ($) {
    // Shell for your plugin code
    DateInline = function (options) {
        // options - объект инициализации
        var that = this;
        // если какие-то настройки переопределены пользователем, то подставляются они
        var options = $.extend({}, DateInline.defaults, options);
        DateInline.prototype.options = options;
        // Plugin code
        return this.each(function () {
            // Do something to each item
            DateInline.prototype.Init(this);
        });
    };

    DateInline.prototype.HasPrevious = function () {
        var minDate = this.MakeOnlyDate(DateInline.prototype.options.minDate);
        var currDate = this.MakeOnlyDate(DateInline.prototype.options.currentDate);
        //        localDate.setDate(DateInline.options.minDate.getDate());
        return currDate.getTime() <= minDate.getTime() ? false : true;
    };

    DateInline.prototype.HasNext = function () {
        var maxDate = DateInline.prototype.MakeOnlyDate(DateInline.prototype.options.maxDate);
        var currDate = DateInline.prototype.MakeOnlyDate(DateInline.prototype.options.currentDate);
        //localDate.setDate(DateInline.options.maxDate.getDate());
        return currDate.getTime() >= maxDate.getTime() ? false : true;
    };

    DateInline.prototype.GoPrevious = function () {
        if (DateInline.prototype.HasPrevious()) {
            DateInline.prototype.options.currentDate.setDate(DateInline.prototype.options.currentDate.getDate() - 1);
            DateInline.prototype.UpdateControl();
            DateInline.prototype.options.afterChange(DateInline.prototype.options.currentDate);
        }
    };

    DateInline.prototype.GoNext = function () {
        if (DateInline.prototype.HasNext()) {
            DateInline.prototype.options.currentDate.setDate(DateInline.prototype.options.currentDate.getDate() + 1);
            DateInline.prototype.UpdateControl();
            DateInline.prototype.options.afterChange(DateInline.prototype.options.currentDate);
        }
    };

    DateInline.prototype.Init = function (obj) {
        var $buttonBack = $('<button></button>').addClass('btn prev btn-mini').append('«');
        var $buttonNext = $('<button></button>').addClass('btn next btn-mini').append('»');
        var $innerData = $('<span></span>').addClass('date-inline-text').append(DateInline.prototype.options.currentDate.toDateString());
        var $list = $('<div></div>').addClass('date-inline-wrapper').append($buttonBack).append($innerData).append($buttonNext);
        $(obj).append($list);
        $('.date-inline-wrapper .next').bind('click', DateInline.prototype.GoNext);
        $('.date-inline-wrapper .prev').bind('click', DateInline.prototype.GoPrevious);
        DateInline.prototype.UpdateControl();
    };

    DateInline.prototype.options = {};

    DateInline.prototype.SetDateText = function () {
        var $textContainer = $('.date-inline-wrapper .date-inline-text');
        var lDate = DateInline.prototype.options.currentDate;
        var day = lDate.getDate() < 10 ? '0' + lDate.getDate() : lDate.getDate();
        var month = (lDate.getMonth() + 1) < 10 ? '0' + (lDate.getMonth() + 1) : (lDate.getMonth() + 1);
        var daysOfWeek = DateInline.prototype.options.daysOfWeek;
        $($textContainer).empty().append(daysOfWeek[lDate.getDay()] + ', ' + day + '.' + month + '.' + lDate.getFullYear());
    };

    DateInline.prototype.CheckDisableNext = function () {
        var $nextButton = $('.date-inline-wrapper .next');
        if (DateInline.prototype.HasNext()) {
            $($nextButton).removeAttr('disabled');
        }
        else {
            $($nextButton).attr('disabled', 'true');
        }
    };

    DateInline.prototype.CheckDisablePrevious = function () {
        var $previousButton = $('.date-inline-wrapper .prev');
        if (DateInline.prototype.HasPrevious()) {
            $($previousButton).removeAttr('disabled');
        }
        else {
            $($previousButton).attr('disabled', 'true');
        }
    };

    DateInline.prototype.UpdateControl = function () {
        DateInline.prototype.SetDateText();
        DateInline.prototype.CheckDisableNext();
        DateInline.prototype.CheckDisablePrevious();
    };

    DateInline.prototype.GetDate = function () {
        return DateInline.prototype.options.currentDate;
    };

    // по умолчанию настройки
    DateInline.defaults = {
        minDate: new Date(),
        maxDate: new Date(),
        currentDate: new Date(),
        afterChange: function callbackChangeFunc() { },
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    };

    DateInline.prototype.MakeOnlyDate = function (dateIn) {
        return new Date(dateIn.getFullYear(), dateIn.getMonth(), dateIn.getDate());
    };

    $.fn.dateInline = DateInline;
})(jQuery);