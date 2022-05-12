
// Client facing scripts here

const loginDropDown = function() {
  if ($('.login-dd').is(':visible') || $('.register-dd').is(':visible')) {
    $(".login-dd").slideUp();
    $('.register-dd').slideUp();
    // $("#errormsg").slideUp();

  } else {
    $('.register-dd').slideUp();
    $(".login-dd").slideDown();

  }
};

const registerDropDown = function() {
  if ($('.register-dd').is(':visible') || $('.login-dd').is(':visible')) {
    $(".login-dd").slideUp();
    $('.register-dd').slideUp();
    // $("#errormsg").slideUp();

  } else {
    $('.login-dd').slideUp();
    $(".register-dd").slideDown();

  }
};

document.addEventListener("DOMContentLoaded", function(){

  $('.login-dd').hide();
  $('.register-dd').hide();

  window.addEventListener('scroll', function() {
      if (window.scrollY > 0) {
        document.getElementById('navbar_top').classList.add('fixed-top');
        // add padding top to show content behind navbar
        navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar_top').classList.remove('fixed-top');
         // remove padding top from body
        document.body.style.paddingTop = '0';
      }

    });

  $(".login-btn").on("click", function() {
    loginDropDown();
  });

  $(".register-btn").on("click", function() {
    registerDropDown();
  });











});
