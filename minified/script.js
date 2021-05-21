const TYPE_LUT={normal:{weak:["fighting"],strong:["ghost"]},fire:{weak:["ground","rock","water"],strong:["bug","steel","fire","grass","ice","fairy"]},water:{weak:["grass","electric"],strong:["steel","fire","water","ice"]},grass:{weak:["flying","poison","bug","fire","ice"],strong:["ground","water","grass","electric"]},electric:{weak:["ground"],strong:["flying","steel","electric"]},ice:{weak:["fighting","rock","steel","fire"],strong:["ice"]},fighting:{weak:["flying","psychic","fairy"],strong:["rock","bug","dark"]},poison:{weak:["ground","psychic"],strong:["fighting","poison","bug","grass","fairy"]},ground:{weak:["water","grass","ice"],strong:["poison","rock","electric"]},flying:{weak:["rock","electric","ice"],strong:["fighting","bug","grass","ground"]},psychic:{weak:["bug","ghost","dark"],strong:["fighting","psychic"]},bug:{weak:["flying","rock","fire"],strong:["fighting","ground","grass"]},rock:{weak:["fighting","ground","steel","water","grass"],strong:["normal","flying","poison","fire"]},ghost:{weak:["ghost","dark"],strong:["poison","bug","normal","fighting"]},dark:{weak:["fighting","bug","fairy"],strong:["ghost","dark","psychic"]},dragon:{weak:["ice","dragon","fairy"],strong:["fire","water","grass","electric"]},steel:{weak:["fighting","ground","fire"],strong:["normal","flying","rock","bug","steel","grass","psychic","ice","dragon","fairy","poison"]},fairy:{weak:["poison","steel"],strong:["fighting","bug","dark","dragon"]}},pokemonRepository=function(){const e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=151";let n="",o=!1,r=!1,i=null,a=null;function c(e){const t=document.createElement("div"),n=e?"loading-spinner":"loading-spinner solo-spinner";return t.className=n,(e||document.querySelector("body")).appendChild(t),t}function s(e){e.remove()}function l(){document.querySelector("#modal-container").classList.remove("is-visible"),o=!1,r&&(r=!1,i.focus())}function d(e){if(o)return;const t=c();(function(e){return e.flavorText?Promise.resolve():fetch(e.speciesUrl).then(e=>e.json()).then(t=>{e.flavorText=t.flavor_text_entries[0].flavor_text,e.flavorText=e.flavorText.replace(/[^a-zA-Z é.!?,]/g," ")}).catch(e=>{console.error(e)})})(e).then(()=>{!function(e){document.querySelector(".modal-id").innerText=`#${e.id}`,document.querySelector(".modal-name").innerText=e.name;const t=document.querySelector(".modal-types");t.textContent=null,e.types.forEach(e=>{const n=document.createElement("p");n.classList.add("modal-tag",e.type.name),n.innerText=e.type.name,t.appendChild(n)});const n=document.querySelector(".modal-img");n.src=e.imgUrl,n.alt=e.name,n.className=`modal-img gradient--${e.mainType}`,document.querySelector("#modal-height").innerText=`${10*e.height}cm`,document.querySelector("#modal-weight").innerText=`${e.weight/10}kg`,document.querySelector(".modal-flavor-text").innerText=e.flavorText;const o=document.querySelector(".modal-weaknesses");o.textContent=null;let r=[],i=[];e.types.forEach(e=>{const t=e.type.name;r=r.concat(TYPE_LUT[t].weak),i=i.concat(TYPE_LUT[t].strong)}),r.filter((e,t)=>{const n=!i.includes(e),o=t===r.indexOf(e);return n&&o}).forEach(e=>{const t=document.createElement("p");t.classList.add("modal-tag",e),t.innerText=e,o.appendChild(t)})}(e),document.querySelector("#modal-container").classList.add("is-visible"),o=!0,r&&(i=document.activeElement,document.querySelector(".modal-close").focus())}).finally(()=>{s(t)})}function g(e){const t=document.createElement("li");return t.classList.add("pokemon-card"),t.addEventListener("click",()=>d(e)),t.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),r=!0,d(e))}),t.tabIndex="0",t.lazyLoad=(()=>{(function(e){return fetch(e.detailsUrl).then(e=>e.json()).then(t=>{e.id=t.id,e.speciesUrl=t.species.url,e.height=t.height,e.weight=t.weight,e.types=t.types,e.mainType=e.types[0].type.name,e.imgUrl=t.sprites.front_default}).catch(e=>{console.error(e)})})(e).then(()=>{!function(e,t){const n=document.createElement("h2");n.classList.add("card-name"),n.innerText=t.name,e.appendChild(n),e.classList.add(`gradient--${t.mainType}`),n.classList.add(t.mainType),t.types.forEach(t=>{const n=document.createElement("p");n.classList.add("card-tag",t.type.name),n.innerText=t.type.name,e.appendChild(n)});const o=document.createElement("img");o.classList.add("card-img"),o.onload=(()=>{s(e.loadingSpinner)}),o.onerror=(()=>{s(e.loadingSpinner)}),o.src=t.imgUrl,o.alt=t.name,e.appendChild(o);const r=document.createElement("h3");r.classList.add("card-id"),r.innerText=`#${t.id}`,e.appendChild(r)}(t,e)}).catch(e=>{console.error(e)})}),a.observe(t),t.loadingSpinner=c(t),t}function u(){const n=c();return fetch(t).then(e=>e.json()).then(t=>{t.results.forEach(({name:t,url:n})=>(function(t){t&&"object"==typeof t&&e.push(t)})({name:t,detailsUrl:n}))}).catch(e=>{console.error(e)}).finally(()=>{s(n)})}function m(){document.querySelector("#pokemon-search").addEventListener("input",t=>{n=t.target.value,function(){const t=document.querySelectorAll(".pokemon-card");e.forEach((e,o)=>{const r=!e.name.toUpperCase().includes(n.toUpperCase());t[o].classList.toggle("hidden",r)})}()})}return{initialize:function(){return a=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.lazyLoad(),a.unobserve(e.target))})}),u().then(()=>{e.forEach(e=>{!function(e){const t=g(e);document.querySelector(".pokemon-list").appendChild(t)}(e)}),function(){const e=document.querySelector("#modal-container");e.addEventListener("click",t=>{t.target===e&&o&&l()}),document.querySelector(".modal-close").addEventListener("click",()=>{l()})}(),m(),window.addEventListener("keydown",e=>{27===e.keyCode&&o&&l(),9===e.keyCode&&r&&e.preventDefault&&e.preventDefault()})}).catch(e=>{console.error(e)})}}}();pokemonRepository.initialize();