$(function(){
	var s=1;  //计时器 
	var o=$(".slide-box");  //最外层元素
	var b=$(".slide-list"); //轮播图父元素
	var j=$(".slide-list li"); //子元素
	j.css({float:"left"});
	j.eq(j.length-1).clone().addClass("clone").prependTo(b);
	j.eq(0).clone().addClass("clone").appendTo(b);   // 此处第0 个 为克隆的第一张图
	b.css({width:""+(j.length*j.outerWidth()+(j.outerWidth()*2))+"px",position:"relative",left:"-"+j.outerWidth()+"px"}); //给b 重置样式
	/*此处 console。log(j.length) 为5 但加上克隆实际为6 所以上面加了一*/
	var sid=function(){
		s++;
		if(s>j.length){
			s=1;
			b.css({left:"0"})
		}
		//	console.log(j.length);  //5
		color();           //子列表样式
		//	console.log(s);
		b.animate({left:"-"+s*j.outerWidth()+"px"},500);
	    show=setTimeout(sid,3000);

	}
	var show=setTimeout(sid,3000);
/*鼠标移到到上面就停止滚动*/
	 o.on('mouseenter',function(){
		clearTimeout(show);
		$('.anniu').css({display:'block'});     //前后按钮
		//$('.prve').css({display:'block'});		//前后按钮
	}).on("mouseleave",function(){
		show=setTimeout(sid,3000);
		$('.anniu').css({display:'none'});	//前后按钮
		//$('.prve').css({display:'none'});	//前后按钮
	})
/*添加子列表*/
	function color(){
		$(".hd li").css({background:"#8BE5D6"});
		$(".hd li").eq(s).css({background:"#ff4466"});
	}
	b.after('<ul class="hd"></ul>');
	var w="";    //容器
	for(var i=0;i<=j.length;i++){
		//console.log(i);
		w+="<li>"+i+"</li>";
	}
	//console.log(w);
	$(".hd").html(w);
	o.css({position:"relative"});
	$(".hd li").css({float:"left",width:"20px",height:"20px",borderRadius:"10px",marginLeft:"10px",background:"#8BE5D6",cursor:"pointer",textAlign:"center",lineHeight:"20px",color:'#fff'});
	$(".hd li").eq(0).css({display:"none"});
	$(".hd li").eq(j.length+2).css({display:'none'});
	$(".hd li").eq(1).css({background:"#ff4466"});
	$(".hd").css({position:"absolute",bottom:"20px",left:"50%",marginLeft:"-75px"});
	$(".hd li").on("mouseenter",function(){
		var index=$(this).index();
		s=index;
		b.animate({left:"-"+s*j.outerWidth()+"px"},500);
		color();   //子列表样式
	})
/*前后点击*/
	b.after("<a class='prve anniu' href='javascript:;'><</a>");  //注意此处俩个类名
	b.after("<a class='next anniu' href='javascript:;'>></a>");
	$('.anniu').css({display:"none",position:"absolute",top:"50%",width:'30px',height:'40px',background:'rgba(0,0,0,.4)',marginTop:'-40px',color:"#fff",lineHeight:'40px',fontSize:'16px',textAlign:'center',fontWeight:'900'});
	$('.next').css({right:"0"});
	$('.prve').css({left:'0'});
	$('.prve').on('click',function(){
		s--;
			console.log(s);
		if(s<1){
			b.css({left:"-"+(j.outerWidth()*(j.length+1))+"px"});    //此处为 后加上clone
			s=5
			b.animate({left:"-"+s*j.outerWidth()+"px"},500);
			color();
			return;
		}
		color();
		b.animate({left:"-"+s*j.outerWidth()+"px"},500)
	})
	$('.next').on('click',function(){
		s++;
		if(s>j.length){
			s=1;
			b.css({left:"-0px"});
			b.animate({left:"-"+s*j.outerWidth()+"px"},500);
			color();
			return;
		}
		color();
		b.animate({left:"-"+s*j.outerWidth()+"px"},500);
	})
})