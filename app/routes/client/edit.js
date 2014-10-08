App.ClientEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('client');
  },
  actions: {
    save: function(client) {
      client.save();
      this.transitionTo('client', client);
    },
    cancel: function(client) {
      client.rollback();
      this.transitionTo('client', client);
    },
  }
});

