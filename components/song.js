define(['jQuery', 'SC'], function ($, SC) {

        var thisSong = null;
        var $playerImage = $('#playerImage');
        var $player = $('#player');

        return {
            init: function () {
                thisSong = this;
                //Click on song image to play song
                $playerImage.on('click', function (evt) {
                    thisSong.renderPlayer(evt.currentTarget.dataset.url);
                });
            },

            // Replace img src/index/url
            renderTrackImage: function (index, src, url) {
                $player.fadeOut("slow");
                $playerImage.fadeIn("slow");
                $playerImage.attr({'src': src, 'data-index': index, 'data-url': url});
                $('html, body').animate({
                    scrollTop: $player.offset().top
                }, 2000);
            },

            // Using SC plugin to play the track
            renderPlayer: function (url) {
                $playerImage.fadeOut("slow");
                SC.oEmbed(
                    url,
                    {auto_play: true}
                ).then(function (result) {
                    $player.fadeIn("slow");
                    $player.html(result.html);
                });
            }

        }
    }
);