	//发现
//	http://www.fenhongshop.com/api/index.php?act=buyer_discovery&op=get_shop_class&flag=wap
	
	$.ajax({
	    type:"get",
	    url:"http://www.fenhongshop.com/api/index.php?act=buyer_discovery&op=get_shop_class&flag=wap",
	    data:{"flag":"wap"},
	    global:false,
	    dataType:"json",
	    success:function(data){
	        if(data&&data.error==0){
	        	console.log(data);
	        	var html = template('discoverList',data);
				$('#discover_list').html(html);
	        }
	    },
	    error:function(xhr){
	    	console.log("请求出错！")
	    }
	});
	
	
	