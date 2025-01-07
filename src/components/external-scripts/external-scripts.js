import React from 'react';
import { Helmet } from 'react-helmet';

const ExternalScripts = () => {
    return (
        <Helmet>
            {/* Clarity Script */}
            <script type="text/javascript">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "ne59idha0w");
                `}
            </script>

            {/* Google Tag Manager Script */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-T19W552LHG"></script>
            <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-T19W552LHG');
                `}
            </script>
        </Helmet>
    );
};

export default ExternalScripts;