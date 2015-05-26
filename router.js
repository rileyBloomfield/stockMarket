StockMarket.Router.map(function() {
    this.resource('stockStateSummary', {path: '/'}, function() {
        this.resource('marketInfo', {path: '/marketInfo/:company_id'});
        this.resource('placeBidOrder', {path: '/placeBid/:company_id'});
        this.resource('placeSaleOrder', {path: '/placeSale/:company_id'});
        this.resource('marketByOrder', {path: '/marketOrder/:company_id'});
        this.resource('marketByPrice', {path: '/marketPrice/:company_id'});
    });

});
