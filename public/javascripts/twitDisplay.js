// activate jquery
$(function () {

    // when the user submits a tweet
    $("#zaform").on("submit", function(){

        console.log("SUBMITTING!");
        console.log($("#newTweet").attr('name'));

        var personName = "<div>" + $("#newTweet").attr('name') + "</div>";
        var newTweet = "<div>" + $("#newTweet").val() + "</div> <br>";
//        $("#allTweets").prepend(personName + newTweet);

        // !! ENSURE there are 1-140 characters!

        $.post("/tweets/"+$("#newTweet").attr('name'), {tweetContents:$("#newTweet").val()});

        setInterval(function() {
            $.post('/');
        }, 5000);



                // let's try this. "include partial" at the top of the list, where the newest tweets would be
        // make a div for it, and when JQuery does a POST request on the submit form, it'll call that
        // particular jade partial, which RENDERS that little twit partial at the place where it's
        // included, WITHOUT doing a redirect. How does that sound?!
                // This implies that the only point at which there was a page refresh was when
                // a "redirect" was called on the server side.
            // This implication appears consistent with empirical evidence.
            // (Looks like what we're seeing in the code.)

        return false;
    });
});
