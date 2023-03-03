/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(()=>{
    function  createTweetElement(tweetData) {
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
        `)
        return $tweet 
    
    }
    // const person = {
    //   occupation: "div"
    // }
    // Test / driver code (temporary). Eventually will get this from the server.
    const tweetData = {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
            "handle": "@SirIsaac"
          },
        "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
        "created_at": 1461116232227
     }
    
    const $tweet = createTweetElement(tweetData);
    
    // Test / driver code (temporary)
    console.log($tweet); // to see what it looks like
    $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    

    
})

const renderTweets = function(tweets) {
  // Empty out the tweets container to avoid duplicates
  $('#tweets-container').empty();

  // Loop through each tweet in the tweets array
  for (let tweet of tweets) {
    // Call createTweetElement to create a jQuery object representing the tweet
    const $tweet = createTweetElement(tweet);

    // Append the tweet to the tweets container
    $('#tweets-container').append($tweet);
  }
};
