function GetQueryString(e){var o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),t=window.location.search.substr(1).match(o);return null!=t?decodeURI(t[2]):null}function addcookie(e,o,t){t=t||0;var n="";if(0!=t){var a=new Date;a.setTime(a.getTime()+24*t*3600*1e3),n="; expires="+a.toGMTString()}document.cookie=e+"="+escape(o)+n+"; path=/"}function getcookie(e){for(var o=document.cookie,t=o.split("; "),n=0;n<t.length;n++){var a=t[n].split("=");if(a[0]==e)return a[1]}return""}function delCookie(e){var o=new Date;o.setTime(o.getTime()-1);var t=getcookie(e);null!=t&&(document.cookie=e+"="+t+"; path=/;expires="+o.toGMTString())}function getLocalTime(e){return new Date(1e3*parseInt(e))}try{FastClick.attach(document.body)}catch(e){}var WapSiteUrl="http://www.fenhongshop.com";$.ajax({type:"get",url:"http://www.fenhongshop.com/api/index.php?act=buyer_discovery&op=get_shop_class&flag=wap",data:{flag:"wap"},global:!1,dataType:"json",success:function(e){if(e&&0==e.error){console.log(e);var o=template("discoverList",e);$("#discover_list").html(o)}},error:function(e){console.log("请求出错！")}}),$(function(){$.ajax({type:"get",url:"http://www.fenhongshop.com/api/index.php?act=wholesaler&op=goodstype1",data:{flag:"wap",id:"1",num:27,curpage:1},global:!1,dataType:"json",success:function(e){if(e&&0==e.error){console.log(e),console.log(e.result);var o=template("index-tpl",e);$(".seccontentul").html(o)}},error:function(e){console.log("请求出错！")}})});