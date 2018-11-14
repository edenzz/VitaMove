// GLOBAL VARIABLES
var token = "CAACEdEose0cBAKOEQD975FIJCrNTt7UYwWssQBXSyQRZAWrNO0lIfCnnXmxfiCNfmnD7Ik6vZC5EBZBZAvcH6lyQ2mIdEts3AI5biClZB68VmdTyJgGZBHmFUXI2gci19UBBndyXsEUdAlxtNM5PCcoIECT4ZA3YZCVEBKOO2DQBiqU9AtAiIZAwK7ZCETgfNqU0zQRfxNYI1GhruZAxJZCtOJy6Sdjcl0Jr52wZD";
var i = 0;

$(document).ready(function()
{

	$('#loadPosts').bind('click', function() 
	{	
		// gabinete vita move id = 355970031218326
        FB.api('/355970031218326/feed?fields=attachments&limit=5', getPosts, {access_token: token});   
		
		// var url = "https://graph.facebook.com/v2.4/gabinetevitamove/feed?fields=attachments&limit=5";
        
		// $.getJSON( url, function( data ) {
            // console.log(data);
        // });
			
	});
})

var getPosts = function (response)
{
	for (element in response.data)
	{
		post = response.data[element]
		console.log(post.id + ": " +post.message);          
	}
	
	// can i call FB.api(nextPage, getPosts); ??
	if(i < 2)
	{
		nextPage = response.paging.next;        
		if(i==1) 
		{
			nextPage = response.paging.previous;
		}
		
		console.log(nextPage);
		i++;
		
		$.get(nextPage, getPosts, "json"); //optional: $.getJSON can be use instead
	}
}


function logInWithFacebook() {
   FB.login(function(response) 
   {
     if (response.authResponse) 
	 {
	   alert('You are logged in &amp; cookie set!');
	   // Now you can redirect the user or do an AJAX request to
	   // a PHP script that grabs the signed request from the cookie.
	   token = response.authResponse;
	   
     } else 
	 {
       alert('User cancelled login or did not fully authorize.');
     }
   });
   return false;
};