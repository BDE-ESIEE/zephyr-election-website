Template.register.events({
	"click .login": function (event) {
		if (!Meteor.userId())
			Meteor.loginWithGoogle({
				loginStyle: "popup"
			});
	},
	"click .logout": function (event) {
		Meteor.logout(function (error) {
			sweetAlert("Saperlipopette !", error.reason, "error");
		});
		return false;
	},
	"click .input.validate": function(ev) {
		var activity = Session.get("activity");
		var date = Session.get("date");
		var comment = $("input#comment").val();
		var residence,room;
		if(Session.get("activity") == "breakfast") {
			residence = $("input#residence").val();
			room = $("input#room").val();
			//alert(Meteor.userId())
		}
		//swal("coucou")
		Meteor.call("register", Meteor.userId(), activity, date, comment, residence, room, function (error, result) {
			if (!_.isUndefined(error)) {
				sweetAlert("Nom d'une pipe !", error.reason, "error");
			}
			if (!_.isUndefined(result) && result.valid) {
				sweetAlert("C'est tipar.", "Réservation effectuée", "success");
			}
		});
		
	}
});

Template.register.rendered = function () {
/* For debug only */	
	Meteor.subscribe("xx");
	window.scrollTo(0,0);
	switch(this.data.activity) {
			case 'show':
				Session.set("activity_text", TAPi18n.__("register_show"));
				Session.set("activity", "show");
				Session.set("full", false);
				break;
			case 'laser':
				Session.set("activity_text", TAPi18n.__("register_laser"));
				Session.set("activity", "laser");
				Session.set("full", true);
				break;
			case 'breakfast':
				Session.set("activity_text", TAPi18n.__("register_breakfast"));
				Session.set("activity", "breakfast");
				Session.set("full", false);
				break;			
			default:
				swal("Damned","Cet évènement n'existe pas (Bien tenté.)","error");
				Router.go('home');
				
	}
	//Session.set("activity_text", this.data.activity);
	//Session.setDefault("date", "Mardi 19h");
}

Template.register.helpers({
	activity: function () {
		return Session.get("activity_text");
	},
	date: function() {
		return Session.get('date');
	},
	isBreakfast: function() {
		return Session.get("activity") == "breakfast";
	},
	isFull: function() {
		return Session.get("full");
	}	
});