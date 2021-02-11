import Layout from '../../components/layout'
import React, {ChangeEvent, useState} from 'react';

export let NamedColors = [
    {hex: '#ffe4c4', hsl: 'hsl(255,228,196)', name: 'bisque'},
    {hex: '#ffebcd', hsl: 'hsl(255,235,205)', name: 'blanchedalmond'},
    {hex: '#deb887', hsl: 'hsl(222,184,135)', name: 'burlywood'},
    {hex: '#ff7f50', hsl: 'hsl(255,127,80)' , name: 'coral'},
    {hex: '#6495ed', hsl: 'hsl(100,149,237)', name: 'cornflowerblue'},
    {hex: '#b8860b', hsl: 'hsl(184,134,11)' , name: 'darkgoldenrod'},
    {hex: '#2f4f4f', hsl: 'hsl(47,79,79)'   , name: 'darkslategray'},
    {hex: '#696969', hsl: 'hsl(105,105,105)', name: 'dimgrey'},
    {hex: '#daa520', hsl: 'hsl(218,165,32)' , name: 'goldenrod'},
];

// let randomColor = ():typeof NamedColors[0] => {
//     return NamedColors[Math.floor(Math.random()*NamedColors.length)];
// }

type Props = {
    className?:string, 
    text?:string, 
    children?: any,
    css?: any,
    forFirst?: any,
    update?: (css:any) => void
}

let Box = (props: Props) => {
    let className = props.className ?? "";
    let css = props.css ?? {};
    return (
        <div className={className} style={css}>
        {props.children}
        </div>
    )
}

let BoxList = (props: Props & {size:number}) => {
    let className = props.className ?? "box";
    let array = new Array(props.size);
    for(let i =0; i<props.size; i++) {
        array[i] = i;
    }
    let forFirst = props.forFirst ?? {};
    return (
        <>
        {array.map(id => {
            let css = {background: NamedColors[id%NamedColors.length].name, padding: 48, order: id};
            let order = id;
            if(id === 0){
                order = forFirst.order ?? order;
                css = {...css, ...forFirst};
            }
            // console.log(id, css);
            return (<Box key={id} className={className} css={{...css, ...props.css}}>
                {order} {id===0? 'order':''}
                </Box>)
        })}
        </>
    )
}

let Flex = (props:Props) => {
    let setGrow = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({flexGrow: ev.target.value ?? ""})};
    let setShrink = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({flexShrink: ev.target.value ?? ""})};
    let setBasis = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({flexBasis: (ev.target.value ?? "")+'px'})};
    let setOrder = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({order: ev.target.value ?? ""})};
    let setRowGap = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({rowGap: (ev.target.value ?? "")+'px'})};
    let setColumnGap = (ev:ChangeEvent<HTMLInputElement>) => {
        props.update && props.update({columnGap: (ev.target.value ?? "")+'px'})};
    let grow = props.css?.flexGrow;
    let shrink = props.css?.flexShrink;
    let basis = props.css?.flexBasis;
    let order = props.css?.order;
    let rowGap = props.css?.rowGap;
    let columnGap = props.css?.columnGap;
    return (
        <div className="rows fxWrap">
        <p className="col13">
        <input className="button" type="range" defaultValue="1" min="0" max="10" onChange={(ev)=>setGrow(ev)} />
        <br/>{`flex-grow: ${grow};`}
        </p>
        <p className="col13">
        <input className="button" type="range" defaultValue="1" min="0" max="10" onChange={(ev)=>setShrink(ev)} />
        <br/>{`flex-shrink: ${shrink};`}
        </p>
        <p className="col13">
        <input className="button" type="range" defaultValue="1" min="0" max="500" onChange={(ev)=>setBasis(ev)} />
        <br/>{`flex-basis: ${basis};`}
        </p>
        <p className="col13">
        <input className="button" type="range" defaultValue="0" min="0" max="500" onChange={(ev)=>setRowGap(ev)} />
        <br/>{`row-gap: ${rowGap};`}
        </p>
        <p className="col13">
        <input className="button" type="range" defaultValue="0" min="0" max="500" onChange={(ev)=>setColumnGap(ev)} />
        <br/>{`column-gap: ${columnGap};`}
        </p>
        <p className="col13">
        <input className="button" type="range" defaultValue="0" min="-5" max="15" onChange={(ev)=>setOrder(ev)} />
        <br/>{`order: ${order};`}
        </p>
        </div>
    )
}

let JustifySelf = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({justifySelf: css})};
    let css = props.css?.justifySelf;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("baseline")}>baseline</button>
        <button className="button" onClick={()=>setFX("normal")}>normal</button> Grid Only {`justify-self: ${css};`}
        </p>
    )
}

let AlignSelf = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({alignSelf: css})};
    let css = props.css?.alignSelf;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("baseline")}>baseline</button>
        <button className="button" onClick={()=>setFX("auto")}>auto</button> {`align-self: ${css};`}
        </p>
    )
}

let JustifyContent = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({justifyContent: css})};
    let css = props.css?.justifyContent;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("space-around")}>around</button>
        <button className="button" onClick={()=>setFX("space-between")}>between</button>
        <button className="button" onClick={()=>setFX("space-evenly")}>evenly</button>
        <button className="button" onClick={()=>setFX("normal")}>normal</button> {`justify-content: ${css};`}
        </p>
    )
}

let JustifyItems = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({justifyItems: css})};
    let css = props.css?.justifyItems;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("baseline")}>baseline</button>
        <button className="button" onClick={()=>setFX("normal")}>normal</button> Grid Only {`justify-items: ${css};`}
        </p>
    )
}

let AlignItems = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({alignItems: css})};
    let css = props.css?.alignItems;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("baseline")}>baseline</button>
        <button className="button" onClick={()=>setFX("normal")}>normal</button> {`align-items: ${css};`}
        </p>
    )
}

let AlignContent = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({alignContent: css})};
    let css = props.css?.alignContent;
    return (
        <p>
        <button className="button" onClick={()=>setFX("center")}>center</button>
        <button className="button" onClick={()=>setFX("flex-start")}>flex-start</button>
        <button className="button" onClick={()=>setFX("flex-end")}>flex-end</button>
        <button className="button" onClick={()=>setFX("stretch")}>stretch</button>
        <button className="button" onClick={()=>setFX("space-around")}>around</button>
        <button className="button" onClick={()=>setFX("space-between")}>between</button>
        <button className="button" onClick={()=>setFX("space-evenly")}>evenly</button>
        <button className="button" onClick={()=>setFX("normal")}>normal</button> {`align-content: ${css};`}
        </p>
    )
}

let FlexMode = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({display: css})};
    let setGrid = (css:string) => {
        props.update && props.update({display: css, gridTemplate:' 100px 100px 120px / 100px 120px 100px'});
    };
    let css = props.css?.display ?? "normal";
    return (
        <p>
        <button className="button" onClick={()=>setFX("flex")}>flex</button>
        <button className="button" onClick={()=>setGrid("grid")}>grid</button>
        <button className="button" onClick={()=>setFX("block")}>block</button> {`{display: ${css}};`}
        </p>
    )
}

let FlexWrap = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({flexWrap: css})};
    let css = props.css?.flexWrap ?? "normal";
    return (
        <p>
        <button className="button" onClick={()=>setFX("wrap")}>wrap</button>
        <button className="button" onClick={()=>setFX("nowrap")}>nowrap</button>
        <button className="button" onClick={()=>setFX("wrap-reverse")}>wrap-reverse</button>
        <button className="button" onClick={()=>setFX("revert")}>revert</button>
        <button className="button" onClick={()=>setFX("unset")}>unset</button> Flexbox Only {`{flex-wrap: ${css}};`}
        </p>
    )
}

let FlexDirection = (props: Props) => {
    let setFX = (css:string) => {props.update && props.update({flexDirection: css})};
    let css = props.css?.flexDirection ?? "normal";
    return (
        <p>
        <button className="button" onClick={()=>setFX("row")}>row</button>
        <button className="button" onClick={()=>setFX("row-reverse")}>row-reverse</button>
        <button className="button" onClick={()=>setFX("column")}>column</button>
        <button className="button" onClick={()=>setFX("column-reverse")}>column-reverse</button>
        <button className="button" onClick={()=>setFX("unset")}>unset</button> Flexbox Only {`{flex-direction: ${css}};`}
        </p>
    )
}

let HoCComposite = (props: Props & {children: React.ElementType[]}) => {
    let Child = props.children && !props.children.map && props.children;
    let ChildrenMap = props.children && props.children.map;
    return (
    <>
        {Child && (<Child {...props} {...props} />)}
        {ChildrenMap && props.children.map( (Child: any, index:number) => {
            return <Child {...props} key={index} {...props} />;
        })}
    </>
    )
}

export let App = () => {
    const [css, setCSS] = useState({
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
        flexGrow:'1', flexShrink:0, flexBasis:'auto', order:0,
        rowGap: '0px', columnGap:'0px'} as any);
    let handleUpdate = (update: typeof css) => {
        setCSS({...css, ...update });
        console.log("update css", css);
    };
    let {flex, flexGrow, flexShrink, flexBasis, alignSelf, ...container} = css; 
    container = { ...container,
        order: 0,
        boxSizing: 'border-box',
        minHeight: '80vh', 
        maxHeight: '80vh', 
        boxShadow: '0px 0px 3px #222', 
        padding:16, 
        margin: 0};
    let forFirst = {order: css.order};
    let {display, flexDirection, alignItems, flexWrap, justifyContent, alignContent, order,
        ...forItems} = css;
    forItems = {...forItems, padding:16, width:'auto', height:'auto',
        minHeight: '10vh', minWidth: '10vh', 
        };
    return (
        <>
        <div className="col12" style={{padding:'0 16px',boxSizing:'border-box'}}>
            <h3>Container Style</h3>
            <HoCComposite css={css} update={handleUpdate}>
            {[ FlexMode, FlexDirection, FlexWrap, AlignContent, JustifyContent, AlignItems, JustifyItems]}
            </HoCComposite>

            <h3>Items Style</h3>
            <HoCComposite css={css} update={handleUpdate}>
            {[AlignSelf, JustifySelf, Flex]}
            </HoCComposite>
            
            <h3>Shorthands</h3>
            <p> place-content = align-content justify-content &#123; {css.alignContent} {css.justifyContent} &#125;</p>
            <p> place-items = align-items justify-items &#123; {css.alignItems} {css.justifyItems} &#125;</p>
            <p> place-self = align-self justify-self &#123; {css.alignSelf} {css.justifySelf} &#125;</p>
            <p> flex-flow = flex-direction flex-wrap &#123; {css.flexDirection} {css.flexWrap} &#125;</p>
            <p> flex = flex-grow flex-shrink flex-basis &#123; {css.flexGrow} {css.flexShrink} {css.flexBasis} &#125;</p>
            <p> gap = row-gap column-gap &#123; {css.rowGap} {css.columnGap} &#125;</p>

            <h3>MainAxis vs CrossAxis & Align vs Justify & Items vs Content</h3>

        </div>
        <div className="col37" style={{...container}}>
            <BoxList size={9} forFirst={forFirst} css={forItems} />
        </div>
        </>
    );
}

let Demo = () => {
    return (
        <Layout>
        <div className="rows panel">
            <App />
        </div>
        <style jsx global>{`
        h3 { margin: 0.5em 0; line-height: 1.5em; }
        p { font-size: 0.6em; line-height: 0.8em; }
        .panel { min-width: 80vw; margin-left: -10vw; }
        @media screen and (max-width: 1100px){
            .panel { min-width:100vw; margin-left: 0; }
        }
        `}</style>
        </Layout>
    )
}

export default Demo;