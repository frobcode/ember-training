App.ClientsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user');
  }
});
