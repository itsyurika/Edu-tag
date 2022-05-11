(function($) {

  let $resourceCards = $(`
  <div class="row g-0 row-gap resource-cards">
  </div>
  `);

  window.$resourceCards = $resourceCards;
  window.resourceCards = {};

  function addCard(card) {
    $resourceCards.append(card);
    console.log("from add card fxn : ", $resourceCards);
    // $("#page-main").append($resourceCards)
  };

  function clearCards() {
    // $resourceCards.empty();
    $('#page-main').empty();
  }

  function addResources(resources) {
    clearCards();
    // console.log("addResources fxn", resources);
    for (const resourceId of resources) {
      // const resource = resources[resourceId.id];
    //  console.log(resourceId);
      const card = resourceCard.createCard(resourceId);//TODO may need to add second parameter -> resources_reviews to pull up comments / rating / likes
      console.log("cards: ", card);
      // addCard(card);
      $("#page-main").append(card);

    }
  }

  window.resourceCards.clearCards = clearCards;
  window.resourceCards.addResources = addResources;
})(jQuery);
