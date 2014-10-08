App.Router.map(function() {
  this.resource('projects');
  this.resource('project', { path: '/projects/:id' }, function () {
      this.route('edit');
    });
  this.route('clients');
  this.resource('client', { path:'/client/:client_id'}, function() {
      //index is implied
      this.route('edit');
    });

});
