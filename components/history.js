define(['jQuery'], function ($) {

    var historyArr = [];

    var $historyList = $('#historyList');

    var setSearchValue = null;

    var thisHistory = null;


    return {
        init: function (callback) {

            thisHistory = this;

            setSearchValue = callback;

            historyArr = JSON.parse(localStorage.getItem('search-SC-history-cookie'));

            if (historyArr === null) {
                historyArr = [];
            }

            this.createHistoryList();
        },

        updateHistory: function (keyword) {
            historyArr.push(keyword);

            if (historyArr.length === 6) {
                historyArr.splice(0, 1);
            }

            localStorage.setItem('search-SC-history-cookie', JSON.stringify(historyArr));

            this.createHistoryList();
        },

        createHistoryList: function () {
            $historyList.empty();
            for (var i = ((historyArr.length) - 1); i > -1; i--) {
                var li = $('<li/>', {
                    class: 'history-elm'
                }).text(historyArr[i]).css('cursor', 'pointer');

                // Adding onclick for every new li
                li.click(function (evt) {
                    var historyVal = evt.currentTarget.innerText;
                    if (setSearchValue !== null) {
                        setSearchValue(historyVal);
                    }
                });
                $historyList.append(li);
            }
        }
    };

});