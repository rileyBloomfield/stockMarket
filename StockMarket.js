//Create Application
StockMarket = Ember.Application.create();
//Create Company Data Fixture
StockMarket.CompanyAdapter = DS.FixtureAdapter;
//Local storage adapters
StockMarket.CompanySerializer = DS.LSSerializer.extend();

//Order adapters
StockMarket.BuyOrderAdapter = DS.LSAdapter.extend({
    namespace: 'StockMarket'
});
StockMarket.SellOrderAdapter = DS.LSAdapter.extend({
    namespace: 'StockMarket'
});





