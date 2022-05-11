$(() => {
  window.sidebar = {};

  const $sidebar = $('.page-side-bar');
  let currentUser = null;
  function updateSidebar(user) {
    currentUser = user;
    $sidebar.find(".sidebar-head").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <div class="row sidebar-head">
      <div class="col-3">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" id="side-bar" style="width: 200px;">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

            <span><img src="/background-img/logo4.jpeg" style="max-width:160px"></span>
          </a>
          <hr>
          <ul class="nav nav-pills flex-column mb-auto">

            <!-- Start of Code if No User -->
            <li>
              <a href="#" class="nav-link text-white">
              Please login to access your resources, and your likes!
              </a>
            </li>
            <!-- End of Code if No User -->
          </ul>
        </div>
      </div>
    </div>
      `
    } else {
      userLinks = `
      <div class="row sidebar-head">
      <div class="col-3">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" id="side-bar" style="width: 200px;">
          <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

            <span><img src="/background-img/logo4.jpeg" style="max-width:160px"></span>
          </a>
          <hr>
          <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
              <a href="#" class="nav-link text-white" aria-current="page">
                <span id="my-resources-taglist">My Resources</span>

                <ul class="list-unstyled">
                  <ul class="user-tag-list">

                    <!-- <li>${user.tags}</li> -->

                  </ul>
                </ul>
              </a>

            </li>
            <li>
              <a href="#" class="nav-link text-white sidebar-my-likes">
                My Likes
              </a>
            </li>
            <li>
              <a href="#" class="nav-link text-white sidebar-my-profile">
                My User Profile
              </a>
            </li>
          </ul>
          <hr>
          <button type="button" class="btn btn-outline-light logout">Logout</button>

        </div>
      </div>
    </div>
      `
    }

    $pageHeader.append(userLinks);
  }

  window.header.update = updateSidebar;

  // getMyDetails()
  //   .then(function( json ) {
  //   updateHeader(json.user);
  // });

  getUserTags()
    .then(function( json ) {
      updateUserTags(json.user);
    });

  $("#side-bar").on("click", '.logout', function() {
    // propertyListings.clearListings();
    // getAllReservations()
    //   .then(function(json) {
    //     propertyListings.addProperties(json.reservations, true);
    //     views_manager.show('listings');
    //   })
    //   .catch(error => console.error(error));
  });
  $("#side-bar").on("click", '#my-resources-taglist', function() {
    // propertyListings.clearListings();
    // getAllListings(`owner_id=${currentUser.id}`)
    //   .then(function(json) {
    //     propertyListings.addProperties(json.properties);
    //     views_manager.show('listings');
    // });
  });

 $("#side-bar").on("click", '.sidebar-my-likes', function() {
  //   propertyListings.clearListings();
  //   getAllListings()
  //     .then(function(json) {
  //       propertyListings.addProperties(json.properties);
  //       views_manager.show('listings');
  //   });
  });

  $('.navbar').on('click', '.sidebar-my-profile', function() {
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

