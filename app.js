var model = {
    link: "http://pokeapi.co/api/v1/pokemon/",
    imgSrc: "http://pokeapi.co/media/img/",
    loadedAmount: 10,
    currentImg:"",
    pokemonName: "no name",
    pokemonType: "",
    pokemonAttak: "",
    pokemonDefense: "",
    pokemonHp: "",
    pokemonSpAtk: "",
    pokemonSpDef: "",
    pokemonSpeed: "",
    pokemonWeight: "",
    pokemonMoves: "",
    pokemonNationalId: "",
    
    
    loadNextPokemon: function(jsonPage){
        return $.getJSON(model.link + jsonPage + "/", function(item) {
            model.pokemonName = item.name;
            model.pokemonType = item.types[0].name;
            model.pokemonAttak = item.attack;
            model.pokemonDefense  = item.defense;
            model.pokemonHp = item.hp;  
            model.pokemonSpAtk = item.sp_atk; 
            model.pokemonSpDef = item.sp_def;
            model.pokemonSpeed = item.speed;
            model.pokemonWeight = item.weight;
            model.pokemonMoves = item.moves.length;
            model.pokemonNationalId = item.national_id;           
        });
    }
};
  
var view = {
    showPokemon: function(counter){
        $(".col-sm-12").append("<div class='well well-lg text-center' id='"+model.pokemonNationalId+"'><h2>"+
               model.pokemonName+"</h2><p data-toggle='collapse' data-target='list"+counter+
               "'>Show more <span class='glyphicon glyphicon-chevron-down'></span></p>"+
               "<button class='btn "+model.pokemonType+"'>"+
               model.pokemonType+"</button><div id='list"+counter+"' class='collapse'><p>Attack: "+model.pokemonAttak+
               "<p><p>Defense: "+model.pokemonDefense+"</p><p>Weight: "+model.pokemonWeight+
               "</p><p>National id: "+model.pokemonNationalId+"</p></div></div>");
    },
    addImage: function(src, id){
        $("#"+id).append("<img src='"+src+"' alt='pokemon'>");       
    }
};





var controller = {
    showPokemon: function(){
        model.loadNextPokemon(counter).then(function() {
            view.showPokemon(counter);
            controller.addImages();
        });
    },
    showPokemonSet: function(){
        for(var i = model.loadedAmount-10; i < model.loadedAmount; i++){
            model.loadNextPokemon(i).then(function() {
            view.showPokemon(i);
			
        });
        }
		model.loadNextPokemon(i+1).then(function(){
			$("img").remove();
			controller.addImages();
		});
        model.loadedAmount += 10;
    },
    
    listenEvents: function(){
        $("#loadMore").on("click", function(){
            controller.showPokemonSet();
        });
    },
    
    addImages: function(){
        for(var i = 1; i < model.loadedAmount; i++){
            var img = model.imgSrc+i+".png";
            view.addImage(img, i);
        }
    }
};
       		
          
          
          
controller.showPokemonSet();
controller.listenEvents();
