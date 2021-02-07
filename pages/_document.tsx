import Document, {DocumentContext, Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx:DocumentContext) {
    const renderPageOri = ctx.renderPage
    
    ctx.renderPage = () => renderPageOri({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    // console.log('====== MyDocument getInitialProps()', new Date().toISOString(), /* ctx */);
    return initialProps
  }

  constructor(ctx:any){ 
    super(ctx); 
    // console.log('====== MyDocument constructor()', new Date().toISOString(), /* ctx */); 
  }

  render(){ 
    // console.log('====== MyDocument render()', new Date().toISOString(),); 
    return(
      <>
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
      </>
    ) 
  }
}

export default MyDocument