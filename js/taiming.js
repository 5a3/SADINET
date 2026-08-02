'use strict';window.JOAAN_PROVISION=Object.freeze(JSON.parse(decodeURIComponent(escape(atob('eyJuZXR3b3JrS2V5Ijoic2FkZV8xMCIsIm5ldHdvcmtOYW1lIjoi2LPYudiv2Yog2YbYqiIsInBsYW4iOiJmdWxsIiwicGxhbkxhYmVsIjoi2KjYqyDZhdio2KfYtNixINmI2KfYs9iq2LHYp9it2Kkg2YjYo9mG2YXZiiDZiNmC2YbZiNin2KoiLCJwZXJtaXNzaW9ucyI6eyJyZXN0Ijp0cnVlLCJsaXZlIjp0cnVlLCJjaGFubmVscyI6dHJ1ZSwiYW5pbWUiOnRydWV9LCJhcHBEb3dubG9hZFVybCI6Imh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9BbGlCaW5TaGVoYWIvRm9udHMvbWFpbi9zYWRlXzEwLmFwayIsImFwcFBhY2thZ2VJZCI6ImNvbS5qb2Fhbi5wbGF5ZXIubjMyMTQ4MTZhMmYzMmUzN2IiLCJwYW5lbEFwaSI6Imh0dHBzOi8vcGFuZWwuam9hYW50di53b3JrZXJzLmRldiJ9')))));window.JOAAN_APP_DOWNLOAD_URL=window.JOAAN_PROVISION.appDownloadUrl;window.MIKROTIK_NETWORK_KEY=window.JOAAN_PROVISION.networkKey;if(navigator.userAgent.indexOf('JoaanApp/')!==-1){document.documentElement.classList.add('joaan-app-webview');document.addEventListener('click',function(event){var link=event.target&&event.target.closest?event.target.closest('a[target]'):null;if(link)link.removeAttribute('target');},true);window.open=function(url){if(url)window.location.href=String(url);return window;};}
'use strict';const SAFE_STORAGE=(()=>{const mem={};try{const s=window.localStorage;const k='__estra7h_storage_test__';s.setItem(k,'1');s.removeItem(k);return s;}catch(_){return{getItem:k=>Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null,setItem:(k,v)=>{mem[k]=String(v);},removeItem:k=>{delete mem[k];},clear:()=>{Object.keys(mem).forEach(k=>delete mem[k]);}};}})();const SAFE_SESSION_STORAGE=(()=>{const mem={};try{const s=window.sessionStorage;const k='__estra7h_session_test__';s.setItem(k,'1');s.removeItem(k);return s;}catch(_){return{getItem:k=>Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null,setItem:(k,v)=>{mem[k]=String(v);},removeItem:k=>{delete mem[k];},clear:()=>{Object.keys(mem).forEach(k=>delete mem[k]);}};}})();const CONFIG={API:'',OSCAR_API:'https://os-tv.joaantv.workers.dev/api/private/call',OSCAR_KEY:'',PANEL_API:"https://panel.joaantv.workers.dev",NETWORK_KEY:"sade_10",FALLBACK_POSTER:'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="100%" height="100%" fill="#22222e"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#a0a0b0" font-family="Arial" font-size="24">برق نت</text></svg>')};(function resolveRuntimeNetworkKey(){try{const params=new URLSearchParams(window.location.search||'');const runtimeKey=params.get('network')||params.get('net')||params.get('network_key')||window.MIKROTIK_NETWORK_KEY||SAFE_STORAGE.getItem('estra7h_network_key')||CONFIG.NETWORK_KEY;CONFIG.NETWORK_KEY=String(runtimeKey||CONFIG.NETWORK_KEY||'').trim();}catch(_){}})();let CATEGORIES=[];const state={currentItem:null,currentDetails:null,grid:{mode:'home',key:'',title:'',page:1},episodeOrder:'desc',gridItems:[],cardView:SAFE_STORAGE.getItem('cardView')||'normal',homeMode:'live',restContentReady:false,liveContentReady:false,animeContentReady:false};let panelPayload=null;let panelConfig=null;let panelSubscription=null;let panelPermissions=null;const $=(selector,root=document)=>root.querySelector(selector);const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));function _a(tag,options={}){const el=document.createElement(tag);if(options.className)el.className=options.className;if(options.text!==undefined)el.textContent=options.text;if(options.html!==undefined)el.innerHTML=options.html;if(options.attrs){Object.entries(options.attrs).forEach(([key,value])=>{if(value!==undefined&&value!==null)el.setAttribute(key,String(value));});}return el;}function _b2(url){if(!url||typeof url!=='string')return'';try{const parsed=new URL(url,location.href);return['http:','https:','data:'].includes(parsed.protocol)?parsed.href:'';}catch{return'';}}function _Z(url){if(!url||typeof url!=='string')return'';const value=url.trim();if(!value)return'';if(/^javascript:/i.test(value))return'';try{const parsed=new URL(value,location.href);if(['http:','https:'].includes(parsed.protocol))return parsed.href;if(/^[a-z][a-z0-9+.-]*:$/i.test(parsed.protocol))return value;return'';}catch{return/^[a-z][a-z0-9+.-]*:/i.test(value)?value:'';}}function _N(url){const cleanUrl=_Z(url);if(!cleanUrl)return false;if(/^https?:/i.test(cleanUrl)){window.open(cleanUrl,'_blank','noopener');}else{window.location.href=cleanUrl;}return true;}function _c(value=''){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}function _az(url){return _b2(url)||CONFIG.FALLBACK_POSTER;}function _cl(data){if(Array.isArray(data))return data;if(!data||typeof data!=='object')return[];for(const key of['items','results','posts','movies']){if(Array.isArray(data[key]))return data[key];}return[];}function _ct(title=''){const match=String(title).match(/\(\s*(\d{4})\s*\)|\b(19\d{2}|20\d{2})\b/);return match?(match[1]||match[2]):'';}function _O(title=''){const match=String(title).match(/(?:الحلقة|حلقة|Episode|Ep|E)\s*(\d+)/i);return match?match[1]:'';}function _titleClean(title=''){let value=String(title||'').trim();if(!value)return'بدون عنوان';const seasonMap={'الاول':'1','الأول':'1','اول':'1','الأولى':'1','الثاني':'2','الثانية':'2','الثالث':'3','الثالثة':'3','الرابع':'4','الرابعة':'4','الخامس':'5','الخامسة':'5','السادس':'6','السادسة':'6','السابع':'7','السابعة':'7','الثامن':'8','الثامنة':'8','التاسع':'9','التاسعة':'9','العاشر':'10','العاشرة':'10'};value=value.replace(/[ـ]+/g,'').replace(/\s+/g,' ').trim();value=value.replace(/^(?:مسلسل|فيلم|انمي|أنمي|كرتون)\s+/,'');value=value.replace(/الموسم\s+(الاول|الأول|اول|الأولى|الثاني|الثانية|الثالث|الثالثة|الرابع|الرابعة|الخامس|الخامسة|السادس|السادسة|السابع|السابعة|الثامن|الثامنة|التاسع|التاسعة|العاشر|العاشرة|\d+)/gi,(m,s)=>`موسم ${seasonMap[String(s).trim()]||s}`);const o='(?:الاولى|الأولى|الأول|الاول|الثاني|الثانية|الثالث|الثالثة|الرابع|الرابعة|الخامس|الخامسة|السادس|السادسة|السابع|السابعة|الثامن|الثامنة|التاسع|التاسعة|العاشر|العاشرة|الحادي|الحادية|عشر|عشرة|العشرون|والعشرون|الثلاثون|والثلاثون|الأربعون|والأربعون|الاربعون|والاربعون|الخمسون|والخمسون|الستون|والستون|السبعون|والسبعون|الثمانون|والثمانون|التسعون|والتسعون)';value=value.replace(new RegExp('الحلقة\\s+(\\d{1,4})(?:\\s+('+o+'(?:\\s+'+o+'){0,2}))(?=\\s|$)','gi'),(m,n)=>'الحلقة '+n);value=value.replace(/\s*[-–—|]+\s*/g,' - ').replace(/\s+/g,' ').trim();return value||'بدون عنوان';}function _vodUrl(url,mode='raw'){const original=String(url||'').trim();if(!original)return'';const flag=mode==='browser_player'?'player':(mode==='download'?'download':'raw');let inner='';try{const u=new URL(original,location.href);if(/^(watch|play)\.modyleech\.workers\.dev$/i.test(u.hostname)){inner=u.searchParams.get('url')||'';}else{inner=u.href;}}catch{inner=original.replace(/^https?:\/\/watch\.modyleech\.workers\.dev\/\?url=/i,'').replace(/^https?:\/\/play\.modyleech\.workers\.dev\/\?url=/i,'');}inner=String(inner||original).replace(/&(raw|player|download)=true(?:&|$)/g,'').replace(/\?(raw|player|download)=true(?:&|$)/g,'');return`https://play.modyleech.workers.dev/?url=${inner}&${flag}=true`;}function _fileExtFromUrl(url=''){try{const u=new URL(url,location.href);const inner=u.searchParams.get('url')||u.pathname;const m=String(inner).split('?')[0].match(/\.([a-z0-9]{2,6})$/i);return m?m[1].toLowerCase():'mp4';}catch{const m=String(url).split('?')[0].match(/\.([a-z0-9]{2,6})$/i);return m?m[1].toLowerCase():'mp4';}}function _mediaTitle(item={},source={},fallback='مشاهدة'){let title=_titleClean(item.title||state.currentDetails?.title||state.currentItem?.title||fallback),ep=item.episode||_O(title),label=String(source.label||source.server||source.title||'').trim(),quality=String(source.quality||'').trim(),m;if(ep&&!new RegExp(`الحلقة\\s*${ep}`).test(title))title+=` - الحلقة ${ep}`;if(!quality&&(m=label.match(/(?:\d{3,4}p|4k|uhd|fhd|hd|sd)/i)))quality=m[0];if(/^\d+$/.test(quality))quality+='P';else quality=quality.toUpperCase();let server=String(source.server||label).replace(/(?:\d{3,4}p|4k|uhd|fhd|hd|sd)/ig,'').replace(/^[\s\-–—|]+|[\s\-–—|]+$/g,'').trim();if(!server||server==='رئيسي')server='سيرفر رئيسي';return[title,server,quality].filter(Boolean).join(' - ')}function _fileName(historyItem={},source={},fallbackTitle='video'){let title=_mediaTitle(historyItem,source,fallbackTitle).replace(/[\/:*?"<>|]+/g,' ').replace(/\s+/g,' ').trim()||'video';return`${title}.${_fileExtFromUrl(source.url||source.originalUrl||'')}`;}function _withFileName(url,filename){const safe=String(filename||'video.mp4').trim()||'video.mp4';try{const u=new URL(url,location.href);u.searchParams.set('filename',safe);return u.href;}catch{const sep=String(url).includes('?')?'&':'?';return`${url}${sep}filename=${encodeURIComponent(safe)}`;}}function _admIntentUrl(videoUrl,filename){const safeUrl=String(videoUrl||'');const safeName=String(filename||'video.mp4').trim()||'video.mp4';let scheme='https';let data='download';try{const u=new URL(safeUrl,location.href);scheme=(u.protocol||'https:').replace(':','')||'https';data=u.href.replace(/^https?:\/\//i,'');}catch{data=safeUrl.replace(/^https?:\/\//i,'');}data=data.replace(/#/g,'%23');const eUrl=encodeURIComponent(safeUrl);const eName=encodeURIComponent(safeName);return`intent://${data}#Intent;scheme=${scheme};action=android.intent.action.VIEW;type=video/*;package=com.dv.adm;component=com.dv.adm/.AEditor;S.android.intent.extra.TEXT=${eUrl};S.uri=${eUrl};S.com.android.extra.filename=${eName};S.song=${eName};S.title=${eName};S.android.intent.extra.TITLE=${eName};S.android.intent.extra.SUBJECT=${eName};end`;}function _openAdmDownload(videoUrl,filename){let opened=false;let timer=null;const markOpened=()=>{opened=true;if(timer)clearTimeout(timer);cleanup();};const onVisibility=()=>{if(document.hidden)markOpened();};const cleanup=()=>{window.removeEventListener('pagehide',markOpened);window.removeEventListener('blur',markOpened);document.removeEventListener('visibilitychange',onVisibility);};window.addEventListener('pagehide',markOpened,{once:true});window.addEventListener('blur',markOpened,{once:true});document.addEventListener('visibilitychange',onVisibility);try{window.location.href=_admIntentUrl(videoUrl,filename);}catch{}timer=setTimeout(()=>{cleanup();if(!opened&&!document.hidden)_bF('ADM',_bE(),'حمل تطبيق ADM الآن لاستكمال عملية التحميل، ثم عد للعمل واختر التحميل من جديد.');},3000);}function _restAppDownloadUrl(){return _b6().restAppDownloadUrl||_b6().estra7hAppDownloadUrl||window.JOAAN_APP_DOWNLOAD_URL||'';}function _restAppSourceUrl(source){const label=String(source?.label||source?.title||source?.quality||'').replace(/\s+/g,' ').trim();const isDirectB2=/سيرفر\s*مباشر\s*B2/i.test(label);const candidates=[source?.originalUrl,source?.url,typeof source==='string'?source:''].map(value=>String(value||'').trim()).filter(Boolean);if(!candidates.length)return'';if(isDirectB2){for(const value of candidates){try{const parsed=new URL(value,location.href);if(/^(?:play|watch)\.modyleech\.workers\.dev$/i.test(parsed.hostname)){const direct=String(parsed.searchParams.get('url')||'').trim();if(direct)return direct;}else{return parsed.href;}}catch(_){if(value)return value;}}return'';}const value=candidates[0];try{const parsed=new URL(value,location.href);if(/^(?:play|watch)\.modyleech\.workers\.dev$/i.test(parsed.hostname))return value;}catch(_){}return _vodUrl(value,'raw');}function _restAppItemsUrl(title='مشاهدة',sources=[]){const cleanTitle=String(title||'مشاهدة').trim()||'مشاهدة';const sourceList=Array.isArray(sources)?sources:(sources&&typeof sources==='object'?[sources]:[]);const items=sourceList.map((source,index)=>{const label=String(source.label||source.quality||source.title||`جودة ${index+1}`).trim()||`جودة ${index+1}`;const url=String(source.url||source.originalUrl||'').trim();return url?{title:label,url}:null;}).filter(Boolean);const links=_b6();const template=links.restAppItemsDeepLink||links.joaanAppItemsDeepLink||'';const encodedItems=encodeURIComponent(JSON.stringify(items));const encodedTitle=encodeURIComponent(cleanTitle);if(template){return String(template).replace(/\{items\}/g,encodedItems).replace(/\{title\}/g,encodedTitle);}return`joaantv://play?items=${encodedItems}&title=${encodedTitle}`;}function _matchAppDownloadUrl(){return _b6().matchAppDownloadUrl||_b6().liveAppDownloadUrl||_b6().restAppDownloadUrl||window.JOAAN_APP_DOWNLOAD_URL||'';}function _showAppChecking(appName){$('#qo').classList.add('show');$('#qm').textContent='جاري فحص التطبيق';const list=$('#qx');list.textContent='';const box=_a('div',{className:'xaR'});const icon=_a('div',{className:'xcJ'});const spinIcon=_a('span',{className:'icon',text:'sync'});spinIcon.style.animation='spin 1s linear infinite';icon.appendChild(spinIcon);box.append(icon,_a('h3',{text:`جاري فتح ${appName||'تطبيق المشاهدة'}`}),_a('p',{text:'نحاول الآن التأكد من وجود التطبيق وتشغيل البث. إذا كان التطبيق مثبتًا سيفتح خلال لحظات، وإذا لم يكن مثبتًا ستظهر لك نافذة التحميل.'}));list.appendChild(box);}function _showAppMissing(appName,installUrl,message){$('#qo').classList.add('show');$('#qm').textContent='التطبيق غير مثبت';const list=$('#qx');list.textContent='';const box=_a('div',{className:'xaR'});const icon=_a('div',{className:'xcJ'});icon.appendChild(_a('span',{className:'icon',text:'warning'}));box.append(icon,_a('h3',{text:`${appName} غير مثبت`}),_a('p',{text:message||`قم بتحميل ${appName} الآن ثم عد وحاول من جديد.`}));const actions=_a('div',{className:'xcj'});const install=_a('a',{className:'xcU',attrs:{href:installUrl||'#',target:'_blank',rel:'noopener'}});install.append(_a('span',{className:'icon',text:'download'}),document.createTextNode('حمل التطبيق الآن'));if(!installUrl){install.addEventListener('click',event=>{event.preventDefault();_D('رابط تحميل التطبيق غير مضاف حالياً','info');});}const close=_a('button',{className:'xcD',text:'إغلاق',attrs:{type:'button'}});close.addEventListener('click',_R);actions.append(install,close);box.appendChild(actions);list.appendChild(box);}function _openAppLink(appUrl,appName,installUrl,message){let opened=false;let timer=null;_showAppChecking(appName||'تطبيق المشاهدة');const markOpened=()=>{opened=true;if(timer)clearTimeout(timer);cleanup();const dialog=document.getElementById('qo');if(dialog)dialog.classList.remove('show');};const onVisibility=()=>{if(document.hidden)markOpened();};const cleanup=()=>{window.removeEventListener('pagehide',markOpened);window.removeEventListener('blur',markOpened);document.removeEventListener('visibilitychange',onVisibility);};window.addEventListener('pagehide',markOpened,{once:true});window.addEventListener('blur',markOpened,{once:true});document.addEventListener('visibilitychange',onVisibility);try{window.location.href=appUrl;}catch{}timer=setTimeout(()=>{cleanup();if(!opened&&!document.hidden)_showAppMissing(appName,installUrl,message);},3000);}function _l(item={}){const rawTitle=item.name||item.title||'بدون عنوان';const title=_titleClean(rawTitle);return{title,rawTitle,poster:item.image||item.poster||item.img||item.poster_url||'',url:item.url||item.link||'',rating:item.rating||'',quality:item.quality||'',type:item.type||'',year:item.year||_ct(rawTitle),episode:item.episode||_O(rawTitle),watchUrl:item.watchUrl||'',raw:item};}function _bR(data={}){const d=data.details||data||{};return{title:_titleClean(d.title||'بدون عنوان'),rawTitle:d.title||'بدون عنوان',poster:d.poster||'',trailer:d.trailer||'',rating:d.rating||'',likes:d.likes||0,plot:d.plot||d.story||'لا تتوفر قصة لهذا العمل.',category:d.category||'',type:d.type||'',duration:d.duration||'',year:d.year||'',quality:d.quality||'',country:d.country||'',addedAt:d.added_at||'',watchUrl:d.watch_url||'',team:Array.isArray(d.team)?d.team:[],episodes:Array.isArray(d.episodes)?d.episodes:[],raw:d};}function _a6(){const base=String(CONFIG.API||'').trim().replace(/\/+$/,'');if(!base){throw new Error('content_api_missing');}return base;}async function _cD(endpoint){const base=_a6();const response=await fetch(`${base}${endpoint}`,{cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();}async function _bA(endpoint){const data=await _cD(endpoint);return _cl(data).map(_l);}async function _a7(itemUrl){if(!itemUrl)throw new Error('رابط التفاصيل غير موجود');const data=await _cD(`/details?url=${encodeURIComponent(itemUrl)}`);return _bR(data);}async function _bB(watchUrl){if(!watchUrl)throw new Error('لا يوجد رابط مشاهدة');const data=await _cD(`/watch?url=${encodeURIComponent(watchUrl)}`,{cache:false});const raw=Array.isArray(data.watch_url)?data.watch_url[0]:data.watch_url;if(!raw||typeof raw!=='object')return[];return Object.entries(raw).filter(([,url])=>Boolean(url)).map(([quality,url])=>({quality,label:`${quality}p`,url:_b2(url),originalUrl:_b2(url)})).filter(source=>source.url).sort((a,b)=>_aE().qualitySort==='asc'?Number(a.quality)-Number(b.quality):Number(b.quality)-Number(a.quality));}function _D(message,icon='check_circle'){const stack=$('#qaM');if(!stack)return;const toast=_a('div',{className:'toast'});toast.append(_a('span',{className:'icon',text:icon}),_a('span',{text:message}));stack.appendChild(toast);setTimeout(()=>{toast.style.opacity='0';toast.style.transform='translateY(8px)';},2400);setTimeout(()=>toast.remove(),2800);}function _b5(mode,save=true){state.cardView=['compact','normal','large'].includes(mode)?mode:'normal';document.body.classList.remove('card-view-compact','card-view-normal','card-view-large');document.body.classList.add(`card-view-${state.cardView}`);$$('#qao button').forEach(btn=>btn.classList.toggle('active',btn.dataset.view===state.cardView));if(save)SAFE_STORAGE.setItem('cardView',state.cardView);}function _bg(){return state.gridItems.map(_l);}function _F(){const container=$('#qp');container.textContent='';const items=_bg();if(!items.length){_A(container,'لا توجد نتائج','xaz','search_off');return;}items.forEach(item=>container.appendChild(_bD(item)));}function _bh(configUrl){return new Promise((resolve,reject)=>{const cb=`__estra7hPanelConfig_${Date.now()}_${Math.random().toString(36).slice(2)}`;const sep=configUrl.includes('?')?'&':'?';const src=`${configUrl}${sep}callback=${encodeURIComponent(cb)}`;const script=document.createElement('script');let done=false;let timer=null;function _cu(){done=true;if(timer)window.clearTimeout(timer);try{delete window[cb];}catch(_){window[cb]=undefined;}if(script&&script.parentNode)script.parentNode.removeChild(script);}window[cb]=(data)=>{if(done)return;_cu();resolve(data||{});};script.onerror=()=>{if(done)return;_cu();reject(new Error('jsonp_failed'));};timer=window.setTimeout(()=>{if(done)return;_cu();reject(new Error('jsonp_timeout'));},9000);script.src=src;script.async=true;document.head.appendChild(script);});}function _ai(data,configUrl){if(!data||!data.ok){_ap(false);if(data&&data.reason==='subscription_expired'){_aU(data.message||'يرجى التواصل مع صاحب الشبكة لتجديد الاشتراك حتى تعود الخدمة للعمل.');}else{_at();}return false;}panelPayload=data;panelConfig=data.config||{};panelSubscription=data.subscription||{};panelPermissions=data.permissions||{};_bT(panelConfig,panelSubscription,data.network||{});_aA();return true;}async function _a8(){if(!CONFIG.PANEL_API||!CONFIG.NETWORK_KEY)return true;let controller=null;let timer=null;const configUrl=`${CONFIG.PANEL_API.replace(/\/$/, '')}/api/public/config?network=${encodeURIComponent(CONFIG.NETWORK_KEY)}`;try{controller=new AbortController();timer=window.setTimeout(()=>controller.abort(),14000);const res=await fetch(configUrl,{cache:'no-store',signal:controller.signal,mode:'cors'});if(timer)window.clearTimeout(timer);const data=await res.json();return _ai(data,configUrl);}catch(error){if(timer)window.clearTimeout(timer);console.warn('Panel config fetch unavailable, trying JSONP fallback:',error);try{const data=await _bh(configUrl);return _ai(data,configUrl+'&callback=JSONP');}catch(jsonpError){console.warn('Panel config JSONP unavailable:',jsonpError);panelPayload=null;panelConfig={};panelSubscription={};panelPermissions={rest:false,live:false,matches:false,timer:false,video:false};_ap(false);_at();return false;}}}function _bN(){const raw=String(panelSubscription?.plan||panelPayload?.subscription?.plan||'full').trim();return['rest_only','live_only','full'].includes(raw)?raw:'full';}function _Q(){const plan=_bN();const fromServer=panelPermissions&&typeof panelPermissions==='object'?panelPermissions:{};const fallback={rest:plan!=='live_only',live:plan!=='rest_only',matches:plan!=='rest_only',timer:plan!=='rest_only',video:plan!=='rest_only'};return{rest:fromServer.rest!==undefined?fromServer.rest!==false:fallback.rest,live:fromServer.live!==undefined?fromServer.live!==false:fallback.live,matches:fromServer.matches!==undefined?fromServer.matches!==false:fallback.matches,timer:fromServer.timer!==undefined?fromServer.timer!==false:fallback.timer,video:fromServer.video!==undefined?fromServer.video!==false:fallback.video};}function _aA(){const plan=_bN();document.body.classList.remove('plan-live-only','plan-rest-only','plan-full');if(plan==='live_only')document.body.classList.add('plan-live-only');else if(plan==='rest_only')document.body.classList.add('plan-rest-only');else document.body.classList.add('plan-full');}function _bS(size){if(size==='small')return'compact';if(size==='medium')return'normal';if(size==='large')return'large';return['compact','normal','large'].includes(size)?size:'normal';}function _q(name){return panelConfig&&typeof panelConfig[name]==='object'&&panelConfig[name]?panelConfig[name]:{};}function _aE(){const w=_q('watch');return{showWatchButton:_b(w.showWatchButton,panelConfig?.showWatchButton,true)!==false,showDownloadButton:_b(w.showDownloadButton,panelConfig?.showDownloadButton,true)!==false,enableRestApp:_b(w.enableRestApp,w.enableRestAppWatch,panelConfig?.enableRestApp,true)!==false,enableBrowserWatch:_b(w.enableBrowserWatch,panelConfig?.enableBrowserWatch,true)!==false,enableAdmDownload:_b(w.enableAdmDownload,panelConfig?.enableAdmDownload,true)!==false,enableBrowserDownload:_b(w.enableBrowserDownload,panelConfig?.enableBrowserDownload,true)!==false,qualitySort:_b(w.qualitySort,panelConfig?.qualitySort,'desc')};}function _bT(config={},subscription={},network={}){const contentApiUrl=_b(config.contentApiUrl,config.content_api_url,config.apiUrl,config.api_url,config.content&&config.content.apiUrl,config.content&&config.content.api_url,panelPayload&&panelPayload.contentApiUrl);if(contentApiUrl)CONFIG.API=String(contentApiUrl||'').trim().replace(/\/+$/,'');const siteName=config.siteName||network.name||'برق نت';document.title=siteName;const headerName=$('#qO');if(headerName)headerName.textContent=siteName;const logoUrl=_b2(config.logoUrl||'');const logoBox=document.querySelector('.xbj');if(logoBox&&logoUrl){logoBox.innerHTML=`<img src="${_c(logoUrl)}" alt="${_c(siteName)}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;}const cardView=_bS(config.cardSize||'small');SAFE_STORAGE.setItem('cardView',cardView);if(typeof _b5==='function')_b5(cardView,false);else state.cardView=cardView;if(config.accentColor){document.documentElement.style.setProperty('--accent',config.accentColor);}const remoteCategories=Array.isArray(config.categories)?config.categories:[];if(remoteCategories.length){const mapped=remoteCategories.filter(c=>c.enabled).sort((a,b)=>Number(a.order||0)-Number(b.order||0)).map(c=>({key:c.key,name:c.name||c.key,icon:c.icon||'movie'}));CATEGORIES=mapped;}const brandNodes=[$('#qan h3'),$('.header-right span[style*="font-weight"]')].filter(Boolean);brandNodes.forEach(el=>{el.textContent=siteName;});}function _J(){if(!panelConfig)return;_aA();const perms=_Q();const bottomVisible=perms.rest&&panelConfig.bottomNavEnabled!==false;const bottomNav=$('#qk');if(bottomNav&&!bottomVisible)bottomNav.style.display='none';if(panelConfig.customCss){let custom=document.getElementById('panelCustomCss');if(!custom){custom=document.createElement('style');custom.id='panelCustomCss';document.head.appendChild(custom);}custom.textContent=String(panelConfig.customCss||'');}}function _aN(){const old=$('#remoteNotice');if(old)old.remove();}function _at(){document.body.className='';document.body.innerHTML=`<main class="config-error"><section class="config-error-card"><span class="icon">cloud_off</span><h1>تعذر تحميل الإعدادات</h1><p>تعذر الاتصال مؤقتًا. حدّث الصفحة وحاول مرة أخرى.</p></section></main>`;}function _aU(message){document.body.className='subscription-expired-body';document.body.innerHTML=`<main class="xR"><section class="xe"><div class="xaq"><span class="icon">lock_clock</span></div><span class="xb1">الخدمة متوقفة مؤقتًا</span><h1>انتهى اشتراك الاستراحة</h1><p>${_c(message || 'يرجى التواصل مع صاحب الشبكة لتجديد الاشتراك حتى تعود الخدمة للعمل.')}</p><div class="xba"><span class="icon">support_agent</span><span>بعد التجديد سيتم فتح الاستراحة تلقائيًا عند تحديث الصفحة.</span></div></section></main>`;}function _ap(show){const loader=document.getElementById('qan');if(!loader)return;if(show){loader.style.display='grid';loader.style.opacity='1';return;}loader.style.opacity='0';setTimeout(()=>loader.remove(),220);}function _aj(){const m=_q('maintenance');return{enabled:_b(m.enabled,panelConfig?.maintenanceEnabled,false)===true,title:_b(m.title,panelConfig?.maintenanceTitle,'الاستراحة تحت الصيانة'),message:_b(m.message,panelConfig?.maintenanceMessage,'نعمل حالياً على تجهيز الاستراحة، سنعود قريباً.'),endsAt:_b(m.endsAt,panelConfig?.maintenanceEndsAt,'')};}function _a9(cfg){const safeCfg=cfg||_aj();document.documentElement.classList.add('maintenance-mode-html');document.body.classList.add('maintenance-mode-body');document.body.innerHTML=`<main class="xaF"><section class="xm"><div class="xcc"><span class="icon">construction</span></div><h1>${_c(safeCfg.title)}</h1><p>${_c(safeCfg.message)}</p><div class="xK" dir="rtl"><div class="xE"><span class="icon">timer</span><span>الوقت المتبقي</span></div><div class="xt" id="maintenanceCountdown"><div class="xP"><strong id="mDays">00</strong><span>أيام</span></div><div class="xP"><strong id="qaV">00</strong><span>ساعات</span></div><div class="xP"><strong id="qaQ">00</strong><span>دقائق</span></div><div class="xP"><strong id="qaU">00</strong><span>ثواني</span></div></div></div></section></main>`;const ends=new Date(safeCfg.endsAt||'').getTime();const update=()=>{const left=Number.isFinite(ends)?Math.max(0,ends-Date.now()):0;const total=Math.floor(left/1000);const days=Math.floor(total/86400);const hours=Math.floor((total%86400)/3600);const minutes=Math.floor((total%3600)/60);const seconds=total%60;const pad=n=>String(n).padStart(2,'0');const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};set('mDays',pad(days));set('qaV',pad(hours));set('qaQ',pad(minutes));set('qaU',pad(seconds));};update();window.setInterval(update,1000);}function _K(key){const mapped=key?'categories':'home';$$('.xb').forEach(btn=>btn.classList.toggle('active',btn.dataset.bottom===mapped));}function _ba(key){_K(key);}function _aa(){const grid=$('#qN');if(!grid)return;grid.textContent='';const categorySubtitles={turkish_series:'دراما وحلقات تركية',english_movies:'أفلام أجنبية مترجمة',english_series:'مسلسلات أجنبية',arabic_movies:'أفلام عربية',ramadan_2026_series:'أعمال رمضان الجديدة',ramadan_2025_series:'أعمال رمضان السابقة',documentary_movies:'كلاسيكيات ووثائقيات',movie_series:'مختارات نتفلكس',arabic_series:'مسلسلات عربية',anime_series:'أنمي وكرتون'};CATEGORIES.forEach(category=>{const btn=_a('button',{className:'xj',attrs:{type:'button','data-key':category.key}});const iconBox=_a('span',{className:'xai'});iconBox.appendChild(_a('span',{className:'icon',text:category.icon}));const copy=_a('span',{className:'xO'});copy.append(_a('strong',{text:category.name}),_a('span',{text:categorySubtitles[category.key]||'عرض محتوى القسم'}));btn.append(iconBox,copy);btn.addEventListener('click',()=>{_n();_b1(category.key,category.name);});grid.appendChild(btn);});}function _ak(){_aa();_ax();const overlay=$('#qh');if(!overlay)return;overlay.classList.add('show');document.body.classList.add('xbB');_K('categories');}function _n(){const overlay=$('#qh');if(overlay)overlay.classList.remove('show');document.body.classList.remove('xbB');_K(state.grid.mode==='home'?'':state.grid.key);}function _ax(){$$('#qN .xj').forEach(btn=>{btn.classList.toggle('active',btn.dataset.key===state.grid.key);});}function _co(){const card=_a('div',{className:'card'});card.append(_a('div',{className:'xr skeleton'}),_a('div',{className:'skeleton xcA',attrs:{style:'width:80%'}}));return card;}function _bD(item,options={}){const normalized=_l(item.raw||item);const card=_a('article',{className:'card'});const poster=_a('div',{className:'xr'});const img=_a('img',{attrs:{src:_az(normalized.poster),alt:normalized.title,loading:'lazy'}});img.addEventListener('error',()=>{img.src=CONFIG.FALLBACK_POSTER;});poster.appendChild(img);const episodeNumber=normalized.episode;if(episodeNumber)poster.appendChild(_a('div',{className:'xcf',text:episodeNumber}));const posterBadges=_a('div',{className:'xcB'});if(normalized.rating){const ratingBadge=_a('span',{className:'xaD xbF'});ratingBadge.append(_a('span',{className:'icon',text:'star'}),document.createTextNode(normalized.rating));posterBadges.appendChild(ratingBadge);}if(normalized.quality){const qualityBadge=_a('span',{className:'xaD xa1'});qualityBadge.append(_a('span',{className:'icon',text:'high_quality'}),document.createTextNode(normalized.quality));posterBadges.appendChild(qualityBadge);}if(posterBadges.childElementCount)poster.appendChild(posterBadges);const title=_a('h3',{className:'xaP',text:normalized.title});card.append(poster,title);card.addEventListener('click',()=>_bk(normalized.url,normalized));return card;}function _A(container,message,className='xaz',icon=''){container.textContent='';const box=_a('div',{className});if(icon)box.appendChild(_a('span',{className:'icon',text:icon}));box.appendChild(_a('div',{text:message}));container.appendChild(box);}
function _oscarSettings(){const cfg=_q('oscar');let key='';try{const params=new URLSearchParams(location.search||'');key=params.get('oscar_key')||SAFE_STORAGE.getItem('oscar_api_key')||'';}catch(_){}return{apiUrl:String(_b(cfg.apiUrl,panelConfig?.oscarApiUrl,CONFIG.OSCAR_API,'')||'').trim().replace(/\/+$/,''),key:String(_b(cfg.key,panelConfig?.oscarApiKey,CONFIG.OSCAR_KEY,key,'')||'').trim()};}
async function _oscarCall(endpoint,params={}){const settings=_oscarSettings();if(!settings.apiUrl)throw new Error('oscar_api_missing');const url=new URL(settings.apiUrl.replace(/\/+$/,'')+'/'+String(endpoint).replace(/^\/+/,''),location.href);Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&String(v)!=='')url.searchParams.set(k,String(v));});if(settings.key&&!url.searchParams.has('key'))url.searchParams.set('key',settings.key);const res=await fetch(url.href,{cache:'no-store'});const data=await res.json().catch(()=>null);if(!res.ok)throw new Error('oscar_http_'+res.status);return data;}
function _oscarUnwrap(data){let d=data;for(let i=0;i<6;i++){if(!d||typeof d!=='object'||Array.isArray(d))break;if(d.upstream&&typeof d.upstream==='object'){d=d.upstream;continue;}if(d.response&&typeof d.response==='object'){d=d.response;continue;}if(d.result&&typeof d.result==='object'){d=d.result;continue;}if(d.data&&typeof d.data==='object'){d=d.data;continue;}break;}return d;}
function _oscarList(data){const root=_oscarUnwrap(data);if(Array.isArray(root))return root;if(!root||typeof root!=='object')return[];for(const key of['items','results','list','data','movies','series','episodes','channels','anime','collections']){if(Array.isArray(root[key]))return root[key];}for(const value of Object.values(root)){if(Array.isArray(value)&&value.some(item=>item&&typeof item==='object'))return value;}return[];}
function _oscarDetail(data){const d=_oscarUnwrap(data);return Array.isArray(d)?(d[0]||{}):(d&&typeof d==='object'?d:{});}
function _oscarId(raw={}){return _b(raw.id,raw.movie_id,raw.series_id,raw.episode_id,raw.channel_id,raw.anime_id,raw.item_id,raw.tmdb_id,'');}
function _oscarPoster(raw={}){return _b2(_b(raw.poster,raw.poster_url,raw.image,raw.img,raw.thumbnail,raw.logo,raw.icon,raw.cover,''));}
function _oscarBanner(raw={}){return _b2(_b(raw.banner,raw.backdrop,raw.backdrop_path,raw.cover,raw.image,''));}
function _oscarTitle(raw={}){return _titleClean(_b(raw.title_ar,raw.name_ar,raw.title,raw.name,raw.series_title,raw.movie_title,raw.episode_title,'بدون عنوان'));}
function _oscarKindUrl(kind,id){return`oscar:${kind}:${id}`;}
function _oscarItem(raw={},kind='movie'){const id=_oscarId(raw)||String(raw.slug||raw.url||raw.link||Math.random()).slice(0,60);const title=_oscarTitle(raw);const poster=_oscarPoster(raw)||_oscarBanner(raw);return{title,rawTitle:title,poster,url:_oscarKindUrl(kind,id),rating:_b(raw.rating,raw.imdb_rating,raw.vote_average,''),quality:_b(raw.quality,raw.quality_source,raw.source,''),type:kind==='channel'?'قناة':(kind==='anime'?'أنمي':(kind==='episode'?'حلقة':(kind==='series'?'مسلسل':'فيلم'))),year:_b(raw.release_year,raw.year,raw.releaseYear,''),episode:_b(raw.episode_number,raw.number,raw.episode,''),raw:{...raw,__oscarKind:kind,__oscarId:id}};}
function _oscarFlattenSources(value,bag=[]){if(!value)return bag;if(typeof value==='string'){const url=_b2(value);if(url)bag.push({label:'رئيسي',quality:'',url,originalUrl:url});return bag;}if(Array.isArray(value)){value.forEach(v=>_oscarFlattenSources(v,bag));return bag;}if(typeof value==='object'){const direct=_b(value.url,value.link,value.file,value.src,value.video,value.watch_url,value.download_url,value.stream,'');if(direct){const url=_b2(direct);if(url)bag.push({label:String(_b(value.label,value.name,value.server,value.quality,value.title,'رابط')).trim()||'رابط',quality:String(_b(value.quality,value.resolution,'')).replace('p',''),url,originalUrl:url});}for(const key of['links','items','sources','qualities','servers','videos','downloads']){if(value[key])_oscarFlattenSources(value[key],bag);}return bag;}return bag;}
function _oscarSources(raw={},mode='watch'){const keys=mode==='download'?['download_links','downloadLinks','downloads','download','download_urls']:['watch_links','watchLinks','watch','videos','servers','links','qualities','sources','stream'];const bag=[];keys.forEach(k=>_oscarFlattenSources(raw[k],bag));const seen=new Set();return bag.filter(source=>{const url=source.url||source.originalUrl;if(!url||seen.has(url))return false;seen.add(url);source.label=source.label||source.quality&&`${source.quality}p`||'رئيسي';return true;});}
function _oscarPeople(raw={}){const arr=[];['actors','cast','crew','team'].forEach(key=>{const value=raw[key];if(Array.isArray(value))value.forEach(person=>{if(person&&typeof person==='object')arr.push({name:_b(person.name_ar,person.name,person.title,'غير معروف'),role:_b(person.role_ar,person.role,person.character,key==='crew'?'فريق العمل':'ممثل'),photo:_b2(_b(person.photo,person.image,person.avatar,''))});});});return arr;}
function _oscarEpisodes(raw={}){const out=[];if(Array.isArray(raw.episodes))raw.episodes.forEach(ep=>out.push(_oscarItem(ep,'episode')));if(Array.isArray(raw.seasons))raw.seasons.forEach(season=>{const eps=Array.isArray(season.episodes)?season.episodes:[];eps.forEach(ep=>out.push(_oscarItem({...ep,season_id:season.id,season_title:season.title},'episode')));});return out.map(item=>({title:item.title,poster:item.poster,url:item.url,episode:item.episode,raw:item.raw}));}
function _oscarDetails(raw={},kind='movie',hint={}){return{title:_oscarTitle(raw)||hint.title,poster:_oscarPoster(raw)||hint.poster,banner:_oscarBanner(raw)||_oscarPoster(raw)||hint.poster,rating:_b(raw.rating,raw.imdb_rating,hint.rating,'N/A'),year:_b(raw.release_year,raw.year,hint.year,'----'),country:_b(raw.country_name,raw.country,hint.country,'غير محدد'),type:kind==='channel'?'قناة مباشرة':(kind==='anime'?'أنمي':(kind==='series'?'مسلسل':(kind==='episode'?'حلقة':'فيلم'))),quality:_b(raw.quality,raw.quality_source,hint.quality,'غير محدد'),plot:_b(raw.story,raw.description,raw.overview,raw.plot,'لا تتوفر قصة لهذا العمل.'),watchSources:_oscarSources(raw,'watch'),downloadSources:_oscarSources(raw,'download'),episodes:_oscarEpisodes(raw),team:_oscarPeople(raw),raw};}
function _oscarToken(url=''){const parts=String(url||'').split(':');return parts[0]==='oscar'?{kind:parts[1]||'movie',id:parts.slice(2).join(':')}:null;}
function _oscarEndpoint(kind){return kind==='series'?'series.show':kind==='episode'?'episodes.show':kind==='channel'?'channels.show':kind==='anime'?'anime.show':'movies.show';}
function _renderOscarSourcePicker(sources=[],title='مشاهدة',historyItem=null,options={}){const listSources=Array.isArray(sources)?sources.filter(s=>s&&s.url):[];$('#qo').classList.add('show');$('#qm').textContent=options.actionMode==='download'?'اختر رابط التحميل':'اختر رابط المشاهدة';const list=$('#qx');list.textContent='';if(!listSources.length){_k('لا توجد روابط متاحة حالياً');return;}listSources.forEach((source,index)=>{const row=_a('div',{className:`xab ${index===0?'recommended':''}`.trim()});const btn=_a('button',{className:'xaY',attrs:{type:'button'}});const circle=_a('span',{className:'xbP'});circle.appendChild(_a('span',{className:'icon',text:options.actionMode==='download'?'download':'play_arrow'}));const copy=_a('span');copy.append(_a('div',{className:'xcH',text:source.label||source.quality||`رابط ${index+1}`}),_a('div',{className:'xcK',text:options.actionMode==='download'?'اضغط لاختيار طريقة التحميل':'اضغط لاختيار طريقة المشاهدة'}));btn.append(circle,copy);btn.addEventListener('click',()=>_bm(source,historyItem?.watchUrl||source.url,title,historyItem,{...options,sources:listSources}));row.appendChild(btn);list.appendChild(row);});}
async function _openOscarEpisode(ep){const token=_oscarToken(ep.url);if(!token)return;_U('جاري تجهيز الحلقة من OscarTV...');let raw={};try{raw=_oscarDetail(await _oscarCall('episodes.show',{id:token.id}));}catch(_){}let sources=_oscarSources(raw,'watch');if(!sources.length){try{sources=_oscarList(await _oscarCall('watchLinks',{episode_id:token.id}));sources=_oscarFlattenSources(sources,[]);}catch(_){}}
const historyItem={title:_titleClean(`${state.currentDetails?.title||state.currentItem?.title||'مشاهدة'} - ${ep.title||''}`),poster:state.currentItem?.poster||state.currentDetails?.poster||'',url:ep.url,sourceUrl:state.currentItem?.url||ep.url,episodeUrl:ep.url,episode:ep.episode||_O(ep.title),watchUrl:ep.url};_renderOscarSourcePicker(sources,ep.title||'الحلقة',historyItem,{actionMode:'watch'});}
async function _openOscarDetails(url,hint={}){const token=_oscarToken(url);if(!token)return;const item=_l(hint.raw||hint);state.currentItem={...item,url};state.currentDetails=null;$('#qs').classList.add('show');document.body.style.overflow='hidden';_bt(item);try{window.history.pushState({modal:'details'},'','');}catch(_){}try{const raw=_oscarDetail(await _oscarCall(_oscarEndpoint(token.kind),{id:token.id}));const details=_oscarDetails(raw,token.kind,item);state.currentDetails=details;$('#qaq').src=_az(details.poster);$('#qaq').alt=details.title;const backdrop=$('#qag');if(backdrop)backdrop.style.backgroundImage=`url("${_az(details.banner||details.poster)}")`;$('#qF').textContent=details.title;$('#qaO').textContent=details.rating||'N/A';$('#dYear').textContent=details.year||'----';$('#qaJ').textContent=details.country||'غير محدد';$('#dType').textContent=details.type;$('#qaI').textContent=details.quality||'غير محدد';$('#dPlot').textContent=details.plot;const historyItem={...item,title:details.title,poster:details.poster,url,sourceUrl:url,episodeUrl:url,watchUrl:url};const hasWatch=details.watchSources.length||token.kind==='episode'||token.kind==='channel';const hasDownload=details.downloadSources.length;$('#qu').style.display=(hasWatch||hasDownload)?'grid':'none';const qd=$('#qd');if(qd){qd.style.display=hasWatch?'':'none';qd.innerHTML=`<span class="icon">${token.kind==='channel'?'live_tv':'play_arrow'}</span> ${token.kind==='channel'?'تشغيل القناة':'مشاهدة الآن'}`;qd.onclick=async()=>{let sources=details.watchSources;if(!sources.length&&token.kind==='episode')return _openOscarEpisode({url,title:details.title,episode:item.episode});_renderOscarSourcePicker(sources,details.title,historyItem,{actionMode:'watch'});};}const qa=$('#qa');if(qa){qa.style.display=hasDownload?'':'none';qa.onclick=()=>_renderOscarSourcePicker(details.downloadSources,details.title,historyItem,{actionMode:'download'});} _aF(details.episodes);_cB(details.team);}catch(error){console.error('Oscar detail error:',error);$('#dPlot').textContent='تعذر جلب تفاصيل OscarTV حالياً';$('#qu').style.display='none';}}
function _renderOscarStaticSection(parent,{title,icon='movie',items=[],kind='movie',seeAll=null}){const section=_a('section',{className:'section'});const header=_a('div',{className:'xat'});const h=_a('h2',{className:'xaa'});h.append(_a('span',{className:'icon',text:icon}),document.createTextNode(title));header.appendChild(h);if(seeAll){const all=_a('button',{className:'see-all',text:'عرض الكل',attrs:{type:'button'}});all.addEventListener('click',seeAll);header.appendChild(all);}const wrapper=_a('div',{className:'xaZ'});const carousel=_a('div',{className:'carousel'});if(!items.length)carousel.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى متاح حالياً'}));items.slice(0,18).forEach(raw=>{const card=_bD(_oscarItem(raw,kind));if(kind==='channel')card.classList.add('oscar-channel-card');carousel.appendChild(card);});wrapper.appendChild(carousel);section.append(header,wrapper);parent.appendChild(section);}
async function _renderOscarRemoteSection(parent,opts){const section=_a('section',{className:'section'});section.innerHTML=`<div class="xat"><h2 class="xaa"><span class="icon">${_c(opts.icon||'movie')}</span>${_c(opts.title)}</h2><button class="see-all" type="button">عرض الكل</button></div><div class="oscar-section-loading">جاري التحميل...</div>`;parent.appendChild(section);section.querySelector('.see-all')?.addEventListener('click',()=>_oscarOpenGrid(opts));try{const data=await _oscarCall(opts.endpoint,opts.params||{});const items=_oscarList(data);section.querySelector('.oscar-section-loading')?.remove();const wrapper=_a('div',{className:'xaZ'});const carousel=_a('div',{className:'carousel'});if(!items.length)carousel.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى'}));items.slice(0,18).forEach(raw=>carousel.appendChild(_bD(_oscarItem(raw,opts.kind||'movie'))));wrapper.appendChild(carousel);section.appendChild(wrapper);}catch(error){console.warn('Oscar section failed:',opts.endpoint,error);const box=section.querySelector('.oscar-section-loading');if(box){const st=_oscarSettings();box.textContent=(st.apiUrl.includes('/api/private/call')&&!st.key)?'هذا القسم يحتاج مفتاح OscarTV: أضف oscar_key للرابط أو استخدم API ويب عام':'تعذر تحميل هذا القسم';box.classList.add('oscar-section-error');}}}
function _oscarShell(mode,title,icon,subtitle){const container=$('#qi');if(!container)return null;container.dataset.mode=mode;container.textContent='';const shell=_a('section',{className:'library-shell'});const head=_a('div',{className:'library-head'});const titleBox=_a('div',{className:'library-title'});titleBox.append(_a('span',{className:'icon',text:icon}),_a('span',{text:title}));head.append(titleBox,_a('p',{text:subtitle}));const sections=_a('div',{className:'library-sections'});shell.append(head,sections);container.appendChild(shell);return sections;}
async function _ensureLiveContent(){const sections=_oscarShell('live','بث مباشر','live_tv','قنوات OscarTV مع جدول المباريات الحالي في الأعلى.');if(!sections)return;try{const collections=_oscarList(await _oscarCall('channels.collections'));let rendered=false;collections.slice(0,6).forEach(group=>{const channels=Array.isArray(group.channels)?group.channels:(Array.isArray(group.items)?group.items:[]);if(channels.length){rendered=true;_renderOscarStaticSection(sections,{title:_b(group.name_ar,group.name,group.title,'مجموعة قنوات'),icon:'live_tv',items:channels,kind:'channel'});}});if(!rendered)await _renderOscarRemoteSection(sections,{title:'قنوات مباشرة',icon:'live_tv',endpoint:'channels.list',kind:'channel',params:{page:1}});}catch(_){await _renderOscarRemoteSection(sections,{title:'قنوات مباشرة',icon:'live_tv',endpoint:'channels.list',kind:'channel',params:{page:1}});}state.liveContentReady=true;}
async function _ensureAnimeContent(){const sections=_oscarShell('anime','الأنمي','animation','واجهة أنمي مستقلة بنفس كروت OscarTV ومنطق التفاصيل والحلقات.');if(!sections)return;await _renderOscarRemoteSection(sections,{title:'آخر حلقات الأنمي',icon:'new_releases',endpoint:'anime.episodes.latest',kind:'episode',params:{limit:20}});await _renderOscarRemoteSection(sections,{title:'مكتبة الأنمي',icon:'animation',endpoint:'anime.list',kind:'anime',params:{page:1}});state.animeContentReady=true;}
async function _ensureOscarRestContent(){const sections=_oscarShell('rest','الاستراحة','local_movies','أقسام مشاهدة مرتبة من OscarTV: آخر الحلقات، آخر الأفلام، مسلسلات، أفلام، وتصنيفات جاهزة للويب.');if(!sections)return;const restSections=[
{title:'آخر الحلقات',icon:'new_releases',endpoint:'episodes.latest',kind:'episode',params:{limit:24}},
{title:'آخر الأفلام',icon:'movie',endpoint:'movies.list',kind:'movie',params:{page:1,sort_by:'latest'}},
{title:'مسلسلات تركية',icon:'theater_comedy',endpoint:'series.list',kind:'series',params:{category:2,page:1}},
{title:'مسلسلات عربية',icon:'language',endpoint:'series.list',kind:'series',params:{category:1,page:1}},
{title:'مسلسلات أجنبية',icon:'public',endpoint:'series.list',kind:'series',params:{category:4,page:1}},
{title:'مسلسلات آسيوية',icon:'travel_explore',endpoint:'series.list',kind:'series',params:{category:5,page:1}},
{title:'أفلام عربية',icon:'local_movies',endpoint:'movies.list',kind:'movie',params:{category:3,page:1}},
{title:'أفلام هوليود',icon:'movie_filter',endpoint:'movies.list',kind:'movie',params:{category:18,page:1}},
{title:'أفلام بوليود',icon:'celebration',endpoint:'movies.list',kind:'movie',params:{category:206,page:1}},
{title:'أفلام كورية',icon:'stars',endpoint:'movies.list',kind:'movie',params:{category:4,page:1}}
];
for(const cfg of restSections){await _renderOscarRemoteSection(sections,cfg);}
state.restContentReady=true;}

function _oscarOpenGrid(opts){_b8();state.grid={mode:'oscar',key:opts.endpoint,title:opts.title,page:1,oscar:{endpoint:opts.endpoint,kind:opts.kind||'movie',params:opts.params||{}}};state.gridItems=[];$('#qr').classList.add('hidden');$('#qae').classList.remove('hidden');$('#qaB').textContent=opts.title;$('#qp').textContent='';$('#qq').style.display='inline-flex';_oscarLoadGrid(true);}
async function _oscarLoadGrid(reset=false){const container=$('#qp');const moreBtn=$('#qq');if(reset)_A(container,'جاري التحميل...','xaI');if(moreBtn)moreBtn.disabled=true;try{const cfg=state.grid.oscar||{};const params={...(cfg.params||{}),page:state.grid.page};const items=_oscarList(await _oscarCall(cfg.endpoint,params)).map(raw=>_oscarItem(raw,cfg.kind||'movie'));if(reset)state.gridItems=[];state.gridItems=state.gridItems.concat(items);_F();if(moreBtn)moreBtn.style.display=items.length?'inline-flex':'none';}catch(error){console.warn('Oscar grid failed:',error);if(reset)_A(container,'تعذر تحميل القسم','xbs');}finally{if(moreBtn)moreBtn.disabled=false;}}
function _canUseRest(){const perms=_Q();return perms.rest!==false;}function _defaultHomeMode(){const perms=_Q();if(perms.matches)return'live';return'rest';}function _ensureModeSwitch(){const header=document.querySelector('.xaX.xI')||document.querySelector('.xac');if(!header)return;let box=document.getElementById('qModeSwitch');if(!box){box=_a('section',{className:'mode-switch-card',attrs:{id:'qModeSwitch'}});box.innerHTML='<div class="mode-switch-copy"><span class="icon">auto_awesome_motion</span><div><strong>اختر الواجهة</strong><small>بث مباشر، استراحة، وأنمي بنفس منطق OscarTV</small></div></div><div class="mode-segment"><button type="button" data-main-mode="live"><span class="icon">live_tv</span><span>بث مباشر</span></button><button type="button" data-main-mode="rest"><span class="icon">play_circle</span><span>الاستراحة</span></button><button type="button" data-main-mode="anime"><span class="icon">animation</span><span>الأنمي</span></button></div>';header.insertAdjacentElement('afterend',box);box.querySelectorAll('[data-main-mode]').forEach(btn=>btn.addEventListener('click',()=>_setHomeMode(btn.dataset.mainMode,true)));}const perms=_Q();box.classList.remove('hidden');box.querySelector('[data-main-mode="live"]')?.removeAttribute('disabled');box.querySelector('[data-main-mode="rest"]')?.toggleAttribute('disabled',!perms.rest&&!String(CONFIG.API||'').trim());box.querySelector('[data-main-mode="anime"]')?.removeAttribute('disabled');_updateModeSwitch();}function _updateModeSwitch(){const box=document.getElementById('qModeSwitch');if(!box)return;box.querySelectorAll('[data-main-mode]').forEach(btn=>btn.classList.toggle('active',btn.dataset.mainMode===state.homeMode));}function _ensureRestContent(){const holder=$('#qi');if(state.restContentReady&&holder?.dataset.mode==='rest')return;_e();$('#qe')?.classList.add('hidden');_ensureOscarRestContent().catch(error=>{console.warn('Oscar rest content failed:',error);if(holder){holder.dataset.mode='rest';holder.innerHTML='<section class="library-shell"><div class="library-head"><div class="library-title"><span class="icon">local_movies</span><span>الاستراحة</span></div><p>تعذر تحميل أقسام OscarTV حالياً.</p></div><div class="oscar-empty">تأكد من رابط Oscar API أو تسجيل الدخول/المفتاح.</div></section>';}});} function _setHomeMode(mode='live',save=false){const perms=_Q();let next=['live','rest','anime'].includes(mode)?mode:'live';if(next==='rest'&&!perms.rest&&!String(CONFIG.API||'').trim())next='live';state.homeMode=next;state.grid={mode:'home',key:'',title:'',page:1};$('#qae')?.classList.add('hidden');$('#qr')?.classList.remove('hidden');_ba('');document.body.classList.toggle('home-live-mode',next==='live');document.body.classList.toggle('home-rest-mode',next==='rest');document.body.classList.toggle('home-anime-mode',next==='anime');_updateModeSwitch();if(next==='live'){if(perms.matches)_W(true);else{_e();$('#qe')?.classList.add('hidden');}_ensureLiveContent();}else if(next==='anime'){_e();$('#qe')?.classList.add('hidden');_ensureAnimeContent();}else{_e();$('#qe')?.classList.add('hidden');_ensureRestContent();}window.scrollTo({top:0,behavior:'smooth'});if(save){try{SAFE_SESSION_STORAGE.setItem('estra7h_home_mode',next);}catch(_){}}}function _initHomeMode(){const perms=_Q();let mode=_defaultHomeMode();try{const saved=SAFE_SESSION_STORAGE.getItem('estra7h_home_mode');if(['live','rest','anime'].includes(saved))mode=saved;}catch(_){}if(mode==='rest'&&!perms.rest&&!String(CONFIG.API||'').trim())mode='live';state.homeMode=mode;_ensureModeSwitch();_setHomeMode(mode,false);} function _b1(key,title){_b8();state.grid={mode:'remote',key,title,page:1};state.gridItems=[];state.gridFilters={quality:'all',type:'all',sort:'default'};_ba(key);$('#qr').classList.add('hidden');$('#qae').classList.remove('hidden');$('#qaB').textContent=title;$('#qp').textContent='';$('#qq').style.display='inline-flex';_bP(true);}async function _bP(reset=false){
const container=$('#qp');
const moreBtn=$('#qq');
const oldMoreHtml=moreBtn?moreBtn.innerHTML:'';
if(moreBtn){
moreBtn.disabled=true;
moreBtn.setAttribute('aria-busy','true');
if(!reset)moreBtn.innerHTML='<span class="icon">progress_activity</span> جاري التحميل...';
}
if(reset)_A(container,'جاري التحميل...','xaI');
try{
const isSearch=state.grid.key.startsWith('search:');
const term=state.grid.key.slice('search:'.length);
const endpoint=isSearch?`/search?query=${encodeURIComponent(term)}&page=${state.grid.page}`:`/browse?category=${state.grid.key}&page=${state.grid.page}`;
const items=await _bA(endpoint);
if(reset)state.gridItems=[];
if(!items.length&&state.grid.page===1){
state.gridItems=[];
_ar();
_A(container,'لا توجد نتائج','xaz','search_off');
if(moreBtn)moreBtn.style.display='none';
return;
}
const seen=new Set((state.gridItems||[]).map(item=>{const n=_l(item.raw||item);return n.url||n.sourceUrl||n.title||JSON.stringify(item).slice(0,90);}));
const fresh=[];
items.forEach(item=>{
const n=_l(item.raw||item);
const key=n.url||n.sourceUrl||n.title||JSON.stringify(item).slice(0,90);
if(!seen.has(key)){seen.add(key);fresh.push(item);}
});
state.gridItems=state.gridItems.concat(fresh);
_F();
if(moreBtn)moreBtn.style.display=items.length?'inline-flex':'none';
if(!fresh.length&&items.length)_D('تم تجاهل نتائج مكررة','info');
}catch{
if(reset)_A(container,'حدث خطأ في تحميل النتائج','xbs');
}finally{
if(moreBtn){
moreBtn.disabled=false;
moreBtn.removeAttribute('aria-busy');
moreBtn.innerHTML=oldMoreHtml||'المزيد';
}
}
}function _cy(){state.grid={mode:'home',key:'',title:'',page:1};_ba('');$('#qr').classList.remove('hidden');$('#qae').classList.add('hidden');{const qz=$('#qz');if(qz)qz.classList.remove('show');}window.scrollTo({top:0,behavior:'smooth'});}async function _bk(url,hint={}){if(!url)return;if(_oscarToken(url))return _openOscarDetails(url,hint);const item=_l(hint.raw||hint);state.currentItem={...item,url};state.currentDetails=null;$('#qs').classList.add('show');document.body.style.overflow='hidden';_bt(item);try{window.history.pushState({modal:'details'},'','');}catch{}try{const details=await _a7(url);state.currentDetails=details;_cv(details,item);}catch{$('#dPlot').textContent='حدث خطأ في جلب التفاصيل';$('#qu').style.display='none';}}function _bt(item){$('#qaq').src=_az(item.poster);$('#qaq').alt=item.title;$('#qF').textContent=item.title||'جاري التحميل...';$('#qaO').textContent=item.rating||'N/A';$('#dYear').textContent=item.year||'----';$('#qaJ').textContent='غير محدد';$('#dType').textContent=item.type||'عام';$('#qaI').textContent=item.quality||'غير محدد';$('#dPlot').textContent='جاري التحميل...';$('#qu').style.display='none';$('#qD').style.display='none';$('#qak').style.display='none';$('.xcf',$('#qX'))?.remove();}function _cv(details,hint){const poster=hint.poster||details.poster||'';$('#qaq').src=_az(poster);const backdrop=$('#qag');if(backdrop)backdrop.style.backgroundImage=`url("${_az(poster)}")`;$('#qaq').alt=details.title;$('#qF').textContent=details.title;$('#qaO').textContent=details.rating||hint.rating||'N/A';$('#dYear').textContent=details.year||hint.year||'----';$('#qaJ').textContent=details.country||'غير محدد';$('#dType').textContent=details.type||details.category||hint.type||'عام';$('#qaI').textContent=details.quality||hint.quality||'غير محدد';$('#dPlot').textContent=details.plot;const watchCfg=_aE();$('#qu').style.display=(watchCfg.showWatchButton||watchCfg.showDownloadButton)?'grid':'none';const detailsHistoryItem={...hint,title:details.title,poster,url:state.currentItem.url,sourceUrl:state.currentItem.url,episodeUrl:state.currentItem.url,watchUrl:details.watchUrl};const qd=$('#qd');if(qd){qd.style.display=watchCfg.showWatchButton?'':'none';qd.onclick=()=>_v(details.watchUrl,details.title,detailsHistoryItem,{actionMode:'watch'});}const qa=$('#qa');if(qa){qa.style.display=watchCfg.showDownloadButton?'':'none';qa.onclick=()=>_v(details.watchUrl,details.title,detailsHistoryItem,{actionMode:'download'});}_aF(details.episodes);_cB(details.team);}function _aF(episodes=[]){const section=$('#qD');const grid=$('#qaz');grid.textContent='';$$('.xb7',section).forEach(el=>el.remove());if(!episodes.length){section.style.display='none';return;}section.style.display='block';const toolbar=_a('div',{className:'xb7'});const counter=_a('span',{className:'xcv',text:`${episodes.length} حلقة`});const orderBtn=_a('button',{className:'xcE',text:state.episodeOrder==='desc'?'الأحدث أولاً':'الأقدم أولاً',attrs:{type:'button'}});orderBtn.addEventListener('click',()=>{state.episodeOrder=state.episodeOrder==='desc'?'asc':'desc';_aF(episodes);});toolbar.append(counter,orderBtn);section.insertBefore(toolbar,grid);const sorted=[...episodes].sort((a,b)=>{const aa=Number(a.episode||_O(a.title)||0);const bb=Number(b.episode||_O(b.title)||0);return state.episodeOrder==='desc'?bb-aa:aa-bb;});sorted.forEach(ep=>{const btn=_a('button',{className:'ep-btn',attrs:{type:'button'}});btn.appendChild(_a('span',{className:'xcx',text:_titleClean(ep.title||`الحلقة ${ep.episode||''}`)}));btn.addEventListener('click',async()=>{$$('.ep-btn',grid).forEach(b=>b.classList.remove('active'));btn.classList.add('active');await _cw(ep);});grid.appendChild(btn);});}function _cB(team=[]){const section=$('#qak');const grid=$('#qaT');grid.textContent='';if(!team.length){section.style.display='none';return;}section.style.display='block';team.slice(0,12).forEach(person=>{const card=_a('div',{className:'xbt'});const img=_a('img',{attrs:{src:_az(person.photo),alt:person.name||'شخص'}});img.addEventListener('error',()=>{img.src=CONFIG.FALLBACK_POSTER;});const info=_a('div');info.append(_a('div',{className:'xcV',text:person.name||'غير معروف'}),_a('div',{className:'xcR',text:person.role||''}));card.append(img,info);grid.appendChild(card);});}async function _cw(ep){if(ep&&_oscarToken(ep.url))return _openOscarEpisode(ep);const title=_titleClean(ep.title||`الحلقة ${ep.episode||''}`);_U('جاري تجهيز الحلقة...');try{const details=await _a7(ep.url);const itemContext={title:_titleClean(`${state.currentDetails?.title||state.currentItem?.title||'مشاهدة'} - ${title}`),poster:state.currentItem?.poster||state.currentDetails?.poster||'',url:ep.url,sourceUrl:state.currentItem?.url||ep.url,episodeUrl:ep.url,episode:ep.episode||_O(title),watchUrl:details.watchUrl};await _v(details.watchUrl,title,itemContext,{});}catch{_k('تعذر تجهيز الحلقة');}}function _U(message){$('#qo').classList.add('show');$('#qm').textContent=message;_k('جاري التحميل...');}function _k(message){const list=$('#qx');list.textContent='';list.appendChild(_a('div',{className:'xaI',text:message}));}function _b6(){return(panelConfig&&panelConfig.appLinks)||{};}function _bE(){return _b6().admDownloadUrl||'https://play.google.com/store/apps/details?id=com.dv.adm';}function _bF(appName,installUrl,purposeText){$('#qo').classList.add('show');$('#qm').textContent='التطبيق غير مثبت';const list=$('#qx');list.textContent='';const box=_a('div',{className:'xaR'});const icon=_a('div',{className:'xcJ'});icon.appendChild(_a('span',{className:'icon',text:'warning'}));const title=_a('h3',{text:`${appName} غير مثبت`});const p=_a('p',{text:`قم بتحميل ${appName} الآن ${purposeText}.`});const actions=_a('div',{className:'xcj'});const install=_a('a',{className:'xcU',attrs:{href:installUrl||'#',target:'_blank',rel:'noopener'}});install.append(_a('span',{className:'icon',text:'download'}),document.createTextNode('تحميل التطبيق الآن'));if(!installUrl){install.addEventListener('click',event=>{event.preventDefault();_D('رابط تحميل التطبيق غير مضاف حالياً','info');});}const close=_a('button',{className:'xcD',text:'إغلاق',attrs:{type:'button'}});close.addEventListener('click',_R);actions.append(install,close);box.append(icon,title,p,actions);list.appendChild(box);}function _bU(source,watchUrl,historyItem){const playSource={...source,url:_vodUrl(source.originalUrl||source.url,'browser_player')};_D(`تشغيل ${source.label} عبر المتصفح`,'play_circle');window.open(playSource.url,'_blank','noopener');_R();}function _bl(source,historyItem=null){const downloadSource={...source,url:_vodUrl(source.originalUrl||source.url,'download')};const filename=_fileName(historyItem||{},downloadSource);downloadSource.url=_withFileName(downloadSource.url,filename);_D(`فتح تحميل ${source.label} عبر المتصفح`,'download');const a=document.createElement('a');a.href=downloadSource.url;a.target='_blank';a.rel='noopener';a.download=filename;document.body.appendChild(a);a.click();a.remove();_R();}function _openRestApp(source,watchUrl,title,historyItem){const selectedUrl=_restAppSourceUrl(source);if(!selectedUrl){_D('رابط الجودة المحددة غير متاح','info');return;}const intentTitle=_mediaTitle(historyItem||{title},source,title),selectedSource={...source,label:intentTitle,url:selectedUrl,originalUrl:selectedUrl};const deepLink=_restAppItemsUrl(intentTitle,[selectedSource]);_D(`محاولة فتح ${source.label||source.quality||'الجودة المحددة'} في تطبيق الاستراحة`,'smart_display');_openAppLink(deepLink,'تطبيق الاستراحة',_restAppDownloadUrl(),'حمل التطبيق الآن وقم بتثبيته ثم عد للعمل واختر المشاهدة من جديد واستمتع.');}function _b7(source,historyItem=null){const rawSource={...source,url:_vodUrl(source.originalUrl||source.url,'raw')};const filename=_fileName(historyItem||{},rawSource);rawSource.url=_withFileName(rawSource.url,filename);_D(`محاولة فتح ADM - اختر ADM عند ظهور الخيارات`,'download');_openAdmDownload(rawSource.url,filename);}function _bm(source,watchUrl,title,historyItem,options={}){const dialog=$('#qo');dialog.classList.add('show');if(options.elevated)dialog.style.zIndex='9600';const list=$('#qx');list.textContent='';const mode=options.actionMode||'all';const isDownload=mode==='download';const isWatch=mode==='watch';$('#qm').textContent=isDownload?`${source.label} - اختر طريقة التحميل`:(isWatch?`${source.label} - اختر طريقة المشاهدة`:`${source.label} - اختر الطريقة`);const note=_a('div',{className:'xaB'});note.innerHTML=`<strong>${_c(title||'مشاهدة')}</strong><br>${isDownload?'اختر طريقة التحميل المناسبة.':(isWatch?'اختر طريقة المشاهدة المناسبة.':'اختر هل تريد المشاهدة أو التحميل.')}`;list.appendChild(note);const grid=_a('div',{className:`xN ${mode!=='all'?'xcp':''}`.trim()});const makeBtn=({cls='',icon,title,sub,onClick})=>{const btn=_a('button',{className:`xc ${cls}`.trim(),attrs:{type:'button'}});const ic=_a('span',{className:'xaH'});ic.appendChild(_a('span',{className:'icon',text:icon}));const copy=_a('span');copy.append(_a('div',{className:'xav',text:title}),_a('div',{className:'xaL',text:sub}));btn.append(ic,copy);btn.addEventListener('click',onClick);return btn;};const watchButtons=[makeBtn({cls:'primary',icon:'phone_android',title:'مشاهدة عبر تطبيق الاستراحة',sub:'يفتح الجودة المحددة في تطبيق الاستراحة',onClick:()=>_openRestApp(source,watchUrl,title,historyItem)}),makeBtn({cls:'primary',icon:'language',title:'مشاهدة عبر المتصفح',sub:'يفتح الجودة المحددة في مشغل المتصفح',onClick:()=>_bU(source,watchUrl,historyItem)})];const downloadButtons=[makeBtn({cls:'network-download',icon:'downloading',title:'تحميل عبر تطبيق الشبكة',sub:`يفتح مدير تنزيلات ${(window.JOAAN_PROVISION&&window.JOAAN_PROVISION.networkName)||'الشبكة'} ويفحص الرابط قبل البدء`,onClick:()=>window._openNetworkDownload(source,historyItem,title)}),makeBtn({cls:'download',icon:'download_for_offline',title:'تحميل عبر ADM Pro',sub:'يرسل الجودة المحددة إلى تطبيق ADM',onClick:()=>_b7(source,historyItem)}),makeBtn({cls:'download',icon:'cloud_download',title:'تحميل عبر المتصفح',sub:'يحمل الجودة المحددة من المتصفح',onClick:()=>_bl(source,historyItem)})];const watchCfg=_aE();const allowedWatchButtons=watchButtons.filter((_,index)=>index===0?watchCfg.enableRestApp:watchCfg.enableBrowserWatch);const allowedDownloadButtons=downloadButtons.filter((_,index)=>index===0?true:(index===1?watchCfg.enableAdmDownload:watchCfg.enableBrowserDownload));if(isWatch)grid.append(...allowedWatchButtons);else if(isDownload)grid.append(...allowedDownloadButtons);else grid.append(...allowedWatchButtons,...allowedDownloadButtons);if(!grid.children.length)grid.appendChild(_a('div',{className:'xaI',text:'هذه الطريقة غير مفعلة من لوحة التحكم.'}));const back=_a('button',{className:'xa3',text:'رجوع للجودات',attrs:{type:'button'}});back.addEventListener('click',()=>{if(typeof options.onBack==='function'){_R();options.onBack();}else _v(watchUrl,title,historyItem,options);});list.append(grid,back);}window._openSourceMethodChooser=_bm;async function _v(watchUrl,title='مشاهدة',itemContext=null,options={}){$('#qo').classList.add('show');$('#qm').textContent='اختر الجودة';_k('جاري جلب روابط جديدة...');try{const sources=await _bB(watchUrl);const list=$('#qx');list.textContent='';if(!sources.length){_k('لا توجد جودات متاحة');return;}sources.forEach((source,index)=>{const row=_a('div',{className:`xab ${index===0?'recommended':''}`.trim()});const btn=_a('button',{className:'xaY',attrs:{type:'button'}});const circle=_a('span',{className:'xbP'});circle.appendChild(_a('span',{className:'icon',text:options.actionMode==='download'?'download':'tune'}));const copy=_a('span');copy.append(_a('div',{className:'xcH',text:source.label}),_a('div',{className:'xcK',text:options.actionMode==='download'?'اضغط لاختيار طريقة التحميل':'اضغط لاختيار طريقة المشاهدة'}));btn.append(circle,copy);btn.addEventListener('click',()=>_bm(source,watchUrl,title,itemContext,{...options,sources}));row.append(btn);list.appendChild(row);});}catch{_k('خطأ في جلب الجودات');}}function _bQ(){$('#qs').classList.remove('show');document.body.style.overflow='';}function _R(){const dialog=$('#qo');dialog.classList.remove('show');dialog.style.zIndex='';}function _b8(){_n();}function _aW(){$('#qy').classList.remove('show');}function _cq(){SAFE_STORAGE.removeItem('theme');SAFE_STORAGE.removeItem('font');const scale=SAFE_STORAGE.getItem('scale')||'1';$('#qZ').value=scale;_cA(scale,false);}function _cA(value,save=true){if(save)SAFE_STORAGE.setItem('scale',value);document.documentElement.style.setProperty('--scale-factor',value);}function _bV(){const overlay=$('#qb');const input=$('#ql');if(!overlay||!input)return;overlay.classList.add('show');_K('search');input.value=$('#qw').value.trim();setTimeout(()=>input.focus(),80);}function _w(){const overlay=$('#qb');if(overlay)overlay.classList.remove('show');_K(state.grid.mode==='home'?'':state.grid.key);}function _bc(){const input=$('#ql');const term=input?input.value.trim():'';if(!term)return;$('#qw').value=term;_w();_b1(`search:${term}`,`بحث: ${term}`);}function _cr(){const term=$('#qw').value.trim();if(!term)return;_b1(`search:${term}`,`بحث: ${term}`);}function _cC(){_bG();$('#qac')?.addEventListener('click',_aW);$('#qaj').addEventListener('click',_R);$('#qaE').addEventListener('click',_cy);$('#qar').addEventListener('click',_cy);$('#qai').addEventListener('click',_bV);$$('#qao button').forEach(btn=>btn.addEventListener('click',()=>_b5(btn.dataset.view)));$('#qP').addEventListener('click',_ak);$('#qq').addEventListener('click',()=>{state.grid.page+=1;if(state.grid.mode==='oscar')_oscarLoadGrid(false);else _bP(false);});$('#qJ').addEventListener('click',_w);$('#qb').addEventListener('click',event=>{if(event.target.id==='qb')_w();});$('#qR').addEventListener('click',_n);$('#qh').addEventListener('click',event=>{if(event.target.id==='qh')_n();});$('#qE').addEventListener('click',_bc);$('#ql').addEventListener('keydown',event=>{if(event.key==='Enter')_bc();});$('#qaP').addEventListener('click',_cr);$('#qw').addEventListener('keydown',event=>{if(event.key==='Enter')_cr();});document.addEventListener('keydown',event=>{if(event.key==='Escape'){_n();_w();_aW();_R();if(document.querySelector('.xg.show'))_h();}});$('#qZ').addEventListener('input',event=>_cA(event.target.value));document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(document.querySelector('.xg.show'))_h();else if($('#qb')&&$('#qb').classList.contains('show'))_w();else if($('#qo').classList.contains('show'))_R();else if($('#qy').classList.contains('show'))_aW();else if($('#qs').classList.contains('show'))_bQ();else _b8();});}let selectedRestMatchForWatch=null;let restMatchesTimerInterval=null;function _a2(match){const rightTeam=match?.['Team-Right']||{};const leftTeam=match?.['Team-Left']||{};return`${_d(rightTeam.Name, 'الفريق الأول')} × ${_d(leftTeam.Name, 'الفريق الثاني')}`;}function _bw(match){if(!match||typeof match!=='object')return'';const candidates=[match.link,match.Link,match.app_link,match.appLink,match.deepLink];for(const candidate of candidates){const url=_Z(String(candidate||''));if(url)return url;}return'';}function _a3(match){if(!match||typeof match!=='object')return'';const candidates=[match.link1,match.Link1,match.browser_link,match.browserLink,match.watch_url,match.watchUrl,match.url];for(const candidate of candidates){const url=_Z(String(candidate||''));if(url&&/^https?:/i.test(url))return url;}return'';}function _ac(id){const dialog=document.getElementById(id);if(!dialog)return;dialog.classList.add('show');document.body.style.overflow='hidden';}function _h(){document.querySelectorAll('.xg.show').forEach(dialog=>dialog.classList.remove('show'));if(!document.querySelector('.modal.show, .xag.show, .xC.show, .xp.show, .xy.show')){document.body.style.overflow='';}}function _aP(match){selectedRestMatchForWatch=match;const title=document.getElementById('qn');const meta=document.getElementById('qK');const appBtn=document.getElementById('qad');const browserBtn=document.getElementById('qL');const appUrl=_bw(match);const browserUrl=_a3(match);if(title)title.textContent=_a2(match);if(meta){meta.textContent=[_i(match?.['Cup-Name']),_x(match?.Tv),_d(match?.Mic,'')].filter(Boolean).join(' • ')||'اختر الطريقة المناسبة لتشغيل المباراة.';}if(appBtn){appBtn.style.display='grid';appBtn.classList.toggle('is-unavailable',!appUrl);const strong=appBtn.querySelector('strong');const small=appBtn.querySelector('small');if(strong){strong.textContent='مشاهدة عبر التطبيق';if(appUrl&&browserUrl)strong.appendChild(_a('span',{className:'xcP',text:'أفضل اختيار'}));}if(small)small.textContent=appUrl?'يفتح رابط التطبيق إن كان متوفراً':'رابط التطبيق غير متوفر حالياً';}if(browserBtn){browserBtn.style.display='grid';browserBtn.classList.toggle('is-unavailable',!browserUrl);const small=browserBtn.querySelector('small');if(small)small.textContent=browserUrl?'يفتح رابط البث في نافذة جديدة':'رابط المتصفح غير متوفر حالياً';}let empty=document.getElementById('matchNoLinksNotice');if(!empty){empty=_a('div',{className:'xaB',attrs:{id:'matchNoLinksNotice'}});const wrap=document.querySelector('#qab .xbR');if(wrap)wrap.appendChild(empty);}if(empty){empty.style.display=(!appUrl&&!browserUrl)?'block':'none';empty.textContent='لا توجد روابط مشاهدة متاحة لهذه المباراة حالياً.';}_ac('qab');}function _av(){const url=_bw(selectedRestMatchForWatch);if(!url){_D('رابط المشاهدة عبر التطبيق غير متوفر لهذه المباراة','error');return;}const matchDialog=document.getElementById('qab');if(matchDialog)matchDialog.classList.remove('show');_openAppLink(url,'تطبيق المشاهدة',_matchAppDownloadUrl(),'حمل التطبيق الآن وقم بتثبيته ثم عد للمباراة واختر المباراة من جديد واستمتع.');}function _X(){const url=_a3(selectedRestMatchForWatch);if(!url){_D('رابط المشاهدة عبر المتصفح غير متوفر لهذه المباراة','error');return;}_N(url);_h();}async function _bn(){const btn=document.getElementById('qA');if(!btn||btn.disabled)return;const oldHtml=btn.innerHTML;try{btn.disabled=true;btn.innerHTML='<span class="icon" style="animation:refreshSpin .85s linear infinite">refresh</span>';await _a8().catch(error=>console.warn('Panel refresh skipped:',error));_J();state.restContentReady=false;state.liveContentReady=false;state.animeContentReady=false;_aN();_ensureModeSwitch();if(state.homeMode==='rest')await _ensureRestContent();if(state.homeMode==='anime')await _ensureAnimeContent();if(state.homeMode==='live')await _ensureLiveContent();if(_Q().matches)_W(true);_setHomeMode(state.homeMode,false);_D('تم تحديث البيانات بنجاح','check_circle');}catch(error){console.error('Refresh failed:',error);_D('تعذر إكمال التحديث','error');}finally{btn.disabled=false;btn.innerHTML=oldHtml||'<span class="icon">refresh</span>';}}function _bG(){if(window.__joaanHeaderActionsBound)return;window.__joaanHeaderActionsBound=true;document.getElementById('qA')?.addEventListener('click',_bn);document.getElementById('qad')?.addEventListener('click',_av);document.getElementById('qL')?.addEventListener('click',_X);document.querySelectorAll('[data-close-simple-dialog]').forEach(button=>button.addEventListener('click',_h));document.querySelectorAll('.xg').forEach(dialog=>{dialog.addEventListener('click',event=>{if(event.target===dialog)_h();});});}const REST_MATCHES_DEFAULTS={apiUrl:'',pageUrl:'matches.html',buttonText:'شاهد مباريات اليوم'};function _b(...values){return values.find(value=>value!==undefined&&value!==null);}function _u(){const cfg=panelConfig||{};const m=_q('matches');const perms=_Q();const enabled=perms.matches&&_b(m.enabled,cfg.matchesEnabled,cfg.matchesFeatureEnabled,true)!==false;const inRest=_b(m.inRestEnabled,cfg.matchesInRestEnabled,cfg.showMatchesInRest,cfg.restMatchesEnabled,true)!==false;const matchesApiUrl=String(_b(m.apiUrl,cfg.matchesApiUrl,REST_MATCHES_DEFAULTS.apiUrl)||'').trim();return{enabled,inRest,apiUrl:matchesApiUrl,pageUrl:_b(m.pageUrl,cfg.matchesPageUrl,REST_MATCHES_DEFAULTS.pageUrl),buttonText:_b(m.buttonText,cfg.matchesButtonText,REST_MATCHES_DEFAULTS.buttonText),sort:_b(m.sort,cfg.matchesSort,'status'),hideFinished:_b(m.hideFinished,cfg.matchesHideFinished,false)===true,showLeague:_b(m.showLeague,cfg.matchesShowLeague,true)!==false,showCommentator:_b(m.showCommentator,cfg.matchesShowCommentator,true)!==false,showChannel:_b(m.showChannel,cfg.matchesShowChannel,true)!==false,openSummaryVideo:_b(m.openSummaryVideo,cfg.matchesOpenSummaryVideo,true)!==false};}function _bH(url,params){try{const u=new URL(url,location.href);Object.entries(params).forEach(([key,value])=>u.searchParams.set(key,value));return u.href;}catch{const sep=String(url).includes('?')?'&':'?';return`${url}${sep}${new URLSearchParams(params).toString()}`;}}function _d(value,fallback='غير متوفر'){return value===null||value===undefined||value===''?fallback:value;}function _i(name){const leagueName=_d(name);const leagueMap={'دوري روشن السعودي':'الدوري السعودي','البطولة الوطنية المغربية':'الدوري المغربي','الدوري البرتغالي الممتاز':'الدوري البرتغالي','الرابطة المحترفة الجزائرية':'الدوري الجزائري','الرابطة التونسية لكرة القدم':'الدوري التونسي'};return leagueMap[leagueName]||leagueName;}function _x(name){return _d(name).replace(/تـ/g,'ت').replace(/ثـ/g,'ث').replace(/\s+/g,' ').trim().replace(/تمانية/g,'ثمانية');}function _bo(dateString){if(!dateString)return'غير محدد';const date=new Date(dateString);if(Number.isNaN(date.getTime()))return'غير محدد';return date.toLocaleTimeString('ar',{hour:'2-digit',minute:'2-digit',hour12:true});}function _r(match){const timer=match?.['Match-Timer']||match?.match_timer||match?.timer||{};const candidates=[timer.seconds,timer.Seconds,match?.timer_seconds,match?.['Timer-Seconds'],match?.minutes,match?.Minutes];for(const value of candidates){if(value===null||value===undefined||value==='')continue;const n=Number(value);if(Number.isFinite(n)&&n>=0)return Math.floor(n);}return 0;}function _L(match){const timer=match?.['Match-Timer']||match?.match_timer||match?.timer||{};const timestamp=Number(_b(match?.match_timestamp,match?.['match_timestamp'],timer.match_timestamp,timer.timestamp,0));if(Number.isFinite(timestamp)&&timestamp>0){const date=new Date(timestamp*1000);if(!Number.isNaN(date.getTime()))return date;}const rawStart=_b(match?.['Time-Start'],match?.time_start,match?.start_time,match?.match_start,'');if(!rawStart)return null;const date=new Date(rawStart);return Number.isNaN(date.getTime())?null:date;}function _ad(match){const startDate=_L(match);if(!startDate)return false;return Date.now()<startDate.getTime()-30000;}function _g(match){const timer=match?.['Match-Timer']||match?.match_timer||match?.timer||{};const statusCode=Number(_b(match?.match_status_code,timer.status_code,match?.status_code,match?.status,0));const live=Number(_b(match?.live,match?.Live,timer.live,0));const seconds=_r(match);if(statusCode===0||_ad(match))return false;if(![1,3,7].includes(statusCode))return false;return live===1||timer.running===true||seconds>0;}function _y(match){const base=_r(match);if(!_g(match))return base;const fetchedAt=Number(match?.__restTimerFetchedAt||Date.now());const elapsed=Math.max(0,Math.floor((Date.now()-fetchedAt)/1000));return base+elapsed;}function _S(seconds){const total=Math.max(0,Math.floor(Number(seconds)||0));const minute=Math.floor(total/60);const second=total%60;return`${minute}:${String(second).padStart(2, '0')}`;}function _bd(match){const timer=match?.['Match-Timer']||match?.match_timer||match?.timer||{};const pick=[match?.ex_time,match?.extra_time,match?.stoppage_time,match?.added_time,match?.injury_time,match?.extraTime,match?.stoppageTime,match?.addedTime,match?.injuryTime,match?.add_time,match?.addTime,match?.ET,match?.['Ex-Time'],match?.['Extra-Time'],match?.['Stoppage-Time'],match?.['Added-Time'],match?.['Injury-Time'],match?.['ExtraTime'],match?.['StoppageTime'],match?.['AddedTime'],timer.ex_time,timer.extra_time,timer.stoppage_time,timer.added_time,timer.injury_time,timer.extraTime,timer.stoppageTime,timer.addedTime,timer.injuryTime,timer.add_time,timer.addTime,timer.ET,timer.ExTime,timer.StoppageTime,timer.AddedTime,timer['Ex-Time'],timer['Extra-Time'],timer['Stoppage-Time'],timer['Added-Time'],timer['Injury-Time'],timer['ExtraTime'],timer['StoppageTime'],timer['AddedTime']];for(const value of pick){if(value===null||value===undefined||value==='')continue;const str=String(value).trim();const plus=str.match(/(?:\+|بدل|اضافي|إضافي|الاضافي|الإضافي)\s*(\d{1,2})/i);const n=plus?Number(plus[1]):Number(str.replace(/[^0-9.]/g,''));if(Number.isFinite(n)&&n>0&&n<30)return Math.floor(n);}const textSources=[match?.Status,match?.status_text,match?.match_status,match?.state,timer.status,timer.Status,timer.text,timer.label,timer.minute,timer.minutes,timer.Minute,timer.Minutes,match?.minute,match?.minutes,match?.Minute,match?.Minutes];for(const value of textSources){if(value===null||value===undefined||value==='')continue;const m=String(value).match(/\+\s*(\d{1,2})/);if(m){const n=Number(m[1]);if(Number.isFinite(n)&&n>0&&n<30)return Math.floor(n);}}const sec=_y(match);const minute=Math.floor(sec/60);const code=Number(match?.match_status_code??timer.status_code??match?.status_code??match?.status);if(minute>90)return Math.min(29,minute-90);if(minute>45&&code===2)return Math.min(29,minute-45);return 0;}function _bx(match){if(!_g(match))return'';const id=_c(_d(match.match_id,''));const text=_S(_y(match));const extra=_bd(match);const extraHtml=extra>0?`<span class="xaV">+${_c(extra)}</span>`:'';const extraClass=extra>0?' xbQ':'';return`<div class="xu"><div class="xl${extraClass}">${extraHtml}<span class="icon">timer</span><span data-rest-match-timer-id="${id}">${_c(text)}</span></div></div>`;}function _ab(section,matches=[]){if(!section)return;matches.forEach(match=>{if(!_g(match))return;const id=String(match?.match_id??'');const node=section.querySelector(`[data-rest-match-timer-id="${CSS.escape(id)}"]`);if(!node)return;node.textContent=_S(_y(match));const wrap=node.closest('.xl');if(wrap){const extra=_bd(match);wrap.classList.toggle('xbQ',extra>0);let badge=wrap.querySelector('.xaV');if(extra>0){if(!badge){badge=document.createElement('span');badge.className='xaV';wrap.insertBefore(badge,wrap.firstChild);}badge.textContent='+'+extra;}else if(badge){badge.remove();}}});}function _e(){if(restMatchesTimerInterval){clearInterval(restMatchesTimerInterval);restMatchesTimerInterval=null;}}function _ay(section,matches=[]){_e();if(!matches.some(_g))return;_ab(section,matches);restMatchesTimerInterval=setInterval(()=>_ab(section,matches),1000);}function _al(match){if(!match||typeof match!=='object')return'';const candidates=[match.video,match.Video,match.summary,match.summaryUrl,match.highlight,match.highlights];for(const candidate of candidates){const url=_Z(String(candidate||''));if(url)return url;}return'';}function _G(match){const code=Number(match.match_status_code??match.status_code??match.status);const timer=match?.['Match-Timer']||match?.match_timer||match?.timer||{};const liveFlag=Number(_b(match?.live,match?.Live,timer.live,0))===1;const statusText=String(match.Status||'').trim();const startDate=_L(match);const now=new Date();const hasValidStart=!!startDate;const startsInFuture=hasValidStart&&now.getTime()<startDate.getTime()-30000;const isPostponed=code===5||code===14||statusText.includes('تأجل')||statusText.includes('تاجل');const isFinished=code===4||statusText.includes('انتهت');const isHalfTime=code===2||statusText.includes('استراحة')||statusText.includes('بين الشوطين');const isNotStarted=code===0||statusText.includes('لم تبدأ')||statusText.includes('لم تبدا');const isPlayingCode=[1,3,7].includes(code);if(isPostponed)return'postponed';if(isFinished)return _al(match)?'summary':'finished';if(isHalfTime)return'halftime';if(isNotStarted||startsInFuture)return'upcoming';const textLooksLive=statusText.includes('مباشر')||statusText.includes('الشوط');const isLive=isPlayingCode&&(liveFlag||timer.running===true||_r(match)>0||textLooksLive);if(isLive)return'live';if(hasValidStart&&now>=startDate)return'unknown';return'upcoming';}function _aQ(match){const statusClass=_G(match);if(statusClass==='postponed')return{className:'postponed',label:'تأجلت',icon:'event_busy'};if(statusClass==='summary')return{className:'summary',label:'شاهد الملخص',icon:'play_circle'};if(statusClass==='finished')return{className:'finished',label:'إنتهت',icon:'check_circle'};if(statusClass==='halftime')return{className:'halftime',label:'استراحة',icon:'pause_circle'};if(statusClass==='live')return{className:'live',label:'جارية الآن',icon:'radio_button_checked'};if(statusClass==='unknown')return{className:'unknown',label:'بانتظار التحديث',icon:'update'};const startDate=_L(match);const now=new Date();const minutesToStart=startDate?(startDate.getTime()-now.getTime())/60000:NaN;if(!Number.isNaN(minutesToStart)&&minutesToStart>=0&&minutesToStart<=10){return{className:'soon',label:'تبدأ قريبًا',icon:'bolt'};}return{className:'not-started',label:'لم تبدأ بعد',icon:'schedule'};}function _am(match){const stateClass=_aQ(match).className;const order={live:0,halftime:1,soon:2,unknown:3,'not-started':4,summary:5,finished:6,postponed:7};return order[stateClass]??9;}function _b9(matches){const cfg=_u();return[...matches].sort((a,b)=>{if(cfg.sort==='league'){const leagueDiff=_i(a['Cup-Name']).localeCompare(_i(b['Cup-Name']),'ar');if(leagueDiff!==0)return leagueDiff;}if(cfg.sort==='status'){const rank=_am(a)-_am(b);if(rank!==0)return rank;}const aTime=new Date(a['Time-Start']).getTime()||0;const bTime=new Date(b['Time-Start']).getTime()||0;return aTime-bTime;});}function _bp(match){const rightTeam=match['Team-Right']||{};const leftTeam=match['Team-Left']||{};const statusClass=_G(match);const state=_aQ(match);const main=statusClass==='upcoming'?`<div class="xbD">${_bo(match['Time-Start'])}</div>`:`<div class="xbx"><span>${_c(_d(rightTeam.Goal, 0))}</span><span>-</span><span>${_c(_d(leftTeam.Goal, 0))}</span></div>`;return`${main}<div class="xh ${state.className}"><span class="icon">${state.icon}</span><span>${_c(state.label)}</span></div>${_bx(match)}`;}function _bI(match){const cfg=_u();const chips=[];if(cfg.showLeague){chips.push(`<div class="xH league"><span class="icon">emoji_events</span><span>${_c(_i(match['Cup-Name']))}</span></div>`);}if(cfg.showCommentator){chips.push(`<div class="xH"><span class="icon">mic</span><span>${_c(_d(match.Mic))}</span></div>`);}if(cfg.showChannel){chips.push(`<div class="xH"><span class="icon">live_tv</span><span>${_c(_x(match.Tv))}</span></div>`);}return chips.length?`<div class="xbA">${chips.join('')}</div>`:'';}function _bJ(match,index=0){const rightTeam=match['Team-Right']||{};const leftTeam=match['Team-Left']||{};const id=_c(_d(match.match_id,''));const rightLogo=_b2(_d(rightTeam.Logo,''));const leftLogo=_b2(_d(leftTeam.Logo,''));return`<article class="xW" data-rest-match-id="${id}" data-rest-match-index="${index}" tabindex="0"><div class="xbz"><div class="xal home"><div class="xan"><img src="${_c(rightLogo)}" alt="${_c(_d(rightTeam.Name))}" loading="lazy" onerror="this.style.display='none'"></div><div class="xam">${_c(_d(rightTeam.Name))}</div></div><div class="xb4">${_bp(match)}</div><div class="xal away"><div class="xan"><img src="${_c(leftLogo)}" alt="${_c(_d(leftTeam.Name))}" loading="lazy" onerror="this.style.display='none'"></div><div class="xam">${_c(_d(leftTeam.Name))}</div></div></div>${_bI(match)}</article>`;}function _aX(section,cfg){const url=_bH(cfg.pageUrl,{view:'cards',lockView:'1'});section.classList.remove('hidden');section.innerHTML=`<div class="xz"><h2><span class="icon" style="vertical-align:middle;color:var(--accent)">sports_soccer</span> مباريات اليوم</h2><p>جدول المباريات متاح في صفحة مستقلة بوضع البطاقات فقط حسب إعدادات صاحب الشبكة.</p><a class="xbL" href="${_c(url)}"><span class="icon">open_in_new</span>${_c(cfg.buttonText)}</a></div>`;}function _bi(match){if(!match||typeof match!=='object')return'';const candidates=[match.link1,match.link,match.Link1,match.Link,match.watch_url,match.watchUrl,match.url];for(const candidate of candidates){const url=_Z(String(candidate||''));if(url)return url;}return'';}function _by(matches){$$('#qe .xW').forEach(card=>{const open=()=>{const index=Number(card.dataset.restMatchIndex);const match=Number.isInteger(index)?matches[index]:null;if(!match)return;const videoUrl=_al(match);if(_u().openSummaryVideo&&_G(match)==='summary'&&videoUrl){_N(videoUrl);return;}_aP(match);};card.addEventListener('click',open);card.addEventListener('keydown',event=>{if(event.key!=='Enter'&&event.key!==' ')return;event.preventDefault();open();});});}function _ae(section){const track=$('.xd',section);if(!track)return;$$('.xk, .xad',section).forEach(button=>{button.addEventListener('click',()=>{const amount=track.clientWidth;const direction=button.dataset.slide==='next'?-1:1;track.scrollBy({left:direction*amount,behavior:'smooth'});});});}async function _be(section,cfg){section.innerHTML=`<div class="xaM"><button class="xk prev" data-slide="prev"><span class="icon">chevron_right</span></button><div class="xa9"><span class="icon">sports_soccer</span><span>مباريات اليوم</span></div><button class="xk next" data-slide="next"><span class="icon">chevron_left</span></button></div><div class="xs">جاري تحميل المباريات...</div>`;try{if(!cfg.apiUrl){_e();const placeholder=$('.xs',section);if(placeholder)placeholder.textContent='رابط API المباريات غير مضبوط من لوحة التحكم.';return;}const response=await fetch(cfg.apiUrl,{cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();const fetchedAt=Date.now();const rawMatches=(Array.isArray(data.today)?data.today:[]).map(match=>({...match,__restTimerFetchedAt:fetchedAt}));const filtered=cfg.hideFinished?rawMatches.filter(match=>!['finished','summary'].includes(_G(match))):rawMatches;const matches=_b9(filtered);if(!matches.length){_e();$('.xs',section).textContent='لا توجد مباريات متاحة الآن.';return;}const visibleMatches=matches.slice(0,30);const track=`<div class="xaA"><div class="xd">${visibleMatches.map((match, index) => _bJ(match, index)).join('')}</div></div>`;const placeholder=$('.xs',section);if(placeholder)placeholder.outerHTML=track;_by(visibleMatches);_ae(section);_ay(section,visibleMatches);}catch(error){_e();console.error('Rest matches error:',error);const placeholder=$('.xs',section);if(placeholder)placeholder.textContent='تعذر تحميل مباريات اليوم حاليًا.';}}function _W(force=false){const section=$('#qe');if(!section)return;const cfg=_u();if(!cfg.enabled){_e();section.classList.add('hidden');section.textContent='';return;}section.classList.remove('hidden');const forceInline=state.homeMode==='live'||document.body.classList.contains('home-live-mode')||_bN()==='live_only';if(!cfg.inRest&&!forceInline){_e();_aX(section,cfg);return;}_be(section,cfg);}async function _cF(){try{const panelOk=await _a8();if(!panelOk)return;const maintenance=_aj();if(maintenance.enabled){_ap(false);setTimeout(()=>_a9(maintenance),220);return;}_cq();_b5(state.cardView,false);_aa();_cC();_J();const perms=_Q();if(perms.rest){if(!String(CONFIG.API||'').trim()&&!perms.matches){_ap(false);_at();return;}if((!Array.isArray(CATEGORIES)||!CATEGORIES.length)&&!perms.matches){_ap(false);_at();return;}}_aN();state.homeMode=_defaultHomeMode();if(perms.matches)_W();else _e();_initHomeMode();_ap(false);}catch(error){console.error('App init error:',error);_ap(false);const home=document.getElementById('qr');if(home&&!home.children.length){home.innerHTML='<div class="xo notice-warning"><span class="icon">warning</span><div><strong>تعذر تجهيز بعض الأقسام</strong><span>تم إخفاء شاشة التحميل حتى لا تبقى الصفحة معلقة. افتح Console لمعرفة الخطأ.</span></div></div>';}}}
/* === V7: use panel snapshot config.categories with OscarTV private/call adapter === */
function _oscarPanelApiUrl(){
const links=(panelConfig&&panelConfig.appLinks)||{};
return String(_b(
panelConfig&&panelConfig.contentApiUrl,
panelConfig&&panelConfig.restApiWorkerUrl,
panelConfig&&panelConfig.restWorkerUrl,
links.contentApiUrl,
CONFIG.API,
CONFIG.OSCAR_API,
''
)||'').trim().replace(/\/+$/,'');
}
function _oscarFirstNonEmpty(...values){
for(const value of values){
if(value===undefined||value===null)continue;
const text=String(value).trim();
if(text)return text;
}
return '';
}
function _oscarSettings(){
const cfg=_q('oscar');
let key='';
try{
const params=new URLSearchParams(location.search||'');
key=params.get('oscar_key')||params.get('api_key')||params.get('key')||SAFE_STORAGE.getItem('oscar_api_key')||'';
if(key)SAFE_STORAGE.setItem('oscar_api_key',key);
}catch(_){}
return{
apiUrl:_oscarFirstNonEmpty(cfg.apiUrl,panelConfig&&panelConfig.oscarApiUrl,_oscarPanelApiUrl(),CONFIG.OSCAR_API).replace(/\/+$/,''),
key:_oscarFirstNonEmpty(cfg.key,panelConfig&&panelConfig.oscarApiKey,key,CONFIG.OSCAR_KEY)
};
}
function _oscarEndpoint(kind){return kind==='series'?'series.show':kind==='episode'?'episodes.show':kind==='animeEpisode'?'anime.episodesShow':kind==='channel'?'channels.show':kind==='anime'?'anime.show':kind==='wrestling'?'wrestling.show':'movies.show';}
function _oscarPanelCategories(){
const raw=Array.isArray(panelConfig&&panelConfig.categories)?panelConfig.categories:(Array.isArray(CATEGORIES)?CATEGORIES:[]);
return raw.filter(c=>c&&c.enabled!==false).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
}
function _oscarSectionFromCategory(cat={}){
const key=String(cat.key||'').trim();
const base={key,title:String(cat.name||key||'قسم').trim(),icon:String(cat.icon||'movie')};
const map={
turkish_series:{endpoint:'series.list',kind:'series',params:{category:2,page:1}},
english_series:{endpoint:'series.list',kind:'series',params:{category:4,page:1}},
arabic_series:{endpoint:'series.list',kind:'series',params:{category:1,page:1}},
asian_series:{endpoint:'series.list',kind:'series',params:{category:5,page:1}},
tv_shows:{endpoint:'series.list',kind:'series',params:{category:3,page:1}},
indian_series:{endpoint:'series.list',kind:'series',params:{country:'IN',language:'hi',page:1}},
ramadan_2026_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2026,page:1,sort_by:'newest'}},
ramadan_2025_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2025,page:1,sort_by:'newest'}},
ramadan_2024_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2024,page:1,sort_by:'newest'}},
ramadan_2023_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2023,page:1,sort_by:'newest'}},
ramadan_2022_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2022,page:1,sort_by:'newest'}},
ramadan_2021_series:{endpoint:'series.list',kind:'series',params:{category:1,year:2021,page:1,sort_by:'newest'}},
english_movies:{endpoint:'movies.list',kind:'movie',params:{category:18,page:1,sort_by:'newest'}},
indian_movies:{endpoint:'movies.list',kind:'movie',params:{category:206,page:1,sort_by:'newest'}},
arabic_movies:{endpoint:'movies.list',kind:'movie',params:{category:3,page:1,sort_by:'newest'}},
turkish_movies:{endpoint:'movies.list',kind:'movie',params:{category:5,page:1,sort_by:'newest'}},
movie_series:{endpoint:'movies.list',kind:'movie',params:{category:18,page:1,sort_by:'newest'}},
documentary_movies:{endpoint:'movies.list',kind:'movie',params:{page:1,sort_by:'newest'}},
anime_series:{endpoint:'anime.list',kind:'anime',params:{page:1}},
anime_movies:{endpoint:'anime.list',kind:'anime',params:{page:1,type:'movie'}},
wrestling:{endpoint:'wrestling.list',kind:'wrestling',params:{page:1}}
};
let cfg=map[key];
if(!cfg&&/_movies$/i.test(key))cfg={endpoint:'movies.list',kind:'movie',params:{page:1,sort_by:'newest'}};
if(!cfg&&/_series$/i.test(key))cfg={endpoint:'series.list',kind:'series',params:{page:1,sort_by:'newest'}};
if(!cfg)return null;
return {...base,...cfg,params:{...(cfg.params||{})}};
}
async function _ensureOscarRestContent(){
const sections=_oscarShell('rest','الاستراحة','local_movies','الأقسام تأتي من لوحة الشبكة config.categories، مع إضافة آخر الحلقات وآخر الأفلام في الأعلى.');
if(!sections)return;
const topSections=[
{title:'آخر الحلقات',icon:'new_releases',endpoint:'episodes.latest',kind:'episode',params:{limit:24}},
{title:'آخر الأفلام',icon:'movie',endpoint:'movies.list',kind:'movie',params:{page:1,sort_by:'newest'}}
];
for(const cfg of topSections){await _renderOscarRemoteSection(sections,cfg);}
const categories=_oscarPanelCategories();
let count=0;
for(const cat of categories){
const cfg=_oscarSectionFromCategory(cat);
if(!cfg)continue;
count++;
await _renderOscarRemoteSection(sections,cfg);
}
if(!count)sections.appendChild(_a('div',{className:'oscar-empty',text:'لا توجد أقسام مفعلة في config.categories'}));
state.restContentReady=true;
}
async function _ensureAnimeContent(){
const sections=_oscarShell('anime','الأنمي','animation','واجهة أنمي مستقلة من OscarTV: آخر الحلقات ومكتبة الأنمي.');
if(!sections)return;
await _renderOscarRemoteSection(sections,{title:'آخر حلقات الأنمي',icon:'new_releases',endpoint:'anime.episodesLatest',kind:'animeEpisode',params:{limit:20}});
await _renderOscarRemoteSection(sections,{title:'مكتبة الأنمي',icon:'animation',endpoint:'anime.list',kind:'anime',params:{page:1}});
state.animeContentReady=true;
}
async function _openOscarEpisode(ep){
const token=_oscarToken(ep.url);if(!token)return;
_U('جاري تجهيز الحلقة من OscarTV...');
let raw={};
try{raw=_oscarDetail(await _oscarCall(_oscarEndpoint(token.kind),{id:token.id}));}catch(_){}
let sources=_oscarSources(raw,'watch');
if(!sources.length&&token.kind==='episode'){
try{sources=_oscarList(await _oscarCall('watchLinks',{episode_id:token.id}));sources=_oscarFlattenSources(sources,[]);}catch(_){}
}
const historyItem={title:_titleClean(`${state.currentDetails?.title||state.currentItem?.title||'مشاهدة'} - ${ep.title||''}`),poster:state.currentItem?.poster||state.currentDetails?.poster||'',url:ep.url,sourceUrl:state.currentItem?.url||ep.url,episodeUrl:ep.url,episode:ep.episode||_O(ep.title),watchUrl:ep.url};
_renderOscarSourcePicker(sources,ep.title||'الحلقة',historyItem,{actionMode:'watch'});
}
var __joaanOldGridOpen=_b1;
_b1=function(key,title){
const cfg=_oscarSectionFromCategory({key,name:title,icon:'grid_view',enabled:true,order:0});
if(cfg)return _oscarOpenGrid(cfg);
return __joaanOldGridOpen(key,title);
};
var __joaanOldLoadMore=_bP;
_bP=function(reset=false){
if(state&&state.grid&&state.grid.mode==='oscar')return _oscarLoadGrid(reset);
return __joaanOldLoadMore(reset);
};

/* === V9 Local file fix: read panel config directly, no URL key requirement === */
function _oscarPanelApiUrl(){
const links=(panelConfig&&panelConfig.appLinks)||{};
return String(_b(
panelConfig&&panelConfig.restApiWorkerUrl,
panelConfig&&panelConfig.restWorkerUrl,
panelConfig&&panelConfig.contentApiUrl,
links.contentApiUrl,
CONFIG.API,
'https://os-tv.joaantv.workers.dev/api/private/call'
)||'').trim().replace(/\/+$/,'');
}
function _oscarSettings(){
const cfg=_q('oscar');
let storedKey='';
try{storedKey=SAFE_STORAGE.getItem('oscar_api_key')||'';}catch(_){}
return{
apiUrl:_oscarFirstNonEmpty(cfg.apiUrl,panelConfig&&panelConfig.oscarApiUrl,_oscarPanelApiUrl(),CONFIG.OSCAR_API).replace(/\/+$/,''),
key:_oscarFirstNonEmpty(cfg.key,panelConfig&&panelConfig.oscarApiKey,CONFIG.OSCAR_KEY,storedKey)
};
}
async function _oscarFetchJson(url,withCreds=false){
const options={cache:'no-store',headers:{'Accept':'application/json'}};
if(withCreds)options.credentials='include';
const res=await fetch(url,options);
const text=await res.text();
let data=null;
try{data=text?JSON.parse(text):null;}catch(_){data={ok:false,message:text||'empty_response'};}
if(!res.ok){const msg=(data&&(_b(data.message,data.error,data.reason)))||text||('HTTP '+res.status);throw new Error('HTTP '+res.status+' - '+String(msg).slice(0,160));}
if(data&&(data.ok===false||data.status==='blocked'||data.error)){throw new Error(String(_b(data.message,data.error,data.reason,'api_error')).slice(0,160));}
return data;
}
async function _oscarCall(endpoint,params={}){
const settings=_oscarSettings();
if(!settings.apiUrl)throw new Error('Oscar API غير مضبوط من لوحة التحكم');
const url=new URL(settings.apiUrl.replace(/\/+$/,'')+'/'+String(endpoint).replace(/^\/+/,''),location.href);
Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&String(v)!=='')url.searchParams.set(k,String(v));});
if(settings.key&&!url.searchParams.has('key'))url.searchParams.set('key',settings.key);
try{
return await _oscarFetchJson(url.href,false);
}catch(firstError){
// لو الوركر يعتمد على كوكي تسجيل الدخول، نجرب مرة ثانية بالكوكي بدون ما نطلب من المستخدم يحط key في الرابط.
try{return await _oscarFetchJson(url.href,true);}catch(secondError){
console.warn('Oscar local fetch failed:',url.href,firstError,secondError);
throw firstError||secondError;
}}
}
function _oscarErrorText(error){
const msg=String(error&&error.message||error||'').trim();
if(/Failed to fetch|NetworkError|CORS/i.test(msg))return'تعذر الاتصال بالـAPI محلياً. تأكد أن الوركر يسمح CORS أو افتح الصفحة من استضافة HTTPS.';
if(/401|403|unauthorized|forbidden|key/i.test(msg))return'الـAPI رفض الطلب. تأكد أن ورکر Oscar يسمح بالوصول العام أو أضف المفتاح داخل إعدادات اللوحة وليس في الرابط.';
return msg?('تعذر تحميل هذا القسم: '+msg):'تعذر تحميل هذا القسم';
}
async function _renderOscarRemoteSection(parent,opts){
const section=_a('section',{className:'section'});
section.innerHTML=`<div class="xat"><h2 class="xaa"><span class="icon">${_c(opts.icon||'movie')}</span>${_c(opts.title)}</h2><button class="see-all" type="button">عرض الكل</button></div><div class="oscar-section-loading">جاري التحميل...</div>`;
parent.appendChild(section);
section.querySelector('.see-all')?.addEventListener('click',()=>_oscarOpenGrid(opts));
try{
const data=await _oscarCall(opts.endpoint,opts.params||{});
const items=_oscarList(data);
section.querySelector('.oscar-section-loading')?.remove();
const wrapper=_a('div',{className:'xaZ'});
const carousel=_a('div',{className:'carousel'});
if(!items.length)carousel.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى'}));
items.slice(0,18).forEach(raw=>carousel.appendChild(_bD(_oscarItem(raw,opts.kind||'movie'))));
wrapper.appendChild(carousel);
section.appendChild(wrapper);
}catch(error){
console.warn('Oscar section failed:',opts,error);
const box=section.querySelector('.oscar-section-loading');
if(box){box.textContent=_oscarErrorText(error);box.classList.add('oscar-section-error');}
}
}
async function _oscarLoadGrid(reset=false){
const container=$('#qp');
const moreBtn=$('#qq');
if(reset)_A(container,'جاري التحميل...','xaI');
if(moreBtn)moreBtn.disabled=true;
try{
const cfg=state.grid.oscar||{};
const params={...(cfg.params||{}),page:state.grid.page};
const items=_oscarList(await _oscarCall(cfg.endpoint,params)).map(raw=>_oscarItem(raw,cfg.kind||'movie'));
if(reset)state.gridItems=[];
state.gridItems=state.gridItems.concat(items);
_F();
if(moreBtn)moreBtn.style.display=items.length?'inline-flex':'none';
}catch(error){
console.warn('Oscar grid failed:',error);
if(reset)_A(container,_oscarErrorText(error),'xbs');
}finally{if(moreBtn)moreBtn.disabled=false;}
}

/* === V14 minimal OscarTV data/card fix: titles, images, click, episode/channel card shape === */
(function(){
const MEDIA_BASE='https://ostv-11-55.xyz/';
const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
const cleanText=v=>String(v??'').replace(/\s+/g,' ').trim();
const good=v=>{const s=cleanText(v);return s&&s!=='null'&&s!=='undefined'&&s!=='بدون عنوان';};
const first=(...vals)=>{for(const v of vals){if(good(v))return cleanText(v);}return '';};
const absMedia=v=>{
const s=cleanText(v); if(!s)return '';
if(/^(https?:|data:|blob:)/i.test(s))return s;
if(/^\/\//.test(s))return 'https:'+s;
if(/^\/?(uploads|storage)\//i.test(s)||/\.(webp|png|jpe?g|gif|svg)(\?.*)?$/i.test(s)){
try{return new URL(s.replace(/^\/+/,''),MEDIA_BASE).href;}catch(_){return s;}
}
return '';
};
const walkFind=(obj,keys,maxDepth=4)=>{
if(!obj||typeof obj!=='object'||maxDepth<0)return '';
for(const k of keys){ if(good(obj[k])) return obj[k]; }
for(const k of keys){
const snake=k.replace(/[A-Z]/g,m=>'_'+m.toLowerCase());
if(good(obj[snake])) return obj[snake];
}
const children=['series','show','movie','anime','channel','content','item','data'];
for(const c of children){ if(isObj(obj[c])){ const v=walkFind(obj[c],keys,maxDepth-1); if(good(v))return v; } }
return '';
};
const mediaKeys=['poster','posterUrl','poster_url','posterPath','poster_path','seriesPoster','animePoster','moviePoster','image','imageUrl','image_url','thumbnail','thumbnailUrl','thumbnail_url','thumb','still','logo','channelLogo','channel_logo','cover','banner','backdrop','backdropUrl','backdrop_url','photo'];
const bannerKeys=['banner','bannerUrl','banner_url','backdrop','backdropUrl','backdrop_url','cover','seriesBanner','animeBanner','movieBanner','thumbnail','poster','image'];
const idKeys=['id','movie_id','movieId','series_id','seriesId','episode_id','episodeId','channel_id','channelId','anime_id','animeId','item_id','itemId'];
const episodeKeys=['episode_number','episodeNumber','episode','number','ep','sort','position'];
const parentTitleKeys=['seriesTitle','series_title','animeTitle','anime_title','movieTitle','movie_title','showTitle','show_title','parentTitle','parent_title'];
const titleKeys=['title_ar','titleAr','name_ar','nameAr','arabic_title','arabicTitle','title','name','label','episode_title','episodeTitle','original_title','originalTitle'];
window._oscarPoster=function(raw={}){return absMedia(walkFind(raw,mediaKeys))||'';};
window._oscarBanner=function(raw={}){return absMedia(walkFind(raw,bannerKeys))||_oscarPoster(raw)||'';};
window._oscarId=function(raw={}){return first(walkFind(raw,idKeys), raw.slug, raw.uid, raw.uuid);};
window._oscarTitle=function(raw={},kind='movie'){
const parent=first(walkFind(raw,parentTitleKeys), isObj(raw.series)&&walkFind(raw.series,titleKeys), isObj(raw.anime)&&walkFind(raw.anime,titleKeys), isObj(raw.movie)&&walkFind(raw.movie,titleKeys), isObj(raw.channel)&&walkFind(raw.channel,titleKeys));
const direct=first(walkFind(raw,titleKeys));
const epNo=first(walkFind(raw,episodeKeys));
if(kind==='episode'||raw.__oscarKind==='episode'||epNo){
const epLabel=epNo?`الحلقة ${epNo}`:'الحلقة';
if(direct && parent && direct!==parent && !/^الحلقة\s*\d+/i.test(direct))return _titleClean(`${parent} - ${direct}`);
if(parent)return _titleClean(`${parent} - ${epLabel}`);
return _titleClean(direct && direct!=='بدون عنوان'?direct:epLabel);
}
return _titleClean(direct||parent||'بدون عنوان');
};
window._oscarKindUrl=function(kind,id){return `oscar:${kind||'movie'}:${encodeURIComponent(String(id||''))}`;};
window._oscarItem=function(raw={},kind='movie'){
raw=isObj(raw)?raw:{};
kind=raw.__oscarKind||kind||'movie';
const id=_oscarId(raw)||first(raw.url,raw.link,raw.slug)||Math.random().toString(36).slice(2);
const url=_oscarKindUrl(kind,id);
const title=_oscarTitle(raw,kind);
const poster=_oscarPoster(raw)||_oscarBanner(raw)||CONFIG.FALLBACK_POSTER;
const ep=first(walkFind(raw,episodeKeys));
const safeRaw={...raw,__oscarKind:kind,__oscarId:id,title,name:title,poster,image:poster,thumbnail:poster,url,link:url,episode:ep,episode_number:ep};
return {title,rawTitle:title,poster,url,rating:first(raw.rating,raw.imdb_rating,raw.vote_average,''),quality:first(raw.quality,raw.quality_source,raw.resolution,raw.source,''),type:kind==='channel'?'قناة':kind==='anime'?'أنمي':kind==='episode'?'حلقة':kind==='series'?'مسلسل':'فيلم',year:first(raw.release_year,raw.releaseYear,raw.year,''),episode:ep,raw:safeRaw};
};
const oldFlatten=window._oscarFlattenSources;
window._oscarFlattenSources=function(value,bag=[]){
if(!value)return bag;
if(typeof value==='string'){
const u=_b2(value); if(u)bag.push({label:'رئيسي',quality:'',url:u,originalUrl:u}); return bag;
}
if(Array.isArray(value)){value.forEach(v=>_oscarFlattenSources(v,bag));return bag;}
if(isObj(value)){
const direct=first(value.url,value.link,value.file,value.src,value.video,value.watch_url,value.watchUrl,value.download_url,value.downloadUrl,value.stream,value.stream_url,value.streamUrl,value.hls,value.m3u8,value.iframe,value.embed);
if(direct){const u=_b2(direct); if(u)bag.push({label:first(value.label,value.name,value.server,value.server_name,value.quality,value.resolution,value.title,'رابط'),quality:String(first(value.quality,value.resolution,'')).replace('p',''),url:u,originalUrl:u});}
for(const key of ['links','items','sources','qualities','servers','videos','downloads','streams','watchLinks','watch_links','downloadLinks','download_links']) if(value[key]) _oscarFlattenSources(value[key],bag);
return bag;
}
return oldFlatten?oldFlatten(value,bag):bag;
};
window._oscarSources=function(raw={},mode='watch'){
const keys=mode==='download'?['download_links','downloadLinks','downloads','download','download_urls','links','servers','sources']:['watch_links','watchLinks','watch','videos','servers','links','qualities','sources','stream','streams','url','link','hls','m3u8'];
const bag=[]; keys.forEach(k=>_oscarFlattenSources(raw&&raw[k],bag)); if(raw&&mode==='watch')_oscarFlattenSources(raw,bag);
const seen=new Set(); return bag.filter(s=>{const u=s&&s.url;if(!u||seen.has(u))return false;seen.add(u);s.label=s.label||s.quality&&`${s.quality}p`||'رئيسي';return true;});
};
window._oscarEpisodes=function(raw={}){
const found=[];
const push=(ep,season={})=>{if(!isObj(ep))return;const item=_oscarItem({...ep,season_id:season.id||ep.season_id,season_title:season.title||season.name},'episode');const no=Number(item.episode||walkFind(ep,episodeKeys)||0);found.push({title:item.title,poster:item.poster,url:item.url,episode:item.episode||no||'',season:Number(season.number||season.season_number||season.id||0),order:no||found.length+1,raw:item.raw});};
if(Array.isArray(raw.episodes))raw.episodes.forEach(ep=>push(ep));
if(Array.isArray(raw.items))raw.items.forEach(ep=>{if(walkFind(ep,episodeKeys))push(ep);});
if(Array.isArray(raw.seasons))raw.seasons.forEach(season=>{const eps=Array.isArray(season.episodes)?season.episodes:Array.isArray(season.items)?season.items:[];eps.forEach(ep=>push(ep,season));});
return found.sort((a,b)=>(Number(a.season)-Number(b.season))||(Number(a.order)-Number(b.order)));
};
window._oscarDetails=function(raw={},kind='movie',hint={}){
const item=_oscarItem(raw,kind);
return {title:item.title||hint.title,poster:item.poster||hint.poster,banner:_oscarBanner(raw)||item.poster||hint.poster,rating:first(raw.rating,raw.imdb_rating,hint.rating,'N/A'),year:first(raw.release_year,raw.releaseYear,raw.year,hint.year,'----'),country:first(raw.country_name,raw.countryName,raw.country,hint.country,'غير محدد'),type:kind==='channel'?'قناة مباشرة':kind==='anime'?'أنمي':kind==='series'?'مسلسل':kind==='episode'?'حلقة':'فيلم',quality:first(raw.quality,raw.quality_source,hint.quality,'غير محدد'),plot:first(raw.story,raw.description,raw.overview,raw.plot,raw.synopsis,'لا تتوفر قصة لهذا العمل.'),watchSources:_oscarSources(raw,'watch'),downloadSources:_oscarSources(raw,'download'),episodes:_oscarEpisodes(raw),team:_oscarPeople? _oscarPeople(raw):[],raw};
};
function cardFor(rawOrItem,kind){const item=rawOrItem&&rawOrItem.url&&rawOrItem.raw?rawOrItem:_oscarItem(rawOrItem,kind);const card=_bD(item);const k=(item.raw&&item.raw.__oscarKind)||kind||'movie';card.classList.add('oscar-v14-card',`oscar-kind-${k}`);return card;}
window._renderOscarStaticSection=function(parent,{title,icon='movie',items=[],kind='movie',seeAll=null}){
const section=_a('section',{className:'section oscar-v14-section'});const header=_a('div',{className:'xat'});const h=_a('h2',{className:'xaa'});h.append(_a('span',{className:'icon',text:icon}),document.createTextNode(title));header.appendChild(h);if(seeAll){const all=_a('button',{className:'see-all',text:'عرض الكل',attrs:{type:'button'}});all.addEventListener('click',seeAll);header.appendChild(all);}const wrapper=_a('div',{className:'xaZ'});const carousel=_a('div',{className:'carousel'});if(!items.length)carousel.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى متاح حالياً'}));items.slice(0,18).forEach(raw=>carousel.appendChild(cardFor(raw,kind)));wrapper.appendChild(carousel);section.append(header,wrapper);parent.appendChild(section);
};
window._renderOscarRemoteSection=async function(parent,opts){
const section=_a('section',{className:'section oscar-v14-section'});section.innerHTML=`<div class="xat"><h2 class="xaa"><span class="icon">${_c(opts.icon||'movie')}</span>${_c(opts.title)}</h2><button class="see-all" type="button">عرض الكل</button></div><div class="oscar-section-loading">جاري التحميل...</div>`;parent.appendChild(section);section.querySelector('.see-all')?.addEventListener('click',()=>_oscarOpenGrid(opts));
try{const data=await _oscarCall(opts.endpoint,opts.params||{});const items=_oscarList(data);section.querySelector('.oscar-section-loading')?.remove();const wrapper=_a('div',{className:'xaZ'});const carousel=_a('div',{className:'carousel'});if(!items.length)carousel.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى'}));items.slice(0,18).forEach(raw=>carousel.appendChild(cardFor(raw,opts.kind||'movie')));wrapper.appendChild(carousel);section.appendChild(wrapper);}catch(error){console.warn('Oscar section failed:',opts.endpoint,error);const box=section.querySelector('.oscar-section-loading');if(box){box.textContent='تعذر تحميل هذا القسم';box.classList.add('oscar-section-error');}}
};
const oldF=window._F;
window._F=function(){
const container=$('#qp'); if(!container)return oldF&&oldF(); container.textContent=''; const items=(state.gridItems||[]).map(x=>x&&x.raw&&x.url?x:_l(x&&x.raw||x)); if(!items.length){_A(container,'لا توجد نتائج','xaz','search_off');return;}
if(state.grid.mode==='oscar'){const kind=state.grid.oscar?.kind||'movie';items.forEach(item=>container.appendChild(cardFor(item,kind)));return;}
items.forEach(item=>container.appendChild(_bD(item)));
};
window._oscarLoadGrid=async function(reset=false){const container=$('#qp');const moreBtn=$('#qq');if(reset)_A(container,'جاري التحميل...','xaI');if(moreBtn)moreBtn.disabled=true;try{const cfg=state.grid.oscar||{};const params={...(cfg.params||{}),page:state.grid.page};const items=_oscarList(await _oscarCall(cfg.endpoint,params)).map(raw=>_oscarItem(raw,cfg.kind||'movie'));if(reset)state.gridItems=[];state.gridItems=state.gridItems.concat(items);_F();if(moreBtn)moreBtn.style.display=items.length?'inline-flex':'none';}catch(error){console.warn('Oscar grid failed:',error);if(reset)_A(container,'تعذر تحميل القسم','xbs');}finally{if(moreBtn)moreBtn.disabled=false;}};
const style=document.createElement('style');style.id='v14OscarMinimalStyle';style.textContent=`
.oscar-v14-section .carousel{align-items:flex-start}.oscar-v14-card{cursor:pointer}.oscar-kind-episode{width:205px!important;flex-basis:205px!important}.oscar-kind-episode .xr{aspect-ratio:16/9!important;border-radius:14px!important}.oscar-kind-episode .xr img{object-fit:cover!important}.oscar-kind-episode .xaP{text-align:right!important;font-size:11.5px!important;line-height:1.45!important;min-height:34px}.oscar-kind-channel{width:116px!important;flex-basis:116px!important}.oscar-kind-channel .xr{aspect-ratio:1/1!important;border-radius:20px!important;padding:12px!important;background:linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.025))!important}.oscar-kind-channel .xr img{object-fit:contain!important;border-radius:14px}.oscar-kind-channel .xaP{font-size:11px!important}.oscar-kind-channel .xbp,.oscar-kind-channel .xcB{display:none!important}#qae .oscar-kind-episode{width:100%!important;max-width:240px!important}#qae .oscar-kind-episode .xr{aspect-ratio:16/9!important}#qae .oscar-kind-channel{width:100%!important;max-width:130px!important}#qae .oscar-kind-channel .xr{aspect-ratio:1/1!important}@media(max-width:768px){.oscar-kind-episode{width:178px!important;flex-basis:178px!important}.oscar-kind-channel{width:104px!important;flex-basis:104px!important}.oscar-kind-episode .xaP{font-size:10.8px!important}}
`;document.head.appendChild(style);
})();

if(document.readyState==='loading'){window.addEventListener('DOMContentLoaded',_cF,{once:true});}else{setTimeout(_cF,0);}(function initBottomNavAutoHide(){let lastY=window.scrollY||0;let ticking=false;function _cc(){const nav=document.getElementById('qk');if(!nav||window.innerWidth>768){ticking=false;return;}const currentY=window.scrollY||0;const scrollingDown=currentY>lastY+8;const scrollingUp=currentY<lastY-8;const nearTop=currentY<80;if(scrollingDown&&!nearTop)nav.classList.add('nav-hidden');if(scrollingUp||nearTop)nav.classList.remove('nav-hidden');lastY=currentY;ticking=false;}window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(_cc);ticking=true;}},{passive:true});window.addEventListener('resize',()=>{const nav=document.getElementById('qk');if(nav&&window.innerWidth>768)nav.classList.remove('nav-hidden');});})();

(()=>{
const W = window;
const first=(...vals)=>{for(const v of vals){if(v===0||v===false)return String(v);if(v!==undefined&&v!==null&&String(v).trim()!=='')return String(v).trim();}return'';};
const arr=v=>Array.isArray(v)?v:[];
const esc=s=>{try{return _c(String(s??''));}catch(_){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}};
const media=s=>{s=first(s);if(!s)return'';if(/^https?:\/\//i.test(s)||/^data:/i.test(s))return s;if(s.startsWith('/uploads/'))return'https://ostv-11-55.xyz'+s;if(s.startsWith('uploads/'))return'https://ostv-11-55.xyz/'+s;try{return _b2(s)||s;}catch(_){return s;}};
const titleOf=(r,kind='movie')=>first(kind==='episode'?first(r.series_title,r.anime_title,r.title_ar,r.title,r.name):'',r.title_ar,r.name_ar,r.title,r.name,r.title_en,r.original_title,r.series_title,r.anime_title,r.channel_name,'بدون عنوان');
const idOf=(r,kind='movie')=>first(r.__oscarId,r.id,kind==='movie'?r.item_id:'',kind==='series'?r.item_id:'',r.movie_id,r.series_id,r.episode_id,r.channel_id,r.anime_id,r.item_id);
const kindOf=(r,fb='movie')=>{let k=first(r.__oscarKind,r.item_type,r.typeKey,fb);if(k==='anime_episode')k='animeEpisode';if(k==='anime_episode_latest')k='animeEpisode';return k;};
const posterOf=(r,kind='movie')=>media(first(kind==='episode'?r.series_poster:'',kind==='animeEpisode'?r.anime_poster:'',r.poster,r.logo,r.cover,r.image,r.thumbnail,r.bg_image,r.banner,r.series_poster,r.anime_poster));
const bannerOf=(r,kind='movie')=>media(first(kind==='episode'?r.thumbnail:'',kind==='animeEpisode'?r.thumbnail:'',r.banner,r.backdrop,r.cover,r.bg_image,r.image,r.thumbnail,r.series_banner,r.anime_banner,posterOf(r,kind)));
const asTime=v=>{v=first(v);if(!v)return'';if(/^\d+$/.test(v)){const n=Number(v);if(n>0&&n<50000){const h=Math.floor(n/3600),m=Math.floor((n%3600)/60),s=n%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`;}}return v;};
const qNum=q=>Number(String(q||'').replace(/[^0-9]/g,''))||0;
const qLabel=q=>{q=first(q);return q?String(q).toUpperCase().replace('P','p').replace('p','P'):'رابط';};
const episodeSub=r=>[first(r.episode_number,r.number,r.episode)?`الحلقة ${first(r.episode_number,r.number,r.episode)}`:'',first(r.season_number,r.season)?`الموسم ${first(r.season_number,r.season)}`:''].filter(Boolean).join(' — ');
const metaOf=r=>[first(r.country,r.country_name),first(r.release_year,r.year)].filter(Boolean).join(' • ');
function itemFrom(raw,kindHint='movie'){
const kind=kindOf(raw,kindHint);
const id=idOf(raw,kind)||Math.random().toString(36).slice(2);
return {title:titleOf(raw,kind),poster:posterOf(raw,kind),banner:bannerOf(raw,kind),rating:first(raw.rating,raw.imdb_rating,raw.omdb_imdb_rating),quality:first(raw.quality_source,raw.quality,raw.source),year:first(raw.release_year,raw.year),type:kind,episode:first(raw.episode_number,raw.number,raw.episode),url:`oscar:${kind}:${id}`,raw:{...raw,__oscarKind:kind,__oscarId:id}};
}
function img(src,alt,cls){const d=document.createElement('div');d.className=cls;const i=document.createElement('img');i.src=_az(src||CONFIG.FALLBACK_POSTER);i.alt=alt||'';i.loading='lazy';i.onerror=()=>{i.src=CONFIG.FALLBACK_POSTER};d.appendChild(i);return d;}
function openUrl(url){if(!url)return;try{window.open(url,'_blank','noopener');}catch(_){location.href=url;}}
function card(raw,kindHint='movie'){
const it=raw&&raw.url&&raw.raw?raw:itemFrom(raw,kindHint);const r=it.raw||raw||{};const k=it.raw?.__oscarKind||it.type||kindHint;
const c=document.createElement('article');c.className=`v19-card v19-${k}`;c.dir='rtl';c.addEventListener('click',()=>_bk(it.url,it));
if(k==='episode'||k==='animeEpisode'){
const m=document.createElement('div');m.className='v19-ep-media';m.appendChild(img(bannerOf(r,k)||it.banner||it.poster,it.title,'v19-fill'));m.appendChild(Object.assign(document.createElement('div'),{className:'v19-ep-shade'}));
const dur=asTime(r.duration);if(dur){const d=document.createElement('b');d.className='v19-duration';d.textContent=dur;m.appendChild(d);}m.appendChild(Object.assign(document.createElement('span'),{className:'v19-play',textContent:'▶'}));
const mini=posterOf(r,k);if(mini)m.appendChild(img(mini,it.title,'v19-mini'));
const copy=document.createElement('div');copy.className='v19-ep-copy';copy.innerHTML=`<h3>${esc(it.title)}</h3><p>${esc(episodeSub(r))}</p>`;m.appendChild(copy);c.appendChild(m);return c;
}
if(k==='channel'){
const m=document.createElement('div');m.className='v19-channel-logo';m.appendChild(img(first(r.logo,r.cover,it.poster),it.title,'v19-fill-contain'));c.appendChild(m);const h=document.createElement('h3');h.textContent=it.title;h.className='v19-channel-title';c.appendChild(h);return c;
}
if(k==='series'||k==='anime'){
const m=document.createElement('div');m.className='v19-series-media';m.appendChild(img(it.poster||it.banner,it.title,'v19-fill'));m.appendChild(Object.assign(document.createElement('div'),{className:'v19-series-grad'}));
const count=first(r.episode_count,r.episodes_count,r.episodesCount);if(count){const p=document.createElement('b');p.className='v19-count';p.innerHTML=`${esc(count)} <span class="icon">play_arrow</span>`;m.appendChild(p);}const h=document.createElement('h3');h.textContent=it.title;m.appendChild(h);c.appendChild(m);return c;
}
const m=document.createElement('div');m.className='v19-poster-media';m.appendChild(img(it.poster||it.banner,it.title,'v19-fill'));
const stack=document.createElement('div');stack.className='v19-badges';const qs=first(r.quality_source,it.quality);if(qs)stack.innerHTML+=`<span class="red">${esc(qs)}</span>`;const ct=first(r.content_type_label,(r.content_type==='subtitled'?'مترجم':(r.content_type==='original'?'أصلي':'')));if(ct)stack.innerHTML+=`<span class="blue">${esc(ct)}</span>`;const age=first(r.age_rating);if(age)stack.innerHTML+=`<span class="orange">${esc(age)}</span>`;if(stack.children.length)m.appendChild(stack);
const rt=first(r.rating,r.omdb_imdb_rating);if(rt&&rt!=='0'&&rt!=='0.0'){const b=document.createElement('b');b.className='v19-rating';b.innerHTML=`${esc(rt)} <span class="icon">star</span>`;m.appendChild(b);}c.appendChild(m);const h=document.createElement('h3');h.className='v19-poster-title';h.textContent=it.title;c.appendChild(h);const meta=metaOf(r);if(meta){const p=document.createElement('p');p.className='v19-meta';p.textContent=meta;c.appendChild(p);}return c;
}
function sectionKind(s){const t=first(s.section_type).toLowerCase();if(t.includes('episode'))return'episode';if(t.includes('series'))return'series';if(t.includes('channel'))return'channel';if(t.includes('anime'))return'anime';return'movie';}
function gridOptsFromHomeSection(s){const t=first(s.section_type).toLowerCase();const kind=sectionKind(s);const p={page:1};const f=s.content_filters||{};const cat=first(f.category_id,s.content_category_filter);if(cat&&cat!=='0')p.category=cat;if(s.sort_by)p.sort_by=s.sort_by;if(t==='latest_episodes')return{endpoint:'episodes.latest',kind:'episode',params:{limit:s.max_items||30},title:s.title_ar||s.title_en};if(t.includes('movie'))return{endpoint:'movies.list',kind:'movie',params:p,title:s.title_ar||s.title_en};if(t.includes('series'))return{endpoint:'series.list',kind:'series',params:p,title:s.title_ar||s.title_en};if(t.includes('channel'))return{endpoint:'channels.list',kind:'channel',params:p,title:s.title_ar||s.title_en};return null;}
function openStaticGrid(title,items,kind){_b8();state.grid={mode:'oscarStatic',key:'static',title,page:1,oscar:{kind}};state.gridItems=items.map(x=>itemFrom(x,kindOf(x,kind)));$('#qr').classList.add('hidden');$('#qae').classList.remove('hidden');$('#qaB').textContent=title;$('#qq').style.display='none';_F();}
W._renderOscarHomeSection=function(parent,s){const title=first(s.title_ar,s.title_en,'قسم');const kind=sectionKind(s);const items=arr(s.items);const sec=_a('section',{className:'v19-section'});const head=_a('div',{className:'v19-section-head'});const h=_a('h2',{className:'v19-section-title',text:title});const all=_a('button',{className:'v19-see',text:'عرض الكل',attrs:{type:'button'}});const opts=gridOptsFromHomeSection(s);all.addEventListener('click',()=>opts?_oscarOpenGrid(opts):openStaticGrid(title,items,kind));head.append(h,all);const row=_a('div',{className:`v19-row is-${kind}`});if(!items.length)row.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى'}));items.slice(0,s.max_items||20).forEach(x=>row.appendChild(card({...x,__oscarKind:first(x.item_type)||kind},first(x.item_type)||kind)));sec.append(head,row);parent.appendChild(sec);};
W._renderOscarRemoteSection=async function(parent,opts){const sec=_a('section',{className:'v19-section'});const head=_a('div',{className:'v19-section-head'});head.append(_a('h2',{className:'v19-section-title',text:opts.title}),_a('button',{className:'v19-see',text:'عرض الكل',attrs:{type:'button'}}));head.querySelector('button').addEventListener('click',()=>_oscarOpenGrid(opts));const row=_a('div',{className:`v19-row is-${opts.kind||'movie'} v19-skel-row`});row.innerHTML='<i class="skeleton"></i><i class="skeleton"></i><i class="skeleton"></i>';sec.append(head,row);parent.appendChild(sec);try{const items=_oscarList(await _oscarCall(opts.endpoint,opts.params||{}));row.textContent='';row.classList.remove('v19-skel-row');items.slice(0,20).forEach(x=>row.appendChild(card(x,opts.kind||'movie')));if(!row.children.length)row.appendChild(_a('div',{className:'oscar-empty',text:'لا يوجد محتوى'}));}catch(e){console.warn('section fail',opts,e);row.textContent='';row.classList.remove('v19-skel-row');row.appendChild(_a('div',{className:'oscar-section-error',text:'تعذر تحميل هذا القسم'}));}};
W._ensureOscarRestContent=async function(){const s=_oscarShell('rest','الاستراحة','local_movies','');if(!s)return;const k='<section class="v19-section"><div class="v19-skel-title skeleton"></div><div class="v19-skel-row"><i class="skeleton"></i><i class="skeleton"></i><i class="skeleton"></i></div></section>';s.innerHTML=`<div class="v19-group">${k}${k}${k}</div>`;try{const h=_oscarDetail(await _oscarCall('home',{})),l=arr(h.sections).filter(x=>arr(x.items).length&&!x.hide_title).sort((a,b)=>(+a.display_order||0)-(+b.display_order||0));if(!l.length)throw 0;s.textContent='';const t=x=>first(x.title_ar,x.title_en,'قسم'),n=x=>t(x).replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/[ً-ْـ🔥]/g,'').replace(/\s+/g,' ').trim(),u=new Set(),g=a=>{const b=_a('div',{className:'v19-group'});a.forEach(v=>{const i=l.findIndex((x,j)=>!u.has(j)&&n(x)===v);if(i>-1){u.add(i);_renderOscarHomeSection(b,l[i])}});if(b.children.length)s.appendChild(b)};'افلام رائجه|الاكثر مشاهده;احدث الحلقات|احدث الحلقات الاجنبيه|احدث الحلقات العربيه|احدث الحلقات التركيه|احدث الحلقات الاسيويه;احدث الافلام الاجنبيه|احدث الافلام العربيه;احدث الاضافات الاجنبيه|احدث الاضافات التركيه|احدث الاضافات العربيه|احدث الاضافات الاسيويه;مسلسلات اجنبيه تعرض|مسلسلات عربيه تعرض|مسلسلات تركيه تعرض|مسلسلات اسيويه تعرض'.split(';').forEach(x=>g(x.split('|')));const b=_a('div',{className:'v19-group'});s.appendChild(b);await _renderOscarRemoteSection(b,{title:'رمضان 2026',endpoint:'series.list',kind:'series',params:{category:1,year:2026,page:1,sort_by:'newest'}});await _renderOscarRemoteSection(b,{title:'برامج تلفزيونية',endpoint:'series.list',kind:'series',params:{category:3,page:1}});const r=l.filter((x,i)=>!u.has(i));for(let i=0;i<r.length;i+=3){const b=_a('div',{className:'v19-group'});r.slice(i,i+3).forEach(x=>_renderOscarHomeSection(b,x));s.appendChild(b)}}catch(e){s.textContent='';await _renderOscarRemoteSection(s,{title:'آخر الحلقات',endpoint:'episodes.latest',kind:'episode',params:{limit:24}})}state.restContentReady=true;};
W._ensureAnimeContent=async function(){const sections=_oscarShell('anime','الأنمي','animation','');if(!sections)return;try{const home=_oscarDetail(await _oscarCall('anime.home',{}));const list=arr(home.sections).filter(s=>arr(s.items).length).sort((a,b)=>(+a.display_order||0)-(+b.display_order||0));if(list.length){for(const s of list){const kind=sectionKind(s)==='episode'?'animeEpisode':(sectionKind(s)==='series'?'anime':sectionKind(s));_renderOscarHomeSection(sections,{...s,items:s.items.map(x=>({...x,__oscarKind:kind}))});}}else throw new Error('empty_anime_home');}catch(e){console.warn('anime home fallback',e);await _renderOscarRemoteSection(sections,{title:'آخر حلقات الأنمي',endpoint:'anime.episodesLatest',kind:'animeEpisode',params:{limit:24}});await _renderOscarRemoteSection(sections,{title:'مكتبة الأنمي',endpoint:'anime.list',kind:'anime',params:{page:1}});}state.animeContentReady=true;};
W._ensureLiveContent=async function(){const sections=_oscarShell('live','بث مباشر','live_tv','');if(!sections)return;try{const collections=_oscarList(await _oscarCall('channels.collections',{}));if(collections.length)_renderOscarHomeSection(sections,{title_ar:'تصنيفات القنوات',section_type:'channels',items:collections.map(x=>({...x,__oscarKind:'channel'})),max_items:20});}catch(e){}await _renderOscarRemoteSection(sections,{title:'القنوات',endpoint:'channels.list',kind:'channel',params:{page:1}});state.liveContentReady=true;};
W._F=function(){const c=$('#qp');if(!c)return;c.textContent='';const items=(state.gridItems||[]);if(!items.length){_A(c,'لا توجد نتائج','xaz','search_off');return;}if(String(state.grid.mode||'').startsWith('oscar')){const g=document.createElement('div');g.className='v19-grid';items.forEach(x=>g.appendChild(card(x,x.raw?.__oscarKind||state.grid.oscar?.kind||'movie')));c.appendChild(g);return;}items.forEach(x=>c.appendChild(_bD(x)));};
W._oscarLoadGrid=async function(reset=false){const c=$('#qp'),more=$('#qq');if(reset)_A(c,'جاري التحميل...','xaI');if(more)more.disabled=true;try{const cfg=state.grid.oscar||{};const params={...(cfg.params||{}),page:state.grid.page};const items=_oscarList(await _oscarCall(cfg.endpoint,params)).map(x=>itemFrom(x,cfg.kind||kindOf(x,'movie')));if(reset)state.gridItems=[];state.gridItems=state.gridItems.concat(items);_F();if(more)more.style.display=items.length?'inline-flex':'none';}catch(e){console.warn('grid fail',e);if(reset)_A(c,'تعذر تحميل القسم','xbs');}finally{if(more)more.disabled=false;}};
function token(url){const p=String(url||'').split(':');return p[0]==='oscar'?{kind:p[1]||'movie',id:p.slice(2).join(':')}:null;}
W._oscarToken=token;
/* Stage 5B: legacy V19 detail renderer removed; V28 handles movies, series and episodes, V35 handles channels. */
const oldBP=W._bP;W._bP=async function(reset=false){if(state.grid.key&&state.grid.key.startsWith('search:')){const term=state.grid.key.slice(7);const c=$('#qp'),more=$('#qq');if(reset){_A(c,'جاري البحث...','xaI');state.gridItems=[];}if(more)more.disabled=true;try{const page=state.grid.page||1;const defs=[['movies.list','movie'],['series.list','series'],['anime.list','anime'],['channels.list','channel']];const batches=await Promise.all(defs.map(([ep,k])=>_oscarCall(ep,{search:term,page}).then(d=>_oscarList(d).map(x=>itemFrom(x,k))).catch(()=>[])));state.grid.mode='oscarSearch';state.gridItems=state.gridItems.concat(...batches);_F();if(more)more.style.display=batches.some(b=>b.length)?'inline-flex':'none';}finally{if(more)more.disabled=false;}return;}return oldBP?oldBP(reset):undefined;};
const style=document.createElement('style');style.id='v19RealApiStyle';style.textContent=`
#qi[data-mode] .library-head{display:none!important}#qi[data-mode] .library-shell{background:transparent!important;border:0!important;padding:0!important;box-shadow:none!important}#qi[data-mode] .library-sections{gap:10px!important}.v19-section{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.025))!important;border:1px solid rgba(255,255,255,.08)!important;border-radius:7px!important;padding:11px 10px 8px!important;margin:0 0 10px!important;box-shadow:0 9px 22px rgba(0,0,0,.22)!important}.v19-group{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.022));border:1px solid rgba(255,255,255,.08);border-radius:7px;padding:0 10px;margin:0 0 10px;overflow:hidden;box-shadow:0 9px 22px rgba(0,0,0,.22)}.v19-group .v19-section{border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding:11px 0 8px!important;margin:0!important}.v19-group .v19-section:not(:last-child){border-bottom:1px solid rgba(255,255,255,.08)!important}.v19-section-head{direction:rtl;display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}.v19-section-title{position:relative;margin:0;padding-right:12px;color:#fff;font-size:18px!important;font-weight:900;line-height:1.15}.v19-section-title:after{content:'';position:absolute;right:0;top:2px;bottom:2px;width:5px;border-radius:9px;background:#f20b18;box-shadow:0 0 14px rgba(242,11,24,.45)}.v19-see{border:0;background:transparent;color:#e42834;font-size:14px;font-weight:900}.v19-skel-title{width:42%;height:18px;border-radius:6px;margin:2px 0 10px}.v19-skel-row{display:flex!important;gap:10px!important;overflow:hidden!important}.v19-skel-row>i{display:block;flex:0 0 128px;aspect-ratio:2/3;border-radius:10px}.v19-row{direction:rtl;display:flex;gap:12px;overflow-x:auto;overflow-y:hidden;padding:2px 1px 8px;scrollbar-width:none}.v19-row::-webkit-scrollbar{display:none}.v19-card{flex:0 0 auto;cursor:pointer;color:#fff;min-width:0}.v19-fill,.v19-fill-contain{width:100%;height:100%}.v19-fill img{width:100%;height:100%;object-fit:cover}.v19-fill-contain img{width:100%;height:100%;object-fit:contain}.v19-episode,.v19-animeEpisode{width:178px}.v19-ep-media{position:relative;aspect-ratio:16/9;border-radius:16px;overflow:hidden;background:#18181d}.v19-ep-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 15%,rgba(0,0,0,.22) 50%,rgba(0,0,0,.88))}.v19-duration{position:absolute;top:8px;left:8px;background:rgba(0,0,0,.62);padding:5px 7px;border-radius:8px;font-size:12px}.v19-play{position:absolute;left:50%;top:48%;transform:translate(-50%,-50%);font-size:30px;text-shadow:0 2px 10px #000}.v19-mini{position:absolute;right:8px;bottom:8px;width:38px;height:54px;border-radius:8px;overflow:hidden;box-shadow:0 8px 18px #000}.v19-mini img{width:100%;height:100%;object-fit:cover}.v19-ep-copy{position:absolute;right:52px;left:8px;bottom:8px;text-align:right}.v19-ep-copy h3{margin:0;color:#fff;font-size:13px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v19-ep-copy p{margin:2px 0 0;color:rgba(255,255,255,.72);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v19-movie,.v19-series,.v19-anime{width:128px}.v19-poster-media,.v19-series-media{position:relative;aspect-ratio:2/3;border-radius:17px;overflow:hidden;background:#19191d}.v19-series-grad{position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.9))}.v19-series-media h3{position:absolute;right:10px;left:10px;bottom:10px;margin:0;font-size:14px;font-weight:900;text-align:right;line-height:1.2}.v19-count{position:absolute;top:8px;right:8px;background:rgba(60,60,65,.8);border-radius:8px;padding:4px 7px;font-size:11px}.v19-badges{position:absolute;top:7px;left:7px;display:flex;flex-direction:column;gap:5px}.v19-badges span,.v19-rating{border-radius:7px;padding:4px 6px;font-size:10px;font-weight:900}.v19-badges .red{background:#df1f2f}.v19-badges .blue{background:#2eb8d3}.v19-badges .orange{background:#f58b22}.v19-rating{position:absolute;top:7px;right:7px;background:rgba(55,58,64,.82)}.v19-rating .icon{font-size:13px;color:#ffd44d}.v19-poster-title{margin:8px 0 0;text-align:center;color:#fff;font-size:13px;font-weight:900;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.v19-meta{margin:4px 0 0;text-align:center;color:rgba(255,255,255,.55);font-size:10px;font-weight:700}.v19-channel{width:104px}.v19-channel-logo{height:104px;background:#222;border-radius:18px;padding:12px}.v19-channel-title{text-align:center;font-size:12px;margin:7px 0 0}.v19-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.v19-grid .v19-card{width:100%}.v19-grid .v19-episode,.v19-grid .v19-animeEpisode{grid-column:span 2;width:100%}#qu{display:none!important}#ostv19Extras{margin-top:18px}.v19-links{margin-top:22px}.v19-links h3{position:relative;padding-right:12px;margin:0 0 14px;color:#fff;font-size:20px;font-weight:900}.v19-links h3:after{content:'';position:absolute;right:0;top:2px;bottom:2px;width:5px;border-radius:8px;background:#f20b18}.v19-quality{border:1px solid rgba(255,215,80,.35);border-radius:16px;padding:22px 12px 12px;margin:18px 0 12px;position:relative}.v19-quality>b{position:absolute;top:-18px;right:50%;transform:translateX(50%);background:#ffd85a;color:#111;border-radius:9px;padding:7px 18px;font-weight:900}.v19-link-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.v19-link{min-height:58px;border:1px solid #ed0b18;border-radius:12px;background:#e90713;color:#fff;display:grid;grid-template-columns:1fr auto;align-items:center;gap:6px;padding:10px;text-align:right;font-weight:900}.v19-link.download{background:transparent}.v19-link small{display:block;color:rgba(255,255,255,.72);font-size:10px;font-weight:700}.v19-link .icon{font-size:24px}.v19-episodes-list{display:flex;flex-direction:column;gap:12px}.v19-episode-row{display:grid;grid-template-columns:120px 1fr auto;gap:12px;align-items:center;border:0;border-radius:16px;background:rgba(255,255,255,.06);padding:10px;color:#fff;text-align:right}.v19-episode-row .thumb{position:relative;aspect-ratio:16/9;border-radius:12px;overflow:hidden}.v19-episode-row img{width:100%;height:100%;object-fit:cover}.v19-episode-row .thumb span{position:absolute;inset:0;display:grid;place-items:center;font-size:26px}.v19-episode-row b{color:#f20b18;font-size:16px}.v19-episode-row small{display:block;color:#aaa;margin-top:5px}.v19-episode-row .chips{display:flex;flex-direction:column;gap:6px}.v19-episode-row em{font-style:normal;border:1px solid rgba(255,215,80,.55);border-radius:7px;color:#ffd85a;padding:3px 8px;font-size:11px}.v19-person{text-align:center;width:78px}.v19-person-img{width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid #e90713;margin:auto}.v19-person-img img{width:100%;height:100%;object-fit:cover}.v19-person b{display:block;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.v19-person small{color:#999;font-size:10px}@media(max-width:768px){.v19-section{padding:10px 8px 7px!important}.v19-group{border-radius:6px;padding:0 8px;margin-bottom:8px}.v19-section-title{font-size:18px!important}.v19-episode,.v19-animeEpisode{width:168px}.v19-movie,.v19-series,.v19-anime{width:122px}.v19-channel{width:96px}.v19-channel-logo{height:96px}.v19-link-grid{grid-template-columns:1fr}.v19-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.v19-grid .v19-episode,.v19-grid .v19-animeEpisode{grid-column:span 2}.v19-episode-row{grid-template-columns:110px 1fr}.v19-episode-row .chips{grid-column:1/3;flex-direction:row;flex-wrap:wrap}}`;
document.head.appendChild(style);
function rerender(){try{state.restContentReady=false;state.animeContentReady=false;state.liveContentReady=false;if(typeof _setHomeMode==='function')_setHomeMode(state.homeMode||'rest',false);}catch(e){console.warn('v19 rerender',e)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(rerender,250),{once:true});else setTimeout(rerender,250);
})();

(()=>{
const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const first = (...vals) => { for (const v of vals){ if(v===0||v===false) return String(v); if(v!==undefined&&v!==null&&String(v).trim()!=='') return String(v).trim(); } return ''; };
const arr = v => Array.isArray(v) ? v : [];
const media = v => { const s=first(v); if(!s) return (window.CONFIG&&CONFIG.FALLBACK_POSTER)||''; if(/^https?:\/\//i.test(s)||/^data:/i.test(s)) return s; if(s.startsWith('/uploads/')) return 'https://ostv-11-55.xyz'+s; if(s.startsWith('uploads/')) return 'https://ostv-11-55.xyz/'+s; try{return _az(s)}catch(_){return s} };
const titleOf = (r={}, kind='movie') => first(kind==='episode'||kind==='animeEpisode'?first(r.series_title,r.anime_title,r.title_ar,r.title,r.name):'', r.title_ar,r.name_ar,r.title,r.name,r.title_en,r.original_title,r.series_title,r.anime_title,r.channel_name,'بدون عنوان');
const realKind = (r={}, fallback='movie') => { let k=first(r.__oscarKind,r.item_type,r.typeKey,r.type,fallback); if(k==='anime_episode'||k==='anime_episode_latest') k='animeEpisode'; if(k==='latest_episodes') k='episode'; if(k==='latest_additions') k=first(r.type, fallback); return k; };
const idOf = (r={}, kind='movie') => first(r.__oscarId, r.item_id, kind==='series'?r.series_id:'', kind==='movie'?r.movie_id:'', kind==='episode'?r.episode_id:'', kind==='channel'?r.channel_id:'', kind==='anime'?r.anime_id:'', r.id, r.movie_id, r.series_id, r.episode_id, r.channel_id, r.anime_id, r.tmdb_id);
const posterOf = (r={}, kind='movie') => media(first(kind==='episode'?r.series_poster:'', kind==='animeEpisode'?r.anime_poster:'', r.poster,r.poster_url,r.logo,r.cover,r.image,r.thumbnail,r.bg_image,r.banner,r.series_poster,r.anime_poster));
const bannerOf = (r={}, kind='movie') => media(first(kind==='episode'?r.thumbnail:'', kind==='animeEpisode'?r.thumbnail:'', r.banner,r.backdrop,r.cover,r.bg_image,r.image,r.thumbnail,r.series_banner,r.anime_banner,posterOf(r,kind)));
const runtime = s => { const n=Number(first(s)); if(!Number.isFinite(n)||n<=0) return ''; const h=Math.floor(n/3600),m=Math.floor((n%3600)/60),sec=Math.floor(n%60); return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`; };
function normalizeItem(raw={}, fallback='movie'){
const kind=realKind(raw,fallback), id=idOf(raw,kind);
return {title:titleOf(raw,kind), poster:posterOf(raw,kind), banner:bannerOf(raw,kind), url:`oscar:${kind}:${id}`, type:kind, episode:first(raw.episode_number,raw.number,raw.episode), year:first(raw.release_year,raw.year), rating:first(raw.rating,raw.omdb_imdb_rating), quality:first(raw.quality_source,raw.quality), raw:{...raw,__oscarKind:kind,__oscarId:id}};
}
function card(raw,fb='movie'){
const it=normalizeItem(raw,fb), r=it.raw, k=it.type; const el=document.createElement('article'); el.className=`v19-card v19-${k}`; el.dir='rtl'; el.onclick=()=>_bk(it.url,it);
if(k==='episode'||k==='animeEpisode'){ el.innerHTML=`<div class="v19-ep-media"><div class="v19-fill"><img src="${esc(bannerOf(r,k)||it.banner||it.poster)}" loading="lazy"></div><div class="v19-ep-shade"></div>${runtime(r.duration)?`<b class="v19-duration">${esc(runtime(r.duration))}</b>`:''}<span class="v19-play">▶</span>${posterOf(r,k)?`<div class="v19-mini"><img src="${esc(posterOf(r,k))}" loading="lazy"></div>`:''}<div class="v19-ep-copy"><h3>${esc(it.title)}</h3><p>${esc([it.episode?`الحلقة ${it.episode}`:'',first(r.season_number)?`الموسم ${first(r.season_number)}`:''].filter(Boolean).join(' — '))}</p></div></div>`; return el; }
if(k==='series'||k==='anime'){ el.innerHTML=`<div class="v19-series-media"><div class="v19-fill"><img src="${esc(it.poster||it.banner)}" loading="lazy"></div><div class="v19-series-grad"></div>${first(r.episode_count,r.episodes_count)?`<b class="v19-count">${esc(first(r.episode_count,r.episodes_count))} <span class="icon">play_arrow</span></b>`:''}<h3>${esc(it.title)}</h3></div>`; return el; }
if(k==='channel'){ el.innerHTML=`<div class="v19-channel-logo"><div class="v19-fill-contain"><img src="${esc(first(r.logo,r.cover,it.poster))}" loading="lazy"></div></div><h3 class="v19-channel-title">${esc(it.title)}</h3>`; return el; }
el.innerHTML=`<div class="v19-poster-media"><div class="v19-fill"><img src="${esc(it.poster||it.banner)}" loading="lazy"></div></div><h3 class="v19-poster-title">${esc(it.title)}</h3>${it.year?`<p class="v19-meta">${esc(first(r.country,''))} • ${esc(it.year)}</p>`:''}`; return el;
}
function sectionKind(s){ const t=first(s.section_type).toLowerCase(); if(t.includes('episode')) return 'episode'; const firstItem=arr(s.items)[0]||{}; if(firstItem.item_type) return realKind(firstItem,firstItem.item_type); if(firstItem.type) return realKind(firstItem,firstItem.type); if(t.includes('series')) return 'series'; if(t.includes('movie')) return 'movie'; if(t.includes('channel')) return 'channel'; if(t.includes('anime')) return 'anime'; return 'movie'; }
window._renderOscarHomeSection=function(parent,s){ const title=first(s.title_ar,s.title_en,'قسم'); const k=sectionKind(s); const items=arr(s.items); const sec=document.createElement('section'); sec.className='v19-section'; const head=document.createElement('div'); head.className='v19-section-head'; head.innerHTML=`<h2 class="v19-section-title">${esc(title)}</h2><button class="v19-see" type="button">عرض الكل</button>`; const row=document.createElement('div'); row.className=`v19-row is-${k}`; if(!items.length) row.innerHTML='<div class="oscar-empty">لا يوجد محتوى</div>'; items.slice(0,s.max_items||20).forEach(x=>row.appendChild(card({...x,__oscarKind:first(x.item_type,x.__oscarKind)||k}, first(x.item_type,x.__oscarKind)||k))); head.querySelector('button').onclick=()=>{ _b8(); state.grid={mode:'oscarStatic',key:'static',title,page:1,oscar:{kind:k}}; state.gridItems=items.map(x=>normalizeItem({...x,__oscarKind:first(x.item_type,x.__oscarKind)||k},first(x.item_type,x.__oscarKind)||k)); document.querySelector('#qr')?.classList.add('hidden'); document.querySelector('#qae')?.classList.remove('hidden'); document.querySelector('#qaB').textContent=title; document.querySelector('#qq').style.display='none'; if(typeof _F==='function') _F(); }; sec.append(head,row); parent.appendChild(sec); };
})();

(()=>{
const API_ORIGIN='https://ostv-11-55.xyz';
const esc=(v='')=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const arr=v=>Array.isArray(v)?v:[];
function val(v){if(v===0||v===false)return String(v); if(v==null)return ''; if(['string','number','boolean'].includes(typeof v))return String(v).trim(); if(typeof v==='object')return val(v.name_ar||v.name||v.title_ar||v.title||v.label||v.code||''); return '';}
function first(...vals){for(const v of vals){const s=val(v); if(s)return s;} return '';}
function media(v){const s=first(v); if(!s)return (window.CONFIG&&CONFIG.FALLBACK_POSTER)||''; if(/^https?:\/\//i.test(s)||/^data:/i.test(s))return s; if(s.startsWith('/uploads/'))return API_ORIGIN+s; if(s.startsWith('uploads/'))return API_ORIGIN+'/'+s; try{return window._az?_az(s):s}catch(_){return s}}
function detail(data){return window._oscarDetail?_oscarDetail(data):(data?.upstream?.data?.data||data?.data||data||{})}
function list(data){if(window._oscarList)return _oscarList(data); const d=data?.upstream?.data?.data||data?.data||data; if(Array.isArray(d))return d; if(Array.isArray(d?.data))return d.data; return []}
async function call(name,params={}){return _oscarCall(name,params)}
function parseToken(url,hint={}){try{const t=window._oscarToken&&_oscarToken(url); if(t&&t.id)return t}catch(_){} const m=String(url||'').match(/^oscar:([^:]+):(.+)$/); if(m)return {kind:m[1],id:m[2]}; const raw=hint.raw||hint||{}; const kind=first(raw.__oscarKind,raw.item_type,raw.typeKey,raw.type,raw.kind,'movie'); const id=first(raw.__oscarId,raw.item_id,raw.movie_id,raw.series_id,raw.episode_id,raw.channel_id,raw.anime_id,raw.id); return id?{kind,id}:null}
function endpointFor(kind){const k=String(kind||'').toLowerCase(); if(k==='series')return 'series.show'; if(k==='anime')return 'anime.show'; if(k==='channel')return 'channels.show'; if(k==='episode')return 'episodes.show'; if(k==='animeepisode'||k==='anime_episode')return 'anime.episodesShow'; return 'movies.show'}
function titleOf(raw={},kind='movie'){if(kind==='episode'||kind==='animeEpisode'||kind==='anime_episode')return first(raw.title_ar,raw.title,raw.name,raw.series_title,raw.anime_title,'حلقة'); return first(raw.title_ar,raw.name_ar,raw.title,raw.name,raw.original_title,raw.title_en,raw.series_title,raw.anime_title,'بدون عنوان')}
function englishTitle(raw={}){return first(raw.title_en,raw.original_title,'')}
function posterOf(raw={},kind='movie'){return media(first(kind==='episode'?raw.series_poster:'',kind==='animeEpisode'?raw.anime_poster:'',raw.poster,raw.poster_url,raw.logo,raw.cover,raw.image,raw.thumbnail,raw.series_poster,raw.anime_poster))}
function bannerOf(raw={},kind='movie'){return media(first(kind==='episode'||kind==='animeEpisode'?raw.thumbnail:'',raw.banner,raw.backdrop,raw.cover,raw.bg_image,raw.image,raw.thumbnail,raw.series_banner,raw.anime_banner,posterOf(raw,kind)))}
function statusLabel(raw={}){const s=first(raw.status,raw.series_status); const map={ongoing:'جاري العرض',completed:'مكتمل',complete:'مكتمل',released:'تم الإصدار',upcoming:'قادم',canceled:'ملغي',cancelled:'ملغي'}; return map[String(s).toLowerCase()]||s}
function contentLabel(raw={}){const c=first(raw.content_type_label,raw.content_type); if(c==='subtitled')return 'مترجم'; if(c==='original')return 'أصلي'; return c}
function runtime(v){const n=Number(first(v)); if(!Number.isFinite(n)||n<=0)return ''; const h=Math.floor(n/3600),m=Math.floor((n%3600)/60),s=Math.floor(n%60); return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`}
function compact(n){const x=Number(n||0); if(!Number.isFinite(x)||x<=0)return ''; if(x>=1e6)return (x/1e6).toFixed(x>=1e7?0:1).replace(/\.0$/,'')+'M'; if(x>=1000)return (x/1000).toFixed(x>=10000?0:1).replace(/\.0$/,'')+'K'; return String(x)}
function fileSize(v){const s=first(v); if(!s)return ''; if(/(mb|gb|kb|ميجا|جيجا)/i.test(s))return s; const n=Number(s); if(!Number.isFinite(n))return s; if(n>1073741824)return (n/1073741824).toFixed(2).replace(/\.00$/,'')+' GB'; if(n>1048576)return (n/1048576).toFixed(1).replace(/\.0$/,'')+' MB'; if(n>1024)return (n/1024).toFixed(1).replace(/\.0$/,'')+' KB'; return s}
function qNum(q){const m=String(q||'').match(/(\d{3,4})/); return m?Number(m[1]):0}
function qLabel(q){const s=first(q); if(!s)return ''; const n=qNum(s); return n?`${n}P`:s.toUpperCase()}
function qualitiesFromEpisode(ep={}){const set=new Set(); first(ep.qualities).split(',').map(x=>x.trim()).filter(Boolean).forEach(x=>set.add(qLabel(x))); arr(ep.watch_links).forEach(x=>{const q=qLabel(x.quality||x.resolution); if(q)set.add(q)}); arr(ep.download_links).forEach(x=>{const q=qLabel(x.quality||x.resolution); if(q)set.add(q)}); return [...set].sort((a,b)=>qNum(b)-qNum(a))}
function sourceUrl(s={}){if(typeof s==='string')return /^https?:\/\//i.test(s)?s:''; return first(s.stream_url,s.url,s.link,s.file,s.src,s.video,s.watch_url,s.download_url,s.deep_link)}
function normalizeSources(raw={},mode='watch',kind='movie'){const out=[]; const add=x=>{if(!x)return; if(typeof x==='string')x={url:x}; if(typeof x!=='object')return; const url=sourceUrl(x); if(!/^https?:\/\//i.test(url))return; out.push({url,open:first(x.deep_link,url),server:first(x.server_name,x.server,x.name,x.label,x.title,'سيرفر مباشر'),quality:qLabel(first(x.quality,x.resolution,x.label_quality,raw.quality)),type:first(x.type,x.quality_source,x.source,x.format,raw.quality_source,''),size:fileSize(first(x.file_size,x.size,x.filesize,x.size_text,'')),duration:runtime(first(x.duration,raw.duration,'')),mode})}; if(kind==='channel')arr(raw.streams).forEach(add); const keys=mode==='download'?['download_links','downloadLinks','downloads','download','download_urls']:['watch_links','watchLinks','watch','videos','servers','links','qualities','sources','streams']; keys.forEach(k=>{const v=raw[k]; if(Array.isArray(v))v.forEach(add); else if(v&&typeof v==='object')Object.values(v).forEach(a=>Array.isArray(a)?a.forEach(add):add(a)); else add(v)}); const seen=new Set(); return out.filter(s=>s.url&&!seen.has(s.url)&&seen.add(s.url)).sort((a,b)=>qNum(b.quality)-qNum(a.quality))}
function groupSources(srcs=[]){const map=new Map(); srcs.forEach(s=>{const q=s.quality||'روابط'; if(!map.has(q))map.set(q,[]); map.get(q).push(s)}); return [...map.entries()].sort((a,b)=>qNum(b[0])-qNum(a[0]))}
function svgIcon(type){if(type==='download')return `<svg viewBox="0 0 24 24"><path d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Z"/><path d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"/></svg>`; if(type==='watch')return `<svg viewBox="0 0 24 24"><path d="M8.6 5.2c-.9-.55-2.1.1-2.1 1.18v11.24c0 1.08 1.2 1.73 2.1 1.18l9.2-5.62a1.38 1.38 0 0 0 0-2.36L8.6 5.2Z"/></svg>`; if(type==='search')return `<svg viewBox="0 0 24 24"><path d="M10.8 4a6.8 6.8 0 0 1 5.34 11l3.43 3.43a1 1 0 0 1-1.42 1.42l-3.43-3.43A6.8 6.8 0 1 1 10.8 4Zm0 2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z"/></svg>`; return ''}
function openUrl(url){if(!url)return; try{window.open(url,'_blank')}catch(_){location.href=url}}
function linkGroupsHTML(title,sources,mode,durationLabel){return `<section class="osx-v28-link-section"><h4>${esc(title)}</h4>${groupSources(sources).map(([q,items])=>`<div class="osx-v28-quality"><b>${esc(q)}</b><div class="osx-v28-link-grid ${items.length>1?'two':''}">${items.map(s=>`<button type="button" class="osx-v28-source ${mode}" data-source-mode="${mode}" data-source-index="${sources.indexOf(s)}"><span class="osx-v28-source-icon">${svgIcon(mode)}</span><span class="osx-v28-source-copy"><strong>${esc(s.server)}</strong><small>${s.size?`<em>الحجم: ${esc(s.size)}</em>`:''}${s.duration?`<em>${esc(durationLabel)} ${esc(s.duration)}</em>`:''}${s.type?`<em>${esc(s.type)}</em>`:''}</small></span></button>`).join('')}</div></div>`).join('')}</section>`}
function openLinksDialog({title='',raw={},kind='episode',mode='all'}){const watch=normalizeSources(raw,'watch',kind),down=normalizeSources(raw,'download',kind);let old=document.getElementById('osxV28Links');if(old)old.remove();const hasWatch=mode!=='download'&&watch.length,hasDown=mode!=='watch'&&down.length;const dlg=document.createElement('div');dlg.id='osxV28Links';dlg.className='osx-v28-dialog';dlg.innerHTML=`<div class="osx-v28-sheet"><div class="osx-v28-handle"></div><div class="osx-v28-head"><button type="button" class="osx-v28-x">×</button><h3>${esc(title||'الروابط')}</h3></div><div class="osx-v28-body">${hasWatch?linkGroupsHTML('روابط المشاهدة',watch,'watch','مدة الحلقة:'):''}${hasDown?linkGroupsHTML('روابط التحميل',down,'download',kind==='movie'?'مدة الفيلم:':'مدة الحلقة:'):''}${!hasWatch&&!hasDown?`<div class="osx-v28-empty">لا توجد روابط متاحة</div>`:''}</div></div>`;document.body.appendChild(dlg);requestAnimationFrame(()=>dlg.classList.add('show'));const reopen=()=>openLinksDialog({title,raw,kind,mode});dlg.querySelector('.osx-v28-x').onclick=()=>dlg.remove();dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.remove()});dlg.querySelectorAll('[data-source-mode]').forEach(btn=>btn.addEventListener('click',()=>{const sourceMode=btn.dataset.sourceMode;const sourceList=sourceMode==='download'?down:watch;const picked=sourceList[Number(btn.dataset.sourceIndex||0)];if(!picked)return;const normalize=s=>({label:[s.quality,s.server].filter(Boolean).join(' - ')||'رئيسي',quality:s.quality||'',url:s.url,originalUrl:s.url});const source=normalize(picked);const allSources=sourceList.map(normalize);dlg.remove();const chooser=window._openSourceMethodChooser||window._bm;if(typeof chooser==='function'){chooser(source,source.url,title,{title:first(raw.series_title,raw.anime_title,title),episode:first(raw.episode_number,raw.number,raw.episode),url:source.url,watchUrl:source.url},{actionMode:sourceMode,sources:allSources,onBack:reopen,elevated:true});}else openUrl(source.url);}));try{history.pushState({osxDialog:true},'',location.href)}catch(_){}}
async function loadEpisodeAndDialog(id,kind='episode',fallbackTitle='حلقة'){if(!id)return; try{const endpoint=String(kind).toLowerCase().includes('anime')?'anime.episodesShow':'episodes.show'; const raw=detail(await call(endpoint,{id})); openLinksDialog({title:titleOf(raw,kind)||fallbackTitle,raw,kind,mode:'all'})}catch(e){console.error('episode dialog failed',e); if(window._U)_U('تعذر تحميل روابط الحلقة')}}
window._openOscarEpisode=function(ep={}){const t=parseToken(ep.url||'',ep); const id=t?.id||ep.id||ep.raw?.id; const kind=t?.kind||ep.raw?.__oscarKind||'episode'; return loadEpisodeAndDialog(id,kind,ep.title||titleOf(ep.raw||{},kind))}
function renderPeople(items=[],title='الممثلين'){if(!items.length)return ''; return `<section class="osx-section osx-cast"><h2>${esc(title)}</h2><div class="osx-people">${items.slice(0,22).map(p=>`<article class="osx-person"><img src="${esc(media(first(p.photo,p.image,p.avatar,'')))}" loading="lazy"><b>${esc(first(p.name_ar,p.name,p.title,'غير معروف'))}</b><small>${esc(first(p.role_ar,p.role_name,p.role,p.character,''))}</small></article>`).join('')}</div></section>`}
function peopleOf(raw={}){return [...arr(raw.actors),...arr(raw.cast)]} function crewOf(raw={}){return [...arr(raw.crew),...arr(raw.team)]} async function fetchEpisodesForSeason(seasonId,kind='series'){if(!seasonId)return[]; return list(await call(kind==='anime'?'anime.episodes':'episodes.list',{season_id:seasonId}))}
function renderSeasonHeader(seasons=[],activeSeason=null){if(!seasons.length)return ''; const s=activeSeason||seasons[0],num=first(s.season_number,s.number,s.title,''),count=first(s.episode_count,s.episodes_count,''); return `<section class="osx-section osx-seasons-section"><h2>المواسم</h2><button class="osx-season-current" type="button" data-seasons-open="1"><img src="${esc(media(first(s.poster,s.image,s.thumbnail,s.cover,'')))}" loading="lazy"><span><b>الموسم ${esc(num)}</b><small>${esc(count?count+' حلقة':'اضغط لعرض باقي المواسم')}</small></span><i>⌄</i></button></section>`}
function renderEpisodes(eps=[],kind='series'){if(!eps.length)return '';const num=e=>Number(first(e.episode_number,e.number,e.episode,e.id,0)),sorted=[...eps].sort((a,b)=>state.episodeOrder==='desc'?num(b)-num(a):num(a)-num(b));return `<section class="osx-section osx-episodes"><div class="osx-episode-top"><h2>الحلقات</h2><button type="button" class="osx-sort">${state.episodeOrder==='desc'?'الأحدث أولاً':'الأقدم أولاً'}</button></div><div class="osx-episode-search"><span>${svgIcon('search')}</span><input type="text" placeholder="إبحث برقم الحلقة أو العنوان" disabled></div><div class="osx-episodes-list">${sorted.map(ep=>{const qs=qualitiesFromEpisode(ep),n=first(ep.episode_number,ep.number,ep.episode,''),title=first(ep.title_ar,ep.title,n?'الحلقة '+n:'حلقة'),date=first(ep.air_date,ep.release_date,ep.created_at?String(ep.created_at).slice(0,10):''),thumb=media(first(ep.thumbnail,ep.banner,ep.poster,''));return `<button type="button" class="osx-episode-row" data-episode-id="${esc(ep.id)}" data-episode-kind="${kind==='anime'?'animeEpisode':'episode'}"><div class="osx-ep-qualities ${qs.length>2?'many':''}">${qs.length?qs.slice(0,4).map(q=>`<span>${esc(q)}</span>`).join(''):''}</div><div class="osx-ep-copy"><b>${esc(title)}</b><small>${esc(date)}</small></div><div class="osx-ep-thumb"><img src="${esc(thumb)}" loading="lazy"><span>▶</span>${runtime(ep.duration)?`<em>${esc(runtime(ep.duration))}</em>`:''}</div></button>`}).join('')}</div></section>`}function openSeasonsModal(seasons,activeId,onSelect){let old=document.getElementById('osxV28Seasons'); if(old)old.remove(); const dlg=document.createElement('div'); dlg.id='osxV28Seasons'; dlg.className='osx-v28-seasons-modal'; dlg.innerHTML=`<div class="osx-v28-seasons-box"><div class="osx-v28-season-title"><div>▶</div><h3>المواسم</h3><p>${esc(seasons.length)} موسم</p></div><div class="osx-v28-season-list">${seasons.map(s=>{const sid=first(s.id),num=first(s.season_number,s.number,s.title,''),count=first(s.episode_count,s.episodes_count,''); return `<button type="button" class="osx-v28-season-choice ${sid===String(activeId)?'active':''}" data-season-id="${esc(sid)}"><img src="${esc(media(first(s.poster,s.image,s.thumbnail,s.cover,'')))}" loading="lazy"><span><b>الموسم ${esc(num)}</b><small>${esc(count?count+' حلقة':'')}</small></span><i>▶</i></button>`}).join('')}</div><button type="button" class="osx-v28-season-close">إغلاق</button></div>`; document.body.appendChild(dlg); requestAnimationFrame(()=>dlg.classList.add('show')); dlg.querySelector('.osx-v28-season-close').onclick=()=>dlg.remove(); dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.remove()}); dlg.querySelectorAll('[data-season-id]').forEach(btn=>btn.addEventListener('click',()=>{const sid=btn.getAttribute('data-season-id');dlg.remove();onSelect&&onSelect(sid)})); try{history.pushState({osxDialog:true},'',location.href)}catch(_){}}
window._openOscarDetails=async function(url,hint={}){const t=parseToken(url,hint); if(!t)return; if(t.kind==='episode'||t.kind==='animeEpisode'||t.kind==='anime_episode')return loadEpisodeAndDialog(t.id,t.kind,hint.title||''); const modal=document.getElementById('qs'); if(!modal)return; modal.className='modal show osx-detail-mode osx-v28-mode'; document.body.style.overflow='hidden'; try{history.pushState({osxDetail:true},'',location.href)}catch(_){} modal.innerHTML='<div class="osx-detail-page"><div class="osx-loading"><i class="skeleton"></i><div><b class="skeleton"></b><b class="skeleton"></b><b class="skeleton"></b></div></div></div>'; const host=modal.querySelector('.osx-detail-page'); try{const kind=t.kind==='anime_episode'?'animeEpisode':t.kind, raw=detail(await call(endpointFor(kind),{id:t.id})), title=titleOf(raw,kind), en=englishTitle(raw), poster=posterOf(raw,kind), banner=bannerOf(raw,kind), watchSources=normalizeSources(raw,'watch',kind), downloadSources=normalizeSources(raw,'download',kind); const seasons=arr(raw.seasons).slice().sort((a,b)=>Number(first(b.season_number,b.number,0))-Number(first(a.season_number,a.number,0))); let activeSeason=seasons[0]||null, episodes=activeSeason?await fetchEpisodesForSeason(activeSeason.id,kind==='anime'?'anime':'series'):[]; const renderPage=()=>{host.innerHTML=`<div class="osx-bg" style="background-image:url('${esc(banner)}')"></div><main class="osx-content"><section class="osx-hero"><img class="osx-poster" src="${esc(poster)}" alt="${esc(title)}" loading="eager"><div class="osx-copy"><h1 dir="rtl">${esc(title)}</h1>${en&&en!==title?`<div class="osx-sub" dir="ltr">${esc(en)}</div>`:''}${raw.tagline?`<div class="osx-tagline" dir="ltr">"${esc(first(raw.tagline))}"</div>`:''}<div class="osx-meta-line">${runtime(raw.runtime)?`<span>${esc(runtime(raw.runtime))}</span><i></i>`:''}${first(raw.country,raw.country_name)?`<span>${esc(first(raw.country,raw.country_name))}</span><i></i>`:''}${first(raw.release_year,raw.year)?`<span>${esc(first(raw.release_year,raw.year))}</span>`:''}</div><div class="osx-chips">${statusLabel(raw)?`<span class="osx-chip status">${esc(statusLabel(raw))}</span>`:''}${contentLabel(raw)?`<span class="osx-chip solid">${esc(contentLabel(raw))}</span>`:''}${raw.age_rating?`<span class="osx-chip age">${esc(raw.age_rating)}</span>`:''}${first(raw.quality_source,raw.quality)?`<span class="osx-chip solid">${esc(String(first(raw.quality_source,raw.quality)).toUpperCase())}</span>`:''}${first(raw.omdb_imdb_rating,raw.rating)?`<span class="osx-chip rate">${esc(first(raw.omdb_imdb_rating,raw.rating))} ★</span>`:''}${arr(raw.genres).slice(0,3).map(g=>`<span class="osx-chip">${esc(g)}</span>`).join('')}</div><div class="osx-social">${raw.comments_count||raw.comment_count?`<span class="osx-pill red"><span class="icon">comment</span>${esc(compact(raw.comments_count||raw.comment_count))}</span>`:''}${raw.views_count?`<span class="osx-pill"><span class="icon">visibility</span>${esc(compact(raw.views_count))}</span>`:''}</div></div></section>${(watchSources.length||downloadSources.length)?`<section class="osx-actions">${watchSources.length?`<button class="osx-watch" type="button" data-watch>${svgIcon('watch')}<span>مشاهدة</span></button>`:''}${downloadSources.length?`<button class="osx-download" type="button" data-download>${svgIcon('download')}<span>تحميل</span></button>`:''}</section>`:''}<section class="osx-section osx-story"><h2>القصة</h2><p>${esc(first(raw.story,raw.description,raw.overview,'لا تتوفر قصة لهذا العمل.'))}</p><button type="button">المزيد</button></section>${renderPeople(peopleOf(raw),'الممثلين')}${renderPeople(crewOf(raw),'فريق العمل')}${renderSeasonHeader(seasons,activeSeason)}${renderEpisodes(episodes,kind==='anime'?'anime':'series')}</main>`; host.querySelector('[data-watch]')?.addEventListener('click',()=>openLinksDialog({title,raw,kind,mode:'watch'})); host.querySelector('[data-download]')?.addEventListener('click',()=>openLinksDialog({title,raw,kind,mode:'download'}));host.querySelector('.osx-sort')?.addEventListener('click',()=>{state.episodeOrder=state.episodeOrder==='desc'?'asc':'desc';renderPage()});host.querySelector('[data-seasons-open]')?.addEventListener('click',()=>openSeasonsModal(seasons,first(activeSeason?.id),async sid=>{const next=seasons.find(s=>String(s.id)===String(sid)); if(!next)return; activeSeason=next; episodes=await fetchEpisodesForSeason(sid,kind==='anime'?'anime':'series'); renderPage(); setTimeout(()=>host.querySelector('.osx-episodes')?.scrollIntoView({behavior:'smooth',block:'start'}),50)})); host.querySelectorAll('[data-episode-id]').forEach(btn=>btn.addEventListener('click',()=>loadEpisodeAndDialog(btn.getAttribute('data-episode-id'),btn.getAttribute('data-episode-kind'),btn.textContent.trim())))}; renderPage()}catch(e){console.error('V28 details error',e); host.innerHTML=`<div class="osx-error">تعذر تحميل تفاصيل العمل</div>`}}
const style=document.createElement('style'); style.id='v28PatchStyle'; style.textContent=`html,body,#qs,#qae,#qp,.osx-detail-page,.osx-v28-sheet,.osx-v28-seasons-box{scrollbar-width:none!important;-ms-overflow-style:none!important}html::-webkit-scrollbar,body::-webkit-scrollbar,#qs::-webkit-scrollbar,#qae::-webkit-scrollbar,#qp::-webkit-scrollbar,.osx-detail-page::-webkit-scrollbar,.osx-v28-sheet::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}#qs.osx-v28-mode{display:block!important;position:fixed!important;inset:0!important;z-index:4000!important;overflow:auto!important;background:#050505!important;direction:rtl!important;font-family:'Thmanyah',sans-serif!important}#qs.osx-v28-mode>#qag,#qs.osx-v28-mode>.xa6{display:none!important}.osx-detail-page{min-height:100vh;background:#050505;color:#fff;position:relative;overflow:auto;font-family:'Thmanyah',sans-serif}.osx-bg{position:absolute;inset:0 0 auto 0;height:350px;background-size:cover;background-position:center top;opacity:.72;z-index:0}.osx-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,.45) 48%,#050505 100%),linear-gradient(90deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.24) 53%,rgba(0,0,0,.72) 100%)}.osx-content{position:relative;z-index:2;padding:205px 28px 100px}.osx-hero{display:grid;grid-template-columns:31vw 1fr;gap:20px;align-items:end;direction:rtl}.osx-poster{width:100%;max-width:150px;aspect-ratio:2/3;object-fit:cover;border-radius:13px;box-shadow:0 18px 38px rgba(0,0,0,.55);justify-self:start}.osx-copy{direction:rtl;text-align:right;min-width:0;padding-bottom:4px}.osx-copy h1{margin:0 0 6px;font-size:22px;line-height:1.34;font-weight:900;letter-spacing:-.15px;color:#fff;text-shadow:0 4px 20px rgba(0,0,0,.55)}.osx-sub{color:rgba(255,255,255,.72);font-size:13px;line-height:1.45;margin-bottom:5px;font-weight:500;text-align:left;direction:ltr;unicode-bidi:plaintext}.osx-tagline{color:rgba(255,255,255,.58);font-size:12.5px;line-height:1.45;margin-bottom:8px;font-style:italic;text-align:left;direction:ltr;unicode-bidi:plaintext}.osx-meta-line{display:flex;flex-wrap:wrap;align-items:center;gap:7px;color:rgba(255,255,255,.72);font-size:12.5px;line-height:1.2;margin-bottom:9px;justify-content:flex-start}.osx-meta-line i{width:5px;height:5px;border-radius:50%;background:#e50914;display:inline-block}.osx-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px}.osx-chip{min-height:24px;display:inline-flex;align-items:center;justify-content:center;padding:3px 9px;border-radius:8px;border:1px solid rgba(255,255,255,.35);color:#fff;font-size:10.8px;font-weight:700;line-height:1;background:rgba(255,255,255,.035)}.osx-chip.solid{background:rgba(255,255,255,.26);border-color:transparent;font-weight:900}.osx-chip.status{background:#3dbb50;border-color:#3dbb50;color:#fff}.osx-chip.age{color:#ff7d42;border-color:#e35d2f;background:rgba(229,93,47,.08)}.osx-chip.rate{color:#ffd84a;border-color:#ffd84a;background:rgba(255,216,74,.08);font-weight:900}.osx-social{display:flex;gap:9px;align-items:center;flex-wrap:wrap}.osx-pill{height:31px;min-width:76px;padding:0 12px;border-radius:15px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.10);display:inline-flex;gap:6px;align-items:center;justify-content:center;color:rgba(255,255,255,.74);font-size:11.5px;font-weight:700}.osx-pill.red{color:#e72031;border-color:rgba(229,9,20,.42);background:rgba(229,9,20,.10)}.osx-pill .icon{font-size:16px}.osx-actions{margin:28px auto 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;direction:rtl;max-width:520px;padding:0 8px}.osx-watch,.osx-download{height:44px;border-radius:11px;font-family:inherit;font-size:14px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;line-height:1}.osx-watch svg,.osx-download svg{width:21px;height:21px;fill:currentColor;flex:0 0 auto}.osx-watch{border:1px solid #e50914;background:#e90914;color:#fff}.osx-download{border:1px solid rgba(255,255,255,.88);background:transparent;color:#fff}.osx-section{margin-top:38px;position:relative}.osx-section h2{margin:0 0 15px;padding-right:13px;position:relative;color:#fff;font-size:25px;font-weight:900;line-height:1.2;text-align:right}.osx-section h2::after{content:'';position:absolute;right:0;top:2px;width:6px;height:32px;border-radius:999px;background:#f20d1c}.osx-story p{margin:0;color:rgba(255,255,255,.68);font-size:15.5px;line-height:2.05;font-weight:500;text-align:right;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.osx-story button{margin-top:8px;border:0;background:transparent;color:#e50914;font-family:inherit;font-size:14px;font-weight:800;padding:0}.osx-people{display:flex;gap:18px;overflow-x:auto;padding:4px 0 10px;scrollbar-width:none;direction:rtl}.osx-people::-webkit-scrollbar{display:none}.osx-person{flex:0 0 78px;text-align:center;color:#fff}.osx-person img{width:70px;height:70px;border-radius:50%;object-fit:cover;border:3px solid #e50914;background:#111;display:block;margin:0 auto 7px}.osx-person b{display:block;font-size:11.5px;line-height:1.25;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.osx-person small{display:block;margin-top:4px;color:rgba(255,255,255,.48);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.osx-season-current{width:100%;height:86px;border-radius:16px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.045);color:#fff;display:grid;grid-template-columns:56px 1fr 32px;gap:14px;align-items:center;padding:10px 14px;font-family:inherit;text-align:right}.osx-season-current img{width:56px;height:66px;border-radius:8px;object-fit:cover}.osx-season-current b{font-size:17px}.osx-season-current small{display:block;color:rgba(255,255,255,.55);font-size:12px;margin-top:4px}.osx-season-current i{font-style:normal;font-size:24px;color:rgba(255,255,255,.65)}.osx-episode-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.osx-episode-top h2{margin:0}.osx-sort{height:40px;border:1px solid rgba(255,255,255,.20);background:rgba(255,255,255,.08);border-radius:20px;color:#fff;font-family:inherit;font-size:13px;font-weight:800;padding:0 14px}.osx-episode-search{height:54px;border-radius:15px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.055);display:flex;align-items:center;gap:12px;padding:0 16px;margin-bottom:15px}.osx-episode-search svg{width:24px;height:24px;fill:#fff}.osx-episode-search input{flex:1;background:transparent;border:0;outline:0;color:#fff;font-family:inherit;font-size:14px;text-align:right}.osx-episodes-list{display:flex;flex-direction:column;gap:12px}.osx-episode-row{min-height:108px;padding:11px;border:0;border-radius:14px;background:rgba(255,255,255,.07);display:grid;grid-template-columns:72px 1fr 128px;gap:12px;align-items:center;color:#fff;font-family:inherit;text-align:right;direction:ltr}.osx-ep-thumb{position:relative;width:128px;height:78px;border-radius:10px;overflow:hidden;background:#111;justify-self:end}.osx-ep-thumb img{width:100%;height:100%;object-fit:cover}.osx-ep-thumb span{position:absolute;inset:0;display:grid;place-items:center;font-size:28px;color:#fff;background:rgba(0,0,0,.12)}.osx-ep-thumb em{position:absolute;left:6px;bottom:5px;background:rgba(0,0,0,.7);color:#fff;border-radius:5px;padding:2px 5px;font-size:10px;font-style:normal}.osx-ep-copy{direction:rtl}.osx-ep-copy b{color:#e50914;font-size:15px;font-weight:900;display:block;margin-bottom:5px}.osx-ep-copy small{color:rgba(255,255,255,.6);font-size:12px}.osx-ep-qualities{display:grid;grid-template-columns:1fr;gap:5px}.osx-ep-qualities.many{grid-template-columns:1fr 1fr}.osx-ep-qualities span{height:24px;display:grid;place-items:center;border:1px solid rgba(255,216,74,.5);border-radius:6px;color:#ffe36a;font-size:10px;font-weight:800;text-transform:uppercase;min-width:0}.osx-loading{min-height:100vh;display:grid;grid-template-columns:120px 1fr;align-content:center;gap:16px;padding:24px}.osx-loading>i{aspect-ratio:2/3;border-radius:10px}.osx-loading>div{display:grid;align-content:center;gap:10px}.osx-loading b{height:18px;border-radius:6px}.osx-error{min-height:100vh;display:grid;place-items:center;color:#fff;font-size:18px;font-weight:800}.osx-v28-dialog,.osx-v28-seasons-modal{position:fixed;inset:0;z-index:8000;background:rgba(0,0,0,.58);display:flex;align-items:flex-end;opacity:0;transition:.18s ease}.osx-v28-dialog.show,.osx-v28-seasons-modal.show{opacity:1}.osx-v28-sheet{width:100%;max-height:82vh;overflow:auto;background:#1d1d1d;border-radius:24px 24px 0 0;color:#fff;padding:10px 24px 28px;font-family:'Thmanyah',sans-serif}.osx-v28-handle{width:62px;height:6px;border-radius:20px;background:rgba(255,255,255,.24);margin:0 auto 14px}.osx-v28-head{height:52px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.08);margin:0 -24px 18px;padding:0 24px}.osx-v28-head h3{margin:0;font-size:20px;font-weight:900;max-width:80%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.osx-v28-x{width:38px;height:38px;border:0;background:transparent;color:rgba(255,255,255,.65);font-size:36px;line-height:1}.osx-v28-link-section{margin-bottom:22px}.osx-v28-link-section h4{position:relative;margin:0 0 18px;padding-right:12px;color:#fff;font-size:22px;font-weight:900}.osx-v28-link-section h4::after{content:'';position:absolute;right:0;top:3px;width:5px;height:27px;border-radius:99px;background:#e50914}.osx-v28-quality{position:relative;margin:24px 0 18px;padding:20px 10px 10px;border:1px solid rgba(255,216,74,.32);border-radius:13px}.osx-v28-quality>b{position:absolute;top:-15px;right:50%;transform:translateX(50%);background:#ffdc5c;color:#111;border-radius:9px;padding:6px 16px;font-size:12px;font-weight:900}.osx-v28-link-grid{display:grid;grid-template-columns:1fr;gap:9px}.osx-v28-link-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}.osx-v28-source{min-height:58px;border-radius:10px;padding:8px 10px;display:grid;grid-template-columns:26px minmax(0,1fr);gap:8px;align-items:center;text-align:right;font-family:inherit}.osx-v28-source.watch{background:#e90914;border:1px solid #e90914;color:#fff}.osx-v28-source.download{background:transparent;border:1px solid #e90914;color:#fff}.osx-v28-source svg{width:22px;height:22px;fill:currentColor}.osx-v28-source-copy strong{display:block;font-size:12px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.osx-v28-source-copy small{display:flex;gap:6px;flex-wrap:wrap;color:rgba(255,255,255,.70);font-size:9.5px;margin-top:3px}.osx-v28-source-copy em{font-style:normal;background:rgba(0,0,0,.20);border-radius:6px;padding:2px 5px}.osx-v28-seasons-modal{align-items:center;justify-content:center;padding:26px}.osx-v28-seasons-box{width:min(92vw,420px);max-height:80vh;overflow:auto;background:#202020;color:#fff;border-radius:18px;padding:22px 18px 18px;font-family:'Thmanyah',sans-serif}.osx-v28-season-title{text-align:center;border-bottom:1px solid rgba(255,255,255,.14);padding-bottom:14px;margin-bottom:12px}.osx-v28-season-title div{font-size:44px}.osx-v28-season-title h3{font-size:24px;margin:2px 0}.osx-v28-season-title p{margin:0;color:#aaa}.osx-v28-season-list{display:flex;flex-direction:column;gap:10px}.osx-v28-season-choice{height:84px;border:0;background:transparent;color:#fff;display:grid;grid-template-columns:58px 1fr 24px;gap:14px;align-items:center;text-align:right;font-family:inherit;border-radius:12px}.osx-v28-season-choice.active b{color:#e50914}.osx-v28-season-choice img{width:58px;height:70px;border-radius:8px;object-fit:cover}.osx-v28-season-choice b{font-size:19px}.osx-v28-season-choice small{display:block;color:#aaa;font-size:13px;margin-top:3px}.osx-v28-season-choice i{font-style:normal;color:#e50914}.osx-v28-season-close{width:100%;height:52px;border:0;border-radius:12px;background:#2e2e2e;color:#fff;font-family:inherit;font-size:18px;font-weight:900;margin-top:16px}#qae .ost-grid,#qae .v19-grid,#qae #qp{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;padding:14px!important}#qae .ost-card,#qae .v19-movie,#qae .v19-series,#qae .v19-anime,#qae .ost-movie,#qae .ost-series,#qae .ost-anime{width:100%!important;min-width:0!important}#qae .ost-poster-title,#qae .v19-poster-title{font-size:14px!important}@media(max-width:430px){.osx-content{padding-top:205px}.osx-bg{height:345px}.osx-copy h1{font-size:22px}.osx-watch,.osx-download{height:44px;font-size:14px}.osx-episode-row{grid-template-columns:64px 1fr 120px;gap:10px}.osx-ep-thumb{width:120px;height:74px}.osx-v28-link-grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}}`; document.head.appendChild(style);
})();

(()=>{
function qs(){return document.getElementById('qs')}
function isDetailOpen(){const m=qs();return !!(m&&(m.classList.contains('show')||m.querySelector('.osx-detail-page')))}
function markBase(){try{ if(!history.state || !history.state.v29base) history.replaceState(Object.assign({},history.state||{},{v29base:true}),'',location.href); }catch(e){}}
function pushOverlayState(){
const m=qs(); if(!m || !isDetailOpen() || m.dataset.v29Pushed==='1') return;
try{ history.pushState({v29overlay:'detail',t:Date.now()},'',location.href); m.dataset.v29Pushed='1'; }catch(e){}
}
markBase();
function wrapOpen(name){
const old=window[name];
if(typeof old!=='function'||old.__v29wrap) return;
const wrapped=function(...args){
const r=old.apply(this,args);
Promise.resolve(r).finally(()=>setTimeout(pushOverlayState,80));
return r;
};
wrapped.__v29wrap=true;
window[name]=wrapped;
}
wrapOpen('_openOscarDetails');
wrapOpen('_openOscarEpisode');
document.addEventListener('click',e=>{
const t=e.target&&e.target.closest&&e.target.closest('.ost-card,.v19-card,.card,[data-episode-id]');
if(t) setTimeout(pushOverlayState,180);
},true);

const style=document.createElement('style');
style.id='v29BackGridCriticalCSS';
style.textContent=`
/* رجوع الهاتف */
#qs.show{overscroll-behavior:contain!important}

/* عرض الكل / البحث / الأقسام: بطاقتين بالوسط وبحجم واضح */
#qae #qp.xa7,
#qae #qp{
display:grid!important;
grid-template-columns:repeat(2,minmax(0,1fr))!important;
gap:18px 18px!important;
justify-content:center!important;
align-items:start!important;
padding:18px 20px 115px!important;
box-sizing:border-box!important;
width:100%!important;
max-width:560px!important;
margin:0 auto!important;
}
#qae #qp.xa7>.v19-grid,
#qae #qp>.v19-grid,
#qae #qp.xa7>.ost-grid,
#qae #qp>.ost-grid{
grid-column:1/-1!important;
display:grid!important;
grid-template-columns:repeat(2,minmax(0,1fr))!important;
gap:18px 18px!important;
width:100%!important;
max-width:560px!important;
margin:0 auto!important;
padding:0!important;
box-sizing:border-box!important;
}
#qae #qp .card,
#qae #qp .ost-card,
#qae #qp .v19-card,
#qae #qp .v19-movie,
#qae #qp .v19-series,
#qae #qp .v19-anime,
#qae #qp .ost-movie,
#qae #qp .ost-series,
#qae #qp .ost-anime{
width:100%!important;
min-width:0!important;
max-width:none!important;
margin:0!important;
justify-self:stretch!important;
}
#qae #qp .xr,
#qae #qp .ost-poster-media,
#qae #qp .ost-series-media,
#qae #qp .v19-poster,
#qae #qp .v19-media{
width:100%!important;
aspect-ratio:2/3!important;
height:auto!important;
border-radius:18px!important;
overflow:hidden!important;
}
#qae #qp img{object-fit:cover!important}
#qae #qp .xaP,
#qae #qp .ost-poster-title,
#qae #qp .v19-title,
#qae #qp .v19-poster-title{
font-size:14px!important;
line-height:1.35!important;
min-height:38px!important;
height:auto!important;
text-align:center!important;
margin-top:8px!important;
}
#qae #qp .xbp,
#qae #qp .ost-poster-meta,
#qae #qp .v19-meta{
font-size:11px!important;
text-align:center!important;
min-height:18px!important;
}

/* جودات الحلقة: كل جودتين بسطر عند توفر ٤ */
.osx-ep-qualities{
display:grid!important;
grid-template-columns:1fr!important;
gap:5px!important;
width:100%!important;
}
.osx-ep-qualities.many{
grid-template-columns:repeat(2,minmax(0,1fr))!important;
}
.osx-ep-qualities span{
min-width:0!important;
height:23px!important;
display:grid!important;
place-items:center!important;
font-size:9.5px!important;
white-space:nowrap!important;
}

/* روابط المشاهدة/التحميل: معلومات أوضح */
.osx-v28-source-copy small{
display:flex!important;
flex-wrap:wrap!important;
gap:5px!important;
line-height:1.4!important;
white-space:normal!important;
}
.osx-v28-source-copy em{
font-style:normal!important;
background:rgba(0,0,0,.22)!important;
border-radius:6px!important;
padding:2px 5px!important;
}
@media(max-width:430px){
#qae #qp.xa7,#qae #qp{gap:16px!important;padding-inline:18px!important;max-width:430px!important}
#qae #qp.xa7>.v19-grid,#qae #qp>.v19-grid,#qae #qp.xa7>.ost-grid,#qae #qp>.ost-grid{gap:16px!important;max-width:430px!important}
}
`;
document.head.appendChild(style);
})();

(()=> {
const API_ORIGIN='https://ostv-11-55.xyz';
const esc=(v='')=>String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const arr=v=>Array.isArray(v)?v:[];
const first=(...vals)=>{for(const v of vals){if(v===0||v===false)return String(v);if(v!==undefined&&v!==null&&String(v).trim()!=='')return String(v).trim();}return'';};
const api=(name,params={})=>window._oscarCall?_oscarCall(name,params):Promise.reject(new Error('Oscar API missing'));
function asData(res){return res?.upstream?.data?.data ?? res?.data?.data ?? res?.data ?? res ?? {}}
function asList(res){
const d=asData(res);
if(Array.isArray(d))return d;
if(Array.isArray(d?.data))return d.data;
if(Array.isArray(d?.items))return d.items;
return [];
}
function media(v){
const s=first(v);
if(!s)return (window.CONFIG&&CONFIG.FALLBACK_POSTER)||'';
if(/^https?:\/\//i.test(s)||/^data:/i.test(s))return s;
if(s.startsWith('/uploads/'))return API_ORIGIN+s;
if(s.startsWith('uploads/'))return API_ORIGIN+'/'+s;
try{return window._az?_az(s):s}catch(_){return s}
}
function runtime(v){
const n=Number(first(v));
if(!Number.isFinite(n)||n<=0)return'';
const h=Math.floor(n/3600),m=Math.floor((n%3600)/60),s=Math.floor(n%60);
return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`;
}
function animeTitle(raw={}){return first(raw.title_ar,raw.name_ar,raw.anime_title,raw.title,raw.name,raw.title_en,raw.name_en,'بدون عنوان')}
function animePoster(raw={}){return media(first(raw.poster,raw.anime_poster,raw.logo_url,raw.logo,raw.image,raw.thumbnail,raw.banner))}
function sectionTitle(sec={}){
const t=first(sec.title_ar,sec.name_ar,sec.title,sec.name);
if(sec.section_type==='latest_episodes')return 'آخر حلقات الأنمي';
return t||'قسم الأنمي';
}
function paramsFromSection(sec={}){
const p={page:1};
if(sec.sort_by)p.sort_by=sec.sort_by;
if(sec.status_filter)p.status=sec.status_filter;
if(sec.genre_id_filter)p.genre_id=sec.genre_id_filter;
if(sec.studio_id_filter)p.studio_id=sec.studio_id_filter;
if(sec.season_period_filter)p.season_period=sec.season_period_filter;
if(sec.year_filter)p.year=sec.year_filter;
if(sec.section_type==='anime_movies'){p.type='movie';p.anime_type='movie'}
if(sec.section_type==='ongoing_anime')p.status='ongoing';
if(sec.section_type==='latest_added')p.sort_by='newest';
if(sec.section_type==='top_rated')p.sort_by='top_rated';
return p;
}
function openGrid(title,endpoint,kind,params){
if(typeof window._oscarOpenGrid==='function') return _oscarOpenGrid({title,endpoint,kind,params});
}
function openAnime(raw){
const id=first(raw.id,raw.anime_id);
if(!id)return;
if(typeof window._openOscarDetails==='function') _openOscarDetails(`oscar:anime:${id}`,{raw:{...raw,__oscarKind:'anime',__oscarId:id}});
else if(typeof window._bk==='function') _bk(`oscar:anime:${id}`,{raw,title:animeTitle(raw),poster:animePoster(raw)});
}
function openEpisode(raw){
const id=first(raw.id,raw.episode_id);
if(!id)return;
if(typeof window._openOscarEpisode==='function') _openOscarEpisode({id,url:`oscar:animeEpisode:${id}`,raw:{...raw,__oscarKind:'animeEpisode',__oscarId:id},title:animeTitle(raw)});
else if(typeof window._openOscarDetails==='function') _openOscarDetails(`oscar:animeEpisode:${id}`,{raw});
}

function latestCard(raw={}){
const ep=first(raw.episode_number,raw.number,raw.episode,'');
const season=first(raw.season_number,raw.season,'');
const title=first(raw.anime_title,raw.title_ar,raw.title,raw.title_en,'أنمي');
const thumb=media(first(raw.thumbnail,raw.banner,raw.image,raw.anime_banner,raw.anime_poster));
const poster=media(first(raw.anime_poster,raw.poster,''));
const dur=runtime(raw.duration);
const btn=document.createElement('button');
btn.type='button';
btn.className='v33-latest-card';
btn.innerHTML=`
<img class="v33-latest-img" src="${esc(thumb)}" loading="lazy">
<span class="v33-play">▶</span>
${dur?`<em class="v33-duration">${esc(dur)}</em>`:''}
${poster?`<img class="v33-mini-poster" src="${esc(poster)}" loading="lazy">`:''}
<div class="v33-latest-copy">
<b>${esc(title)}</b>
<small>${esc([ep?`الحلقة ${ep}`:'',season?`الموسم ${season}`:''].filter(Boolean).join(' - '))}</small>
</div>
`;
btn.addEventListener('click',()=>openEpisode(raw));
return btn;
}

function posterCard(raw={}){
const btn=document.createElement('button');
btn.type='button';
btn.className='v33-anime-card';
btn.innerHTML=`
<img src="${esc(animePoster(raw))}" loading="lazy">
<div class="v33-card-shade"></div>
${first(raw.episode_count,raw.episodes_count)?`<span class="v33-episodes">▶ ${esc(first(raw.episode_count,raw.episodes_count))}</span>`:''}
<b>${esc(animeTitle(raw))}</b>
`;
btn.addEventListener('click',()=>openAnime(raw));
return btn;
}

function studioCard(raw={}){
const id=first(raw.id,raw.studio_id);
const name=first(raw.name_ar,raw.name_en,raw.name,raw.title_ar,raw.title,'استوديو');
const logo=media(first(raw.logo_url,raw.logo,raw.image,raw.poster,''));
const count=first(raw.anime_count,raw.count,raw.total,'');
const btn=document.createElement('button');
btn.type='button';
btn.className='v33-studio-card';
btn.innerHTML=`
<div class="v33-studio-logo">${logo?`<img src="${esc(logo)}" loading="lazy">`:'<span>ST</span>'}</div>
<b>${esc(name)}</b>
${count?`<small>${esc(count)} عمل</small>`:''}
`;
btn.addEventListener('click',()=>id&&openGrid(name,'anime.list','anime',{page:1,studio_id:id}));
return btn;
}

function genreCard(raw={}){
const id=first(raw.id,raw.genre_id);
const name=first(raw.name_ar,raw.name_en,raw.name,raw.title_ar,raw.title,raw.slug,'تصنيف');
const count=first(raw.anime_count,raw.count,raw.total,'');
const btn=document.createElement('button');
btn.type='button';
btn.className='v33-genre-chip';
btn.innerHTML=`<span>▦</span><b>${esc(name)}</b>${count?`<small>${esc(count)}</small>`:''}`;
btn.addEventListener('click',()=>id&&openGrid(name,'anime.list','anime',{page:1,genre_id:id}));
return btn;
}

function makeSection(title,seeAll=true){
const sec=document.createElement('section');
sec.className='v33-anime-section';
sec.innerHTML=`<div class="v33-head"><h2>${esc(title)}</h2>${seeAll?'<button type="button">عرض الكل</button>':''}</div>`;
return sec;
}

function addAnimeSection(parent,secRaw){
const items=arr(secRaw.items);
if(!items.length)return;
const type=first(secRaw.section_type,secRaw.type);
const title=sectionTitle(secRaw);

if(type==='latest_episodes'){
const sec=makeSection(title,true);
sec.classList.add('v33-latest-section');
sec.querySelector('button').addEventListener('click',()=>openGrid(title,'anime.episodesLatest','animeEpisode',{limit:24}));
const row=document.createElement('div');
row.className='v33-latest-row';
items.slice(0,24).forEach(x=>row.appendChild(latestCard(x)));
sec.appendChild(row);
parent.appendChild(sec);
return;
}

if(type==='studios_browse'||secRaw.type==='studios'){
const sec=makeSection('حسب الاستوديو',false);
const row=document.createElement('div');
row.className='v33-studio-row';
items.slice(0,24).forEach(x=>row.appendChild(studioCard(x)));
sec.appendChild(row);
parent.appendChild(sec);
return;
}

const sec=makeSection(title,true);
sec.querySelector('button').addEventListener('click',()=>openGrid(title,'anime.list','anime',paramsFromSection(secRaw)));
const row=document.createElement('div');
row.className='v33-poster-row';
items.slice(0,18).forEach(x=>row.appendChild(posterCard(x)));
sec.appendChild(row);
parent.appendChild(sec);
}

async function addGenres(parent){
let items=[];
try{items=asList(await api('anime.genres',{}));}catch(e){console.warn('genres failed',e)}
if(!items.length)return;
const sec=makeSection('حسب التصنيف',false);
const row=document.createElement('div');
row.className='v33-genre-row';
items.slice(0,24).forEach(x=>row.appendChild(genreCard(x)));
sec.appendChild(row);
parent.appendChild(sec);
}

window._ensureAnimeContent=async function(){
const container=document.getElementById('qi');
if(!container)return;
let sections=null;
if(typeof window._oscarShell==='function') sections=_oscarShell('anime','الأنمي','animation','أقسام الأنمي من OscarTV');
if(!sections){
container.dataset.mode='anime';
container.innerHTML='<section class="library-shell"><div class="library-sections"></div></section>';
sections=container.querySelector('.library-sections');
}
sections.innerHTML='';
const loading=document.createElement('div');
loading.className='v33-loading';
loading.textContent='جاري تحميل أقسام الأنمي...';
sections.appendChild(loading);

try{
const home=asList(await api('anime.home',{}));
loading.remove();

const ordered=['latest_episodes','latest_added','anime_movies','ongoing_anime','top_rated','most_viewed','studios_browse'];
const used=new Set();

ordered.forEach(key=>{
home.filter(s=>s.section_type===key).forEach(s=>{
addAnimeSection(sections,s);
used.add(s);
});
});
home.forEach(s=>{
if(!used.has(s)) addAnimeSection(sections,s);
});
await addGenres(sections);

if(!sections.children.length){
sections.appendChild(Object.assign(document.createElement('div'),{className:'v33-loading',textContent:'لا توجد أقسام أنمي متاحة'}));
}
if(window.state)state.animeContentReady=true;
}catch(e){
console.error('anime home failed',e);
loading.textContent='تعذر تحميل أقسام الأنمي';
}
};

if(window.state)state.animeContentReady=false;
if(document.querySelector('#qi[data-mode="anime"]')){
setTimeout(()=>window._ensureAnimeContent&&window._ensureAnimeContent(),0);
}

const style=document.createElement('style');
style.id='v33AnimeHomeSectionsStyle';
style.textContent=`
#qi[data-mode="anime"] .library-head{display:none!important}
#qi[data-mode="anime"] .library-shell{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important}
#qi[data-mode="anime"] .library-sections{display:block!important}
.v33-loading{padding:18px;color:rgba(255,255,255,.65);font-family:'Thmanyah',sans-serif;text-align:center}
.v33-anime-section{margin:0 0 24px;padding:14px 12px 16px;border-radius:20px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);box-shadow:0 14px 34px rgba(0,0,0,.18);overflow:hidden}
.v33-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 13px;direction:rtl}
.v33-head h2{position:relative;margin:0;padding-right:12px;color:#fff;font-family:'Thmanyah',sans-serif;font-size:19px;font-weight:900;line-height:1.25;text-align:right}
.v33-head h2::after{content:'';position:absolute;right:0;top:2px;width:5px;height:24px;border-radius:99px;background:#e50914}
.v33-head button{border:0;background:transparent;color:#e50914;font-family:'Thmanyah',sans-serif;font-size:13px;font-weight:900;padding:0;white-space:nowrap}

.v33-latest-row{display:flex;gap:12px;overflow-x:auto;overflow-y:hidden;direction:rtl;padding:2px 2px 6px;scrollbar-width:none}
.v33-latest-row::-webkit-scrollbar,.v33-poster-row::-webkit-scrollbar,.v33-studio-row::-webkit-scrollbar,.v33-genre-row::-webkit-scrollbar{display:none}
.v33-latest-card{flex:0 0 calc((100% - 12px)/2);width:calc((100% - 12px)/2);height:126px;border:0;border-radius:17px;overflow:hidden;background:#111;position:relative;padding:0;color:#fff;font-family:'Thmanyah',sans-serif;text-align:right}
.v33-latest-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.v33-latest-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.18) 42%,rgba(0,0,0,.78) 100%)}
.v33-play{position:absolute;z-index:3;inset:0;margin:auto;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(0,0,0,.38);font-size:20px}
.v33-duration{position:absolute;z-index:4;top:9px;right:9px;background:rgba(0,0,0,.72);border-radius:8px;padding:3px 7px;color:#fff;font-size:11px;font-style:normal;font-weight:900}
.v33-mini-poster{position:absolute;z-index:4;right:8px;bottom:8px;width:38px;height:54px;border-radius:7px;object-fit:cover;box-shadow:0 4px 12px rgba(0,0,0,.45)}
.v33-latest-copy{position:absolute;z-index:4;left:9px;right:52px;bottom:10px;color:#fff;text-shadow:0 2px 8px #000}
.v33-latest-copy b{display:block;font-size:12px;font-weight:900;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v33-latest-copy small{display:block;margin-top:2px;color:rgba(255,255,255,.75);font-size:10.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.v33-poster-row{display:flex;gap:14px;overflow-x:auto;overflow-y:hidden;direction:rtl;padding:2px 2px 4px;scrollbar-width:none}
.v33-anime-card{flex:0 0 136px;width:136px;height:202px;border:0;border-radius:17px;overflow:hidden;background:#111;position:relative;padding:0;color:#fff;font-family:'Thmanyah',sans-serif;text-align:right}
.v33-anime-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.v33-card-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.02) 0%,rgba(0,0,0,.20) 48%,rgba(0,0,0,.80) 100%)}
.v33-anime-card b{position:absolute;z-index:3;left:8px;right:8px;bottom:10px;color:#fff;font-size:14px;font-weight:900;line-height:1.25;text-align:center;text-shadow:0 2px 8px #000;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.v33-episodes{position:absolute;z-index:3;top:8px;left:8px;height:30px;min-width:42px;padding:0 8px;border-radius:10px;background:rgba(0,0,0,.55);display:inline-flex;align-items:center;justify-content:center;gap:5px;color:#fff;font-size:14px;font-weight:900}

.v33-studio-row,.v33-genre-row{display:flex;gap:10px;overflow-x:auto;overflow-y:hidden;direction:rtl;padding:1px 2px 4px;scrollbar-width:none}
.v33-studio-card{flex:0 0 170px;height:76px;border:1px solid rgba(255,255,255,.11);border-radius:17px;background:rgba(255,255,255,.06);color:#fff;display:grid;grid-template-columns:44px 1fr;grid-template-rows:1fr auto;align-items:center;gap:0 10px;padding:9px 11px;font-family:'Thmanyah',sans-serif;text-align:right;direction:rtl}
.v33-studio-logo{grid-row:1/span 2;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.08);display:grid;place-items:center;overflow:hidden}
.v33-studio-logo img{width:100%;height:100%;object-fit:contain;background:#fff}
.v33-studio-logo span{font-size:12px;font-weight:900;color:#e50914}
.v33-studio-card b{font-size:13px;font-weight:900;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v33-studio-card small{font-size:10px;color:rgba(255,255,255,.55);font-weight:700}

.v33-genre-chip{flex:0 0 150px;height:54px;border:1px solid rgba(255,255,255,.10);border-radius:16px;background:rgba(255,255,255,.06);color:#fff;display:grid;grid-template-columns:28px 1fr;grid-template-rows:1fr auto;align-items:center;gap:0 8px;padding:8px 11px;font-family:'Thmanyah',sans-serif;text-align:right;direction:rtl}
.v33-genre-chip span{grid-row:1/span 2;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:rgba(229,9,20,.16);color:#e50914;font-size:16px}
.v33-genre-chip b{font-size:13px;font-weight:900;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.v33-genre-chip small{font-size:10px;color:rgba(255,255,255,.55);font-weight:700}

@media(max-width:430px){
.v33-anime-section{margin-bottom:20px;padding:12px 10px 14px;border-radius:18px}
.v33-head h2{font-size:18px}
.v33-latest-card{height:126px}
.v33-anime-card{width:132px;flex-basis:132px;height:198px}
.v33-studio-card{flex-basis:166px}
.v33-genre-chip{flex-basis:148px}
}
`;
document.head.appendChild(style);
})();

/* Stage 4A: V34 channel list only; details handled by V35 */
(()=> {
const API_ORIGIN = 'https://ostv-11-55.xyz';
const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const arr = v => Array.isArray(v) ? v : [];

function val(v){
if (v === 0 || v === false) return String(v);
if (v === undefined || v === null) return '';
if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v).trim();
if (typeof v === 'object') return val(v.name_ar || v.name || v.title_ar || v.title || v.label || v.code || '');
return '';
}
function first(...vals){ for(const v of vals){ const s=val(v); if(s) return s; } return ''; }

function dataOf(res){
return res?.upstream?.data?.data ?? res?.data?.data ?? res?.data ?? res ?? {};
}
function listOf(res){
if (window._oscarList) {
try {
const x = _oscarList(res);
if (Array.isArray(x)) return x;
} catch(_){}
}
const d = dataOf(res);
if (Array.isArray(d)) return d;
if (Array.isArray(d?.data)) return d.data;
if (Array.isArray(d?.items)) return d.items;
if (Array.isArray(d?.channels)) return d.channels;
return [];
}
async function call(name, params={}){
if (!window._oscarCall) throw new Error('Oscar API missing');
return _oscarCall(name, params);
}

function media(v){
const s = first(v);
if (!s) return (window.CONFIG && CONFIG.FALLBACK_POSTER) || '';
if (/^https?:\/\//i.test(s) || /^data:/i.test(s)) return s;
if (s.startsWith('/uploads/')) return API_ORIGIN + s;
if (s.startsWith('uploads/')) return API_ORIGIN + '/' + s;
try { return window._az ? _az(s) : s; } catch(_) { return s; }
}

function channelId(raw={}){
return first(raw.id, raw.channel_id, raw.item_id, raw.__oscarId);
}
function channelTitle(raw={}){
return first(raw.name_ar, raw.title_ar, raw.channel_name, raw.name, raw.title, raw.name_en, 'قناة');
}
function channelLogo(raw={}){
return media(first(raw.logo_url, raw.channel_logo, raw.logo, raw.poster, raw.image, raw.icon, raw.thumbnail));
}
function channelCountry(raw={}){
return first(raw.country_name_ar, raw.country_name, raw.country, raw.country_code, raw.flag_name, '');
}
function channelCategory(raw={}){
return first(raw.category_name_ar, raw.category_name, raw.category, raw.collection_name, raw.type_name, 'قنوات');
}



function mergeChannels(collections, listed){
const result = [];
const seen = new Set();

const push = (raw, extra={}) => {
if (!raw || typeof raw !== 'object') return;
const merged = {...raw, ...extra};
const id = channelId(merged);
const key = id || channelTitle(merged) + '|' + channelLogo(merged);
if (!key || seen.has(key)) return;
seen.add(key);
result.push(merged);
};

arr(collections).forEach(group => {
const groupName = first(group.name_ar, group.name, group.title_ar, group.title, group.category_name, '');
const groupItems = arr(group.channels).length ? arr(group.channels) : arr(group.items);
if (groupItems.length) groupItems.forEach(ch => push(ch, {collection_name:groupName}));
else if (channelId(group)) push(group, {collection_name:groupName});
});
arr(listed).forEach(ch => push(ch));

return result;
}

function openChannel(raw){
const id = channelId(raw);
if (!id) return;
if (typeof window._openOscarDetails === 'function') {
window._openOscarDetails(`oscar:channel:${id}`, {
raw:{...raw,__oscarKind:'channel',__oscarId:id},
title:channelTitle(raw),
poster:channelLogo(raw)
});
}
}

function channelCard(raw={}){
const btn = document.createElement('button');
btn.type = 'button';
btn.className = 'osch-card';
btn.dataset.country = channelCountry(raw).toLowerCase();
btn.dataset.category = channelCategory(raw).toLowerCase();
btn.dataset.search = `${channelTitle(raw)} ${channelCountry(raw)} ${channelCategory(raw)}`.toLowerCase();
btn.innerHTML = `
<div class="osch-logo-box">
<img src="${esc(channelLogo(raw))}" alt="${esc(channelTitle(raw))}" loading="lazy">
</div>
<b>${esc(channelTitle(raw))}</b>
<small>${esc(channelCategory(raw))}</small>
`;
btn.querySelector('img').addEventListener('error', e => {
e.currentTarget.style.opacity = '.18';
});
btn.addEventListener('click', () => openChannel(raw));
return btn;
}

function filterButtons(items, field, limit=6){
const vals = [...new Set(items.map(x => field === 'country' ? channelCountry(x) : channelCategory(x)).filter(Boolean))].slice(0, limit);
return vals;
}

function renderChannelGrid(grid, items, filters){
grid.textContent = '';
const country = String(filters.country || '').toLowerCase();
const category = String(filters.category || '').toLowerCase();
const search = String(filters.search || '').trim().toLowerCase();

const shown = items.filter(ch => {
if (country && channelCountry(ch).toLowerCase() !== country) return false;
if (category && channelCategory(ch).toLowerCase() !== category) return false;
if (search) {
const hay = `${channelTitle(ch)} ${channelCountry(ch)} ${channelCategory(ch)}`.toLowerCase();
if (!hay.includes(search)) return false;
}
return true;
});

if (!shown.length) {
grid.innerHTML = `<div class="osch-empty">لا توجد قنوات مطابقة</div>`;
return;
}
shown.forEach(ch => grid.appendChild(channelCard(ch)));
}

window._ensureLiveContent = async function(){
const holder = document.getElementById('qi');
if (!holder) return;
holder.dataset.mode = 'live';
holder.innerHTML = `
<section class="osch-page">
<header class="osch-page-head">
<h1>القنوات</h1>
<button type="button" class="osch-search-toggle" aria-label="بحث">
<svg viewBox="0 0 24 24"><path d="M10.7 4a6.7 6.7 0 1 1 0 13.4A6.7 6.7 0 0 1 10.7 4Zm0 2a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm5.9 9.2 3.1 3.1a1 1 0 1 1-1.4 1.4l-3.1-3.1a1 1 0 0 1 1.4-1.4Z"/></svg>
</button>
</header>
<div class="osch-search hidden"><input type="search" placeholder="ابحث عن قناة"></div>
<div class="osch-filter-bar">
<button type="button" class="active" data-country="">الكل</button>
<div class="osch-country-tabs"></div>
<label class="osch-category-select">
<select><option value="">التصنيف</option></select>
</label>
</div>
<div class="osch-grid"><div class="osch-loading">جاري تحميل القنوات...</div></div>
</section>
`;

const page = holder.querySelector('.osch-page');
const grid = page.querySelector('.osch-grid');
const tabs = page.querySelector('.osch-country-tabs');
const select = page.querySelector('select');
const searchWrap = page.querySelector('.osch-search');
const searchInput = searchWrap.querySelector('input');
const filters = {country:'', category:'', search:''};

try {
const [collectionsRes, listRes] = await Promise.all([
call('channels.collections', {}).catch(() => []),
call('channels.list', {page:1, limit:120}).catch(() => [])
]);
const collections = listOf(collectionsRes);
const listed = listOf(listRes);
const items = mergeChannels(collections, listed);

const countries = filterButtons(items, 'country', 6);
countries.forEach(name => {
const b = document.createElement('button');
b.type = 'button';
b.textContent = name;
b.dataset.country = name.toLowerCase();
tabs.appendChild(b);
});

const categories = filterButtons(items, 'category', 50);
categories.forEach(name => {
const o = document.createElement('option');
o.value = name.toLowerCase();
o.textContent = name;
select.appendChild(o);
});

const allCountryButtons = () => page.querySelectorAll('[data-country]');
allCountryButtons().forEach(btn => btn.addEventListener('click', () => {
filters.country = btn.dataset.country || '';
allCountryButtons().forEach(x => x.classList.toggle('active', x === btn));
renderChannelGrid(grid, items, filters);
}));
select.addEventListener('change', () => {
filters.category = select.value;
renderChannelGrid(grid, items, filters);
});
searchInput.addEventListener('input', () => {
filters.search = searchInput.value;
renderChannelGrid(grid, items, filters);
});
page.querySelector('.osch-search-toggle').addEventListener('click', () => {
searchWrap.classList.toggle('hidden');
if (!searchWrap.classList.contains('hidden')) searchInput.focus();
});

renderChannelGrid(grid, items, filters);
if (window.state) state.liveContentReady = true;
} catch(e) {
console.error('channels page failed', e);
grid.innerHTML = `<div class="osch-empty">تعذر تحميل القنوات</div>`;
}
};


if (window.state) state.liveContentReady = false;
setTimeout(() => {
if (window.state && state.homeMode === 'live') window._ensureLiveContent();
}, 0);

document.addEventListener('click', e => {
if (e.target.closest('[data-main-mode="live"]')) {
setTimeout(() => window._ensureLiveContent && window._ensureLiveContent(), 100);
}
}, true);

const style = document.createElement('style');
style.id = 'v34OscarChannelsExactStyle';
style.textContent = `


#qi[data-mode="live"] .library-head{display:none!important}
.osch-page{padding:4px 6px 100px;font-family:'Thmanyah',sans-serif;color:#fff}
.osch-page-head{display:flex;align-items:center;justify-content:space-between;direction:rtl;padding:4px 4px 14px}
.osch-page-head h1{margin:0;font-size:30px;font-weight:900;line-height:1}
.osch-search-toggle{width:42px;height:42px;border:0;background:transparent;color:#fff;display:grid;place-items:center;padding:0}
.osch-search-toggle svg{width:30px;height:30px;fill:#fff}
.osch-search{margin:0 0 12px}
.osch-search.hidden{display:none}
.osch-search input{width:100%;height:50px;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.06);color:#fff;font-family:inherit;font-size:14px;padding:0 16px;outline:0;text-align:right}

.osch-filter-bar{display:flex;align-items:center;gap:6px;overflow-x:auto;padding:0 0 14px;direction:rtl;scrollbar-width:none}
.osch-filter-bar::-webkit-scrollbar{display:none}
.osch-filter-bar button{height:48px;min-width:70px;border:0;border-radius:12px;background:transparent;color:rgba(255,255,255,.62);font-family:inherit;font-size:14px;font-weight:700;padding:0 14px;white-space:nowrap}
.osch-filter-bar button.active{background:#e50914;color:#fff}
.osch-country-tabs{display:flex;align-items:center;gap:3px}
.osch-category-select{position:relative;flex:0 0 auto}
.osch-category-select select{height:48px;min-width:128px;border:0;border-radius:12px;background:#202020;color:#fff;font-family:inherit;font-size:14px;padding:0 14px;outline:0;text-align:center}

.osch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px 14px;align-items:start;padding:4px 2px}
.osch-card{width:100%;min-width:0;border:0;background:transparent;color:#fff;padding:0;font-family:inherit;text-align:center;cursor:pointer}
.osch-logo-box{width:100%;aspect-ratio:1/1;border-radius:16px;background:#202020;border:1px solid rgba(255,255,255,.045);display:grid;place-items:center;padding:14px;overflow:hidden}
.osch-logo-box img{width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center!important;border-radius:0!important;display:block!important}
.osch-card b{display:block;margin-top:8px;color:#fff;font-size:13px;font-weight:700;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.osch-card small{display:block;margin-top:4px;color:rgba(255,255,255,.43);font-size:10.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.osch-loading,.osch-empty{grid-column:1/-1;padding:28px 12px;color:rgba(255,255,255,.58);text-align:center;font-family:inherit}


@media(max-width:430px){
.osch-page{padding-left:2px;padding-right:2px}
.osch-grid{gap:22px 12px}
.osch-logo-box{padding:12px;border-radius:15px}
.osch-card b{font-size:12px}
}
`;
document.head.appendChild(style);
})();

(()=> {
const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const arr = v => Array.isArray(v) ? v : [];

function val(v){
if(v===0 || v===false) return String(v);
if(v===undefined || v===null) return '';
if(typeof v==='string' || typeof v==='number' || typeof v==='boolean') return String(v).trim();
if(typeof v==='object') return val(v.name_ar || v.name || v.title_ar || v.title || v.label || v.code || '');
return '';
}
function first(...vals){ for(const v of vals){ const s=val(v); if(s) return s; } return ''; }
function dataOf(res){ return res?.upstream?.data?.data ?? res?.data?.data ?? res?.data ?? res ?? {}; }
function detailOf(res){
try { if(window._oscarDetail) return _oscarDetail(res); } catch(_){}
return dataOf(res);
}
async function call(name, params={}){
if(!window._oscarCall) throw new Error('Oscar API missing');
return _oscarCall(name, params);
}
function media(v){
const s=first(v);
if(!s) return (window.CONFIG && CONFIG.FALLBACK_POSTER) || '';
if(/^https?:\/\//i.test(s) || /^data:/i.test(s)) return s;
if(s.startsWith('/uploads/')) return 'https://ostv-11-55.xyz'+s;
if(s.startsWith('uploads/')) return 'https://ostv-11-55.xyz/'+s;
try { return window._az ? _az(s) : s; } catch(_) { return s; }
}
function compact(n){
const x=Number(n||0);
if(!Number.isFinite(x)||x<=0) return '';
if(x>=1000000) return (x/1000000).toFixed(x>=10000000?0:1).replace(/\.0$/,'')+'M';
if(x>=1000) return (x/1000).toFixed(x>=10000?0:1).replace(/\.0$/,'')+'K';
return String(x);
}
function channelId(raw={}){ return first(raw.id,raw.channel_id,raw.item_id,raw.__oscarId); }
function channelTitle(raw={}){ return first(raw.name_ar,raw.title_ar,raw.channel_name,raw.name,raw.title,raw.name_en,'قناة'); }
function channelLogo(raw={}){ return media(first(raw.logo_url,raw.channel_logo,raw.logo,raw.poster,raw.image,raw.icon,raw.thumbnail)); }
function channelBanner(raw={}){ return media(first(raw.banner,raw.backdrop,raw.cover,raw.background,raw.bg_image,raw.channel_banner,channelLogo(raw))); }
function channelCountry(raw={}){ return first(raw.country_name_ar,raw.country_name,raw.country,raw.country_code,''); }
function channelCategory(raw={}){ return first(raw.category_name_ar,raw.category_name,raw.category,raw.collection_name,raw.type_name,'قنوات'); }

function parseChannel(url,hint={}){
const m=String(url||'').match(/^oscar:channel:(.+)$/);
if(m) return {id:m[1]};
const raw=hint.raw||hint||{};
const id=channelId(raw);
return id ? {id} : null;
}
function streamUrl(s={}){
if(typeof s==='string') return /^https?:\/\//i.test(s) ? s : '';
return first(s.stream_url,s.url,s.link,s.file,s.src,s.video,s.hls,s.m3u8,s.deep_link);
}
function streamsOf(raw={}){
const out=[];
const add=(s,parent={})=>{
if(!s) return;
if(typeof s==='string') s={stream_url:s};
if(typeof s!=='object') return;
const url=streamUrl(s);
if(!/^https?:\/\//i.test(url)) return;
out.push({
url,
open:first(s.deep_link,url),
name:first(s.server_name,s.server,s.name,s.label,parent.server_name,'سيرفر مباشر'),
quality:first(s.quality,s.resolution,s.label_quality,parent.quality,''),
type:first(s.stream_type,s.type,s.format,parent.stream_type,'رابط مباشر')
});
};
const walk=(v,parent={})=>{
if(!v) return;
if(Array.isArray(v)){v.forEach(x=>walk(x,parent));return;}
if(typeof v==='string'){add(v,parent);return;}
if(typeof v!=='object') return;
if(streamUrl(v)) add(v,parent);
['streams','sources','servers','links','qualities','items','channels'].forEach(k=>{
if(v[k]) walk(v[k],{...parent,...v});
});
};
walk(raw.streams);
walk(raw.sources);
walk(raw.servers);
if(!out.length) walk(raw);
const seen=new Set();
return out.filter(x=>x.url&&!seen.has(x.url)&&seen.add(x.url)).sort((a,b)=>{
const qa=Number((String(a.quality).match(/\d+/)||[0])[0]);
const qb=Number((String(b.quality).match(/\d+/)||[0])[0]);
return qb-qa;
});
}
function cleanServerTitle(name,quality,index){
let n=first(name,`سيرفر ${index+1}`);
if(quality){
const q=String(quality).replace(/\s+/g,'').toLowerCase();
n=n.replace(new RegExp('\\s*[-•♦]?\\s*'+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'ig'),'').trim();
}
return n || `سيرفر ${index+1}`;
}
function openStream(url){
if(!url) return;
try{ window.open(url,'_blank'); }catch(_){ location.href=url; }
}

function removeChannelOverlay(){
const overlay=document.getElementById('oschChannelOverlay');
if(!overlay) return false;
overlay.remove();
document.body.style.overflow='';
return true;
}

const previousOpen=window._openOscarDetails;
window._openOscarDetails=async function(url,hint={}){
const token=parseChannel(url,hint);
const rawHint=hint.raw||hint||{};
const isChannel=!!token && (
String(url||'').startsWith('oscar:channel:') ||
rawHint.__oscarKind==='channel' ||
rawHint.item_type==='channel'
);
if(!isChannel) return previousOpen ? previousOpen.apply(this,arguments) : undefined;

removeChannelOverlay();

const overlay=document.createElement('div');
overlay.id='oschChannelOverlay';
overlay.className='osch35-overlay';
overlay.innerHTML=`<div class="osch35-loading">جاري تحميل القناة...</div>`;
document.body.appendChild(overlay);
document.body.style.overflow='hidden';

try{
history.pushState({osch35Channel:true,id:token.id},'',location.href);
}catch(_){}

try{
const raw=detailOf(await call('channels.show',{id:token.id}));
const title=channelTitle(raw)||channelTitle(rawHint);
const logo=channelLogo(raw)||channelLogo(rawHint);
const banner=channelBanner(raw)||channelBanner(rawHint)||logo;
const streams=streamsOf(raw);
const related=arr(raw.related_channels).length?arr(raw.related_channels):arr(raw.related);

overlay.innerHTML=`
<div class="osch35-bg" style="background-image:url('${esc(banner)}')"></div>
<main class="osch35-content">
<section class="osch35-hero">
<div class="osch35-logo"><img src="${esc(logo)}" alt="${esc(title)}"></div>
<h1>${esc(title)}</h1>
<div class="osch35-meta">
${compact(raw.views_count)?`<span>👁 ${esc(compact(raw.views_count))}</span>`:''}
${channelCountry(raw)?`<span>${esc(channelCountry(raw))}</span>`:''}
${channelCategory(raw)?`<span>${esc(channelCategory(raw))}</span>`:''}
</div>
</section>

<section class="osch35-streams">
<h2>سيرفرات البث</h2>
<div class="osch35-list">
${streams.length?streams.map((s,index)=>`
<button type="button" class="osch35-card" data-stream="${esc(s.open||s.url)}">
<span class="osch35-quality">${esc(s.quality||'LIVE')}</span>
<span class="osch35-copy">
<b>${esc(cleanServerTitle(s.name,s.quality,index))}</b>
<small>${esc(s.type||'رابط مباشر')}</small>
</span>
<span class="osch35-play">
<svg viewBox="0 0 24 24"><path d="M8.6 5.2c-.9-.55-2.1.1-2.1 1.18v11.24c0 1.08 1.2 1.73 2.1 1.18l9.2-5.62a1.38 1.38 0 0 0 0-2.36L8.6 5.2Z"/></svg>
</span>
</button>`).join(''):`<div class="osch35-empty">لا توجد سيرفرات بث متاحة</div>`}
</div>
</section>

${related.length?`
<section class="osch35-related">
<h2>قنوات مرتبطة</h2>
<div class="osch35-related-grid">
${related.slice(0,6).map(ch=>`
<button type="button" data-related="${esc(channelId(ch))}">
<div><img src="${esc(channelLogo(ch))}" loading="lazy"></div>
<b>${esc(channelTitle(ch))}</b>
</button>`).join('')}
</div>
</section>`:''}
</main>`;

overlay.querySelector('.osch35-logo img')?.addEventListener('error',e=>e.currentTarget.style.opacity='.18');
overlay.querySelectorAll('[data-stream]').forEach(btn=>btn.addEventListener('click',()=>openStream(btn.dataset.stream)));
overlay.querySelectorAll('[data-related]').forEach(btn=>btn.addEventListener('click',()=>{
const id=btn.dataset.related;
if(id) window._openOscarDetails(`oscar:channel:${id}`,{raw:{id,__oscarKind:'channel'}});
}));
}catch(e){
console.error('V35 channel detail failed',e);
overlay.innerHTML=`<div class="osch35-loading">تعذر تحميل تفاصيل القناة</div>`;
}
};

const style=document.createElement('style');
style.id='v35ChannelCompactStyle';
style.textContent=`

.osch35-overlay{position:fixed;inset:0;z-index:9000;overflow-y:auto;overflow-x:hidden;background:#050505;color:#fff;direction:rtl;font-family:'Thmanyah',sans-serif;scrollbar-width:none}
.osch35-overlay::-webkit-scrollbar{display:none;width:0}
.osch35-bg{position:absolute;inset:0 0 auto 0;height:300px;background-size:cover;background-position:center top;opacity:.57}
.osch35-bg::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.12) 0%,rgba(0,0,0,.58) 57%,#050505 100%)}
.osch35-content{position:relative;z-index:2;padding:150px 24px 90px}
.osch35-hero{text-align:center}
.osch35-logo{width:108px;height:108px;margin:0 auto 14px;border-radius:16px;background:rgba(25,25,25,.80);display:grid;place-items:center;padding:13px;overflow:hidden;box-shadow:0 12px 28px rgba(0,0,0,.38)}
.osch35-logo img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;border-radius:0!important;display:block!important}
.osch35-hero h1{margin:0;color:#fff;font-size:21px;font-weight:900;line-height:1.35}
.osch35-meta{display:flex;justify-content:center;align-items:center;gap:8px;flex-wrap:wrap;margin-top:13px}
.osch35-meta span{height:31px;min-width:72px;border:1px solid rgba(255,255,255,.22);border-radius:14px;background:rgba(255,255,255,.055);display:inline-flex;align-items:center;justify-content:center;padding:0 11px;color:rgba(255,255,255,.68);font-size:11px;font-weight:700}

.osch35-streams,.osch35-related{margin-top:34px}
.osch35-streams h2,.osch35-related h2{position:relative;margin:0 0 15px;padding-right:11px;color:#fff;font-size:22px;font-weight:900;line-height:1.2;text-align:right}
.osch35-streams h2::after,.osch35-related h2::after{content:'';position:absolute;right:0;top:1px;width:5px;height:28px;border-radius:99px;background:#e50914}
.osch35-list{display:flex;flex-direction:column;gap:10px}
.osch35-card{width:100%;min-height:72px;border:0;border-radius:12px;background:#ed0915;color:#fff;display:grid;grid-template-columns:64px 1fr 28px;gap:11px;align-items:center;padding:9px 13px;font-family:inherit;text-align:right;direction:ltr;cursor:pointer}
.osch35-quality{height:38px;border-radius:9px;background:#ffd84d;color:#151515;display:grid;place-items:center;padding:0 8px;font-size:12px;font-weight:900;white-space:nowrap}
.osch35-copy{direction:rtl;min-width:0}
.osch35-copy b{display:block;color:#fff;font-size:14px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.osch35-copy small{display:block;margin-top:3px;color:rgba(255,255,255,.66);font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.osch35-play{display:grid;place-items:center}
.osch35-play svg{width:24px;height:24px;fill:#fff}

.osch35-related-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
.osch35-related-grid button{border:0;background:transparent;color:#fff;font-family:inherit;padding:0;text-align:center}
.osch35-related-grid div{aspect-ratio:1/1;border-radius:14px;background:#202020;display:grid;place-items:center;padding:10px;overflow:hidden}
.osch35-related-grid img{width:100%;height:100%;object-fit:contain}
.osch35-related-grid b{display:block;margin-top:6px;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.osch35-loading,.osch35-empty{min-height:100vh;display:grid;place-items:center;color:rgba(255,255,255,.62);font-family:'Thmanyah',sans-serif;font-size:15px;font-weight:700}

@media(max-width:430px){
.osch35-bg{height:285px}
.osch35-content{padding:142px 22px 85px}
.osch35-logo{width:102px;height:102px}
.osch35-hero h1{font-size:20px}
.osch35-card{min-height:70px;grid-template-columns:61px 1fr 26px;padding:9px 12px}
.osch35-quality{height:36px;font-size:11.5px}
.osch35-copy b{font-size:13.5px}
.osch35-streams h2,.osch35-related h2{font-size:21px}
}
`;
document.head.appendChild(style);
})();

(function(){
'use strict';

function removeFirst(ids){
for(const id of ids){
const el=document.getElementById(id);
if(el){el.remove();return true;}
}
return false;
}

function closeChannel(){
const overlay=document.getElementById('oschChannelOverlay');
if(!overlay)return false;
overlay.remove();
document.body.style.overflow='';
return true;
}

function closeDetails(){
const modal=document.getElementById('qs');
if(!modal)return false;
if(!modal.classList.contains('show')&&!modal.querySelector('.osx-detail-page'))return false;
modal.classList.remove('show','osx-v28-mode','osx-detail-mode');
modal.innerHTML='';
delete modal.dataset.v29Pushed;
document.body.style.overflow='';
return true;
}

function gridElement(){
return document.getElementById('qae');
}

function isGridOpen(){
const grid=gridElement();
return !!(grid&&!grid.classList.contains('hidden'));
}

function pushGridState(){
const grid=gridElement();
if(!grid||grid.classList.contains('hidden')||grid.dataset.phoneBackPushed==='1')return;
try{
history.pushState({appView:'grid',t:Date.now()},'',location.href);
grid.dataset.phoneBackPushed='1';
}catch(_){ }
}

function closeGrid(){
const grid=gridElement();
if(!grid||grid.classList.contains('hidden'))return false;
if(typeof window._cy==='function')window._cy();
else{
grid.classList.add('hidden');
document.getElementById('qr')?.classList.remove('hidden');
}
delete grid.dataset.phoneBackPushed;
return true;
}

function wrapGridOpen(name){
const old=window[name];
if(typeof old!=='function'||old.__phoneBackGridWrapped)return;
const wrapped=function(...args){
const result=old.apply(this,args);
Promise.resolve(result).finally(()=>setTimeout(pushGridState,0));
return result;
};
wrapped.__phoneBackGridWrapped=true;
window[name]=wrapped;
}

wrapGridOpen('_oscarOpenGrid');
wrapGridOpen('_b1');
wrapGridOpen('_aV');

function useHistoryForGridButton(event){
if(!isGridOpen())return;
const grid=gridElement();
event.preventDefault();
event.stopImmediatePropagation();
if(grid&&grid.dataset.phoneBackPushed==='1')history.back();
else closeGrid();
}

document.getElementById('qaE')?.addEventListener('click',useHistoryForGridButton,true);
document.getElementById('qar')?.addEventListener('click',useHistoryForGridButton,true);

window.addEventListener('popstate',function(){
if(removeFirst(['osxV28Links','osxV28Seasons']))return;
if(closeChannel())return;
if(closeDetails())return;
closeGrid();
},true);
})();

(function(){
'use strict';
const plans=['live_channels','full','live_channels_anime','rest_anime'];
function normalizedPlan(){
let raw=String((window.JOAAN_PROVISION&&window.JOAAN_PROVISION.plan)||(panelSubscription&&panelSubscription.plan)||(panelPayload&&panelPayload.subscription&&panelPayload.subscription.plan)||'full').trim().toLowerCase();
if(raw==='live_only')raw='live_channels';
if(raw==='rest_only')raw='rest_anime';
return plans.includes(raw)?raw:'full';
}
function fallbackPermissions(plan){
const rest=plan==='rest_anime'||plan==='full';
const live=plan==='live_channels'||plan==='live_channels_anime'||plan==='full';
const anime=plan==='rest_anime'||plan==='live_channels_anime'||plan==='full';
return{rest,live,channels:live,anime,matches:live,timer:live,video:rest||live||anime};
}
_bN=normalizedPlan;
_Q=function(){
const fallback=fallbackPermissions(normalizedPlan());
const server=panelPermissions&&typeof panelPermissions==='object'?panelPermissions:{};
const result={};
Object.keys(fallback).forEach(key=>{result[key]=server[key]===undefined?fallback[key]:server[key]!==false;});
return result;
};
_aA=function(){
const plan=normalizedPlan();
document.body.classList.remove('plan-live-channels','plan-full','plan-live-channels-anime','plan-rest-anime','plan-live-only','plan-rest-only');
document.body.classList.add('plan-'+plan.replaceAll('_','-'));
};
_defaultHomeMode=function(){
const p=_Q();
if(p.live||p.channels||p.matches)return'live';
if(p.rest)return'rest';
if(p.anime)return'anime';
return'rest';
};
function modeAllowed(mode,p){
if(mode==='live')return !!(p.live||p.channels||p.matches);
if(mode==='rest')return !!p.rest;
if(mode==='anime')return !!p.anime;
return false;
}
function firstAllowed(p){return['live','rest','anime'].find(mode=>modeAllowed(mode,p))||'rest';}
_ensureModeSwitch=function(){
const header=document.querySelector('.xaX.xI')||document.querySelector('.xac');
if(!header)return;
let box=document.getElementById('qModeSwitch');
if(!box){
box=_a('section',{className:'mode-switch-card',attrs:{id:'qModeSwitch'}});
box.innerHTML='<div class="mode-switch-copy"><span class="icon">auto_awesome_motion</span><div><strong>اختر الواجهة</strong><small>تظهر لك الخدمات المشمولة فقط في اشتراك شبكتك</small></div></div><div class="mode-segment"><button type="button" data-main-mode="live"><span class="icon">live_tv</span><span>بث مباشر وقنوات</span></button><button type="button" data-main-mode="rest"><span class="icon">play_circle</span><span>الاستراحة</span></button><button type="button" data-main-mode="anime"><span class="icon">animation</span><span>الأنمي</span></button></div>';
header.insertAdjacentElement('afterend',box);
box.querySelectorAll('[data-main-mode]').forEach(btn=>btn.addEventListener('click',()=>_setHomeMode(btn.dataset.mainMode,true)));
}
const p=_Q();
let visible=0;
box.querySelectorAll('[data-main-mode]').forEach(btn=>{const allowed=modeAllowed(btn.dataset.mainMode,p);btn.classList.toggle('hidden',!allowed);btn.disabled=!allowed;if(allowed)visible++;});
box.classList.toggle('hidden',visible<=1);
document.getElementById('qai')?.classList.toggle('hidden',!p.rest);
document.getElementById('qP')?.classList.toggle('hidden',!p.rest);
_updateModeSwitch();
};
_setHomeMode=function(mode='live',save=false){
const p=_Q();
let next=['live','rest','anime'].includes(mode)?mode:firstAllowed(p);
if(!modeAllowed(next,p))next=firstAllowed(p);
state.homeMode=next;
state.grid={mode:'home',key:'',title:'',page:1};
$('#qae')?.classList.add('hidden');
$('#qr')?.classList.remove('hidden');
_ba('');
document.body.classList.toggle('home-live-mode',next==='live');
document.body.classList.toggle('home-rest-mode',next==='rest');
document.body.classList.toggle('home-anime-mode',next==='anime');
_updateModeSwitch();
if(next==='live'){
if(p.matches)_W(true);else{_e();$('#qe')?.classList.add('hidden');}
_ensureLiveContent();
}else if(next==='anime'){
_e();$('#qe')?.classList.add('hidden');_ensureAnimeContent();
}else{
_e();$('#qe')?.classList.add('hidden');_ensureRestContent();
}
window.scrollTo({top:0,behavior:'smooth'});
if(save){try{SAFE_SESSION_STORAGE.setItem('estra7h_home_mode',next);}catch(_){}}
};
_initHomeMode=function(){
const p=_Q();
let mode=_defaultHomeMode();
try{const saved=SAFE_SESSION_STORAGE.getItem('estra7h_home_mode');if(['live','rest','anime'].includes(saved)&&modeAllowed(saved,p))mode=saved;}catch(_){}
state.homeMode=mode;
_ensureModeSwitch();
_setHomeMode(mode,false);
};
})();
(function(){
'use strict';
function pick(values){for(const value of values){if(value!==undefined&&value!==null&&String(value).trim())return String(value).trim();}return'';}
function episodeOf(item,title){const direct=pick([item&&item.episode,item&&item.episode_number,item&&item.episodeNumber,item&&item.episodeNo,item&&item.ep]);if(direct)return direct;const match=String(title||'').match(/(?:الحلقة|حلقة|episode|ep)\s*[-:#]?\s*(\d+)/i);return match?match[1]:'';}
function qualityOf(source){let value=pick([source&&source.quality,source&&source.resolution]);if(!value){const match=pick([source&&source.label,source&&source.title,source&&source.server]).match(/(?:\d{3,4}p|4k|uhd|fhd|hd|sd)/i);value=match?match[0]:'';}if(/^\d+$/.test(value))value+='P';return value.toUpperCase();}
function cleanPart(value){return String(value||'').replace(/\.[a-z0-9]{2,6}$/i,'').replace(/[\\/:*?"<>|]+/g,' ').replace(/\s+/g,' ').trim();}
function downloadBase(item,fallback){const current=(typeof state==='object'&&state)?state:{};const raw=pick([item&&item.series_title,item&&item.seriesTitle,item&&item.parent_title,item&&item.parentTitle,item&&item.show_title,item&&item.showTitle,item&&item.title,current.currentDetails&&current.currentDetails.title,current.currentItem&&current.currentItem.title,fallback,'video']);try{return cleanPart(typeof _titleClean==='function'?_titleClean(raw):raw)||'video';}catch(_){return cleanPart(raw)||'video';}}
function joaanDownloadTitle(item,source,fallback){let title=downloadBase(item||{},fallback),episode=episodeOf(item||{},pick([item&&item.title,title,fallback])),quality=qualityOf(source||{});if(episode&&!new RegExp('(?:الحلقة|حلقة|episode|ep)\\s*[-:#]?\\s*'+String(episode).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(title))title+=' - الحلقة '+episode;if(quality&&!title.toUpperCase().includes(quality))title+=' - '+quality;return cleanPart(title)||'video';}
function joaanFileName(item,source,fallback){const ext=(typeof _fileExtFromUrl==='function'?_fileExtFromUrl((source&& (source.url||source.originalUrl))||''):'mp4')||'mp4';return joaanDownloadTitle(item,source,fallback)+'.'+ext;}
try{_fileName=function(item,source,fallback){return joaanFileName(item||{},source||{},fallback||'video');};}catch(_){}
window._openNetworkDownload=function(source,historyItem,fallbackTitle){try{const original=pick([source&&source.originalUrl,source&&source.url]);if(!original)throw new Error('missing_url');const prepared=Object.assign({},source||{});prepared.url=typeof _vodUrl==='function'?_vodUrl(original,'download'):original;const fileName=joaanFileName(historyItem||{},prepared,fallbackTitle||'video');const title=fileName.replace(/\.[a-z0-9]{2,6}$/i,'');prepared.url=typeof _withFileName==='function'?_withFileName(prepared.url,fileName):prepared.url;const episode=episodeOf(historyItem||{},title);const quality=qualityOf(source||{});const headers=JSON.stringify({Referer:location.href});const params=new URLSearchParams({url:prepared.url,title:title,episode:episode,quality:quality,headers:headers,network:(window.JOAAN_PROVISION&&window.JOAAN_PROVISION.networkKey)||''});const deepLink='joaantv://download?'+params.toString();const packageId=pick([window.JOAAN_PROVISION&&window.JOAAN_PROVISION.appPackageId]);const fallback=pick([window.JOAAN_APP_DOWNLOAD_URL,window.JOAAN_PROVISION&&window.JOAAN_PROVISION.appDownloadUrl]);if(typeof _D==='function')_D('فتح مدير تنزيلات تطبيق الشبكة لفحص الرابط','downloading');if(typeof _R==='function')_R();if(packageId&&/^[a-z][a-z0-9_.]+$/i.test(packageId)){const suffix=fallback?';S.browser_fallback_url='+encodeURIComponent(fallback):'';location.href=deepLink.replace(/^joaantv:\/\//,'intent://')+'#Intent;scheme=joaantv;package='+packageId+suffix+';end';}else{location.href=deepLink;}}catch(_){if(typeof _D==='function')_D('تعذر تجهيز رابط التنزيل داخل تطبيق الشبكة','error');}};
})();
