exports.config = {
  paths: {
    watched: ['app', 'envs', 'vendor', 'test']
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^(app|envs\/development)/,
        'javascripts/vendor.js': /^vendor\/scripts\/(common|development)/
      },
      order: {
        before: [
          'vendor/scripts/common/console-polyfill.js',
          'vendor/scripts/common/jquery.js',
          'vendor/scripts/common/handlebars.js',
          'vendor/scripts/common/moment.js',
          'vendor/scripts/development/ember.js',
          'vendor/scripts/development/ember-data.js',
          'vendor/scripts/common/ember-json-api.js',
          'vendor/scripts/common/bs-core.max.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/app.css': /^(app|vendor)/
      },
      order: {
        before: [
          'vendor/styles/normalize.css',
          'vendor/styles/bootstrap.css',
          'vendor/styles/flat-ui.css'
        ]
      }
    },
    templates: {
      precompile: true,
      root: 'templates',
      joinTo: {
        'javascripts/app.js': /^app/
      }
    }
  },
  overrides: {

    // Production Settings
    production: {
      files: {
        javascripts: {
          joinTo: {
            'javascripts/app.js': /^(app|envs\/production)/,
            'javascripts/vendor.js': /^vendor\/scripts\/(common|production)/
          },
          order: {
            before: [
              'vendor/scripts/common/console-polyfill.js',
              'vendor/scripts/common/jquery.js',
              'vendor/scripts/common/handlebars.js',
              'vendor/scripts/production/ember.js',
              'vendor/scripts/production/ember-data.js'
            ]
          }
        }
      },
      optimize: true,
      sourceMaps: false,
      plugins: {
        autoReload: {
          enabled: false
        }
      }
    }
  },

  server: {
    path: 'server.js',
    port: 3334
  }
};
