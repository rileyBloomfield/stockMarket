StockMarket.StockStateSummaryRoute = Ember.Route.extend({
    model: function() {
     return  this.store.find('company') ;
     // "this.store" is the data store represented by the adapter
    },
    renderTemplate: function() {
        this.render();
    }
});