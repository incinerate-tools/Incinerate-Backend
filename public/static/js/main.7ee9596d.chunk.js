(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{28:function(e,t,a){e.exports=a(60)},55:function(e,t,a){},56:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(21),r=a.n(i),l=a(10),o=a.n(l),c=a(22),u=a(23),m=a(11),d=a(6),h=a(7),p=a(4),f=a(8),v=a(9),b=a(27),E=a(25),g=a.n(E),k=a(26),w=a.n(k),N=(a(55),function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(e){return Object(d.a)(this,a),t.call(this,e)}return Object(h.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"fileContainer"},s.a.createElement("div",{className:"innerFileName"},s.a.createElement("p",null,this.props.name)),s.a.createElement("div",{className:"innerStatus"},s.a.createElement("p",null,"OK"==this.props.status?s.a.createElement("button",{className:"downloadBtn",onClick:function(){return window.open("".concat(window.location.origin,"/download/").concat(e.props.finishedFileName))}},"Download"):this.props.status)),s.a.createElement("div",{className:"innerClose",onClick:function(){e.props.buttonClicked?alert("Removal process ongoing"):e.props.removeFile(e.props.index)}},s.a.createElement("svg",{id:"close",height:21,viewBox:"0 0 21 21",width:21,stroke:"#F1D3BC",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("g",{fillRule:"evenodd",strokeLinecap:"round",strokeLinejoin:"round",transform:"translate(5 5)"},s.a.createElement("path",{d:"m.5 10.5 10-10",strokeWidth:"1.3"}),s.a.createElement("path",{d:"m10.5 10.5-10-10z",strokeWidth:"1.3"})))))}}]),a}(n.Component)),y=(a(56),a(57),function(e,t){return new Promise((function(a,n){var s=new FileReader;s.readAsDataURL(e),s.onload=function(){return a({result:s.result,index:t})},s.onerror=function(e){return n(e)}}))}),S=function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).state={files:[],status:[],masterStatus:"",buttonClicked:""},n.addFiles=n.addFiles.bind(Object(p.a)(n)),n.onIncinerate=n.onIncinerate.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"addFiles",value:function(e){for(var t in e)this.setState({files:[].concat(Object(m.a)(this.state.files),[e[t]])}),this.setState({status:[].concat(Object(m.a)(this.state.status),[{name:e[t].name,convertStatus:"Waiting",finishedFileName:""}])})}},{key:"onIncinerate",value:function(){var e=Object(u.a)(o.a.mark((function e(){var t,a,n,s,i,r,l,u,m,d,h;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.setState({buttonClicked:!0}),!(this.state.files.length<=10&&this.state.files.length>0)){e.next=50;break}t=Object(c.a)(this.state.files.map((function(e,t){return function(){return y(e,t)}}))),e.prev=3,t.s();case 5:if((a=t.n()).done){e.next=40;break}return n=a.value,e.next=9,n();case 9:if(s=e.sent,i=s.result.split(",")[1],r=s.index,(l=this.state.status)[r].convertStatus="Processing",this.setState({status:l}),!((new TextEncoder).encode(i).length<14e6)){e.next=34;break}return e.prev=16,e.next=19,w.a.post("".concat(window.location.origin,"/api/strip"),{file:i});case 19:u=e.sent,m=this.state.status,"LIMIT_REACHED"==u.data.status?m[r].convertStatus="Daily limit reached":"SERVER_ERR"==u.data.status?m[r].convertStatus="Server side error":"BAD_FILE_TYPE"==u.data.status?m[r].convertStatus="Bad file type":"BAD_REQUEST"==u.data.status?m[r].convertStatus="Bad request":"OK"==u.data.status&&(m[r].convertStatus="OK",m[r].finishedFileName=u.data.file),this.setState({status:m}),r==this.state.files.length-1&&this.setState({buttonClicked:!1}),e.next=32;break;case 26:e.prev=26,e.t0=e.catch(16),(d=this.state.status)[r].convertStatus="Server side error",this.setState({status:d}),r==this.state.files.length-1&&this.setState({buttonClicked:!1});case 32:e.next=38;break;case 34:(h=this.state.status)[r].convertStatus="File too big",this.setState({status:h}),r==this.state.files.length-1&&this.setState({buttonClicked:!1});case 38:e.next=5;break;case 40:e.next=45;break;case 42:e.prev=42,e.t1=e.catch(3),t.e(e.t1);case 45:return e.prev=45,t.f(),e.finish(45);case 48:e.next=51;break;case 50:0==this.state.files.length?alert("No files chosen"):this.state.files.length>10&&alert("Max file limit is 10 per 24 hours");case 51:case"end":return e.stop()}}),e,this,[[3,42,45,48],[16,26]])})));return function(){return e.apply(this,arguments)}}()},{key:"removeFile",value:function(e){var t=this.state.files;t.splice(e,1),this.state.status.splice(e,1),this.setState({files:t})}},{key:"render",value:function(){var e=this;if(this.state.status.length>0)var t=this.state.status.map((function(t,a){return s.a.createElement(N,{name:t.name,status:t.convertStatus,finishedFileName:t.finishedFileName,index:a,key:a,removeFile:e.removeFile.bind(e),buttonClicked:e.state.buttonClicked})}));else t=s.a.createElement("div",{className:"fileContainer"},s.a.createElement("div",{className:"innerFileName"},s.a.createElement("p",null,"No files chosen")));return s.a.createElement("div",{className:"appContainer"},s.a.createElement("div",{className:"d-md-flex h-md-100 align-items-center"},s.a.createElement("div",{className:"col-md-5 p-0 h-md-100 split-left"},s.a.createElement("div",{className:"text-white d-md-flex align-items-center h-100 p-5 justify-content-center"},s.a.createElement("div",{className:"titleContainer"},s.a.createElement("h1",{className:"title"},s.a.createElement("b",null,"INCINERATE")),s.a.createElement("p",{className:"subtitle"},"A free, fast, and private metadata remover for the privacy conscious"),s.a.createElement("p",{className:"subtitle"},"Hidden Service mirror: ",s.a.createElement("b",null,"3mghupyalwu7gub3ncpe3tcynf54y2bliylnh6gbslrlib4liwsqlgyd.onion")),s.a.createElement("p",{className:"subtitle"},"Backend code is open source on",s.a.createElement("a",{href:"https://github.com/incinerate-tools/Incinerate-Backend",target:"_blank"},s.a.createElement("b",null," Github. ")),"For more details on the inner workings of the backend, please visit the repo."),s.a.createElement("p",{className:"subtitle"},"Supported file types are: png, jpg, heic, gif, m4a, mp4, tif, mp2, mp3, docx, pptx, xlsx, bmp, ogg, wav, avi, wmv, jpeg"),s.a.createElement("p",{className:"subtitle"},"If you are using the clearnet version of the webapp you are allowed 10 file removals every 24 hours, tracked based on your IP(see details below)."),s.a.createElement("p",{className:"subtitle"},s.a.createElement("p",{style:{color:"red",display:"inline"}},"WARNING:")," If you are using the clearnet mirror of the website, your IP will be logged for rate limiting purposes, so please use the hidden service mirror for maximum privacy. Your files will not be correlated with your IP in any way and will be deleted after 3 minutes or immediately after you download it regardless of which mirror you use."),s.a.createElement("p",{className:"subtitle"},"All donations are accepted and appreciated! You can donate using Bitcoin to this address: ",s.a.createElement("code",null,"bc1q2q0v6czch39eatq08fu5v4hf36md6v57hnsghaapwgur9350x9vqdplc2d"),s.a.createElement("br",null)," Your support keeps this project alive and free for everyone, thanks!")))),s.a.createElement("div",{className:"col-md-7 p-0 h-md-100 split-right"},s.a.createElement(g.a,null,s.a.createElement("div",{className:"align-items-center h-100 p-5 controlContainer"},s.a.createElement(b.a,{onDrop:this.addFiles},(function(e){var t=e.getRootProps,a=e.getInputProps;return s.a.createElement("section",{className:"dropZone"},s.a.createElement("div",t(),s.a.createElement("input",a()),s.a.createElement("p",null,s.a.createElement("b",null,"Drag and drop multiple files, or click to select files"))))})),t,s.a.createElement("br",null),s.a.createElement("button",{className:"submit",onClick:this.onIncinerate,disabled:this.state.buttonClicked},this.state.buttonClicked?"PROCESSING":"INCINERATE"),s.a.createElement("p",{className:"status"},this.state.masterStatus))))))}}]),a}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(58),a(59);r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.7ee9596d.chunk.js.map