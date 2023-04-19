"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star">
          <i class="fa-star ${currentUser.isFavorite(story)}"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//Gets the data from the form and creates a new story
function getSubmittedStory(){
  let title = $titleInput.val();
  let author = $authorInput.val();
  let url = $urlInput.val();
  
  storyList.addStory(currentUser,{title, author, url});
  putStoriesOnPage();
  $submitForm.hide(); 
}

function putFavoritesOnPage(){
  $favList.empty();

  if(currentUser.favorites.length === 0){
    $favList.append("<h5>No favorites!</h5>");
  }else{
    for(let eachStory of currentUser.favorites){
      let $storyMarkup = generateStoryMarkup(eachStory);
      $favList.append($storyMarkup);
      console.log("fuck you");
    }
  }
  $favList.show();
}

async function toggleFavorite(event){
  let $target = $(event.target);
  let $targetLI = $target.parent().parent();
  let storyId = $targetLI.attr("id");
  let story = storyList.stories.find(eachStory => eachStory.storyId === storyId);

  if($target.hasClass("far")){
    await currentUser.addFavorite(story);
    $target.addClass("fas");
    $target.removeClass("far");
  }else{
    await currentUser.removeFavorite(story);
    $target.removeClass("fas");
    $target.addClass("far");
  }
}
$allStoriesList.on("click", ".star", toggleFavorite);

