"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories");
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick");
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  hidePageComponents();
  putStoriesOnPage();
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//When a user clicks the submit button, show the form
function navSubmitClick(evt){
  console.debug("submitClick");
  $submitForm.show();
}
$navSubmit.on("click", navSubmitClick);


//When a user clicks the favorites button, show the favorites
function navFavClick(evt){
  console.debug("favClick");
  hidePageComponents();
  putFavoritesOnPage();
}
$favButton.on("click", navFavClick);

//When a user clicks on their stories, show their stories
function navUserClick(evt){
  console.debug("userClick");
  hidePageComponents();
  putUserStoriesOnPage();
}
$userButton.on("click", navUserClick);

//When a user clicks on their profile, show their profile
function navProfileClick(evt){
  console.debug("profileClick");
  hidePageComponents();
  putUserInfoOnPage();
}
$navUserProfile.on("click",navProfileClick);

// function updatePassword(evt){
//   console.debug("updatePassword");
//   updateUserPassword();
// }
// $updatePasswordButton.on("click", updatePassword);