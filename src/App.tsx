import React from 'react'
import { Page } from '../src/components'
import { Anchor } from 'ual-anchor'
import { Wax } from '@eosdacio/ual-wax'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UALProvider } from 'ual-reactjs-renderer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import { Login as LoginScene, Home as HomeScene} from '../src/scenes'

const myChain = {
  chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
  rpcEndpoints: [{
    protocol: 'https',
    host: 'wax.blacklusion.io',
    port: 443
  }]
}

const wax = new Wax([myChain])

const anchor = new Anchor([myChain], {
  appName: 'Test app'
})

function App() {
  return (
    <UALProvider chains={[myChain]} authenticators={[wax, anchor]} appName='Test app'>
      <BrowserRouter>
        <Page>
          <Routes>
            <Route path="/" element={ <LoginScene/> }/>
            <Route path="/home" element={ <HomeScene/> }/>
            <Route path="*" element={ <h1>Page not found</h1> }/>
          </Routes>
        </Page>
      </BrowserRouter>
    </UALProvider>
  );
}

export default App;
