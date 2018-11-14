function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}  


function insertNewsAccordingWithPage(fromNews, toNews) {
		
	
		
	for(var i = fromNews; i <= toNews; i++) 
	{
		// get div name
		var divName = '#news-' + i;
		// add div
		$('#all-news').prepend('<div class="news-item" id="news-' + i + '"></div>');
		// file name
		var fileName = "news/news" + i + ".html";
		// load into div
		$(divName).load(fileName,function(responseTxt, statusTxt, xhr){				 
											
							// error callback
							if(statusTxt=="error")
							{
								$(divName).remove();	
							}
							  
						});  
	}
}

function getPageNumber(lastPage) 
{
	// get page Number;
	var pageNumber = getUrlParameter("page");
	
	// if there is no page number, set to 1
	if (typeof pageNumber === "undefined") {
		pageNumber = lastPage;
	}
	
	pageNumber = parseInt(pageNumber);
	
	return pageNumber;
}


function insertPagination(pageNumber, lastPage, numberOfPages) {

	var correctPageNumber = parseInt(pageNumber);
	var beforePage = correctPageNumber - 1;
	var afterPage = correctPageNumber + 1;

	// initialize variable
	var divPageText;

	// get number of news
	var numberOfNews = $('.news-item').length
	
	// pagination div
	var paginationDiv = $('#news-pages');
	
	// add first page always;
	divPageText = '<a href="novidades.html?page=' + (lastPage) + '">' + '<<' + '</a>';
	divPageText += '..';
	$(paginationDiv).append(divPageText);
		
	// find if div exists
	if( correctPageNumber > 1) 
	{
		divPageText = '<a href="novidades.html?page=' + (lastPage + 1 - beforePage) + '">' + (beforePage) + '</a>';
		divPageText += '...';
		$(paginationDiv).append(divPageText);
	}
	
	// add current page always;
	divPageText = '<a href="novidades.html?page=' + (lastPage + 1 - correctPageNumber) + '">' + (correctPageNumber) + '</a>';
	$(paginationDiv).append(divPageText);
	
	// find if div exists
	if( correctPageNumber < lastPage) 
	{	
		divPageText = '...';
		divPageText += '<a href="novidades.html?page=' + (lastPage + 1 - afterPage) + '">' + (afterPage) + '</a>';
		$(paginationDiv).append(divPageText);
	}
	
	// add last page always
	divPageText = '..';
	divPageText += '<a href="novidades.html?page=' + (1) + '">' + '>>' + '</a>';
	$(paginationDiv).append(divPageText);
}


$(function(){
	
	// 5 news per page (may need to be adjusted)
	var pageSize = PAGE_SIZE;
	
	// number of news (may need to be adjusted)
	var numberOfNews = NUMBER_OF_NEWS;

	// get last page number
	var lastPage = Math.floor(numberOfNews / pageSize);
	
	var pageNumber = getPageNumber(lastPage);
	pageNumber--;
	
	// from news
	var fromNews = numberOfNews - (pageSize * (lastPage - pageNumber));
	
	// to news
	var toNews = fromNews + pageSize;
	
	// insert news
	insertNewsAccordingWithPage(fromNews, toNews);
	
	// actualize page number for pagination
	pageNumber = lastPage - pageNumber;
	
	// insert pagination
	insertPagination(pageNumber, lastPage);
	
	/*
	 *  Simple image gallery. Uses default settings
	 */
	$('.fancybox').fancybox();

	
});
