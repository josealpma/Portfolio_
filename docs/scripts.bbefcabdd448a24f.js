var w,h,loopId,id,canvas,ctx,particles,options={particleColor:"rgba(255, 255, 255)",lineColor:"rgba(215, 45, 116)",particleAmount:getParticles(),defaultRadius:2,variantRadius:2,defaultSpeed:.075,variantSpeed:.5,linkRadius:300},rgb=options.lineColor.match(/\d+/g);function getParticles(){let t,e=window.screen.width;return t=e<576||e>=576&&e<=768?15:e>768&&e<=992?20:e>992&&e<=1200?25:30,t}function init(){canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),resizeReset(),initialiseElements(),startAnimation()}function resizeReset(){w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight}function initialiseElements(){particles=[];for(var e=0;e<options.particleAmount;e++)particles.push(new Particle)}function startAnimation(){loopId=requestAnimationFrame(animationLoop)}function animationLoop(){ctx.clearRect(0,0,w,h),drawScene(),id=requestAnimationFrame(animationLoop)}function drawScene(){drawLine(),drawParticle()}function drawParticle(){for(var e=0;e<particles.length;e++)particles[e].update(),particles[e].draw()}function drawLine(){for(var e=0;e<particles.length;e++)linkPoints(particles[e],particles)}function linkPoints(e,t){for(var n=0;n<t.length;n++){var i=1-checkDistance(e.x,e.y,t[n].x,t[n].y)/options.linkRadius;i>0&&(ctx.lineWidth=1,ctx.strokeStyle="rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+i+")",ctx.beginPath(),ctx.moveTo(e.x,e.y),ctx.lineTo(t[n].x,t[n].y),ctx.closePath(),ctx.stroke())}}function checkDistance(e,t,n,a){return Math.sqrt(Math.pow(n-e,2)+Math.pow(a-t,2))}document.addEventListener("DOMContentLoaded",init),Particle=function(){var e=this;e.x=Math.random()*w,e.y=Math.random()*h,e.color=options.particleColor,e.radius=options.defaultRadius+Math.random()*options.variantRadius,e.speed=options.defaultSpeed+Math.random()*options.variantSpeed,e.directionAngle=Math.floor(360*Math.random()),e.vector={x:Math.cos(e.directionAngle)*e.speed,y:Math.sin(e.directionAngle)*e.speed},e.update=function(){e.border(),e.x+=e.vector.x,e.y+=e.vector.y},e.border=function(){(e.x>=w||e.x<=0)&&(e.vector.x*=-1),(e.y>=h||e.y<=0)&&(e.vector.y*=-1),e.x>w&&(e.x=w),e.y>h&&(e.y=h),e.x<0&&(e.x=0),e.y<0&&(e.y=0)},e.draw=function(){ctx.beginPath(),ctx.arc(e.x,e.y,e.radius,0,2*Math.PI),ctx.closePath(),ctx.fillStyle=e.color,ctx.fill()}};