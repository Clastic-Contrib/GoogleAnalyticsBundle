(function($){
    $('.tabpanel a[href="#google_analytics"]').one('click', function() {

        var $container = $('.analytics-container');

        if (!$container) {
            return;
        }

        // Load script
        (function(w,d,s,g,js,fs){
            g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
            js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
            js.src='https://apis.google.com/js/platform.js';
            fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
        }(window,document,'script'));


        gapi.analytics.ready(function() {

            $container.each(function(){
                var $auth = $(this).find('.auth-container');
                var $chart = $(this).find('.chart-container');
                var props = $(this).data('ga');
                var $loading = $container.find('.loading');

                /**
                 * Authorize the user immediately if the user has already granted access.
                 * If no access has been created, render an authorize button inside the
                 * element with the ID "embed-api-auth-container".
                 */
                gapi.analytics.auth.authorize({
                    container: $auth.get(0),
                    clientid: props.clientId,
                    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
                    overwriteDefaultScopes: true
                }).on('success', function() {
                    $auth.hide();
                }).on('error', function() {
                    $loading.hide();
                });

                /**
                 * Create a new DataChart instance with the given query parameters
                 * and Google chart options. It will be rendered inside an element
                 * with the id "chart-container".
                 */
                var $gChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        metrics: 'ga:sessions',
                        dimensions: 'ga:date',
                        'start-date': '30daysAgo',
                        'end-date': 'today'
                    },
                    chart: {
                        container: $chart.get(0),
                        type: 'LINE',
                        options: {
                            width: '100%'
                        }
                    }
                });

                $gChart.set({query: {ids: 'ga:' + props.profileId}}).execute();
                $gChart.on('success', function() {
                    $loading.hide();
                });
            });

        });
    });
})(jQuery);
