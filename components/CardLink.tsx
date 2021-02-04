import Link from 'next/link'

type Props = { href:string, caption?:string, text?:string, children:any }

export default function CardLink({ href, caption, text, children }:Props) {
  return(
  <Link href={href} locale="zh-CN">
      <a className="card">
        <h3>{caption}</h3>
        <p>{text} {children}</p>
      </a> 
  </Link>)
}