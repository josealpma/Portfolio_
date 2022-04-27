var w,h,loopId,id,canvas,ctx,particles,options={particleColor:"rgba(255, 255, 255)",lineColor:"rgba(215, 45, 116)",particleAmount:30,defaultRadius:2,variantRadius:2,defaultSpeed:.075,variantSpeed:.05,linkRadius:300},rgb=options.lineColor.match(/\d+/g);function init(){canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),resizeReset(),initialiseElements(),startAnimation()}function resizeReset(){w=canvas.width=window.innerWidth,h=canvas.height=window.innerHeight}function initialiseElements(){particles=[];for(var t=0;t<options.particleAmount;t++)particles.push(new Particle)}function startAnimation(){loopId=requestAnimationFrame(animationLoop)}function animationLoop(){ctx.clearRect(0,0,w,h),drawScene(),id=requestAnimationFrame(animationLoop)}function drawScene(){drawLine(),drawParticle()}function drawParticle(){for(var t=0;t<particles.length;t++)particles[t].update(),particles[t].draw()}function drawLine(){for(var t=0;t<particles.length;t++)linkPoints(particles[t],particles)}function linkPoints(t,n){for(var e=0;e<n.length;e++){var r=1-checkDistance(t.x,t.y,n[e].x,n[e].y)/options.linkRadius;r>0&&(ctx.lineWidth=.5,ctx.strokeStyle="rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+","+r+")",ctx.beginPath(),ctx.moveTo(t.x,t.y),ctx.lineTo(n[e].x,n[e].y),ctx.closePath(),ctx.stroke())}}function checkDistance(t,n,e,a){return Math.sqrt(Math.pow(e-t,2)+Math.pow(a-n,2))}document.addEventListener("DOMContentLoaded",init),Particle=function(){var t=this;t.x=Math.random()*w,t.y=Math.random()*h,t.color=options.particleColor,t.radius=options.defaultRadius+Math.random()*options.variantRadius,t.speed=options.defaultSpeed+Math.random()*options.variantSpeed,t.directionAngle=Math.floor(360*Math.random()),t.vector={x:Math.cos(t.directionAngle)*t.speed,y:Math.sin(t.directionAngle)*t.speed},t.update=function(){t.border(),t.x+=t.vector.x,t.y+=t.vector.y},t.border=function(){(t.x>=w||t.x<=0)&&(t.vector.x*=-1),(t.y>=h||t.y<=0)&&(t.vector.y*=-1),t.x>w&&(t.x=w),t.y>h&&(t.y=h),t.x<0&&(t.x=0),t.y<0&&(t.y=0)},t.draw=function(){ctx.beginPath(),ctx.arc(t.x,t.y,t.radius,0,2*Math.PI),ctx.closePath(),ctx.fillStyle=t.color,ctx.fill()}};