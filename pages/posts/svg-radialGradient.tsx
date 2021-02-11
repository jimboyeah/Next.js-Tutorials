import React, {ChangeEvent, useState} from 'react'
import Layout from '../../components/layout'

  interface SVGProps<SVGRadialGradientElement> {
    fr ?: number | string
  }

export default function SVG(props:any){
  let init = {cx: 50, cy: 50, r: 50, fx: 50, fy: 50, fr: 50, spread: "pad"}
  const [Mode, setMode] = useState<Partial<typeof init>>(init)
  let doMove = (ev: React.MouseEvent<SVGSVGElement>) => {
    if( ev.altKey ){
      setMode({...Mode, cx: Mode.cx! + ev.movementX, cy: Mode.cy! + ev.movementY})
    }
    if( ev.shiftKey ){
      setMode({...Mode, fx: Mode.fx! + ev.movementX, fy: Mode.fy! + ev.movementY})
    }
    if( ev.ctrlKey && ev.altKey ){
      setMode({...Mode, r: (Mode.r! + ev.movementX)})
    }
    if( ev.ctrlKey && ev.shiftKey ){
      setMode({...Mode, fr: (Mode.fr! + ev.movementX)})
    }
  }
  let setSpread = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setMode({...Mode, spread: ev.target.value})
  }
  return (
    <Layout>
      <div className="columns fxItCenter">
      <svg onMouseMove={doMove} width="400" viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg">
        <defs>
        <radialGradient spreadMethod={Mode.spread}
                        cx={Mode.cx+"%"}
                        cy={Mode.cy+"%"}
                        r={Mode.r+"%"}
                        fx={Mode.fx+"%"}
                        fy={Mode.fy+"%"}
                        id="flameGradient">
            <stop offset="0%" stopColor="white"/>
            <stop offset="10%" stopColor="yellow"/>
            <stop offset="95%" stopColor="red"/>
        </radialGradient>
        </defs>
        <circle fill="url(#flameGradient)" cx="50" cy="50" r="50" />
      </svg>
      <p>Pres Alt, Shift，Ctrl+Alt, Ctrl+Shift with mouse movement. 
        <br />{JSON.stringify(Mode)} in percent.
        <p>spreadMethod:
        <label htmlFor="pad"> pad <input onChange={setSpread} name="spread" type="radio" value="pad" id="pad"/></label>
        <label htmlFor="repeat"> repeat <input onChange={setSpread} name="spread" type="radio" value="repeat" id="repeat"/></label>
        <label htmlFor="reflect"> reflect <input onChange={setSpread} name="spread" type="radio" value="reflect" id="reflect"/></label>
        </p>
      </p>

      </div>
    </Layout>
  );
}
