<!-- /thrak/Javascript/contribs/jquery/jquery.ui.tooltip.min.js -->
/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.3",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.maskedinput-1.3.1.min.js -->
(function($){function getPasteEvent(){var el=document.createElement('input'),name='onpaste';el.setAttribute(name,'');return(typeof el[name]==='function')?'paste':'input';}
var pasteEventName=getPasteEvent()+".mask",ua=navigator.userAgent,iPhone=/iphone/i.test(ua),android=/android/i.test(ua),caretTimeoutId;$.mask={definitions:{'9':"[0-9]",'a':"[A-Za-z]",'*':"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:'_',};$.fn.extend({caret:function(begin,end){var range;if(this.length===0||this.is(":hidden")){return;}
if(typeof begin=='number'){end=(typeof end==='number')? end:begin;return this.each(function(){if(this.setSelectionRange){this.setSelectionRange(begin,end);}
else if(this.createTextRange){range=this.createTextRange();range.collapse(true);range.moveEnd('character',end);range.moveStart('character',begin);range.select();}});}
else{if(this[0].setSelectionRange){begin=this[0].selectionStart;end=this[0].selectionEnd;}
else if(document.selection&&document.selection.createRange){range=document.selection.createRange();begin=0-range.duplicate().moveStart('character',-100000);end=begin+range.text.length;}
return{begin:begin,end:end};}},unmask:function(){return this.trigger("unmask");},mask:function(mask,settings){var input,defs,tests,partialPosition,firstNonMaskPos,len;if(!mask&&this.length>0){input=$(this[0]);return input.data($.mask.dataName)();}
settings=$.extend({placeholder:$.mask.placeholder,completed:null},settings);defs=$.mask.definitions;tests=[];partialPosition=len=mask.length;firstNonMaskPos=null;$.each(mask.split(""),function(i,c){if(c=='?'){len--;partialPosition=i;}
else if(defs[c]){tests.push(new RegExp(defs[c]));if(firstNonMaskPos===null){firstNonMaskPos=tests.length-1;}}
else{tests.push(null);}});return this.trigger("unmask").each(function(){var input=$(this),buffer=$.map(mask.split(""),function(c,i){if(c!='?'){return defs[c]? settings.placeholder:c;}}),focusText=input.val();function seekNext(pos){while(++pos<len&&!tests[pos]);return pos;}
function seekPrev(pos){while(--pos>=0&&!tests[pos]);return pos;}
function shiftL(begin,end){var i,j;if(begin<0){return;}
for(i=begin,j=seekNext(end);i<len;i++){if(tests[i]){if(j<len&&tests[i].test(buffer[j])){buffer[i]=buffer[j];buffer[j]=settings.placeholder;}
else{break;}
j=seekNext(j);}}
writeBuffer();input.caret(Math.max(firstNonMaskPos,begin));}
function shiftR(pos){var i,c,j,t;for(i=pos,c=settings.placeholder;i<len;i++){if(tests[i]){j=seekNext(i);t=buffer[i];buffer[i]=c;if(j<len&&tests[j].test(t)){c=t;}
else{break;}}}}
function keydownEvent(e){var k=e.which,pos,begin,end;if(k===8||k===46||(iPhone&&k===127)){pos=input.caret();begin=pos.begin;end=pos.end;if(end-begin===0){begin=k!==46?seekPrev(begin):(end=seekNext(begin-1));end=k===46?seekNext(end):end;}
clearBuffer(begin,end);shiftL(begin,end-1);e.preventDefault();}
else if(k==27){input.val(focusText);input.caret(0,checkVal());e.preventDefault();}}
function keypressEvent(e){var k=e.which,pos=input.caret(),p,c,next;if(e.ctrlKey||e.altKey||e.metaKey||k<32){return;}
else if(k){if(pos.end-pos.begin!==0){clearBuffer(pos.begin,pos.end);shiftL(pos.begin,pos.end-1);}
p=seekNext(pos.begin-1);if(p<len){c=String.fromCharCode(k);if(tests[p].test(c)){shiftR(p);buffer[p]=c;writeBuffer();next=seekNext(p);if(android){setTimeout($.proxy($.fn.caret,input,next),0);}
else{input.caret(next);}
if(settings.completed&&next>=len){settings.completed.call(input);}}}
e.preventDefault();}}
function clearBuffer(start,end){var i;for(i=start;i<end&&i<len;i++){if(tests[i]){buffer[i]=settings.placeholder;}}}
function writeBuffer(){input.val(buffer.join(''));}
function checkVal(allow){var test=input.val(),lastMatch=-1,i,c;for(i=0,pos=0;i<len;i++){if(tests[i]){buffer[i]=settings.placeholder;while(pos++<test.length){c=test.charAt(pos-1);if(tests[i].test(c)){buffer[i]=c;lastMatch=i;break;}}
if(pos>test.length){break;}}
else if(buffer[i]===test.charAt(pos)&&i!==partialPosition){pos++;lastMatch=i;}}
if(allow){writeBuffer();}
else if(lastMatch+1<partialPosition){input.val("");clearBuffer(0,len);}
else{writeBuffer();input.val(input.val().substring(0,lastMatch+1));}
return(partialPosition? i:firstNonMaskPos);}
input.data($.mask.dataName,function(){return $.map(buffer,function(c,i){return tests[i]&&c!=settings.placeholder? c:null;}).join('');});if(!input.attr("readonly"))input.one("unmask",function(){input.unbind(".mask").removeData($.mask.dataName);}).bind("focus.mask",function(){clearTimeout(caretTimeoutId);var pos,moveCaret;focusText=input.val();pos=checkVal();caretTimeoutId=setTimeout(function(){writeBuffer();if(pos==mask.length){input.caret(0,pos);}
else{input.caret(pos);}},10);}).bind("blur.mask",function(){checkVal();if(input.val()!=focusText)input.change();}).bind("keydown.mask",keydownEvent).bind("keypress.mask",keypressEvent).bind(pasteEventName,function(){setTimeout(function(){var pos=checkVal(true);input.caret(pos);if(settings.completed&&pos==input.val().length)settings.completed.call(input);},0);});checkVal();});}});})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.numeric.min.js -->
(function($){$.fn.numeric=function(config,callback){if(typeof config==='boolean'){config={decimal:config};}
config=config||{};if(typeof config.negative=="undefined")config.negative=true;var decimal=(config.decimal===false)? "":config.decimal||".";var negative=(config.negative===true)? true:false;var callback=typeof callback=="function"? callback:function(){};return this.data("numeric.decimal",decimal).data("numeric.negative",negative).data("numeric.callback",callback).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur);}
$.fn.numeric.keypress=function(e){var decimal=$.data(this,"numeric.decimal");var negative=$.data(this,"numeric.negative");var key=e.charCode? e.charCode:e.keyCode? e.keyCode:0;if(key==13&&this.nodeName.toLowerCase()=="input"){return true;}
else if(key==13){return false;}
var allow=false;if((e.ctrlKey&&key==97)||(e.ctrlKey&&key==65))return true;if((e.ctrlKey&&key==120)||(e.ctrlKey&&key==88))return true;if((e.ctrlKey&&key==99)||(e.ctrlKey&&key==67))return true;if((e.ctrlKey&&key==122)||(e.ctrlKey&&key==90))return true;if((e.ctrlKey&&key==118)||(e.ctrlKey&&key==86)||(e.shiftKey&&key==45))return true;if(key<48||key>57){if(this.value.indexOf("-")!=0&&negative&&key==45&&(this.value.length==0||($.fn.getSelectionStart(this))==0))return true;if(decimal&&key==decimal.charCodeAt(0)&&this.value.indexOf(decimal)!=-1){allow=false;}
if(key!=8&&key!=9&&key!=13&&key!=35&&key!=36&&key!=37&&key!=39&&key!=46){allow=false;}
else{if(typeof e.charCode!="undefined"){if(e.keyCode==e.which&&e.which!=0){allow=true;if(e.which==46)allow=false;}
else if(e.keyCode!=0&&e.charCode==0&&e.which==0){allow=true;}}}
if(decimal&&key==decimal.charCodeAt(0)){if(this.value.indexOf(decimal)==-1){allow=true;}
else{allow=false;}}}
else{allow=true;}
return allow;}
$.fn.numeric.keyup=function(e){var val=this.value;if(val.length>0){var carat=$.fn.getSelectionStart(this);var decimal=$.data(this,"numeric.decimal");var negative=$.data(this,"numeric.negative");if(decimal!=""){var dot=val.indexOf(decimal);if(dot==0){this.value="0"+val;}
if(dot==1&&val.charAt(0)=="-"){this.value="-0"+val.substring(1);}
val=this.value;}
var validChars=[0,1,2,3,4,5,6,7,8,9,'-',decimal];var length=val.length;for(var i=length-1;i>=0;i--){var ch=val.charAt(i);if(i!=0&&ch=="-"){val=val.substring(0,i)+val.substring(i+1);}
else if(i==0&&!negative&&ch=="-"){val=val.substring(1);}
var validChar=false;for(var j=0;j<validChars.length;j++){if(ch==validChars[j]){validChar=true;break;}}
if(!validChar||ch==" "){val=val.substring(0,i)+val.substring(i+1);}}
var firstDecimal=val.indexOf(decimal);if(firstDecimal>0){for(var i=length-1;i>firstDecimal;i--){var ch=val.charAt(i);if(ch==decimal){val=val.substring(0,i)+val.substring(i+1);}}}
this.value=val;$.fn.setSelection(this,carat);}}
$.fn.numeric.blur=function(){var decimal=$.data(this,"numeric.decimal");var callback=$.data(this,"numeric.callback");var val=this.value;if(val!=""){var re=new RegExp("^\\d+$|\\d*"+decimal+"\\d+");if(!re.exec(val)){callback.apply(this);}}}
$.fn.removeNumeric=function(){return this.data("numeric.decimal",null).data("numeric.negative",null).data("numeric.callback",null).unbind("keypress",$.fn.numeric.keypress).unbind("blur",$.fn.numeric.blur);}
$.fn.getSelectionStart=function(o){if(o.createTextRange){var r=document.selection.createRange().duplicate();r.moveEnd('character',o.value.length);if(r.text=='')return o.value.length;return o.value.lastIndexOf(r.text);}
else return o.selectionStart;}
$.fn.setSelection=function(o,p){if(typeof p=="number")p=[p,p];if(p&&p.constructor==Array&&p.length==2){if(o.createTextRange){var r=o.createTextRange();r.collapse(true);r.moveStart('character',p[0]);r.moveEnd('character',p[1]);r.select();}
else if(o.setSelectionRange){o.focus();o.setSelectionRange(p[0],p[1]);}}}})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.ui.position.min.js -->
/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,b,_=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return b=n(_),_[0].preventDefault&&(e.at="left top"),p=b.width,m=b.height,g=b.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),b=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+b+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:b},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:_,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.upload-1.0.2.min.js -->
(function($){var uuid=0;$.fn.upload=function(url,data,callback,type){var self=this,inputs,checkbox,checked,iframeName='jquery_upload'+ ++uuid,iframe=$('<iframe name="'+iframeName+'" style="position:absolute;top:-9999px" />').appendTo('body'),form='<form target="'+iframeName+'" method="post" enctype="multipart/form-data" />';if($.isFunction(data)){type=callback;callback=data;data={};}
checkbox=$('input:checkbox',this);checked=$('input:checked',this);form=self.wrapAll(form).parent('form').attr('action',url);checkbox.removeAttr('checked');checked.attr('checked',true);inputs=createInputs(data);inputs=inputs? $(inputs).appendTo(form):null;form.submit(function(){iframe.load(function(){var data=handleData(this,type),checked=$('input:checked',self);form.after(self).remove();checkbox.removeAttr('checked');checked.attr('checked',true);if(inputs){inputs.remove();}
setTimeout(function(){iframe.remove();if(type==='script'){$.globalEval(data);}
if(callback){callback.call(self,data);}},0);});}).submit();return this;};function createInputs(data){return $.map(param(data),function(param){return '<input type="hidden" name="'+param.name+'" value="'+param.value+'"/>';}).join('');}
function param(data){if($.isArray(data)){return data;}
var params=[];function add(name,value){params.push({name:name,value:value});}
if(typeof data==='object'){$.each(data,function(name){if($.isArray(this)){$.each(this,function(){add(name,this);});}
else{add(name,$.isFunction(this)? this():this);}});}
else if(typeof data==='string'){$.each(data.split('&'),function(){var param=$.map(this.split('='),function(v){return decodeURIComponent(v.replace(/\+/g,' '));});add(param[0],param[1]);});}
return params;}
function handleData(iframe,type){var data,contents=$(iframe).contents().get(0);if($.isXMLDoc(contents)||contents.XMLDocument){return contents.XMLDocument||contents;}
data=$(contents).find('body').html();switch(type){case 'xml':data=parseXml(data);break;case 'json':data=window.eval('('+data+')');break;}
return data;}
function parseXml(text){if(window.DOMParser){return new DOMParser().parseFromString(text,'application/xml');}
else{var xml=new ActiveXObject('Microsoft.XMLDOM');xml.async=false;xml.loadXML(text);return xml;}}})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.simpletooltip.min.js -->
/*
 * jQuery Simple Tooltip 0.9.1
 * Copyright (c) 2009 Pierre Bertet (pierrebertet.net)
 * Licensed under the MIT (MIT-LICENSE.txt)
 *
*/
;(function(b){b.fn.simpletooltip=function(f){var e=b.extend({hideOnLeave:true,margin:5,showEffect:false,hideEffect:false,click:false,hideDelay:0,showDelay:0.1,showCallback:function(){},hideCallback:function(){},customTooltip:false,customTooltipCache:true},f);
this.each(function(){if(!b.isFunction(e.customTooltip)){b(this).data("$tooltip",c(this).hide())
}if(e.click){b(this).bind("click",{options:e,target:this},a)
}else{var g;
b(this).bind("mouseenter",{options:e,target:this},function(h){var i=h;
g=window.setTimeout(function(){a(i)
},(e.showDelay*1000))
}).bind("mouseleave",function(){window.clearTimeout(g)
})
}});
return this
};
function c(g){var e=b(g).attr("href").match(/#.+/);
if(!!e){var f=b(e[0])
}return f
}function d(e){e.appendTo(document.body).data("width",e.outerWidth()).data("height",e.outerHeight()).css({position:"absolute",zIndex:"9998",display:"none"}).find("a[rel=close]").click(function(f){f.preventDefault();
e.trigger("hide")
}).end().data("init",true)
}function a(l){if(l.type=="click"){l.preventDefault()
}var f=l.data.options;
var h=b(l.data.target);
if(!f.customTooltipCache&&h.data("$tooltip")){h.data("$tooltip").remove();
h.data("$tooltip",false)
}if(!h.data("$tooltip")){h.data("$tooltip",b(f.customTooltip(h.get(0))))
}var k=h.data("$tooltip");
if(!k.data("init")){d(k)
}var i=b(window).width();
var j=b(window).height();
var n=b(window).scrollTop();
var p=b(window).scrollLeft();
k.unbind("show").unbind("hide");
if(f.showEffect&&(f.showEffect.match(/^fadeIn|slideDown|show$/))){k.bind("show",function(){k[f.showEffect](200);
f.showCallback(h[0],this)
})
}else{k.bind("show",function(){k.show();
f.showCallback(h[0],this)
})
}if(f.hideEffect&&(f.hideEffect.match(/^fadeOut|slideUp|hide$/))){k.bind("hide",function(){f.hideCallback(h[0],this);
k[f.hideEffect](200)
})
}else{k.bind("hide",function(){f.hideCallback(h[0],this);
k.hide()
})
}var o=l.pageX-(k.data("width")/2);
var m=l.pageY-(k.data("height")/2);
if(o<p+f.margin){o=p+f.margin
}else{if(o+k.data("width")>(p+i-f.margin)){o=p+i-k.data("width")-f.margin
}}if(m<n+f.margin){m=n+f.margin
}else{if(m+k.data("height")>(n+j-f.margin)){m=n+j-k.data("height")-f.margin
}}if(f.hideDelay>0&&f.hideOnLeave){var g;
k.hover(function(){window.clearTimeout(g)
},function(){g=window.setTimeout(function(){k.trigger("hide").unbind("mouseenter, mouseleave")
},f.hideDelay*1000)
})
}else{if(f.hideOnLeave){k.bind("mouseleave",function(){k.trigger("hide").unbind("mouseleave")
})
}}k.css({left:o+"px",top:m+"px"}).trigger("show")
}})(jQuery);
<!-- /thrak/Javascript/contribs/jquery/jquery.ui.timepicker.addon.min.js -->
(function($){$.ui.timepicker=$.ui.timepicker||{};if($.ui.timepicker.version){return;}
$.extend($.ui,{timepicker:{version:"@@version"}});var Timepicker=function(){this.regional=[];this.regional['']={currentText:'Now',closeText:'Done',amNames:['AM','A'],pmNames:['PM','P'],timeFormat:'HH:mm',timeSuffix:'',timeOnlyTitle:'Choose Time',timeText:'Time',hourText:'Hour',minuteText:'Minute',secondText:'Second',millisecText:'Millisecond',microsecText:'Microsecond',timezoneText:'Time Zone',isRTL:false};this._defaults={showButtonPanel:true,timeOnly:false,showHour:null,showMinute:null,showSecond:null,showMillisec:null,showMicrosec:null,showTimezone:null,showTime:true,stepHour:1,stepMinute:1,stepSecond:1,stepMillisec:1,stepMicrosec:1,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMin:0,minuteMin:0,secondMin:0,millisecMin:0,microsecMin:0,hourMax:23,minuteMax:59,secondMax:59,millisecMax:999,microsecMax:999,minDateTime:null,maxDateTime:null,onSelect:null,hourGrid:0,minuteGrid:0,secondGrid:0,millisecGrid:0,microsecGrid:0,alwaysSetTime:true,separator:' ',altFieldTimeOnly:true,altTimeFormat:null,altSeparator:null,altTimeSuffix:null,pickerTimeFormat:null,pickerTimeSuffix:null,showTimepicker:true,timezoneList:null,addSliderAccess:false,sliderAccessArgs:null,controlType:'slider',defaultValue:null,parse:'strict'};$.extend(this._defaults,this.regional['']);};$.extend(Timepicker.prototype,{$input:null,$altInput:null,$timeObj:null,inst:null,hour_slider:null,minute_slider:null,second_slider:null,millisec_slider:null,microsec_slider:null,timezone_select:null,hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null,hourMinOriginal:null,minuteMinOriginal:null,secondMinOriginal:null,millisecMinOriginal:null,microsecMinOriginal:null,hourMaxOriginal:null,minuteMaxOriginal:null,secondMaxOriginal:null,millisecMaxOriginal:null,microsecMaxOriginal:null,ampm:'',formattedDate:'',formattedTime:'',formattedDateTime:'',timezoneList:null,units:['hour','minute','second','millisec','microsec'],support:{},control:null,setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this;},_newInst:function($input,opts){var tp_inst=new Timepicker(),inlineSettings={},fns={},overrides,i;for(var attrName in this._defaults){if(this._defaults.hasOwnProperty(attrName)){var attrValue=$input.attr('time:'+attrName);if(attrValue){try{inlineSettings[attrName]=eval(attrValue);}
catch(err){inlineSettings[attrName]=attrValue;}}}}
overrides={beforeShow:function(input,dp_inst){if($.isFunction(tp_inst._defaults.evnts.beforeShow)){return tp_inst._defaults.evnts.beforeShow.call($input[0],input,dp_inst,tp_inst);}},onChangeMonthYear:function(year,month,dp_inst){tp_inst._updateDateTime(dp_inst);if($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)){tp_inst._defaults.evnts.onChangeMonthYear.call($input[0],year,month,dp_inst,tp_inst);}},onClose:function(dateText,dp_inst){if(tp_inst.timeDefined===true&&$input.val()!==''){tp_inst._updateDateTime(dp_inst);}
if($.isFunction(tp_inst._defaults.evnts.onClose)){tp_inst._defaults.evnts.onClose.call($input[0],dateText,dp_inst,tp_inst);}}};for(i in overrides){if(overrides.hasOwnProperty(i)){fns[i]=opts[i]||null;}}
tp_inst._defaults=$.extend({},this._defaults,inlineSettings,opts,overrides,{evnts:fns,timepicker:tp_inst});tp_inst.amNames=$.map(tp_inst._defaults.amNames,function(val){return val.toUpperCase();});tp_inst.pmNames=$.map(tp_inst._defaults.pmNames,function(val){return val.toUpperCase();});tp_inst.support=detectSupport(tp_inst._defaults.timeFormat+(tp_inst._defaults.pickerTimeFormat? tp_inst._defaults.pickerTimeFormat:'')+(tp_inst._defaults.altTimeFormat? tp_inst._defaults.altTimeFormat:''));if(typeof(tp_inst._defaults.controlType)==='string'){if(tp_inst._defaults.controlType==='slider'&&typeof($.ui.slider)==='undefined'){tp_inst._defaults.controlType='select';}
tp_inst.control=tp_inst._controls[tp_inst._defaults.controlType];}
else{tp_inst.control=tp_inst._defaults.controlType;}
var timezoneList=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-270,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,525,540,570,600,630,660,690,720,765,780,840];if(tp_inst._defaults.timezoneList!==null){timezoneList=tp_inst._defaults.timezoneList;}
var tzl=timezoneList.length,tzi=0,tzv=null;if(tzl>0&&typeof timezoneList[0]!=='object'){for(;tzi<tzl;tzi++){tzv=timezoneList[tzi];timezoneList[tzi]={value:tzv,label:$.timepicker.timezoneOffsetString(tzv,tp_inst.support.iso8601)};}}
tp_inst._defaults.timezoneList=timezoneList;tp_inst.timezone=tp_inst._defaults.timezone!==null? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone):((new Date()).getTimezoneOffset()*-1);tp_inst.hour=tp_inst._defaults.hour<tp_inst._defaults.hourMin? tp_inst._defaults.hourMin:tp_inst._defaults.hour>tp_inst._defaults.hourMax? tp_inst._defaults.hourMax:tp_inst._defaults.hour;tp_inst.minute=tp_inst._defaults.minute<tp_inst._defaults.minuteMin? tp_inst._defaults.minuteMin:tp_inst._defaults.minute>tp_inst._defaults.minuteMax? tp_inst._defaults.minuteMax:tp_inst._defaults.minute;tp_inst.second=tp_inst._defaults.second<tp_inst._defaults.secondMin? tp_inst._defaults.secondMin:tp_inst._defaults.second>tp_inst._defaults.secondMax? tp_inst._defaults.secondMax:tp_inst._defaults.second;tp_inst.millisec=tp_inst._defaults.millisec<tp_inst._defaults.millisecMin? tp_inst._defaults.millisecMin:tp_inst._defaults.millisec>tp_inst._defaults.millisecMax? tp_inst._defaults.millisecMax:tp_inst._defaults.millisec;tp_inst.microsec=tp_inst._defaults.microsec<tp_inst._defaults.microsecMin? tp_inst._defaults.microsecMin:tp_inst._defaults.microsec>tp_inst._defaults.microsecMax? tp_inst._defaults.microsecMax:tp_inst._defaults.microsec;tp_inst.ampm='';tp_inst.$input=$input;if(tp_inst._defaults.altField){tp_inst.$altInput=$(tp_inst._defaults.altField).css({cursor:'pointer'}).focus(function(){$input.trigger("focus");});}
if(tp_inst._defaults.minDate===0||tp_inst._defaults.minDateTime===0){tp_inst._defaults.minDate=new Date();}
if(tp_inst._defaults.maxDate===0||tp_inst._defaults.maxDateTime===0){tp_inst._defaults.maxDate=new Date();}
if(tp_inst._defaults.minDate!==undefined&&tp_inst._defaults.minDate instanceof Date){tp_inst._defaults.minDateTime=new Date(tp_inst._defaults.minDate.getTime());}
if(tp_inst._defaults.minDateTime!==undefined&&tp_inst._defaults.minDateTime instanceof Date){tp_inst._defaults.minDate=new Date(tp_inst._defaults.minDateTime.getTime());}
if(tp_inst._defaults.maxDate!==undefined&&tp_inst._defaults.maxDate instanceof Date){tp_inst._defaults.maxDateTime=new Date(tp_inst._defaults.maxDate.getTime());}
if(tp_inst._defaults.maxDateTime!==undefined&&tp_inst._defaults.maxDateTime instanceof Date){tp_inst._defaults.maxDate=new Date(tp_inst._defaults.maxDateTime.getTime());}
tp_inst.$input.bind('focus',function(){tp_inst._onFocus();});return tp_inst;},_addTimePicker:function(dp_inst){var currDT=(this.$altInput&&this._defaults.altFieldTimeOnly)? this.$input.val()+' '+this.$altInput.val():this.$input.val();this.timeDefined=this._parseTime(currDT);this._limitMinMaxDateTime(dp_inst,false);this._injectTimePicker();},_parseTime:function(timeString,withDate){if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);}
if(withDate||!this._defaults.timeOnly){var dp_dateFormat=$.datepicker._get(this.inst,'dateFormat');try{var parseRes=parseDateTimeInternal(dp_dateFormat,this._defaults.timeFormat,timeString,$.datepicker._getFormatConfig(this.inst),this._defaults);if(!parseRes.timeObj){return false;}
$.extend(this,parseRes.timeObj);}
catch(err){$.timepicker.log("Error parsing the date/time string: "+err+"\ndate/time string = "+timeString+"\ntimeFormat = "+this._defaults.timeFormat+"\ndateFormat = "+dp_dateFormat);return false;}
return true;}
else{var timeObj=$.datepicker.parseTime(this._defaults.timeFormat,timeString,this._defaults);if(!timeObj){return false;}
$.extend(this,timeObj);return true;}},_injectTimePicker:function(){var $dp=this.inst.dpDiv,o=this.inst.settings,tp_inst=this,litem='',uitem='',show=null,max={},gridSize={},size=null,i=0,l=0;if($dp.find("div.ui-timepicker-div").length===0&&o.showTimepicker){var noDisplay=' style="display:none;"',html='<div class="ui-timepicker-div'+(o.isRTL? ' ui-timepicker-rtl':'')+'"><dl>'+'<dt class="ui_tpicker_time_label"'+((o.showTime)? '':noDisplay)+'>'+o.timeText+'</dt>'+'<dd class="ui_tpicker_time"'+((o.showTime)? '':noDisplay)+'></dd>';for(i=0,l=this.units.length;i<l;i++){litem=this.units[i];uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o['show'+uitem]!==null? o['show'+uitem]:this.support[litem];max[litem]=parseInt((o[litem+'Max']-((o[litem+'Max']-o[litem+'Min'])%o['step'+uitem])),10);gridSize[litem]=0;html+='<dt class="ui_tpicker_'+litem+'_label"'+(show? '':noDisplay)+'>'+o[litem+'Text']+'</dt>'+'<dd class="ui_tpicker_'+litem+'"><div class="ui_tpicker_'+litem+'_slider"'+(show? '':noDisplay)+'></div>';if(show&&o[litem+'Grid']>0){html+='<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';if(litem==='hour'){for(var h=o[litem+'Min'];h<=max[litem];h+=parseInt(o[litem+'Grid'],10)){gridSize[litem]++;var tmph=$.datepicker.formatTime(this.support.ampm? 'hht':'HH',{hour:h},o);html+='<td data-for="'+litem+'">'+tmph+'</td>';}}
else{for(var m=o[litem+'Min'];m<=max[litem];m+=parseInt(o[litem+'Grid'],10)){gridSize[litem]++;html+='<td data-for="'+litem+'">'+((m<10)? '0':'')+m+'</td>';}}
html+='</tr></table></div>';}
html+='</dd>';}
var showTz=o.showTimezone!==null? o.showTimezone:this.support.timezone;html+='<dt class="ui_tpicker_timezone_label"'+(showTz? '':noDisplay)+'>'+o.timezoneText+'</dt>';html+='<dd class="ui_tpicker_timezone" '+(showTz? '':noDisplay)+'></dd>';html+='</dl></div>';var $tp=$(html);if(o.timeOnly===true){$tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all">'+'<div class="ui-datepicker-title">'+o.timeOnlyTitle+'</div>'+'</div>');$dp.find('.ui-datepicker-header, .ui-datepicker-calendar').hide();}
for(i=0,l=tp_inst.units.length;i<l;i++){litem=tp_inst.units[i];uitem=litem.substr(0,1).toUpperCase()+litem.substr(1);show=o['show'+uitem]!==null? o['show'+uitem]:this.support[litem];tp_inst[litem+'_slider']=tp_inst.control.create(tp_inst,$tp.find('.ui_tpicker_'+litem+'_slider'),litem,tp_inst[litem],o[litem+'Min'],max[litem],o['step'+uitem]);if(show&&o[litem+'Grid']>0){size=100*gridSize[litem]*o[litem+'Grid']/(max[litem]-o[litem+'Min']);$tp.find('.ui_tpicker_'+litem+' table').css({width:size+"%",marginLeft:o.isRTL? '0':((size/(-2*gridSize[litem]))+"%"),marginRight:o.isRTL?((size/(-2*gridSize[litem]))+"%"):'0',borderCollapse:'collapse'}).find("td").click(function(e){var $t=$(this),h=$t.html(),n=parseInt(h.replace(/[^0-9]/g),10),ap=h.replace(/[^apm]/ig),f=$t.data('for');if(f==='hour'){if(ap.indexOf('p')!==-1&&n<12){n+=12;}
else{if(ap.indexOf('a')!==-1&&n===12){n=0;}}}
tp_inst.control.value(tp_inst,tp_inst[f+'_slider'],litem,n);tp_inst._onTimeChange();tp_inst._onSelectHandler();}).css({cursor:'pointer',width:(100/gridSize[litem])+'%',textAlign:'center',overflow:'hidden'});}}
this.timezone_select=$tp.find('.ui_tpicker_timezone').append('<select></select>').find("select");$.fn.append.apply(this.timezone_select,$.map(o.timezoneList,function(val,idx){return $("<option />").val(typeof val==="object"? val.value:val).text(typeof val==="object"? val.label:val);}));if(typeof(this.timezone)!=="undefined"&&this.timezone!==null&&this.timezone!==""){var local_timezone=(new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12)).getTimezoneOffset()*-1;if(local_timezone===this.timezone){selectLocalTimezone(tp_inst);}
else{this.timezone_select.val(this.timezone);}}
else{if(typeof(this.hour)!=="undefined"&&this.hour!==null&&this.hour!==""){this.timezone_select.val(o.timezone);}
else{selectLocalTimezone(tp_inst);}}
this.timezone_select.change(function(){tp_inst._onTimeChange();tp_inst._onSelectHandler();});var $buttonPanel=$dp.find('.ui-datepicker-buttonpane');if($buttonPanel.length){$buttonPanel.before($tp);}
else{$dp.append($tp);}
this.$timeObj=$tp.find('.ui_tpicker_time');if(this.inst!==null){var timeDefined=this.timeDefined;this._onTimeChange();this.timeDefined=timeDefined;}
if(this._defaults.addSliderAccess){var sliderAccessArgs=this._defaults.sliderAccessArgs,rtl=this._defaults.isRTL;sliderAccessArgs.isRTL=rtl;setTimeout(function(){if($tp.find('.ui-slider-access').length===0){$tp.find('.ui-slider:visible').sliderAccess(sliderAccessArgs);var sliderAccessWidth=$tp.find('.ui-slider-access:eq(0)').outerWidth(true);if(sliderAccessWidth){$tp.find('table:visible').each(function(){var $g=$(this),oldWidth=$g.outerWidth(),oldMarginLeft=$g.css(rtl? 'marginRight':'marginLeft').toString().replace('%',''),newWidth=oldWidth-sliderAccessWidth,newMarginLeft=((oldMarginLeft*newWidth)/oldWidth)+'%',css={width:newWidth,marginRight:0,marginLeft:0};css[rtl? 'marginRight':'marginLeft']=newMarginLeft;$g.css(css);});}}},10);}
tp_inst._limitMinMaxDateTime(this.inst,true);}},_limitMinMaxDateTime:function(dp_inst,adjustSliders){var o=this._defaults,dp_date=new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay);if(!this._defaults.showTimepicker){return;}
if($.datepicker._get(dp_inst,'minDateTime')!==null&&$.datepicker._get(dp_inst,'minDateTime')!==undefined&&dp_date){var minDateTime=$.datepicker._get(dp_inst,'minDateTime'),minDateTimeDate=new Date(minDateTime.getFullYear(),minDateTime.getMonth(),minDateTime.getDate(),0,0,0,0);if(this.hourMinOriginal===null||this.minuteMinOriginal===null||this.secondMinOriginal===null||this.millisecMinOriginal===null||this.microsecMinOriginal===null){this.hourMinOriginal=o.hourMin;this.minuteMinOriginal=o.minuteMin;this.secondMinOriginal=o.secondMin;this.millisecMinOriginal=o.millisecMin;this.microsecMinOriginal=o.microsecMin;}
if(dp_inst.settings.timeOnly||minDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMin=minDateTime.getHours();if(this.hour<=this._defaults.hourMin){this.hour=this._defaults.hourMin;this._defaults.minuteMin=minDateTime.getMinutes();if(this.minute<=this._defaults.minuteMin){this.minute=this._defaults.minuteMin;this._defaults.secondMin=minDateTime.getSeconds();if(this.second<=this._defaults.secondMin){this.second=this._defaults.secondMin;this._defaults.millisecMin=minDateTime.getMilliseconds();if(this.millisec<=this._defaults.millisecMin){this.millisec=this._defaults.millisecMin;this._defaults.microsecMin=minDateTime.getMicroseconds();}
else{if(this.microsec<this._defaults.microsecMin){this.microsec=this._defaults.microsecMin;}
this._defaults.microsecMin=this.microsecMinOriginal;}}
else{this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}
else{this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}
else{this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}
else{this._defaults.hourMin=this.hourMinOriginal;this._defaults.minuteMin=this.minuteMinOriginal;this._defaults.secondMin=this.secondMinOriginal;this._defaults.millisecMin=this.millisecMinOriginal;this._defaults.microsecMin=this.microsecMinOriginal;}}
if($.datepicker._get(dp_inst,'maxDateTime')!==null&&$.datepicker._get(dp_inst,'maxDateTime')!==undefined&&dp_date){var maxDateTime=$.datepicker._get(dp_inst,'maxDateTime'),maxDateTimeDate=new Date(maxDateTime.getFullYear(),maxDateTime.getMonth(),maxDateTime.getDate(),0,0,0,0);if(this.hourMaxOriginal===null||this.minuteMaxOriginal===null||this.secondMaxOriginal===null||this.millisecMaxOriginal===null){this.hourMaxOriginal=o.hourMax;this.minuteMaxOriginal=o.minuteMax;this.secondMaxOriginal=o.secondMax;this.millisecMaxOriginal=o.millisecMax;this.microsecMaxOriginal=o.microsecMax;}
if(dp_inst.settings.timeOnly||maxDateTimeDate.getTime()===dp_date.getTime()){this._defaults.hourMax=maxDateTime.getHours();if(this.hour>=this._defaults.hourMax){this.hour=this._defaults.hourMax;this._defaults.minuteMax=maxDateTime.getMinutes();if(this.minute>=this._defaults.minuteMax){this.minute=this._defaults.minuteMax;this._defaults.secondMax=maxDateTime.getSeconds();if(this.second>=this._defaults.secondMax){this.second=this._defaults.secondMax;this._defaults.millisecMax=maxDateTime.getMilliseconds();if(this.millisec>=this._defaults.millisecMax){this.millisec=this._defaults.millisecMax;this._defaults.microsecMax=maxDateTime.getMicroseconds();}
else{if(this.microsec>this._defaults.microsecMax){this.microsec=this._defaults.microsecMax;}
this._defaults.microsecMax=this.microsecMaxOriginal;}}
else{this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}
else{this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}
else{this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}
else{this._defaults.hourMax=this.hourMaxOriginal;this._defaults.minuteMax=this.minuteMaxOriginal;this._defaults.secondMax=this.secondMaxOriginal;this._defaults.millisecMax=this.millisecMaxOriginal;this._defaults.microsecMax=this.microsecMaxOriginal;}}
if(adjustSliders!==undefined&&adjustSliders===true){var hourMax=parseInt((this._defaults.hourMax-((this._defaults.hourMax-this._defaults.hourMin)%this._defaults.stepHour)),10),minMax=parseInt((this._defaults.minuteMax-((this._defaults.minuteMax-this._defaults.minuteMin)%this._defaults.stepMinute)),10),secMax=parseInt((this._defaults.secondMax-((this._defaults.secondMax-this._defaults.secondMin)%this._defaults.stepSecond)),10),millisecMax=parseInt((this._defaults.millisecMax-((this._defaults.millisecMax-this._defaults.millisecMin)%this._defaults.stepMillisec)),10),microsecMax=parseInt((this._defaults.microsecMax-((this._defaults.microsecMax-this._defaults.microsecMin)%this._defaults.stepMicrosec)),10);if(this.hour_slider){this.control.options(this,this.hour_slider,'hour',{min:this._defaults.hourMin,max:hourMax});this.control.value(this,this.hour_slider,'hour',this.hour-(this.hour%this._defaults.stepHour));}
if(this.minute_slider){this.control.options(this,this.minute_slider,'minute',{min:this._defaults.minuteMin,max:minMax});this.control.value(this,this.minute_slider,'minute',this.minute-(this.minute%this._defaults.stepMinute));}
if(this.second_slider){this.control.options(this,this.second_slider,'second',{min:this._defaults.secondMin,max:secMax});this.control.value(this,this.second_slider,'second',this.second-(this.second%this._defaults.stepSecond));}
if(this.millisec_slider){this.control.options(this,this.millisec_slider,'millisec',{min:this._defaults.millisecMin,max:millisecMax});this.control.value(this,this.millisec_slider,'millisec',this.millisec-(this.millisec%this._defaults.stepMillisec));}
if(this.microsec_slider){this.control.options(this,this.microsec_slider,'microsec',{min:this._defaults.microsecMin,max:microsecMax});this.control.value(this,this.microsec_slider,'microsec',this.microsec-(this.microsec%this._defaults.stepMicrosec));}}},_onTimeChange:function(){if(!this._defaults.showTimepicker){return;}
var hour=(this.hour_slider)? this.control.value(this,this.hour_slider,'hour'):false,minute=(this.minute_slider)? this.control.value(this,this.minute_slider,'minute'):false,second=(this.second_slider)? this.control.value(this,this.second_slider,'second'):false,millisec=(this.millisec_slider)? this.control.value(this,this.millisec_slider,'millisec'):false,microsec=(this.microsec_slider)? this.control.value(this,this.microsec_slider,'microsec'):false,timezone=(this.timezone_select)? this.timezone_select.val():false,o=this._defaults,pickerTimeFormat=o.pickerTimeFormat||o.timeFormat,pickerTimeSuffix=o.pickerTimeSuffix||o.timeSuffix;if(typeof(hour)==='object'){hour=false;}
if(typeof(minute)==='object'){minute=false;}
if(typeof(second)==='object'){second=false;}
if(typeof(millisec)==='object'){millisec=false;}
if(typeof(microsec)==='object'){microsec=false;}
if(typeof(timezone)==='object'){timezone=false;}
if(hour!==false){hour=parseInt(hour,10);}
if(minute!==false){minute=parseInt(minute,10);}
if(second!==false){second=parseInt(second,10);}
if(millisec!==false){millisec=parseInt(millisec,10);}
if(microsec!==false){microsec=parseInt(microsec,10);}
if(timezone!==false){timezone=timezone.toString();}
var ampm=o[hour<12? 'amNames':'pmNames'][0];var hasChanged=(hour!==parseInt(this.hour,10)||minute!==parseInt(this.minute,10)||second!==parseInt(this.second,10)||millisec!==parseInt(this.millisec,10)||microsec!==parseInt(this.microsec,10)||(this.ampm.length>0&&(hour<12)!==($.inArray(this.ampm.toUpperCase(),this.amNames)!==-1))||(this.timezone!==null&&timezone!==this.timezone.toString()));if(hasChanged){if(hour!==false){this.hour=hour;}
if(minute!==false){this.minute=minute;}
if(second!==false){this.second=second;}
if(millisec!==false){this.millisec=millisec;}
if(microsec!==false){this.microsec=microsec;}
if(timezone!==false){this.timezone=timezone;}
if(!this.inst){this.inst=$.datepicker._getInst(this.$input[0]);}
this._limitMinMaxDateTime(this.inst,true);}
if(this.support.ampm){this.ampm=ampm;}
this.formattedTime=$.datepicker.formatTime(o.timeFormat,this,o);if(this.$timeObj){if(pickerTimeFormat===o.timeFormat){this.$timeObj.text(this.formattedTime+pickerTimeSuffix);}
else{this.$timeObj.text($.datepicker.formatTime(pickerTimeFormat,this,o)+pickerTimeSuffix);}}
this.timeDefined=true;if(hasChanged){this._updateDateTime();this.$input.focus();}},_onSelectHandler:function(){var onSelect=this._defaults.onSelect||this.inst.settings.onSelect;var inputEl=this.$input? this.$input[0]:null;if(onSelect&&inputEl){onSelect.apply(inputEl,[this.formattedDateTime,this]);}},_updateDateTime:function(dp_inst){dp_inst=this.inst||dp_inst;var dtTmp=(dp_inst.currentYear>0? 
 new Date(dp_inst.currentYear,dp_inst.currentMonth,dp_inst.currentDay):new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay)),dt=$.datepicker._daylightSavingAdjust(dtTmp),dateFmt=$.datepicker._get(dp_inst,'dateFormat'),formatCfg=$.datepicker._getFormatConfig(dp_inst),timeAvailable=dt!==null&&this.timeDefined;this.formattedDate=$.datepicker.formatDate(dateFmt,(dt===null? new Date():dt),formatCfg);var formattedDateTime=this.formattedDate;if(dp_inst.lastVal===""){dp_inst.currentYear=dp_inst.selectedYear;dp_inst.currentMonth=dp_inst.selectedMonth;dp_inst.currentDay=dp_inst.selectedDay;}
if(this._defaults.timeOnly===true){formattedDateTime=this.formattedTime;}
else if(this._defaults.timeOnly!==true&&(this._defaults.alwaysSetTime||timeAvailable)){formattedDateTime+=this._defaults.separator+this.formattedTime+this._defaults.timeSuffix;}
this.formattedDateTime=formattedDateTime;if(!this._defaults.showTimepicker){this.$input.val(this.formattedDate);}
else if(this.$altInput&&this._defaults.timeOnly===false&&this._defaults.altFieldTimeOnly===true){this.$altInput.val(this.formattedTime);this.$input.val(this.formattedDate);}
else if(this.$altInput){this.$input.val(formattedDateTime);var altFormattedDateTime='',altSeparator=this._defaults.altSeparator? this._defaults.altSeparator:this._defaults.separator,altTimeSuffix=this._defaults.altTimeSuffix? this._defaults.altTimeSuffix:this._defaults.timeSuffix;if(!this._defaults.timeOnly){if(this._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(this._defaults.altFormat,(dt===null? new Date():dt),formatCfg);}
else{altFormattedDateTime=this.formattedDate;}
if(altFormattedDateTime){altFormattedDateTime+=altSeparator;}}
if(this._defaults.altTimeFormat){altFormattedDateTime+=$.datepicker.formatTime(this._defaults.altTimeFormat,this,this._defaults)+altTimeSuffix;}
else{altFormattedDateTime+=this.formattedTime+altTimeSuffix;}
this.$altInput.val(altFormattedDateTime);}
else{this.$input.val(formattedDateTime);}
this.$input.trigger("change");},_onFocus:function(){if(!this.$input.val()&&this._defaults.defaultValue){this.$input.val(this._defaults.defaultValue);var inst=$.datepicker._getInst(this.$input.get(0)),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}
catch(err){$.timepicker.log(err);}}}}},_controls:{slider:{create:function(tp_inst,obj,unit,val,min,max,step){var rtl=tp_inst._defaults.isRTL;return obj.prop('slide',null).slider({orientation:"horizontal",value:rtl? val*-1:val,min:rtl? max*-1:min,max:rtl? min*-1:max,step:step,slide:function(event,ui){tp_inst.control.value(tp_inst,$(this),unit,rtl? ui.value*-1:ui.value);tp_inst._onTimeChange();},stop:function(event,ui){tp_inst._onSelectHandler();}});},options:function(tp_inst,obj,unit,opts,val){if(tp_inst._defaults.isRTL){if(typeof(opts)==='string'){if(opts==='min'||opts==='max'){if(val!==undefined){return obj.slider(opts,val*-1);}
return Math.abs(obj.slider(opts));}
return obj.slider(opts);}
var min=opts.min,max=opts.max;opts.min=opts.max=null;if(min!==undefined){opts.max=min*-1;}
if(max!==undefined){opts.min=max*-1;}
return obj.slider(opts);}
if(typeof(opts)==='string'&&val!==undefined){return obj.slider(opts,val);}
return obj.slider(opts);},value:function(tp_inst,obj,unit,val){if(tp_inst._defaults.isRTL){if(val!==undefined){return obj.slider('value',val*-1);}
return Math.abs(obj.slider('value'));}
if(val!==undefined){return obj.slider('value',val);}
return obj.slider('value');}},select:{create:function(tp_inst,obj,unit,val,min,max,step){var sel='<select class="ui-timepicker-select" data-unit="'+unit+'" data-min="'+min+'" data-max="'+max+'" data-step="'+step+'">',format=tp_inst._defaults.pickerTimeFormat||tp_inst._defaults.timeFormat;for(var i=min;i<=max;i+=step){sel+='<option value="'+i+'"'+(i===val? ' selected':'')+'>';if(unit==='hour'){sel+=$.datepicker.formatTime($.trim(format.replace(/[^ht ]/ig,'')),{hour:i},tp_inst._defaults);}
else if(unit==='millisec'||unit==='microsec'||i>=10){sel+=i;}
else{sel+='0'+i.toString();}
sel+='</option>';}
sel+='</select>';obj.children('select').remove();$(sel).appendTo(obj).change(function(e){tp_inst._onTimeChange();tp_inst._onSelectHandler();});return obj;},options:function(tp_inst,obj,unit,opts,val){var o={},$t=obj.children('select');if(typeof(opts)==='string'){if(val===undefined){return $t.data(opts);}
o[opts]=val;}
else{o=opts;}
return tp_inst.control.create(tp_inst,obj,$t.data('unit'),$t.val(),o.min||$t.data('min'),o.max||$t.data('max'),o.step||$t.data('step'));},value:function(tp_inst,obj,unit,val){var $t=obj.children('select');if(val!==undefined){return $t.val(val);}
return $t.val();}}}});$.fn.extend({timepicker:function(o){o=o||{};var tmp_args=Array.prototype.slice.call(arguments);if(typeof o==='object'){tmp_args[0]=$.extend(o,{timeOnly:true});}
return $(this).each(function(){$.fn.datetimepicker.apply($(this),tmp_args);});},datetimepicker:function(o){o=o||{};var tmp_args=arguments;if(typeof(o)==='string'){if(o==='getDate'){return $.fn.datepicker.apply($(this[0]),tmp_args);}
else{return this.each(function(){var $t=$(this);$t.datepicker.apply($t,tmp_args);});}}
else{return this.each(function(){var $t=$(this);$t.datepicker($.timepicker._newInst($t,o)._defaults);});}}});$.datepicker.parseDateTime=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var parseRes=parseDateTimeInternal(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings);if(parseRes.timeObj){var t=parseRes.timeObj;parseRes.date.setHours(t.hour,t.minute,t.second,t.millisec);parseRes.date.setMicroseconds(t.microsec);}
return parseRes.date;};$.datepicker.parseTime=function(timeFormat,timeString,options){var o=extendRemove(extendRemove({},$.timepicker._defaults),options||{}),iso8601=(timeFormat.replace(/\'.*?\'/g,'').indexOf('Z')!==-1);var strictParse=function(f,s,o){var getPatternAmpm=function(amNames,pmNames){var markers=[];if(amNames){$.merge(markers,amNames);}
if(pmNames){$.merge(markers,pmNames);}
markers=$.map(markers,function(val){return val.replace(/[.*+?|()\[\]{}\\]/g,'\\$&');});return '('+markers.join('|')+')?';};var getFormatPositions=function(timeFormat){var finds=timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),orders={h:-1,m:-1,s:-1,l:-1,c:-1,t:-1,z:-1};if(finds){for(var i=0;i<finds.length;i++){if(orders[finds[i].toString().charAt(0)]===-1){orders[finds[i].toString().charAt(0)]=i+1;}}}
return orders;};var regstr='^'+f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){var ml=match.length;switch(match.charAt(0).toLowerCase()){case 'h':return ml===1? '(\\d?\\d)':'(\\d{'+ml+'})';case 'm':return ml===1? '(\\d?\\d)':'(\\d{'+ml+'})';case 's':return ml===1? '(\\d?\\d)':'(\\d{'+ml+'})';case 'l':return '(\\d?\\d?\\d)';case 'c':return '(\\d?\\d?\\d)';case 'z':return '(z|[-+]\\d\\d:?\\d\\d|\\S+)?';case 't':return getPatternAmpm(o.amNames,o.pmNames);default:return '('+match.replace(/\'/g,"").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g,function(m){return "\\"+m;})+')?';}}).replace(/\s/g,'\\s?')+o.timeSuffix+'$',order=getFormatPositions(f),ampm='',treg;treg=s.match(new RegExp(regstr,'i'));var resTime={hour:0,minute:0,second:0,millisec:0,microsec:0};if(treg){if(order.t!==-1){if(treg[order.t]===undefined||treg[order.t].length===0){ampm='';resTime.ampm='';}
else{ampm=$.inArray(treg[order.t].toUpperCase(),o.amNames)!==-1? 'AM':'PM';resTime.ampm=o[ampm==='AM'? 'amNames':'pmNames'][0];}}
if(order.h!==-1){if(ampm==='AM'&&treg[order.h]==='12'){resTime.hour=0;}
else{if(ampm==='PM'&&treg[order.h]!=='12'){resTime.hour=parseInt(treg[order.h],10)+12;}
else{resTime.hour=Number(treg[order.h]);}}}
if(order.m!==-1){resTime.minute=Number(treg[order.m]);}
if(order.s!==-1){resTime.second=Number(treg[order.s]);}
if(order.l!==-1){resTime.millisec=Number(treg[order.l]);}
if(order.c!==-1){resTime.microsec=Number(treg[order.c]);}
if(order.z!==-1&&treg[order.z]!==undefined){resTime.timezone=$.timepicker.timezoneOffsetNumber(treg[order.z]);}
return resTime;}
return false;};var looseParse=function(f,s,o){try{var d=new Date('2012-01-01 '+s);if(isNaN(d.getTime())){d=new Date('2012-01-01T'+s);if(isNaN(d.getTime())){d=new Date('01/01/2012 '+s);if(isNaN(d.getTime())){throw "Unable to parse time with native Date: "+s;}}}
return{hour:d.getHours(),minute:d.getMinutes(),second:d.getSeconds(),millisec:d.getMilliseconds(),microsec:d.getMicroseconds(),timezone:d.getTimezoneOffset()*-1};}
catch(err){try{return strictParse(f,s,o);}
catch(err2){$.timepicker.log("Unable to parse \ntimeString: "+s+"\ntimeFormat: "+f);}}
return false;};if(typeof o.parse==="function"){return o.parse(timeFormat,timeString,o);}
if(o.parse==='loose'){return looseParse(timeFormat,timeString,o);}
return strictParse(timeFormat,timeString,o);};$.datepicker.formatTime=function(format,time,options){options=options||{};options=$.extend({},$.timepicker._defaults,options);time=$.extend({hour:0,minute:0,second:0,millisec:0,microsec:0,timezone:null},time);var tmptime=format,ampmName=options.amNames[0],hour=parseInt(time.hour,10);if(hour>11){ampmName=options.pmNames[0];}
tmptime=tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g,function(match){switch(match){case 'HH':return('0'+hour).slice(-2);case 'H':return hour;case 'hh':return('0'+convert24to12(hour)).slice(-2);case 'h':return convert24to12(hour);case 'mm':return('0'+time.minute).slice(-2);case 'm':return time.minute;case 'ss':return('0'+time.second).slice(-2);case 's':return time.second;case 'l':return('00'+time.millisec).slice(-3);case 'c':return('00'+time.microsec).slice(-3);case 'z':return $.timepicker.timezoneOffsetString(time.timezone===null? options.timezone:time.timezone,false);case 'Z':return $.timepicker.timezoneOffsetString(time.timezone===null? options.timezone:time.timezone,true);case 'T':return ampmName.charAt(0).toUpperCase();case 'TT':return ampmName.toUpperCase();case 't':return ampmName.charAt(0).toLowerCase();case 'tt':return ampmName.toLowerCase();default:return match.replace(/'/g,"");}});return tmptime;};$.datepicker._base_selectDate=$.datepicker._selectDate;$.datepicker._selectDate=function(id,dateStr){var inst=this._getInst($(id)[0]),tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._limitMinMaxDateTime(inst,true);inst.inline=inst.stay_open=true;this._base_selectDate(id,dateStr);inst.inline=inst.stay_open=false;this._notifyChange(inst);this._updateDatepicker(inst);}
else{this._base_selectDate(id,dateStr);}};$.datepicker._base_updateDatepicker=$.datepicker._updateDatepicker;$.datepicker._updateDatepicker=function(inst){var input=inst.input[0];if($.datepicker._curInst&&$.datepicker._curInst!==inst&&$.datepicker._datepickerShowing&&$.datepicker._lastInput!==input){return;}
if(typeof(inst.stay_open)!=='boolean'||inst.stay_open===false){this._base_updateDatepicker(inst);var tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._addTimePicker(inst);}}};$.datepicker._base_doKeyPress=$.datepicker._doKeyPress;$.datepicker._doKeyPress=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if($.datepicker._get(inst,'constrainInput')){var ampm=tp_inst.support.ampm,tz=tp_inst._defaults.showTimezone!==null? tp_inst._defaults.showTimezone:tp_inst.support.timezone,dateChars=$.datepicker._possibleChars($.datepicker._get(inst,'dateFormat')),datetimeChars=tp_inst._defaults.timeFormat.toString().replace(/[hms]/g,'').replace(/TT/g,ampm? 'APM':'').replace(/Tt/g,ampm? 'AaPpMm':'').replace(/tT/g,ampm? 'AaPpMm':'').replace(/T/g,ampm? 'AP':'').replace(/tt/g,ampm? 'apm':'').replace(/t/g,ampm? 'ap':'')+" "+tp_inst._defaults.separator+tp_inst._defaults.timeSuffix+(tz? tp_inst._defaults.timezoneList.join(''):'')+(tp_inst._defaults.amNames.join(''))+(tp_inst._defaults.pmNames.join(''))+dateChars,chr=String.fromCharCode(event.charCode===undefined? event.keyCode:event.charCode);return event.ctrlKey||(chr<' '||!dateChars||datetimeChars.indexOf(chr)>-1);}}
return $.datepicker._base_doKeyPress(event);};$.datepicker._base_updateAlternate=$.datepicker._updateAlternate;$.datepicker._updateAlternate=function(inst){var tp_inst=this._get(inst,'timepicker');if(tp_inst){var altField=tp_inst._defaults.altField;if(altField){var altFormat=tp_inst._defaults.altFormat||tp_inst._defaults.dateFormat,date=this._getDate(inst),formatCfg=$.datepicker._getFormatConfig(inst),altFormattedDateTime='',altSeparator=tp_inst._defaults.altSeparator? tp_inst._defaults.altSeparator:tp_inst._defaults.separator,altTimeSuffix=tp_inst._defaults.altTimeSuffix? tp_inst._defaults.altTimeSuffix:tp_inst._defaults.timeSuffix,altTimeFormat=tp_inst._defaults.altTimeFormat!==null? tp_inst._defaults.altTimeFormat:tp_inst._defaults.timeFormat;altFormattedDateTime+=$.datepicker.formatTime(altTimeFormat,tp_inst,tp_inst._defaults)+altTimeSuffix;if(!tp_inst._defaults.timeOnly&&!tp_inst._defaults.altFieldTimeOnly&&date!==null){if(tp_inst._defaults.altFormat){altFormattedDateTime=$.datepicker.formatDate(tp_inst._defaults.altFormat,date,formatCfg)+altSeparator+altFormattedDateTime;}
else{altFormattedDateTime=tp_inst.formattedDate+altSeparator+altFormattedDateTime;}}
$(altField).val(altFormattedDateTime);}}
else{$.datepicker._base_updateAlternate(inst);}};$.datepicker._base_doKeyUp=$.datepicker._doKeyUp;$.datepicker._doKeyUp=function(event){var inst=$.datepicker._getInst(event.target),tp_inst=$.datepicker._get(inst,'timepicker');if(tp_inst){if(tp_inst._defaults.timeOnly&&(inst.input.val()!==inst.lastVal)){try{$.datepicker._updateDatepicker(inst);}
catch(err){$.timepicker.log(err);}}}
return $.datepicker._base_doKeyUp(event);};$.datepicker._base_gotoToday=$.datepicker._gotoToday;$.datepicker._gotoToday=function(id){var inst=this._getInst($(id)[0]),$dp=inst.dpDiv;this._base_gotoToday(id);var tp_inst=this._get(inst,'timepicker');selectLocalTimezone(tp_inst);var now=new Date();this._setTime(inst,now);$('.ui-datepicker-today',$dp).click();};$.datepicker._disableTimepickerDatepicker=function(target){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){inst.settings.showTimepicker=false;tp_inst._defaults.showTimepicker=false;tp_inst._updateDateTime(inst);}};$.datepicker._enableTimepickerDatepicker=function(target){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');$(target).datepicker('getDate');if(tp_inst){inst.settings.showTimepicker=true;tp_inst._defaults.showTimepicker=true;tp_inst._addTimePicker(inst);tp_inst._updateDateTime(inst);}};$.datepicker._setTime=function(inst,date){var tp_inst=this._get(inst,'timepicker');if(tp_inst){var defaults=tp_inst._defaults;tp_inst.hour=date? date.getHours():defaults.hour;tp_inst.minute=date? date.getMinutes():defaults.minute;tp_inst.second=date? date.getSeconds():defaults.second;tp_inst.millisec=date? date.getMilliseconds():defaults.millisec;tp_inst.microsec=date? date.getMicroseconds():defaults.microsec;tp_inst._limitMinMaxDateTime(inst,true);tp_inst._onTimeChange();tp_inst._updateDateTime(inst);}};$.datepicker._setTimeDatepicker=function(target,date,withDate){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){this._setDateFromField(inst);var tp_date;if(date){if(typeof date==="string"){tp_inst._parseTime(date,withDate);tp_date=new Date();tp_date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);tp_date.setMicroseconds(tp_inst.microsec);}
else{tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());}
if(tp_date.toString()==='Invalid Date'){tp_date=undefined;}
this._setTime(inst,tp_date);}}};$.datepicker._base_setDateDatepicker=$.datepicker._setDateDatepicker;$.datepicker._setDateDatepicker=function(target,date){var inst=this._getInst(target);if(!inst){return;}
if(typeof(date)==='string'){date=new Date(date);if(!date.getTime()){$.timepicker.log("Error creating Date object from string.");}}
var tp_inst=this._get(inst,'timepicker');var tp_date;if(date instanceof Date){tp_date=new Date(date.getTime());tp_date.setMicroseconds(date.getMicroseconds());}
else{tp_date=date;}
if(tp_inst&&tp_date){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=tp_date.getTimezoneOffset()*-1;}
date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);tp_date=$.timepicker.timezoneAdjust(tp_date,tp_inst.timezone);}
this._updateDatepicker(inst);this._base_setDateDatepicker.apply(this,arguments);this._setTimeDatepicker(target,tp_date,true);};$.datepicker._base_getDateDatepicker=$.datepicker._getDateDatepicker;$.datepicker._getDateDatepicker=function(target,noDefault){var inst=this._getInst(target);if(!inst){return;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){if(inst.lastVal===undefined){this._setDateFromField(inst,noDefault);}
var date=this._getDate(inst);if(date&&tp_inst._parseTime($(target).val(),tp_inst.timeOnly)){date.setHours(tp_inst.hour,tp_inst.minute,tp_inst.second,tp_inst.millisec);date.setMicroseconds(tp_inst.microsec);if(tp_inst.timezone!=null){if(!tp_inst.support.timezone&&tp_inst._defaults.timezone===null){tp_inst.timezone=date.getTimezoneOffset()*-1;}
date=$.timepicker.timezoneAdjust(date,tp_inst.timezone);}}
return date;}
return this._base_getDateDatepicker(target,noDefault);};$.datepicker._base_parseDate=$.datepicker.parseDate;$.datepicker.parseDate=function(format,value,settings){var date;try{date=this._base_parseDate(format,value,settings);}
catch(err){if(err.indexOf(":")>=0){date=this._base_parseDate(format,value.substring(0,value.length-(err.length-err.indexOf(':')-2)),settings);$.timepicker.log("Error parsing the date string: "+err+"\ndate string = "+value+"\ndate format = "+format);}
else{throw err;}}
return date;};$.datepicker._base_formatDate=$.datepicker._formatDate;$.datepicker._formatDate=function(inst,day,month,year){var tp_inst=this._get(inst,'timepicker');if(tp_inst){tp_inst._updateDateTime(inst);return tp_inst.$input.val();}
return this._base_formatDate(inst);};$.datepicker._base_optionDatepicker=$.datepicker._optionDatepicker;$.datepicker._optionDatepicker=function(target,name,value){var inst=this._getInst(target),name_clone;if(!inst){return null;}
var tp_inst=this._get(inst,'timepicker');if(tp_inst){var min=null,max=null,onselect=null,overrides=tp_inst._defaults.evnts,fns={},prop;if(typeof name==='string'){if(name==='minDate'||name==='minDateTime'){min=value;}
else if(name==='maxDate'||name==='maxDateTime'){max=value;}
else if(name==='onSelect'){onselect=value;}
else if(overrides.hasOwnProperty(name)){if(typeof(value)==='undefined'){return overrides[name];}
fns[name]=value;name_clone={};}}
else if(typeof name==='object'){if(name.minDate){min=name.minDate;}
else if(name.minDateTime){min=name.minDateTime;}
else if(name.maxDate){max=name.maxDate;}
else if(name.maxDateTime){max=name.maxDateTime;}
for(prop in overrides){if(overrides.hasOwnProperty(prop)&&name[prop]){fns[prop]=name[prop];}}}
for(prop in fns){if(fns.hasOwnProperty(prop)){overrides[prop]=fns[prop];if(!name_clone){name_clone=$.extend({},name);}
delete name_clone[prop];}}
if(name_clone&&isEmptyObject(name_clone)){return;}
if(min){if(min===0){min=new Date();}
else{min=new Date(min);}
tp_inst._defaults.minDate=min;tp_inst._defaults.minDateTime=min;}
else if(max){if(max===0){max=new Date();}
else{max=new Date(max);}
tp_inst._defaults.maxDate=max;tp_inst._defaults.maxDateTime=max;}
else if(onselect){tp_inst._defaults.onSelect=onselect;}}
if(value===undefined){return this._base_optionDatepicker.call($.datepicker,target,name);}
return this._base_optionDatepicker.call($.datepicker,target,name_clone||name,value);};var isEmptyObject=function(obj){var prop;for(prop in obj){if(obj.hasOwnProperty(prop)){return false;}}
return true;};var extendRemove=function(target,props){$.extend(target,props);for(var name in props){if(props[name]===null||props[name]===undefined){target[name]=props[name];}}
return target;};var detectSupport=function(timeFormat){var tf=timeFormat.replace(/'.*?'/g,'').toLowerCase(),isIn=function(f,t){return f.indexOf(t)!==-1? true:false;};return{hour:isIn(tf,'h'),minute:isIn(tf,'m'),second:isIn(tf,'s'),millisec:isIn(tf,'l'),microsec:isIn(tf,'c'),timezone:isIn(tf,'z'),ampm:isIn(tf,'t')&&isIn(timeFormat,'h'),iso8601:isIn(timeFormat,'Z')};};var convert24to12=function(hour){hour%=12;if(hour===0){hour=12;}
return String(hour);};var computeEffectiveSetting=function(settings,property){return settings&&settings[property]? settings[property]:$.timepicker._defaults[property];};var splitDateTime=function(dateTimeString,timeSettings){var separator=computeEffectiveSetting(timeSettings,'separator'),format=computeEffectiveSetting(timeSettings,'timeFormat'),timeParts=format.split(separator),timePartsLen=timeParts.length,allParts=dateTimeString.split(separator),allPartsLen=allParts.length;if(allPartsLen>1){return{dateString:allParts.splice(0,allPartsLen-timePartsLen).join(separator),timeString:allParts.splice(0,timePartsLen).join(separator)};}
return{dateString:dateTimeString,timeString:''};};var parseDateTimeInternal=function(dateFormat,timeFormat,dateTimeString,dateSettings,timeSettings){var date,parts,parsedTime;parts=splitDateTime(dateTimeString,timeSettings);date=$.datepicker._base_parseDate(dateFormat,parts.dateString,dateSettings);if(parts.timeString===''){return{date:date};}
parsedTime=$.datepicker.parseTime(timeFormat,parts.timeString,timeSettings);if(!parsedTime){throw 'Wrong time format';}
return{date:date,timeObj:parsedTime};};var selectLocalTimezone=function(tp_inst,date){if(tp_inst&&tp_inst.timezone_select){var now=date||new Date();tp_inst.timezone_select.val(-now.getTimezoneOffset());}};$.timepicker=new Timepicker();$.timepicker.timezoneOffsetString=function(tzMinutes,iso8601){if(isNaN(tzMinutes)||tzMinutes>840||tzMinutes<-720){return tzMinutes;}
var off=tzMinutes,minutes=off%60,hours=(off-minutes)/60,iso=iso8601? ':':'',tz=(off>=0? '+':'-')+('0'+Math.abs(hours)).slice(-2)+iso+('0'+Math.abs(minutes)).slice(-2);if(tz==='+00:00'){return 'Z';}
return tz;};$.timepicker.timezoneOffsetNumber=function(tzString){var normalized=tzString.toString().replace(':','');if(normalized.toUpperCase()==='Z'){return 0;}
if(!/^(\-|\+)\d{4}$/.test(normalized)){return tzString;}
return((normalized.substr(0,1)==='-'?-1:1)*((parseInt(normalized.substr(1,2),10)*60)+parseInt(normalized.substr(3,2),10)));};$.timepicker.timezoneAdjust=function(date,toTimezone){var toTz=$.timepicker.timezoneOffsetNumber(toTimezone);if(!isNaN(toTz)){date.setMinutes(date.getMinutes()+-date.getTimezoneOffset()-toTz);}
return date;};$.timepicker.timeRange=function(startTime,endTime,options){return $.timepicker.handleRange('timepicker',startTime,endTime,options);};$.timepicker.datetimeRange=function(startTime,endTime,options){$.timepicker.handleRange('datetimepicker',startTime,endTime,options);};$.timepicker.dateRange=function(startTime,endTime,options){$.timepicker.handleRange('datepicker',startTime,endTime,options);};$.timepicker.handleRange=function(method,startTime,endTime,options){options=$.extend({},{minInterval:0,maxInterval:0,start:{},end:{}},options);function checkDates(changed,other){var startdt=startTime[method]('getDate'),enddt=endTime[method]('getDate'),changeddt=changed[method]('getDate');if(startdt!==null){var minDate=new Date(startdt.getTime()),maxDate=new Date(startdt.getTime());minDate.setMilliseconds(minDate.getMilliseconds()+options.minInterval);maxDate.setMilliseconds(maxDate.getMilliseconds()+options.maxInterval);if(options.minInterval>0&&minDate>enddt){endTime[method]('setDate',minDate);}
else if(options.maxInterval>0&&maxDate<enddt){endTime[method]('setDate',maxDate);}
else if(startdt>enddt){other[method]('setDate',changeddt);}}}
function selected(changed,other,option){if(!changed.val()){return;}
var date=changed[method].call(changed,'getDate');if(date!==null&&options.minInterval>0){if(option==='minDate'){date.setMilliseconds(date.getMilliseconds()+options.minInterval);}
if(option==='maxDate'){date.setMilliseconds(date.getMilliseconds()-options.minInterval);}}
if(date.getTime){other[method].call(other,'option',option,date);}}
$.fn[method].call(startTime,$.extend({onClose:function(dateText,inst){checkDates($(this),endTime);},onSelect:function(selectedDateTime){selected($(this),endTime,'minDate');}},options,options.start));$.fn[method].call(endTime,$.extend({onClose:function(dateText,inst){checkDates($(this),startTime);},onSelect:function(selectedDateTime){selected($(this),startTime,'maxDate');}},options,options.end));checkDates(startTime,endTime);selected(startTime,endTime,'minDate');selected(endTime,startTime,'maxDate');return $([startTime.get(0),endTime.get(0)]);};$.timepicker.log=function(err){if(window.console){window.console.log(err);}};$.timepicker._util={_extendRemove:extendRemove,_isEmptyObject:isEmptyObject,_convert24to12:convert24to12,_detectSupport:detectSupport,_selectLocalTimezone:selectLocalTimezone,_computeEffectiveSetting:computeEffectiveSetting,_splitDateTime:splitDateTime,_parseDateTimeInternal:parseDateTimeInternal};if(!Date.prototype.getMicroseconds){Date.prototype.microseconds=0;Date.prototype.getMicroseconds=function(){return this.microseconds;};Date.prototype.setMicroseconds=function(m){this.setMilliseconds(this.getMilliseconds()+Math.floor(m/1000));this.microseconds=m%1000;return this;};}
$.timepicker.version="@@version";})(jQuery);
