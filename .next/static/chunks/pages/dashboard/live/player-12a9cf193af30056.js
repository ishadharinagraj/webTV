(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9325],{98456:function(r,e,t){"use strict";t.d(e,{Z:function(){return D}});var i=t(63366),a=t(87462),s=t(67294),o=t(86010),n=t(94780),l=t(70917),c=t(98216),d=t(71657),u=t(90948),f=t(1588),h=t(34867);function v(r){return(0,h.Z)("MuiCircularProgress",r)}(0,f.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(85893);let k=["className","color","disableShrink","size","style","thickness","value","variant"],p=r=>r,Z,g,x,y,w=(0,l.F4)(Z||(Z=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),P=(0,l.F4)(g||(g=p`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),b=r=>{let{classes:e,variant:t,color:i,disableShrink:a}=r,s={root:["root",t,`color${(0,c.Z)(i)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,a&&"circleDisableShrink"]};return(0,n.Z)(s,v,e)},_=(0,u.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,c.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>(0,a.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>"indeterminate"===r.variant&&(0,l.iv)(x||(x=p`
      animation: ${0} 1.4s linear infinite;
    `),w)),S=(0,u.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),C=(0,u.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{let{ownerState:t}=r;return[e.circle,e[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>(0,a.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&(0,l.iv)(y||(y=p`
      animation: ${0} 1.4s ease-in-out infinite;
    `),P)),N=s.forwardRef(function(r,e){let t=(0,d.Z)({props:r,name:"MuiCircularProgress"}),{className:s,color:n="primary",disableShrink:l=!1,size:c=40,style:u,thickness:f=3.6,value:h=0,variant:v="indeterminate"}=t,p=(0,i.Z)(t,k),Z=(0,a.Z)({},t,{color:n,disableShrink:l,size:c,thickness:f,value:h,variant:v}),g=b(Z),x={},y={},w={};if("determinate"===v){let r=2*Math.PI*((44-f)/2);x.strokeDasharray=r.toFixed(3),w["aria-valuenow"]=Math.round(h),x.strokeDashoffset=`${((100-h)/100*r).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,m.jsx)(_,(0,a.Z)({className:(0,o.Z)(g.root,s),style:(0,a.Z)({width:c,height:c},y,u),ownerState:Z,ref:e,role:"progressbar"},w,p,{children:(0,m.jsx)(S,{className:g.svg,ownerState:Z,viewBox:"22 22 44 44",children:(0,m.jsx)(C,{className:g.circle,style:x,ownerState:Z,cx:44,cy:44,r:(44-f)/2,fill:"none",strokeWidth:f})})}))});var D=N},11310:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard/live/player",function(){return t(30127)}])}},function(r){r.O(0,[5675,127,9774,2888,179],function(){return r(r.s=11310)}),_N_E=r.O()}]);