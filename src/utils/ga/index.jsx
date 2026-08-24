import React, { useEffect } from 'react'

const GoogleAnalytics = () => (<script
    dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6XDR5H7ESG');
      `,
    }}
/>)

export default GoogleAnalytics;