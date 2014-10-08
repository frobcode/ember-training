App.User = DS.Model.extend({
  email: DS.attr('string'),
  fname: DS.attr('string'),
  lname: DS.attr('string'),
  level: DS.attr('number'),
  role: function () {
    return {
      3: 'admin',
      1: 'staff',
      0: 'client'
    }[this.get('level')];
  }.property('level'),
  setName: function() {
    this.set('name', this.get('fname') + ' ' + this.get('lname'));
  }.observes('fname', 'lname').on('init')

});
