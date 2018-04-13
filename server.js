// this is like using in C# SF
var express = require("express");

// can use app to access SF
var app = express();

//sets the path for static files like images, css and scripts. Without including them here they won't get displayed SF
app.use(express.static(__dirname + '/style'));

app.set("port", 8080);

//Make a list of food and wine pairings
/*https://www.matchingfoodandwine.com --- for the salmon one SF SF*/
const pairings = {
  fish: {
    dish_description: "Because salmon is a meaty fish if you grill or char it you can pair it with a red. <b>Pinot Noir</b> is my favourite match but a <b>Gamay</b> would rub along happily too. If you prefer a white try a dry <b>Pinot Gris</b>. A fruity <b>Pinot Noir</b> is also a good wine match with Japanese style dishes such as salmon teriyaki or yakitori.",
    wines: {
      "Pinot Noir": "Often Noted for its natural ability to be lighter than other red wines, and have low tannin.",
      "Gamay": "Has expressions of bright crushed strawberries and raspberries, as well as deep floral notes of lilac and violets.",
      "Pinot Gris": "Flavours can range from ripe tropical fruit notes of melon, and mango to some botrytis-influenced flavours."
    }
  },
  beef: {
    dish_description: "Choose a red wine that is rich and high in tannins to complement it. Try a <b>Shiraz</b> from California or Australia with your favorite steak. Lean cuts of beef, such as filet mignon, taste better with a less tannic red wine. Go with a <b>Bordeaux</b>, or a <b>Cabernet Sauvignon</b>.",
    wines: {
      "Shiraz": "Has dark fruit flavours from sweet blueberry to savory black olive.",
      "Bordeaux": "Flavours of licorice, chocolate, black cherry, plum, spice, vanilla, smoke, floral, blueberry and jam flavours. What a resume!!",
      "Cabernet Sauvignon": "A full bodied red wine with dark fruit flavours, and savory tastes from black pepper to bell pepper."
    }
  },
  pork: {
    dish_description: "Pork is a particularly versatile dish, one that will go with a variety of wines, both white and red, depending on the sauce or preparation used, or depending on the diner's mood. If the preparation involves a butter or cream sauce, I would go for a richer <b>Chardonnay</b> or a spicy <b>Gewürztraminer</b>. If having some sweet and sour pork, you want an off-dry <b>Riesling.</b>",
    wines: {
      "Gewurztraminer": "Aromas of roses, passion fruit, and florale notes.",
      "Chardonnay": "Rich, full bodied with flavours of vanilla, butter and even caramel from the oak.",
      "Riesling": "A white grape variety originating in the Rhine region of Germany."
    }
  },
/*https://www.intowine.com/best-wine-pair-pork-chops SF SF */
  lamb: {
    dish_description: "Lamb is a constant on menus in almost every wine region. <b>Pinot Noir</b> with roast leg of lamb is classic. Or baby lamb from the salt marshes with <b>Châteauneuf-du-Pape</b>. Grilled lamb chops with <b>Sangiovese</b> is another favorite.",
    wines: {
      "Pinot Noir": "Often Noted for its natural ability to be lighter than other red wines, and have low tannin.",
      "Châteauneuf-du-Pape": "Often described as earthy with gamy flavours that have hitns of tar and leather.",
      "Sangiovese": "A very earthy and rustic wine, with a fruit-forward taste."
    }
  }
}

// app.use(express.static('www'));
// GET URL route for the home page, request what is being sent to the sever, and response is what you get back from the server SF
// get = pull post = push more or less. SF
// from udemy explanation of GET&POST for myself SF SF SF: 
//Use POST for destructive actions such as creation (I'm aware of the irony), editing, and deletion, because you can't 
//hit a POST action in the address bar of your browser. Use GET when it's safe to allow a person to call an action. 
//https://stackoverflow.com/questions/46585/when-do-you-use-post-and-when-do-you-use-get SF
app.get('/',function(request, response){ 
  const fileName = __dirname + '/views/index.html'
  response.sendFile(fileName);
});

// route for getting pairings for a specific food type takes the link I put in the image, and turns it into a variable of food_type (gives it a value) SF
app.get('/pairings/:food_type', function (request, response){
  // get food_type out of the request parameters SF
  const foodType = request.params['food_type'];
  //console.log(request);
  // uses the stuff I set up top to populate these values depending what is clicked. (beef, pork, etc) SF
  const wines = pairings[foodType]['wines']
  const dishDescription = pairings[foodType]['dish_description']

    // this is an alternative to simply creating 4 different HTML pages for pork, lamb, etc, and saves time, and also the size of the file will be smaller. SF
    // object.keys(wines)[0] is setting the NAMES of the wines, then the description, repeats 3 times to set up a mini table of the suggested pairings SF
  const generateHtml = '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Wine Pairing App</title>' +
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"' +
        'integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">' +
    '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/sketchy/bootstrap.min.css">' +
    '<link rel="stylesheet" type="text/css" href="/style.css"></head>' +
    '<body>' +
      '<nav class="navbar navbar-expand-lg navbar-dark bg-primary"><a class="navbar-brand" href="/"><h1>Wine Pairing for Plebs</h1></a></nav>' +
      '<header class="jumbotron"><h3 class="text-center">Wines that go well with ' + foodType + '</h2>' +
      '<h4> ' + dishDescription + '</h4></header>' +
      '<div class="container"><table class="table"><thead><tr class="table-info"><th> Type</th> <th> Description</th></tr></thead>' +
      '<tbody><tr><td>' + Object.keys(wines)[0] + '</td> <td>'+ Object.values(wines)[0] +'</td></tr>' +
      '<tr><td>' + Object.keys(wines)[1] + '</td> <td>'+ Object.values(wines)[1] +'</td></tr>' +
      '<tr><td>' + Object.keys(wines)[2] + '</td> <td>'+ Object.values(wines)[2] +'</td></tr>' +
      '</tbody></table></div></body></html>'
  
  response.send(generateHtml);
});

var server = app.listen(app.get("port"), function(){
    console.log("This stuff is now running on LocalHost: " + app.get("port"));
});
