//Parse part///
Parse.initialize("UCluWeoSSy7eC1x7Euor51j3xzOSrUmK1F6HHcg0", "IyoWGfCQqgbaPB5Jb82ovvZe1nCzOXFSEttHZATt");

/*-------- FACEBOOK INITIALIZATION AND FUNCTIONS---------*/
/*window.fbAsyncInit = function() {
	Parse.FacebookUtils.init({
	  appId      : '412442618941720',
	  status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
	  xfbml      : true,  // initialize Facebook social plugins on the page
	  version    : 'v2.3'
	});
	// run code after FB SDK is loaded
  };

    (function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
   
	var facebookLogin = function () {
	    if (!Parse.FacebookUtils.isLinked(user)) {
		Parse.FacebookUtils.link(user, null, {
			success: function(user) {
			  alert("Woohoo, user logged in with Facebook!");
			},
			error: function(user, error) {
			  alert("User cancelled the Facebook login or did not fully authorize.");
			}
			});
		}
	}*/ //FIX: SOLVE FB SCRIPT LOADING FROM LOAD FILE
/*-----------------------------------------------------------*/
/*-----------------------------------------------------------*/

/*-----filling out parse database with new stamps-----*/
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
/*---------------------------------------*/

/*----------parse query functions---------*/
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

//sign up//
//document set up for authentication
var LOGIN_MODE = "NONE"; //NONE = logged off; SIGNUP = signup; SIGNIN = signin; ACTIVE = logged in

var signInButton;
var signUpButton;
var submitAuthFormButton;

var onAuthModalOpen = function() {
	LOGIN_MODE = "SIGNIN";
	
	$('#login-email-linker').text(gmail.get.user_email());

	signInButton = $('.signin-button');
	signUpButton = $('.signup-button');
	submitAuthFormButton = $('.login-button');
	
	signInButton.on("click", onSignInButtonClick);
	/*signInButton.on("mouseover", function(){
		$(this).css('background','#222');
	});
	signInButton.on("mouseleave", function(){
		$(this).css('background','#333');
	});*/
	signUpButton.on("click", onSignUpButtonClick);
	signUpButton.on("hover", function(){
		$(this).css('background','#222');
	});
	/*signUpButton.on("mouseleave", function(){
		$(this).css('background','#333');
	});*/
	submitAuthFormButton.on("click", onSubmitAuthFormButtonClick);
	
	signInButton.css("color","#333");
	signInButton.css("background","#eee");
	var cP = $('#confirmPassword');
	cP.prop('disabled', true);
	cP.css('opacity','0.5');
}
var onSignInButtonClick = function() {
	LOGIN_MODE = "SIGNIN";
	
	signInButton.css("color","#333");
	signInButton.css("background","#eee");
	signUpButton.css("color","#eee");
	signUpButton.css("background","#333");
	var cP = $('#confirmPassword');
	cP.prop('disabled', true);
	cP.css('opacity','0.5');
}
var onSignUpButtonClick = function() {
	LOGIN_MODE = "SIGNUP";

	signUpButton.css("color","#333");
	signUpButton.css("background","#eee");
	signInButton.css("color","#eee");
	signInButton.css("background","#333");
	var cP = $('#confirmPassword');
	cP.prop('disabled', false);
	cP.css('opacity','1');
}

var username, password;
var onSubmitAuthFormButtonClick = function() {
	var form = $('.form-signin');
	form.submit(function(e){
		e.preventDefault();
	});
	username = $('#inputUsername').val();
	password = $('#inputPassword').val();
	if (LOGIN_MODE == "SIGNIN") {
		signIn();
	}
	else if (LOGIN_MODE = "SIGNUP") {
		var c_password = $('#confirmPassword').val();
		if (password == c_password) {
			signUp();
		}
		else {
			alert("passwords do not match");
		}
	}
}

var signUp = function() {
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.set("email", gmail.get.user_email());
	user.signUp(null, {
	  success: function(user) {
		logInSuccess("SUCCESSFULLY SIGNED UP");	
	  },
	  error: function(user, error) {
		// Show the error message somewhere and let the user try again.
		alert("Error: FAILED TO SIGN UP! " + error.code + " " + error.message);
	  }
	});
}
///////////////////////////
//log in/out//
var signIn = function() {
	Parse.User.logIn(username, password, {
	  success: function(user) {
		logInSuccess("SUCCESSFULLY LOGGED IN");
	  },
	  error: function(user, error) {
		alert("Error: FAILED TO SIGN IN! " + error.code + " " + error.message);
		// The login failed. Check error to see why.
	  }
	});
}
var logInSuccess = function(t) {
	LOGIN_MODE = "ACTIVE";
	// Hooray! Let them use the app now.
	alert(t);
	removeId('#gmailJsHelperModalWindow');
}

var logOut = function() {
	Parse.User.logOut();
}
//////////////////////////

//query current user//
var checkCurrentUser = function() {
	var currentUser = Parse.User.current();
	if (currentUser) {
		// do stuff with the user
		LOGIN_MODE = "ACTIVE";
	} else {
		// show the signup or login page
		LOGIN_MODE = "SIGNIN";
	}
}
///////////////////////////

//-------end Parse part----------//


//Backbone part///

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
				{ thumbnail: SERVER_ADDRESS+'4-thumbnail.png', large: SERVER_ADDRESS+'4-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'5-thumbnail.png', large: SERVER_ADDRESS+'5-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'6-thumbnail.png', large: SERVER_ADDRESS+'6-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'7-thumbnail.png', large: SERVER_ADDRESS+'7-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'8-thumbnail.png', large: SERVER_ADDRESS+'8-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'9-thumbnail.png', large: SERVER_ADDRESS+'9-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'10-thumbnail.png', large: SERVER_ADDRESS+'10-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'11-thumbnail.png', large: SERVER_ADDRESS+'11-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'12-thumbnail.png', large: SERVER_ADDRESS+'12-thumbnail.png' },
				{ thumbnail: SERVER_ADDRESS+'13-thumbnail.png', large: SERVER_ADDRESS+'13-thumbnail.png' }
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

