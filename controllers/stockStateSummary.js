StockMarket.StockStateSummaryController = Ember.Controller.extend({
    //Sort the list of companies by name on default
    sortedModel: [],
    sortProperties: ['name'],
    sortedCompanies: Ember.computed.sort('model', 'sortProperties'),

    //On selection, change sort to sort by gainers in change percentage
    gainers: Ember.computed.filter('sortedCompanies', function(company) {
        if (company.get('changePercentage') > 0) {
            return company;
        }
    }),

    //On selection, change sort to sort by losers in change percentage
    losers: Ember.computed.filter('sortedCompanies', function(company) {
        if (company.get('changePercentage') < 0) {
            return company;
        }
    }),

    //Set the display array to the sorted model upon initialization of the stock state summary
    init: function () {
        this.set('sortedModel', this.get('sortedCompanies'));
    },

    actions: {
        //Change sort properties and update display array
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortedModel', this.get('sortedCompanies'));
        },
        //change the sort display to show the gainers
        filterGains: function() {
            this.set('sortProperties', ['changePercentage:desc']);
            this.set('sortedModel', this.get('gainers'));
        },
        //change the sort display to show the losers
        filterLosses: function() {
            this.set('sortProperties', ['changePercentage']);
            this.set('sortedModel', this.get('losers'));
        }
    }
});
