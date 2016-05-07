var products = [];
var types = [];
var categories = [];

$(document).ready(function() {

    var firstXHR = function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "categories.json"
            }).done(function(data) {
                resolve(data.categories);
            }).fail(function(xhr, status, error) {
                reject(error);
            });
        })
    };

    var secondXHR = function(result_of_firstXHR) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "types.json",
                data: result_of_firstXHR
            }).done(function(data) {
                resolve(data.types);
            }).fail(function(xhr, status, error) {
                reject(error);
            });
        })
    };

    var thirdXHR = function(result_of_secondXHR) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "products.json",
                data: result_of_secondXHR
            }).done(function(data) {
                resolve(data.products);
            }).fail(function(xhr, status, error) {
                reject(error);
            });
        })
    };


    firstXHR()
        .then(function(data1) {
            categories = data1;
            console.log("cat", data1);
            populateDropdown(categories);
            return secondXHR(data1);
        })
        .then(function(data2) {
            types = data2;
            return thirdXHR(data2);
        })
        .then(function(data3) {
            products = data3;
            displayChoices(0);
        })




    var s = $('#dropDown1');
    console.log("products", products);


    function populateDropdown(data3) {
        console.log("d3", data3);
        data3.forEach(function(catagory) {
            $('<option />', {
                value: catagory.id,
                text: catagory.name
            }).appendTo(s);

        })

    };

        $("select").on("change", function(e) {
        	console.log("hello", this.value);
  			var userChoice = this.value;
  			displayChoices(userChoice);

        })

    function displayChoices(choice) {
    		$("#cardsForEach").empty();
            products.forEach(function(product) {
            	let currentTypeId = product.typeId;
            	let currentCategoryId = types[currentTypeId].categoryId;
            	if(currentCategoryId == choice){
	            	var myProduct = `<div id='productCard'><h3>"${product.name}"</h3><div class=description>"${product.description}"</div><div>${types[product.typeId].name}</div> </div>`;
	                $("#cardsForEach").append(myProduct);	
            	}

            })

    };

});

