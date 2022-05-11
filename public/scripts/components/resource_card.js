(function($){
  window.resourceCard = {};

  function createCard(resource) {
    console.log("from rescource card - createcard: ", resource)
    const {create_date, creator_id, id, description, thumbnail_url, title, url } = resource;

    let card = $(`
    <article class="resource-card">
    <div class="col">
    <div class="card bg-transparent" style="width: 22rem;">
    <!--  // <img src="//image.thum.io/get/${url}" class="card-img-top resource-img" alt="..." > -->
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a href="${url}" class="btn btn-primary btn-sm card-link">Website</a>
        <footer>
          <div class="icons">
            <span>
              <i class="fa fa-heart red ml-3 hover-animation" data-hover-color="red"></i>
              <span>
                <i class="fa-regular fa-star star1"></i>
                <i class="fa-regular fa-star star2"></i>
                <i class="fa-regular fa-star star3"></i>
                <i class="fa-regular fa-star star4"></i>
                <i class="fa-regular fa-star star5"></i>
              </span>
          </div>
          <p class="card-comments">Comments <span class="comment-count">6</span></p>
          <span class="card-avg-rating"><strong>4.5</strong></span>
          <span>Avg Rating</span>
          <hr>
          <span class="card-bottom">
            <p class="card-subtitle mb-2 text-muted card-tag">Chemistry</p>
            <a class="card-spl" href="#">Card Page</a>
          </span>
          </span>

        </footer>
      </div>
    </div>
  </div>
  </article>
    `)

    return card;
  }

  window.resourceCard.createCard = createCard;
})(jQuery);
