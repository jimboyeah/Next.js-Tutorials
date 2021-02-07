import {Component} from 'react'

export default class PageTutorial extends Component {
  static getInitialProps(ctx:any){ 
      // console.log('====== PageTutorial getInitialProps()', new Date().toISOString(), /* ctx */); 
      return {init:"yes"}
  }
  constructor(props:any){ 
      super(props); 
      // console.log('====== PageTutorial constructor()', new Date().toISOString(), /* props */); 
  }
  render(){ 
    // console.log('====== PageTutorial render()', new Date().toISOString(), ); 
    return(<>PAGE{JSON.stringify(this.props)}</>) 
  }
}

// export async function getStaticProps(context:type) {
//   console.log('====== PageTutorial getStaticProps()', new Date().toISOString(), );
//   return {
//     props:{
//       data:"test"
//     }
//   }
// }