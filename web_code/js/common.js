
/*加载fastclick*/
try{
    FastClick.attach(document.body);
}catch(e){

}


//获取URL的KEY值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

//cookie封装函数
//添加cookie
function addcookie(name, value, days) {
    days = days || 0;
    var expires = "";
    if (days != 0) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
}
//获取cookie
function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}
//删除cookie
function delCookie(name) { 
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

/*时间戳转日期*/
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000);
};


/*
 * JAVASCRIPT 常用JS方法库
 *
 */
(function() {

    //获取滚动条当前的位置
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    };



    //获取当前可视范围的高度
    function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    };



    //获取文档完整的高度
    function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    //滚动到底部加载数据
    function scrollEndLoad(callback) {
        $(window).on('scroll', function() {
            if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                callback();
            }
        });
    };


    //回到顶部
    function toTop(n) {
        $(window).on('scroll', function() {
            //alert(getScrollTop()+"!"+getScrollHeight());
            if ($("#totop").size() > 0) {
                if (getScrollTop() < $(window).height() * n) {
                    $("#totop").remove();
                }
            } else {
                if (getScrollTop() >= $(window).height() * n) {
                    $("body").after("<div id='totop'></div>");
                    $("#totop").on('click', function() {
                        scroll(0,200);
                    });
                }
            }
        });
    };

    //字符串截取，超出则加“...”
    function subStrLen(str, len) {
        if (str.length > len) {
            str = str.substring(0, len) + "...";
        }
        return str;
    };

    /*判断对象(json)是否为空*/
    function isEmptyObject(obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };



    /*
     * 传入表单项，根据属性进行验证
     * @param {zepto对象} $item
     * need:必填
     * @returns {undefined}
     */
    function validItem($item) {
        var msg = validMsg();
        var currMsg = "";
        var itemval = $.trim($item.val());
        //判断是否必填
        if ($item[0].hasAttribute("need")) { //是必填
            if (itemval == "") {
                currMsg = formatStr(msg["need"], $item.attr("tip"));
                return currMsg;
            }
        }
        //最小长度
        if ($item[0].hasAttribute("min")) {
            if (itemval.length < parseInt($item.attr("min")) && itemval != "") {
                currMsg = formatStr(msg["min"], $item.attr("min"));
                return currMsg;
            }
        }
        //最大长度
        if ($item[0].hasAttribute("max")) {
            if (itemval.length > parseInt($item.attr("max")) && itemval != "") {
                currMsg = formatStr(msg["max"], $item.attr("max"));
                return currMsg;
            }
        }
        //比较两次输入
        if ($item[0].hasAttribute("sameto")) {
            if (itemval != $("#" + $item.attr("sameto")).val()) {
                currMsg = $item.attr("tip");
                return currMsg;
            }
        }
        //判断是否是手机号
        if ($item[0].hasAttribute("telephone")) {
            if (!(/^1[1-9][0-9]\d{8}$/.test(itemval)) && itemval != "") {
                currMsg = formatStr(msg["telephone"], $item.attr("tip"));
                return currMsg;
            }
        }
        return currMsg;
    }

    //获取购物车数量
    function getCartGoodsNum(mid,token,load){
        $.ajax({
            type:'get',
            url:WapSiteUrl+'/api/index.php?act=buyer_cart&op=list',
            data:{mid:mid,token:token,flag:"wap",type:"db",area:2},
            dataType:'json',
            success:function(data){
                load.success(data);
            },
            error:function(xhr){

            },
            complete:function(xhr){

            }
        })
    }
    
    //搜索框点击跳转到搜索页
    function  goSearch(e){
        $(e).click(function(){
            location.href='../index/search.html';
        });
    }

	//添加阴影（遮罩层）
    function addShadeLog(){
    	$('body').prepend('<img src="../../images/weidian/addshade.png" alt="" class="addShadeLog">');
    	setTimeout(function(){
    		$('.addShadeLog').remove();
    	},3000);

    	$('.addShadeLog').bind('click',function(){
    		$(this).remove();
    	})
    }
    
    //格式化时间方法
    function dateFormat(date){

        date = new Date(date*1000);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        format = "yyyy-MM-dd".replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }

    //获取接口数据
    function ajaxDate(type,url,data,success,error){
        if(native_flag=='-1'){
          data.flag ='wap';
        }else if(native_flag=='0'){
          data.flag ='android';
        }else if(native_flag=='1'){
          data.flag ='ios';
        }
        data.deviceid ="wap";
        data.market = "wap";
        data.vercode=320;
        data.vername='3.2.2';
        $.ajax({
            url: url,
            type: type,
            data:data,
            dataType: 'json',
            success: success,
            error:error
        });
    }
    
    //load
//  function fhload(){
//      var loaddom = '<p class="fh-loading">'+
//          '			<img src="../../images/index/load.png" alt="" class="f-load"/>'+
//          '			<img src="../../images/index/loading.png" alt="" class="f-loadimg"/>'+
//          '</p>';
//      $('body').append(loaddom);
//  }
    
})();

//$(function(){
//  toTop(2);
//})
