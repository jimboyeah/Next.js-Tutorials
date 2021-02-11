import App, {AppProps} from 'next/app'
import React, {Component} from 'react'
import '../styles/theme.css'

export default class AppTutorial extends Component {
  static getInitialProps(props:any){ 
    // console.log('====== AppTutorial getInitialProps()', new Date().toISOString(), /* props */); 
    return {init:"yes"}
  }
  constructor(props:any ){ 
    super(props); 
    // console.log('====== AppTutorial constructor()', new Date().toISOString(), /* props */); 
  }
  render(){ 
    let { Component, pageProps } = this.props as AppProps;
    // console.log('====== AppTutorial render()', new Date().toISOString(), /* this.props */); 
    return(<><Component {...pageProps} /></>) 
  }
}

// export default function App({ Component, pageProps }:AppProps) {
//   return (
//     <><Component {...pageProps} /></>
//   )
// }