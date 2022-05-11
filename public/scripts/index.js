(function($) {

  $(() => {
    console.log("loading jquery of getAllResourceCards");
    getAllResourceCards()
    .then((json) =>{
      console.log("json :", json);
      resourceCards.addResources(json.resources);
      views_manager.show('cards');
    })
  })


})(jQuery);
