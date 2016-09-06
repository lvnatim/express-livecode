$(".viewDoc").on("click", function(){
  var documentId = $(this).data("liveCode");
  var documentUrl = "/livecode/" + documentId;
  window.open(documentUrl);
});

