App.ClientsController = Ember.ArrayController.extend({
  clientsCount: function() {
    return this.get('model.length');
  }.property('model.length'),

  query: '',

  filterModel: function() {
    var query = this.get('query');
    var filteredModels = this.get('model').filter(function(item) {
      if (query==="" || item.get('name').toLowerCase().indexOf(query) === 0) {
        return true;
      }
      return false;
    });
    console.log(filteredModels);
    this.set('filteredModel', filteredModels);
  }.observes("query", 'model.@each.name').on('init'),

});

