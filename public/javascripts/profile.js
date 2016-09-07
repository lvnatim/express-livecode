

$(".viewDoc").on("click", function(){
  var documentId = $(this).data("liveCode");
  var documentUrl = "/livecode/" + documentId;
  window.open(documentUrl);
});

$(".document").on("click", function(){
  $(".document").not(this).removeClass('highlight');
  $(this).toggleClass('highlight');
})

