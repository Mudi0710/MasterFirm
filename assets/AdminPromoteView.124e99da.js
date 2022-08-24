import{p as O,s as G,r as V,a as _,o as d,c as g,w as a,Q as Z,Z as q,S as w,d as i,e as o,q as f,i as n,t as I,v as p,z as H,f as T,g as J,m as c,y as u,L as y,M as K,N as W,k as X,j as Y,b6 as ee}from"./index.387360f5.js";import{Q as D,a as te,b as se,c as L}from"./QTable.5371805f.js";import{Q}from"./QCard.78ca603f.js";import{Q as ae}from"./QEditor.6b59d39d.js";import{u as oe}from"./use-quasar.7873fa9a.js";const le={id:"myheader",class:"row justify-end items-center",style:{width:"100%"}},ie=c(" \u56DE\u524D\u53F0 "),ne=c(" \u767B\u51FA "),re={id:"mycontent",class:""},de=i("div",{class:"row justify-between"},[i("div",{class:"col-auto text-h3 text-secondary q-my-sm"},"\u6587\u7AE0\u7BA1\u7406")],-1),ce={class:"q-pa-md"},ue=c("\u65B0\u589E\u6700\u65B0\u6D88\u606F"),me={class:"row justify-center"},fe=c(" \u4FEE\u6539\u6D88\u606F"),pe=c(" \u522A\u9664\u6D88\u606F"),_e={class:"full-width row flex-center text-accent q-gutter-sm"},ge={class:"col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm cursor-pointer"},we={key:0,class:"row justify-between"},xe={class:"text-accent"},be={class:"text-secondary ellipsis",style:{"max-width":"300px"}},he={key:1,class:"row justify-between"},ye={class:"text-accent"},ke={class:"text-secondary ellipsis",style:{"max-width":"300px"}},qe={key:2,class:"row justify-start"},ve={class:"col-12 row justify-between"},Ce={class:"text-accent"},Ve=c("\u4FEE\u6539\u6D88\u606F"),De={class:"col-12 row justify-end q-mt-sm"},Qe=c("\u522A\u9664\u6D88\u606F"),Pe=i("p",{class:"text-h6 text-dark"},"\u6D88\u606F\u6A19\u984C",-1),Ne=i("p",{class:"text-h6 text-dark"},"\u767C\u5E03\u72C0\u614B",-1),Se=i("p",{class:"text-h6 text-dark"},"\u6D88\u606F\u5167\u5BB9",-1),je={class:"row justify-around"},ze=i("div",{class:"col-12 text-center text-h3 text-red q-pb-md"},"\u8B66\u544A",-1),Ie={class:"col-12 text-center text-h6 text-dark q-pb-md"},Te=i("br",null,null,-1),Le={class:"col-12 row justify-around"},Re={__name:"AdminPromoteView",setup(Ee){const P=O(),{logout:E}=P,{isLogin:N}=G(P),v=V(""),x=oe(),$=V(!1),m=_([]),F=_({items:[],page:1,rowsPerPage:10}),l=_({_id:"",title:"",content:"",show:!1,idx:-1,dialog:!1}),k=V(null),U=t=>{if(t.target.nodeName==="INPUT")return;let s,e;t.preventDefault(),t.stopPropagation(),t.originalEvent&&t.originalEvent.clipboardData.getData?(s=t.originalEvent.clipboardData.getData("text/plain"),k.value.runCmd("insertText",s)):t.clipboardData&&t.clipboardData.getData?(s=t.clipboardData.getData("text/plain"),k.value.runCmd("insertText",s)):window.clipboardData&&window.clipboardData.getData&&(e||(e=!0,k.value.runCmd("ms-pasteTextOnly",s)),e=!1)},S=_({required(t){return!!t||"\u5FC5\u586B\u6B04\u4F4D"}}),A=async()=>{try{if(l._id.length===0){const{data:t}=await q.post("/newses",l);m.push(t.result),w.fire({icon:"success",title:"\u65B0\u589E\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u65B0\u589E\u4E00\u7B46\u6700\u65B0\u6D88\u606F\uFF01"})}else{const{data:t}=await q.patch("/newses/"+l._id,l);m[l.idx]=t.result,w.fire({icon:"success",title:"\u4FEE\u6539\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u4FEE\u6539\u8A72\u7B46\u6700\u65B0\u6D88\u606F\uFF01"})}l.dialog=!1}catch(t){w.fire({icon:"error",title:"\u65B0\u589E\u5931\u6557",text:t.isAxiosError?t.response.data.message:t.message})}},b=_({dialog:!1}),h=_({_id:"",title:""}),j=(t,s)=>{h._id=t,h.title=s,b.dialog=!0},B=async t=>{b.dialog=!1;try{await q.delete("/newses/"+t),await w.fire({icon:"success",title:"\u522A\u9664\u6210\u529F",text:"\u60A8\u5DF2\u6210\u529F\u522A\u9664\u8A72\u7B46\u6700\u65B0\u6D88\u606F\uFF01"}),z()}catch(s){w.fire({icon:"error",title:"\u522A\u9664\u5931\u6557",text:s.isAxiosError?s.response.data.message:s.message})}},C=(t,s)=>{l._id=t,s>-1?(l.title=m[s].title,l.content=m[s].content,l.show=m[s].show):(l.title="",l.content="",l.show=!1),l.idx=s,l.dialog=!0},R=[{name:"date",label:"\u767C\u5E03\u65E5\u671F",field:t=>t.date,align:"center"},{name:"title",label:"\u6D88\u606F\u6A19\u984C",field:t=>t.title,align:"center"},{name:"show",label:"\u4E0A\u67B6\u72C0\u614B",field:t=>t.show?"\u5DF2\u767C\u5E03":"\u672A\u767C\u5E03",align:"center"},{name:"edit",label:"\u6D88\u606F\u7DE8\u8F2F",align:"center"}],z=async()=>{try{const{data:t}=await q.get("/newses/all");m.splice(0,m.length),m.push(...t.result)}catch(t){w.fire({icon:"error",title:"\u5931\u6557",text:t.isAxiosError?t.response.data.message:t.message})}};return z(),(t,s)=>(d(),g(Z,{class:"column"},{default:a(()=>[i("div",le,[o(H,{class:"text-h5 text-secondary mobile-none"},{default:a(()=>[f(N)?(d(),g(n,{key:0,round:"",dense:"",flat:"",icon:"fa-solid fa-house",to:"/",class:"q-mx-xs"},{default:a(()=>[o(I,{"transition-show":"fade","transition-hide":"fade",offset:[0,0]},{default:a(()=>[ie]),_:1})]),_:1})):p("",!0),f(N)?(d(),g(n,{key:1,round:"",dense:"",flat:"",icon:"fa-solid fa-right-from-bracket",onClick:f(E),class:"q-ml-xl q-mr-lg"},{default:a(()=>[o(I,{"transition-show":"fade","transition-hide":"fade",offset:[0,0]},{default:a(()=>[ne]),_:1})]),_:1},8,["onClick"])):p("",!0)]),_:1})]),i("div",re,[de,i("div",ce,[o(se,{grid:f(x).screen.lt.xl,columns:R,rows:m,"row-key":"date",separator:"cell",square:"",bordered:"","wrap-cells":"","binary-state-sort":"","column-sort-order":"ad",dense:"",filter:v.value,loading:$.value,pagination:F,"rows-per-page-label":"\u6BCF\u9801\u986F\u793A\u7B46\u6578","no-data-label":"\u76EE\u524D\u6C92\u6709\u65B0\u589E\u4EFB\u4F55\u6700\u65B0\u6D88\u606F","no-results-label":"Oops...\u627E\u4E0D\u5230\u8A72\u7B46\u6700\u65B0\u6D88\u606F"},{"top-left":a(()=>[o(n,{onClick:s[0]||(s[0]=e=>C("",-1)),square:"",flat:"",class:"col-auto q-mr-xl bg-secondary text-dark text-body1 q-my-sm createBtn"},{default:a(()=>[ue]),_:1})]),"top-right":a(()=>[o(T,{borderless:"",dense:"",debounce:"300",modelValue:v.value,"onUpdate:modelValue":s[1]||(s[1]=e=>v.value=e),placeholder:"\xA0Search",class:"search"},{append:a(()=>[o(J,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-date":a(e=>[o(D,{date:e,class:"text-center",style:{"min-width":"50px","max-width":"120px"}},{default:a(()=>[c(u(new Date(e.row.date).toLocaleString()),1)]),_:2},1032,["date"])]),"body-cell-title":a(e=>[o(D,{title:e,class:"ellipsis",style:{"max-width":"150px"}},{default:a(()=>[c(u(e.row.title),1)]),_:2},1032,["title"])]),"body-cell-edit":a(e=>[o(D,{edit:e,style:{"min-width":"100px","max-width":"150px"}},{default:a(()=>[i("div",me,[o(n,{class:"col-auto q-mx-sm q-my-xs",onClick:r=>C(e.row._id,e.rowIndex),outline:""},{default:a(()=>[fe]),_:2},1032,["onClick"]),o(n,{class:"col-auto q-mx-sm q-my-xs",onClick:r=>j(e.row._id,e.row.title),outline:""},{default:a(()=>[pe]),_:2},1032,["onClick"])])]),_:2},1032,["edit"])]),pagination:a(e=>[e.pagesNumber>1?(d(),g(n,{key:0,icon:"first_page",color:"secondary",round:"",dense:"",flat:"",disable:e.isFirstPage,onClick:e.firstPage},null,8,["disable","onClick"])):p("",!0),o(n,{icon:"chevron_left",color:"secondary",round:"",dense:"",flat:"",disable:e.isFirstPage,onClick:e.prevPage},null,8,["disable","onClick"]),o(n,{icon:"chevron_right",color:"secondary",round:"",dense:"",flat:"",disable:e.isLastPage,onClick:e.nextPage},null,8,["disable","onClick"]),e.pagesNumber>1?(d(),g(n,{key:1,icon:"last_page",color:"secondary",round:"",dense:"",flat:"",disable:e.isLastPage,onClick:e.lastPage},null,8,["disable","onClick"])):p("",!0)]),"no-data":a(({message:e})=>[i("div",_e,[i("span",null,u(e),1)])]),item:a(e=>[i("div",ge,[o(Q,{square:"",bordered:"",class:"bg-primary shadow",style:{width:"100%"}},{default:a(()=>[(d(!0),y(W,null,K(e.cols,r=>(d(),y("div",{key:r.name,class:"q-pa-sm"},[r.name!=="date"&&r.name!=="edit"?(d(),y("div",we,[i("span",xe,u(r.label)+"\uFF1A",1),i("span",be,u(r.value),1)])):p("",!0),r.name==="date"?(d(),y("div",he,[i("span",ye,u(r.label)+"\uFF1A",1),i("span",ke,u(new Date(r.value).toLocaleString()),1)])):p("",!0),r.name==="edit"?(d(),y("div",qe,[i("div",ve,[i("span",Ce,u(r.label)+"\uFF1A",1),o(n,{class:"col-auto text-secondary",style:{"font-size":"xx-small",padding:"0px 8px"},onClick:M=>C(e.row._id,e.rowIndex),outline:""},{default:a(()=>[Ve]),_:2},1032,["onClick"])]),i("div",De,[o(n,{class:"col-auto text-secondary",style:{"font-size":"xx-small",padding:"0px 8px"},onClick:M=>j(e.row._id,e.row.title),outline:""},{default:a(()=>[Qe]),_:2},1032,["onClick"])])])):p("",!0)]))),128))]),_:2},1024)])]),loading:a(()=>[o(te,{showing:"",dark:"","transition-show":"fade",color:"primary"})]),_:1},8,["grid","rows","filter","loading","pagination"]),o(L,{modelValue:l.dialog,"onUpdate:modelValue":s[6]||(s[6]=e=>l.dialog=e),seamless:""},{default:a(()=>[l.dialog?(d(),g(Q,{key:0,id:"dialog",flat:"",square:"",bordered:"",persistent:"",class:"bg-info text-secondary shadow-white"},{default:a(()=>[o(X,{onSubmit:Y(A,["prevent"]),class:"q-pa-md"},{default:a(()=>[Pe,o(T,{modelValue:l.title,"onUpdate:modelValue":s[2]||(s[2]=e=>l.title=e),rules:[S.required],type:"text",outlined:"",square:"",dense:""},null,8,["modelValue","rules"]),Ne,o(ee,{class:"col-6 text-dark",modelValue:l.show,"onUpdate:modelValue":s[3]||(s[3]=e=>l.show=e),label:l.show?"\u5DF2\u767C\u5E03":"\u672A\u767C\u5E03"},null,8,["modelValue","label"]),Se,o(ae,{model:"qeditor",modelValue:l.content,"onUpdate:modelValue":s[4]||(s[4]=e=>l.content=e),ref_key:"editorRef",ref:k,onPaste:U,rules:[S.required],outlined:"",square:"","content-class":"bg-dark","toolbar-bg":"secondary","toolbar-text-color":"dark",dense:f(x).screen.lt.lg,toolbar:[["bold","italic","strike","underline","subscript","superscript"],["left","center","right","justify"],["token","hr","link","custom_btn"],["print","fullscreen"],[{icon:f(x).iconSet.editor.formatting,fixedIcon:!1,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{icon:f(x).iconSet.editor.fontSize,fixedIcon:!1,list:"no-icons",options:["size-1","size-2","size-3","size-4","size-5","size-6","size-7"]},{icon:f(x).iconSet.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],["quote","unordered","ordered","outdent","indent"],["undo","redo"],["viewsource"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},null,8,["modelValue","rules","dense","toolbar"]),i("div",je,[o(n,{square:"",flat:"",type:"submit",class:"col-4 bg-secondary text-dark q-my-sm",label:"\u9001\u51FA\u7DE8\u8F2F"}),o(n,{square:"",flat:"",outline:"",class:"col-4 bg-dark text-secondary q-my-sm",label:"\u53D6\u6D88",onClick:s[5]||(s[5]=e=>l.dialog=!1)})])]),_:1},8,["onSubmit"])]),_:1})):p("",!0)]),_:1},8,["modelValue"]),o(L,{modelValue:b.dialog,"onUpdate:modelValue":s[9]||(s[9]=e=>b.dialog=e),seamless:"",persistent:""},{default:a(()=>[o(Q,{square:"",class:"row justify-center bg-info q-pa-lg"},{default:a(()=>[ze,i("div",Ie,[c("\u4F60\u78BA\u5B9A\u8981\u522A\u9664\u3010"+u(h.title)+"\u3011\u6587\u7AE0\u55CE\uFF1F",1),Te,c("\u522A\u9664\u3010"+u(h.title)+"\u3011\u6587\u7AE0\u5C07\u7121\u6CD5\u5FA9\u539F\uFF01",1)]),i("div",Le,[o(n,{onClick:s[7]||(s[7]=e=>B(h._id)),square:"",flat:"",class:"col-4 bg-secondary text-dark q-my-sm",label:"\u78BA\u5B9A\u522A\u9664"}),o(n,{square:"",flat:"",outline:"",class:"col-4 bg-dark text-secondary q-my-sm",label:"\u53D6\u6D88",onClick:s[8]||(s[8]=e=>b.dialog=!1)})])]),_:1})]),_:1},8,["modelValue"])])])]),_:1}))}};export{Re as default};
