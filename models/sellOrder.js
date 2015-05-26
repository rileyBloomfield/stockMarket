StockMarket.SellOrder = DS.Model.extend({
    company: DS.belongsTo('company'), //each sell order belongs to a company
    price: DS.attr(),
    volume: DS.attr()
});