StockMarket.PlaceSaleOrderRoute = Ember.Route.extend({
    //Set the model to a specific company
    model: function(params) {
        return this.store.find('company', params.company_id);
    },
    //Name the outlet for the template to be rendered into
    renderTemplate: function() {
        this.render();
        this.render('symbol', {
            into: 'placeSaleOrder',
            outlet: 'symbol'
        });
    }});