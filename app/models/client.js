App.Client = DS.Model.extend({
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
  name: function(key, value) {
    if (arguments.length > 1 ) {
      var parts = value.split(' '),
        fname = parts[0],
        lname = parts.slice(1, parts.length).join(' ');
      // setter
      this.setProperties({
        fname: fname,
        lname: lname
      });
      return value;
    } else {
      // getter
      return this.get('fname') + ' ' + this.get('lname');
    }
  }.property('fname', 'lname'),

});
