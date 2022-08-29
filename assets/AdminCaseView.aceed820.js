import{p as G,s as Y,r as V,a as g,o as c,c as _,w as o,Q as H,aY as q,S as x,d as l,e as a,q as m,i as n,t as I,v as f,z as J,m as r,y as p,L as v,M as K,N as W,k as X,j as D,f as Z,g as F}from"./index.25f87105.js";import{Q as N}from"./QTd.7162b0d8.js";import{Q as P}from"./QCard.4f31d4b6.js";import{Q as ee,a as te}from"./QTable.c9cd3323.js";import{a as se,Q as oe}from"./QEditor.b52bbafd.js";import{Q as T}from"./QDialog.99ed092e.js";import{u as ae}from"./use-quasar.98a4e89b.js";const ie={id:"myheader",class:"row justify-end items-center",style:{width:"100%"}},le=r(" \u56DE\u524D\u53F0 "),ne=r(" \u767B\u51FA "),re={id:"mycontent"},de=l("div",{class:"row justify-between"},[l("div",{class:"col-auto text-h3 text-secondary q-my-sm q-pl-md"},"\u9810\u7D04\u7BA1\u7406")],-1),ce={class:"q-pa-md"},ue=l("div",{class:"bg-accent text-h5 text-dark q-my-sm",style:{height:"1px"}},null,-1),me=l("div",{class:"text-h5 text-accent q-my-sm",style:{height:"40px","line-height":"1.6em"}},"\u9810\u7D04\u9808\u77E5",-1),fe=r("\u65B0\u589E\u9810\u7D04\u9808\u77E5"),pe={class:"row justify-center"},ge=r(" \u4FEE\u6539\u9808\u77E5"),_e=r(" \u522A\u9664\u9808\u77E5"),xe={class:"full-width row flex-center text-accent q-gutter-sm"},ye={class:"col-12 q-pa-sm cursor-pointer"},be={key:0,class:"row justify-between"},he={class:"text-accent"},we={class:"text-secondary ellipsis-3-lines"},ke={key:1,class:"row justify-start"},qe={class:"col-12 row justify-between"},ve={class:"text-accent"},Ce=r("\u4FEE\u6539\u9808\u77E5"),Qe={class:"col-12 row justify-end q-my-sm",style:{height:"28.8px"}},Ve=r("\u522A\u9664\u9808\u77E5"),De=l("p",{class:"text-h6 text-dark"},"\u9808\u77E5\u6A19\u984C",-1),Ne=l("p",{class:"text-h6 text-dark"},"\u9808\u77E5\u5167\u5BB9",-1),Pe=l("p",{class:"text-h6 text-dark"},"\u9808\u77E5\u5716\u7247",-1),ze={class:"row justify-around"},Se=l("div",{class:"col-12 text-center text-h3 text-red q-pb-md"},"\u8B66\u544A",-1),je={class:"col-12 text-center text-h6 text-dark q-pb-md"},Ie=r("\u4F60\u78BA\u5B9A\u8981\u522A\u9664"),Fe=l("br",null,null,-1),Te=l("br",null,null,-1),$e=r("\u522A\u9664\u5C07\u7121\u6CD5\u5FA9\u539F\uFF01"),Ee={class:"col-12 row justify-around"},Ye={__name:"AdminCaseView",setup(Be){const z=G(),{logout:$}=z,{isLogin:S}=Y(z),E=V(""),y=ae(),B=V(!1),u=g([]),L=g({items:[],page:1,rowsPerPage:0}),i=g({_id:"",title:"",content:"",image:[],idx:-1,dialog:!1}),h=V(null),A=s=>{if(s.target.nodeName==="INPUT")return;let e,t;s.preventDefault(),s.stopPropagation(),s.originalEvent&&s.originalEvent.clipboardData.getData?(e=s.originalEvent.clipboardData.getData("text/plain"),h.value.runCmd("insertText",e)):s.clipboardData&&s.clipboardData.getData?(e=s.clipboardData.getData("text/plain"),h.value.runCmd("insertText",e)):window.clipboardData&&window.clipboardData.getData&&(t||(t=!0,h.value.runCmd("ms-pasteTextOnly",e)),t=!1)},C=g({required(s){return!!s||"\u5FC5\u586B\u6B04\u4F4D"},size(s){var e,t,d;return!s||!s.length||((t=(e=s[0])==null?void 0:e.type)==null?void 0:t.includes("image"))&&((d=s[0])==null?void 0:d.size)<=1024*1024*2||"\u6A94\u6848\u683C\u5F0F\u4E0D\u7B26\uFF08\u9808\u70BA\u5716\u7247\u6A94\uFF0C\u4E14\u6A94\u6848\u5927\u5C0F 2 MB \u4EE5\u4E0B\uFF09"}}),U=async()=>{const s=new FormData;for(const e in i)if(!["_id","idx","dialog"].includes(e))if(e==="image")for(const t of i.image)s.append(e,t);else s.append(e,i[e]);try{if(i._id.length===0){const{data:e}=await q.post("/notice",s);u.push(e.result),x.fire({icon:"success",title:"\u65B0\u589E\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u65B0\u589E\u4E00\u7B46\u9810\u7D04\u9808\u77E5\uFF01"}),k()}else{const{data:e}=await q.patch("/notice/"+i._id,s);u[i.idx]=e.result,x.fire({icon:"success",title:"\u4FEE\u6539\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u4FEE\u6539\u8A72\u7B46\u9810\u7D04\u9808\u77E5\uFF01"}),k()}i.dialog=!1}catch(e){x.fire({icon:"error",title:"\u65B0\u589E\u5931\u6557",text:e.isAxiosError?e.response.data.message:e.message})}},b=g({dialog:!1}),w=g({_id:"",title:""}),j=(s,e)=>{w._id=s,w.title=e,b.dialog=!0},M=async s=>{b.dialog=!1;try{await q.delete("/notice/"+s),await x.fire({icon:"success",title:"\u522A\u9664\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u522A\u9664\u8A72\u7B46\u9810\u7D04\u9808\u77E5\uFF01"}),k()}catch(e){x.fire({icon:"error",title:"\u522A\u9664\u5931\u6557",text:e.isAxiosError?e.response.data.message:e.message})}},Q=(s,e)=>{i._id=s,e>-1?(i.title=u[e].title,i.content=u[e].content):(i.title="",i.content=""),i.image=[],i.idx=e,i.dialog=!0},R=[{name:"title",label:"\u9808\u77E5\u6A19\u984C",field:s=>s.title,align:"center"},{name:"content",label:"\u9808\u77E5\u5167\u5BB9",field:s=>s.content,align:"left"},{name:"edit",label:"\u9808\u77E5\u7DE8\u8F2F",align:"center"}],k=async()=>{try{const{data:s}=await q.get("/notice/all");u.splice(0,u.length),u.push(...s.result)}catch(s){x.fire({icon:"error",title:"\u5931\u6557",text:s.isAxiosError?s.response.data.message:s.message})}};return k(),(s,e)=>(c(),_(H,{class:"column"},{default:o(()=>[l("div",ie,[a(J,{class:"text-h5 text-secondary mobile-none"},{default:o(()=>[m(S)?(c(),_(n,{key:0,round:"",dense:"",flat:"",icon:"fa-solid fa-house",to:"/",class:"q-mx-xs"},{default:o(()=>[a(I,{"transition-show":"fade","transition-hide":"fade",offset:[0,0]},{default:o(()=>[le]),_:1})]),_:1})):f("",!0),m(S)?(c(),_(n,{key:1,round:"",dense:"",flat:"",icon:"fa-solid fa-right-from-bracket",onClick:m($),class:"q-ml-xl q-mr-lg"},{default:o(()=>[a(I,{"transition-show":"fade","transition-hide":"fade",offset:[0,0]},{default:o(()=>[ne]),_:1})]),_:1},8,["onClick"])):f("",!0)]),_:1})]),l("div",re,[de,l("div",ce,[ue,me,a(te,{grid:m(y).screen.lt.xl,columns:R,rows:u,"row-key":"title",separator:"cell",square:"",bordered:"","wrap-cells":"","binary-state-sort":"",dense:"",filter:E.value,loading:B.value,pagination:L,"rows-per-page-label":"\u6BCF\u9801\u986F\u793A\u7B46\u6578","no-data-label":"\u76EE\u524D\u6C92\u6709\u65B0\u589E\u4EFB\u4F55\u9810\u7D04\u9808\u77E5","no-results-label":"Oops...\u627E\u4E0D\u5230\u8A72\u7B46\u9810\u7D04\u9808\u77E5",class:"bg-transparent"},{"top-left":o(()=>[a(n,{onClick:e[0]||(e[0]=t=>Q("",-1)),square:"",flat:"",disable:u.length>0,class:"col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn"},{default:o(()=>[fe]),_:1},8,["disable"])]),"body-cell-title":o(t=>[a(N,{title:t,class:"ellipsis",style:{"max-width":"150px"}},{default:o(()=>[r(p(t.row.title),1)]),_:2},1032,["title"])]),"body-cell-content":o(t=>[a(N,{content:t,class:"ellipsis",style:{"max-width":"400px"}},{default:o(()=>[r(p(t.row.content),1)]),_:2},1032,["content"])]),"body-cell-edit":o(t=>[a(N,{edit:t,style:{"max-width":"150px"}},{default:o(()=>[l("div",pe,[a(n,{class:"col-auto q-mx-sm q-my-xs",onClick:d=>Q(t.row._id,t.rowIndex),outline:""},{default:o(()=>[ge]),_:2},1032,["onClick"]),a(n,{class:"col-auto q-mx-sm q-my-xs",onClick:d=>j(t.row._id,t.row.title),outline:""},{default:o(()=>[_e]),_:2},1032,["onClick"])])]),_:2},1032,["edit"])]),pagination:o(t=>[t.pagesNumber>1?(c(),_(n,{key:0,icon:"first_page",color:"secondary",round:"",dense:"",flat:"",disable:t.isFirstPage,onClick:t.firstPage},null,8,["disable","onClick"])):f("",!0),a(n,{icon:"chevron_left",color:"secondary",round:"",dense:"",flat:"",disable:t.isFirstPage,onClick:t.prevPage},null,8,["disable","onClick"]),a(n,{icon:"chevron_right",color:"secondary",round:"",dense:"",flat:"",disable:t.isLastPage,onClick:t.nextPage},null,8,["disable","onClick"]),t.pagesNumber>1?(c(),_(n,{key:1,icon:"last_page",color:"secondary",round:"",dense:"",flat:"",disable:t.isLastPage,onClick:t.lastPage},null,8,["disable","onClick"])):f("",!0)]),"no-data":o(({message:t})=>[l("div",xe,[l("span",null,p(t),1)])]),item:o(t=>[l("div",ye,[a(P,{square:"",bordered:"",class:"bg-primary shadow"},{default:o(()=>[(c(!0),v(W,null,K(t.cols,d=>(c(),v("div",{key:d.name,class:"q-pa-sm"},[d.name!=="edit"?(c(),v("div",be,[l("span",he,p(d.label)+"\uFF1A",1),l("span",we,p(d.value),1)])):f("",!0),d.name==="edit"?(c(),v("div",ke,[l("div",qe,[l("span",ve,p(d.label)+"\uFF1A",1),a(n,{class:"col-auto text-secondary",style:{"font-size":"small",padding:"0px 8px"},onClick:O=>Q(t.row._id,t.rowIndex),outline:""},{default:o(()=>[Ce]),_:2},1032,["onClick"])]),l("div",Qe,[a(n,{class:"col-auto text-secondary",style:{"font-size":"small",padding:"0px 8px"},onClick:O=>j(t.row._id,t.row.title),outline:""},{default:o(()=>[Ve]),_:2},1032,["onClick"])])])):f("",!0)]))),128))]),_:2},1024)])]),loading:o(()=>[a(ee,{showing:"",dark:"","transition-show":"fade",color:"primary"})]),_:1},8,["grid","rows","filter","loading","pagination"]),a(T,{modelValue:i.dialog,"onUpdate:modelValue":e[7]||(e[7]=t=>i.dialog=t),seamless:""},{default:o(()=>[i.dialog?(c(),_(P,{key:0,id:"dialog",flat:"",square:"",bordered:"",persistent:"",class:"bg-info text-secondary shadow-white"},{default:o(()=>[a(X,{onSubmit:D(U,["prevent"]),class:"q-pa-md"},{default:o(()=>[De,a(Z,{modelValue:i.title,"onUpdate:modelValue":e[1]||(e[1]=t=>i.title=t),rules:[C.required],type:"text",outlined:"",square:"",dense:""},null,8,["modelValue","rules"]),Ne,a(se,{model:"qeditor",modelValue:i.content,"onUpdate:modelValue":e[2]||(e[2]=t=>i.content=t),ref_key:"editorRef",ref:h,onPaste:A,rules:[C.required],outlined:"",square:"","content-class":"bg-dark","toolbar-bg":"secondary","toolbar-text-color":"dark",dense:m(y).screen.lt.lg,toolbar:[["bold","italic","strike","underline","subscript","superscript"],["left","center","right","justify"],["token","hr","link","custom_btn"],["print","fullscreen"],[{icon:m(y).iconSet.editor.formatting,fixedIcon:!1,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{icon:m(y).iconSet.editor.fontSize,fixedIcon:!1,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{icon:m(y).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","rules","dense","toolbar"]),Pe,a(oe,{modelValue:i.image,"onUpdate:modelValue":e[5]||(e[5]=t=>i.image=t),multiple:"",rules:[C.size],accept:"image/*",filled:"","bottom-slots":"",counter:""},{prepend:o(()=>[a(F,{name:"cloud_upload",onClick:e[3]||(e[3]=D(()=>{},["stop","prevent"]))})]),append:o(()=>[a(F,{name:"close",onClick:e[4]||(e[4]=D(t=>s.model=null,["stop","prevent"])),class:"cursor-pointer"})]),hint:o(()=>[]),_:1},8,["modelValue","rules"]),l("div",ze,[a(n,{square:"",flat:"",type:"submit",class:"col-4 bg-secondary text-dark q-my-sm",label:"\u9001\u51FA\u7DE8\u8F2F"}),a(n,{square:"",flat:"",outline:"",class:"col-4 bg-dark text-secondary q-my-sm",label:"\u53D6\u6D88",onClick:e[6]||(e[6]=t=>i.dialog=!1)})])]),_:1},8,["onSubmit"])]),_:1})):f("",!0)]),_:1},8,["modelValue"]),a(T,{modelValue:b.dialog,"onUpdate:modelValue":e[10]||(e[10]=t=>b.dialog=t),seamless:"",persistent:""},{default:o(()=>[a(P,{square:"",class:"row justify-center bg-info q-pa-lg"},{default:o(()=>[Se,l("div",je,[Ie,Fe,r("\u3010"+p(w.title)+"\u3011\u55CE\uFF1F",1),Te,$e]),l("div",Ee,[a(n,{onClick:e[8]||(e[8]=t=>M(w._id)),square:"",flat:"",class:"col-4 bg-secondary text-dark q-my-sm",label:"\u522A\u9664"}),a(n,{square:"",flat:"",outline:"",class:"col-4 bg-dark text-secondary q-my-sm",label:"\u53D6\u6D88",onClick:e[9]||(e[9]=t=>b.dialog=!1)})])]),_:1})]),_:1},8,["modelValue"])])])]),_:1}))}};export{Ye as default};
