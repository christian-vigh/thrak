var cli       = require('cli').enable('status', 'help', 'version', 'glob', 'timeout');
var fs        = require('fs');
var glob      = require('glob');
var path      = require('path');
var _         = require('underscore');
var phpjsutil = new require('../lib/phpjsutil');
var equal     = require('deep-equal');
var __root    = __dirname + '/..';
var beautify  = require('js-beautify').js_beautify;


// --debug works out of the box. See -h
cli.parse({
  action  : ['a', 'Test / Build', 'string', 'test'],
  output  : ['o', 'Build output file', 'string', __root + '/build/npm.js'],
  name    : ['n', 'Function name to test', 'path', '*'],
  category: ['c', 'Category to test', 'path', '*'],
  abort   : ['a', 'Abort on first failure']
});

var PhpjsUtil = phpjsutil({
  injectDependencies: ['ini_set', 'ini_get'],
  equal             : equal,
  debug             : cli.debug
});

// Environment-specific file opener. function name needs to
// be translated to code. The difficulty is in finding the
// category.
PhpjsUtil.opener = function(name, cb) {
  var pattern = __root + '/functions/*/' + name + '.js';
  glob(pattern, {}, function(err, files) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err);
    }
    var filepath = files[0];

    if (!filepath) {
      return cb('Could not find ' + pattern);
    }

    fs.readFile(filepath, 'utf-8', function(err, code) {
      if (err) {
        return cb('Error while opening ' + filepath + '. ' + err);
      }
      return cb(null, code);
    });
  });
};

cli.lpad = function(str, len, pad) {
  if (!pad) pad = ' ';
  if (!len) len = 20;
  str = str + '';
  if (str.length > len) {
    return str;
  }

  return (new Array(len - str.length).join(pad)) + str;
};

cli.cleanup = function(args, options) {
  var self    = this;
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js';
  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err);
    }

    var buf  = '';
    buf += params.func_signature.trim() + '\n';

    var longestKey = 0;
    _.each(params.headKeys, function (items, key) {
      var len = key.length;
      if (key === 'example') {
        key += 3;
      }
      if (len >= longestKey) {
        longestKey = len;
      }
    });

    longestKey += 1;
    var key, val, items, vals, i, itemNr;

    var headKeys = {
      'discuss at': [['http://phpjs.org/functions/' + params.name]]
    };

    _.extend(headKeys, params.headKeys);

    // If you want to overwrite:
    // headKeys['discuss at'] = [['http://phpjs.org/functions/' + params.name + '/']];

    for (key in headKeys){
      items = headKeys[key];
      for (itemNr in items) {
        vals = items[itemNr];
        for (i in vals) {
          val  = vals[i];
          buf += '  // ' + self.lpad((key === 'example' ? (key + ' ' + ((itemNr*1)+1)) : key), longestKey) + ': ' + val + '\n';
        }
        if (key === 'example') {
          vals = headKeys.returns[itemNr];

          for (i in vals) {
            val  = vals[i];
            buf += '  // ' + self.lpad('returns' + ' ' + ((itemNr*1)+1), longestKey) + ': ' + val + '\n';
          }

          delete headKeys.returns[itemNr];
        }
      }
    }

    buf += '\n';
    buf += '  ' + params.body;
    buf += '\n';
    buf += '}\n';

    buf.replace(/\r/g, '');

    buf = beautify(buf, {
      "indent_size": 2,
      "indent_char": " ",
      "indent_level": 0,
      "indent_with_tabs": false,
      "preserve_newlines": true,
      "max_preserve_newlines": 2,
      "jslint_happy": false,
      "brace_style": "collapse",
      "keep_array_indentation": false,
      "keep_function_indentation": false,
      "space_before_conditional": true,
      "break_chained_methods": true,
      "eval_code": false,
      "unescape_strings": false,
      "wrap_line_length": 120
    });

    // console.log(buf);
    fs.writeFileSync(file, buf);
  });
};

cli.buildnpm = function(args, options) {
  var self    = this;
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js';
  fs.writeFileSync(options.output, '// This file is generated by `make build`. \n');
  fs.appendFileSync(options.output, '// Do NOT edit by hand. \n');
  fs.appendFileSync(options.output, '// \n');
  fs.appendFileSync(options.output, '// Make function changes in ./functions and \n');
  fs.appendFileSync(options.output, '// generator changes in ./lib/phpjsutil.js \n');
  self.glob(pattern, function (err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err);
    }
    var buf = '\n';
    buf += 'exports.' + params.func_name + ' = function (' + params.func_arguments.join(', ') + ') {\n';
    buf += '  ' + params.body.split('\n').join('\n  ').replace(/^  $/g, '') + '\n';
    buf += '};\n';
    fs.appendFileSync(options.output, buf);
  });
};

cli.glob = function(pattern, cb) {
  glob(pattern, {}, function(err, files) {
    var names = [];
    var map   = {};
    for (var i in files) {
      var file = files[i];
      var name = path.basename(file, '.js');
      if (file.indexOf('/_') === -1) {
        names.push(name);
        map[name] = file;
      }
    }
    names.forEach(function(name) {
      PhpjsUtil.load(name, function(err, params) {
        if (err) {
          return cb(err);
        }

        return cb(null, params, map[name]);
      });
    });
  });
};

cli.test = function(args, options) {
  var self    = this;
  var pattern = __root + '/functions/' + options.category + '/' + options.name + '.js';

  process.on('exit', function() {
    var msg = self.pass_cnt + ' passed / ' + self.fail_cnt + ' failed / ' + self.skip_cnt + ' skipped';
    if (self.fail_cnt) {
      cli.fatal(msg);
    } else {
      cli.ok(msg);
    }
  });

  self.pass_cnt = 0;
  self.fail_cnt = 0;
  self.skip_cnt = 0;
  self.glob(pattern, function(err, params, file) {
    if (err) {
      return self.error('Could not glob for ' + pattern + '. ' + err);
    }

    if (params.headKeys.test && params.headKeys.test[0][0] === 'skip') {
      self.skip_cnt++;
      return cli.info('--> ' + params.name + ' skipped as instructed. ');
    }

    PhpjsUtil.test(params, function(err, test, params) {
      if (!err) {
        self.pass_cnt++;
        cli.debug('--> ' + params.name + '#' + ( + (test.number * 1) + 1) + ' passed. ');
      } else {
        self.fail_cnt++;
        cli.error('--> ' + params.name + '#' + ( + (test.number * 1) + 1) + ' failed. ');
        cli.error(err);
        if (options.abort) {
          cli.fatal('Aborting on first failure as instructed. ');
        }
      }
    });
  });
};

cli.main(function(args, options) {
  cli[options.action](args, options);
});

