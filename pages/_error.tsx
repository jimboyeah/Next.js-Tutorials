import {AppProps} from 'next/app'
import Link from 'next/link'

// import '../styles/theme.css'

export default function Error({ Component, pageProps }:AppProps) {
  return (
    <>
    <div className="columns fxAcCenter fxCenter fxItCenter max">
      <div className="col12 fxFixed">
        <Link href="/"><a><img src="/20161106s.jpg" alt="nothing" className="grow round"/></a></Link>
      </div>
      <h1 className="col12 fxFixed rows fxCenter">I'm Nothing</h1>
    </div>
    <style jsx global>{`
    div { margin-top: -220px; }
    .round { border-radius: 16px;  }

    `}</style>
    </>
  )
}