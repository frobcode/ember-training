App.ClientRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.client_id);
  }
});
