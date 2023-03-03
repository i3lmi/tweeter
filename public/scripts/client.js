/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [];

  //Created the tweet in proper formatting to be rendered on page
  function createTweetElement(tweetObject) {
    const $tweet = $(`
    <article class="tweet">
      <div class="tweet-header">
        <div class="tweet-header-name">  
          <img src=${tweetObject.user.avatars}/> 
          <p class="tweet-header-username">${tweetObject.user.name}</p> 
        </div> 
        <p class="tweet-header-handle">
          ${tweetObject.user.handle}
        </p>
      </div>
      <div class="tweet-main">
        ${escape(tweetObject.content.text.replace(/(\w{40})(?=\w)/g, "$1 "))}
      </div> 
      <div class="tweet-footer">
        <p class="tweet-footer-timestamp">${timeago.format(
          tweetObject.created_at
        )}</p>
        <div class="tweet-footer-icons">  
          <i class="fa-solid fa-retweet"></i> 
          <i class="fa-solid fa-heart"></i> 
          <i class="fa-solid fa-flag"></i>
        </div>
      </div>
    </article>`);

    return $tweet;
  }

  //Escape function to avoid cross scripting issue
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Submit a new tweet after validation on empty tweet and input length
  $(".submit-tweet").submit(function (event) {
    event.preventDefault();
    let inputLength = $("textArea").val().length;
    if (inputLength === 0) {
      $(".error-container").slideDown();
      $(".error-message").html("<h5>Please enter a valid tweet!</h5>");
    } else if (inputLength > 140) {
      $(".error-container").slideDown();
      $(".error-message").html(
        "<h5>Please enter a valid tweet of less than 140 character!</h5>"
      );
    } else {
      $(".error-container").slideUp();
      const tweetContent = $(".submit-tweet").serialize();
      $.post("/tweets", tweetContent, function () {
        $("textArea").val("");
        $(".counter").val("140");
        loadTweets();
      });
    }
  });

  //load tweets dynamically using AJAX
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: $(".submit-tweet").serialize(),
      dataType: "json",
      success: function (data) {
        $("#tweets-container").empty();
        renderTweets(data);
      },
    });
  }
  loadTweets();
  // Render Tweets from the data array of tweet objects
  function renderTweets(tweetsArray) {
    for (let value of tweetsArray) {
      const $tweet = createTweetElement(value);
      $("#tweets-container").prepend($tweet);
    }
  }
});