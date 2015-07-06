//Parse part///
Parse.initialize("UCluWeoSSy7eC1x7Euor51j3xzOSrUmK1F6HHcg0", "IyoWGfCQqgbaPB5Jb82ovvZe1nCzOXFSEttHZATt");

var ParseStamp = Parse.Object.extend("Stamp");
//stamps array
var stamps_names = ["orange", "kiwi", "watermelon", "dragonfruit", "strawberry", "pineapple", "pomegranate"];
var stamps_count = 7;

//pupulating the parse database with collections
var ParseCollection = Parse.Object.extend("Collection");
var parseCollection = new ParseCollection();
/*parseCollection.save({
collectionid: 0,
name: "fruit-cuts",
count: 7
},
{
success: function(object) {
	$(".success").show();
  },
  error: function(model, error) {
	$(".error").show();
  }
});*/
/////////////////////////////////

//populating the parse database with stamps
/*for (var i = 0; i < stamps_count; i++) {
	var parseStamp = new ParseStamp();
	parseStamp.save({
		stampid: i,
		name: stamps_names[i],
		collection: "fruit-cuts",
		price: 0
	}, 
	{
	  success: function(object) {
		$(".success").show();
	  },
	  error: function(model, error) {
		$(".error").show();
	  }
	});
}*/
//-------end Parse part----------//


//Backbone part///

//query for all stamps
var stamps_from_query = [];
var stamps_query = new Parse.Query(ParseStamp);
//stamps_query.include("bla");
stamps_query.find({
  success: function(results) {
	transferQueryOut(results);
  },
  error: function(error) {
  }
});
///////////////////////////

//get query results and process
var transferQueryOut = function(results) {
	stamps_from_query = results;
	//console.log(JSON.stringify(stamps_from_query));
	for (var i = 0; i < stamps_from_query.length; i++) {
		var stamp = new Stamp({
			id: stamps_from_query[i].get("stampid"),
			collection: stamps_from_query[i].get("collection"),
			name: stamps_from_query[i].get("name"),
			price: stamps_from_query[i].get("price")
		});
		console.log(JSON.stringify(stamp));
	}
}

//backbone stamp class
var Stamp = Backbone.Model.extend({
	changePrice: function(newPrice) {
		this.set({
			price: newPrice
		});
	}
});

/*console.log(JSON.stringify(stamp1));
console.log(JSON.stringify(stamp2));
//stamp1.changePrice(1);
console.log(JSON.stringify(stamp1));*/

//location.reload(); //reload the page

//--------Gallery START----------------------//
$.fn.backbone = function() {
    var Photo = Backbone.Model.extend({});
    
    var IterableCollecton = Backbone.Collection.extend({
        initialize: function() {
            this.index = 0;
        },
        
        goTo: function(index) {
            if(index == this.index) return;
            if(index < 0) return;
            if(index >= this.length) return;
            
            this.index = index;
            this.trigger('goto');
        },
        
        current: function() {
            return this.at(this.index);
        }
        
        /*previous: function() {
            this.goTo(this.index - 1);
        },
        
        next: function() {
            this.goTo(this.index + 1);
        },
        
        isFirst: function() {
            return this.index == 0;
        },
        
        isLast: function() {
            return this.index == this.length - 1;
        }*/
    });
    
    var Photos = IterableCollecton.extend({
        model: Photo
    });
    
    var LargeView = Backbone.View.extend({
        el: '#large',
        
        initialize: function() {
            this.listenTo(this.collection, 'goto', this.change);
        },
        
        render: function() {
            var photo = this.collection.current();
            
            var img = $('<img>')
                .prop('src', photo.get('large'));
            
            this.$el.append(img);
			setStamp(photo.get('large')); //set stamp as selected in myExtension.js
            
            return this;
        },
        
        change: function() {
            this.$el.empty();
            this.render();
        }
    });
    
    var ThumbnailsView = Backbone.View.extend({
        el: '#thumbnails',
        
        events: {
            'click img': 'click'
        },
        
        initialize: function() {
            this.listenTo(this.collection, 'goto', this.change);
        },
        
        render: function() {
            var imgs = [];
            $.each(this.collection.models, function(index, photo) {
                var thumbnail = $('<img>')
                       .prop('src', photo.get('thumbnail'))
                       .data('index', index);
                imgs.push(thumbnail);
            });
            this.$el.append(imgs);
            
            this.change();
            
            return this;
        },
        
        click: function(event) {
            this.collection.goTo($(event.currentTarget).data('index'));
        },
        
        change: function() {
            var active_index = this.collection.index;
            
            this.$el.children().each(function(index) {
                var thumbnail = $(this);
                thumbnail.toggleClass(
                    'active-stamp', 
                    thumbnail.data('index') == active_index
                );
            });
        }
    });
    
    /*var IteratorButtonView = Backbone.View.extend({
        events: {
            'click': 'click'
        },
        
        initialize: function() {
            this.listenTo(this.collection, 'goto', this.render);
        },
        
        render: function() {
            this.$el.prop('disabled', this.isDisabled());
            return this;
        },
        
        isDisabled: function() {
            return false;
        }
    });
    
    var PreviousView = IteratorButtonView.extend({
        el: '#previous',
        
        isDisabled: function() {
            return this.collection.isFirst();
        },
        
        click: function() {
            this.collection.previous();
        }
    });

    var NextView = IteratorButtonView.extend({
        el: '#next',
        
        isDisabled: function() {
            return this.collection.isLast();
        },
        
        click: function() {
            this.collection.next();
        }
    });*/
    
    var AppView = Backbone.View.extend({
        el: '#gallery',
        
        initialize: function() {
            this.photos = new Photos();
            this.photos.add([
                { thumbnail: SERVER_ADDRESS+'0-thumbnail.png', large: SERVER_ADDRESS+'0-thumbnail.png' },
                { thumbnail: SERVER_ADDRESS+'1-thumbnail.png', large: SERVER_ADDRESS+'1-thumbnail.png' },
                { thumbnail: SERVER_ADDRESS+'2-thumbnail.png', large: SERVER_ADDRESS+'2-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'3-thumbnail.png', large: SERVER_ADDRESS+'3-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'0-thumbnail.png', large: SERVER_ADDRESS+'0-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'1-thumbnail.png', large: SERVER_ADDRESS+'1-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'2-thumbnail.png', large: SERVER_ADDRESS+'2-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'3-thumbnail.png', large: SERVER_ADDRESS+'3-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'0-thumbnail.png', large: SERVER_ADDRESS+'0-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'1-thumbnail.png', large: SERVER_ADDRESS+'1-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'2-thumbnail.png', large: SERVER_ADDRESS+'2-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'3-thumbnail.png', large: SERVER_ADDRESS+'3-thumbnail.png' }
            ]);
            
            this.large = new LargeView({
                collection: this.photos
            });
            
            this.thumbnails = new ThumbnailsView({
                collection: this.photos
            });
            
            /*this.previous = new PreviousView({
                collection: this.photos
            });
            
            this.next = new NextView({
                collection: this.photos
            });*/
        },
  
        render: function() {
            this.thumbnails.render();
            this.large.render();
            //this.previous.render();
            //this.next.render();
        }
    });

    new AppView().render();
}; 
//--------Gallery END--------------------//

