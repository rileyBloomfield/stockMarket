StockMarket.MarketInfoController =  Ember.Controller.extend({

    //Update the displayed buy orders after a model change
    sortPropertiesBuy: ['price:desc'],
    sortedBuyOrders: Ember.computed.sort('model.buyOrders', 'sortPropertiesBuy'),
    displayBuyOrders: function() {
        return this.get('sortedBuyOrders');
    }.property('model.buyOrders'),

    //Update the displayed sell orders after a model change
    sortPropertiesSell: ['price'],
    sortedSellOrders: Ember.computed.sort('model.sellOrders', 'sortPropertiesSell'),
    displaySellOrders: function() {
        return this.get('sortedSellOrders');
    }.property('model.sellOrders'),

    //Examine all buy orders and accumulate them to display in order by price
    compressedBuyOrders: function() {
        //Compress all existing buy orders on model update
        var buyOrders = this.get('model').get('buyOrders');
        var entries = [];
        var usedPrices = [];
        var totalVolume = 0;

        //Compress buy orders
        buyOrders.toArray().forEach( function(order, index) {
            var numOccurs = 0;
            if ($.inArray(parseInt(order.get('price')), usedPrices) === -1) {
                usedPrices.push(parseInt(order.get('price')));
                buyOrders.forEach(function (compressedOrder, index) {
                    if (compressedOrder.get('volume')!=0) {
                        if (parseInt(compressedOrder.get('price')) == parseInt(order.get('price'))) {
                            numOccurs++;
                            totalVolume += parseInt(compressedOrder.get('volume'));
                        }
                    }
                });
                var entry = {
                    number: numOccurs,
                    price: parseInt(order.get('price')),
                    volume: totalVolume
                }
                entries.push(entry);
                numOccurs = 0;
                totalVolume = 0;
            }
        });
        return entries;
        //re-evaluate on every buy orders update
    }.property('model.buyOrders'),

    //Examine all sell orders and accumulate them to display in order by price
    compressedSellOrders: function() {
        //Compress all existing sell orders on model update
        var sellOrders = this.get('model').get('sellOrders');
        var entries = [];
        var usedPrices = [];
        var totalVolume = 0;

        //Compress sell orders
        sellOrders.toArray().forEach( function(order, index) {
            var numOccurs = 0;
            if ($.inArray(parseInt(order.get('price')), usedPrices) === -1) {
                usedPrices.push(parseInt(order.get('price')));
                sellOrders.forEach(function (compressedOrder, index) {
                    if (compressedOrder.get('volume') != 0) {
                        if (parseInt(compressedOrder.get('price')) == parseInt(order.get('price'))) {
                            numOccurs++;
                            totalVolume += parseInt(compressedOrder.get('volume'));
                        }
                    }
                });
                var entry = {
                    number: numOccurs,
                    price: parseInt(order.get('price')),
                    volume: totalVolume
                }
                entries.push(entry);
                numOccurs = 0;
                totalVolume = 0;
            }
        });
        return entries;
        //re-evaluate on every sell orders update
    }.property('model.sellOrders')
});