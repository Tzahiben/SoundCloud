define(['jQuery', 'SC', 'search'], function ($, SC, Search) {

    SC.initialize({
        client_id: 'ggX0UomnLs0VmW7qZnCzw'
    });


    function goToByScroll(id) {
        // Remove "link" from the ID
        id = id.replace("link", "");
        // Scroll
        $('html,body').animate({
                scrollTop: $("#" + id).offset().top
            },
            'slow');
    }

    return {
        init: function () {

            var nav =  $("#top-menu > li");

            $("#top-menu > li > a").click(function (e) {
                // Prevent a page reload when a link is pressed
                e.preventDefault();
                // Call the scroll function
                goToByScroll(this.id.replace('nav-', ''));

                nav.each(function (li) {
                    nav[li].firstElementChild.classList.remove('active');
                });

                e.currentTarget.classList.add('active');
            });
            Search.init();
        }
    }
});
