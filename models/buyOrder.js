StockMarket.BuyOrder = DS.Model.extend({
    company: DS.belongsTo('company'), //each buy order belongs to a company
    price: DS.attr(),
    volume: DS.attr()
});