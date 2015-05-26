StockMarket.PlaceSaleOrderController = Ember.Controller.extend({
    actions: {
        //On submission of a sell order for a company
        submit: function() {
            var numShares = this.get('volume');
            var purchasePrice = this.get('price');
            var numSold = 0;
            var sale = false;
            var buyOrders = this.get('model').get('buyOrders');
            var sellOrders = this.get('model').get('sellOrders');

            //Check all existing buy orders to see if the sell order can be matched/reduced
            buyOrders.toArray().forEach( function(buyOrder, index) {
                //A transaction can be made
                if (parseInt(buyOrder.get('price')) >= parseInt(purchasePrice)) {
                    //number shares buying is equal to shares available in this order
                    if (parseInt(buyOrder.get('volume')) === parseInt(numShares)) {
                        sale = true;
                        numSold += parseInt(numShares);
                        numShares -= parseInt(buyOrder.get('volume'));
                        buyOrders.removeAt(index);
                    }
                    //number of shares to buy is less than number of shares in this sale
                    if (parseInt(buyOrder.get('volume')) > parseInt(numShares)) {
                        buyOrder.set('volume', ((parseInt(buyOrder.get('volume')) - numShares)));
                        sale = true;
                        numShares = 0;
                        numSold += parseInt(numShares);
                    }
                    if (parseInt(buyOrder.get('volume')) < parseInt(numShares)) {
                        sale = true;
                        numSold += parseInt(buyOrder.get('volume'));
                        numShares -= parseInt(buyOrder.get('volume'));
                        buyOrder.destroyRecord();
                        buyOrder.save();
                    }
                }
            });

            //If there is an excess of share volume to sell, make a new order
            if (parseInt(numShares)>0) {
                var newOrder = this.store.createRecord('sellOrder', {
                    price: purchasePrice,
                    volume: numShares
                });
                //save sell order and push triggering change in model
                newOrder.save();
                sellOrders.pushObject(newOrder);
            }
            //Change model stock index information if a sale takes place
            if (sale) {
                //TODO: Save a record to a transaction model to track all transactions
                //Set stock index properties
                this.get('model').set('currentPrice', purchasePrice);
                this.get('model').set('shareVolume', numSold + parseInt(this.get('model').get('shareVolume')));
                this.get('model').set('valueChange', ((parseFloat(this.get('model').get('currentPrice') - parseFloat(this.get('model').get('openPrice'))))).toFixed(2));
                this.get('model').set('changePercentage', ((parseFloat(this.get('model').get('valueChange')) / parseFloat(this.get('model').get('openPrice'))) * 100).toFixed(2));
                if (parseFloat(this.get('model').get('changePercentage')) > 0) {
                    this.get('model').set('change', 'images/up.png');
                }
                else if (parseFloat(this.get('model').get('changePercentage')) < 0) {
                    this.get('model').set('change', 'images/down.png');
                }
                else {
                    this.get('model').set('change', 'images/noChange.png');
                }
            }
            this.transitionToRoute('stockStateSummary');
        }
    }
});