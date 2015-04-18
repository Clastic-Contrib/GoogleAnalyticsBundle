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
                var $chartContainer = $(this).find('.chart-container');
                var $chart = $chartContainer.find('.chart');
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

                var $gSessionChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        metrics: 'ga:sessions',
                        dimensions: 'ga:date',
                        'start-date': '30daysAgo',
                        'end-date': 'today'
                    },
                    chart: {
                        container: $chart.find('.ga-sessions').get(0),
                        type: 'LINE',
                        options: {
                            width: '100%'
                        }
                    }
                });

                $gSessionChart.set({query: {ids: 'ga:' + props.profileId}}).execute();
                $gSessionChart.on('success', function(data) {
                    $chartContainer.find('h4').removeClass('hidden');
                    $chartContainer.find('.ga-count-sessions').text(data.response.totalsForAllResults['ga:sessions']);
                    $loading.hide();
                });
                $gSessionChart.on('error', function() {
                    $loading.text('You do not have permissions to see the data.');
                });

                var $gHitsChart = new gapi.analytics.googleCharts.DataChart({
                    query: {
                        metrics: 'ga:hits',
                        dimensions: 'ga:date',
                        'start-date': '30daysAgo',
                        'end-date': 'today'
                    },
                    chart: {
                        container: $chart.find('.ga-hits').get(0),
                        type: 'LINE',
                        options: {
                            width: '100%'
                        }
                    }
                });

                $gHitsChart.set({query: {ids: 'ga:' + props.profileId}}).execute();
                $gHitsChart.on('success', function(data) {
                    $chartContainer.find('.ga-count-hits').text(data.response.totalsForAllResults['ga:hits']);
                });
            });
        });
    });
})(jQuery);
