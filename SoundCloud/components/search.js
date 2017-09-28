define(['jQuery', 'SC', 'song', 'history'], function ($, SC, Song, History) {
    'use strict';

    var thisSearch = null;

    var $search = $('#search');
    var results = $('#results');
    var next = '';
    var collection = [];

    var arrangeMode = 'list';

    return {
        init: function () {
            thisSearch = this;

            Song.init();

            arrangeMode = localStorage.getItem('arrangeMode-cookie');

            History.init(this.setSearchValue);

            $('#next').on('click', function () {
                $.ajax({
                    url: next,
                    success: function (result) {
                        next = result.next_href;
                        collection = result.collection;
                        thisSearch.displaySongs();
                    }
                })
            });

            // Click on search button
            $('#go').on('click', function (evt) {
                var searchValue = $search.val();
                thisSearch.makeNewSearch(searchValue);
            });

            // Click on Sort button
            $('.arrangeMode').on('click', function (evt) {
                if (evt.currentTarget.id === 'tiles'){
                    arrangeMode = 'tiles';
                } else {
                    arrangeMode = 'list';
                }

                localStorage.setItem('arrangeMode-cookie', arrangeMode);
                thisSearch.displaySongs();
            });
        },

        setSearchValue: function (value) {
            $search.val(value);
            thisSearch.makeNewSearch(value);
        },

        makeNewSearch: function (keyword) {
            History.updateHistory(keyword);
            SC.get('/tracks', {
                q: keyword,
                limit: 6,
                linked_partitioning: 1
            }).then(function (tracks) {
                collection = tracks['collection'];
                next = tracks.next_href;
                thisSearch.displaySongs();
            });
        },

        displaySongs: function () {
            results.empty();
            var i = 0;
            for (i; i < collection.length; i++) {
                var $el;
                if (arrangeMode === 'list'){
                    $el = $('<li/>', {
                        'class': "result-item",
                        'data-index': i,
                        'html': collection[i].title,
                        'data-src': collection[i].artwork_url,
                        'data-url': collection[i].permalink_url
                    });
                } else {
                    // tile
                    $el = $('<img/>', {
                        'class': "result-item tiles",
                        'data-index': i,
                        'html': collection[i].title,
                        'data-src': collection[i].artwork_url,
                        'data-url': collection[i].permalink_url,
                        'src' :  collection[i].artwork_url
                    });
                }

                $el.click(function (evt) {
                    var dataset = evt.currentTarget.dataset;
                    Song.renderTrackImage(dataset.index, dataset.src, dataset.url);
                }).css('cursor', 'pointer');
                results.append($el);
            }
        }
    }

});
