$(document).ready(function() {
  var handleDown = false;
  var answer = "";
  var quoteList;
  var secondQuoteList;
  var forLink;
  var toLink;
  var returnQuote;
  var urlReady;
  var $handleContainer = $("#handleContainer");
  var $quoteMessage = $("#quoteMessage");
  var onMobile = false;
  var $startingMessage = $("#startingMessage");
  var $startingMessage2 = $("#startingMessage2");
  var $quoteSpace = $("#quoteSpace");
  var $authorSpace = $("#authorSpace");
  var $tweetButton = $("#tweetButton");
  var $tweetContainer = $("#tweetContainer");
  var $light = $(".light");
  
  
  
  if (JSON.stringify(navigator.userAgent.toLowerCase()).indexOf("mobile") > 0) {
    onMobile = true;
    $("body").css("perspective", "initial");
  };

  function determineTweetPos() {
    $tweetContainer.css("left", "calc(50% - " + $tweetContainer.width() / 2 + "px)");
  };
  
  determineTweetPos();
  $(window).on("resize", determineTweetPos);

  if (!onMobile) { ////////////Make the red handle ball 3D
  for (var a = 1; a < 180; a++) {
      $handleContainer.append("<div class='handle3 handle'></div>");
      $handleContainer.children(".handle3:nth-child(" + a + ")").css("transform", "rotateY(" + a + "deg)");
    };
  };

  var $handle = $(".handle");

  $handleContainer.one("click", function() {
    $startingMessage.hide();
    $startingMessage2.hide();
  });
  
  $handleContainer.on("click", function() {
    if (handleDown) {
      return false;
    }
	
    $quoteSpace.html("");
    $light.addClass("animateLights");
    $quoteMessage.show();
    $authorSpace.hide();
    $tweetContainer.hide();
    $handleContainer.addClass("rotateDown");
    handleDown = true;

    var index = 0;
    var empty = (quoteList.length === 0);

    if (empty) {
      for (var a in secondQuoteList) {
        quoteList.push(secondQuoteList[a]);
      }
      secondQuoteList = [];
      empty = false;
    }
    
    answer = [];
    answer = returnQuote(quoteList);
    answer[0] = answer[0].split(" ");

    var setQuote = setInterval(function() {
      index++;
      var partialAnswer = answer[0][index-1];
      $quoteSpace.append("<span class='partial'>" + partialAnswer + "</span> ");
      $quoteSpace.children(".partial").show("scale", 1500/answer[0].length * 1.2);
      
      if (index == answer[0].length) {
        $authorSpace.html(answer[1]);
        setTimeout(function() {
          $authorSpace.show();
          $tweetContainer.show();     
          $handleContainer.removeClass("rotateDown");
          $light.removeClass("animateLights");
        }, 1500/answer[0].length);

        setTimeout(function() {
          handleDown = false;
        }, 600);

        clearInterval(setQuote);
        return false;
      }
    }, 1500 / answer[0].length);
    forLink = urlReady(answer[0].join(" ") + "<br> -" + answer[1]);
    toLink = "https://twitter.com/intent/tweet?text=" + forLink;
    $tweetButton.attr("href", toLink);
  });

  var secondQuoteList = [];
  quoteList = [{
      "author": "Cave Johnson",
      "quote": "...Make life take the lemons back! Get mad! I don't want your damn lemons! What am I supposed to do with these?!"
    }, {
      "author": "Lewis Caroll, <i>Alice in Wonderland<\/i>",
      "quote": "How do you know I\'m mad?\" said Alice.<br> \"You must be,\" said the Cat, \"or you wouldn\'t have come here."
    }, {
      "author": "Yusuke Urameshi",
      "quote": "Even if you killed me, I would come back from the dead and drop kick your (expletive)."
    }, {
      "author": "Harry Potter",
      "quote": "But I am the chosen one."
    },

    {
      "author": "Spongebob Squarepants",
      "quote": "It was his hat Mr. Krabs! He was #1!"
    }, {
      "author": "Oscar Wilde",
      "quote": "Experience is simply the name we give our mistakes."
    }, {
      "author": "Ryan Reynolds",
      "quote": "I just love bikes. It's not the safest passion to have, but I guess it's better than Russian roulette."

    }
  ];

  //to create new quotes
  function createQuote(author, quote) {
    var newQuote = {
      "author": author,
      "quote": quote
    };
    quoteList.push(newQuote);
  };

  ///createQuote(author in double quotes, quote in double quotes);
  createQuote("James Van Der Beek", "It's a free country and I can keep my mouth shut  whenever I want.");
  createQuote("Finn Wolfhard to Jimmy Fallon", "Oh, can I read? Can you host?");
  createQuote("Handsome Jack", "\'Too many people die.\' Give me a break! That's what people DO!");
  createQuote("Will Stephen", "I have absolutely nothing to say whatsoever. And yet, through my manner of speaking, I will make it seem like I do!");
  createQuote("Sun Tzu (translated)", "The supreme art of war is to subdue the enemy without fighting.");
  createQuote("Captain John Yossarian", "Open your eyes, Clevinger. It doesn't make a damned bit of a difference who wins the war to someone who's dead.");
  createQuote("Julius Robert Oppenheimer", "I am become Death, the destroyer of worlds.");
  createQuote("KRS-One", "I exist so you can see what a master looks like.");
  
  function returnQuote(quotes) {
    var html = [];
    var index = Math.floor((Math.random() * quotes.length));
    var pullQuote = quotes[index];
    secondQuoteList.push(quotes[index]);
    quoteList.splice(index, 1);
    html.push(JSON.stringify(pullQuote.quote));
    html.push(JSON.stringify(pullQuote.author).replace(/^"(.*)"$/, '$1'));
    html[0] = html[0].split("\\").join("");
    return html;
  }

  function urlReady(string) {
    string = string.split(" ").join("%20");
    string = string.split("\\").join("");
    string = string.split("<i>").join("");
    string = string.split("<\/i>").join("");
    string = string.split("<br>").join("%0A");
    string = string.split("#").join("%23");
    return string;
  }

});