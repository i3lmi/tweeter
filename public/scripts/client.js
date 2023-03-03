/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //Function to create tweet elements
  function createTweetElement(tweetData) {
    // const $tweet = $(`<article class="tweet">Hello world</article>`);
    const $tweet = $(`
        <article class="tweet">
        <header class="profile"> 
          <div class="picture-name">
          <img width = "80px" src="/images/profile-hex.png" class="name"> 
              <div class="name">${tweetData.user.name}</div>
          </div>
          <div class="tweeter-handle">${tweetData.user.handle}</div>
        </header>
        <p>Hello this is a Tweet</p>
        <footer>
          <p>10 Days Ago</p>
          <div>
            <i class="fas fa-retweet"></i>
            
            <i class="far fa-heart"></i>

            <i class="far fa-envelope"></i>
          </div>
        </footer>
      </article>
        `);
    return $tweet;
  }

  //function to render tweets data
  const renderTweets = function (tweets) {
    //each time new list of tweets is loaded old container is emptied
    $("#tweets-container").empty();

    // loops through tweets
    for (let showObj of tweets) {
      // Targetting the container and appending the item to it
      // calls createTweetElement for each tweet
      const showElement = createTweetElement(showObj);
      $("#tweets-container").prepend(showElement);
      // takes return value and appends it to the tweets container
    }
  };

  //function used to have escape method to avoid cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Error messages for "empty tweet field and characters over 140 charecters" are hidden before it meets the condition
  $("#error-message").hide();
  $("#error-message1").hide();

  $("#search-frm").on("submit", function (event) {
    // prevent form submission
    event.preventDefault();

    const tweetCounter = $(".counter")[0];

    //Form data is serialized.
    const formData = $(this).serialize();

    //length of message is checked and validated
    const myLength = $("#tweet-text").val().length;

    if (myLength === 0) {
      $("#error-message").slideDown("slow"); //error messages slides down when message box is empty
      //  alert("Write something to post");
    } else if (myLength > 140) {
      $("#error-message").slideUp("slow");
      $("#error-message1").slideDown("slow"); //error message when it exceeds character limit
    } else {
      $("#error-message").slideUp("slow");
      $("#error-message1").slideUp("slow");
      //post form data to /tweets
      $.ajax("/tweets", {
        method: "POST",
        data: formData,
      })
        .done((results) => {
          loadtweets(results);
          $("#tweet-text").val("");
          tweetCounter.value = 140;
        })
        .fail((err) => {
          console.log(`Error: ${err.message}`);
        })
        .always(() => {
          console.log("request to Tweet done");
        });
    }
  });
  // function to getdata from '/tweets'
  const loadtweets = function () {
    $.ajax("http://localhost:8080/tweets", { method: "GET" }).done(function (
      result
    ) {
      renderTweets(result);
    });
  };
  loadtweets();
});
