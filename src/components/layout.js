import React from 'react'
import '../globals.scss'
import { Theme, Content } from '@carbon/react'
import RootHeader from './header/header'
import RootFooter from './footer/footer'
import ExternalScripts from './external-scripts/external-scripts'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Carbon + Next13',
  description: 'IBM Carbon Tutorial with NextJS 13',
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <head>
        <meta name='impact-site-verification' value='293fe9bc-f968-414d-a4a0-2523b57e9bdc'></meta>
        {process.env.NODE_ENV !== 'development' && (

          <>
            <ExternalScripts></ExternalScripts>
            {/* This adds grow script in Page source for verification */}
            <script data-grow-initializer="">{`!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTplYjgzZjZmYy02MjgwLTQzMjYtYTAxYS00ZjlmYzU4Zjk2MTU=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`}</script>
          </>
        )}

      </head>
      <body>
        <div>
          <Theme theme="g100">
            <RootHeader></RootHeader>
            <Content>
              {children}
              <Theme theme='g90'>
                <RootFooter></RootFooter>
              </Theme>
            </Content>

          </Theme>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
