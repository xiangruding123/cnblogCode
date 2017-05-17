
$(function(){
	
//	http://www.fenhongshop.com/api/index.php?act=common_index&op=get_index_data&flag=wap
//  url:WapSiteUrl+"api/index.php?act=common_index&op=get_index_data&flag=wap",
//  url:WapSiteUrl+"api/index.php?act=wholesaler&op=goodstype1"
	$.ajax({
	    type:"get",
	    url:"http://www.fenhongshop.com/api/index.php?act=wholesaler&op=goodstype1",
	    data:{"flag":"wap","id":"1","num":27,"curpage":1},
	    global:false,
	    dataType:"json",
	    success:function(data){
	        if(data&&data.error==0){
	        	console.log(data);
	        	console.log(data.result);
	        	
	        	var html = template('index-tpl',data);
				$('.seccontentul').html(html);
	        }
	    },
	    error:function(xhr){
	    	console.log("请求出错！")
	    }
	});
	
});




