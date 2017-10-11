var xhttp;

function ajax(url, args, callback) {

	xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if(xhttp.readyState == 4 && xhttp.status == 200)
		{
			callback.call(this, xhttp.responseText);
		}

	}

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(args);
}

function ajaxGet(url, callback) {

	xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {

		if(xhttp.readyState == 4 && xhttp.status == 200)
		{
			
			callback.call(this, xhttp.responseText);
		}

	}

	xhttp.open("GET", url, true);
	xhttp.send();
}

String.prototype.cutToChar = function(char)
{
	var ret = '';

	for(var i = 0; this.substr(i, 1) != char; i++)
	{
		ret += this.substr(i, 1);
	}

	return ret;
};


function updateSite(data, callback)
{
	var data_old = window.location.search.substr(1).split('&');

	var data_old_pre = '';

	for(var i = 0; i < data_old.length; i++)
	{
		var ds = data_old[i].split('=');
		if(i > 0)
		{
			data_old_pre += '&';
		}
		data_old_pre += ds[0]+'_old='+ds[1];
	}


	window.history.pushState({"pageTitle":document.title},"", window.location.href.split('?')[0] + '?' + data);

	ajaxGet('update.php?'+data_old_pre+'&'+data, function(response){
		var position = 0;

		while(position < response.length)
		{
			if(response.substr(position, 2) == 'ID')
			{
				var sp = response.substr(position+2).split('.');
				var id_name = sp[0];
				var data_sz = sp[1];
				var data_sz_n = Number(data_sz);

				//debugger;

				var data = response.substr(position+2+id_name.length+1+data_sz.length+1, data_sz_n);

				var element = document.getElementById(id_name);

				if(element)
				{
					element.innerHTML = data;
				}

				position += 2 + id_name.length + 1 + data_sz.length + 1 + data_sz_n;
			} else if(response.substr(position, 2) == 'JS')
			{
				var sp = response.substr(position+2).split('.');
				var data_sz = sp[0];

				var data = response.substr(position+2+data_sz.length+1, Number(data_sz));

				eval(data);

				position += 2 + data_sz.length + 1 + Number(data_sz);
			} else if(response.substr(position, 2) == 'IC')
			{
				var sp = response.substr(position+2).split('.');
				var id = sp[0];
				var classname = sp[1];

				document.getElementById(id).className = classname;

				position += 4 + id.length + classname.length;
			} else if(response.substr(position, 2) == 'CS')
			{
				var className = response.substr(position+2).cutToChar('.');
				var prop = response.substr(position+2+className.length+1).cutToChar(':');
				var val = response.substr(position+2+className.length+1+prop.length+1).cutToChar(';');

				var elements = document.getElementsByClassName(className);

				for(var i = 0; i < elements.length; i++)
				{
					elements[i].style[prop] = val;
				}

				position += 2+className.length+1+prop.length+1+val.length+1;
			} else if(response.substr(position, 2) == 'IS')
			{
				var id = response.substr(position+2).cutToChar('.');
				var prop = response.substr(position+2+id.length+1).cutToChar(':');
				var val = response.substr(position+2+id.length+1+prop.length+1).cutToChar(';');

				document.getElementById(id).style[prop] = val;

				position += 2+id.length+1+prop.length+1+val.length+1;
			} else
			{
				break;
			}
		}

		callback.call(this);

		
	});
}