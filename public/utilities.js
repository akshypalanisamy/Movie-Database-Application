//populate the film categories dynamically
function PopulateSelect(){
	var xhttp = new XMLHttpRequest();
	var categories;
	var retVal = `<select name="categoryID" id="categoryID" class="form-control">`;
	console.log("populating select");
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
			categories = JSON.parse(this.responseText);
			console.log("populating select values");
			for (var index in categories){
				retVal += '<option value="'+categories[index].category_id+'">'+categories[index].name+'</option>';
			}
			retVal+="</select>";
			console.log(" done populating select values: "+retVal);
			document.getElementById("categorySelect").innerHTML = retVal;
		}
	};
	xhttp.open("GET", "http://leia.cs.spu.edu:3025/api/categories", true);
	xhttp.send();
}
