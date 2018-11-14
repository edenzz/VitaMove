function insertLatestNewsAccordingWithPage(fromNews, toNews) {
				
	for(var i = fromNews; i <= toNews; i++) 
	{
		// get div name
		var divName = '#latestNews-' + i;
		// add div
		$('.news.blue ul').prepend('<li id="latestNews-' + i + '"></li>');
		// file name
		var fileName = "news/news" + i + ".html";
		// load into div
			
		loadLatestNews(fileName, divName, i);
	}
}

function loadLatestNews(fileName, divName, i) 
{
	$(divName).load(fileName,function(responseTxt, statusTxt, xhr)
	{				 					
		// error callback
		if(statusTxt=="error")
		{
			$(divName).remove();	
		}
		
		var date = $(divName).find('.news-date').text();
		var title = $(divName).find('.news-title').text();
		
		$(divName).find('.news-area').remove();
		
		var titleLatestNews = date + ' - ' + title
		
		if(titleLatestNews[titleLatestNews.length - 1] == ':') 
		{
			titleLatestNews = titleLatestNews.substring(0, titleLatestNews.length - 1);
		}
		
		$(divName).html('<a href="novidades.html">' + titleLatestNews);			
	});  
}