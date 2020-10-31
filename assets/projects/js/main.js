(function ($, window, document, undefined) {
    "use strict";

    // init cubeportfolio

    $("#js-grid-tabs").cubeportfolio({
        filters: "#js-filters-tabs",
        defaultFilter: ".about",
        animationType: "fadeOut",
        gridAdjustment: "default",
        displayType: "default",
        caption: "",
    });

    $("#js-grid-lightbox-gallery").cubeportfolio({
        filters:
            "#js-filters-lightbox-gallery1, #js-filters-lightbox-gallery2, #js-filters-lightbox-gallery3",
        loadMore: "#js-loadMore-lightbox-gallery",
        loadMoreAction: "click",
        layoutMode: "grid",
        mediaQueries: [
            {
                width: 1500,
                cols: 3,
            },
            {
                width: 1100,
                cols: 3,
            },
            {
                width: 800,
                cols: 2,
            },
            {
                width: 480,
                cols: 1,
                options: {
                    caption: "",
                },
            },
            {
                width: 320,
                cols: 1,
                options: {
                    caption: "",
                },
            },
        ],
        defaultFilter: "*",
        animationType: "rotateSides",
        gapHorizontal: 1,
        gapVertical: 1,
        gridAdjustment: "responsive",
        caption: "zoom",
        displayType: "sequentially",
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: true,
        lightboxTitleSrc: "data-title",
        lightboxCounter:
            '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePageInline
        singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlinePosition: "below",
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function (url, element) {
            // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: "GET",
                dataType: "html",
                timeout: 30000,
            })
                .done(function (result) {
                    t.updateSinglePageInline(result);
                })
                .fail(function () {
                    t.updateSinglePageInline(
                        "AJAX Error! Please refresh the page!"
                    );
                });
        },
    });

    //GG cubeportfolio galery 2
    $("#js-grid-full-width").cubeportfolio({
        filters: "#js-filters-full-width",
        loadMore: "#js-loadMore-full-width",
        loadMoreAction: "auto",
        layoutMode: "grid",
        sortToPreventGaps: false,
        defaultFilter: ".music",
        animationType: "fadeOutTop",
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: "responsive",
        mediaQueries: [
            {
                width: 1600,
                cols: 4,
            },
            {
                width: 1200,
                cols: 3,
            },
            {
                width: 800,
                cols: 2,
            },
            {
                width: 480,
                cols: 1,
                options: {
                    caption: "",
                    gapHorizontal: 10,
                    gapVertical: 10,
                },
            },
        ],
        caption: "zoom",
        displayType: "fadeIn",
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: true,
        lightboxTitleSrc: "data-title",
        lightboxCounter:
            '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
    });
})(jQuery, window, document);
