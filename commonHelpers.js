import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as b,i as C}from"./assets/vendor-651d7991.js";const d=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]"),i=document.querySelector("span[data-days]"),m=document.querySelector("span[data-hours]"),f=document.querySelector("span[data-minutes]"),p=document.querySelector("span[data-seconds]"),v=document.querySelectorAll(".label");e.disabled=!0;v.forEach(t=>t.textContent=t.textContent.toUpperCase());let r,s;const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t[0]),r=t[0],r<S.defaultDate?(e.disabled=!0,C.error({message:"Please choose a date in the future",position:"topCenter"})):(e.disabled=!1,r=t[0])}};b(d,S);e.addEventListener("click",()=>{if(s=Date.now(),r<s)e.disabled=!0;else{e.disabled=!0,d.disabled=!0;const t=setInterval(()=>{s=Date.now();const n=g(r-s-1e3),o=x(n),{days:a,hours:l,minutes:u,seconds:c}=o;i.textContent=a,m.textContent=l,f.textContent=u,p.textContent=c,i.textContent=="00"&&m.textContent=="00"&&f.textContent=="00"&&p.textContent=="00"&&(clearInterval(t),e.disabled=!1,d.disabled=!1)},1e3)}});function x({days:t,hours:n,minutes:o,seconds:a}){return t=String(t).padStart(2,"0"),n=String(n).padStart(2,"0"),o=String(o).padStart(2,"0"),a=String(a).padStart(2,"0"),{days:t,hours:n,minutes:o,seconds:a}}function g(t){const u=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),h=Math.floor(t%864e5%36e5/6e4),y=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:c,minutes:h,seconds:y}}
//# sourceMappingURL=commonHelpers.js.map