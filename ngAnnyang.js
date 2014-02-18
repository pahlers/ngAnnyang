/**
* ngAnnyang Module
*
* Annyang Angular wrapper
*/
angular.module('ngAnnyang', ['ng'])
  .provider('ngAnnyang', function ngAnnyangProvider() {
    'use strict';

    var isEnabledFn = function() {};

    // events
    console.log('ngAnnyang: set events');
    annyang.addCallback('start', function() {
      console.log('ngAnnyang: enabled true');
      isEnabledFn(true);
    });
    _.each(['end', 'error', 'errorNetwork', 'errorPermissionBlocked', 'errorPermissionDenied'], function(v) {
      annyang.addCallback(v, function() {
        console.log('ngAnnyang: enabled false');
        isEnabledFn(false);
      });
    });

    console.log('ngAnnyang: start');
    annyang.start();

    this.debug = function(state) {
      if(state){
        console.log('ngAnnyang: set debug', !!state);
        annyang.debug(!!state);

      } else {
        console.log('ngAnnyang: set debug', true);
        annyang.debug();
      }
    };

    this.setLanguage = function(lang) {
      if(lang){
        console.log('ngAnnyang: debug', ''+lang);
        annyang.setLanguage(''+lang);
      }
    };

    this.$get = function ngAnnyangFactory(){
      return {
        isEnabled: function(fn) {
          console.log('ngAnnyang: isEnabled callback', fn);
          isEnabledFn = fn;
        },
        addCommands: function(commands) {
          console.log('ngAnnyang: add commands', commands);
          annyang.addCommands(commands);
        },
        removeCommands: function(commands) {
          console.log('ngAnnyang: remove commands', commands);
          annyang.removeCommands(commands);
        }
      };
    };
  });
