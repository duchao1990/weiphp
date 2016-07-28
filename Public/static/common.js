/**
 * Created by cucme on 2016/7/8.
 */
function UpToaster(data){
    if(data.status==0){
        toastr.error(data.info);
    }else{
        toastr.success(data.info);
    }

    if(data.url!=''){
        setTimeout(function() {window.location.href=data.url}, 3000);
    }
}

function   formatDate(now)   {   
  var   year=now.getFullYear();   
  var   month=now.getMonth()+1;   
  var   date=now.getDate();   
  var   hour=now.getHours();   
  var   minute=now.getMinutes();   
  var   second=now.getSeconds();   
  return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;   
  }
   
 function timeFormatter(value, row) {
    var   d=new Date(parseInt(value) * 1000);  
      var timef=formatDate(d); 
    return timef;
}  