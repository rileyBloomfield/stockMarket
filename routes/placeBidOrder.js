StockMarket.PlaceBidOrderRoute = Ember.Route.extend({
    //Set model to specific selected company
    model: function(params) {
        return this.store.find('company', params.company_id);
    },
    //Name the outlet for the template to be rendered into
    renderTemplate: function() {
        this.render();
        this.render('symbol', {
            into: 'placeBidOrder',
            outlet: 'symbol'
        });
    }
});