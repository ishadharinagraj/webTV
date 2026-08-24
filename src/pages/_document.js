import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import Script from 'next/script'

export default function Document() {
    return (
        <Html>
            <Head>
            </Head>
            {/* <Script
                type="text/javascript" src="flowplayer.min.js"
            />
            <Script
                type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
            /> */}

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}