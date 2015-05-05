
		function ShowHide(btnID, divID)
		{
		    var btnElem = document.getElementById(btnID);
		    var divElem = document.getElementById(divID);

		    if(divElem.style.display === 'none')
		    {
		        btnElem.value = "Hide";

		        divElem.style.display = 'block';
		    }
		    else
		    {
		        btnElem.value = "Show";

		        divElem.style.display = 'none';
		    }
		}
