//add the images present in the images folder to image list
			$(document).ready(function () {
				  var jsonURL = "/images";
				  $.getJSON(jsonURL, function (json)
				  {
					var imgList= "";
					$.each(json, function () {
					//add onclick event to add the respective image to canvas on click
					//this is the url of a single image or an itam of a JSON object
					imgList += '<li><img src= "' + this+ '" onclick= showImage("'+this+'") class="icons"></li>';
					});
					// adding the images to image list
				   $('#imagelist').append(imgList);
				  });
				});

//this is to disable right click menu in the canvas

	$('.block').bind('contextmenu', function(e) {
				return false;
			});
		// this function add image in the canvas
		function showImage(url)
			{
				//create an img element to add the image in canvas
				var elem = document.createElement("img");
				elem.setAttribute("src", url);
				elem.setAttribute("height", "200");
				elem.setAttribute("width", "200");
				elem.setAttribute("class", "imagex");
				elem.setAttribute("id", "imagey");
				elem.setAttribute("alt", url);
				document.getElementById("imageCanvas").appendChild(elem);
				
				// to make image draggable in the canvas
				$(elem).draggable({ containment: '#imageCanvas' });
				//right click event is handled to remove image
				$(elem).mousedown(function(event) {
					if(event.which == 3) {
						$(elem).remove();
					}
				});
			}
			
			// this function add text in the canvas
			function showText()
			{
				//create an span element to add the text in canvas
				var elem = document.createElement("span");
				elem.setAttribute("class", "textx");
				elem.setAttribute("id", "texty");
				elem.textContent=document.getElementById('Text').value;
				document.getElementById("imageCanvas").appendChild(elem);
				
				// to make text draggable in the canvas
				$(elem).draggable({ containment: '#imageCanvas' });
				//right click event is handled to remove text
				$(elem).mousedown(function(event) {
					if(event.which == 3) {
						$(elem).remove();
					}
				});
			} 

// the below code handles the state of the page after refresh and close

// to persist the state of page after refresh and there respective functioning

	$(window).bind("beforeunload",function(){
		localStorage.setItem('state', $('#imageCanvas').html());
		$('#test').append($('#imageCanvas').html());
	});

	$( document ).ready(function() {    
			if(localStorage.getItem('state') !=null){
		  $("#imageCanvas").append(localStorage.getItem('state'));


		// to make image draggable in the canvas after reload of the page
				$("[id=imagey]").draggable({ containment: '#imageCanvas' });
		//right click event is handled to remove text after reload of the page

				$("[id=imagey]").mousedown										(function(event) {
					if(event.which == 3) {
						$(this).remove();
					}
				});
			}

		// to make text draggable in the canvas after reload of the page

				$("[id=texty]").draggable({ containment: '#imageCanvas' });
		//right click event is handled to remove text after reload of the page

				$("[id=texty]").mousedown(function(event) {
					if(event.which == 3) {
						$(this	).remove();
					}
				});

	});


// to store the canvas div an image
$(function() { 
    $("#SaveImage").click(function() { 
        html2canvas($("#imageCanvas"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                canvas.toBlob(function(blob) {
                    saveAs(blob, "yourcanvas.png"); 
                });
            }
        });
    });
});
