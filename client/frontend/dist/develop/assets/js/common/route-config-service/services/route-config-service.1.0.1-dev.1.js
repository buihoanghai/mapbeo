String.prototype.toDash = function() {
  return this.replace(/([A-Z])/g, function($1) {
    return "-" + $1.toLowerCase();
  });
};

angular.module('common.routeConfig')

.provider('common.routeConfig.routeConfigService', [
  function() {

    function viewConfig(baseName, controllerName, tplName, options) {
      var cnf = {
        controller: 'app.' + baseName + '.' + controllerName + 'Controller'
      };

      if (options && options.controllerAs) {
        cnf.controller += options.controllerAs === true ?
          ' as ' + baseName : ' as ' + options.controllerAs;
      }

      if (tplName) {
        var _t = 'app/' + baseName + '/_tpl/' + tplName + '.tpl.html';
        cnf.templateUrl = tplName ? _t : false;
      }
      if (options && options.resolve) {
        cnf.resolve = options.resolve;
      }
      return cnf;
    }

    this.$get = function() {
      return this;
    };   

    this.config = function(url, name, options) {
      //- State name
      var baseName = name.split(".")[0];

      //- Controller name
      var controllerName = options && options.controller ?
        options.controller :
        name.replace(/[.]+/g, ' ');

      //- Template name
      var tplName = options && options.tpl ?
        baseName + "." + options.tpl :
        (options && options.tpl === false ?
          false :
          name.toDash());

      //- Set view
      var view = options && options.view ? options.view : "main";
      var p = {
        views: {}
      };
      p.views[view] = viewConfig(baseName, controllerName, tplName, options);

      //- Reload on search
      if (options && !_.isUndefined(options.reloadOnSearch)) {
        p.reloadOnSearch = options.reloadOnSearch;
      }

      //- Set state parameters
      if (options && options.stateParams) {
        stateParams = stateParams.concat(options.stateParams);
      }

      //- Set stateparams in URL or as hidden params
      if (url) {
        p.url = url 
      } else {
      }
      return p;
    };

  }
]);