StockMarket.PlaceBidOrderController = Ember.Controller.extend({
    actions: {
        //On submission of a buy order for a company
        submit: function() {
            var numShares = this.get('volume');
            var purchasePrice = this.get('price');
            var numSold = 0;
            var sale = false;
            var buyOrders = this.get('model').get('buyOrders');
            var sellOrders = this.get('model').get('sellOrders');

            //Examine all existing sell orders to see if the buy order can be matched/reduced
            sellOrders.toArray().forEach( function(sellOrder, index) {
                //A transaction can be made
                if (parseInt(sellOrder.get('price')) <= parseInt(purchasePrice)) {
                    //number shares buying is equal to shares available in this order
                    if (parseInt(sellOrder.get('volume')) === parseInt(numShares)) {
                        sale = true;
                        numSold += parseInt(numShares);
                        numShares -= parseInt(sellOrder.get('volume'));
                        sellOrders.removeAt(index);
                    }
                    //number of shares to buy is less than number of shares in this sale
                    if (parseInt(sellOrder.get('volume')) > parseInt(numShares)) {
                        sellOrder.set('volume', ((parseInt(sellOrder.get('volume')) - numShares)));
                        sale = true;
                        numShares = 0;
                        numSold += parseInt(numShares);
                    }
                    if (parseInt(sellOrder.get('volume')) < parseInt(numShares)) {
                        sale = true;
                        numSold += parseInt(sellOrder.get('volume'));
                        numShares -= parseInt(sellOrder.get('volume'));
                        sellOrder.destroyRecord();
                        sellOrder.save();
                    }
                }
            });

            //If there is an excess of share volume to buy, make a new order
            if (parseInt(numShares)>0) {
                var newOrder = this.store.createRecord('buyOrder', {
                    price: purchasePrice,
                    volume: numShares
                });
                //save order and push to buy orders, triggering change in model
                newOrder.save();
                buyOrders.pushObject(newOrder);
            }
            //Change model stock index information if a sale takes place
            if (sale) {
                //TODO: Save a record to a transaction model to track all transactions
                //Set stock index properties by computing differences in last transaction
                this.get('model').set('currentPrice', purchasePrice);
                this.get('model').set('shareVolume', numSold + parseInt(this.get('model').get('shareVolume')));
                this.get('model').set('valueChange', ((parseFloat(this.get('model').get('currentPrice')- parseFloat(this.get('model').get('openPrice'))))).toFixed(2));
                this.get('model').set('changePercentage', ((parseFloat(this.get('model').get('valueChange'))/parseFloat(this.get('model').get('openPrice')))*100).toFixed(2));
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
            //transition back to stockStateSummary
            this.transitionToRoute('stockStateSummary');
        }
    }
});