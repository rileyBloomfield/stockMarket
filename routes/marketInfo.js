StockMarket.MarketInfoRoute = Ember.Route.extend({
    //Set model to specific selected company
    model: function(params) {
        return this.store.find('company', params.company_id);
    },
    //Name the outlets that will allow multiple templates to be rendered in the handlebar
    renderTemplate: function() {
        this.render();
        this.render('marketByOrder', {
            into: 'marketInfo',
            outlet: 'order'
        });
        this.render('marketByPrice', {
            into: 'marketInfo',
            outlet: 'price'
        });
        this.render('symbol', {
            into: 'marketInfo',
            outlet: 'symbol'
        });
    }

});

