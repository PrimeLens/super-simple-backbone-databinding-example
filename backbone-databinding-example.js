

// declare the models and collections
var CellModel = Backbone.Model.extend({
    defaults: {
        data : ''
    }
});

var SpreadsheetCollection = Backbone.Collection.extend({
    model: CellModel
});


// declare a view to load on the initial route
var HomeView = Backbone.View.extend({
	el: '#appPage',	
	initialize: function() {	
		this.listenTo( this.collection, 'change', this.render );
	},	
	render: function() {
		var self = this;
		this.$el.empty();
		this.collection.each(function(item) {
            self.$el.append(item.attributes.data + '<br>');
        });

	}	
});

			


// basic backbone router
var Router = Backbone.Router.extend({			
	initialize: function  () {	


	    var cell1 = new CellModel({ cellid: 'aa', data: 'lorem ipsum dolor' });
	    var cell2 = new CellModel({ cellid: 'bb', data: 'sit amet consectetur' });
	    var cell3 = new CellModel({ cellid: 'cc', data: 'adipiscing elit' });
	    this.spreadsheetCollection = new SpreadsheetCollection([ cell1, cell2, cell3]);

	    // create some artificial manipulation of the data
	    flipper( this.spreadsheetCollection );

    	this.homeView = new HomeView( { collection: this.spreadsheetCollection} );
			
	},
	routes: {
		'': 'handleHomeRoute'
	},		
	handleHomeRoute: function() {
		this.homeView.render();
    }
});	



// when the dom is ready, start backbone
$(document).ready(function() {	
	var app = new Router;
	Backbone.history.start();
});


function flipper( collection ){
	// the second cell in the spreadsheet will
	// flip betwen two values every 1.5 seconds
    var flip = 1;
    var t = setInterval(function(){
        if (flip) {
            flip = 0;
            collection.findWhere({ cellid: 'bb'}).set('data','Game Of Thrones');
        } else {
            flip = 1;
            collection.findWhere({ cellid: 'bb'}).set('data','The Walking Dead');
        }        
    }, 1500);
}
