import{b as B}from"./QTable.e6f5120b.js";import{A as K,a8 as T,ai as U,bi as W,a9 as G,bj as H,ab as J,r as C,aj as M,bk as X,bl as Y,D as i,ak as x,bm as Z,E as s,aa as ee,W as te,ao as le}from"./index.6f5e4583.js";var ie=K({name:"QFile",inheritAttrs:!1,props:{...T,...U,...W,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...G,...H],setup(e,{slots:o,emit:V,attrs:S}){const{proxy:A}=te(),u=J(),r=C(null),v=C(!1),j=M(e),{pickFiles:p,onDragover:I,onDragleave:k,processFiles:P,getDndNode:q}=X({editable:u.editable,dnd:v,getFileInput:y,addFilesToQueue:h}),D=Y(e),l=i(()=>Object(e.modelValue)===e.modelValue?"length"in e.modelValue?Array.from(e.modelValue):[e.modelValue]:[]),b=i(()=>x(l.value)),N=i(()=>l.value.map(t=>t.name).join(", ")),g=i(()=>Z(l.value.reduce((t,a)=>t+a.size,0))),O=i(()=>({totalSize:g.value,filesNumber:l.value.length,maxFiles:e.maxFiles})),_=i(()=>({tabindex:-1,type:"file",title:"",accept:e.accept,capture:e.capture,name:j.value,...S,id:u.targetUid.value,disabled:u.editable.value!==!0})),L=i(()=>"q-file q-field--auto-height"+(v.value===!0?" q-file--dnd":"")),F=i(()=>e.multiple===!0&&e.append===!0);function c(t){const a=l.value.slice();a.splice(t,1),f(a)}function Q(t){const a=l.value.findIndex(t);a>-1&&c(a)}function f(t){V("update:modelValue",e.multiple===!0?t:t[0])}function z(t){t.keyCode===13&&le(t)}function E(t){(t.keyCode===13||t.keyCode===32)&&p(t)}function y(){return r.value}function h(t,a){const n=P(t,a,l.value,F.value),m=y();m!=null&&(m.value=""),n!==void 0&&((e.multiple===!0?e.modelValue&&n.every(w=>l.value.includes(w)):e.modelValue===n[0])||f(F.value===!0?l.value.concat(n):n))}function d(){return[s("input",{class:[e.inputClass,"q-file__filler"],style:e.inputStyle})]}function R(){if(o.file!==void 0)return l.value.length===0?d():l.value.map((a,n)=>o.file({index:n,file:a,ref:this}));if(o.selected!==void 0)return l.value.length===0?d():o.selected({files:l.value,ref:this});if(e.useChips===!0)return l.value.length===0?d():l.value.map((a,n)=>s(B,{key:"file-"+n,removable:u.editable.value,dense:!0,textColor:e.color,tabindex:e.tabindex,onRemove:()=>{c(n)}},()=>s("span",{class:"ellipsis",textContent:a.name})));const t=e.displayValue!==void 0?e.displayValue:N.value;return t.length>0?[s("div",{class:e.inputClass,style:e.inputStyle,textContent:t})]:d()}function $(){const t={ref:r,..._.value,...D.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:h};return e.multiple===!0&&(t.multiple=!0),s("input",t)}return Object.assign(u,{fieldClass:L,emitValue:f,hasValue:b,inputRef:r,innerValue:l,floatingLabel:i(()=>b.value===!0||x(e.displayValue)),computedCounter:i(()=>{if(e.counterLabel!==void 0)return e.counterLabel(O.value);const t=e.maxFiles;return`${l.value.length}${t!==void 0?" / "+t:""} (${g.value})`}),getControlChild:()=>q("file"),getControl:()=>{const t={ref:u.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:e.tabindex};return u.editable.value===!0&&Object.assign(t,{onDragover:I,onDragleave:k,onKeydown:z,onKeyup:E}),s("div",t,[$()].concat(R()))}}),Object.assign(A,{removeAtIndex:c,removeFile:Q,getNativeElement:()=>r.value}),ee(u)}});export{ie as Q};
