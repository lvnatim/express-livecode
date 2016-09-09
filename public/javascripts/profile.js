//TODO: Open sockets for each document here? Or only on click?

$(".viewDoc").on("click", function(){
  var documentId = $(this).data("liveCode");
  var documentUrl = "/livecode/" + documentId;
  window.open(documentUrl);
});

$(".documentTitle").on("keypress", function(e){

  if(e.keyCode === 13){
    console.log("saving");
  }else{
    console.log("nothing registerd");
  }

})

$(".document").on("click", function(){
  $(".document").not(this).removeClass('highlight');
  $(this).toggleClass('highlight');
  $(this).next().toggleClass('show');
});
