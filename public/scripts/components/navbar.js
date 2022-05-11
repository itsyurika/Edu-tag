$(() => {
  window.header = {};

  const $pageHeader = $('#page-header');
  let currentUser = null;
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find(".page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav id="navbar_top" class="navbar navbar-expand-lg navbar-dark bg-dark page-header__user-links">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <!-- User not Logged in Specific Code -->
              <a class="nav-link active login-btn" aria-current="page" href="#">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active register-btn" href="#">Register</a>
            </li>

            <!-- End of User not Logged in Specific Code -->
            <li class="nav-item dropdown">
              <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Order By
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdown">
                <li><a class="dropdown-item popular" href="#">Popularity</a></li>
                <li><a class="dropdown-item date_added" href="#">Date Added</a></li>
                <li><a class="dropdown-item dd_tags" href="#">Tags</a></li>
                <li><a class="dropdown-item dd_title" href="#">Title</a></li>
                <li><a class="dropdown-item my_rating" href="#">My Rating</a></li>
              </ul>
            </li>
          </ul>

          <form class="d-flex">
            <input class="form-control mr-sm-2 search-form" type="search" placeholder="Search Tags" aria-label="Search">
            <button class="btn btn-dark my-2 my-sm-0" id="search-button" type="submit"><i
                class="fas fa-search"></i></button>
          </form>

        </div>
      </div>
    </nav>
      `
    } else {
      userLinks = `
      <nav id="navbar_top" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
            <!-- User Logged in Specific Code -->
              <a class="nav-link active nav-user" aria-current="page" href="#">Hello, ${user.name}!</a>
            </li>
            <!--End of User Logged in Specific Code -->
            <li class="nav-item dropdown">
              <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Order By
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdown">
                <li><a class="dropdown-item popular" href="#">Popularity</a></li>
                <li><a class="dropdown-item date_added" href="#">Date Added</a></li>
                <li><a class="dropdown-item dd_tags" href="#">Tags</a></li>
                <li><a class="dropdown-item dd_title" href="#">Title</a></li>
                <li><a class="dropdown-item my_rating" href="#">My Rating</a></li>
              </ul>
            </li>
          </ul>

          <form class="d-flex">
            <input class="form-control mr-sm-2 search-form" type="search" placeholder="Search Tags" aria-label="Search">
            <button class="btn btn-dark my-2 my-sm-0" id="search-button" type="submit"><i
                class="fas fa-search"></i></button>
          </form>

        </div>
      </div>
    </nav>
      `
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateHeader;

  getMyDetails()
    .then(function( json ) {
    updateHeader(json.user);
  });

  $(".navbar").on("click", '.login-btn', function() {
    // propertyListings.clearListings();
    // getAllReservations()
    //   .then(function(json) {
    //     propertyListings.addProperties(json.reservations, true);
    //     views_manager.show('listings');
    //   })
    //   .catch(error => console.error(error));
  });
  $(".navbar").on("click", '.registration-btn', function() {
    // propertyListings.clearListings();
    // getAllListings(`owner_id=${currentUser.id}`)
    //   .then(function(json) {
    //     propertyListings.addProperties(json.properties);
    //     views_manager.show('listings');
    // });
  });

 $(".navbar").on("click", '.home', function() {
  //   propertyListings.clearListings();
  //   getAllListings()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.properties);
  //       views_manager.show('listings');
  //   });
  });

  $('.navbar').on('click', '.popularity', function() {
    // views_manager.show('searchProperty');
  });

  $(".navbar").on('click', '.date_added', () => {
    // views_manager.show('logIn');
  });
  $(".navbar").on('click', '.dd_tags', () => {
    // views_manager.show('signUp');
  });
  $(".navbar").on('click', '.my_rating', () => {
    // logOut().then(() => {
    //   header.update(null);
    });

  $('.navbar').on('click', '.search_button', function() {
    // views_manager.show('newProperty');
  });

});
