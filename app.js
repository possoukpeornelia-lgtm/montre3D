(function(){
var cv=document.getElementById('c');
var R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
var S=new THREE.Scene();
var cam=new THREE.PerspectiveCamera(32,1,1,1000);
S.add(new THREE.HemisphereLight(0xffffff,0x556677,.9));
var d1=new THREE.DirectionalLight(0xffffff,1.1);d1.position.set(60,80,100);S.add(d1);
var d2=new THREE.DirectionalLight(0xaaccff,.6);d2.position.set(-80,-40,60);S.add(d2);
var d3=new THREE.DirectionalLight(0xffffff,.5);d3.position.set(0,-60,-90);S.add(d3);

function rr(w,h,r){var s=new THREE.Shape(),x=-w/2,y=-h/2;
s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}

var G=new THREE.Group();S.add(G);
var titan=new THREE.MeshStandardMaterial({color:0x8d9399,metalness:.85,roughness:.32});
var rubber=new THREE.MeshStandardMaterial({color:0x151c25,metalness:0,roughness:.75});
var red=new THREE.MeshStandardMaterial({color:0xe03131,metalness:.1,roughness:.4});

// Boîtier
var cg=new THREE.ExtrudeGeometry(rr(44,50,9),{depth:10,bevelEnabled:true,bevelThickness:1.5,bevelSize:1.5,bevelSegments:4,curveSegments:16});
cg.translate(0,0,-5);
G.add(new THREE.Mesh(cg,titan));
// Verre noir
var glass=new THREE.Mesh(new THREE.ShapeGeometry(rr(39,45,6.5),16),new THREE.MeshStandardMaterial({color:0x05080b,metalness:.2,roughness:.12}));
glass.position.z=6.6;G.add(glass);

// Écran (texture canvas)
var tc=document.createElement('canvas');tc.width=780;tc.height=900;var x=tc.getContext('2d');
x.fillStyle='#06090d';x.fillRect(0,0,780,900);
x.fillStyle='#fff';x.textAlign='center';
x.font='700 190px system-ui,sans-serif';x.fillText('09:30',390,330);
x.font='500 44px system-ui,sans-serif';x.fillText('Mar. 16 Juin',390,405);
// batterie
x.fillStyle='#7ed321';x.fillRect(520,60,56,28);x.fillStyle='#fff';x.font='500 40px system-ui,sans-serif';x.textAlign='left';x.fillText('85%',592,88);
x.textAlign='center';
function disc(cx,cy,col){x.fillStyle=col;x.beginPath();x.arc(cx,cy,62,0,7);x.fill()}
disc(210,540,'#2f7fe8');x.save();x.translate(210,540);x.rotate(-.7);x.fillStyle='#fff';x.fillRect(-28,-14,28,28);x.fillStyle='#ff5a5a';x.fillRect(0,-14,28,28);x.restore();
x.fillStyle='#fff';x.font='500 40px system-ui,sans-serif';x.fillText('Médicaments',210,650);
x.fillStyle='#e03131';x.beginPath();x.arc(570,525,34,0,7);x.fill();x.beginPath();x.moveTo(536,540);x.lineTo(604,540);x.lineTo(570,600);x.fill();
x.fillStyle='#fff';x.beginPath();x.arc(570,525,12,0,7);x.fill();x.fillText('Position',570,650);
disc(210,760,'#e03131');x.fillStyle='#fff';x.font='700 46px system-ui,sans-serif';x.fillText('SOS',210,776);
disc(570,760,'#2fb85a');x.strokeStyle='#fff';x.lineWidth=14;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(535,760);x.lineTo(562,787);x.lineTo(607,735);x.stroke();
x.fillStyle='#fff';x.font='500 36px system-ui,sans-serif';x.fillText('OK',570,860);
var tex=new THREE.CanvasTexture(tc);tex.anisotropy=8;
var scr=new THREE.Mesh(new THREE.PlaneGeometry(36,41.5),new THREE.MeshBasicMaterial({map:tex,transparent:true}));
scr.position.z=6.7;G.add(scr);

// Couronne
var crown=new THREE.Mesh(new THREE.CylinderGeometry(3.4,3.4,4.5,32),titan);
crown.rotation.z=Math.PI/2;crown.position.set(24.5,8,0);G.add(crown);
// Bouton SOS
var b=new THREE.Mesh(new THREE.CylinderGeometry(3.1,3.1,5.5,3,1),red);
var sosg=new THREE.ExtrudeGeometry(rr(6,13,2.8),{depth:3,bevelEnabled:true,bevelSize:.5,bevelThickness:.5,bevelSegments:3});
var sos=new THREE.Mesh(sosg,red);sos.rotation.y=Math.PI/2;sos.position.set(23.5,-8,-1.5);G.add(sos);
// Capteur au dos
var back=new THREE.Mesh(new THREE.CylinderGeometry(14,15,1.4,48),new THREE.MeshStandardMaterial({color:0x20262c,roughness:.5,metalness:.4}));
back.rotation.x=Math.PI/2;back.position.z=-7.2;G.add(back);

// Bracelet : anneau elliptique
var cx=32.5,rx=26,ry=35,t=2.6;
var sh=new THREE.Shape();sh.absellipse(cx,0,rx,ry,0,Math.PI*2,false,0);
var hole=new THREE.Path();hole.absellipse(cx,0,rx-t,ry-t,0,Math.PI*2,true,0);sh.holes.push(hole);
var sg=new THREE.ExtrudeGeometry(sh,{depth:22,bevelEnabled:true,bevelSize:.6,bevelThickness:.6,bevelSegments:2,curveSegments:64});
sg.translate(0,0,-11);sg.rotateY(Math.PI/2);
var strap=new THREE.Mesh(sg,rubber);strap.position.z=-2.5+0;G.add(strap);
// Trous
var dark=new THREE.MeshStandardMaterial({color:0x04070a,roughness:1});
[-1.0,-0.75,-0.5,-0.25].forEach(function(a){
 var px=cx+rx*Math.cos(a),py=ry*Math.sin(a);
 var tg=Math.atan2(rx*Math.cos(a),-ry*Math.sin(a));
 var h=new THREE.Mesh(new THREE.BoxGeometry(9,3.4,t+1.4),dark);
 h.position.set(0,py,-px);h.rotation.x=-Math.atan2(ry*Math.cos(a),-rx*Math.sin(a))+Math.PI/2*0;G.add(h);
});
// Boucle
var loop=new THREE.Mesh(new THREE.BoxGeometry(24.5,4,t+3),titan);
loop.position.set(0,-18.5,-(cx+rx*Math.cos(-0.78)));G.add(loop);
G.rotation.x=0;

// Contrôles
var yaw=-.5,pitch=.28,dist=190,auto=true,tYaw=null,tPitch=null,drag=false,lx=0,ly=0;
var views={face:[0,0],three:[-.55,.3],side:[-Math.PI/2,0],back:[Math.PI,0]};
cv.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;ly=e.clientY;tYaw=null;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointerup',function(){drag=false});
cv.addEventListener('pointermove',function(e){if(!drag)return;yaw+=(e.clientX-lx)*.008;pitch=Math.max(-1.4,Math.min(1.4,pitch+(e.clientY-ly)*.008));lx=e.clientX;ly=e.clientY});
cv.addEventListener('wheel',function(e){e.preventDefault();dist=Math.max(90,Math.min(320,dist*(1+e.deltaY*.001)))},{passive:false});
var pts={};cv.addEventListener('pointerdown',function(e){pts[e.pointerId]=e});
function pd(){var k=Object.keys(pts);return k.length===2?Math.hypot(pts[k[0]].clientX-pts[k[1]].clientX,pts[k[0]].clientY-pts[k[1]].clientY):0}
var pl=0;cv.addEventListener('pointermove',function(e){if(!pts[e.pointerId])return;pts[e.pointerId]=e;var d=pd();if(d){if(pl)dist=Math.max(90,Math.min(320,dist*pl/d));pl=d}});
function up(e){delete pts[e.pointerId];pl=0}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
document.querySelectorAll('[data-v]').forEach(function(bt){bt.addEventListener('click',function(){var v=views[bt.dataset.v];
 var k=Math.round((yaw-v[0])/(Math.PI*2));tYaw=v[0]+k*Math.PI*2;tPitch=v[1];setAuto(false)})});
var sp=document.getElementById('spin');
function setAuto(v){auto=v;sp.setAttribute('aria-pressed',v)}
sp.addEventListener('click',function(){setAuto(!auto)});
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)setAuto(false);

function resize(){var w=innerWidth,h=innerHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
(function loop(){
 if(tYaw!==null){yaw+=(tYaw-yaw)*.12;pitch+=(tPitch-pitch)*.12;if(Math.abs(tYaw-yaw)<.002)tYaw=null}
 else if(auto&&!drag)yaw+=.006;
 G.rotation.y=yaw;G.rotation.x=pitch;
 var fit=cam.aspect<1?1/cam.aspect*.75:1;
 cam.position.set(0,0,dist*fit);cam.lookAt(0,0,0);
 R.render(S,cam);requestAnimationFrame(loop)})();
})();
