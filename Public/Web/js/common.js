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