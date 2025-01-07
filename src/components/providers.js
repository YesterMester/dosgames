import React from 'react';
import { Content, Theme } from '@carbon/react';
import RootHeader from './header/header';


export function Providers({ children }) {
  return (
    <div>
        <Theme theme="g100">
          
          <RootHeader></RootHeader>
        </Theme>
        <Content>
          {children}
        </Content>
    </div>
  )
}