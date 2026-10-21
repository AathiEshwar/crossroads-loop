/*
  CROSSROADS: FIRST LOOP
  Based on the candidate's existing Track Master Level 1 Figma design.
  AI-assisted implementation of a one-level design experiment. Figma design belongs to the candidate.
  Touch anywhere once to launch blue, again to launch red. Subsequent taps never change a moving car.
  No external JS libraries, servers, or AI used during gameplay.
*/
(() => {
  'use strict';
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W=379, H=799;
  const bg = new Image(); bg.src='assets/valley-background.png';
  bg.onload=()=>render();
  const TAU=Math.PI*2;
  const BLUE='#2a80e7',RED='#e44e42';
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const lerp=(a,b,t)=>a+(b-a)*t;
  const dateKey=()=>{const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;};
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0;};
  const localGet=k=>{try{return localStorage.getItem(k);}catch{return null;}};
  const localSet=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};
  let mode='normal',nowElapsed=0,finished=false,paused=false,launchStep=0,outcome='',scoreStars=0,startGap=0,staggerGap=null;
  let lastFrame=0,pressPulse=0,runNumber=0;
  const cars=[];
  const intersections=[{x:260,y:315},{x:119,y:435}];
  const timeLimit=31, targetLaps=2;
  const graphicColor={blue:BLUE,red:RED};

  function bezier(p0,p1,p2,p3,n=25){const out=[];for(let i=1;i<=n;i++){const t=i/n,s=1-t;out.push({x:s*s*s*p0[0]+3*s*s*t*p1[0]+3*s*t*t*p2[0]+t*t*t*p3[0],y:s*s*s*p0[1]+3*s*s*t*p1[1]+3*s*t*t*p2[1]+t*t*t*p3[1]});}return out;}
  function route(start,commands,spawn){
    const pts=[{x:start[0],y:start[1]}];let cur=[...start];
    for(const c of commands){if(c[0]==='L'){pts.push({x:c[1],y:c[2]});cur=[c[1],c[2]];}
      else{const b=bezier(cur,[c[1],c[2]],[c[3],c[4]],[c[5],c[6]],c[7]||22);pts.push(...b);cur=[c[5],c[6]];}}
    const complete=[];for(const p of pts){if(complete.length===0||Math.hypot(p.x-complete.at(-1).x,p.y-complete.at(-1).y)>.001)complete.push(p);}
    if(Math.hypot(complete[0].x-complete.at(-1).x,complete[0].y-complete.at(-1).y)<.001)complete.pop();
    let k=0,near=Infinity;for(let i=0;i<complete.length;i++){const d=Math.hypot(complete[i].x-spawn[0],complete[i].y-spawn[1]);if(d<near){near=d;k=i;}}
    const rotated=complete.slice(k).concat(complete.slice(0,k));const lengths=[0];
    for(let i=0;i<rotated.length;i++){const a=rotated[i],b=rotated[(i+1)%rotated.length];lengths.push(lengths.at(-1)+Math.hypot(a.x-b.x,a.y-b.y));}
    return {points:rotated,lengths,total:lengths.at(-1)};
  }
  // Faithful track-to-road conversion from the original twin-loop Level 1 coordinates.
  // Blue: upper loop, red: lower loop, intersecting twice as in the Figma artwork.
  const blueRoute=route([65,210],[
    ['L',65,203],['C',65,174,80,156,104,156],['L',219,156],['C',249,156,260,172,260,201],
    ['L',260,389],['C',260,417,245,436,217,436],['L',104,436],['C',75,436,65,418,65,392],['L',65,210]
  ],[65,210]);
  const redRoute=route([196,610],[
    ['L',272,610],['C',303,610,321,591,321,566],['L',321,356],['C',321,328,305,315,271,315],
    ['L',165,315],['C',135,315,119,328,119,356],['L',119,566],['C',119,592,135,610,165,610],['L',196,610]
  ],[196,610]);

  function at(r,length){
    const d=((length%r.total)+r.total)%r.total;const seg=r.lengths;let lo=0,hi=seg.length-1;
    while(lo+1<hi){const mid=(lo+hi)>>1;if(seg[mid]<=d)lo=mid;else hi=mid;}
    const a=r.points[lo],b=r.points[(lo+1)%r.points.length],span=seg[lo+1]-seg[lo],t=span>0?(d-seg[lo])/span:0;
    return {x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t),angle:Math.atan2(b.y-a.y,b.x-a.x)};
  }
  function init(daily=false){
    mode=daily?'daily':'normal';nowElapsed=0;finished=false;paused=false;launchStep=0;outcome='';scoreStars=0;startGap=0;staggerGap=null;pressPulse=0;runNumber++;
    const seed=hash(dateKey());const dailyMod=daily?((seed%17)-8):0;
    cars.length=0;
    cars.push({id:'blue',path:blueRoute,speed:116+dailyMod,dist:0,laps:0,phase:'ready'});
    cars.push({id:'red',path:redRoute,speed:123-dailyMod,dist:0,laps:0,phase:'ready'});
    render();
  }
  function launch(){
    if(finished){const daily=x>=93&&x<=286&&y>=395&&y<=426;init(daily);return;}
    if(paused){paused=false;return;}
    if(launchStep===0){cars[0].phase='moving';launchStep=1;startGap=nowElapsed;pressPulse=.5;}
    else if(launchStep===1){cars[1].phase='moving';launchStep=2;staggerGap=nowElapsed-startGap;pressPulse=.5;}
    // Intentionally ignore taps after both cars launch: the challenge is their departure gap.
  }
  function end(won,why){
    if(finished)return;finished=true;outcome=won?'win':'fail';
    if(won){scoreStars=nowElapsed<=19?3:nowElapsed<=23?2:1;
      const key=mode==='daily'?`crossroads_daily_${dateKey()}`:'crossroads_best_level1';
      const previous=Number(localGet(key))||Infinity;if(nowElapsed<previous)localSet(key,String(nowElapsed));localSet('crossroads_first_clear','yes');}
    else {scoreStars=0;}
  }
  function update(dt){
    pressPulse=Math.max(0,pressPulse-dt);
    if(finished||paused||launchStep===0)return;
    nowElapsed+=dt;
    for(const c of cars){
      if(c.phase!=='moving')continue;
      c.dist+=c.speed*dt;c.laps=Math.min(2,Math.floor(c.dist/c.path.total));
      if(c.dist>=c.path.total*targetLaps){c.dist=c.path.total*targetLaps;c.phase='done';}
    }
    if(cars.every(c=>c.phase!=='ready'&&c.phase!=='done')){
      // Test all active cars around both shared road intersections.
      const a=at(cars[0].path,cars[0].dist),b=at(cars[1].path,cars[1].dist);
      if(Math.hypot(a.x-b.x,a.y-b.y)<32){end(false,'BOTH CARS REACHED THE SAME CROSSING');return;}
    }
    if(cars.every(c=>c.phase==='done')){end(true,'');return;}
    if(nowElapsed>=timeLimit){end(false,'TIME RAN OUT BEFORE BOTH CARS FINISHED');return;}
  }

  function rr(x,y,w,h,r,color,stroke,lineWidth=1){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=color;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}}
  function text(s,x,y,font,color,align='left',shadow=false){ctx.save();ctx.font=font;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle=color;if(shadow){ctx.shadowColor='#193558a8';ctx.shadowOffsetY=2;ctx.shadowBlur=3;}ctx.fillText(s,x,y);ctx.restore();}
  function line(points,color,width,dash=[]){ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';ctx.lineCap='round';ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
  function road(r,accent){
    const p=r.points;
    line(p,'#426a3c92',46);line(p,'#e6d6a7',41);line(p,'#f8f1d6',36);line(p,'#6f7980',32);
    line(p,'#4b5965',27);line(p,accent,1.6);
    line(p,'#fff2d4a9',1.25,[4,15]);
  }
  function crossing(x,y){
    ctx.save();ctx.translate(x,y);ctx.shadowColor='#2e533f77';ctx.shadowBlur=3;
    rr(-17,-17,34,34,3,'#727d80','#f5e7c3',2);ctx.shadowBlur=0;
    ctx.fillStyle='#f2ede4';for(let i=-12;i<14;i+=8){ctx.fillRect(i,-13,3,26);}
    ctx.fillStyle='#f7f0e8';for(let i=-10;i<14;i+=8){ctx.fillRect(-13,i,26,3);}
    rr(-4,-4,8,8,2,'#a4aaac');ctx.restore();
  }
  function carShape(car){
    if(car.phase==='done')return;
    const p=at(car.path,car.dist);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);
    ctx.shadowColor='#152c247f';ctx.shadowBlur=4;ctx.shadowOffsetY=4;
    rr(-17,-10,34,20,5,car.id==='blue'?BLUE:RED,'#f8fffc',1.2);
    ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    // Bumpers, headlights, wheels, windows (top-down road car).
    ctx.fillStyle='#1a293c';ctx.fillRect(-13,-12,8,3.7);ctx.fillRect(7,-12,8,3.7);ctx.fillRect(-13,8.5,8,3.7);ctx.fillRect(7,8.5,8,3.7);
    rr(-4,-7,12,14,3,'#e5f6ff');rr(-10,-7,5,14,2,'#25629b7d');
    rr(12,-7,3,14,1,'#b9e3f5');ctx.fillStyle='#fff5ad';ctx.fillRect(15,-6,2.5,4);ctx.fillRect(15,2,2.5,4);
    ctx.restore();
  }
  function station(x,y,n,color){
    ctx.save();ctx.shadowColor='#28482a55';ctx.shadowBlur=3;ctx.shadowOffsetY=2;
    ctx.beginPath();ctx.arc(x,y,12.1,0,TAU);ctx.fillStyle='#fff';ctx.fill();ctx.lineWidth=2.8;ctx.strokeStyle=color;ctx.stroke();ctx.restore();
    text(String(n),x,y+.8,'900 15px system-ui',color,'center');
  }
  function drawFooter(){
    ctx.save();ctx.shadowColor='#2451737c';ctx.shadowBlur=6;ctx.shadowOffsetY=3;
    const grad=ctx.createLinearGradient(0,678,0,781);grad.addColorStop(0,'#438eeb');grad.addColorStop(1,'#1757ae');
    rr(21,680,337,97,17,grad,'#a4daff',2);ctx.restore();
    text(mode==='daily'?'GREEN VALLEY · DAILY TRAFFIC':'GREEN VALLEY · TWIN ROAD LOOPS',36,696,'800 10px system-ui','#c6eaff');
    const instruction=finished?(outcome==='win'?'GREAT RUN · TAP ANYWHERE TO REPLAY':'TRY A DIFFERENT LAUNCH GAP · TAP TO RETRY'):
      launchStep===0?'TAP ANYWHERE TO START THE BLUE CAR':launchStep===1?'TAP AGAIN ANYWHERE TO START RED':'BOTH CARS MOVING · WATCH THE CROSSINGS';
    text(instruction,35,712,'750 9px system-ui','#d5ebff');
    const startedBlue=launchStep>=1,startedRed=launchStep>=2;
    rr(34,722,30,29,9,startedBlue?'#63a5ff':'#3880df','#fff',2);text('1',49,737,'900 16px system-ui','#fff','center',true);
    text('➜',88,738,'900 20px system-ui','#fff','center',true);
    rr(103,722,29,29,9,startedRed?'#e65a50':'#d74e46','#fff',2);text('2',117,737,'900 16px system-ui','#fff','center',true);
    if(staggerGap!==null)text(`GAP ${staggerGap.toFixed(1)}s`,165,736,'900 15px system-ui','#ffe274');
    else if(launchStep===1)text(`GAP ${(nowElapsed-startGap).toFixed(1)}s`,165,736,'900 15px system-ui','#ffe274');
    else text('GAP  —',165,736,'900 15px system-ui','#ffe274');
    text('2 CARS',339,738,'900 11px system-ui','#d7eeff','right');
    text(`2 crossings · 2 laps each · ${mode==='daily'?'daily speeds':'tap timing puzzle'}`,36,762,'750 9px system-ui','#d5e6ff');
  }
  function drawTop(){
    const top=ctx.createLinearGradient(0,9,0,70);top.addColorStop(0,'#4191f0');top.addColorStop(1,'#2468c5');
    rr(9,9,361,61,14,top);ctx.fillStyle='#90cc41';ctx.fillRect(9,67,361,5);
    // Reset button and optional pause toggle (no inert buttons).
    rr(18,18,45,40,12,'#63a6fc','#83c5ff',1);text('↶',40,39,'900 33px system-ui','#fff','center',true);
    rr(316,18,45,40,12,'#63a6fc','#83c5ff',1);text(paused?'▶':'Ⅱ',338,39,'900 20px system-ui','#fff','center',true);
    text('Level - 1',189.5,41,'900 24px system-ui','#fff','center',true);
    // Grass-level HUD follows the original placement.
    rr(21,77,76,26,13,'#255990');text(`${Math.min(cars[0]?.laps||0,cars[1]?.laps||0)}/2 Laps`,59,91,'800 11px system-ui','#fff','center');
    rr(149,78,81,25,14,'#fff');const seconds=Math.floor(nowElapsed);text(`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`,189.5,91,'900 13px system-ui','#204b7a','center');
    for(let i=0;i<3;i++){text(scoreStars>0?'★':'☆',298+i*29,90,'900 24px system-ui',scoreStars>i?'#ffd84c':'#fff5ca','center',true);}
  }
  function drawScene(){
    if(bg.complete && bg.naturalWidth){ctx.drawImage(bg,0,0,W,H);} else {ctx.fillStyle='#9bcf4d';ctx.fillRect(0,0,W,H);}
    // Fill previously blurred track edges by laying accurate new roads at original coordinates.
    road(blueRoute,'#8ed4ff');road(redRoute,'#ffaaa6');
    for(const q of intersections)crossing(q.x,q.y);
    carShape(cars[0]);carShape(cars[1]);
    station(27,236,1,BLUE);station(200,642,2,RED);
    // If needed, a soft cue highlights the next car's starting location.
    if(!finished&&launchStep<2){const c=cars[launchStep];const p=at(c.path,0);
      const t=.65+.35*Math.sin(performance.now()/200);ctx.save();ctx.strokeStyle=launchStep===0?`rgba(57,132,255,${t})`:`rgba(245,85,75,${t})`;ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(p.x,p.y,23,0,TAU);ctx.stroke();ctx.restore();}
    // No extra overlays or explanatory sidebar: focus on original screen composition.
    drawTop();drawFooter();
    if(paused)overlay('PAUSED','TAP ANYWHERE TO CONTINUE');
    else if(finished){
      overlay(outcome==='win'?'LEVEL COMPLETE!':'COLLISION!',outcome==='win'?`BOTH CARS FINISHED · ${scoreStars} STAR${scoreStars!==1?'S':''}`:'TRY A DIFFERENT LAUNCH GAP');
    }
  }
  function overlay(title,caption){
    ctx.fillStyle='#0d3359a9';rr(25,282,329,135,17,'#0c305be8','#e5f5ff',2);
    text(title,189,325,'900 25px system-ui',title.includes('COMPLETE')?'#fff1a7':'#fff','center',true);
    text(caption,189,357,'800 12px system-ui','#deefff','center');
    if(paused){text('TAP ANYWHERE TO CONTINUE',189,386,'750 11px system-ui','#9bdbff','center');}
    else {text('TAP OUTSIDE THE BUTTON TO REPLAY',189,383,'750 10px system-ui','#a4d4f8','center');rr(93,395,193,31,10,'#377ddd','#a8d8ff',1.4);text('PLAY DAILY TRAFFIC',189,411,'900 12px system-ui','#fff','center');}
  }
  function render(){ctx.clearRect(0,0,W,H);drawScene();}
  function frame(t){const dt=lastFrame?clamp((t-lastFrame)/1000,0,.05):0;lastFrame=t;update(dt);render();requestAnimationFrame(frame);}
  function tap(e){
    // Every tap on the stage starts blue first, red second; reset/pause top corner after dispatch.
    const bounds=canvas.getBoundingClientRect();const x=(e.clientX-bounds.left)/bounds.width*W;const y=(e.clientY-bounds.top)/bounds.height*H;
    e.preventDefault();
    if(finished){const daily=x>=93&&x<=286&&y>=395&&y<=426;init(daily);return;}
    if(paused){paused=false;return;}
    if(launchStep>=2 && y<67 && x<70){init(mode==='daily');return;}
    if(launchStep>=2 && y<67 && x>305){paused=true;return;}
    launch();
  }
  canvas.addEventListener('pointerdown',tap,{passive:false});
  window.addEventListener('keydown',e=>{
    if((e.code==='Space'||e.code==='Enter')&&!e.repeat){e.preventDefault();launch();}
    if(e.code==='KeyR'){init(mode==='daily');}
    if(e.code==='Escape'||e.code==='KeyP'){paused=!paused;}
  });
  init();requestAnimationFrame(frame);
  window.__crossroadsQA={get:()=>({mode,elapsed:nowElapsed,launchStep,finished,outcome,scoreStars,staggerGap,cars:cars.map(c=>({id:c.id,phase:c.phase,laps:c.laps,dist:c.dist,length:c.path.total,speed:c.speed}))}),reset:init,launch:launch,advance:sec=>{for(let x=0;x<sec;x+=.008)update(Math.min(.008,sec-x));render();},position:(id)=>at(id==='blue'?blueRoute:redRoute,cars[id==='blue'?0:1].dist)};
})();
