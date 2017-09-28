require.config({
    baseUrl: './components',
    paths: {
        'jQuery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        'SC': '//connect.soundcloud.com/sdk/sdk-3.2.1',
        'app': '../app'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'SC': {
            exports: 'SC'
        }
    }
});

require(['app'], function (app) {
    app.init();
});