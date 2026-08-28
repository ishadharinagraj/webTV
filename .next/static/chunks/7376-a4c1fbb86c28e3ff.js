"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7376],{44510:function(t,e,n){var i=n(64836);e.Z=void 0;var a=i(n(61268)),r=n(85893),s=(0,a.default)((0,r.jsx)("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");e.Z=s},50594:function(t,e,n){var i=n(64836);e.Z=void 0;var a=i(n(61268)),r=n(85893),s=(0,a.default)((0,r.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");e.Z=s},88078:function(t,e,n){n.d(e,{Z:function(){return E}});var i=n(63366),a=n(87462),r=n(67294),s=n(86010),o=n(70917),c=n(94780),u=n(41796),l=n(90948),h=n(71657),p=n(1588),d=n(34867);function g(t){return(0,d.Z)("MuiSkeleton",t)}(0,p.Z)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var v=n(85893);let f=["animation","className","component","height","style","variant","width"],b=t=>t,m,O,w,S,j=t=>{let{classes:e,variant:n,animation:i,hasChildren:a,width:r,height:s}=t;return(0,c.Z)({root:["root",n,i,a&&"withChildren",a&&!r&&"fitContent",a&&!s&&"heightAuto"]},g,e)},k=(0,o.F4)(m||(m=b`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),M=(0,o.F4)(O||(O=b`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),T=(0,l.ZP)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{let{ownerState:n}=t;return[e.root,e[n.variant],!1!==n.animation&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})(({theme:t,ownerState:e})=>{let n=String(t.shape.borderRadius).match(/[\d.\-+]*\s*(.*)/)[1]||"px",i=parseFloat(t.shape.borderRadius);return(0,a.Z)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,u.Fq)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===e.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${n}/${Math.round(i/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===e.variant&&{borderRadius:"50%"},"rounded"===e.variant&&{borderRadius:(t.vars||t).shape.borderRadius},e.hasChildren&&{"& > *":{visibility:"hidden"}},e.hasChildren&&!e.width&&{maxWidth:"fit-content"},e.hasChildren&&!e.height&&{height:"auto"})},({ownerState:t})=>"pulse"===t.animation&&(0,o.iv)(w||(w=b`
      animation: ${0} 1.5s ease-in-out 0.5s infinite;
    `),k),({ownerState:t,theme:e})=>"wave"===t.animation&&(0,o.iv)(S||(S=b`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 1.6s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),M,(e.vars||e).palette.action.hover)),C=r.forwardRef(function(t,e){let n=(0,h.Z)({props:t,name:"MuiSkeleton"}),{animation:r="pulse",className:o,component:c="span",height:u,style:l,variant:p="text",width:d}=n,g=(0,i.Z)(n,f),b=(0,a.Z)({},n,{animation:r,component:c,variant:p,hasChildren:!!g.children}),m=j(b);return(0,v.jsx)(T,(0,a.Z)({as:c,ref:e,className:(0,s.Z)(m.root,o),ownerState:b},g,{style:(0,a.Z)({width:d,height:u},l)}))});var E=C},45338:function(t,e,n){n.d(e,{QS:function(){return u}});var i=n(67294);let a={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},r={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},s="mousemove",o="mouseup";function c(t,e){if(0===e)return t;let n=Math.PI/180*e,i=t[0]*Math.cos(n)+t[1]*Math.sin(n),a=t[1]*Math.cos(n)-t[0]*Math.sin(n);return[i,a]}function u(t){var e,n,u;let l;let{trackMouse:h}=t,p=i.useRef(Object.assign({},r)),d=i.useRef(Object.assign({},a)),g=i.useRef(Object.assign({},d.current));for(l in g.current=Object.assign({},d.current),d.current=Object.assign(Object.assign({},a),t),a)void 0===d.current[l]&&(d.current[l]=a[l]);let[v,f]=i.useMemo(()=>(function(t,e){let n=e=>{let n="touches"in e;n&&e.touches.length>1||t((t,a)=>{a.trackMouse&&!n&&(document.addEventListener(s,i),document.addEventListener(o,h));let{clientX:u,clientY:l}=n?e.touches[0]:e,p=c([u,l],a.rotationAngle);return a.onTouchStartOrOnMouseDown&&a.onTouchStartOrOnMouseDown({event:e}),Object.assign(Object.assign(Object.assign({},t),r),{initial:p.slice(),xy:p,start:e.timeStamp||0})})},i=e=>{t((t,n)=>{let i="touches"in e;if(i&&e.touches.length>1)return t;if(e.timeStamp-t.start>n.swipeDuration)return t.swiping?Object.assign(Object.assign({},t),{swiping:!1}):t;let{clientX:r,clientY:s}=i?e.touches[0]:e,[o,u]=c([r,s],n.rotationAngle),l=o-t.xy[0],h=u-t.xy[1],p=Math.abs(l),d=Math.abs(h),g=(e.timeStamp||0)-t.start,v=Math.sqrt(p*p+d*d)/(g||1),f=[l/(g||1),h/(g||1)],b=p>d?l>0?"Right":"Left":h>0?"Down":"Up",m="number"==typeof n.delta?n.delta:n.delta[b.toLowerCase()]||a.delta;if(p<m&&d<m&&!t.swiping)return t;let O={absX:p,absY:d,deltaX:l,deltaY:h,dir:b,event:e,first:t.first,initial:t.initial,velocity:v,vxvy:f};O.first&&n.onSwipeStart&&n.onSwipeStart(O),n.onSwiping&&n.onSwiping(O);let w=!1;return(n.onSwiping||n.onSwiped||n[`onSwiped${b}`])&&(w=!0),w&&n.preventScrollOnSwipe&&n.trackTouch&&e.cancelable&&e.preventDefault(),Object.assign(Object.assign({},t),{first:!1,eventData:O,swiping:!0})})},u=e=>{t((t,n)=>{let i;if(t.swiping&&t.eventData){if(e.timeStamp-t.start<n.swipeDuration){i=Object.assign(Object.assign({},t.eventData),{event:e}),n.onSwiped&&n.onSwiped(i);let a=n[`onSwiped${i.dir}`];a&&a(i)}}else n.onTap&&n.onTap({event:e});return n.onTouchEndOrOnMouseUp&&n.onTouchEndOrOnMouseUp({event:e}),Object.assign(Object.assign(Object.assign({},t),r),{eventData:i})})},l=()=>{document.removeEventListener(s,i),document.removeEventListener(o,h)},h=t=>{l(),u(t)},p=(t,e)=>{let r=()=>{};if(t&&t.addEventListener){let s=Object.assign(Object.assign({},a.touchEventOptions),e.touchEventOptions),o=[["touchstart",n,s],["touchmove",i,Object.assign(Object.assign({},s),e.preventScrollOnSwipe?{passive:!1}:{})],["touchend",u,s]];o.forEach(([e,n,i])=>t.addEventListener(e,n,i)),r=()=>o.forEach(([e,n])=>t.removeEventListener(e,n))}return r},d={ref:e=>{null!==e&&t((t,n)=>{if(t.el===e)return t;let i={};return t.el&&t.el!==e&&t.cleanUpTouch&&(t.cleanUpTouch(),i.cleanUpTouch=void 0),n.trackTouch&&e&&(i.cleanUpTouch=p(e,n)),Object.assign(Object.assign(Object.assign({},t),{el:e}),i)})}};return e.trackMouse&&(d.onMouseDown=n),[d,p]})(t=>p.current=t(p.current,d.current),{trackMouse:h}),[h]);return p.current=(e=p.current,n=d.current,u=g.current,n.trackTouch&&e.el?e.cleanUpTouch?n.preventScrollOnSwipe!==u.preventScrollOnSwipe||n.touchEventOptions.passive!==u.touchEventOptions.passive?(e.cleanUpTouch(),Object.assign(Object.assign({},e),{cleanUpTouch:f(e.el,n)})):e:Object.assign(Object.assign({},e),{cleanUpTouch:f(e.el,n)}):(e.cleanUpTouch&&e.cleanUpTouch(),Object.assign(Object.assign({},e),{cleanUpTouch:void 0}))),v}}}]);