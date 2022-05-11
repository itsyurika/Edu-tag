(function($){

  const $pageMain = $('#page-main');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    console.log("resource :", $resourceCards);
    $resourceCards.detach();

  switch (item) {
    case 'cards':
      $resourceCards.appendTo($pageMain);
      break;
  }

  }


})(jQuery);
