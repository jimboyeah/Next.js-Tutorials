import Head from 'next/head'
import Layout from '../../components/layout'

export default function ME() {
  return (
    <Layout className="container">
      <Head>
        <title>It's Jeango</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="rows fxCenter fxAcCenter fxEvenly fxWrap">
          <p className="">笔者有幸从事软件开发，一直都是兴趣驱动的工作。第一次接触计算机是 1999 年后的事，当时使用的是  486 机器，CPU 还是威胜的 333MHz 主频，硬盘也只有 4GB，系统是 Windows 98 SE。那时所谓的学电脑纯属拆玩具模式，手上可用的资源不多，网络也不发达学习资料不是太丰富。翻查硬盘或系统光盘文件成了日常活动，此外DOS 游戏也和红白机具有一样的可玩性。彼时，BAT 脚本和 Windows 98 系统中 QBasic 工具成了不错的好玩具。不知不觉，坚果从曾经的傻瓜程序员一路走到今天，从硬件玩到软件从汇编玩到C、Java、C#、Go、TS、前端到UI交互设计，分享学习自然而然成为了兴趣，没有兴趣带领还真不会有今天。</p>
          <div className="col11 fxCenter rows"><h2 className="">Curriculum Vitae</h2></div>
          <a className="card fxAsCenter fxAcCenter taCenter" href="https://jimbowhy.gitee.io/personal/cv_wpwppipi">CV 🚩Chinese Version</a>
          <a className="card fxAsCenter fxAcCenter taCenter" href="https://jimbowhy.gitee.io/personal/cv_wpwppipie">CV 🚩English Version</a>
        </div>
    </Layout>
    )
}


