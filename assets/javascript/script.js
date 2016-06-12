$(document).on('ready', function(){
var actorArray = ["arnold schwarzenegger", "angelina jolie","michael j fox","julia roberts", "tom cruise", "sandra bullock", "bruce willis", "hilary swank","leonardo dicaprio","jodie foster"];

var createButtons = function(){
  $('.actorButtons').empty();
  for(i=0;i<actorArray.length;i++){
    var $a = $('<button>') 
    $a.attr('data-name', actorArray[i]);
    $a.attr('class','btn btn-primary btn-actor')
    $a.text(actorArray[i]); 
    $('.actorButtons').append($a); 
  }
 };
 createButtons(); 

  $('#submit').on('click', function(){
    
    $a = $('<button>')
    var dataName= $('#actor').val();

    if (dataName === ""){
      return;
    }
    actorArray.push(dataName);
    createButtons();

    return false;


  })

  $(document).on('click', '.btn-actor', function(){
    $('#gifsAppearHere').empty();
    var p= $(this).data('name');
    console.log($(this).data('name'));
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + p +'&api_key=dc6zaTOxFJmzC&limit=10';
    $.ajax({ 
      url: queryURL, 
      method: 'GET'
      })
      .done(function(response){
        console.log(response);
        var results = response.data;
        for (i=0; i<results.length; i++){
          var gifDiv = $('<span class="items">')
          var rating = results[i].rating;
          var p = $('<p>').text('Rating: ' + rating);
          var personImage = $('<img>');
          personImage.attr('src', results[i].images.original_still.url);
          personImage.attr('width', 300);
          personImage.attr('data-still', results[i].images.original_still.url);
          personImage.attr('data-animate', results[i].images.fixed_height.url);
          personImage.attr('data-state', 'still');
          console.log(personImage);
          gifDiv.append(p)
          gifDiv.append(personImage)
          

          $('#gifsAppearHere').append(gifDiv);
        }
        $('img').on('click', 
          function(){
            var p = $(this).data('state');
            
            if(p=='still'){
              $(this).attr('src', $(this).data('animate'));
              $(this).data('state', 'animate');
            } else{
              $(this).attr('src', $(this).data('still'));
              $(this).data('state', 'still');
            }

          });
        
      });
  });
});
