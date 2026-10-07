import {ensureSamples,resetSamples,PRESETS} from './samples.js';
const status=document.getElementById('sample-status');
const comparisonBase=new URL('.',import.meta.url).pathname;
try{
 const params=new URLSearchParams(location.search),requested=params.get('muestra');
 const preset=params.get('reiniciar')==='1'&&Object.hasOwn(PRESETS,requested)?resetSamples(requested):ensureSamples();
 history.replaceState(null,'',location.pathname);
 status.textContent=PRESETS[preset]+' · listas para probar';
 document.querySelectorAll('[data-preset]').forEach(button=>{
  button.setAttribute('aria-pressed',String(button.dataset.preset===preset));
  button.addEventListener('click',()=>location.assign(comparisonBase+'?muestra='+button.dataset.preset+'&reiniciar=1'));
 });
 for(const version of ['v1','v2']){
  const frame=document.createElement('iframe');frame.src=comparisonBase+version+'/?panel=1';frame.title='Juego '+version.toUpperCase();frame.allow='fullscreen';
  document.getElementById('host-'+version).append(frame);
 }
}catch{
 status.textContent='No se pudieron preparar las muestras. Permite el almacenamiento local y vuelve a abrir la página.';
}
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
