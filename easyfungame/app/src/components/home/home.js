//(function(){
//		var mySlider=function(obj){
//			this.init(obj)
//		}
//
//		mySlider.prototype={
//			init:function(obj){
//				if(document.getElementById(obj) == null || document.getElementById(obj) === undefined) return;
//				this.box=document.getElementById(obj),
//				this.winW=document.documentElement.clientWidth || document.body.clientWidth,
//				this.winH=document.documentElement.clientHeight || document.body.clientHeight,
//				this.section=$(this.box).children('div'),
//				this.myIndex=0,
//				this.len=this.section.length;
//
//				document.getElementById('wrap').style.width=this.winW+'px';
//				this.box.style.cssText='width:'+this.winW*this.len+'px; min-height:'+this.winH+'px;-webkit-transform:translate3d(0,0,0); transform:translate3d(0,0,0);';
//
//				for (var i = 0; i < this.len; i++) {
//					var myDiv=this.section.eq(i);
//					myDiv.css({
//						'-webkit-transform':'translate3d('+this.winW*i+'px,0,0)',
//						'transform':'translate3d('+this.winW*i+'px,0,0)',
//						'width':this.winW,
//						'min-height':this.winH
//					})	
//
//					this.slider(myDiv)				
//				};
//			},
//			slider:function(myObj){
//				myObj[0].addEventListener('touchstart',startHander,false);
//
//				var startTime,posX,posY,offsetX=0,tranX,toTun=false,self=this;
//				function startHander(e){
//					startTime=new Date() * 1,
//					posX=e.touches[0].pageX,
//					posY=e.touches[0].pageY,
//					transs =self.getTransform($(self.box))[0];
//					tranX =self.getTransform($(self.box))[0];
//					document.addEventListener('touchmove',function(e){
//						e.preventDefault();
//						offsetX=e.touches[0].pageX - posX;
//						var t=(parseInt(offsetX)+parseInt(tranX));
//						$(self.box).css({
//							'-webkit-transition':'-webkit-transform 0',
//							'transition':'transform 0',
//							'-webkit-transform':'translate3d('+t+'px,0,0)',
//							'transform':'translate3d('+t+'px,0,0)'
//						})
//					},false)
//				}
//
//				myObj[0].addEventListener('touchend',function(){
//					var endTime=new Date() * 1,
//						 clienW=self.winW/6;
//					if (endTime - startTime > 500) {
//						if(offsetX > clienW){
//							self.go(self.myIndex-1)
//						}else if(offsetX < -clienW){
//							self.go(self.myIndex+1)
//						}else{
//							self.go(self.myIndex)
//						}
//					}else{
//						if(offsetX > 90){
//							self.go(self.myIndex-1)
//						}else if(offsetX < -90){
//							self.go(self.myIndex+1)
//						}else{
//							self.go(self.myIndex)
//						}
//					}
//				},false)
//
//			},
//			go:function(n){
//				var i=parseInt(n);
//				if(typeof i == "number") {
//					if(i<=0){
//						i=0
//					}else if(i==this.len){
//						i=this.len-1;
//					}else{
//						i=n
//					}
//				}
//
//				this.myIndex=i;
//				$(this.box).css({
//					'-webkit-transition':'-webkit-transform 0.2s',
//					'transition':'transform 0.2s',
//					'-webkit-transform':'translate3d('+-this.myIndex*this.winW+'px,0,0)',
//					'transform':'translate3d('+-this.myIndex*this.winW+'px,0,0)'
//				})
//
//			//	console.log('this.myIndex==='+this.myIndex)
//			},
//			setFransform:function(i){
//				console.log(i)
//				$(self.box).css({
//					'-webkit-transform':'translate3d('+i+'px,0,0)',
//					'transform':'translate3d('+i+'px,0,0)'
//				})
//			},
//			getTransform:function(obj){
//				var str=obj.css('-webkit-transform');
//				var mt=/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/;
//			   results = obj.css('-webkit-transform').match(mt);
//			 //  console.log('resultssssss==='+results)
//			   if(!results) return [0, 0, 0];
//			   if(results[1] == '3d') {
//				   return results.slice(2,5);
//				}
//
//			   results.push(0);
//			   return results.slice(5, 8);
//			},
//			getClass:function(obj,className){
//				if(document.getElementById(obj) == null || document.getElementById(obj) === undefined) return;
//				var a=document.getElementById(obj),b=a.getElementsByTagName('*'),c=[];
//				for (var i = 0; i < b.length; i++) {
//					if(b[i].className==className){
//						c.push(b[i])
//					}
//				};
//				return c;
//			}
//		}
//window.onresize=function(){
//			new mySlider('boxSection')
//		}
//
//		new mySlider('boxSection')
//})()