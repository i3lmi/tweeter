$(document).ready(function() {
    const textarea = $("#tweet-text");
    const counter = $(".counter");
  
    textarea.on("input", function() {
      const remaining = 140 - textarea.val().length;
      counter.text(remaining);
      if (remaining < 0) {
        counter.css("color", "red");
      } else {
        counter.css("color", "");
      }
    });
  });
  
  const $tweet = $(`<article class="tweet">Hello world</article>`);
  