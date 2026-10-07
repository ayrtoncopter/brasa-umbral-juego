export const KEYS={v1:'brasa-umbral.reunion.v1',v2:'brasa-umbral.reunion.v2'};
export const PRESETS={inicio:'Inicio · asalto 1',mago:'Mago · asalto 11',guerrero:'Guerrero · asalto 11',jefe:'Jefe final · asalto 20'};
const PRESET_KEY='brasa-umbral.reunion.muestra';
export function sample(preset='mago',now=Date.now()){
 const date=new Date(now),day=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
 const beginner=preset==='inicio',mage=preset==='mago',final=preset==='jefe';
 const inventory=beginner?[]:mage?['baston-iniciacion','sombrero-vigia','tunica-brasa','sombrero-brasa','baston-lunar','guantes-arcanos']:['hacha-iniciacion','yelmo-vigia','pechera-brasa','yelmo-cobre','espada-cobre','escudo-cobre','guantes-ceniza',...(final?['botas-senda']:[])];
 const equipped=beginner?{}:mage?{Arma:'baston-lunar',Yelmo:'sombrero-brasa',Pechera:'tunica-brasa',Guantes:'guantes-arcanos'}:{Arma:'espada-cobre',Yelmo:'yelmo-cobre',Pechera:'pechera-brasa',Escudo:'escudo-cobre',Guantes:'guantes-ceniza',...(final?{Botas:'botas-senda'}:{})};
 return {version:7,profile:{name:beginner?'Cuy de muestra':mage?'Brasa':'Cobre',sex:mage?'hembra':'macho'},autoRaids:{day,used:0},xp:beginner?0:900,stage:beginner?1:final?20:11,wins:beginner?0:final?19:10,energy:25,energyAt:now,className:beginner?null:mage?'Mago':'Guerrero',classWeaponGranted:!beginner,chests:beginner?[]:final?[2,5,10,15]:[2,5,10],inventory,equipped,itemUpgrades:{},soldItems:[],gold:beginner?0:1000,fragments:beginner?0:300};
}
export function presetName(){const saved=localStorage.getItem(PRESET_KEY);return Object.hasOwn(PRESETS,saved)?saved:'mago';}
export function ensureSamples(){
 const preset=presetName(),raw=JSON.stringify(sample(preset));
 for(const key of Object.values(KEYS))if(localStorage.getItem(key)===null)localStorage.setItem(key,raw);
 return preset;
}
// Sólo se usa tras navegar fuera de los juegos; así ningún juego anterior vuelve a guardar encima.
export function resetSamples(preset){
 if(!Object.hasOwn(PRESETS,preset))throw Error('Muestra desconocida.');
 const raw=JSON.stringify(sample(preset));
 for(const key of Object.values(KEYS)){
  for(const stored of Object.keys(localStorage))if(stored.startsWith(key+'.backup-'))localStorage.removeItem(stored);
  localStorage.setItem(key,raw);sessionStorage.removeItem(key+'.combat-mode');
 }
 localStorage.setItem(PRESET_KEY,preset);return preset;
}
