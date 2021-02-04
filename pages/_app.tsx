import {AppProps} from 'next/app'

import '../styles/theme.css'

export default function App({ Component, pageProps }:AppProps) {
  return (
    <><Component {...pageProps} /></>
  )
}