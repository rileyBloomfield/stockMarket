
StockMarket.Company = DS.Model.extend({
    name: DS.attr(),
    openPrice: DS.attr(),
    currentPrice: DS.attr(),
    valueChange: DS.attr(),
    changePercentage: DS.attr(),
    change: DS.attr(),
    shareVolume: DS.attr(),
    symbol: DS.attr(),
    //Lists or buy and sell orders for each company
    buyOrders: DS.hasMany('buyOrder', {async: true}),
    sellOrders: DS.hasMany('sellOrder', {async: true})
});
