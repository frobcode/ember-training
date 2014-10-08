App.ClientIndexRoute = Ember.Route.extend({
  model: function() {
      return this.modelFor('client');
  }
});

