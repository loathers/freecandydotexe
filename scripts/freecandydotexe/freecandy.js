"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = function(fn, res) {
  return function() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
};
var __export = function(target, all) {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = function(to, from, except, desc) {
  if (from && typeof from == "object" || typeof from == "function")
    for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++)
      key = keys[i], !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: function(k) {
        return from[k];
      }.bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = function(mod) {
  return __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
};

// kolmafia-polyfill.js
var kolmafia, console, init_kolmafia_polyfill = __esm({
  "kolmafia-polyfill.js": function() {
    "use strict";
    kolmafia = require("kolmafia"), console = {
      log: kolmafia.print
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: function() {
    return main;
  }
});
module.exports = __toCommonJS(src_exports);
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/index.js
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/args.js
init_kolmafia_polyfill();
var import_kolmafia = require("kolmafia");
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
}
var Args = /* @__PURE__ */ function() {
  function Args2() {
    _classCallCheck(this, Args2);
  }
  return _createClass(Args2, null, [{
    key: "custom",
    value: function(spec, _parser, valueHelpName) {
      var _a, _b, raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(function(option) {
        return option[0];
      });
      if ("default" in spec && raw_options && !raw_options.includes(spec.default))
        throw "Invalid default value ".concat(spec.default);
      return _objectSpread(_objectSpread({}, spec), {}, {
        valueHelpName: valueHelpName,
        parser: function(value) {
          var parsed_value = _parser(value);
          return parsed_value === void 0 || parsed_value instanceof ParseError ? parsed_value : raw_options && !raw_options.includes(parsed_value) ? new ParseError("received ".concat(value, " which was not in the allowed options")) : parsed_value;
        },
        options: (_b = spec.options) === null || _b === void 0 ? void 0 : _b.map(function(a) {
          return ["".concat(a[0]), a[1]];
        })
      });
    }
  }, {
    key: "arrayFromArg",
    value: function(spec, argFromSpec) {
      var _a, _b, _c, spec_without_default = _objectSpread({}, spec);
      "default" in spec_without_default && delete spec_without_default.default;
      var arg = argFromSpec.call(this, spec_without_default), raw_options = (_a = spec.options) === null || _a === void 0 ? void 0 : _a.map(function(option) {
        return option[0];
      });
      if ("default" in spec && raw_options) {
        var _iterator = _createForOfIteratorHelper(spec.default), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var default_entry = _step.value;
            if (!raw_options.includes(default_entry))
              throw "Invalid default value ".concat(spec.default);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      var separator = (_b = spec.separator) !== null && _b !== void 0 ? _b : ",", arrayParser = function(value) {
        var values = value.split(separator);
        spec.noTrim || (values = values.map(function(v) {
          return v.trim();
        }));
        var result = values.map(function(v) {
          return arg.parser(v);
        }), error = result.find(function(v) {
          return v instanceof ParseError;
        });
        if (error)
          return error;
        var failure_index = result.indexOf(void 0);
        return failure_index !== -1 ? new ParseError("components expected ".concat(arg.valueHelpName, " but could not parse ").concat(values[failure_index])) : result;
      };
      return _objectSpread(_objectSpread({}, spec), {}, {
        valueHelpName: "".concat(arg.valueHelpName).concat(separator, " ").concat(arg.valueHelpName).concat(separator, " ..."),
        parser: arrayParser,
        options: (_c = spec.options) === null || _c === void 0 ? void 0 : _c.map(function(a) {
          return ["".concat(a[0]), a[1]];
        })
      });
    }
  }, {
    key: "string",
    value: function(spec) {
      return this.custom(spec, function(value) {
        return value;
      }, "TEXT");
    }
  }, {
    key: "strings",
    value: function(spec) {
      return this.arrayFromArg(spec, this.string);
    }
  }, {
    key: "number",
    value: function(spec) {
      return this.custom(spec, function(value) {
        return isNaN(Number(value)) ? void 0 : Number(value);
      }, "NUMBER");
    }
  }, {
    key: "numbers",
    value: function(spec) {
      return this.arrayFromArg(spec, this.number);
    }
  }, {
    key: "boolean",
    value: function(spec) {
      return this.custom(spec, function(value) {
        if (value.toLowerCase() === "true")
          return !0;
        if (value.toLowerCase() === "false")
          return !1;
      }, "BOOLEAN");
    }
  }, {
    key: "booleans",
    value: function(spec) {
      return this.arrayFromArg(spec, this.boolean);
    }
  }, {
    key: "flag",
    value: function(spec) {
      return this.custom(spec, function(value) {
        if (value.toLowerCase() === "true")
          return !0;
        if (value.toLowerCase() === "false")
          return !1;
      }, "FLAG");
    }
  }, {
    key: "class",
    value: function(spec) {
      return this.custom(spec, function(value) {
        var match = import_kolmafia.Class.get(value);
        if (match.toString().toUpperCase() === value.toString().toUpperCase() || !isNaN(Number(value)))
          return match;
      }, "CLASS");
    }
  }, {
    key: "classes",
    value: function(spec) {
      return this.arrayFromArg(spec, this.class);
    }
  }, {
    key: "effect",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Effect.get, "EFFECT");
    }
  }, {
    key: "effects",
    value: function(spec) {
      return this.arrayFromArg(spec, this.effect);
    }
  }, {
    key: "familiar",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Familiar.get, "FAMILIAR");
    }
  }, {
    key: "familiars",
    value: function(spec) {
      return this.arrayFromArg(spec, this.familiar);
    }
  }, {
    key: "item",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Item.get, "ITEM");
    }
  }, {
    key: "items",
    value: function(spec) {
      return this.arrayFromArg(spec, this.item);
    }
  }, {
    key: "location",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Location.get, "LOCATION");
    }
  }, {
    key: "locations",
    value: function(spec) {
      return this.arrayFromArg(spec, this.location);
    }
  }, {
    key: "monster",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Monster.get, "MONSTER");
    }
  }, {
    key: "monsters",
    value: function(spec) {
      return this.arrayFromArg(spec, this.monster);
    }
  }, {
    key: "path",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Path.get, "PATH");
    }
  }, {
    key: "paths",
    value: function(spec) {
      return this.arrayFromArg(spec, this.path);
    }
  }, {
    key: "skill",
    value: function(spec) {
      return this.custom(spec, import_kolmafia.Skill.get, "SKILL");
    }
  }, {
    key: "skills",
    value: function(spec) {
      return this.arrayFromArg(spec, this.skill);
    }
    /**
     * Create a group of arguments that will be printed separately in the help.
     *
     * Note that keys in the group must still be globally distinct.
     *
     * @param groupName The display name for the group in help.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     */
  }, {
    key: "group",
    value: function(groupName, args2) {
      return {
        name: groupName,
        args: args2
      };
    }
    /**
     * Create a set of input arguments for a script.
     * @param scriptName Prefix for property names; often the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @param options Config options for the args and arg parser.
     * @returns An object which can hold parsed argument values. The keys of this
     *    object are identical to the keys in 'args'.
     */
  }, {
    key: "create",
    value: function(scriptName, scriptHelp, args2, options) {
      var _objectSpread22;
      _traverse(args2, function(keySpec, key) {
        if (key === "help" || keySpec.key === "help")
          throw "help is a reserved argument name";
      });
      var argsWithHelp = _objectSpread(_objectSpread({}, args2), {}, {
        help: this.flag({
          help: "Show this message and exit.",
          setting: ""
        })
      }), res = _objectSpread(_objectSpread({}, _loadDefaultValues(argsWithHelp)), {}, (_objectSpread22 = {}, _defineProperty(_objectSpread22, specSymbol, argsWithHelp), _defineProperty(_objectSpread22, scriptSymbol, scriptName), _defineProperty(_objectSpread22, scriptHelpSymbol, scriptHelp), _defineProperty(_objectSpread22, optionsSymbol, options != null ? options : {}), _objectSpread22));
      if (options != null && options.positionalArgs) {
        var keys = [], metadata = Args2.getMetadata(res);
        metadata.traverse(function(keySpec, key) {
          var _a;
          keys.push((_a = keySpec.key) !== null && _a !== void 0 ? _a : key);
        });
        var _iterator2 = _createForOfIteratorHelper(options.positionalArgs), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var arg = _step2.value;
            if (!keys.includes(arg))
              throw "Unknown key for positional arg: ".concat(arg);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return res;
    }
    /**
     * Parse the command line input into the provided script arguments.
     * @param args An object to hold the parsed argument values, from Args.create(*).
     * @param command The command line input.
     * @param includeSettings If true, parse values from settings as well.
     */
  }, {
    key: "fill",
    value: function(args2, command) {
      var includeSettings = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, _a, metadata = Args2.getMetadata(args2), keys = /* @__PURE__ */ new Set(), flags = /* @__PURE__ */ new Set();
      if (metadata.traverse(function(keySpec, key) {
        var _a2, name = (_a2 = keySpec.key) !== null && _a2 !== void 0 ? _a2 : key;
        if (flags.has(name) || keys.has(name))
          throw "Duplicate arg key ".concat(name, " is not allowed");
        keySpec.valueHelpName === "FLAG" ? flags.add(name) : keys.add(name);
      }), includeSettings && metadata.traverseAndMaybeSet(args2, function(keySpec, key) {
        var _a2, _b, setting = (_a2 = keySpec.setting) !== null && _a2 !== void 0 ? _a2 : "".concat(metadata.scriptName, "_").concat((_b = keySpec.key) !== null && _b !== void 0 ? _b : key);
        if (setting !== "") {
          var value_str = (0, import_kolmafia.getProperty)(setting);
          if (value_str !== "")
            return parseAndValidate(keySpec, "Setting ".concat(setting), value_str);
        }
      }), !(command === void 0 || command === "")) {
        var parsed = new CommandParser(command, keys, flags, (_a = metadata.options.positionalArgs) !== null && _a !== void 0 ? _a : []).parse();
        metadata.traverseAndMaybeSet(args2, function(keySpec, key) {
          var _a2, argKey = (_a2 = keySpec.key) !== null && _a2 !== void 0 ? _a2 : key, value_str = parsed.get(argKey);
          if (value_str !== void 0)
            return parseAndValidate(keySpec, "Argument ".concat(argKey), value_str);
        });
      }
    }
    /**
     * Parse command line input into a new set of script arguments.
     * @param scriptName Prefix to use in property names; typically the name of the script.
     * @param scriptHelp Brief description of this script, for the help message.
     * @param spec An object specifying the script arguments.
     * @param command The command line input.
     * @param options Config options for the args and arg parser.
     */
  }, {
    key: "parse",
    value: function(scriptName, scriptHelp, spec, command, options) {
      var args2 = this.create(scriptName, scriptHelp, spec, options);
      return this.fill(args2, command), args2;
    }
    /**
     * Print a description of the script arguments to the CLI.
     *
     * First, all top-level argument descriptions are printed in the order they
     * were defined. Afterwards, descriptions for groups of arguments are printed
     * in the order they were defined.
     *
     * @param args An object of parsed arguments, from Args.create(*).
     * @param maxOptionsToDisplay If given, do not list more than this many options for each arg.
     */
  }, {
    key: "showHelp",
    value: function(args2, maxOptionsToDisplay) {
      var _a, metadata = Args2.getMetadata(args2);
      (0, import_kolmafia.printHtml)("".concat(metadata.scriptHelp)), (0, import_kolmafia.printHtml)(""), (0, import_kolmafia.printHtml)("<b>".concat((_a = metadata.options.defaultGroupName) !== null && _a !== void 0 ? _a : "Options", ":</b>")), metadata.traverse(function(arg, key) {
        var _a2, _b, _c, _d, _e;
        if (!arg.hidden) {
          var nameText = "<font color='".concat((0, import_kolmafia.isDarkMode)() ? "yellow" : "blue", "'>").concat((_a2 = arg.key) !== null && _a2 !== void 0 ? _a2 : key, "</font>"), valueText = arg.valueHelpName === "FLAG" ? "" : "<font color='purple'>".concat(arg.valueHelpName, "</font>"), helpText = (_b = arg.help) !== null && _b !== void 0 ? _b : "", defaultText = "default" in arg ? "<font color='#888888'>[default: ".concat(arg.default, "]</font>") : "", settingText = arg.setting === "" ? "" : "<font color='#888888'>[setting: ".concat((_c = arg.setting) !== null && _c !== void 0 ? _c : "".concat(metadata.scriptName, "_").concat((_d = arg.key) !== null && _d !== void 0 ? _d : key), "]</font>");
          (0, import_kolmafia.printHtml)("&nbsp;&nbsp;".concat([nameText, valueText, "-", helpText, defaultText, settingText].join(" ")));
          var valueOptions = (_e = arg.options) !== null && _e !== void 0 ? _e : [];
          if (valueOptions.length < (maxOptionsToDisplay != null ? maxOptionsToDisplay : Number.MAX_VALUE)) {
            var _iterator3 = _createForOfIteratorHelper(valueOptions), _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var option = _step3.value;
                option.length === 1 || option[1] === void 0 ? (0, import_kolmafia.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0])) : (0, import_kolmafia.printHtml)("&nbsp;&nbsp;&nbsp;&nbsp;<font color='blue'>".concat(nameText, "</font> ").concat(option[0], " - ").concat(option[1]));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }
      }, function(group) {
        (0, import_kolmafia.printHtml)(""), (0, import_kolmafia.printHtml)("<b>".concat(group.name, ":</b>"));
      });
    }
    /**
     * Load the metadata information for a set of arguments. Only for advanced usage.
     *
     * @param args A JS object specifying the script arguments. Its values should
     *    be {@link Arg} objects (created by Args.string, Args.number, or others)
     *    or groups of arguments (created by Args.group).
     * @returns A class containing metadata information.
     */
  }, {
    key: "getMetadata",
    value: function(args2) {
      return new WrappedArgMetadata(args2);
    }
  }]), Args2;
}(), ParseError = function ParseError2(message) {
  _classCallCheck(this, ParseError2), this.message = message;
}, specSymbol = Symbol("spec"), scriptSymbol = Symbol("script"), scriptHelpSymbol = Symbol("scriptHelp"), optionsSymbol = Symbol("options");
function parseAndValidate(arg, source, value) {
  var parsed_value;
  try {
    parsed_value = arg.parser(value);
  } catch (_a) {
    parsed_value = void 0;
  }
  if (parsed_value === void 0)
    throw "".concat(source, " expected ").concat(arg.valueHelpName, " but could not parse ").concat(value);
  if (parsed_value instanceof ParseError)
    throw "".concat(source, " ").concat(parsed_value.message);
  return parsed_value;
}
var WrappedArgMetadata = /* @__PURE__ */ function() {
  function WrappedArgMetadata2(args2) {
    _classCallCheck(this, WrappedArgMetadata2), this.spec = args2[specSymbol], this.scriptName = args2[scriptSymbol], this.scriptHelp = args2[scriptHelpSymbol], this.options = args2[optionsSymbol];
  }
  return _createClass(WrappedArgMetadata2, [{
    key: "loadDefaultValues",
    value: function() {
      return _loadDefaultValues(this.spec);
    }
    /**
     * Traverse the spec and possibly generate a value for each argument.
     *
     * @param result The object to hold the resulting argument values, typically
     *    the result of loadDefaultValues().
     * @param setTo A function to generate an argument value from each arg spec.
     *    If this function returns undefined, then the argument value is unchanged.
     */
  }, {
    key: "traverseAndMaybeSet",
    value: function(result, setTo) {
      return _traverseAndMaybeSet(this.spec, result, setTo);
    }
    /**
     * Traverse the spec and call a method for each argument.
     *
     * @param process A function to call at each arg spec.
     */
  }, {
    key: "traverse",
    value: function(process, onGroup) {
      return _traverse(this.spec, process, onGroup);
    }
  }]), WrappedArgMetadata2;
}();
function _loadDefaultValues(spec) {
  var result = {};
  for (var k in spec) {
    var argSpec = spec[k];
    "args" in argSpec ? result[k] = _loadDefaultValues(argSpec.args) : "default" in argSpec ? result[k] = argSpec.default : result[k] = void 0;
  }
  return result;
}
function _traverseAndMaybeSet(spec, result, setTo) {
  var groups = [];
  for (var k in spec) {
    var argSpec = spec[k];
    if ("args" in argSpec)
      groups.push([argSpec, k]);
    else {
      var value = setTo(argSpec, k);
      if (value === void 0)
        continue;
      result[k] = value;
    }
  }
  for (var _i = 0, _groups = groups; _i < _groups.length; _i++) {
    var group_and_key = _groups[_i];
    _traverseAndMaybeSet(group_and_key[0].args, result[group_and_key[1]], setTo);
  }
}
function _traverse(spec, process, onGroup) {
  var groups = [];
  for (var k in spec) {
    var argSpec = spec[k];
    "args" in argSpec ? groups.push([argSpec, k]) : process(argSpec, k);
  }
  for (var _i2 = 0, _groups2 = groups; _i2 < _groups2.length; _i2++) {
    var group_and_key = _groups2[_i2];
    onGroup == null || onGroup(group_and_key[0], group_and_key[1]), _traverse(group_and_key[0].args, process, onGroup);
  }
}
var CommandParser = /* @__PURE__ */ function() {
  function CommandParser2(command, keys, flags, positionalArgs) {
    _classCallCheck(this, CommandParser2), this.command = command, this.index = 0, this.keys = keys, this.flags = flags, this.positionalArgs = positionalArgs, this.positionalArgsParsed = 0;
  }
  return _createClass(CommandParser2, [{
    key: "parse",
    value: function() {
      var _a, _b, _c, _d;
      this.index = 0;
      for (var result = /* @__PURE__ */ new Map(); !this.finished(); ) {
        var parsing_negative_flag = !1;
        this.peek() === "!" && (parsing_negative_flag = !0, this.consume(["!"]));
        var startIndex = this.index, key = this.parseKey();
        if (result.has(key))
          throw "Duplicate key ".concat(key, " (first set to ").concat((_a = result.get(key)) !== null && _a !== void 0 ? _a : "", ")");
        if (this.flags.has(key)) {
          if (result.set(key, parsing_negative_flag ? "false" : "true"), this.peek() === "=")
            throw "Flag ".concat(key, " cannot be assigned a value");
          this.finished() || this.consume([" "]), this.prevUnquotedKey = void 0;
        } else if (this.keys.has(key)) {
          this.consume(["=", " "]);
          var value = this.parseValue();
          ["'", '"'].includes((_b = this.prev()) !== null && _b !== void 0 ? _b : "") ? this.prevUnquotedKey = void 0 : this.prevUnquotedKey = key, this.finished() || this.consume([" "]), result.set(key, value);
        } else if (this.positionalArgsParsed < this.positionalArgs.length && this.peek() !== "=") {
          var positionalKey = this.positionalArgs[this.positionalArgsParsed];
          this.positionalArgsParsed++, this.index = startIndex;
          var _value = this.parseValue();
          if (["'", '"'].includes((_c = this.prev()) !== null && _c !== void 0 ? _c : "") ? this.prevUnquotedKey = void 0 : this.prevUnquotedKey = key, this.finished() || this.consume([" "]), result.has(positionalKey))
            throw "Cannot assign ".concat(_value, " to ").concat(positionalKey, " (positionally) since ").concat(positionalKey, " was already set to ").concat((_d = result.get(positionalKey)) !== null && _d !== void 0 ? _d : "");
          result.set(positionalKey, _value);
        } else
          throw this.prevUnquotedKey && this.peek() !== "=" ? "Unknown argument: ".concat(key, " (if this should have been parsed as part of ").concat(this.prevUnquotedKey, ", you should surround the entire value in quotes)") : "Unknown argument: ".concat(key);
      }
      return result;
    }
    /**
     * @returns True if the entire command has been parsed.
     */
  }, {
    key: "finished",
    value: function() {
      return this.index >= this.command.length;
    }
    /**
     * @returns The next character to parse, if it exists.
     */
  }, {
    key: "peek",
    value: function() {
      if (!(this.index >= this.command.length))
        return this.command.charAt(this.index);
    }
    /**
     * @returns The character just parsed, if it exists.
     */
  }, {
    key: "prev",
    value: function() {
      if (!(this.index <= 0) && !(this.index >= this.command.length + 1))
        return this.command.charAt(this.index - 1);
    }
    /**
     * Advance the internal marker over the next expected character.
     * Throws an error on unexpected characters.
     *
     * @param allowed Characters that are expected.
     */
  }, {
    key: "consume",
    value: function(allowed) {
      var _a;
      if (this.finished())
        throw "Expected ".concat(allowed);
      allowed.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "") && (this.index += 1);
    }
    /**
     * Find the next occurance of one of the provided characters, or the end of
     * the string if the characters never appear again.
     *
     * @param searchValue The characters to locate.
     */
  }, {
    key: "findNext",
    value: function(searchValue) {
      var result = this.command.length, _iterator4 = _createForOfIteratorHelper(searchValue), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var value = _step4.value, index = this.command.indexOf(value, this.index);
          index !== -1 && index < result && (result = index);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return result;
    }
    /**
     * Starting from the internal marker, parse a single key.
     * This also advances the internal marker.
     *
     * @returns The next key.
     */
  }, {
    key: "parseKey",
    value: function() {
      var keyEnd = this.findNext(["=", " "]), key = this.command.substring(this.index, keyEnd);
      return this.index = keyEnd, key;
    }
    /**
     * Starting from the internal marker, parse a single value.
     * This also advances the internal marker.
     *
     * Values are a single word or enclosed in matching quotes, i.e. one of:
     *    "[^"]*"
     *    '[^']*"
     *    [^'"][^ ]*
     *
     * @returns The next value.
     */
  }, {
    key: "parseValue",
    value: function() {
      var _a, _b, valueEnder = " ", quotes = ["'", '"'];
      quotes.includes((_a = this.peek()) !== null && _a !== void 0 ? _a : "") && (valueEnder = (_b = this.peek()) !== null && _b !== void 0 ? _b : "", this.consume([valueEnder]));
      var valueEnd = this.findNext([valueEnder]), value = this.command.substring(this.index, valueEnd);
      if (valueEnder !== " " && valueEnd === this.command.length)
        throw "No closing ".concat(valueEnder, " found for ").concat(valueEnder).concat(value);
      return this.index = valueEnd, valueEnder !== " " && this.consume([valueEnder]), value;
    }
  }]), CommandParser2;
}();

// node_modules/grimoire-kolmafia/dist/combat.js
init_kolmafia_polyfill();
var import_kolmafia23 = require("kolmafia");

// node_modules/libram/dist/index.js
init_kolmafia_polyfill();

// node_modules/libram/dist/actions/ActionSource.js
init_kolmafia_polyfill();
var import_kolmafia8 = require("kolmafia");

// node_modules/libram/dist/combat.js
init_kolmafia_polyfill();
var import_kolmafia6 = require("kolmafia");

// node_modules/libram/dist/lib.js
init_kolmafia_polyfill();
var import_kolmafia5 = require("kolmafia");

// node_modules/libram/dist/logger.js
init_kolmafia_polyfill();
var import_kolmafia2 = require("kolmafia"), _defaultHandlers;
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass2(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties2(Constructor.prototype, protoProps), staticProps && _defineProperties2(Constructor, staticProps), Constructor;
}
function _defineProperty2(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var LogLevels;
(function(LogLevels2) {
  LogLevels2[LogLevels2.NONE = 0] = "NONE", LogLevels2[LogLevels2.ERROR = 1] = "ERROR", LogLevels2[LogLevels2.WARNING = 2] = "WARNING", LogLevels2[LogLevels2.INFO = 3] = "INFO", LogLevels2[LogLevels2.DEBUG = 4] = "DEBUG";
})(LogLevels || (LogLevels = {}));
var defaultHandlers = (_defaultHandlers = {}, _defineProperty2(_defaultHandlers, LogLevels.INFO, function(message) {
  (0, import_kolmafia2.printHtml)("<b>[Libram Info]</b> ".concat(message)), (0, import_kolmafia2.logprint)("[Libram] ".concat(message));
}), _defineProperty2(_defaultHandlers, LogLevels.WARNING, function(message) {
  (0, import_kolmafia2.printHtml)('<span style="background: orange; color: white;"><b>[Libram Warning]</b> '.concat(message, "</span>")), (0, import_kolmafia2.logprint)("[Libram] ".concat(message));
}), _defineProperty2(_defaultHandlers, LogLevels.ERROR, function(error) {
  (0, import_kolmafia2.printHtml)('<span style="background: red; color: white;"><b>[Libram Error]</b> '.concat(error.toString(), "</span>")), (0, import_kolmafia2.logprint)("[Libram] ".concat(error));
}), _defineProperty2(_defaultHandlers, LogLevels.DEBUG, function(message) {
  (0, import_kolmafia2.printHtml)('<span style="background: red; color: white;"><b>[Libram Debug]</b> '.concat(message, "</span>")), (0, import_kolmafia2.logprint)("[Libram] ".concat(message));
}), _defaultHandlers), Logger = /* @__PURE__ */ function() {
  function Logger2() {
    _classCallCheck2(this, Logger2), _defineProperty2(this, "handlers", defaultHandlers);
  }
  return _createClass2(Logger2, [{
    key: "level",
    get: function() {
      return Logger2.currentLevel;
    }
  }, {
    key: "setLevel",
    value: function(level) {
      Logger2.currentLevel = level;
    }
  }, {
    key: "setHandler",
    value: function(level, callback) {
      this.handlers[level] = callback;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "log",
    value: function(level, message) {
      this.level >= level && this.handlers[level](message);
    }
  }, {
    key: "info",
    value: function(message) {
      this.log(LogLevels.INFO, message);
    }
  }, {
    key: "warning",
    value: function(message) {
      this.log(LogLevels.WARNING, message);
    }
  }, {
    key: "error",
    value: function(message) {
      this.log(LogLevels.ERROR, message);
    }
  }, {
    key: "debug",
    value: function(message) {
      this.log(LogLevels.DEBUG, message);
    }
  }]), Logger2;
}();
_defineProperty2(Logger, "currentLevel", LogLevels.ERROR);
var logger_default = new Logger();

// node_modules/libram/dist/property.js
init_kolmafia_polyfill();
var import_kolmafia3 = require("kolmafia");

// node_modules/libram/dist/propertyTyping.js
init_kolmafia_polyfill();

// node_modules/libram/dist/propertyTypes.js
init_kolmafia_polyfill();
var booleanProperties = ["abortOnChoiceWhenNotInChoice", "addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "gitInstallDependencies", "gitShowCommitMessages", "gitUpdateOnLogin", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "pingLogin", "printStackOnAbort", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayCacheUncacheable", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useCachedVolcanoMaps", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_gitUpdated", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "calzoneOfLegendEaten", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "deepDishOfLegendEaten", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "errorOnAmbiguousFold", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hallowienerDefiledNook", "hallowienerGuanoJunction", "hallowienerKnollGym", "hallowienerMadnessBakery", "hallowienerMiddleChamber", "hallowienerOvergrownLot", "hallowienerSkeletonStore", "hallowienerSmutOrcs", "hallowienerSonofaBeach", "hallowienerVolcoino", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasAutumnaton", "hasBartender", "hasChef", "hasCocktailKit", "hasCosmicBowlingBall", "hasDetectiveSchool", "hasMaydayContract", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "intenseCurrents", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "logBastilleBattalionBattles", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "madnessBakeryAvailable", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "noncombatForcerActive", "oasisAvailable", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "overgrownLotAvailable", "ownsSpeakeasy", "pathedSummonsHardcore", "pathedSummonsSoftcore", "pizzaOfLegendEaten", "popularTartUnlocked", "potatoAlarmClockUsed", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "replicaChateauAvailable", "replicaNeverendingPartyAlways", "replicaWitchessSetAvailable", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "scriptCascadingMenus", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "skeletonStoreAvailable", "sleazeAirportAlways", "snojoAvailable", "sortByEffect", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "stopForUltraRare", "styxPixieVisited", "superconductorDefeated", "suppressInappropriateNags", "suppressPowerPixellation", "suppressMallPriceCacheMessages", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useBookOfEverySkillHardcore", "useBookOfEverySkillSoftcore", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_2002MrStoreCreditsCollected", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_bastilleLastBattleWon", "_beachCombing", "_bendHellUsed", "_blackMonolithUsed", "_blankoutUsed", "_bonersSummoned", "_bookOfEverySkillUsed", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chibiChanged", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_cookbookbatRecipeDrops", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTraining", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_epicMcTwistUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_governmentPerDiemUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_lastCombatLost", "_lastCombatWon", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lodestoneUsed", "_lookingGlass", "_loveTunnelToday", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_maydayDropped", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_meatifyMatterUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_molehillMountainUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pingPongGame", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_portableSteamUnitUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_replicaSnowconeTomeUsed", "_replicaResolutionLibramUsed", "_replicaSmithsTomeUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shadowAffinityToday", "_shadowForestLooted", "_shrubDecorated", "_silverDreadFlaskUsed", "_sitCourseCompleted", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_sotParcelReturned", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_strangeStalagmiteUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_telegraphOfficeToday", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758", "unknownRecipe10970", "unknownRecipe10971", "unknownRecipe10972", "unknownRecipe10973", "unknownRecipe10974", "unknownRecipe10975", "unknownRecipe10976", "unknownRecipe10977", "unknownRecipe10978", "unknownRecipe10988", "unknownRecipe10989", "unknownRecipe10990", "unknownRecipe10991", "unknownRecipe10992", "unknownRecipe11000"], numericProperties = ["coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "pingLoginCount", "pingLoginGoal", "pingLoginThreshold", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "8BitBonusTurns", "8BitScore", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "ascensionsToday", "asolDeferredPoints", "asolPointsPigSkinner", "asolPointsCheeseWizard", "asolPointsJazzAgent", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "autumnatonQuestTurn", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableMrStore2002Credits", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "candyWitchTurnsUsed", "candyWitchCandyTotal", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chibiAlignment", "chibiBirthday", "chibiFitness", "chibiIntelligence", "chibiLastVisit", "chibiSocialization", "chilledToTheBone", "cinchoSaltAndLime", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "craftingClay", "craftingLeather", "craftingStraw", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTrainingSkill", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "currentPortalEnergy", "currentReplicaStoreYear", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "elfGratitude", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "encountersUntilSRChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "familiarSweat", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "funGuyMansionKills", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "getsYouDrunkTurnsLeft", "ghostPepperTurnsLeft", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "gooseDronesRemaining", "goreCollected", "gourdItemCount", "greyYouPoints", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "hallowiener8BitRealm", "hallowienerCoinspiracy", "hareMillisecondsSaved", "hareTurnsUsed", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homemadeRobotUpgrades", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBattlefieldReset", "lastBeardBuff", "lastBreakfast", "lastCartographyBooPeak", "lastCartographyCastleTop", "lastCartographyDarkNeck", "lastCartographyDefiledNook", "lastCartographyFratHouse", "lastCartographyFratHouseVerge", "lastCartographyGuanoJunction", "lastCartographyHauntedBilliards", "lastCartographyHippyCampVerge", "lastCartographyZeppelinProtesters", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastFriarsElbowNC", "lastFriarsHeartNC", "lastFriarsNeckNC", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastShadowForgeUnlockAdventure", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastThingWithNoNameDefeated", "lastTowelAscension", "lastTr4pz0rQuest", "lastTrainsetConfiguration", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "legacyPoints", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lovebugsAridDesert", "lovebugsBeachBuck", "lovebugsBooze", "lovebugsChroner", "lovebugsCoinspiracy", "lovebugsCyrpt", "lovebugsFreddy", "lovebugsFunFunds", "lovebugsHoboNickel", "lovebugsItemDrop", "lovebugsMeat", "lovebugsMeatDrop", "lovebugsMoxie", "lovebugsMuscle", "lovebugsMysticality", "lovebugsOilPeak", "lovebugsOrcChasm", "lovebugsPowder", "lovebugsWalmart", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarOwnerId", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "nuclearAutumnPoints", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pingpongSkill", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relayPort", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "spookyVHSTapeMonsterTurn", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "sweat", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "trainsetPosition", "turtleBlessingTurns", "twinPeakProgress", "twoCRSPoints", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerCharge", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "whetstonesUsed", "wolfPigsEvicted", "wolfTurnsUsed", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zigguratLianas", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_autumnatonQuests", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleCheese", "_bastilleGames", "_bastilleGameTurn", "_bastilleLastCheese", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_bellydancerPickpockets", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chibiAdventures", "_chipBags", "_chocolateCigarsUsed", "_chocolateCoveredPingPongBallsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_chronolithNextCost", "_cinchUsed", "_cinchoRests", "_clanFortuneConsultUses", "_clipartSummons", "_cloversPurchased", "_coldMedicineConsults", "_coldMedicineEquipmentTaken", "_companionshipCasts", "_cookbookbatCrafting", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_douseFoeUses", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDrops", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_greyYouAdventures", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_grubbyWoolDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_juneCleaverFightsLeft", "_juneCleaverEncounters", "_juneCleaverStench", "_juneCleaverSpooky", "_juneCleaverSleaze", "_juneCleaverHot", "_juneCleaverCold", "_juneCleaverSkips", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_lovebugsBeachBuck", "_lovebugsChroner", "_lovebugsCoinspiracy", "_lovebugsFreddy", "_lovebugsFunFunds", "_lovebugsHoboNickel", "_lovebugsWalmart", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_monkeyPawWishesUsed", "_monstersMapped", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_robinEggDrops", "_roboDrops", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shadowBricksUsed", "_shadowRiftCombats", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_speakeasyFreeFights", "_spelunkerCharges", "_spelunkingTalesDrops", "_spikolodonSpikeUses", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_sweatOutSomeBoozeUsed", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_waxGlobDrops", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount", "_zombieSmashPocketsUsed"], monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "clumsinessGroveBoss", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "glacierOfJerksBoss", "iceSculptureMonster", "lastCopyableMonster", "longConMonster", "maelstromOfLoversBoss", "makeFriendsMonster", "merkinLockkeyMonster", "monkeyPointMonster", "motifMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "rufusDesiredEntity", "screencappedMonster", "spookyPuttyMonster", "spookyVHSTapeMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"], locationProperties = ["autumnatonQuestLocation", "currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget", "_floundryBassLocation", "_floundryCarpLocation", "_floundryCodLocation", "_floundryHatchetfishLocation", "_floundryTroutLocation", "_floundryTunaLocation", "_sotParcelLocation"], stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "lastRelayUpdate", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "pingLatest", "pingLoginCheck", "pingLoginFail", "pingLongest", "pingShortest", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "userAgent", "8BitColor", "afterAdventureScript", "autoOlfact", "autoPutty", "autumnatonUpgrades", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "chibiName", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentAstralTrip", "currentDistillateMods", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentLlamaForm", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "currentSITSkill", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "duckAreasCleared", "duckAreasSelected", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "gooseReprocessed", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "juneCleaverQueue", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastCombatEnvironments", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteIngredients", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nextDistillateMods", "nextQuantumFamiliarName", "nextQuantumFamiliarOwner", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "parkaMode", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questClumsinessGrove", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGlacierOfJerks", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questMaelstromOfLovers", "questPAGhost", "questRufus", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "rufusDesiredArtifact", "rufusDesiredItems", "rufusQuestTarget", "rufusQuestType", "scriptMRUList", "seahorseName", "shadowLabyrinthGoal", "shadowRiftIngress", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "speakeasyName", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trackVoteMonster", "trainsetConfiguration", "trapperOre", "umbrellaState", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "watchedPreferences", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_bastilleBoosts", "_bastilleChoice1", "_bastilleChoice2", "_bastilleChoice3", "_bastilleCurrentStyles", "_bastilleEnemyCastle", "_bastilleEnemyName", "_bastilleLastBattleResults", "_bastilleLastEncounter", "_bastilleStats", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_citizenZone", "_citizenZoneMods", "_cloudTalkMessage", "_cloudTalkSmoker", "_coatOfPaintModifier", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_lastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_pottedPowerPlant", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateGear", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"], numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure803", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1397", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1427", "choiceAdventure1428", "choiceAdventure1429", "choiceAdventure1430", "choiceAdventure1431", "choiceAdventure1432", "choiceAdventure1433", "choiceAdventure1434", "choiceAdventure1436", "choiceAdventure1460", "choiceAdventure1461", "choiceAdventure1467", "choiceAdventure1468", "choiceAdventure1469", "choiceAdventure1470", "choiceAdventure1471", "choiceAdventure1472", "choiceAdventure1473", "choiceAdventure1474", "choiceAdventure1475", "choiceAdventure1486", "choiceAdventure1487", "choiceAdventure1488", "choiceAdventure1489", "choiceAdventure1491", "choiceAdventure1494", "choiceAdventure1505"], familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "stillsuitFamiliar"], statProperties = ["nsChallenge1", "snojoSetting"], phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];

// node_modules/libram/dist/propertyTyping.js
var booleanPropertiesSet = new Set(booleanProperties), numericPropertiesSet = new Set(numericProperties), numericOrStringPropertiesSet = new Set(numericOrStringProperties), stringPropertiesSet = new Set(stringProperties), locationPropertiesSet = new Set(locationProperties), monsterPropertiesSet = new Set(monsterProperties), familiarPropertiesSet = new Set(familiarProperties), statPropertiesSet = new Set(statProperties), phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}

// node_modules/libram/dist/property.js
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), !0).forEach(function(key) {
      _defineProperty3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck3(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass3(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties3(Constructor.prototype, protoProps), staticProps && _defineProperties3(Constructor, staticProps), Constructor;
}
function _defineProperty3(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray2(o, minLen);
  }
}
function _arrayLikeToArray2(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
var createPropertyGetter = function(transform) {
  return function(property, default_) {
    var value = (0, import_kolmafia3.getProperty)(property);
    return default_ !== void 0 && value === "" ? default_ : transform(value, property);
  };
}, createMafiaClassPropertyGetter = function(Type, toType) {
  return createPropertyGetter(function(value) {
    if (value === "")
      return null;
    var v = toType(value);
    return v === Type.none ? null : v;
  });
}, getString = createPropertyGetter(function(value) {
  return value;
}), getCommaSeparated = createPropertyGetter(function(value) {
  return value.split(/, ?/);
}), getBoolean = createPropertyGetter(function(value) {
  return value === "true";
}), getNumber = createPropertyGetter(function(value) {
  return Number(value);
}), getBounty = createMafiaClassPropertyGetter(import_kolmafia3.Bounty, import_kolmafia3.toBounty), getClass = createMafiaClassPropertyGetter(import_kolmafia3.Class, import_kolmafia3.toClass), getCoinmaster = createMafiaClassPropertyGetter(import_kolmafia3.Coinmaster, import_kolmafia3.toCoinmaster), getEffect = createMafiaClassPropertyGetter(import_kolmafia3.Effect, import_kolmafia3.toEffect), getElement = createMafiaClassPropertyGetter(import_kolmafia3.Element, import_kolmafia3.toElement), getFamiliar = createMafiaClassPropertyGetter(import_kolmafia3.Familiar, import_kolmafia3.toFamiliar), getItem = createMafiaClassPropertyGetter(import_kolmafia3.Item, import_kolmafia3.toItem), getLocation = createMafiaClassPropertyGetter(import_kolmafia3.Location, import_kolmafia3.toLocation), getMonster = createMafiaClassPropertyGetter(import_kolmafia3.Monster, import_kolmafia3.toMonster), getPhylum = createMafiaClassPropertyGetter(import_kolmafia3.Phylum, import_kolmafia3.toPhylum), getServant = createMafiaClassPropertyGetter(import_kolmafia3.Servant, import_kolmafia3.toServant), getSkill = createMafiaClassPropertyGetter(import_kolmafia3.Skill, import_kolmafia3.toSkill), getSlot = createMafiaClassPropertyGetter(import_kolmafia3.Slot, import_kolmafia3.toSlot), getStat = createMafiaClassPropertyGetter(import_kolmafia3.Stat, import_kolmafia3.toStat), getThrall = createMafiaClassPropertyGetter(import_kolmafia3.Thrall, import_kolmafia3.toThrall);
function get(property, _default) {
  var value = getString(property);
  if (isBooleanProperty(property)) {
    var _getBoolean;
    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : !1;
  } else if (isNumericProperty(property)) {
    var _getNumber;
    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else {
    if (isNumericOrStringProperty(property))
      return value.match(/^\d+$/) ? parseInt(value) : value;
    if (isLocationProperty(property))
      return getLocation(property, _default);
    if (isMonsterProperty(property))
      return getMonster(property, _default);
    if (isFamiliarProperty(property))
      return getFamiliar(property, _default);
    if (isStatProperty(property))
      return getStat(property, _default);
    if (isPhylumProperty(property))
      return getPhylum(property, _default);
    if (isStringProperty(property))
      return value;
  }
  return _default instanceof import_kolmafia3.Location ? getLocation(property, _default) : _default instanceof import_kolmafia3.Monster ? getMonster(property, _default) : _default instanceof import_kolmafia3.Familiar ? getFamiliar(property, _default) : _default instanceof import_kolmafia3.Stat ? getStat(property, _default) : _default instanceof import_kolmafia3.Phylum ? getPhylum(property, _default) : typeof _default == "boolean" ? value === "true" ? !0 : value === "false" ? !1 : _default : typeof _default == "number" ? value === "" ? _default : parseInt(value) : value === "" ? _default === void 0 ? "" : _default : value;
}
function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  return (0, import_kolmafia3.setProperty)(property, stringValue), value;
}
function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), prop = _Object$entries$_i[0], value = _Object$entries$_i[1];
    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 1), prop = _ref2[0];
    return [prop, get(prop)];
  }));
  setProperties(properties);
  try {
    return callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  return withProperties(_defineProperty3({}, property, value), callback);
}
function withChoices(choices2, callback) {
  var properties = Object.fromEntries(Object.entries(choices2).map(function(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2), choice = _ref4[0], option = _ref4[1];
    return ["choiceAdventure".concat(choice), option];
  }));
  return withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  return withChoices(_defineProperty3({}, choice, value), callback);
}
var PropertiesManager = /* @__PURE__ */ function() {
  function PropertiesManager2() {
    _classCallCheck3(this, PropertiesManager2), _defineProperty3(this, "properties", {});
  }
  return _createClass3(PropertiesManager2, [{
    key: "storedValues",
    get: function() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     *
     * @param propertiesToSet A Properties object, keyed by property name.
     */
  }, {
    key: "set",
    value: function(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), propertyName = _Object$entries2$_i[0], propertyValue = _Object$entries2$_i[1];
        this.properties[propertyName] === void 0 && (this.properties[propertyName] = get(propertyName)), _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     *
     * @param choicesToSet An object keyed by choice adventure number.
     */
  }, {
    key: "setChoices",
    value: function(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), choiceNumber = _ref6[0], choiceValue = _ref6[1];
        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Sets a single choice adventure property to the given value, storing the old value.
     *
     * @param choiceToSet The number of the choice adventure to set the property for.
     * @param value The value to assign to that choice adventure.
     */
  }, {
    key: "setChoice",
    value: function(choiceToSet, value) {
      this.setChoices(_defineProperty3({}, choiceToSet, value));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     *
     * @param properties Collection of properties to reset.
     */
  }, {
    key: "reset",
    value: function() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++)
        properties[_key] = arguments[_key];
      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3], value = this.properties[property];
        value && _set(property, value);
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */
  }, {
    key: "resetAll",
    value: function() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     *
     * @param properties Properties for the manager to forget.
     */
  }, {
    key: "clear",
    value: function() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        properties[_key2] = arguments[_key2];
      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];
        this.properties[property] && delete this.properties[property];
      }
    }
    /**
     * Clears all properties.
     */
  }, {
    key: "clearAll",
    value: function() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     *
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMinimumValue",
    value: function(property, value) {
      return get(property, 0) < value ? (this.set(_defineProperty3({}, property, value)), !0) : !1;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     *
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */
  }, {
    key: "setMaximumValue",
    value: function(property, value) {
      return get(property, 0) > value ? (this.set(_defineProperty3({}, property, value)), !0) : !1;
    }
    /**
     * Creates a new PropertiesManager with identical stored values to this one.
     *
     * @returns A new PropertiesManager, with identical stored values to this one.
     */
  }, {
    key: "clone",
    value: function() {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = this.storedValues, newGuy;
    }
    /**
     * Clamps a numeric property, modulating it up or down to fit within a specified range
     *
     * @param property The numeric property to clamp
     * @param min The lower bound for what we want the property to be allowed to be.
     * @param max The upper bound for what we want the property to be allowed to be.
     * @returns Whether we ended up changing the property or not.
     */
  }, {
    key: "clamp",
    value: function(property, min, max) {
      if (max < min)
        return !1;
      var start = get(property);
      return this.setMinimumValue(property, min), this.setMaximumValue(property, max), start !== get(property);
    }
    /**
     * Determines whether this PropertiesManager has identical stored values to another.
     *
     * @param other The PropertiesManager to compare to this one.
     * @returns Whether their StoredValues are identical.
     */
  }, {
    key: "equals",
    value: function(other) {
      var thisProps = Object.entries(this.storedValues), otherProps = new Map(Object.entries(other.storedValues));
      if (thisProps.length !== otherProps.size)
        return !1;
      for (var _i5 = 0, _thisProps = thisProps; _i5 < _thisProps.length; _i5++) {
        var _thisProps$_i = _slicedToArray(_thisProps[_i5], 2), propertyName = _thisProps$_i[0], propertyValue = _thisProps$_i[1];
        if (otherProps.get(propertyName) === propertyValue)
          return !1;
      }
      return !0;
    }
    /**
     * Merges a PropertiesManager onto this one, letting the input win in the event that both PropertiesManagers have a value stored.
     *
     * @param other The PropertiesManager to be merged onto this one.
     * @returns A new PropertiesManager with stored values from both its parents.
     */
  }, {
    key: "merge",
    value: function(other) {
      var newGuy = new PropertiesManager2();
      return newGuy.properties = _objectSpread2(_objectSpread2({}, this.properties), other.properties), newGuy;
    }
    /**
     * Merges an arbitrary collection of PropertiesManagers, letting the rightmost PropertiesManager win in the event of verlap.
     *
     * @param mergees The PropertiesManagers to merge together.
     * @returns A PropertiesManager that is just an amalgam of all the constituents.
     */
  }], [{
    key: "merge",
    value: function() {
      for (var _len3 = arguments.length, mergees = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
        mergees[_key3] = arguments[_key3];
      return mergees.length === 0 ? new PropertiesManager2() : mergees.reduce(function(a, b) {
        return a.merge(b);
      });
    }
  }]), PropertiesManager2;
}();

// node_modules/libram/dist/template-string.js
init_kolmafia_polyfill();
var import_kolmafia4 = require("kolmafia");

// node_modules/libram/dist/utils.js
init_kolmafia_polyfill();
function _createForOfIteratorHelper2(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray3(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit2(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray3(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray3(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray3(o, minLen);
  }
}
function _iterableToArray(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray3(arr);
}
function _arrayLikeToArray3(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
function sum(addends, x) {
  return addends.reduce(function(subtotal, element) {
    return subtotal + (typeof x == "function" ? x(element) : element[x]);
  }, 0);
}
function sumNumbers(addends) {
  return sum(addends, function(x) {
    return x;
  });
}
function arrayContains(item6, array) {
  return array.includes(item6);
}
function setEqual(a, b) {
  var sortedA = _toConsumableArray(a).sort(), sortedB = _toConsumableArray(b).sort();
  return a.length === b.length && sortedA.every(function(item6, index) {
    return item6 === sortedB[index];
  });
}
function invertMap(map) {
  var returnValue = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper2(map), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _step$value = _slicedToArray2(_step.value, 2), key = _step$value[0], value = _step$value[1];
      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return returnValue;
}
function splitByCommasWithEscapes(str) {
  var returnValue = [], ignoreNext = !1, currentString = "", _iterator2 = _createForOfIteratorHelper2(str.split("")), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var char = _step2.value;
      char === "\\" ? ignoreNext = !0 : (char == "," && !ignoreNext ? (returnValue.push(currentString.trim()), currentString = "") : currentString += char, ignoreNext = !1);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return returnValue.push(currentString.trim()), returnValue;
}
function maxBy(array, optimizer) {
  var reverse = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!array.length)
    throw new Error("Cannot call maxBy on an empty array!");
  return typeof optimizer == "function" ? _toConsumableArray(array).reduce(function(_ref6, other) {
    var value = _ref6.value, item6 = _ref6.item, otherValue = optimizer(other);
    return value >= otherValue !== reverse ? {
      value: value,
      item: item6
    } : {
      value: otherValue,
      item: other
    };
  }, {
    item: array[0],
    value: optimizer(array[0])
  }).item : array.reduce(function(a, b) {
    return a[optimizer] >= b[optimizer] !== reverse ? a : b;
  });
}
function arrayEquals(left, right) {
  return left.length !== right.length ? !1 : left.every(function(element, index) {
    return element === right[index];
  });
}
function undelay(delayedObject) {
  return typeof delayedObject == "function" ? delayedObject() : delayedObject;
}
function makeByXFunction(source) {
  return function(options) {
    var _options$val, val = undelay(source);
    return "default" in options ? (_options$val = options[val]) !== null && _options$val !== void 0 ? _options$val : options.default : options[val];
  };
}
function flat(arr) {
  var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1 / 0, flatArray = [], _iterator3 = _createForOfIteratorHelper2(arr), _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var item6 = _step3.value;
      Array.isArray(item6) && depth > 0 ? flatArray = flatArray.concat(flat(item6, depth - 1)) : flatArray.push(item6);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return flatArray;
}

// node_modules/libram/dist/template-string.js
var concatTemplateString = function(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
    placeholders[_key - 1] = arguments[_key];
  return literals.raw.reduce(function(acc, literal, i) {
    var _placeholders$i;
    return acc + literal + ((_placeholders$i = placeholders[i]) !== null && _placeholders$i !== void 0 ? _placeholders$i : "");
  }, "");
}, handleTypeGetError = function(Type, error) {
  var message = "".concat(error), match = message.match(RegExp("Bad ".concat(Type.name.toLowerCase(), " value: .*")));
  match ? (0, import_kolmafia4.print)("".concat(match[0], "; if you're certain that this ").concat(Type.name, " exists and is spelled correctly, please update KoLMafia"), "red") : (0, import_kolmafia4.print)(message);
}, createSingleConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
      placeholders[_key2 - 1] = arguments[_key2];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    try {
      return Type.get(input);
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia4.abort)();
  };
  return tagFunction.none = Type.none, tagFunction;
}, createPluralConstant = function(Type) {
  var tagFunction = function(literals) {
    for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)
      placeholders[_key3 - 1] = arguments[_key3];
    var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
    if (input === "")
      return Type.all();
    try {
      return Type.get(splitByCommasWithEscapes(input));
    } catch (error) {
      handleTypeGetError(Type, error);
    }
    (0, import_kolmafia4.abort)();
  };
  return tagFunction.all = function() {
    return Type.all();
  }, tagFunction;
}, $bounty = createSingleConstant(import_kolmafia4.Bounty), $bounties = createPluralConstant(import_kolmafia4.Bounty), $class = createSingleConstant(import_kolmafia4.Class), $classes = createPluralConstant(import_kolmafia4.Class), $coinmaster = createSingleConstant(import_kolmafia4.Coinmaster), $coinmasters = createPluralConstant(import_kolmafia4.Coinmaster), $effect = createSingleConstant(import_kolmafia4.Effect), $effects = createPluralConstant(import_kolmafia4.Effect), $element = createSingleConstant(import_kolmafia4.Element), $elements = createPluralConstant(import_kolmafia4.Element), $familiar = createSingleConstant(import_kolmafia4.Familiar), $familiars = createPluralConstant(import_kolmafia4.Familiar), $item = createSingleConstant(import_kolmafia4.Item), $items = createPluralConstant(import_kolmafia4.Item), $location = createSingleConstant(import_kolmafia4.Location), $locations = createPluralConstant(import_kolmafia4.Location), $modifier = createSingleConstant(import_kolmafia4.Modifier), $modifiers = createPluralConstant(import_kolmafia4.Modifier), $monster = createSingleConstant(import_kolmafia4.Monster), $monsters = createPluralConstant(import_kolmafia4.Monster), $phylum = createSingleConstant(import_kolmafia4.Phylum), $phyla = createPluralConstant(import_kolmafia4.Phylum), $servant = createSingleConstant(import_kolmafia4.Servant), $servants = createPluralConstant(import_kolmafia4.Servant), $skill = createSingleConstant(import_kolmafia4.Skill), $skills = createPluralConstant(import_kolmafia4.Skill), $slot = createSingleConstant(import_kolmafia4.Slot), $slots = createPluralConstant(import_kolmafia4.Slot), $stat = createSingleConstant(import_kolmafia4.Stat), $stats = createPluralConstant(import_kolmafia4.Stat), $thrall = createSingleConstant(import_kolmafia4.Thrall), $thralls = createPluralConstant(import_kolmafia4.Thrall), $path = createSingleConstant(import_kolmafia4.Path), $paths = createPluralConstant(import_kolmafia4.Path);

// node_modules/libram/dist/lib.js
var _templateObject;
var _templateObject5, _templateObject6;
var _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34;
function _classCallCheck4(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _wrapNativeSuper(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper = function(Class6) {
    if (Class6 === null || !_isNativeFunction(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct(Class6, arguments, _getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, Class6);
  }, _wrapNativeSuper(Class5);
}
function _construct(Parent, args2, Class5) {
  return _isNativeReflectConstruct() ? _construct = Reflect.construct : _construct = function(Parent2, args3, Class6) {
    var a = [null];
    a.push.apply(a, args3);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf(instance, Class6.prototype), instance;
  }, _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  return _setPrototypeOf = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf(o);
}
function _slicedToArray3(arr, i) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray4(arr, i) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray4(o, minLen);
  }
}
function _arrayLikeToArray4(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit3(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function getSongLimit() {
  return 3 + ((0, import_kolmafia5.booleanModifier)("Four Songs") ? 1 : 0) + (0, import_kolmafia5.numericModifier)("Additional Song");
}
function isSong(skillOrEffect) {
  if (skillOrEffect instanceof import_kolmafia5.Effect && skillOrEffect.attributes.includes("song"))
    return !0;
  var skill = skillOrEffect instanceof import_kolmafia5.Effect ? (0, import_kolmafia5.toSkill)(skillOrEffect) : skillOrEffect;
  return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
}
function getActiveEffects() {
  return Object.keys((0, import_kolmafia5.myEffects)()).map(function(e) {
    return import_kolmafia5.Effect.get(e);
  });
}
function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
function getSongCount() {
  return getActiveSongs().length;
}
function have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if (thing instanceof import_kolmafia5.Effect)
    return (0, import_kolmafia5.haveEffect)(thing) >= quantity;
  if (thing instanceof import_kolmafia5.Familiar)
    return (0, import_kolmafia5.haveFamiliar)(thing);
  if (thing instanceof import_kolmafia5.Item)
    return (0, import_kolmafia5.availableAmount)(thing) >= quantity;
  if (thing instanceof import_kolmafia5.Servant)
    return (0, import_kolmafia5.haveServant)(thing);
  if (thing instanceof import_kolmafia5.Skill)
    return (0, import_kolmafia5.haveSkill)(thing);
  if (thing instanceof import_kolmafia5.Thrall) {
    var thrall = (0, import_kolmafia5.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }
  return !1;
}
function haveInCampground(item6) {
  return Object.keys((0, import_kolmafia5.getCampground)()).map(function(i) {
    return import_kolmafia5.Item.get(i);
  }).includes(item6);
}
var Wanderer;
(function(Wanderer2) {
  Wanderer2.Digitize = "Digitize Monster", Wanderer2.Enamorang = "Enamorang Monster", Wanderer2.Familiar = "Familiar", Wanderer2.Holiday = "Holiday Monster", Wanderer2.Kramco = "Kramco", Wanderer2.Nemesis = "Nemesis Assassin", Wanderer2.Portscan = "portscan.edu", Wanderer2.Romantic = "Romantic Monster", Wanderer2.Vote = "Vote Monster";
})(Wanderer || (Wanderer = {}));
var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
function getKramcoWandererChance() {
  var fights = get("_sausageFights"), lastFight = get("_lastSausageMonsterTurn"), totalTurns = (0, import_kolmafia5.totalTurnsPlayed)();
  if (fights < 1)
    return lastFight === totalTurns && (0, import_kolmafia5.myTurncount)() < 1 ? 0.5 : 1;
  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
function getFoldGroup(item6) {
  return Object.entries((0, import_kolmafia5.getRelated)(item6, "fold")).sort(function(_ref, _ref2) {
    var _ref3 = _slicedToArray3(_ref, 2), a = _ref3[1], _ref4 = _slicedToArray3(_ref2, 2), b = _ref4[1];
    return a - b;
  }).map(function(_ref5) {
    var _ref6 = _slicedToArray3(_ref5, 1), i = _ref6[0];
    return import_kolmafia5.Item.get(i);
  });
}
function getAverage(range) {
  var _range$match;
  if (range.indexOf("-") < 0)
    return Number(range);
  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"], _ref8 = _slicedToArray3(_ref7, 3), lower = _ref8[1], upper = _ref8[2];
  return (Number(lower) + Number(upper)) / 2;
}
function getAverageAdventures(item6) {
  return getAverage(item6.adventures);
}
function uneffect(effect2) {
  return (0, import_kolmafia5.cliExecute)("uneffect ".concat(effect2.name));
}
function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted")
    return -1;
  if (stringStep === "started")
    return 0;
  if (stringStep === "finished" || stringStep === "")
    return 999;
  if (stringStep.substring(0, 4) !== "step")
    throw new Error("Quest state parsing error.");
  return parseInt(stringStep.substring(4), 10);
}
var EnsureError = /* @__PURE__ */ function(_Error) {
  _inherits(EnsureError2, _Error);
  var _super = _createSuper(EnsureError2);
  function EnsureError2(cause, reason) {
    var _this;
    return _classCallCheck4(this, EnsureError2), _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!").concat(reason ? " ".concat(reason) : "")), _this.name = "Ensure Error", _this;
  }
  return EnsureError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  if ((0, import_kolmafia5.haveEffect)(ef) < turns) {
    if (ef.default === null)
      throw new EnsureError(ef, "No default action");
    if (!(0, import_kolmafia5.cliExecute)(ef.default) || (0, import_kolmafia5.haveEffect)(ef) === 0)
      throw new EnsureError(ef);
  }
}
var valueMap = /* @__PURE__ */ new Map(), MALL_VALUE_MODIFIER = 0.9;
function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  return items.map(function(item6) {
    return valueMap.has(item6) || (item6.discardable ? valueMap.set(item6, (0, import_kolmafia5.mallPrice)(item6) > Math.max(2 * (0, import_kolmafia5.autosellPrice)(item6), 100) ? MALL_VALUE_MODIFIER * (0, import_kolmafia5.mallPrice)(item6) : (0, import_kolmafia5.autosellPrice)(item6)) : valueMap.set(item6, (0, import_kolmafia5.mallPrice)(item6) > 100 ? MALL_VALUE_MODIFIER * (0, import_kolmafia5.mallPrice)(item6) : 0)), valueMap.get(item6) || 0;
  }).reduce(function(s, price2) {
    return s + price2;
  }, 0) / items.length;
}
function findLeprechaunMultiplier(familiar4) {
  if (familiar4 === $familiar(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Mutant Cactus Bud"]))))
    return (0, import_kolmafia5.numericModifier)(familiar4, "Leprechaun Effectiveness", 1, $item.none);
  if (familiar4 === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Reanimated Reanimator"]))))
    return 0;
  var meatBonus = (0, import_kolmafia5.numericModifier)(familiar4, "Meat Drop", 1, $item.none);
  return meatBonus === 0 ? 0 : Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = /* @__PURE__ */ new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return flat((0, import_kolmafia5.holiday)().split("/").map(function(holiday2) {
    var _holidayWanderers$get;
    return (_holidayWanderers$get = holidayWanderers.get(holiday2)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }));
}
var telescopeStats = /* @__PURE__ */ new Map([["standing around flexing their muscles and using grip exercisers", $stat(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Muscle"])))], ["sitting around playing chess and solving complicated-looking logic puzzles", $stat(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Mysticality"])))], ["all wearing sunglasses and dancing", $stat(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["Moxie"])))]]), telescopeElements = /* @__PURE__ */ new Map([["people, all of whom appear to be on fire", $element(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["hot"])))], ["people, surrounded by a cloud of eldritch mist", $element(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["spooky"])))], ["greasy-looking people furtively skulking around", $element(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["sleaze"])))], ["people, surrounded by garbage and clouds of flies", $element(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["stench"])))], ["people, clustered around a group of igloos", $element(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap1 = /* @__PURE__ */ new Map([["smoldering bushes on the outskirts of a hedge maze", $element(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["hot"])))], ["creepy-looking black bushes on the outskirts of a hedge maze", $element(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["spooky"])))], ["purplish, greasy-looking hedges", $element(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["sleaze"])))], ["nasty-looking, dripping green bushes on the outskirts of a hedge maze", $element(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["stench"])))], ["frost-rimed bushes on the outskirts of a hedge maze", $element(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap2 = /* @__PURE__ */ new Map([["smoke rising from deeper within the maze", $element(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["hot"])))], ["a miasma of eldritch vapors rising from deeper within the maze", $element(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["spooky"])))], ["a greasy purple cloud hanging over the center of the maze", $element(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["sleaze"])))], ["a cloud of green gas hovering over the maze", $element(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["stench"])))], ["wintry mists rising from deeper within the maze", $element(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["cold"])))]]), hedgeTrap3 = /* @__PURE__ */ new Map([["with lava slowly oozing out of it", $element(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hot"])))], ["surrounded by creepy black mist", $element(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["spooky"])))], ["that occasionally vomits out a greasy ball of hair", $element(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["sleaze"])))], ["disgorging a really surprising amount of sewage", $element(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["stench"])))], ["occasionally disgorging a bunch of ice cubes", $element(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["cold"])))]]);
var byStat = makeByXFunction(function() {
  return (0, import_kolmafia5.myPrimestat)().toString();
}), byClass = makeByXFunction(function() {
  return (0, import_kolmafia5.myClass)().toString();
});
function directlyUse(item6) {
  return (0, import_kolmafia5.visitUrl)("inv_use.php?which=3&whichitem=".concat(item6.id, "&pwd"));
}

// node_modules/libram/dist/overlappingNames.js
init_kolmafia_polyfill();
var overlappingItemNames = ["spider web", "really sticky spider web", "dictionary", "NG", "Cloaca-Cola", "yo-yo", "top", "ball", "kite", "yo", "red potion", "blue potion", "bowling ball", "adder", "red button", "pile of sand", "mushroom", "deluxe mushroom"], overlappingSkillNames = ["Shoot", "Thrust-Smack", "Headbutt", "Toss", "Knife in the Dark", "Sing", "Disarm", "LIGHT", "BURN", "Extract", "Meteor Shower", "Snipe", "Cleave", "Boil", "Slice", "Rainbow"];

// node_modules/libram/dist/combat.js
function _get(target, property, receiver) {
  return typeof Reflect != "undefined" && Reflect.get ? _get = Reflect.get : _get = function(target2, property2, receiver2) {
    var base = _superPropBase(target2, property2);
    if (base) {
      var desc = Object.getOwnPropertyDescriptor(base, property2);
      return desc.get ? desc.get.call(receiver2) : desc.value;
    }
  }, _get(target, property, receiver || target);
}
function _superPropBase(object, property) {
  for (; !Object.prototype.hasOwnProperty.call(object, property) && (object = _getPrototypeOf2(object), object !== null); )
    ;
  return object;
}
function _createForOfIteratorHelper3(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray5(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray5(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray5(o, minLen);
  }
}
function _iterableToArray2(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperties4(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass4(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties4(Constructor.prototype, protoProps), staticProps && _defineProperties4(Constructor, staticProps), Constructor;
}
function _defineProperty4(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _classCallCheck5(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _inherits2(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf2(subClass, superClass);
}
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn2(this, result);
  };
}
function _possibleConstructorReturn2(self, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized2(self);
}
function _assertThisInitialized2(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _wrapNativeSuper2(Class5) {
  var _cache = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _wrapNativeSuper2 = function(Class6) {
    if (Class6 === null || !_isNativeFunction2(Class6))
      return Class6;
    if (typeof Class6 != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof _cache != "undefined") {
      if (_cache.has(Class6))
        return _cache.get(Class6);
      _cache.set(Class6, Wrapper);
    }
    function Wrapper() {
      return _construct2(Class6, arguments, _getPrototypeOf2(this).constructor);
    }
    return Wrapper.prototype = Object.create(Class6.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf2(Wrapper, Class6);
  }, _wrapNativeSuper2(Class5);
}
function _construct2(Parent, args2, Class5) {
  return _isNativeReflectConstruct2() ? _construct2 = Reflect.construct : _construct2 = function(Parent2, args3, Class6) {
    var a = [null];
    a.push.apply(a, args3);
    var Constructor = Function.bind.apply(Parent2, a), instance = new Constructor();
    return Class6 && _setPrototypeOf2(instance, Class6.prototype), instance;
  }, _construct2.apply(null, arguments);
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _isNativeFunction2(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf2(o, p) {
  return _setPrototypeOf2 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf2(o, p);
}
function _getPrototypeOf2(o) {
  return _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf2(o);
}
var MACRO_NAME = "Script Autoattack Macro";
function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : MACRO_NAME, macroMatches = (0, import_kolmafia6.xpath)((0, import_kolmafia6.visitUrl)("account_combatmacros.php"), '//select[@name="macroid"]/option[text()="'.concat(name, '"]/@value'));
  if (macroMatches.length === 0) {
    (0, import_kolmafia6.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0, import_kolmafia6.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0, import_kolmafia6.xpath)(newMacroText, "//input[@name=".concat(name, "]/@value"))[0], 10);
  } else
    return parseInt(macroMatches[0], 10);
}
function itemOrNameToItem(itemOrName) {
  return typeof itemOrName == "string" ? import_kolmafia6.Item.get(itemOrName) : itemOrName;
}
function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems))
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  var item6 = itemOrNameToItem(itemOrItems);
  return overlappingItemNames.includes(item6.name) ? item6.id.toFixed(0) : item6.name;
}
function itemOrItemsBallsMacroPredicate(itemOrItems) {
  return Array.isArray(itemOrItems) ? itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ") : "hascombatitem ".concat(itemOrItems);
}
function skillOrNameToSkill(skillOrName) {
  return typeof skillOrName == "string" ? import_kolmafia6.Skill.get(skillOrName) : skillOrName;
}
function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !overlappingSkillNames.includes(skill.name) ? skill.name : skill.id;
}
var InvalidMacroError = /* @__PURE__ */ function(_Error) {
  _inherits2(InvalidMacroError2, _Error);
  var _super = _createSuper2(InvalidMacroError2);
  function InvalidMacroError2() {
    return _classCallCheck5(this, InvalidMacroError2), _super.apply(this, arguments);
  }
  return InvalidMacroError2;
}(/* @__PURE__ */ _wrapNativeSuper2(Error)), Macro = /* @__PURE__ */ function() {
  function Macro3() {
    _classCallCheck5(this, Macro3), _defineProperty4(this, "components", []), _defineProperty4(this, "name", MACRO_NAME);
  }
  return _createClass4(Macro3, [{
    key: "toString",
    value: (
      /**
       * Convert macro to string.
       *
       * @returns BALLS macro
       */
      function() {
        return (this.components.join(";") + ";").replace(/;;+/g, ";");
      }
    )
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     *
     * @param name The name to be used when saving as an autoattack.
     * @returns The macro in question
     */
  }, {
    key: "rename",
    value: function(name) {
      return this.name = name, this;
    }
    /**
     * Creates a new Macro with a name other than the default name.
     *
     * @param name The name to assign this macro.
     * @returns A new Macro with the assigned name.
     */
  }, {
    key: "save",
    value: (
      /**
       * Save a macro to a Mafia property for use in a consult script.
       */
      function() {
        _set(Macro3.SAVED_MACRO_PROPERTY, this.toString());
      }
    )
    /**
     * Load a saved macro from the Mafia property.
     *
     * @returns Loaded macro text
     */
  }, {
    key: "step",
    value: (
      /**
       * Statefully add one or several steps to a macro.
       *
       * @param nextSteps The steps to add to the macro.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _ref, _this$components, _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++)
          nextSteps[_key] = arguments[_key];
        var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray2(nextSteps.map(function(x) {
          return x instanceof Macro3 ? x.components : [x];
        })));
        return (_this$components = this.components).push.apply(_this$components, _toConsumableArray2(nextStepsStrings.filter(function(s) {
          return s.length > 0;
        }))), this;
      }
    )
    /**
     * Statefully add one or several steps to a macro.
     *
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "submit",
    value: (
      /**
       * Submit the built macro to KoL. Only works inside combat.
       *
       * @returns Contents of the fight page after macro submission
       */
      function() {
        var final = this.toString();
        return (0, import_kolmafia6.visitUrl)("fight.php?action=macro&macrotext=".concat((0, import_kolmafia6.urlEncode)(final)), !0, !0);
      }
    )
    /**
     * Set this macro as a KoL native autoattack.
     */
  }, {
    key: "setAutoAttack",
    value: function() {
      var id = Macro3.cachedMacroIds.get(this.name);
      id === void 0 && (id = getMacroId(this.name), Macro3.cachedMacroIds.set(this.name, id)), !((0, import_kolmafia6.getAutoAttack)() === 99e6 + id && this.toString() === Macro3.cachedAutoAttacks.get(this.name)) && ((0, import_kolmafia6.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0, import_kolmafia6.urlEncode)(this.name), "&macrotext=").concat((0, import_kolmafia6.urlEncode)(this.toString()), "&action=save"), !0, !0), (0, import_kolmafia6.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99e6 + id, "&ajax=1")), Macro3.cachedAutoAttacks.set(this.name, this.toString()));
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     *
     * @param name The name to save the macro under as an autoattack.
     */
  }, {
    key: "setAutoAttackAs",
    value: function(name) {
      this.name = name, this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */
  }, {
    key: "abort",
    value: (
      /**
       * Add an "abort" step to this macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("abort");
      }
    )
    /**
     * Create a new macro with an "abort" step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "abortWithWarning",
    value: (
      /**
       * Adds an "abort" step to this macro, with a warning message to print
       *
       * @param warning The warning message to print
       * @returns  {Macro} This object itself.
       */
      function(warning) {
        return this.step('abort "'.concat(warning, '"'));
      }
    )
    /**
     * Create a new macro with an "abort" step to this macro, with a warning message to print
     *
     * @param warning The warning message to print
     * @returns  {Macro} This object itself.
     */
  }, {
    key: "runaway",
    value: (
      /**
       * Add a "runaway" step to this macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("runaway");
      }
    )
    /**
     * Create a new macro with an "runaway" step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "if_",
    value: (
      /**
       * Add an "if" statement to this macro.
       *
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.step("if ".concat(Macro3.makeBALLSPredicate(condition))).step(ifTrue).step("endif");
      }
    )
    /**
     * Create a new macro with an "if" statement.
     *
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifNot",
    value: (
      /**
       * Add an "if" statement to this macro, inverting the condition.
       *
       * @param condition The BALLS condition for the if statement.
       * @param ifTrue Continuation if the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue) {
        return this.step("if !(".concat(Macro3.makeBALLSPredicate(condition), ")")).step(ifTrue).step("endif");
      }
    )
    /**
     * Create a new macro with an "if" statement, inverting the condition.
     *
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "while_",
    value: (
      /**
       * Add a "while" statement to this macro.
       *
       * @param condition The BALLS condition for the if statement.
       * @param contents Loop to repeat while the condition is true.
       * @returns {Macro} This object itself.
       */
      function(condition, contents) {
        return this.step("while ".concat(condition)).step(contents).step("endwhile");
      }
    )
    /**
     * Create a new macro with a "while" statement.
     *
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "externalIf",
    value: (
      /**
       * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
       *
       * @param condition The JS condition.
       * @param ifTrue Continuation to add if the condition is true.
       * @param ifFalse Optional input to turn this into an if...else statement.
       * @returns {Macro} This object itself.
       */
      function(condition, ifTrue, ifFalse) {
        return condition ? this.step(ifTrue) : ifFalse ? this.step(ifFalse) : this;
      }
    )
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     *
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "repeat",
    value: (
      /**
       * Add a repeat step to the macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("repeat");
      }
    )
    /**
     * Add one or more skill cast steps to the macro.
     *
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "skill",
    value: function() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        skills[_key2] = arguments[_key2];
      return this.step.apply(this, _toConsumableArray2(skills.map(function(skill2) {
        return "skill ".concat(skillBallsMacroName(skill2));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     *
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
          skills[_key3] = arguments[_key3];
        return this.step.apply(this, _toConsumableArray2(skills.map(function(skill) {
          return Macro3.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro3.skill(skill));
        })));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try repeatedly casting.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
          skills[_key4] = arguments[_key4];
        return this.step.apply(this, _toConsumableArray2(skills.map(function(skill) {
          return Macro3.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro3.skill(skill).repeat());
        })));
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       *
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)
          items[_key5] = arguments[_key5];
        return this.step.apply(this, _toConsumableArray2(items.map(function(itemOrItems) {
          return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps.
     *
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       *
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {Macro} This object itself.
       */
      function() {
        for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)
          items[_key6] = arguments[_key6];
        return this.step.apply(this, _toConsumableArray2(items.map(function(item6) {
          return Macro3.if_(itemOrItemsBallsMacroPredicate(item6), "use ".concat(itemOrItemsBallsMacroName(item6)));
        })));
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     *
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
  }, {
    key: "attack",
    value: (
      /**
       * Add an attack step to the macro.
       *
       * @returns {Macro} This object itself.
       */
      function() {
        return this.step("attack");
      }
    )
    /**
     * Create a new macro with an attack step.
     *
     * @returns {Macro} This object itself.
     */
  }, {
    key: "ifHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
       *
       * @param macro The macro to place in the if_ statement
       * @returns This macro with supplied macro wapped in if statement matching holiday wanderers
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this : this.if_(todaysWanderers.map(function(monster) {
          return "monsterid ".concat(monster.id);
        }).join(" || "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     *
     * @param macro The macro to place inside the if_ statement
     * @returns New macro with supplied macro wrapped in if statement matching holiday wanderers
     */
  }, {
    key: "ifNotHolidayWanderer",
    value: (
      /**
       * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
       *
       * @param macro The macro to place in the if_ statement.
       * @returns This macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
       */
      function(macro) {
        var todaysWanderers = getTodaysHolidayWanderers();
        return todaysWanderers.length === 0 ? this.step(macro) : this.if_(todaysWanderers.map(function(monster) {
          return "!monsterid ".concat(monster.id);
        }).join(" && "), macro);
      }
    )
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     *
     * @param macro The macro to place inside the if_ statement
     * @returns New macro with supplied macro wrapped in if statement matching monsters that are not holiday wanderers
     */
  }], [{
    key: "rename",
    value: function(name) {
      return new this().rename(name);
    }
  }, {
    key: "load",
    value: function() {
      var _this;
      return (_this = new this()).step.apply(_this, _toConsumableArray2(get(Macro3.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */
  }, {
    key: "clearSaved",
    value: function() {
      (0, import_kolmafia6.removeProperty)(Macro3.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function() {
      var _this2;
      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function() {
      var _iterator = _createForOfIteratorHelper3(Macro3.cachedAutoAttacks.keys()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _Macro$cachedMacroIds, name = _step.value, id = (_Macro$cachedMacroIds = Macro3.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0, import_kolmafia6.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1")), Macro3.cachedAutoAttacks.delete(name), Macro3.cachedMacroIds.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function() {
      return new this().abort();
    }
  }, {
    key: "abortWithWarning",
    value: function(warning) {
      return new this().abortWithWarning(warning);
    }
  }, {
    key: "runaway",
    value: function() {
      return new this().runaway();
    }
  }, {
    key: "makeBALLSPredicate",
    value: function(condition) {
      var ballsCondition = "";
      if (condition instanceof import_kolmafia6.Monster)
        ballsCondition = "monsterid ".concat(condition.id);
      else if (condition instanceof Array)
        ballsCondition = condition.map(function(mon) {
          return "monsterid ".concat(mon.id);
        }).join(" || "), ballsCondition = "(".concat(ballsCondition, ")");
      else if (condition instanceof import_kolmafia6.Effect)
        ballsCondition = "haseffect ".concat(condition.id);
      else if (condition instanceof import_kolmafia6.Skill)
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      else if (condition instanceof import_kolmafia6.Item) {
        if (!condition.combat)
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof import_kolmafia6.Location) {
        var snarfblat = condition.id;
        if (snarfblat < 1)
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof import_kolmafia6.Class) {
        if (condition.id > 6)
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else
        condition instanceof import_kolmafia6.Stat ? ballsCondition = "".concat(condition.toString().toLowerCase(), "class") : ballsCondition = condition;
      return ballsCondition;
    }
  }, {
    key: "if_",
    value: function(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "ifNot",
    value: function(condition, ifTrue) {
      return new this().ifNot(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function() {
      var _this3;
      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this4;
      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this5;
      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this6;
      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this7;
      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]), Macro3;
}();
_defineProperty4(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");
_defineProperty4(Macro, "cachedMacroIds", /* @__PURE__ */ new Map());
_defineProperty4(Macro, "cachedAutoAttacks", /* @__PURE__ */ new Map());
var StrictMacro = /* @__PURE__ */ function(_Macro) {
  _inherits2(StrictMacro2, _Macro);
  var _super2 = _createSuper2(StrictMacro2);
  function StrictMacro2() {
    return _classCallCheck5(this, StrictMacro2), _super2.apply(this, arguments);
  }
  return _createClass4(StrictMacro2, [{
    key: "skill",
    value: (
      /**
       * Add one or more skill cast steps to the macro.
       *
       * @param skills Skills to cast.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get22, _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)
          skills[_key7] = arguments[_key7];
        return (_get22 = _get(_getPrototypeOf2(StrictMacro2.prototype), "skill", this)).call.apply(_get22, [this].concat(skills));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps.
     *
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "item",
    value: (
      /**
       * Add one or more item steps to the macro.
       *
       * @param items Items to use. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get3, _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)
          items[_key8] = arguments[_key8];
        return (_get3 = _get(_getPrototypeOf2(StrictMacro2.prototype), "item", this)).call.apply(_get3, [this].concat(items));
      }
    )
    /**
     * Create a new macro with one or more item steps.
     *
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkill",
    value: (
      /**
       * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get4, _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)
          skills[_key9] = arguments[_key9];
        return (_get4 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
      }
    )
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "tryItem",
    value: (
      /**
       * Add one or more item steps to the macro, where each step checks to see if you have the item first.
       *
       * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get5, _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++)
          items[_key10] = arguments[_key10];
        return (_get5 = _get(_getPrototypeOf2(StrictMacro2.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
      }
    )
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     *
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
  }, {
    key: "trySkillRepeat",
    value: (
      /**
       * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
       *
       * @param skills Skills to try repeatedly casting.
       * @returns {StrictMacro} This object itself.
       */
      function() {
        for (var _get6, _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++)
          skills[_key11] = arguments[_key11];
        return (_get6 = _get(_getPrototypeOf2(StrictMacro2.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
      }
    )
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     *
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
  }], [{
    key: "skill",
    value: function() {
      var _this8;
      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function() {
      var _this9;
      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function() {
      var _this10;
      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function() {
      var _this11;
      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function() {
      var _this12;
      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]), StrictMacro2;
}(Macro);

// node_modules/libram/dist/maximize.js
init_kolmafia_polyfill();
var import_kolmafia7 = require("kolmafia");
var _templateObject2, _templateObject210, _templateObject3, _templateObject4, _templateObject52, _templateObject62, _templateObject7, _templateObject8, _templateObject92, _templateObject102, _templateObject112, _templateObject122, _templateObject132, _templateObject142, _templateObject152, _templateObject162, _templateObject172, _templateObject182, _templateObject192, _templateObject202, _templateObject212, _templateObject222, _templateObject232, _templateObject242, _templateObject252, _templateObject262, _templateObject272, _templateObject282, _templateObject292, _templateObject302, _templateObject312, _templateObject322, _templateObject332, _templateObject342, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48;
function _slicedToArray4(arr, i) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray6(arr, i) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit4(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _defineProperties5(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass5(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties5(Constructor.prototype, protoProps), staticProps && _defineProperties5(Constructor, staticProps), Constructor;
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _classCallCheck6(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _createForOfIteratorHelper4(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray6(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral2(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), !0).forEach(function(key) {
      _defineProperty5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty5(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray6(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray6(o, minLen);
  }
}
function _iterableToArray3(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function toMaximizerName(_ref) {
  var name = _ref.name, id = _ref.id;
  return name.includes(";") ? "\xB6".concat(id) : name;
}
function mergeMaximizeOptions(defaultOptions, addendums) {
  var _addendums$updateOnFa, _addendums$updateOnCa, _addendums$useOutfitC, _addendums$forceEquip, _addendums$preventEqu, _addendums$bonusEquip, _addendums$onlySlot, _addendums$preventSlo, _addendums$forceUpdat, _addendums$modes;
  return {
    updateOnFamiliarChange: (_addendums$updateOnFa = addendums.updateOnFamiliarChange) !== null && _addendums$updateOnFa !== void 0 ? _addendums$updateOnFa : defaultOptions.updateOnFamiliarChange,
    updateOnCanEquipChanged: (_addendums$updateOnCa = addendums.updateOnCanEquipChanged) !== null && _addendums$updateOnCa !== void 0 ? _addendums$updateOnCa : defaultOptions.updateOnCanEquipChanged,
    useOutfitCaching: (_addendums$useOutfitC = addendums.useOutfitCaching) !== null && _addendums$useOutfitC !== void 0 ? _addendums$useOutfitC : defaultOptions.useOutfitCaching,
    forceEquip: [].concat(_toConsumableArray3(defaultOptions.forceEquip), _toConsumableArray3((_addendums$forceEquip = addendums.forceEquip) !== null && _addendums$forceEquip !== void 0 ? _addendums$forceEquip : [])),
    preventEquip: [].concat(_toConsumableArray3(defaultOptions.preventEquip), _toConsumableArray3((_addendums$preventEqu = addendums.preventEquip) !== null && _addendums$preventEqu !== void 0 ? _addendums$preventEqu : [])).filter(function(item6) {
      var _addendums$forceEquip2;
      return !defaultOptions.forceEquip.includes(item6) && !((_addendums$forceEquip2 = addendums.forceEquip) !== null && _addendums$forceEquip2 !== void 0 && _addendums$forceEquip2.includes(item6));
    }),
    bonusEquip: new Map([].concat(_toConsumableArray3(defaultOptions.bonusEquip), _toConsumableArray3((_addendums$bonusEquip = addendums.bonusEquip) !== null && _addendums$bonusEquip !== void 0 ? _addendums$bonusEquip : []))),
    onlySlot: (_addendums$onlySlot = addendums.onlySlot) !== null && _addendums$onlySlot !== void 0 ? _addendums$onlySlot : defaultOptions.onlySlot,
    preventSlot: [].concat(_toConsumableArray3(defaultOptions.preventSlot), _toConsumableArray3((_addendums$preventSlo = addendums.preventSlot) !== null && _addendums$preventSlo !== void 0 ? _addendums$preventSlo : [])),
    forceUpdate: (_addendums$forceUpdat = addendums.forceUpdate) !== null && _addendums$forceUpdat !== void 0 ? _addendums$forceUpdat : defaultOptions.forceUpdate,
    modes: _objectSpread3(_objectSpread3({}, defaultOptions.modes), (_addendums$modes = addendums.modes) !== null && _addendums$modes !== void 0 ? _addendums$modes : {})
  };
}
var defaultMaximizeOptions = {
  updateOnFamiliarChange: !0,
  updateOnCanEquipChanged: !0,
  useOutfitCaching: !0,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: /* @__PURE__ */ new Map(),
  onlySlot: [],
  preventSlot: [],
  forceUpdate: !1,
  modes: {}
};
var modeableCommands = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"], modeableItems = {
  backupcamera: $item(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral2(["backup camera"]))),
  umbrella: $item(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral2(["unbreakable umbrella"]))),
  snowsuit: $item(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral2(["Snow Suit"]))),
  edpiece: $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral2(["The Crown of Ed the Undying"]))),
  retrocape: $item(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral2(["unwrapped knock-off retro superhero cape"]))),
  parka: $item(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral2(["Jurassic Parka"])))
}, modeableState = {
  backupcamera: function() {
    return (0, import_kolmafia7.getProperty)("backupCameraMode");
  },
  umbrella: function() {
    return (0, import_kolmafia7.getProperty)("umbrellaState");
  },
  snowsuit: function() {
    return (0, import_kolmafia7.getProperty)("snowsuit");
  },
  edpiece: function() {
    return (0, import_kolmafia7.getProperty)("edPiece");
  },
  retrocape: function() {
    return (0, import_kolmafia7.getProperty)("retroCapeSuperhero") + " " + (0, import_kolmafia7.getProperty)("retroCapeWashingInstructions");
  },
  parka: function() {
    return (0, import_kolmafia7.getProperty)("parkaMode");
  }
};
function getCurrentModes() {
  var modes = {}, _iterator = _createForOfIteratorHelper4(modeableCommands), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var key = _step.value;
      (0, import_kolmafia7.haveEquipped)(modeableItems[key]) && (modes[key] = modeableState[key]());
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return modes;
}
function applyModes(modes) {
  var _iterator2 = _createForOfIteratorHelper4(modeableCommands), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var command = _step2.value;
      (0, import_kolmafia7.haveEquipped)(modeableItems[command]) && modes[command] !== void 0 && modeableState[command]() !== modes[command] && (0, import_kolmafia7.cliExecute)(command + " " + modes[command]);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
var cachedSlots = $slots(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral2(["hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar"]))), CacheEntry = function CacheEntry2(equipment, rider, familiar4, canEquipItemCount2, modes) {
  _classCallCheck6(this, CacheEntry2), _defineProperty5(this, "equipment", void 0), _defineProperty5(this, "rider", void 0), _defineProperty5(this, "familiar", void 0), _defineProperty5(this, "canEquipItemCount", void 0), _defineProperty5(this, "modes", void 0), this.equipment = equipment, this.rider = rider, this.familiar = familiar4, this.canEquipItemCount = canEquipItemCount2, this.modes = modes;
}, _outfitSlots = /* @__PURE__ */ new WeakMap(), _useHistory = /* @__PURE__ */ new WeakMap(), _maxSize = /* @__PURE__ */ new WeakMap(), OutfitLRUCache = /* @__PURE__ */ function() {
  function OutfitLRUCache2(maxSize) {
    _classCallCheck6(this, OutfitLRUCache2), _outfitSlots.set(this, {
      writable: !0,
      value: []
    }), _useHistory.set(this, {
      writable: !0,
      value: []
    }), _maxSize.set(this, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maxSize, maxSize);
  }
  return _createClass5(OutfitLRUCache2, [{
    key: "checkConsistent",
    value: function() {
      if (_classPrivateFieldGet(this, _useHistory).length !== _classPrivateFieldGet(this, _outfitSlots).length || !_toConsumableArray3(_classPrivateFieldGet(this, _useHistory)).sort().every(function(value, index) {
        return value === index;
      }))
        throw new Error("Outfit cache consistency failed.");
    }
  }, {
    key: "promote",
    value: function(index) {
      _classPrivateFieldSet(this, _useHistory, [index].concat(_toConsumableArray3(_classPrivateFieldGet(this, _useHistory).filter(function(i) {
        return i !== index;
      })))), this.checkConsistent();
    }
  }, {
    key: "get",
    value: function(key) {
      var index = _classPrivateFieldGet(this, _outfitSlots).indexOf(key);
      if (!(index < 0))
        return this.promote(index), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
    }
  }, {
    key: "insert",
    value: function(key) {
      var lastUseIndex = void 0;
      if (_classPrivateFieldGet(this, _outfitSlots).length >= _classPrivateFieldGet(this, _maxSize)) {
        if (lastUseIndex = _classPrivateFieldGet(this, _useHistory).pop(), lastUseIndex === void 0)
          throw new Error("Outfit cache consistency failed.");
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, lastUseIndex), _classPrivateFieldGet(this, _outfitSlots)[lastUseIndex] = key, this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(lastUseIndex);
      } else {
        var index = _classPrivateFieldGet(this, _outfitSlots).push(key) - 1;
        return _classPrivateFieldGet(this, _useHistory).splice(0, 0, index), this.checkConsistent(), "".concat(OutfitLRUCache2.OUTFIT_PREFIX, " ").concat(index);
      }
    }
  }, {
    key: "clear",
    value: function() {
      _classPrivateFieldSet(this, _outfitSlots, []), _classPrivateFieldSet(this, _useHistory, []);
    }
  }]), OutfitLRUCache2;
}();
_defineProperty5(OutfitLRUCache, "OUTFIT_PREFIX", "Script Outfit");
function saveOutfit(name) {
  (0, import_kolmafia7.cliExecute)("outfit save ".concat(name));
}
var cachedObjectives = {}, outfitCache = new OutfitLRUCache(6), cachedStats = [0, 0, 0], cachedCanEquipItemCount = 0;
function canEquipItemCount() {
  var stats = $stats(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral2(["Muscle, Mysticality, Moxie"]))).map(function(stat) {
    return Math.min((0, import_kolmafia7.myBasestat)(stat), 300);
  });
  return stats.every(function(value, index) {
    return value === cachedStats[index];
  }) || (cachedStats = stats, cachedCanEquipItemCount = import_kolmafia7.Item.all().filter(function(item6) {
    return (0, import_kolmafia7.canEquip)(item6);
  }).length), cachedCanEquipItemCount;
}
function checkCache(cacheKey, options) {
  var entry = cachedObjectives[cacheKey];
  return entry ? options.updateOnFamiliarChange && (0, import_kolmafia7.myFamiliar)() !== entry.familiar ? (logger_default.warning("Equipment found in maximize cache but familiar is different."), null) : options.updateOnCanEquipChanged && entry.canEquipItemCount !== canEquipItemCount() ? (logger_default.warning("Equipment found in maximize cache but equippable item list is out of date."), null) : entry : null;
}
function applyCached(entry, options) {
  var outfitName = options.useOutfitCaching ? outfitCache.get(entry) : void 0;
  if (outfitName) {
    (0, import_kolmafia7.isWearingOutfit)(outfitName) || (0, import_kolmafia7.outfit)(outfitName);
    var familiarEquip = entry.equipment.get($slot(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral2(["familiar"]))));
    familiarEquip && (0, import_kolmafia7.equip)($slot(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral2(["familiar"]))), familiarEquip);
  } else {
    var _iterator3 = _createForOfIteratorHelper4(entry.equipment), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _step3$value = _slicedToArray4(_step3.value, 2), slot = _step3$value[0], item6 = _step3$value[1];
        (0, import_kolmafia7.equippedItem)(slot) !== item6 && (0, import_kolmafia7.availableAmount)(item6) > 0 && (0, import_kolmafia7.equip)(slot, item6);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (verifyCached(entry) && options.useOutfitCaching) {
      var _outfitName = outfitCache.insert(entry);
      logger_default.info("Saving equipment to outfit ".concat(_outfitName, ".")), saveOutfit(_outfitName);
    }
  }
  (0, import_kolmafia7.equippedAmount)($item(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral2(["Crown of Thrones"])))) && (0, import_kolmafia7.enthroneFamiliar)(entry.rider.get($item(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral2(["Crown of Thrones"])))) || $familiar.none), (0, import_kolmafia7.equippedAmount)($item(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) && (0, import_kolmafia7.bjornifyFamiliar)(entry.rider.get($item(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) || $familiar.none), applyModes(_objectSpread3(_objectSpread3({}, entry.modes), options.modes));
}
var slotStructure = [$slots(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral2(["hat"]))), $slots(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral2(["back"]))), $slots(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral2(["shirt"]))), $slots(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral2(["weapon, off-hand"]))), $slots(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral2(["pants"]))), $slots(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral2(["acc1, acc2, acc3"]))), $slots(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral2(["familiar"])))];
function verifyCached(entry) {
  var warn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, success = !0, _iterator4 = _createForOfIteratorHelper4(slotStructure), _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      var slotGroup = _step4.value, desiredSlots = slotGroup.map(function(slot) {
        var _entry$equipment$get;
        return [slot, (_entry$equipment$get = entry.equipment.get(slot)) !== null && _entry$equipment$get !== void 0 ? _entry$equipment$get : null];
      }).filter(function(_ref2) {
        var _ref3 = _slicedToArray4(_ref2, 2), item6 = _ref3[1];
        return item6 !== null;
      }), desiredSet = desiredSlots.map(function(_ref4) {
        var _ref5 = _slicedToArray4(_ref4, 2), item6 = _ref5[1];
        return item6;
      }), equippedSet = desiredSlots.map(function(_ref6) {
        var _ref7 = _slicedToArray4(_ref6, 1), slot = _ref7[0];
        return (0, import_kolmafia7.equippedItem)(slot);
      });
      setEqual(desiredSet, equippedSet) || (warn && logger_default.warning("Failed to apply cached ".concat(desiredSet.join(", "), " in ").concat(slotGroup.join(", "), ".")), success = !1);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return (0, import_kolmafia7.equippedAmount)($item(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && entry.rider.get($item(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral2(["Crown of Thrones"])))) && entry.rider.get($item(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral2(["Crown of Thrones"])))) !== (0, import_kolmafia7.myEnthronedFamiliar)() && (warn && logger_default.warning("Failed to apply ".concat(entry.rider.get($item(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral2(["Crown of Thrones"])))), " in ").concat($item(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral2(["Crown of Thrones"]))), ".")), success = !1), (0, import_kolmafia7.equippedAmount)($item(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && entry.rider.get($item(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) && entry.rider.get($item(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) !== (0, import_kolmafia7.myBjornedFamiliar)() && (warn && logger_default.warning("Failed to apply".concat(entry.rider.get($item(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), " in ").concat($item(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral2(["Buddy Bjorn"]))), ".")), success = !1), success;
}
function saveCached(cacheKey, options) {
  var equipment = /* @__PURE__ */ new Map(), rider = /* @__PURE__ */ new Map(), _iterator5 = _createForOfIteratorHelper4(cachedSlots), _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var _slot2 = _step5.value;
      equipment.set(_slot2, (0, import_kolmafia7.equippedItem)(_slot2));
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
  if ((0, import_kolmafia7.equippedAmount)($item(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral2(["card sleeve"])))) > 0 && equipment.set($slot(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral2(["card-sleeve"]))), (0, import_kolmafia7.equippedItem)($slot(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral2(["card-sleeve"]))))), (0, import_kolmafia7.equippedAmount)($item(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral2(["Crown of Thrones"])))) > 0 && rider.set($item(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral2(["Crown of Thrones"]))), (0, import_kolmafia7.myEnthronedFamiliar)()), (0, import_kolmafia7.equippedAmount)($item(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral2(["Buddy Bjorn"])))) > 0 && rider.set($item(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral2(["Buddy Bjorn"]))), (0, import_kolmafia7.myBjornedFamiliar)()), options.preventSlot && options.preventSlot.length > 0) {
    var _iterator6 = _createForOfIteratorHelper4(options.preventSlot), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var slot = _step6.value;
        equipment.delete(slot);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    options.preventSlot.includes($slot(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral2(["buddy-bjorn"])))) && rider.delete($item(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), options.preventSlot.includes($slot(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral2(["crown-of-thrones"])))) && rider.delete($item(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral2(["Crown of Thrones"]))));
  }
  if (options.onlySlot && options.onlySlot.length > 0) {
    var _iterator7 = _createForOfIteratorHelper4(import_kolmafia7.Slot.all()), _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        var _slot = _step7.value;
        options.onlySlot.includes(_slot) || equipment.delete(_slot);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    options.onlySlot.includes($slot(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral2(["buddy-bjorn"])))) || rider.delete($item(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral2(["Buddy Bjorn"])))), options.onlySlot.includes($slot(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral2(["crown-of-thrones"])))) || rider.delete($item(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral2(["Crown of Thrones"]))));
  }
  var entry = new CacheEntry(equipment, rider, (0, import_kolmafia7.myFamiliar)(), canEquipItemCount(), _objectSpread3(_objectSpread3({}, getCurrentModes()), options.modes));
  if (cachedObjectives[cacheKey] = entry, options.useOutfitCaching) {
    var outfitName = outfitCache.insert(entry);
    logger_default.info("Saving equipment to outfit ".concat(outfitName, ".")), saveOutfit(outfitName);
  }
}
function maximizeCached(objectives) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options), forceEquip = fullOptions.forceEquip, preventEquip = fullOptions.preventEquip, bonusEquip = fullOptions.bonusEquip, onlySlot = fullOptions.onlySlot, preventSlot = fullOptions.preventSlot, forceUpdate = fullOptions.forceUpdate, objective = _toConsumableArray3(new Set([].concat(_toConsumableArray3(objectives.sort()), _toConsumableArray3(forceEquip.map(function(item6) {
    return '"equip '.concat(toMaximizerName(item6), '"');
  }).sort()), _toConsumableArray3(preventEquip.map(function(item6) {
    return '-"equip '.concat(toMaximizerName(item6), '"');
  }).sort()), _toConsumableArray3(onlySlot.map(function(slot) {
    return "".concat(slot);
  }).sort()), _toConsumableArray3(preventSlot.map(function(slot) {
    return "-".concat(slot);
  }).sort()), _toConsumableArray3(Array.from(bonusEquip.entries()).filter(function(_ref8) {
    var _ref9 = _slicedToArray4(_ref8, 2), bonus = _ref9[1];
    return bonus !== 0;
  }).map(function(_ref10) {
    var _ref11 = _slicedToArray4(_ref10, 2), item6 = _ref11[0], bonus = _ref11[1];
    return "".concat(Math.round(bonus * 100) / 100, ' "bonus ').concat(toMaximizerName(item6), '"');
  }).sort())))).join(", "), untouchedSlots = cachedSlots.filter(function(slot) {
    return preventSlot.includes(slot) || onlySlot.length > 0 && !onlySlot.includes(slot);
  }), cacheKey = [objective].concat(_toConsumableArray3(untouchedSlots.map(function(slot) {
    return "".concat(slot, ":").concat((0, import_kolmafia7.equippedItem)(slot));
  }).sort())).join("; "), cacheEntry = checkCache(cacheKey, fullOptions);
  if (cacheEntry && !forceUpdate) {
    if (verifyCached(cacheEntry, !1))
      return !0;
    if (logger_default.info("Equipment found in maximize cache, equipping..."), applyCached(cacheEntry, fullOptions), verifyCached(cacheEntry))
      return logger_default.info("Equipped cached ".concat(cacheKey)), !0;
    logger_default.warning("Maximize cache application failed, maximizing...");
  }
  var result = (0, import_kolmafia7.maximize)(objective, !1);
  return saveCached(cacheKey, fullOptions), result;
}
var _maximizeParameters = /* @__PURE__ */ new WeakMap(), _maximizeOptions = /* @__PURE__ */ new WeakMap(), Requirement = /* @__PURE__ */ function() {
  function Requirement2(maximizeParameters, maximizeOptions) {
    _classCallCheck6(this, Requirement2), _maximizeParameters.set(this, {
      writable: !0,
      value: void 0
    }), _maximizeOptions.set(this, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _maximizeParameters, maximizeParameters), _classPrivateFieldSet(this, _maximizeOptions, maximizeOptions);
  }
  return _createClass5(Requirement2, [{
    key: "maximizeParameters",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeParameters);
    }
  }, {
    key: "maximizeOptions",
    get: function() {
      return _classPrivateFieldGet(this, _maximizeOptions);
    }
    /**
     * Merges two requirements, concanating relevant arrays. Typically used in static form.
     *
     * @param other Requirement to merge with.
     */
  }, {
    key: "merge",
    value: function(other) {
      var _optionsA$forceEquip, _other$maximizeOption, _optionsA$preventEqui, _other$maximizeOption3, _optionsA$bonusEquip$, _optionsA$bonusEquip, _optionsB$bonusEquip$, _optionsB$bonusEquip, _optionsA$onlySlot, _optionsB$onlySlot, _optionsA$preventSlot, _optionsB$preventSlot, optionsA = this.maximizeOptions, optionsB = other.maximizeOptions;
      return new Requirement2([].concat(_toConsumableArray3(this.maximizeParameters), _toConsumableArray3(other.maximizeParameters)), {
        updateOnFamiliarChange: optionsA.updateOnFamiliarChange || other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged: optionsA.updateOnCanEquipChanged || other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [].concat(_toConsumableArray3((_optionsA$forceEquip = optionsA.forceEquip) !== null && _optionsA$forceEquip !== void 0 ? _optionsA$forceEquip : []), _toConsumableArray3((_other$maximizeOption = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption !== void 0 ? _other$maximizeOption : [])).filter(function(x) {
          var _other$maximizeOption2;
          return !((_other$maximizeOption2 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption2 !== void 0 && _other$maximizeOption2.includes(x));
        }),
        preventEquip: [].concat(_toConsumableArray3((_optionsA$preventEqui = optionsA.preventEquip) !== null && _optionsA$preventEqui !== void 0 ? _optionsA$preventEqui : []), _toConsumableArray3((_other$maximizeOption3 = other.maximizeOptions.preventEquip) !== null && _other$maximizeOption3 !== void 0 ? _other$maximizeOption3 : [])).filter(function(x) {
          var _other$maximizeOption4;
          return !((_other$maximizeOption4 = other.maximizeOptions.forceEquip) !== null && _other$maximizeOption4 !== void 0 && _other$maximizeOption4.includes(x));
        }),
        bonusEquip: new Map([].concat(_toConsumableArray3((_optionsA$bonusEquip$ = (_optionsA$bonusEquip = optionsA.bonusEquip) === null || _optionsA$bonusEquip === void 0 ? void 0 : _optionsA$bonusEquip.entries()) !== null && _optionsA$bonusEquip$ !== void 0 ? _optionsA$bonusEquip$ : []), _toConsumableArray3((_optionsB$bonusEquip$ = (_optionsB$bonusEquip = optionsB.bonusEquip) === null || _optionsB$bonusEquip === void 0 ? void 0 : _optionsB$bonusEquip.entries()) !== null && _optionsB$bonusEquip$ !== void 0 ? _optionsB$bonusEquip$ : []))),
        onlySlot: [].concat(_toConsumableArray3((_optionsA$onlySlot = optionsA.onlySlot) !== null && _optionsA$onlySlot !== void 0 ? _optionsA$onlySlot : []), _toConsumableArray3((_optionsB$onlySlot = optionsB.onlySlot) !== null && _optionsB$onlySlot !== void 0 ? _optionsB$onlySlot : [])),
        preventSlot: [].concat(_toConsumableArray3((_optionsA$preventSlot = optionsA.preventSlot) !== null && _optionsA$preventSlot !== void 0 ? _optionsA$preventSlot : []), _toConsumableArray3((_optionsB$preventSlot = optionsB.preventSlot) !== null && _optionsB$preventSlot !== void 0 ? _optionsB$preventSlot : [])),
        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate
      });
    }
    /**
     * Merges a set of requirements together, starting with an empty requirement.
     *
     * @param allRequirements Requirements to merge
     * @returns Merged requirements
     */
  }, {
    key: "maximize",
    value: (
      /**
       * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
       *
       * @returns Whether the maximize call succeeded.
       */
      function() {
        return maximizeCached(this.maximizeParameters, this.maximizeOptions);
      }
    )
    /**
     * Merges requirements, and then runs maximizeCached on the combined requirement.
     *
     * @param requirements Requirements to maximize on
     */
  }], [{
    key: "merge",
    value: function(allRequirements) {
      return allRequirements.reduce(function(x, y) {
        return x.merge(y);
      }, new Requirement2([], {}));
    }
  }, {
    key: "maximize",
    value: function() {
      for (var _len = arguments.length, requirements = new Array(_len), _key = 0; _key < _len; _key++)
        requirements[_key] = arguments[_key];
      Requirement2.merge(requirements).maximize();
    }
  }]), Requirement2;
}();

// node_modules/libram/dist/actions/ActionSource.js
function _classCallCheck7(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties6(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass6(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties6(Constructor.prototype, protoProps), staticProps && _defineProperties6(Constructor, staticProps), Constructor;
}
function _defineProperty6(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper5(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray7(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray7(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray7(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray7(o, minLen);
  }
}
function _iterableToArray4(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray7(arr);
}
function _arrayLikeToArray7(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mergeConstraints() {
  for (var _len = arguments.length, allConstraints = new Array(_len), _key = 0; _key < _len; _key++)
    allConstraints[_key] = arguments[_key];
  var familiars = allConstraints.map(function(constraints) {
    return constraints.familiar;
  }).filter(function(familiar4) {
    return familiar4;
  });
  return familiars.length > 1 ? null : {
    equipmentRequirements: function() {
      return Requirement.merge(_toConsumableArray4(allConstraints.map(function(constraints) {
        var _constraints$equipmen, _constraints$equipmen2;
        return (_constraints$equipmen = (_constraints$equipmen2 = constraints.equipmentRequirements) === null || _constraints$equipmen2 === void 0 ? void 0 : _constraints$equipmen2.call(constraints)) !== null && _constraints$equipmen !== void 0 ? _constraints$equipmen : new Requirement([], {});
      })));
    },
    preparation: function() {
      var success = !0, _iterator = _createForOfIteratorHelper5(allConstraints), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var constraints = _step.value;
          success = success && (!constraints.preparation || constraints.preparation());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return success;
    },
    familiar: familiars.find(function(familiar4) {
      return familiar4;
    }),
    cost: function() {
      return sum(allConstraints, function(constraints) {
        var _constraints$cost, _constraints$cost2;
        return (_constraints$cost = (_constraints$cost2 = constraints.cost) === null || _constraints$cost2 === void 0 ? void 0 : _constraints$cost2.call(constraints)) !== null && _constraints$cost !== void 0 ? _constraints$cost : 0;
      });
    }
  };
}
var ActionSource = /* @__PURE__ */ function() {
  function ActionSource2(source, potential, macro) {
    var constraints = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    _classCallCheck7(this, ActionSource2), _defineProperty6(this, "source", void 0), _defineProperty6(this, "potential", void 0), _defineProperty6(this, "macro", void 0), _defineProperty6(this, "constraints", void 0), this.source = source, this.potential = potential, this.macro = macro, this.constraints = constraints;
  }
  return _createClass6(ActionSource2, [{
    key: "name",
    value: function() {
      return this.source.toString();
    }
    /**
     * @returns Whether the action is available.
     */
  }, {
    key: "available",
    value: function() {
      return this.potential() > 0;
    }
    /**
     * @returns Cost in meat per usage of the action.
     */
  }, {
    key: "cost",
    value: function() {
      return this.constraints.cost ? this.constraints.cost() : 0;
    }
    /**
     * @returns Whether the action costs 0 meat to use.
     */
  }, {
    key: "isFree",
    value: function() {
      return !this.cost || this.cost() === 0;
    }
    /**
     * @returns Whether unlimited uses of the action are available.
     */
  }, {
    key: "isUnlimited",
    value: function() {
      return this.potential() === 1 / 0;
    }
    /**
     * Create a compound action source with merged constraints.
     *
     * @param others Other actions to have available.
     * @returns Merged constraints, or null if they are inconsistent.
     */
  }, {
    key: "merge",
    value: function() {
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
        others[_key2] = arguments[_key2];
      var actions = [this].concat(others), constraints = mergeConstraints.apply(void 0, _toConsumableArray4(actions.map(function(action) {
        return action.constraints;
      })));
      return constraints === null ? null : new ActionSource2(_toConsumableArray4(flat(actions.map(function(action) {
        return action.source;
      }))), function() {
        return sum(actions, function(action) {
          return action.potential();
        });
      }, Macro.step.apply(Macro, _toConsumableArray4(actions.map(function(action) {
        return action.macro;
      }))), constraints);
    }
    /**
     * Perform all preparation necessary to make this action available.
     *
     * @param otherRequirements Any other equipment requirements.
     * @returns Whether preparation succeeded.
     */
  }, {
    key: "prepare",
    value: function(otherRequirements) {
      var _this$constraints$fam, _this$constraints;
      if ((_this$constraints$fam = (_this$constraints = this.constraints).familiar) !== null && _this$constraints$fam !== void 0 && _this$constraints$fam.call(_this$constraints) && !(0, import_kolmafia8.useFamiliar)(this.constraints.familiar()))
        return !1;
      if (this.constraints.equipmentRequirements) {
        var requirement = otherRequirements ? otherRequirements.merge(this.constraints.equipmentRequirements()) : this.constraints.equipmentRequirements();
        if (!requirement.maximize())
          return !1;
      }
      return this.constraints.preparation ? this.constraints.preparation() : !0;
    }
    /**
     * Perform all preparation necessary to make this action available.
     * Throws an error if preparation fails.
     *
     * @param otherRequirements Any other equipment requirements.
     */
  }, {
    key: "ensure",
    value: function(otherRequirements) {
      if (!this.prepare(otherRequirements))
        throw new Error("Failed to prepare action ".concat(this.name(), "."));
    }
  }]), ActionSource2;
}();
_defineProperty6(ActionSource, "defaultPriceFunction", function(item6) {
  return (0, import_kolmafia8.mallPrice)(item6) > 0 ? (0, import_kolmafia8.mallPrice)(item6) : 1 / 0;
});
function filterAction(action, constraints) {
  var _constraints$requireF, _constraints$requireU, _constraints$noFamili, _constraints$noRequir, _constraints$noPrepar, _constraints$maximumC, _constraints$maximumC2;
  return action.available() && (constraints.allowedAction === void 0 || constraints.allowedAction(action)) && !((_constraints$requireF = constraints.requireFamiliar) !== null && _constraints$requireF !== void 0 && _constraints$requireF.call(constraints) && !action.constraints.familiar) && !((_constraints$requireU = constraints.requireUnlimited) !== null && _constraints$requireU !== void 0 && _constraints$requireU.call(constraints) && !action.isUnlimited()) && !((_constraints$noFamili = constraints.noFamiliar) !== null && _constraints$noFamili !== void 0 && _constraints$noFamili.call(constraints) && action.constraints.familiar) && !((_constraints$noRequir = constraints.noRequirements) !== null && _constraints$noRequir !== void 0 && _constraints$noRequir.call(constraints) && action.constraints.equipmentRequirements) && !((_constraints$noPrepar = constraints.noPreparation) !== null && _constraints$noPrepar !== void 0 && _constraints$noPrepar.call(constraints) && action.constraints.preparation) && action.cost() <= ((_constraints$maximumC = (_constraints$maximumC2 = constraints.maximumCost) === null || _constraints$maximumC2 === void 0 ? void 0 : _constraints$maximumC2.call(constraints)) !== null && _constraints$maximumC !== void 0 ? _constraints$maximumC : 0);
}
function findActionSource(actions) {
  var constraints = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, validActions = actions.filter(function(actions2) {
    return filterAction(actions2, constraints);
  });
  return validActions.length < 1 ? null : validActions.reduce(function(a, b) {
    return a.cost() <= b.cost() ? a : b;
  });
}

// node_modules/libram/dist/resources/2017/AsdonMartin.js
init_kolmafia_polyfill();
var import_kolmafia9 = require("kolmafia");
var _templateObject49;
var _templateObject310, _templateObject410, _templateObject53, _templateObject63, _templateObject72, _templateObject82, _templateObject93, _templateObject103, _templateObject113, _templateObject123, _templateObject133;
function _slicedToArray5(arr, i) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray8(arr, i) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray8(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray8(o, minLen);
  }
}
function _arrayLikeToArray8(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit5(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral3(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var PriceAge;
(function(PriceAge2) {
  PriceAge2[PriceAge2.HISTORICAL = 0] = "HISTORICAL", PriceAge2[PriceAge2.RECENT = 1] = "RECENT", PriceAge2[PriceAge2.TODAY = 2] = "TODAY";
})(PriceAge || (PriceAge = {}));
function installed() {
  return (0, import_kolmafia9.getWorkshed)() === $item(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral3(["Asdon Martin keyfob"])));
}
var fuelSkiplist = $items(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral3(['cup of "tea", thermos of "whiskey", Lucky Lindy, Bee\'s Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy, glass of "milk"'])));
function priceTooOld(item6) {
  return (0, import_kolmafia9.historicalPrice)(item6) === 0 || (0, import_kolmafia9.historicalAge)(item6) >= 7;
}
function historicalPriceOrMax(item6) {
  var historical = (0, import_kolmafia9.historicalPrice)(item6);
  return historical < 0 ? 999999999 : historical;
}
function mallPriceOrMax(item6) {
  var mall = (0, import_kolmafia9.mallPrice)(item6);
  return mall < 0 ? 999999999 : mall;
}
function price(item6, priceAge) {
  switch (priceAge) {
    case PriceAge.HISTORICAL: {
      var historical = historicalPriceOrMax(item6);
      return historical === 0 ? mallPriceOrMax(item6) : historical;
    }
    case PriceAge.RECENT:
      return priceTooOld(item6) ? mallPriceOrMax(item6) : historicalPriceOrMax(item6);
    case PriceAge.TODAY:
      return mallPriceOrMax(item6);
  }
}
function calculateFuelUnitCost(it) {
  var priceAge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : PriceAge.RECENT, units = getAverageAdventures(it);
  return price(it, priceAge) / units;
}
function isFuelItem(it) {
  return !(0, import_kolmafia9.isNpcItem)(it) && it.fullness + it.inebriety > 0 && getAverageAdventures(it) > 0 && it.tradeable && it.discardable && !fuelSkiplist.includes(it);
}
function getBestFuels() {
  var allFuel = import_kolmafia9.Item.all().filter(isFuelItem);
  allFuel.filter(function(item6) {
    return (0, import_kolmafia9.historicalPrice)(item6) === 0;
  }).length > 100 && ((0, import_kolmafia9.mallPrices)("food"), (0, import_kolmafia9.mallPrices)("booze"));
  var keyHistorical = function(item6) {
    return calculateFuelUnitCost(item6, PriceAge.HISTORICAL);
  };
  allFuel.sort(function(x, y) {
    return keyHistorical(x) - keyHistorical(y);
  });
  var bestUnitCost = keyHistorical(allFuel[0]), firstBadIndex = allFuel.findIndex(function(item6) {
    return keyHistorical(item6) > 5 * bestUnitCost;
  }), potentialFuel = firstBadIndex > 0 ? allFuel.slice(0, firstBadIndex) : allFuel;
  potentialFuel.filter(function(item6) {
    return priceTooOld(item6);
  }).length > 100 && ((0, import_kolmafia9.mallPrices)("food"), (0, import_kolmafia9.mallPrices)("booze"));
  var key1 = function(item6) {
    return -getAverageAdventures(item6);
  }, key2 = function(item6) {
    return calculateFuelUnitCost(item6, PriceAge.RECENT);
  };
  potentialFuel.sort(function(x, y) {
    return key1(x) - key1(y);
  }), potentialFuel.sort(function(x, y) {
    return key2(x) - key2(y);
  });
  var candidates = potentialFuel.slice(0, 10), key3 = function(item6) {
    return calculateFuelUnitCost(item6, PriceAge.TODAY);
  };
  if (candidates.sort(function(x, y) {
    return key3(x) - key3(y);
  }), calculateFuelUnitCost(candidates[0], PriceAge.TODAY) > 100)
    throw new Error("Could not identify any fuel with efficiency better than 100 meat per fuel. This means something went wrong.");
  return candidates;
}
function insertFuel(it) {
  var quantity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1, result = (0, import_kolmafia9.visitUrl)("campground.php?action=fuelconvertor&pwd&qty=".concat(quantity, "&iid=").concat(it.id, "&go=Convert%21"));
  return result.includes("The display updates with a");
}
function fillTo(targetUnits) {
  if (!installed())
    return !1;
  for (; (0, import_kolmafia9.getFuel)() < targetUnits; ) {
    var _ref = (0, import_kolmafia9.canInteract)() ? getBestFuels() : [$item(_templateObject410 || (_templateObject410 = _taggedTemplateLiteral3(["loaf of soda bread"]))), void 0], _ref2 = _slicedToArray5(_ref, 2), bestFuel = _ref2[0], secondBest = _ref2[1], count = Math.ceil(targetUnits / getAverageAdventures(bestFuel)), ceiling = void 0;
    if (secondBest) {
      var efficiencyOfSecondBest = (0, import_kolmafia9.mallPrice)(secondBest) / getAverageAdventures(secondBest);
      ceiling = Math.ceil(efficiencyOfSecondBest * getAverageAdventures(bestFuel));
    }
    if ((0, import_kolmafia9.canInteract)() ? ceiling ? (0, import_kolmafia9.buy)(count, bestFuel, ceiling) : (0, import_kolmafia9.buy)(count, bestFuel) : (0, import_kolmafia9.retrieveItem)(count, bestFuel), !insertFuel(bestFuel, Math.min((0, import_kolmafia9.itemAmount)(bestFuel), count)))
      throw new Error("Failed to fuel Asdon Martin.");
  }
  return (0, import_kolmafia9.getFuel)() >= targetUnits;
}
var Driving = {
  Obnoxiously: $effect(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral3(["Driving Obnoxiously"]))),
  Stealthily: $effect(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral3(["Driving Stealthily"]))),
  Wastefully: $effect(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral3(["Driving Wastefully"]))),
  Safely: $effect(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral3(["Driving Safely"]))),
  Recklessly: $effect(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral3(["Driving Recklessly"]))),
  Intimidatingly: $effect(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral3(["Driving Intimidatingly"]))),
  Quickly: $effect(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral3(["Driving Quickly"]))),
  Observantly: $effect(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral3(["Driving Observantly"]))),
  Waterproofly: $effect(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral3(["Driving Waterproofly"])))
};

// node_modules/libram/dist/actions/FreeRun.js
init_kolmafia_polyfill();
var import_kolmafia12 = require("kolmafia");

// node_modules/libram/dist/resources/2009/Bandersnatch.js
init_kolmafia_polyfill();
var import_kolmafia10 = require("kolmafia");
var _templateObject50, _templateObject211, _templateObject311;
function _taggedTemplateLiteral4(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar = $familiar(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral4(["Frumious Bandersnatch"])));
function have2() {
  return have(familiar);
}
function getRunaways() {
  return get("_banderRunaways");
}
function getMaxRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, weightBuffs = considerWeightAdjustment ? (0, import_kolmafia10.weightAdjustment)() : 0;
  return Math.floor(((0, import_kolmafia10.familiarWeight)(familiar) + weightBuffs) / 5);
}
function getRemainingRunaways() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways(considerWeightAdjustment) - getRunaways());
}
function couldRunaway() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have2() && getRemainingRunaways(considerWeightAdjustment) > 0;
}
var odeSkill = $skill(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral4(["The Ode to Booze"]))), odeEffect = $effect(_templateObject311 || (_templateObject311 = _taggedTemplateLiteral4(["Ode to Booze"])));

// node_modules/libram/dist/resources/2011/StompingBoots.js
init_kolmafia_polyfill();
var import_kolmafia11 = require("kolmafia");
var _templateObject51;
function _taggedTemplateLiteral5(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var familiar2 = $familiar(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral5(["Pair of Stomping Boots"])));
function have3() {
  return have(familiar2);
}
function getRunaways2() {
  return get("_banderRunaways");
}
function getMaxRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, weightBuffs = considerWeightAdjustment ? (0, import_kolmafia11.weightAdjustment)() : 0;
  return Math.floor(((0, import_kolmafia11.familiarWeight)(familiar2) + weightBuffs) / 5);
}
function getRemainingRunaways2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return Math.max(0, getMaxRunaways2(considerWeightAdjustment) - getRunaways2());
}
function couldRunaway2() {
  var considerWeightAdjustment = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return have3() && getRemainingRunaways2(considerWeightAdjustment) > 0;
}

// node_modules/libram/dist/actions/FreeRun.js
var _templateObject54, _templateObject213, _templateObject313, _templateObject411, _templateObject55, _templateObject64, _templateObject73, _templateObject83, _templateObject94, _templateObject104, _templateObject114, _templateObject124, _templateObject134, _templateObject143, _templateObject153, _templateObject163, _templateObject173, _templateObject183, _templateObject193, _templateObject203, _templateObject214, _templateObject223, _templateObject233, _templateObject243, _templateObject253, _templateObject263, _templateObject273, _templateObject283, _templateObject293, _templateObject303, _templateObject314, _templateObject323, _templateObject333, _templateObject343, _templateObject352, _templateObject362, _templateObject372, _templateObject382, _templateObject392, _templateObject402, _templateObject412, _templateObject422, _templateObject432, _templateObject442, _templateObject452, _templateObject462, _templateObject472, _templateObject482, _templateObject492, _templateObject502, _templateObject512, _templateObject522, _templateObject532, _templateObject542, _templateObject552, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject622;
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray9(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray9(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray9(o, minLen);
  }
}
function _iterableToArray5(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray9(arr);
}
function _arrayLikeToArray9(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral6(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var scrapbookChargesLastUpdated = get("_lastCombatStarted"), asdonMartinSource = new ActionSource($skill(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral6(["Asdon Martin: Spring-Loaded Front Bumper"]))), function() {
  if (!installed())
    return 0;
  var banishes = get("banishedMonsters").split(":"), bumperIndex = banishes.map(function(string) {
    return string.toLowerCase();
  }).indexOf("spring-loaded front bumper");
  return bumperIndex === -1 || (0, import_kolmafia12.myTurncount)() - parseInt(banishes[bumperIndex + 1]) > 30 ? 1 : 0;
}, Macro.trySkill($skill(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral6(["Asdon Martin: Spring-Loaded Front Bumper"])))), {
  preparation: function() {
    return fillTo(50);
  }
}), freeRunSources = [
  // Free limited sources
  new ActionSource($familiar(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral6(["Frumious Bandersnatch"]))), function() {
    return (have($effect(_templateObject411 || (_templateObject411 = _taggedTemplateLiteral6(["Ode to Booze"])))) || getSongCount() < getSongLimit()) && couldRunaway() ? getRemainingRunaways() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    preparation: function() {
      return ensureEffect($effect(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral6(["Ode to Booze"])))), have($effect(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral6(["Ode to Booze"]))));
    },
    familiar: function() {
      return $familiar(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral6(["Frumious Bandersnatch"])));
    }
  }),
  new ActionSource($familiar(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral6(["Pair of Stomping Boots"]))), function() {
    return couldRunaway2() ? getRemainingRunaways2() : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement(["Familiar Weight"], {});
    },
    familiar: function() {
      return $familiar(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral6(["Pair of Stomping Boots"])));
    }
  }),
  new ActionSource($skill(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral6(["Snokebomb"]))), function() {
    return have($skill(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral6(["Snokebomb"])))) ? 3 - get("_snokebombUsed") : 0;
  }, Macro.skill($skill(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral6(["Snokebomb"])))), {
    preparation: function() {
      return (0, import_kolmafia12.restoreMp)(50);
    }
  }),
  new ActionSource($skill(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral6(["Emotionally Chipped"]))), function() {
    return have($skill(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral6(["Emotionally Chipped"])))) ? 3 - get("_feelHatredUsed") : 0;
  }, Macro.skill($skill(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral6(["Feel Hatred"]))))),
  new ActionSource($item(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral6(["Kremlin's Greatest Briefcase"]))), function() {
    return have($item(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral6(["Kremlin's Greatest Briefcase"])))) ? 3 - get("_kgbTranquilizerDartUses") : 0;
  }, Macro.skill($skill(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral6(["KGB tranquilizer dart"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral6(["Kremlin's Greatest Briefcase"])))
      });
    }
  }),
  new ActionSource($item(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral6(["latte lovers member's mug"]))), function() {
    return have($item(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral6(["latte lovers member's mug"])))) && !get("_latteBanishUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral6(["Throw Latte on Opponent"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral6(["latte lovers member's mug"])))
      });
    }
  }),
  new ActionSource($item(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral6(["Lil' Doctor\u2122 bag"]))), function() {
    return have($item(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral6(["Lil' Doctor\u2122 bag"])))) ? 3 - get("_reflexHammerUsed") : 0;
  }, Macro.skill($skill(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral6(["Reflex Hammer"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral6(["Lil' Doctor\u2122 bag"])))
      });
    }
  }),
  new ActionSource($item(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral6(["mafia middle finger ring"]))), function() {
    return have($item(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral6(["mafia middle finger ring"])))) && (0, import_kolmafia12.canEquip)($item(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral6(["mafia middle finger ring"])))) && !get("_mafiaMiddleFingerRingUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject314 || (_templateObject314 = _taggedTemplateLiteral6(["Show them your ring"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral6(["mafia middle finger ring"])))
      });
    }
  }),
  new ActionSource($item(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral6(["V for Vivala mask"]))), function() {
    return have($item(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral6(["V for Vivala mask"])))) && !get("_vmaskBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject352 || (_templateObject352 = _taggedTemplateLiteral6(["Creepy Grin"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject362 || (_templateObject362 = _taggedTemplateLiteral6(["V for Vivala mask"])))
      });
    },
    preparation: function() {
      return (0, import_kolmafia12.restoreMp)(30);
    }
  }),
  new ActionSource($item(_templateObject372 || (_templateObject372 = _taggedTemplateLiteral6(["stinky cheese eye"]))), function() {
    return getFoldGroup($item(_templateObject382 || (_templateObject382 = _taggedTemplateLiteral6(["stinky cheese eye"])))).some(function(item6) {
      return have(item6);
    }) && !get("_stinkyCheeseBanisherUsed") ? 1 : 0;
  }, Macro.skill($skill(_templateObject392 || (_templateObject392 = _taggedTemplateLiteral6(["Give Your Opponent the Stinkeye"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject402 || (_templateObject402 = _taggedTemplateLiteral6(["stinky cheese eye"])))
      });
    },
    preparation: function() {
      return have($item(_templateObject412 || (_templateObject412 = _taggedTemplateLiteral6(["stinky cheese eye"])))) || (0, import_kolmafia12.cliExecute)("fold stinky cheese eye"), have($item(_templateObject422 || (_templateObject422 = _taggedTemplateLiteral6(["stinky cheese eye"]))));
    }
  }),
  new ActionSource($item(_templateObject432 || (_templateObject432 = _taggedTemplateLiteral6(["navel ring of navel gazing"]))), function() {
    return have($item(_templateObject442 || (_templateObject442 = _taggedTemplateLiteral6(["navel ring of navel gazing"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject452 || (_templateObject452 = _taggedTemplateLiteral6(["navel ring of navel gazing"])))
      });
    }
  }),
  new ActionSource($item(_templateObject462 || (_templateObject462 = _taggedTemplateLiteral6(["Greatest American Pants"]))), function() {
    return have($item(_templateObject472 || (_templateObject472 = _taggedTemplateLiteral6(["Greatest American Pants"])))) ? Math.max(0, 3 - get("_navelRunaways")) : 0;
  }, Macro.step("runaway"), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject482 || (_templateObject482 = _taggedTemplateLiteral6(["Greatest American Pants"])))
      });
    }
  }),
  new ActionSource($skill(_templateObject492 || (_templateObject492 = _taggedTemplateLiteral6(["Show your boring familiar pictures"]))), function() {
    return have($item(_templateObject502 || (_templateObject502 = _taggedTemplateLiteral6(["familiar scrapbook"])))) ? (scrapbookChargesLastUpdated !== get("_lastCombatStarted") && ((0, import_kolmafia12.visitUrl)("desc_item.php?whichitem=463063785"), scrapbookChargesLastUpdated = get("_lastCombatStarted")), Math.floor(get("scrapbookCharges") / 100)) : 0;
  }, Macro.skill($skill(_templateObject512 || (_templateObject512 = _taggedTemplateLiteral6(["Show your boring familiar pictures"])))), {
    equipmentRequirements: function() {
      return new Requirement([], {
        forceEquip: $items(_templateObject522 || (_templateObject522 = _taggedTemplateLiteral6(["familiar scrapbook"])))
      });
    }
  }),
  new ActionSource($item(_templateObject532 || (_templateObject532 = _taggedTemplateLiteral6(["peppermint parasol"]))), function() {
    return Math.max(0, 3 - get("_navelRunaways"));
  }, Macro.item($item(_templateObject542 || (_templateObject542 = _taggedTemplateLiteral6(["peppermint parasol"])))), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)($item(_templateObject552 || (_templateObject552 = _taggedTemplateLiteral6(["peppermint parasol"]))));
    },
    cost: function() {
      return Math.min(ActionSource.defaultPriceFunction($item(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral6(["peppermint sprout"])))) * 5, ActionSource.defaultPriceFunction($item(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral6(["peppermint parasol"]))))) / 10;
    }
    // Breaks after 10 successful runaways.
  }),
  new ActionSource($item(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral6(["human musk"]))), function() {
    return Math.max(0, 3 - get("_humanMuskUses"));
  }, Macro.item($item(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral6(["human musk"])))), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)($item(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral6(["human musk"]))));
    },
    cost: function() {
      return ActionSource.defaultPriceFunction($item(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral6(["human musk"]))));
    }
  })
].concat(_toConsumableArray5($items(_templateObject622 || (_templateObject622 = _taggedTemplateLiteral6(["Louder Than Bomb, divine champagne popper, tennis ball"]))).map(function(item6) {
  return new ActionSource(item6, function() {
    return 1 / 0;
  }, Macro.item(item6), {
    preparation: function() {
      return (0, import_kolmafia12.retrieveItem)(item6);
    },
    cost: function() {
      return ActionSource.defaultPriceFunction(item6);
    }
  });
})));
function tryFindFreeRun(constraints) {
  var source = findActionSource(freeRunSources, constraints);
  return source && asdonMartinSource.available() && (source = asdonMartinSource.merge(source)), source;
}
function ensureFreeRun(constraints) {
  var source = tryFindFreeRun(constraints);
  if (!source)
    throw new Error("Failed to ensure Free Run source");
  return source;
}

// node_modules/libram/dist/resources/index.js
init_kolmafia_polyfill();

// node_modules/libram/dist/resources/2010/CrownOfThrones.js
var CrownOfThrones_exports = {};
__export(CrownOfThrones_exports, {
  createModifierValueFunction: function() {
    return createModifierValueFunction;
  },
  createRiderMode: function() {
    return createRiderMode;
  },
  getModifier: function() {
    return getModifier;
  },
  hasRiderMode: function() {
    return hasRiderMode;
  },
  pickRider: function() {
    return pickRider;
  },
  ridingFamiliars: function() {
    return ridingFamiliars;
  },
  valueRider: function() {
    return valueRider;
  }
});
init_kolmafia_polyfill();
var import_kolmafia13 = require("kolmafia");
var _templateObject65, _templateObject215, _templateObject315, _templateObject413, _templateObject510, _templateObject66, _templateObject74, _templateObject84, _templateObject95, _templateObject105, _templateObject115, _templateObject125, _templateObject135, _templateObject144, _templateObject154, _templateObject164, _templateObject174, _templateObject184, _templateObject194, _templateObject204, _templateObject216, _templateObject224, _templateObject234, _templateObject244, _templateObject254, _templateObject264, _templateObject274, _templateObject284, _templateObject294, _templateObject304, _templateObject316, _templateObject324, _templateObject334, _templateObject344, _templateObject353, _templateObject363, _templateObject373, _templateObject383, _templateObject393, _templateObject403, _templateObject414, _templateObject423, _templateObject433, _templateObject443, _templateObject453, _templateObject463, _templateObject473, _templateObject483, _templateObject493, _templateObject503, _templateObject513, _templateObject523, _templateObject533, _templateObject543, _templateObject553, _templateObject562, _templateObject572, _templateObject582, _templateObject592, _templateObject602, _templateObject612, _templateObject623, _templateObject632, _templateObject642, _templateObject652, _templateObject662, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject722, _templateObject732, _templateObject742, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject822, _templateObject832, _templateObject842, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject922, _templateObject932, _templateObject942, _templateObject952, _templateObject96, _templateObject97, _templateObject98, _templateObject99;
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys4(Object(source), !0).forEach(function(key) {
      _defineProperty7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty7(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _taggedTemplateLiteral7(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var ridingFamiliars = [{
  familiar: $familiar(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral7(["Puck Man"]))),
  drops: $items(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral7(["yellow pixel"]))),
  probability: 0.25,
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject315 || (_templateObject315 = _taggedTemplateLiteral7(["Ms. Puck Man"]))),
  drops: $items(_templateObject413 || (_templateObject413 = _taggedTemplateLiteral7(["yellow pixel"]))),
  probability: 0.25,
  dropPredicate: function() {
    return get("_yellowPixelDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject510 || (_templateObject510 = _taggedTemplateLiteral7(["Grimstone Golem"]))),
  drops: $items(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral7(["grimstone mask"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_grimstoneMaskDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral7(["Knob Goblin Organ Grinder"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral7(["Happy Medium"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral7(["Garbage Fire"]))),
  drops: $items(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral7(["burning newspaper"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_garbageFireDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral7(["Machine Elf"]))),
  drops: $items(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral7(["abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose"]))),
  probability: 0.2,
  dropPredicate: function() {
    return get("_abstractionDropsCrown") < 25;
  }
}, {
  familiar: $familiar(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral7(["Trick-or-Treating Tot"]))),
  drops: $items(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral7(["hoarded candy wad"]))),
  probability: 0.5,
  dropPredicate: function() {
    return get("_hoardedCandyDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral7(["Warbear Drone"]))),
  drops: $items(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral7(["warbear whosit"]))),
  probability: 1 / 4.5
}, {
  familiar: $familiar(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral7(["Li'l Xenomorph"]))),
  drops: $items(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral7(["lunar isotope"]))),
  probability: 0.05
}, {
  familiar: $familiar(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral7(["Pottery Barn Owl"]))),
  drops: $items(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral7(["volcanic ash"]))),
  probability: 0.1
}, {
  familiar: $familiar(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral7(["Grim Brother"]))),
  drops: $items(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral7(["grim fairy tale"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_grimFairyTaleDropsCrown") < 2;
  }
}, {
  familiar: $familiar(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral7(["Optimistic Candle"]))),
  drops: $items(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral7(["glob of melted wax"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_optimisticCandleDropsCrown") < 3;
  }
}, {
  familiar: $familiar(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral7(["Adventurous Spelunker"]))),
  drops: $items(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral7(["teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_oreDropsCrown") < 6;
  }
}, {
  familiar: $familiar(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral7(["Twitching Space Critter"]))),
  drops: $items(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral7(["space beast fur"]))),
  probability: 1,
  dropPredicate: function() {
    return get("_spaceFurDropsCrown") < 1;
  }
}, {
  familiar: $familiar(_templateObject294 || (_templateObject294 = _taggedTemplateLiteral7(["Party Mouse"]))),
  drops: 50,
  probability: 0.05
}, {
  familiar: $familiar(_templateObject304 || (_templateObject304 = _taggedTemplateLiteral7(["Yule Hound"]))),
  drops: $items(_templateObject316 || (_templateObject316 = _taggedTemplateLiteral7(["candy cane"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject324 || (_templateObject324 = _taggedTemplateLiteral7(["Gluttonous Green Ghost"]))),
  drops: $items(_templateObject334 || (_templateObject334 = _taggedTemplateLiteral7(["bean burrito, enchanted bean burrito, jumping bean burrito"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject344 || (_templateObject344 = _taggedTemplateLiteral7(["Reassembled Blackbird"]))),
  drops: $items(_templateObject353 || (_templateObject353 = _taggedTemplateLiteral7(["blackberry"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject363 || (_templateObject363 = _taggedTemplateLiteral7(["Reconstituted Crow"]))),
  drops: $items(_templateObject373 || (_templateObject373 = _taggedTemplateLiteral7(["blackberry"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject383 || (_templateObject383 = _taggedTemplateLiteral7(["Hunchbacked Minion"]))),
  drops: /* @__PURE__ */ new Map([[$item(_templateObject393 || (_templateObject393 = _taggedTemplateLiteral7(["disembodied brain"]))), 0.02], [$item(_templateObject403 || (_templateObject403 = _taggedTemplateLiteral7(["skeleton bone"]))), 0.98]]),
  probability: 1
}, {
  familiar: $familiar(_templateObject414 || (_templateObject414 = _taggedTemplateLiteral7(["Reanimated Reanimator"]))),
  drops: $items(_templateObject423 || (_templateObject423 = _taggedTemplateLiteral7(["hot wing, broken skull"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject433 || (_templateObject433 = _taggedTemplateLiteral7(["Attention-Deficit Demon"]))),
  drops: $items(_templateObject443 || (_templateObject443 = _taggedTemplateLiteral7(["chorizo brownies, white chocolate and tomato pizza, carob chunk noodles"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject453 || (_templateObject453 = _taggedTemplateLiteral7(["Piano Cat"]))),
  drops: $items(_templateObject463 || (_templateObject463 = _taggedTemplateLiteral7(["beertini, papaya slung, salty slug, tomato daiquiri"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject473 || (_templateObject473 = _taggedTemplateLiteral7(["Golden Monkey"]))),
  drops: $items(_templateObject483 || (_templateObject483 = _taggedTemplateLiteral7(["gold nuggets"]))),
  probability: 0.5
}, {
  familiar: $familiar(_templateObject493 || (_templateObject493 = _taggedTemplateLiteral7(["Robot Reindeer"]))),
  drops: $items(_templateObject503 || (_templateObject503 = _taggedTemplateLiteral7(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject513 || (_templateObject513 = _taggedTemplateLiteral7(["Stocking Mimic"]))),
  drops: $items(_templateObject523 || (_templateObject523 = _taggedTemplateLiteral7(["Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject533 || (_templateObject533 = _taggedTemplateLiteral7(["BRICKO chick"]))),
  drops: $items(_templateObject543 || (_templateObject543 = _taggedTemplateLiteral7(["BRICKO brick"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject553 || (_templateObject553 = _taggedTemplateLiteral7(["Cotton Candy Carnie"]))),
  drops: $items(_templateObject562 || (_templateObject562 = _taggedTemplateLiteral7(["cotton candy pinch"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject572 || (_templateObject572 = _taggedTemplateLiteral7(["Untamed Turtle"]))),
  drops: $items(_templateObject582 || (_templateObject582 = _taggedTemplateLiteral7(["snailmail bits, turtlemail bits, turtle wax"]))),
  probability: 0.35
}, {
  familiar: $familiar(_templateObject592 || (_templateObject592 = _taggedTemplateLiteral7(["Astral Badger"]))),
  drops: $items(_templateObject602 || (_templateObject602 = _taggedTemplateLiteral7(["spooky mushroom, Knob mushroom, Knoll mushroom"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject612 || (_templateObject612 = _taggedTemplateLiteral7(["Green Pixie"]))),
  drops: $items(_templateObject623 || (_templateObject623 = _taggedTemplateLiteral7(["bottle of tequila"]))),
  probability: 0.2
}, {
  familiar: $familiar(_templateObject632 || (_templateObject632 = _taggedTemplateLiteral7(["Angry Goat"]))),
  drops: $items(_templateObject642 || (_templateObject642 = _taggedTemplateLiteral7(["goat cheese pizza"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject652 || (_templateObject652 = _taggedTemplateLiteral7(["Adorable Seal Larva"]))),
  drops: $items(_templateObject662 || (_templateObject662 = _taggedTemplateLiteral7(["stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets"]))),
  probability: 0.35
}, {
  familiar: $familiar(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral7(["Ancient Yuletide Troll"]))),
  drops: $items(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral7(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral7(["Sweet Nutcracker"]))),
  drops: $items(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral7(["candy cane, eggnog, fruitcake, gingerbread bugbear"]))),
  probability: 0.3
}, {
  familiar: $familiar(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral7(["Casagnova Gnome"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject722 || (_templateObject722 = _taggedTemplateLiteral7(["Coffee Pixie"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject732 || (_templateObject732 = _taggedTemplateLiteral7(["Dancing Frog"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject742 || (_templateObject742 = _taggedTemplateLiteral7(["Grouper Groupie"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral7(["Hand Turkey"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral7(["Hippo Ballerina"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral7(["Jitterbug"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral7(["Leprechaun"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral7(["Obtuse Angel"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral7(["Psychedelic Bear"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral7(["Robortender"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject822 || (_templateObject822 = _taggedTemplateLiteral7(["Ghost of Crimbo Commerce"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject832 || (_templateObject832 = _taggedTemplateLiteral7(["Hobo Monkey"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject842 || (_templateObject842 = _taggedTemplateLiteral7(["Rockin' Robin"]))),
  drops: 60,
  probability: 1
}, {
  familiar: $familiar(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral7(["Feral Kobold"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral7(["Oily Woim"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral7(["Cat Burglar"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral7(["Misshapen Animal Skeleton"]))),
  drops: 30,
  probability: 1
}, {
  familiar: $familiar(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral7(["Gelatinous Cubeling"]))),
  drops: 0,
  probability: 0
}, {
  familiar: $familiar(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral7(["Frozen Gravy Fairy"]))),
  drops: $items(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral7(["cold nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject922 || (_templateObject922 = _taggedTemplateLiteral7(["Stinky Gravy Fairy"]))),
  drops: $items(_templateObject932 || (_templateObject932 = _taggedTemplateLiteral7(["stench nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject942 || (_templateObject942 = _taggedTemplateLiteral7(["Sleazy Gravy Fairy"]))),
  drops: $items(_templateObject952 || (_templateObject952 = _taggedTemplateLiteral7(["sleaze nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral7(["Spooky Gravy Fairy"]))),
  drops: $items(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral7(["spooky nuggets"]))),
  probability: 1
}, {
  familiar: $familiar(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral7(["Flaming Gravy Fairy"]))),
  // drops a hot nugget every combat, 5 of which can be used to make a hot wad
  drops: $items(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral7(["hot nuggets"]))),
  probability: 1
}];
function valueRider(rider, modifierValueFunction, dropsValueFunction2) {
  var ignoreLimitedDrops = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, dropValue = !rider.dropPredicate || rider.dropPredicate() && !ignoreLimitedDrops ? rider.probability * (typeof rider.drops == "number" ? rider.drops : dropsValueFunction2(rider.drops)) : 0, modifierValue = modifierValueFunction(rider.familiar);
  return dropValue + modifierValue;
}
var riderModes = /* @__PURE__ */ new Map(), DEFAULTS = {
  modifierValueFunction: function() {
    return 0;
  },
  dropsValueFunction: function() {
    return 0;
  },
  ignoreLimitedDrops: !1,
  excludeCurrentFamiliar: !0
};
function createRiderMode(name, details) {
  return riderModes.set(name, _objectSpread4(_objectSpread4({}, DEFAULTS), details));
}
function hasRiderMode(name) {
  return riderModes.has(name);
}
var riderLists = /* @__PURE__ */ new Map();
function pickRider(mode) {
  var modeData = riderModes.get(mode);
  if (!modeData)
    return null;
  var modifierValueFunction = modeData.modifierValueFunction, dropsValueFunction2 = modeData.dropsValueFunction, ignoreLimitedDrops = modeData.ignoreLimitedDrops, excludeCurrentFamiliar = modeData.excludeCurrentFamiliar;
  riderLists.has(mode) || riderLists.set(mode, ridingFamiliars.filter(function(_ref) {
    var familiar4 = _ref.familiar;
    return have(familiar4);
  }).sort(function(a, b) {
    return valueRider(b, modifierValueFunction, dropsValueFunction2, ignoreLimitedDrops) - valueRider(a, modifierValueFunction, dropsValueFunction2, ignoreLimitedDrops);
  }));
  var list = riderLists.get(mode);
  if (list) {
    var riderToReturn = list.find(function(_ref2) {
      var _dropPredicate, dropPredicate = _ref2.dropPredicate, familiar4 = _ref2.familiar;
      return ((_dropPredicate = dropPredicate == null ? void 0 : dropPredicate()) !== null && _dropPredicate !== void 0 ? _dropPredicate : !0) && (!excludeCurrentFamiliar || (0, import_kolmafia13.myFamiliar)() !== familiar4);
    });
    return riderToReturn != null ? riderToReturn : null;
  }
  return null;
}
function getModifier(modifier, familiar4) {
  return (0, import_kolmafia13.numericModifier)("Throne:".concat(familiar4), modifier);
}
function createModifierValueFunction(modifiers, functions) {
  return function(familiar4) {
    return sum(modifiers, function(modifier) {
      return functions[modifier](getModifier(modifier, familiar4));
    });
  };
}

// node_modules/libram/dist/Copier.js
init_kolmafia_polyfill();
function _classCallCheck8(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty8(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var Copier = function Copier2(couldCopy, prepare, canCopy, copiedMonster, fightCopy) {
  _classCallCheck8(this, Copier2), _defineProperty8(this, "couldCopy", void 0), _defineProperty8(this, "prepare", void 0), _defineProperty8(this, "canCopy", void 0), _defineProperty8(this, "copiedMonster", void 0), _defineProperty8(this, "fightCopy", null), this.couldCopy = couldCopy, this.prepare = prepare, this.canCopy = canCopy, this.copiedMonster = copiedMonster, fightCopy && (this.fightCopy = fightCopy);
};

// node_modules/libram/dist/resources/2016/SourceTerminal.js
var SourceTerminal_exports = {};
__export(SourceTerminal_exports, {
  Buffs: function() {
    return Buffs;
  },
  Digitize: function() {
    return Digitize;
  },
  Items: function() {
    return Items;
  },
  RolloverBuffs: function() {
    return RolloverBuffs;
  },
  Skills: function() {
    return Skills;
  },
  canDigitize: function() {
    return canDigitize;
  },
  couldDigitize: function() {
    return couldDigitize;
  },
  duplicateUsesRemaining: function() {
    return duplicateUsesRemaining;
  },
  educate: function() {
    return educate;
  },
  enhance: function() {
    return enhance;
  },
  enhanceBuffDuration: function() {
    return enhanceBuffDuration;
  },
  enhanceUsesRemaining: function() {
    return enhanceUsesRemaining;
  },
  enquiry: function() {
    return enquiry;
  },
  enquiryBuffDuration: function() {
    return enquiryBuffDuration;
  },
  extrude: function() {
    return extrude;
  },
  getChips: function() {
    return getChips;
  },
  getDigitizeMonster: function() {
    return getDigitizeMonster;
  },
  getDigitizeMonsterCount: function() {
    return getDigitizeMonsterCount;
  },
  getDigitizeUses: function() {
    return getDigitizeUses;
  },
  getDigitizeUsesRemaining: function() {
    return getDigitizeUsesRemaining;
  },
  getDuplicateUses: function() {
    return getDuplicateUses;
  },
  getEnhanceUses: function() {
    return getEnhanceUses;
  },
  getMaximumDigitizeUses: function() {
    return getMaximumDigitizeUses;
  },
  getPortscanUses: function() {
    return getPortscanUses;
  },
  getSkills: function() {
    return getSkills;
  },
  have: function() {
    return have4;
  },
  isCurrentSkill: function() {
    return isCurrentSkill;
  },
  maximumDuplicateUses: function() {
    return maximumDuplicateUses;
  },
  maximumEnhanceUses: function() {
    return maximumEnhanceUses;
  },
  prepareDigitize: function() {
    return prepareDigitize;
  }
});
init_kolmafia_polyfill();
var import_kolmafia14 = require("kolmafia");
var _templateObject100, _templateObject217, _templateObject317, _templateObject415, _templateObject511, _templateObject610, _templateObject710, _templateObject810, _templateObject910, _templateObject106, _templateObject116, _templateObject126, _templateObject136, _templateObject145, _templateObject155, _templateObject165, _templateObject175, _templateObject185, _templateObject195, _templateObject205, _templateObject218, _templateObject225, _templateObject235, _templateObject245, _templateObject255, _templateObject265, _templateObject275;
function _createForOfIteratorHelper6(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray10(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray10(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray10(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray10(o, minLen);
  }
}
function _arrayLikeToArray10(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral8(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item = $item(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral8(["Source terminal"])));
function have4() {
  return haveInCampground(item);
}
var Buffs = {
  Items: $effect(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral8(["items.enh"]))),
  Meat: $effect(_templateObject317 || (_templateObject317 = _taggedTemplateLiteral8(["meat.enh"]))),
  Init: $effect(_templateObject415 || (_templateObject415 = _taggedTemplateLiteral8(["init.enh"]))),
  Critical: $effect(_templateObject511 || (_templateObject511 = _taggedTemplateLiteral8(["critical.enh"]))),
  Damage: $effect(_templateObject610 || (_templateObject610 = _taggedTemplateLiteral8(["damage.enh"]))),
  Substats: $effect(_templateObject710 || (_templateObject710 = _taggedTemplateLiteral8(["substats.enh"])))
};
function enhance(buff) {
  return Object.values(Buffs).includes(buff) ? (0, import_kolmafia14.cliExecute)("terminal enhance ".concat(buff.name)) : !1;
}
var RolloverBuffs = {
  /** +5 Familiar Weight */
  Familiar: $effect(_templateObject810 || (_templateObject810 = _taggedTemplateLiteral8(["familiar.enq"]))),
  /** +25 ML */
  Monsters: $effect(_templateObject910 || (_templateObject910 = _taggedTemplateLiteral8(["monsters.enq"]))),
  /** +5 Prismatic Resistance */
  Protect: $effect(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral8(["protect.enq"]))),
  /** +100% Muscle, +100% Mysticality, +100% Moxie */
  Stats: $effect(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral8(["stats.enq"])))
};
function enquiry(rolloverBuff) {
  return Object.values(RolloverBuffs).includes(rolloverBuff) ? (0, import_kolmafia14.cliExecute)("terminal enquiry ".concat(rolloverBuff.name)) : !1;
}
var Skills = {
  /** Collect Source essence from enemies once per combat */
  Extract: $skill(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral8(["Extract"]))),
  /** Stagger and create a wandering monster 1-3 times per day */
  Digitize: $skill(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral8(["Digitize"]))),
  /** Stagger and deal 25% of enemy HP in damage once per combat */
  Compress: $skill(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral8(["Compress"]))),
  /** Double monster's HP, attack, defence, attacks per round and item drops once per fight and once per day (five in The Source) */
  Duplicate: $skill(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral8(["Duplicate"]))),
  /** Causes government agent/Source Agent wanderer next turn once per combat and three times per day */
  Portscan: $skill(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral8(["Portscan"]))),
  /** Increase Max MP by 100% and recover 1000 MP once per combat with a 30 turn cooldown */
  Turbo: $skill(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral8(["Turbo"])))
};
function educate(skills) {
  var skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  if (arrayEquals(skillsArray, getSkills()))
    return !0;
  var _iterator = _createForOfIteratorHelper6(skillsArray), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var skill = _step.value;
      if (!Object.values(Skills).includes(skill))
        return !1;
      (0, import_kolmafia14.cliExecute)("terminal educate ".concat(skill.name.toLowerCase(), ".edu"));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return !0;
}
function getSkills() {
  return ["sourceTerminalEducate1", "sourceTerminalEducate2"].map(function(p) {
    return get(p);
  }).filter(function(s) {
    return s !== "";
  }).map(function(s) {
    return import_kolmafia14.Skill.get(s.slice(0, -4));
  });
}
function isCurrentSkill(skills) {
  var currentSkills = getSkills(), skillsArray = Array.isArray(skills) ? skills.slice(0, 2) : [skills];
  return skillsArray.every(function(skill) {
    return currentSkills.includes(skill);
  });
}
var Items = /* @__PURE__ */ new Map([[$item(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral8(["browser cookie"]))), "food.ext"], [$item(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral8(["hacked gibson"]))), "booze.ext"], [$item(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral8(["Source shades"]))), "goggles.ext"], [$item(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral8(["Source terminal GRAM chip"]))), "gram.ext"], [$item(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral8(["Source terminal PRAM chip"]))), "pram.ext"], [$item(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral8(["Source terminal SPAM chip"]))), "spam.ext"], [$item(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral8(["Source terminal CRAM chip"]))), "cram.ext"], [$item(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral8(["Source terminal DRAM chip"]))), "dram.ext"], [$item(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral8(["Source terminal TRAM chip"]))), "tram.ext"], [$item(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral8(["software bug"]))), "familiar.ext"]]);
function extrude(item6) {
  var fileName = Items.get(item6);
  return fileName ? (0, import_kolmafia14.cliExecute)("terminal extrude ".concat(fileName)) : !1;
}
function getChips() {
  return get("sourceTerminalChips").split(",");
}
function getDigitizeUses() {
  return get("_sourceTerminalDigitizeUses");
}
function getDigitizeMonster() {
  return get("_sourceTerminalDigitizeMonster");
}
function getDigitizeMonsterCount() {
  return get("_sourceTerminalDigitizeMonsterCount");
}
function getMaximumDigitizeUses() {
  var chips = getChips();
  return 1 + (chips.includes("TRAM") ? 1 : 0) + (chips.includes("TRIGRAM") ? 1 : 0);
}
function getDigitizeUsesRemaining() {
  return getMaximumDigitizeUses() - getDigitizeUses();
}
function couldDigitize() {
  return getDigitizeUses() < getMaximumDigitizeUses();
}
function prepareDigitize() {
  return isCurrentSkill(Skills.Digitize) ? !0 : educate(Skills.Digitize);
}
function canDigitize() {
  return couldDigitize() && getSkills().includes(Skills.Digitize);
}
var Digitize = new Copier(function() {
  return couldDigitize();
}, function() {
  return prepareDigitize();
}, function() {
  return canDigitize();
}, function() {
  return getDigitizeMonster();
});
function getDuplicateUses() {
  return get("_sourceTerminalDuplicateUses");
}
function getEnhanceUses() {
  return get("_sourceTerminalEnhanceUses");
}
function getPortscanUses() {
  return get("_sourceTerminalPortscanUses");
}
function maximumDuplicateUses() {
  return (0, import_kolmafia14.myPath)() === import_kolmafia14.Path.get("The Source") ? 5 : 1;
}
function duplicateUsesRemaining() {
  return maximumDuplicateUses() - getDuplicateUses();
}
function maximumEnhanceUses() {
  return 1 + getChips().filter(function(chip) {
    return ["CRAM", "SCRAM"].includes(chip);
  }).length;
}
function enhanceUsesRemaining() {
  return maximumEnhanceUses() - getEnhanceUses();
}
function enhanceBuffDuration() {
  return 25 + get("sourceTerminalPram") * 5 + (getChips().includes("INGRAM") ? 25 : 0);
}
function enquiryBuffDuration() {
  return 50 + 10 * get("sourceTerminalGram") + (getChips().includes("DIAGRAM") ? 50 : 0);
}

// node_modules/libram/dist/counter.js
var counter_exports = {};
__export(counter_exports, {
  exists: function() {
    return exists;
  },
  get: function() {
    return get2;
  },
  set: function() {
    return set;
  }
});
init_kolmafia_polyfill();
var import_kolmafia15 = require("kolmafia");
function get2(counter) {
  var value = (0, import_kolmafia15.getCounter)(counter);
  return value === -1 ? (0, import_kolmafia15.getCounters)(counter, -1, -1).trim() === "" ? 1 / 0 : -1 : value;
}
function exists(counter) {
  return (0, import_kolmafia15.getCounter)(counter) !== -1 || (0, import_kolmafia15.getCounters)(counter, -1, -1).trim() !== "";
}
function set(counter, duration) {
  return (0, import_kolmafia15.cliExecute)("counters add ".concat(duration, " ").concat(counter)), get2(counter) !== null;
}

// node_modules/libram/dist/resources/2018/SongBoom.js
var SongBoom_exports = {};
__export(SongBoom_exports, {
  dropProgress: function() {
    return dropProgress;
  },
  have: function() {
    return have5;
  },
  setSong: function() {
    return setSong;
  },
  song: function() {
    return song;
  },
  songBoomSongs: function() {
    return songBoomSongs;
  },
  songChangesLeft: function() {
    return songChangesLeft;
  }
});
init_kolmafia_polyfill();
var import_kolmafia16 = require("kolmafia");
var _templateObject101;
function _taggedTemplateLiteral9(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item2 = $item(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral9(["SongBoom\u2122 BoomBox"])));
function have5() {
  return have(item2);
}
var keywords = {
  "Eye of the Giger": "spooky",
  "Food Vibrations": "food",
  "Remainin' Alive": "dr",
  "These Fists Were Made for Punchin'": "damage",
  "Total Eclipse of Your Meat": "meat"
}, songBoomSongs = new Set(Object.keys(keywords));
function song() {
  var stored = get("boomBoxSong");
  return songBoomSongs.has(stored) ? stored : null;
}
function songChangesLeft() {
  return get("_boomBoxSongsLeft");
}
function setSong(newSong) {
  if (song() !== newSong) {
    if (songChangesLeft() === 0)
      throw new Error("Out of song changes!");
    return (0, import_kolmafia16.cliExecute)("boombox ".concat(newSong ? keywords[newSong] : "none")), !0;
  } else
    return !1;
}
function dropProgress() {
  return get("_boomBoxFights");
}

// node_modules/libram/dist/resources/2019/Snapper.js
var Snapper_exports = {};
__export(Snapper_exports, {
  getProgress: function() {
    return getProgress;
  },
  getTrackedPhylum: function() {
    return getTrackedPhylum;
  },
  have: function() {
    return have6;
  },
  itemPhylum: function() {
    return itemPhylum;
  },
  phylumItem: function() {
    return phylumItem;
  },
  trackPhylum: function() {
    return trackPhylum;
  }
});
init_kolmafia_polyfill();
var import_kolmafia17 = require("kolmafia");
function _slicedToArray6(arr, i) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray11(arr, i) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit6(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray6(arr) {
  return _arrayWithoutHoles6(arr) || _iterableToArray6(arr) || _unsupportedIterableToArray11(arr) || _nonIterableSpread6();
}
function _nonIterableSpread6() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray11(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray11(o, minLen);
  }
}
function _iterableToArray6(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles6(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray11(arr);
}
function _arrayLikeToArray11(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var familiar3 = import_kolmafia17.Familiar.get("Red-Nosed Snapper"), phylumItem = /* @__PURE__ */ new Map([[import_kolmafia17.Phylum.get("beast"), import_kolmafia17.Item.get("patch of extra-warm fur")], [import_kolmafia17.Phylum.get("bug"), import_kolmafia17.Item.get("a bug's lymph")], [import_kolmafia17.Phylum.get("constellation"), import_kolmafia17.Item.get("micronova")], [import_kolmafia17.Phylum.get("construct"), import_kolmafia17.Item.get("industrial lubricant")], [import_kolmafia17.Phylum.get("demon"), import_kolmafia17.Item.get("infernal snowball")], [import_kolmafia17.Phylum.get("dude"), import_kolmafia17.Item.get("human musk")], [import_kolmafia17.Phylum.get("elemental"), import_kolmafia17.Item.get("livid energy")], [import_kolmafia17.Phylum.get("elf"), import_kolmafia17.Item.get("peppermint syrup")], [import_kolmafia17.Phylum.get("fish"), import_kolmafia17.Item.get("fish sauce")], [import_kolmafia17.Phylum.get("goblin"), import_kolmafia17.Item.get("guffin")], [import_kolmafia17.Phylum.get("hippy"), import_kolmafia17.Item.get("organic potpourri")], [import_kolmafia17.Phylum.get("hobo"), import_kolmafia17.Item.get("beggin' cologne")], [import_kolmafia17.Phylum.get("horror"), import_kolmafia17.Item.get("powdered madness")], [import_kolmafia17.Phylum.get("humanoid"), import_kolmafia17.Item.get("vial of humanoid growth hormone")], [import_kolmafia17.Phylum.get("mer-kin"), import_kolmafia17.Item.get("Mer-kin eyedrops")], [import_kolmafia17.Phylum.get("orc"), import_kolmafia17.Item.get("boot flask")], [import_kolmafia17.Phylum.get("penguin"), import_kolmafia17.Item.get("envelope full of Meat")], [import_kolmafia17.Phylum.get("pirate"), import_kolmafia17.Item.get("Shantix\u2122")], [import_kolmafia17.Phylum.get("plant"), import_kolmafia17.Item.get("goodberry")], [import_kolmafia17.Phylum.get("slime"), import_kolmafia17.Item.get("extra-strength goo")], [import_kolmafia17.Phylum.get("undead"), import_kolmafia17.Item.get("unfinished pleasure")], [import_kolmafia17.Phylum.get("weird"), import_kolmafia17.Item.get("non-Euclidean angle")]]), itemPhylum = new Map(_toConsumableArray6(phylumItem).map(function(_ref) {
  var _ref2 = _slicedToArray6(_ref, 2), phylum = _ref2[0], item6 = _ref2[1];
  return [item6, phylum];
}));
function have6() {
  return (0, import_kolmafia17.haveFamiliar)(familiar3);
}
function getTrackedPhylum() {
  return get("redSnapperPhylum");
}
function trackPhylum(phylum) {
  var currentFamiliar = (0, import_kolmafia17.myFamiliar)();
  try {
    (0, import_kolmafia17.useFamiliar)(familiar3), (0, import_kolmafia17.cliExecute)("snapper ".concat(phylum));
  } finally {
    (0, import_kolmafia17.useFamiliar)(currentFamiliar);
  }
}
function getProgress() {
  return get("redSnapperProgress");
}

// node_modules/libram/dist/resources/2020/Guzzlr.js
var Guzzlr_exports = {};
__export(Guzzlr_exports, {
  Cocktails: function() {
    return Cocktails;
  },
  abandon: function() {
    return abandon;
  },
  acceptBronze: function() {
    return acceptBronze;
  },
  acceptGold: function() {
    return acceptGold;
  },
  acceptPlatinum: function() {
    return acceptPlatinum;
  },
  canAbandon: function() {
    return canAbandon;
  },
  canGold: function() {
    return canGold;
  },
  canPlatinum: function() {
    return canPlatinum;
  },
  expectedReward: function() {
    return expectedReward;
  },
  getBooze: function() {
    return getBooze;
  },
  getBronze: function() {
    return getBronze;
  },
  getCheapestPlatinumCocktail: function() {
    return getCheapestPlatinumCocktail;
  },
  getGold: function() {
    return getGold;
  },
  getGoldToday: function() {
    return getGoldToday;
  },
  getLocation: function() {
    return getLocation2;
  },
  getPlatinum: function() {
    return getPlatinum;
  },
  getPlatinumToday: function() {
    return getPlatinumToday;
  },
  getTier: function() {
    return getTier;
  },
  have: function() {
    return have7;
  },
  haveBooze: function() {
    return haveBooze;
  },
  haveFullBronzeBonus: function() {
    return haveFullBronzeBonus;
  },
  haveFullGoldBonus: function() {
    return haveFullGoldBonus;
  },
  haveFullPlatinumBonus: function() {
    return haveFullPlatinumBonus;
  },
  havePlatinumBooze: function() {
    return havePlatinumBooze;
  },
  ingredientToPlatinumCocktail: function() {
    return ingredientToPlatinumCocktail;
  },
  isQuestActive: function() {
    return isQuestActive;
  },
  platinumCocktailToIngredient: function() {
    return platinumCocktailToIngredient;
  },
  turnsLeftOnQuest: function() {
    return turnsLeftOnQuest;
  }
});
init_kolmafia_polyfill();
var import_kolmafia18 = require("kolmafia");
var _templateObject107, _templateObject219, _templateObject318, _templateObject416, _templateObject514, _templateObject611, _templateObject711, _templateObject811, _templateObject911, _templateObject108, _templateObject117, _templateObject127, _templateObject137;
function _slicedToArray7(arr, i) {
  return _arrayWithHoles7(arr) || _iterableToArrayLimit7(arr, i) || _unsupportedIterableToArray12(arr, i) || _nonIterableRest7();
}
function _nonIterableRest7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit7(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles7(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray7(arr) {
  return _arrayWithoutHoles7(arr) || _iterableToArray7(arr) || _unsupportedIterableToArray12(arr) || _nonIterableSpread7();
}
function _nonIterableSpread7() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray12(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray12(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray12(o, minLen);
  }
}
function _iterableToArray7(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles7(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray12(arr);
}
function _arrayLikeToArray12(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral10(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item3 = $item(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral10(["Guzzlr tablet"])));
function have7() {
  return have(item3);
}
function useTabletWithChoice(option) {
  withChoice(1412, option, function() {
    return (0, import_kolmafia18.use)(1, item3);
  });
}
function isQuestActive() {
  return get("questGuzzlr") !== "unstarted";
}
function getPlatinum() {
  return get("guzzlrPlatinumDeliveries");
}
function getPlatinumToday() {
  return get("_guzzlrPlatinumDeliveries");
}
function canPlatinum() {
  return !isQuestActive() && getGold() >= 5 && getPlatinumToday() < 1;
}
function haveFullPlatinumBonus() {
  return getPlatinum() >= 30;
}
function acceptPlatinum() {
  return canPlatinum() ? (useTabletWithChoice(4), !0) : !1;
}
function getGold() {
  return get("guzzlrGoldDeliveries");
}
function getGoldToday() {
  return get("_guzzlrGoldDeliveries");
}
function canGold() {
  return !isQuestActive() && getBronze() >= 5 && getGoldToday() < 3;
}
function haveFullGoldBonus() {
  return getGold() >= 150;
}
function acceptGold() {
  return canGold() ? (useTabletWithChoice(3), !0) : !1;
}
function getBronze() {
  return get("guzzlrBronzeDeliveries");
}
function haveFullBronzeBonus() {
  return getBronze() >= 196;
}
function acceptBronze() {
  return isQuestActive() ? !1 : (useTabletWithChoice(2), !0);
}
function canAbandon() {
  return isQuestActive() && !get("_guzzlrQuestAbandoned");
}
function abandon() {
  return canAbandon() ? ((0, import_kolmafia18.visitUrl)("inventory.php?tap=guzzlr", !1), (0, import_kolmafia18.runChoice)(1), (0, import_kolmafia18.runChoice)(5), !0) : !1;
}
function getLocation2() {
  return get("guzzlrQuestLocation");
}
function getTier() {
  var tier = get("guzzlrQuestTier");
  return tier === "" ? null : tier;
}
function getBooze() {
  var booze = get("guzzlrQuestBooze");
  return booze === "" ? null : import_kolmafia18.Item.get(booze);
}
var Cocktails = $items(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral10(["Buttery Boy, Steamboat, Ghiaccio Colada, Nog-on-the-Cob, Sourfinger"])));
function havePlatinumBooze() {
  return Cocktails.some(function(cock) {
    return (0, import_kolmafia18.itemAmount)(cock) > 0;
  });
}
function haveBooze() {
  var booze = getBooze();
  switch (booze) {
    case null:
      return !1;
    case $item(_templateObject318 || (_templateObject318 = _taggedTemplateLiteral10(["Guzzlr cocktail set"]))):
      return havePlatinumBooze();
    default:
      return (0, import_kolmafia18.itemAmount)(booze) > 0;
  }
}
var ingredientToPlatinumCocktail = /* @__PURE__ */ new Map([[$item(_templateObject416 || (_templateObject416 = _taggedTemplateLiteral10(["miniature boiler"]))), $item(_templateObject514 || (_templateObject514 = _taggedTemplateLiteral10(["Steamboat"])))], [$item(_templateObject611 || (_templateObject611 = _taggedTemplateLiteral10(["cold wad"]))), $item(_templateObject711 || (_templateObject711 = _taggedTemplateLiteral10(["Ghiaccio Colada"])))], [$item(_templateObject811 || (_templateObject811 = _taggedTemplateLiteral10(["robin's egg"]))), $item(_templateObject911 || (_templateObject911 = _taggedTemplateLiteral10(["Nog-on-the-Cob"])))], [$item(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral10(["mangled finger"]))), $item(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral10(["Sourfinger"])))], [$item(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral10(["Dish of Clarified Butter"]))), $item(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral10(["Buttery Boy"])))]]), platinumCocktailToIngredient = invertMap(ingredientToPlatinumCocktail);
function getCheapestPlatinumCocktail() {
  var freeCraft = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return freeCraft ? maxBy(Array.from(ingredientToPlatinumCocktail), function(ingredientAndCocktail) {
    return Math.min.apply(Math, _toConsumableArray7(ingredientAndCocktail.map(function(item6) {
      return (0, import_kolmafia18.mallPrice)(item6);
    })));
  }, !0)[1] : maxBy(Array.from(ingredientToPlatinumCocktail), function(_ref) {
    var _ref2 = _slicedToArray7(_ref, 2), cocktail = _ref2[1];
    return (0, import_kolmafia18.mallPrice)(cocktail);
  })[1];
}
function turnsLeftOnQuest() {
  var useShoes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, progressPerTurn = useShoes ? Math.floor((10 - get("_guzzlrDeliveries")) * 1.5) : 10 - get("_guzzlrDeliveries");
  return Math.ceil((100 - get("guzzlrDeliveryProgress")) / progressPerTurn);
}
function expectedReward() {
  var usePants = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
  switch (getTier()) {
    case "platinum":
      return 22.5 + (usePants ? 5 : 0);
    case "gold":
      return 6 + (usePants ? 3 : 0);
    case "bronze":
      return 3 + (usePants ? 3 : 0);
    default:
      return 0;
  }
}

// node_modules/libram/dist/resources/2022/AutumnAton.js
var AutumnAton_exports = {};
__export(AutumnAton_exports, {
  available: function() {
    return available;
  },
  availableLocations: function() {
    return availableLocations;
  },
  currentUpgrades: function() {
    return currentUpgrades;
  },
  currentlyIn: function() {
    return currentlyIn;
  },
  getUniques: function() {
    return getUniques;
  },
  have: function() {
    return have8;
  },
  legs: function() {
    return legs;
  },
  possibleUpgrades: function() {
    return possibleUpgrades;
  },
  seasonalItems: function() {
    return seasonalItems;
  },
  sendTo: function() {
    return sendTo;
  },
  turnsForQuest: function() {
    return turnsForQuest;
  },
  turnsLeft: function() {
    return turnsLeft;
  },
  upgrade: function() {
    return upgrade;
  },
  visualAcuity: function() {
    return visualAcuity;
  },
  zoneItems: function() {
    return zoneItems;
  }
});
init_kolmafia_polyfill();
var import_kolmafia19 = require("kolmafia");
var _templateObject109, _templateObject220, _templateObject319, _templateObject417, _templateObject515, _templateObject613, _templateObject712, _templateObject812, _templateObject912;
function _taggedTemplateLiteral11(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item4 = import_kolmafia19.Item.get("autumn-aton");
function available() {
  return (0, import_kolmafia19.availableAmount)(item4) > 0;
}
function have8() {
  return get("hasAutumnaton") || available();
}
function checkLocations(html) {
  return (0, import_kolmafia19.xpath)(html, '//select[@name="heythereprogrammer"]//option[position()>1]/text()').map(function(name) {
    return (0, import_kolmafia19.toLocation)(name);
  });
}
function currentlyIn() {
  return get("autumnatonQuestLocation");
}
function sendTo(target) {
  var upgrade2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (!available())
    return null;
  var pageHtml = directlyUse(item4);
  upgrade2 && (0, import_kolmafia19.availableChoiceOptions)()[1] && (0, import_kolmafia19.runChoice)(1);
  var locationsAvailable = checkLocations(pageHtml), location = target instanceof import_kolmafia19.Location ? target : Array.isArray(target) ? target.find(function(l) {
    return locationsAvailable.includes(l);
  }) : target(locationsAvailable);
  return !location || !locationsAvailable.includes(location) ? null : ((0, import_kolmafia19.handlingChoice)() || directlyUse(item4), (0, import_kolmafia19.runChoice)(2, "heythereprogrammer=".concat(location.id)), (0, import_kolmafia19.handlingChoice)() && (0, import_kolmafia19.visitUrl)("main.php"), location);
}
function upgrade() {
  directlyUse(item4);
  var canUpgrade = (0, import_kolmafia19.availableChoiceOptions)()[1] !== void 0;
  return canUpgrade && (0, import_kolmafia19.runChoice)(1), (0, import_kolmafia19.visitUrl)("main.php"), canUpgrade;
}
function availableLocations() {
  if (!available())
    return [];
  var pageHtml = directlyUse(item4);
  return (0, import_kolmafia19.visitUrl)("main.php"), checkLocations(pageHtml);
}
var possibleUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "base_blackhat", "cowcatcher", "periscope", "radardish", "dualexhaust"];
function currentUpgrades() {
  return get("autumnatonUpgrades").split(",");
}
function turnsLeft() {
  return get("autumnatonQuestTurn") - (0, import_kolmafia19.totalTurnsPlayed)();
}
function legs() {
  return currentUpgrades().filter(function(u) {
    return u.includes("leg");
  }).length;
}
function turnsForQuest() {
  return 11 * Math.max(1, get("_autumnatonQuests") - legs());
}
function visualAcuity() {
  var visualUpgrades = ["periscope", "radardish"];
  return 1 + currentUpgrades().filter(function(u) {
    return visualUpgrades.includes(u);
  }).length;
}
function zoneItems() {
  return 3 + currentUpgrades().filter(function(u) {
    return u.includes("arm");
  }).length;
}
function seasonalItems() {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}
var difficulties = ["low", "mid", "high"], UNIQUES = {
  outdoor: {
    low: {
      index: 4,
      item: $item(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral11(["autumn leaf"])))
    },
    mid: {
      index: 2,
      item: $item(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral11(["autumn debris shield"])))
    },
    high: {
      index: 6,
      item: $item(_templateObject319 || (_templateObject319 = _taggedTemplateLiteral11(["autumn leaf pendant"])))
    }
  },
  indoor: {
    low: {
      index: 0,
      item: $item(_templateObject417 || (_templateObject417 = _taggedTemplateLiteral11(["AutumnFest ale"])))
    },
    mid: {
      index: 3,
      item: $item(_templateObject515 || (_templateObject515 = _taggedTemplateLiteral11(["autumn-spice donut"])))
    },
    high: {
      index: 7,
      item: $item(_templateObject613 || (_templateObject613 = _taggedTemplateLiteral11(["autumn breeze"])))
    }
  },
  underground: {
    low: {
      index: 1,
      item: $item(_templateObject712 || (_templateObject712 = _taggedTemplateLiteral11(["autumn sweater-weather sweater"])))
    },
    mid: {
      index: 5,
      item: $item(_templateObject812 || (_templateObject812 = _taggedTemplateLiteral11(["autumn dollar"])))
    },
    high: {
      index: 8,
      item: $item(_templateObject912 || (_templateObject912 = _taggedTemplateLiteral11(["autumn years wisdom"])))
    }
  }
};
function getUniques(location) {
  var env = location.environment, difficulty = location.difficultyLevel;
  if (arrayContains(env, ["outdoor", "indoor", "underground"]) && arrayContains(difficulty, difficulties)) {
    var _UNIQUES$env$difficul = UNIQUES[env][difficulty], index = _UNIQUES$env$difficul.index, _item = _UNIQUES$env$difficul.item;
    return {
      upgrade: possibleUpgrades[index],
      item: _item
    };
  }
  return null;
}

// node_modules/libram/dist/resources/2022/JuneCleaver.js
var JuneCleaver_exports = {};
__export(JuneCleaver_exports, {
  choices: function() {
    return choices;
  },
  choicesAvailable: function() {
    return choicesAvailable;
  },
  cleaver: function() {
    return cleaver;
  },
  damage: function() {
    return damage;
  },
  getInterval: function() {
    return getInterval;
  },
  getSkippedInterval: function() {
    return getSkippedInterval;
  },
  have: function() {
    return have9;
  },
  queue: function() {
    return queue;
  },
  skipsRemaining: function() {
    return skipsRemaining;
  }
});
init_kolmafia_polyfill();
var import_kolmafia20 = require("kolmafia");
var cleaver = (0, import_kolmafia20.toItem)("June cleaver");
function have9() {
  return (0, import_kolmafia20.availableAmount)(cleaver) > 0;
}
function getInterval() {
  var _encounters, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters = [1, 6, 10, 12, 15, 20][encounters]) !== null && _encounters !== void 0 ? _encounters : 30;
}
function getSkippedInterval() {
  var _encounters2, encounters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : get("_juneCleaverEncounters");
  return (_encounters2 = [1, 2, 3, 3, 4, 5][encounters]) !== null && _encounters2 !== void 0 ? _encounters2 : 8;
}
function damage(element) {
  return get("_juneCleaver".concat(element));
}
function skipsRemaining() {
  return 5 - get("_juneCleaverSkips");
}
var choices = [1467, 1468, 1469, 1470, 1471, 1472, 1473, 1474, 1475];
function queue() {
  return get("juneCleaverQueue").split(",").filter(function(x) {
    return x.trim().length > 0;
  }).map(function(x) {
    return parseInt(x);
  });
}
function choicesAvailable() {
  var currentQueue = queue();
  return choices.filter(function(choice) {
    return !currentQueue.includes(choice);
  });
}

// node_modules/libram/dist/resources/2022/TrainSet.js
var TrainSet_exports = {};
__export(TrainSet_exports, {
  Station: function() {
    return Station;
  },
  canConfigure: function() {
    return canConfigure;
  },
  cycle: function() {
    return cycle;
  },
  doubledEffect: function() {
    return doubledEffect;
  },
  effect: function() {
    return effect;
  },
  have: function() {
    return have10;
  },
  installed: function() {
    return installed2;
  },
  next: function() {
    return next;
  },
  nextConfigurable: function() {
    return nextConfigurable;
  },
  setConfiguration: function() {
    return setConfiguration;
  }
});
init_kolmafia_polyfill();
var import_kolmafia21 = require("kolmafia");
var _templateObject110;
function _taggedTemplateLiteral12(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var item5 = $item(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral12(["model train set"])));
function installed2() {
  return (0, import_kolmafia21.getWorkshed)() === item5;
}
function have10() {
  return installed2() || have(item5);
}
var Station;
(function(Station2) {
  Station2.UNKNOWN = "", Station2.EMPTY = "empty", Station2.GAIN_MEAT = "meat_mine", Station2.TOWER_FIZZY = "tower_fizzy", Station2.VIEWING_PLATFORM = "viewing_platform", Station2.TOWER_FROZEN = "tower_frozen", Station2.SPOOKY_GRAVEYARD = "spooky_graveyard", Station2.LOGGING_MILL = "logging_mill", Station2.CANDY_FACTORY = "candy_factory", Station2.COAL_HOPPER = "coal_hopper", Station2.TOWER_SEWAGE = "tower_sewage", Station2.OIL_REFINERY = "oil_refinery", Station2.OIL_BRIDGE = "oil_bridge", Station2.WATER_BRIDGE = "water_bridge", Station2.GROIN_SILO = "groin_silo", Station2.GRAIN_SILO = "grain_silo", Station2.BRAIN_SILO = "brain_silo", Station2.BRAWN_SILO = "brawn_silo", Station2.PRAWN_SILO = "prawn_silo", Station2.TRACKSIDE_DINER = "trackside_diner", Station2.ORE_HOPPER = "ore_hopper";
})(Station || (Station = {}));
var trainsetEffects = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia21.Effect.get("Carbonated")], [Station.TOWER_FROZEN, import_kolmafia21.Effect.get("Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia21.Effect.get("Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia21.Effect.get("Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia21.Effect.get("Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia21.Effect.get("Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia21.Effect.get("Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia21.Effect.get("Craving Prawns")]]), trainsetEffectsDoubled = /* @__PURE__ */ new Map([[Station.TOWER_FIZZY, import_kolmafia21.Effect.get("Double Carbonated")], [Station.TOWER_FROZEN, import_kolmafia21.Effect.get("Double Frozen")], [Station.SPOOKY_GRAVEYARD, import_kolmafia21.Effect.get("Doubly Shivering Spine")], [Station.TOWER_SEWAGE, import_kolmafia21.Effect.get("Double Hot Soupy Garbage")], [Station.OIL_BRIDGE, import_kolmafia21.Effect.get("Doubly Burningly Oiled")], [Station.OIL_REFINERY, import_kolmafia21.Effect.get("Doubly Spookily Greasy")], [Station.WATER_BRIDGE, import_kolmafia21.Effect.get("Doubly Troubled Waters")], [Station.PRAWN_SILO, import_kolmafia21.Effect.get("Doubly Craving Prawns")]]);
function effect(station) {
  var _trainsetEffects$get;
  return (_trainsetEffects$get = trainsetEffects.get(station)) !== null && _trainsetEffects$get !== void 0 ? _trainsetEffects$get : null;
}
function doubledEffect(station) {
  var _trainsetEffectsDoubl;
  return (_trainsetEffectsDoubl = trainsetEffectsDoubled.get(station)) !== null && _trainsetEffectsDoubl !== void 0 ? _trainsetEffectsDoubl : null;
}
function cycle() {
  return get("trainsetConfiguration").split(",");
}
function nextConfigurable() {
  return clamp(get("lastTrainsetConfiguration") + 40 - get("trainsetPosition"), 0, 40);
}
function canConfigure() {
  return installed2() && !nextConfigurable();
}
var pieces = [Station.EMPTY, Station.GAIN_MEAT, Station.TOWER_FIZZY, Station.VIEWING_PLATFORM, Station.TOWER_FROZEN, Station.SPOOKY_GRAVEYARD, Station.LOGGING_MILL, Station.CANDY_FACTORY, Station.COAL_HOPPER, Station.TOWER_SEWAGE, Station.UNKNOWN, Station.OIL_REFINERY, Station.OIL_BRIDGE, Station.WATER_BRIDGE, Station.GROIN_SILO, Station.GRAIN_SILO, Station.BRAIN_SILO, Station.BRAWN_SILO, Station.PRAWN_SILO, Station.TRACKSIDE_DINER, Station.ORE_HOPPER];
function stationToInt(station) {
  return pieces.indexOf(station);
}
function setConfiguration(configuration) {
  if (!canConfigure())
    return !1;
  (0, import_kolmafia21.visitUrl)("campground.php?action=workshed"), (0, import_kolmafia21.runChoice)(1, "forceoption=0".concat(configuration.map(function(station, index) {
    return "&slot[".concat(index, "]=").concat(stationToInt(station));
  }).join(""))), (0, import_kolmafia21.visitUrl)("main.php");
  var currentConfiguration = cycle();
  return configuration.every(function(station, index) {
    return station === currentConfiguration[index];
  });
}
function next() {
  return cycle()[get("trainsetPosition") % 8];
}

// node_modules/libram/dist/session.js
init_kolmafia_polyfill();
var import_kolmafia22 = require("kolmafia");
var _templateObject111, _templateObject221, _templateObject320, _templateObject418, _templateObject516, _templateObject614, _templateObject713, _templateObject813, _templateObject913, _templateObject1010, _templateObject118, _templateObject128, _templateObject138, _templateObject146, _templateObject156, _templateObject166, _templateObject176, _templateObject186, _templateObject196, _templateObject206, _templateObject2110, _templateObject226, _templateObject236, _templateObject246, _templateObject256, _templateObject266, _templateObject276, _templateObject285, _templateObject295, _templateObject305, _templateObject3110, _templateObject325, _templateObject335;
function _classCallCheck9(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties7(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass7(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties7(Constructor.prototype, protoProps), staticProps && _defineProperties7(Constructor, staticProps), Constructor;
}
function _defineProperty9(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper7(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray13(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _slicedToArray8(arr, i) {
  return _arrayWithHoles8(arr) || _iterableToArrayLimit8(arr, i) || _unsupportedIterableToArray13(arr, i) || _nonIterableRest8();
}
function _nonIterableRest8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit8(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles8(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _taggedTemplateLiteral13(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray8(arr) {
  return _arrayWithoutHoles8(arr) || _iterableToArray8(arr) || _unsupportedIterableToArray13(arr) || _nonIterableSpread8();
}
function _nonIterableSpread8() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray13(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray13(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray13(o, minLen);
  }
}
function _iterableToArray8(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles8(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray13(arr);
}
function _arrayLikeToArray13(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function mySessionItemsWrapper() {
  for (var manyToOne = function(primary, mapped) {
    return mapped.map(function(target) {
      return [target, primary];
    });
  }, foldable = function(item7) {
    return manyToOne(item7, getFoldGroup(item7));
  }, itemMappings = new Map([].concat(_toConsumableArray8(foldable($item(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral13(["liar's pants"]))))), _toConsumableArray8(foldable($item(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral13(["ice pick"]))))), _toConsumableArray8(manyToOne($item(_templateObject320 || (_templateObject320 = _taggedTemplateLiteral13(["Spooky Putty sheet"]))), [$item(_templateObject418 || (_templateObject418 = _taggedTemplateLiteral13(["Spooky Putty monster"])))].concat(_toConsumableArray8(getFoldGroup($item(_templateObject516 || (_templateObject516 = _taggedTemplateLiteral13(["Spooky Putty sheet"])))))))), _toConsumableArray8(foldable($item(_templateObject614 || (_templateObject614 = _taggedTemplateLiteral13(["stinky cheese sword"]))))), _toConsumableArray8(foldable($item(_templateObject713 || (_templateObject713 = _taggedTemplateLiteral13(["naughty paper shuriken"]))))), _toConsumableArray8(foldable($item(_templateObject813 || (_templateObject813 = _taggedTemplateLiteral13(["Loathing Legion knife"]))))), _toConsumableArray8(foldable($item(_templateObject913 || (_templateObject913 = _taggedTemplateLiteral13(["deceased crimbo tree"]))))), _toConsumableArray8(foldable($item(_templateObject1010 || (_templateObject1010 = _taggedTemplateLiteral13(["makeshift turban"]))))), _toConsumableArray8(foldable($item(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral13(["turtle wax shield"]))))), _toConsumableArray8(foldable($item(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral13(["metallic foil bow"]))))), _toConsumableArray8(foldable($item(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral13(["ironic moustache"]))))), _toConsumableArray8(foldable($item(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral13(["bugged balaclava"]))))), _toConsumableArray8(foldable($item(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral13(["toggle switch (Bartend)"]))))), _toConsumableArray8(foldable($item(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral13(["mushroom cap"]))))), _toConsumableArray8(manyToOne($item(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral13(["can of Rain-Doh"]))), $items(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral13(["empty Rain-Doh can"]))))), _toConsumableArray8(manyToOne($item(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral13(["meteorite fragment"]))), $items(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral13(["meteorite earring, meteorite necklace, meteorite ring"]))))), _toConsumableArray8(manyToOne($item(_templateObject2110 || (_templateObject2110 = _taggedTemplateLiteral13(["Sneaky Pete's leather jacket"]))), $items(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral13(["Sneaky Pete's leather jacket (collar popped)"]))))), _toConsumableArray8(manyToOne($item(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral13(["Boris's Helm"]))), $items(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral13(["Boris's Helm (askew)"]))))), _toConsumableArray8(manyToOne($item(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral13(["Jarlsberg's pan"]))), $items(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral13(["Jarlsberg's pan (Cosmic portal mode)"]))))), _toConsumableArray8(manyToOne($item(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral13(["tiny plastic sword"]))), $items(_templateObject285 || (_templateObject285 = _taggedTemplateLiteral13(["grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo"]))))), _toConsumableArray8(manyToOne($item(_templateObject295 || (_templateObject295 = _taggedTemplateLiteral13(["earthenware muffin tin"]))), $items(_templateObject305 || (_templateObject305 = _taggedTemplateLiteral13(["blueberry muffin, bran muffin, chocolate chip muffin"]))))), _toConsumableArray8(manyToOne($item(_templateObject3110 || (_templateObject3110 = _taggedTemplateLiteral13(["ChibiBuddy\u2122 (on)"]))), $items(_templateObject325 || (_templateObject325 = _taggedTemplateLiteral13(["ChibiBuddy\u2122 (off)"]))))))), inventory = /* @__PURE__ */ new Map(), _i = 0, _arr = [import_kolmafia22.mySessionItems, import_kolmafia22.getCloset, import_kolmafia22.getDisplay, import_kolmafia22.getStorage]; _i < _arr.length; _i++)
    for (var inventoryFunc = _arr[_i], _i2 = 0, _Object$entries = Object.entries(inventoryFunc()); _i2 < _Object$entries.length; _i2++) {
      var _itemMappings$get, _inventory$get, _Object$entries$_i = _slicedToArray8(_Object$entries[_i2], 2), itemStr = _Object$entries$_i[0], quantity = _Object$entries$_i[1], item6 = (0, import_kolmafia22.toItem)(itemStr), mappedItem = (_itemMappings$get = itemMappings.get(item6)) !== null && _itemMappings$get !== void 0 ? _itemMappings$get : item6;
      inventory.set(mappedItem, quantity + ((_inventory$get = inventory.get(mappedItem)) !== null && _inventory$get !== void 0 ? _inventory$get : 0));
    }
  for (var _i3 = 0, _Object$entries2 = Object.entries((0, import_kolmafia22.getCampground)()); _i3 < _Object$entries2.length; _i3++) {
    var _itemMappings$get2, _inventory$get2, _Object$entries2$_i = _slicedToArray8(_Object$entries2[_i3], 2), _itemStr = _Object$entries2$_i[0], _quantity = _Object$entries2$_i[1], _item = (0, import_kolmafia22.toItem)(_itemStr);
    if (_item !== $item(_templateObject335 || (_templateObject335 = _taggedTemplateLiteral13(["big rock"])))) {
      var _mappedItem = (_itemMappings$get2 = itemMappings.get(_item)) !== null && _itemMappings$get2 !== void 0 ? _itemMappings$get2 : _item;
      inventory.set(_mappedItem, _quantity + ((_inventory$get2 = inventory.get(_mappedItem)) !== null && _inventory$get2 !== void 0 ? _inventory$get2 : 0));
    }
  }
  return inventory;
}
function inventoryOperation(a, b, op) {
  var difference = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper7(new Set([].concat(_toConsumableArray8(a.keys()), _toConsumableArray8(b.keys())))), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _a$get, _b$get, item6 = _step.value;
      difference.set(item6, op((_a$get = a.get(item6)) !== null && _a$get !== void 0 ? _a$get : 0, (_b$get = b.get(item6)) !== null && _b$get !== void 0 ? _b$get : 0));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var diffEntries = _toConsumableArray8(difference.entries());
  return new Map(diffEntries.filter(function(value) {
    return value[1] !== 0;
  }));
}
var Session = /* @__PURE__ */ function() {
  function Session2(meat, items) {
    _classCallCheck9(this, Session2), _defineProperty9(this, "meat", void 0), _defineProperty9(this, "items", void 0), this.meat = meat, this.items = items;
  }
  return _createClass7(Session2, [{
    key: "register",
    value: function(target, quantity) {
      if (target === "meat")
        this.meat += quantity;
      else {
        var _this$items$get;
        this.items.set(target, ((_this$items$get = this.items.get(target)) !== null && _this$items$get !== void 0 ? _this$items$get : 0) + quantity);
      }
    }
    /**
     * Value this session
     *
     * @param itemValue a function that, when given an item, will give a meat value of the item
     * @returns ItemResult with the full value of this session given the input function
     */
  }, {
    key: "value",
    value: function(itemValue) {
      var meat = Math.floor(this.meat), itemDetails = _toConsumableArray8(this.items.entries()).map(function(_ref) {
        var _ref2 = _slicedToArray8(_ref, 2), item6 = _ref2[0], quantity = _ref2[1];
        return {
          item: item6,
          quantity: quantity,
          value: itemValue(item6) * quantity
        };
      }), items = Math.floor(sum(itemDetails, "value"));
      return {
        meat: meat,
        items: items,
        total: meat + items,
        itemDetails: itemDetails
      };
    }
    /**
     * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param other the session from which to pull values to remove from this session
     * @returns a new session representing the difference between this session and the other session
     */
  }, {
    key: "diff",
    value: function(other) {
      return new Session2(this.meat - other.meat, inventoryOperation(this.items, other.items, function(a, b) {
        return a - b;
      }));
    }
    /**
     * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
     *  (this will ignore elements in b but not in a)
     *
     * @param a the session from which to subtract elements
     * @param b the session from which to add elements
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "add",
    value: (
      /**
       * Generate a new session combining multiple sessions together
       *
       * @param other the session from which to add elements to this set
       * @returns a new session representing the addition of other to this
       */
      function(other) {
        return new Session2(this.meat + other.meat, inventoryOperation(this.items, other.items, function(a, b) {
          return a + b;
        }));
      }
    )
    /**
     * Combine the contents of sessions
     *
     * @param sessions the set of sessions to combine together
     * @returns a new session representing the difference between a and b
     */
  }, {
    key: "toFile",
    value: (
      /**
       * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
       *
       * @param filename The file into which to export
       */
      function(filename) {
        var val = {
          meat: this.meat,
          items: Object.fromEntries(this.items)
        };
        (0, import_kolmafia22.bufferToFile)(JSON.stringify(val), Session2.getFilepath(filename));
      }
    )
    /**
     * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
     *
     * @param filename The file from which to import
     * @returns the session represented by the file
     */
  }], [{
    key: "diff",
    value: function(a, b) {
      return a.diff(b);
    }
  }, {
    key: "add",
    value: function() {
      for (var _len = arguments.length, sessions = new Array(_len), _key = 0; _key < _len; _key++)
        sessions[_key] = arguments[_key];
      return sessions.reduce(function(previousSession, currentSession) {
        return previousSession.add(currentSession);
      });
    }
  }, {
    key: "getFilepath",
    value: function(filename) {
      return filename.endsWith(".json") ? filename : "snapshots/".concat((0, import_kolmafia22.myName)(), "/").concat((0, import_kolmafia22.todayToString)(), "_").concat(filename, ".json");
    }
  }, {
    key: "fromFile",
    value: function(filename) {
      var fileValue = (0, import_kolmafia22.fileToBuffer)(Session2.getFilepath(filename));
      if (fileValue.length > 0) {
        var val = JSON.parse(fileValue), parsedItems = Object.entries(val.items).map(function(_ref3) {
          var _ref4 = _slicedToArray8(_ref3, 2), itemStr = _ref4[0], quantity = _ref4[1];
          return [(0, import_kolmafia22.toItem)(itemStr), quantity];
        });
        return new Session2(val.meat, new Map(parsedItems));
      } else
        return new Session2(0, /* @__PURE__ */ new Map());
    }
  }, {
    key: "current",
    value: function() {
      return new Session2(sum([import_kolmafia22.mySessionMeat, import_kolmafia22.myClosetMeat, import_kolmafia22.myStorageMeat], function(f) {
        return f();
      }), mySessionItemsWrapper());
    }
  }]), Session2;
}();

// node_modules/grimoire-kolmafia/dist/combat.js
function _inherits3(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf3(subClass, superClass);
}
function _setPrototypeOf3(o, p) {
  return _setPrototypeOf3 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf3(o, p);
}
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn3(this, result);
  };
}
function _possibleConstructorReturn3(self, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized3(self);
}
function _assertThisInitialized3(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf3(o) {
  return _getPrototypeOf3 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf3(o);
}
function _toConsumableArray9(arr) {
  return _arrayWithoutHoles9(arr) || _iterableToArray9(arr) || _unsupportedIterableToArray14(arr) || _nonIterableSpread9();
}
function _nonIterableSpread9() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray9(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles9(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray14(arr);
}
function _createForOfIteratorHelper8(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray14(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray14(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray14(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray14(o, minLen);
  }
}
function _arrayLikeToArray14(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck10(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties8(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass8(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties8(Constructor.prototype, protoProps), staticProps && _defineProperties8(Constructor, staticProps), Constructor;
}
var CombatStrategy = /* @__PURE__ */ function() {
  function CombatStrategy2() {
    _classCallCheck10(this, CombatStrategy2), this.macros = /* @__PURE__ */ new Map(), this.autoattacks = /* @__PURE__ */ new Map(), this.actions = /* @__PURE__ */ new Map(), this.ccs_entries = /* @__PURE__ */ new Map();
  }
  return _createClass8(CombatStrategy2, [{
    key: "macro",
    value: function(_macro, monsters, prepend) {
      var _a, _b;
      if (monsters === void 0)
        this.default_macro === void 0 && (this.default_macro = []), prepend ? this.default_macro.unshift(_macro) : this.default_macro.push(_macro);
      else {
        monsters instanceof import_kolmafia23.Monster && (monsters = [monsters]);
        var _iterator = _createForOfIteratorHelper8(monsters), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var monster = _step.value;
            this.macros.has(monster) || this.macros.set(monster, []), prepend ? (_a = this.macros.get(monster)) === null || _a === void 0 || _a.unshift(_macro) : (_b = this.macros.get(monster)) === null || _b === void 0 || _b.push(_macro);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return this;
    }
    /**
     * Add a macro to perform as an autoattack for this monster. If multiple
     * macros are given for the same monster, they are concatinated.
     *
     * @param macro The macro to perform as autoattack.
     * @param monsters Which monsters to use the macro on. If not given, add the
     *  macro as a general macro.
     * @param prepend If true, add the macro before all previous autoattack
     *    macros for the same monster. If false, add after all previous macros.
     * @returns this
     */
  }, {
    key: "autoattack",
    value: function(macro, monsters, prepend) {
      var _a, _b;
      if (monsters === void 0)
        this.default_autoattack === void 0 && (this.default_autoattack = []), prepend ? this.default_autoattack.unshift(macro) : this.default_autoattack.push(macro);
      else {
        monsters instanceof import_kolmafia23.Monster && (monsters = [monsters]);
        var _iterator2 = _createForOfIteratorHelper8(monsters), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var monster = _step2.value;
            this.autoattacks.has(monster) || this.autoattacks.set(monster, []), prepend ? (_a = this.autoattacks.get(monster)) === null || _a === void 0 || _a.unshift(macro) : (_b = this.autoattacks.get(monster)) === null || _b === void 0 || _b.push(macro);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return this;
    }
    /**
     * Add a macro to perform at the start of combat.
     * @param macro The macro to perform.
     * @param prepend If true, add the macro before all previous starting
     *    macros. If false, add after all previous starting macros.
     * @returns this
     */
  }, {
    key: "startingMacro",
    value: function(macro, prepend) {
      return this.starting_macro === void 0 && (this.starting_macro = []), prepend ? this.starting_macro.unshift(macro) : this.starting_macro.push(macro), this;
    }
    /**
     * Add an action to perform for this monster. Only one action can be set for
     * each monster; any previous actions are overwritten.
     *
     * @param action The action to perform.
     * @param monsters Which monsters to use the action on. If not given, set the
     *  action as the general action for all monsters.
     * @returns this
     */
  }, {
    key: "action",
    value: function(_action, monsters) {
      if (monsters === void 0)
        this.default_action = _action;
      else if (monsters instanceof import_kolmafia23.Monster)
        this.actions.set(monsters, _action);
      else {
        var _iterator3 = _createForOfIteratorHelper8(monsters), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var monster = _step3.value;
            this.actions.set(monster, _action);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return this;
    }
    /**
     * Add a separate entry in the grimoire-generated CCS file for the specified
     * monster. If multiple entries are given for the same monster, they are
     * concatinated.
     *
     * This should typically be only used rarely, on monsters for which KoL does
     * not support macros in combat (e.g. rampaging adding machine).
     *
     * @param entry The entry to add for the given monster.
     * @param monsters Which monsters to add the entry to.
     * @param prepend If true, add the entry before all previous entries. If
     *   false, add after all previous entries.
     */
  }, {
    key: "ccs",
    value: function(entry, monsters, prepend) {
      var _a, _b;
      monsters instanceof import_kolmafia23.Monster && (monsters = [monsters]);
      var _iterator4 = _createForOfIteratorHelper8(monsters), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var monster = _step4.value;
          this.ccs_entries.has(monster) || this.ccs_entries.set(monster, []), prepend ? (_a = this.ccs_entries.get(monster)) === null || _a === void 0 || _a.unshift(entry) : (_b = this.ccs_entries.get(monster)) === null || _b === void 0 || _b.push(entry);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return this;
    }
    /**
     * Check if the provided action was requested for any monsters, or for the
     * general action.
     */
  }, {
    key: "can",
    value: function(action) {
      return action === this.default_action ? !0 : Array.from(this.actions.values()).includes(action);
    }
    /**
     * Return the general action (if it exists).
     */
  }, {
    key: "getDefaultAction",
    value: function() {
      return this.default_action;
    }
    /**
     * Return all monsters where the provided action was requested.
     */
  }, {
    key: "where",
    value: function(action) {
      var _this = this;
      return Array.from(this.actions.keys()).filter(function(key) {
        return _this.actions.get(key) === action;
      });
    }
    /**
     * Return the requested action (if it exists) for the provided monster.
     */
  }, {
    key: "currentStrategy",
    value: function(monster) {
      var _a;
      return (_a = this.actions.get(monster)) !== null && _a !== void 0 ? _a : this.default_action;
    }
    /**
     * Perform a deep copy of this combat strategy.
     */
  }, {
    key: "clone",
    value: function() {
      var result = new CombatStrategy2();
      this.starting_macro && (result.starting_macro = _toConsumableArray9(this.starting_macro)), this.default_macro && (result.default_macro = _toConsumableArray9(this.default_macro));
      var _iterator5 = _createForOfIteratorHelper8(this.macros), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var pair = _step5.value;
          result.macros.set(pair[0], _toConsumableArray9(pair[1]));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.default_autoattack && (result.default_autoattack = _toConsumableArray9(this.default_autoattack));
      var _iterator6 = _createForOfIteratorHelper8(this.autoattacks), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var _pair = _step6.value;
          result.autoattacks.set(_pair[0], _toConsumableArray9(_pair[1]));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      result.default_action = this.default_action;
      var _iterator7 = _createForOfIteratorHelper8(this.actions), _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
          var _pair2 = _step7.value;
          result.actions.set(_pair2[0], _pair2[1]);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var _iterator8 = _createForOfIteratorHelper8(this.ccs_entries), _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
          var _pair3 = _step8.value;
          result.ccs_entries.set(_pair3[0], _toConsumableArray9(_pair3[1]));
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      return result;
    }
    /**
     * Compile this combat strategy into a complete macro.
     *
     * @param resources The resources to use to fulfil actions.
     * @param defaults Macros to perform for each action without a resource.
     * @param location The adventuring location, if known.
     * @returns The compiled macro.
     */
  }, {
    key: "compile",
    value: function(resources, defaults, location) {
      var _a, _b, result = new Macro();
      this.starting_macro && result.step.apply(result, _toConsumableArray9(this.starting_macro.map(undelay)));
      var monster_macros = new CompressedMacro();
      this.macros.forEach(function(value, key) {
        var _Macro;
        monster_macros.add(key, (_Macro = new Macro()).step.apply(_Macro, _toConsumableArray9(value.map(undelay))));
      }), result.step(monster_macros.compile()), this.default_macro && result.step.apply(result, _toConsumableArray9(this.default_macro.map(undelay)));
      var monster_actions = new CompressedMacro();
      if (this.actions.forEach(function(action, key) {
        var _a2, _b2, macro2 = (_a2 = resources.getMacro(action)) !== null && _a2 !== void 0 ? _a2 : (_b2 = defaults == null ? void 0 : defaults[action]) === null || _b2 === void 0 ? void 0 : _b2.call(defaults, key);
        macro2 && monster_actions.add(key, new Macro().step(macro2));
      }), result.step(monster_actions.compile()), this.default_action) {
        var macro = (_a = resources.getMacro(this.default_action)) !== null && _a !== void 0 ? _a : (_b = defaults == null ? void 0 : defaults[this.default_action]) === null || _b === void 0 ? void 0 : _b.call(defaults, location);
        macro && result.step(macro);
      }
      return result;
    }
    /**
     * Compile the autoattack of this combat strategy into a complete macro.
     *
     * @returns The compiled autoattack macro.
     */
  }, {
    key: "compileAutoattack",
    value: function() {
      var result = new Macro(), monster_macros = new CompressedMacro();
      return this.autoattacks.forEach(function(value, key) {
        var _Macro2;
        monster_macros.add(key, (_Macro2 = new Macro()).step.apply(_Macro2, _toConsumableArray9(value.map(undelay))));
      }), result.step(monster_macros.compile()), this.default_autoattack && result.step.apply(result, _toConsumableArray9(this.default_autoattack.map(undelay))), result;
    }
    /**
     * Compile the CCS entries of this combat strategy into a single array.
     *
     * @returns The lines of a CCS file, not including the [default] macro.
     */
  }, {
    key: "compileCcs",
    value: function() {
      var result = [], _iterator9 = _createForOfIteratorHelper8(this.ccs_entries), _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
          var ccs_entry = _step9.value;
          result.push.apply(result, ["[".concat(ccs_entry[0].name, "]")].concat(_toConsumableArray9(ccs_entry[1])));
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      return result;
    }
    /**
     * For advanced users, this method will generate a fluent API for requesting
     * actions. That is, it allows you to do
     *   combat.banish(monster1).kill(monster2)
     * instead of
     *   combat.action("banish", monster1).action("kill", monster2)
     *
     * Example usage:
     *   const myActions = ["kill", "banish"] as const;
     *   class MyCombatStrategy extends CombatStrategy.withActions(myActions) {}
     *
     *   const foo: MyCombatStrategy = new MyCombatStrategy();
     *   const bar: MyCombatStrategy = foo.banish($monster`crate`).kill($monster`tumbleweed`);
     */
  }], [{
    key: "withActions",
    value: function(actions) {
      var CombatStrategyWithActions = /* @__PURE__ */ function(_this) {
        _inherits3(CombatStrategyWithActions2, _this);
        var _super = _createSuper3(CombatStrategyWithActions2);
        function CombatStrategyWithActions2() {
          return _classCallCheck10(this, CombatStrategyWithActions2), _super.apply(this, arguments);
        }
        return CombatStrategyWithActions2;
      }(this), proto = CombatStrategyWithActions.prototype, _iterator10 = _createForOfIteratorHelper8(actions), _step10;
      try {
        var _loop = function() {
          var action = _step10.value;
          proto[action] = function(monsters) {
            return this.action(action, monsters);
          };
        };
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done; )
          _loop();
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      return CombatStrategyWithActions;
    }
  }]), CombatStrategy2;
}(), CompressedMacro = /* @__PURE__ */ function() {
  function CompressedMacro2() {
    _classCallCheck10(this, CompressedMacro2), this.components = /* @__PURE__ */ new Map();
  }
  return _createClass8(CompressedMacro2, [{
    key: "add",
    value: function(monster, macro) {
      var _a, macro_text = macro.toString();
      macro_text.length !== 0 && (this.components.has(macro_text) ? (_a = this.components.get(macro_text)) === null || _a === void 0 || _a.push(monster) : this.components.set(macro_text, [monster]));
    }
    /**
     * Compile the compressed form of the macro.
     */
  }, {
    key: "compile",
    value: function() {
      var result = new Macro();
      return this.components.forEach(function(monsters, macro) {
        var condition = monsters.map(function(mon) {
          return "monsterid ".concat(mon.id);
        }).join(" || ");
        result.if_(condition, macro);
      }), result;
    }
  }]), CompressedMacro2;
}(), CombatResources = /* @__PURE__ */ function() {
  function CombatResources2() {
    _classCallCheck10(this, CombatResources2), this.resources = /* @__PURE__ */ new Map();
  }
  return _createClass8(CombatResources2, [{
    key: "provide",
    value: function(action, resource) {
      resource !== void 0 && this.resources.set(action, resource);
    }
    /**
     * Return true if the provided action has a resource provided.
     */
  }, {
    key: "has",
    value: function(action) {
      return this.resources.has(action);
    }
    /**
     * Return all provided combat resources.
     */
  }, {
    key: "all",
    value: function() {
      return Array.from(this.resources.values());
    }
    /**
     * Get the macro provided by the resource for this action, or undefined if
     * no resource was provided.
     */
  }, {
    key: "getMacro",
    value: function(action) {
      var resource = this.resources.get(action);
      if (resource !== void 0)
        return resource.do instanceof import_kolmafia23.Item ? new Macro().item(resource.do) : resource.do instanceof import_kolmafia23.Skill ? new Macro().skill(resource.do) : undelay(resource.do);
    }
  }]), CombatResources2;
}();

// node_modules/grimoire-kolmafia/dist/engine.js
init_kolmafia_polyfill();
var import_kolmafia25 = require("kolmafia");

// node_modules/grimoire-kolmafia/dist/outfit.js
init_kolmafia_polyfill();
var import_kolmafia24 = require("kolmafia");
var _templateObject119, _templateObject227, _templateObject321, _templateObject419, _templateObject517, _templateObject615, _templateObject714, _templateObject814, _templateObject914, _templateObject1011, _templateObject1110, _templateObject129, _templateObject139, _templateObject147, _templateObject157, _templateObject167, _templateObject177, _templateObject187, _templateObject197, _templateObject207, _templateObject2111, _templateObject228, _templateObject237, _templateObject247, _templateObject257, _templateObject267, _templateObject277, _templateObject286, _templateObject296, _templateObject306, _templateObject3111, _templateObject326, _templateObject336, _templateObject345, _templateObject354, _templateObject364, _templateObject374, _templateObject384, _templateObject394, _templateObject404, _templateObject4110, _templateObject424, _templateObject434, _templateObject444, _templateObject454, _templateObject464, _templateObject474, _templateObject484, _templateObject494, _templateObject504, _templateObject518, _templateObject524, _templateObject534, _templateObject544, _templateObject554, _templateObject563, _templateObject573, _templateObject583, _templateObject593, _templateObject603, _templateObject616, _templateObject624, _templateObject633, _templateObject643, _templateObject653, _templateObject663, _templateObject672;
function ownKeys5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys5(Object(source), !0).forEach(function(key) {
      _defineProperty10(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty10(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _slicedToArray9(arr, i) {
  return _arrayWithHoles9(arr) || _iterableToArrayLimit9(arr, i) || _unsupportedIterableToArray15(arr, i) || _nonIterableRest9();
}
function _nonIterableRest9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit9(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles9(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper9(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray15(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral14(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray10(arr) {
  return _arrayWithoutHoles10(arr) || _iterableToArray10(arr) || _unsupportedIterableToArray15(arr) || _nonIterableSpread10();
}
function _nonIterableSpread10() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray15(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray15(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray15(o, minLen);
  }
}
function _iterableToArray10(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles10(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray15(arr);
}
function _arrayLikeToArray15(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck11(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties9(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass9(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties9(Constructor.prototype, protoProps), staticProps && _defineProperties9(Constructor, staticProps), Constructor;
}
var FORCE_REFRESH_REQUIREMENT = new Requirement([], {
  forceUpdate: !0
}), outfitSlots = ["hat", "back", "weapon", "offhand", "shirt", "pants", "acc1", "acc2", "acc3", "famequip"];
var weaponHands = function(i) {
  return i ? (0, import_kolmafia24.weaponHands)(i) : 0;
}, modeableCommands2 = ["backupcamera", "umbrella", "snowsuit", "edpiece", "retrocape", "parka"], Outfit = /* @__PURE__ */ function() {
  function Outfit2() {
    _classCallCheck11(this, Outfit2), this.equips = /* @__PURE__ */ new Map(), this.riders = /* @__PURE__ */ new Map(), this.modes = {}, this.skipDefaults = !1, this.modifier = [], this.avoid = [], this.bonuses = /* @__PURE__ */ new Map(), this.postActions = [], this.preActions = [];
  }
  return _createClass9(Outfit2, [{
    key: "equippedAmount",
    value: (
      /**
       * Check how many of an item is equipped on the outfit.
       */
      function(item6) {
        return _toConsumableArray10(this.equips.values()).filter(function(i) {
          return i === item6;
        }).length;
      }
    )
  }, {
    key: "isAvailable",
    value: function(item6) {
      var _a;
      return !(!((_a = this.avoid) === null || _a === void 0) && _a.includes(item6) || !have(item6, this.equippedAmount(item6) + 1) || (0, import_kolmafia24.booleanModifier)(item6, "Single Equip") && this.equippedAmount(item6) > 0);
    }
    /**
     * Check whether an item is equipped on the outfit, optionally in a specific slot.
     */
  }, {
    key: "haveEquipped",
    value: function(item6, slot) {
      return slot === void 0 ? this.equippedAmount(item6) > 0 : this.equips.get(slot) === item6;
    }
  }, {
    key: "equipItemNone",
    value: function(item6, slot) {
      return item6 !== $item.none ? !1 : slot === void 0 ? !0 : this.equips.has(slot) ? !1 : (this.equips.set(slot, item6), !0);
    }
  }, {
    key: "equipNonAccessory",
    value: function(item6, slot) {
      if ($slots(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral14(["acc1, acc2, acc3"]))).includes((0, import_kolmafia24.toSlot)(item6)) || slot !== void 0 && slot !== (0, import_kolmafia24.toSlot)(item6) || this.equips.has((0, import_kolmafia24.toSlot)(item6)))
        return !1;
      switch ((0, import_kolmafia24.toSlot)(item6)) {
        case $slot(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral14(["off-hand"]))):
          if (this.equips.has($slot(_templateObject321 || (_templateObject321 = _taggedTemplateLiteral14(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject419 || (_templateObject419 = _taggedTemplateLiteral14(["weapon"]))))) !== 1)
            return !1;
          break;
        case $slot(_templateObject517 || (_templateObject517 = _taggedTemplateLiteral14(["familiar"]))):
          if (this.familiar !== void 0 && !(0, import_kolmafia24.canEquip)(this.familiar, item6))
            return !1;
      }
      return (0, import_kolmafia24.toSlot)(item6) !== $slot(_templateObject615 || (_templateObject615 = _taggedTemplateLiteral14(["familiar"]))) && !(0, import_kolmafia24.canEquip)(item6) ? !1 : (this.equips.set((0, import_kolmafia24.toSlot)(item6), item6), !0);
    }
  }, {
    key: "equipAccessory",
    value: function(item6, slot) {
      var _this = this;
      if (![void 0].concat(_toConsumableArray10($slots(_templateObject714 || (_templateObject714 = _taggedTemplateLiteral14(["acc1, acc2, acc3"]))))).includes(slot) || (0, import_kolmafia24.toSlot)(item6) !== $slot(_templateObject814 || (_templateObject814 = _taggedTemplateLiteral14(["acc1"]))) || !(0, import_kolmafia24.canEquip)(item6))
        return !1;
      if (slot === void 0) {
        var empty = $slots(_templateObject914 || (_templateObject914 = _taggedTemplateLiteral14(["acc1, acc2, acc3"]))).find(function(s) {
          return !_this.equips.has(s);
        });
        if (empty === void 0)
          return !1;
        this.equips.set(empty, item6);
      } else {
        if (this.equips.has(slot))
          return !1;
        this.equips.set(slot, item6);
      }
      return !0;
    }
  }, {
    key: "equipUsingDualWield",
    value: function(item6, slot) {
      return ![void 0, $slot(_templateObject1011 || (_templateObject1011 = _taggedTemplateLiteral14(["off-hand"])))].includes(slot) || (0, import_kolmafia24.toSlot)(item6) !== $slot(_templateObject1110 || (_templateObject1110 = _taggedTemplateLiteral14(["weapon"]))) || this.equips.has($slot(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral14(["weapon"])))) && weaponHands(this.equips.get($slot(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral14(["weapon"]))))) !== 1 || this.equips.has($slot(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral14(["off-hand"])))) || !have($skill(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral14(["Double-Fisted Skull Smashing"])))) || weaponHands(item6) !== 1 || !(0, import_kolmafia24.canEquip)(item6) ? !1 : (this.equips.set($slot(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral14(["off-hand"]))), item6), !0);
    }
  }, {
    key: "getHoldingFamiliar",
    value: function(item6) {
      switch ((0, import_kolmafia24.toSlot)(item6)) {
        case $slot(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral14(["weapon"]))):
          return $familiar(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral14(["Disembodied Hand"])));
        case $slot(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral14(["off-hand"]))):
          return $familiar(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral14(["Left-Hand Man"])));
        default:
          return;
      }
    }
    /**
     * Returns the bonus value associated with a given item.
     *
     * @param item The item to check the bonus of.
     * @returns The bonus assigned to that item.
     */
  }, {
    key: "getBonus",
    value: function(item6) {
      var _a;
      return (_a = this.bonuses.get(item6)) !== null && _a !== void 0 ? _a : 0;
    }
    /**
     * Applies a value to any existing bonus this item has, using a rule assigned by the `reducer` parameter
     *
     * @param item The item to try to apply a bonus to.
     * @param value The value to try to apply.
     * @param reducer Function that combines new and current bonus
     * @returns The total assigned bonus to that item.
     */
  }, {
    key: "applyBonus",
    value: function(item6, value, reducer) {
      var previous = this.getBonus(item6);
      return this.setBonus(item6, reducer(value, previous));
    }
    /**
     * Sets the bonus value of an item equal to a given value, overriding any current bonus assigned.
     *
     * @param item The item to try to apply a bonus to.
     * @param value The value to try to apply.
     * @returns The total assigned bonus to that item.
     */
  }, {
    key: "setBonus",
    value: function(item6, value) {
      return this.bonuses.set(item6, value), value;
    }
    /**
     * Adds a value to any existing bonus this item has
     *
     * @param item The item to try to add a bonus to.
     * @param value The value to try to add.
     * @returns The total assigned bonus to that item.
     */
  }, {
    key: "addBonus",
    value: function(item6, value) {
      return this.applyBonus(item6, value, function(a, b) {
        return a + b;
      });
    }
    /**
     * Apply the given items' bonuses to the outfit, using a rule given by the reducer
     *
     * @param items A map containing items and their bonuses
     * @param reducer A way of combining new bonuses with existing bonuses
     */
  }, {
    key: "applyBonuses",
    value: function(items, reducer) {
      var _iterator = _createForOfIteratorHelper9(items), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray9(_step.value, 2), item6 = _step$value[0], value = _step$value[1];
          this.applyBonus(item6, value, reducer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Sets the bonuses of the given items, overriding existing bonuses
     *
     * @param items Map containing items and bonuses
     */
  }, {
    key: "setBonuses",
    value: function(items) {
      this.applyBonuses(items, function(a) {
        return a;
      });
    }
    /**
     * Adds the bonuses of the given items to any existing bonuses they ahave
     *
     * @param items Map containing items and bonuses
     */
  }, {
    key: "addBonuses",
    value: function(items) {
      this.applyBonuses(items, function(a, b) {
        return a + b;
      });
    }
  }, {
    key: "equipUsingFamiliar",
    value: function(item6, slot) {
      if (![void 0, $slot(_templateObject2111 || (_templateObject2111 = _taggedTemplateLiteral14(["familiar"])))].includes(slot) || this.equips.has($slot(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral14(["familiar"])))) || (0, import_kolmafia24.booleanModifier)(item6, "Single Equip"))
        return !1;
      var familiar4 = this.getHoldingFamiliar(item6);
      return familiar4 === void 0 || !this.equip(familiar4) ? !1 : (this.equips.set($slot(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral14(["familiar"]))), item6), !0);
    }
  }, {
    key: "equipItem",
    value: function(item6, slot) {
      return this.haveEquipped(item6, slot) || this.equipItemNone(item6, slot) || this.isAvailable(item6) && (this.equipNonAccessory(item6, slot) || this.equipAccessory(item6, slot) || this.equipUsingDualWield(item6, slot) || this.equipUsingFamiliar(item6, slot));
    }
  }, {
    key: "equipFamiliar",
    value: function(familiar4) {
      if (familiar4 === this.familiar)
        return !0;
      if (this.familiar !== void 0 || familiar4 !== $familiar.none && (!have(familiar4) || Array.from(this.riders.values()).includes(familiar4)))
        return !1;
      var item6 = this.equips.get($slot(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral14(["familiar"]))));
      return item6 !== void 0 && item6 !== $item.none && !(0, import_kolmafia24.canEquip)(familiar4, item6) ? !1 : (this.familiar = familiar4, !0);
    }
  }, {
    key: "equipSpec",
    value: function(spec) {
      var _this$avoid, _a, _b, _c, _d, _e, _f, succeeded = !0, _iterator2 = _createForOfIteratorHelper9(outfitSlots), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var slotName = _step2.value, slot = (_a = (/* @__PURE__ */ new Map([["famequip", $slot(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral14(["familiar"])))], ["offhand", $slot(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral14(["off-hand"])))]])).get(slotName)) !== null && _a !== void 0 ? _a : (0, import_kolmafia24.toSlot)(slotName), itemOrItems = spec[slotName];
          itemOrItems !== void 0 && !this.equip(itemOrItems, slot) && (succeeded = !1);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var _iterator3 = _createForOfIteratorHelper9((_b = spec == null ? void 0 : spec.equip) !== null && _b !== void 0 ? _b : []), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var item6 = _step3.value;
          this.equip(item6) || (succeeded = !1);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if ((spec == null ? void 0 : spec.familiar) !== void 0 && (this.equip(spec.familiar) || (succeeded = !1)), (_this$avoid = this.avoid).push.apply(_this$avoid, _toConsumableArray10((_c = spec == null ? void 0 : spec.avoid) !== null && _c !== void 0 ? _c : [])), this.skipDefaults = this.skipDefaults || ((_d = spec.skipDefaults) !== null && _d !== void 0 ? _d : !1), spec.modifier) {
        var _this$modifier;
        Array.isArray(spec.modifier) ? (_this$modifier = this.modifier).push.apply(_this$modifier, _toConsumableArray10(spec.modifier)) : this.modifier.push(spec.modifier);
      }
      return spec.modes && (this.setModes(spec.modes) || (succeeded = !1)), spec.riders && (spec.riders["buddy-bjorn"] && !this.bjornify(spec.riders["buddy-bjorn"]) && (succeeded = !1), spec.riders["crown-of-thrones"] && !this.enthrone(spec.riders["crown-of-thrones"]) && (succeeded = !1)), spec.bonuses && this.addBonuses(spec.bonuses), this.beforeDress.apply(this, _toConsumableArray10((_e = spec.beforeDress) !== null && _e !== void 0 ? _e : [])), this.afterDress.apply(this, _toConsumableArray10((_f = spec.afterDress) !== null && _f !== void 0 ? _f : [])), succeeded;
    }
    /**
     * Equip the first thing that can be equipped to the outfit.
     *
     * @param things The things to equip.
     * @param slot The slot to equip them.
     * @returns True if one of the things is equipped, and false otherwise.
     */
  }, {
    key: "equipFirst",
    value: function(things, slot) {
      var _this = this;
      return things.length === 0 ? !0 : things.some(function(val) {
        return _this.equip(val, slot);
      });
    }
    /**
     * Equip a thing to the outfit.
     *
     * If no slot is given, then the thing will be equipped wherever possible
     * (possibly using dual-wielding, any of the accessory slots, or as
     * familiar equipment). If it is impossible to add this thing anywhere to
     * the outfit, this function will return false.
     *
     * If a slot is given, the item will be equipped only in that slot. If the
     * slot is filled with a different item, this function will return false.
     *
     * If the thing is already equipped in the provided slot, or if no slot is
     * given and the thing is already equipped in any slot, this function will
     * return true and not change the outfit.
     *
     * @param thing The thing or things to equip.
     * @param slot The slot to equip them.
     * @returns True if the thing was sucessfully equipped, and false otherwise.
     */
  }, {
    key: "equip",
    value: function(thing, slot) {
      var _this = this;
      return Array.isArray(thing) ? slot !== void 0 ? this.equipFirst(thing, slot) : thing.every(function(val) {
        return _this.equip(val);
      }) : thing instanceof import_kolmafia24.Item ? this.equipItem(thing, slot) : thing instanceof import_kolmafia24.Familiar ? this.equipFamiliar(thing) : thing instanceof Outfit2 ? this.equipSpec(thing.spec()) : this.equipSpec(thing);
    }
  }, {
    key: "bjornify",
    value: (
      /**
       * Add a bjornified familiar to the outfit.
       *
       * This function does *not* equip the buddy bjorn itself; it must be equipped separately.
       *
       * If a familiar is already specified for the buddy bjorn that is different from the provided target, this function will return false and not change the buddy bjorn.
       * @param target The familiar to bjornify, or a ranked list of familiars to try to bjornify.
       * @returns True if we successfully set the bjorn to a valid target.
       */
      function(target) {
        var _this = this;
        var current = this.riders.get($slot(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral14(["buddy-bjorn"]))));
        if (current)
          return !!(Array.isArray(target) ? target.includes(current) : current === target);
        if (Array.isArray(target)) {
          var fam = target.find(function(f) {
            return have(f) && _this.familiar !== f && _this.riders.get($slot(_templateObject286 || (_templateObject286 = _taggedTemplateLiteral14(["crown-of-thrones"])))) !== f;
          });
          return fam ? (this.riders.set($slot(_templateObject296 || (_templateObject296 = _taggedTemplateLiteral14(["buddy-bjorn"]))), fam), !0) : !1;
        } else
          return have(target) && this.familiar !== target && !Array.from(this.riders.values()).includes(target) ? (this.riders.set($slot(_templateObject306 || (_templateObject306 = _taggedTemplateLiteral14(["buddy-bjorn"]))), target), !0) : !1;
      }
    )
    /**
     * Add anenthroned familiar to the outfit.
     *
     * This function does *not* equip the crown of thrones itself; it must be equipped separately.
     *
     * If a familiar is already specified for the crown of thrones that is different from the provided target, this function will return false and not change the crown of thrones.
     * @param target The familiar to enthrone, or a ranked list of familiars to try to enthrone.
     * @returns True if we successfully set the enthrone to a valid target.
     */
  }, {
    key: "enthrone",
    value: function(target) {
      var _this = this;
      var current = this.riders.get($slot(_templateObject3111 || (_templateObject3111 = _taggedTemplateLiteral14(["crown-of-thrones"]))));
      if (current)
        return !!(Array.isArray(target) ? target.includes(current) : current === target);
      if (Array.isArray(target)) {
        var fam = target.find(function(f) {
          return have(f) && _this.familiar !== f && _this.riders.get($slot(_templateObject326 || (_templateObject326 = _taggedTemplateLiteral14(["buddy-bjorn"])))) !== f;
        });
        return fam ? (this.riders.set($slot(_templateObject336 || (_templateObject336 = _taggedTemplateLiteral14(["crown-of-thrones"]))), fam), !0) : !1;
      } else
        return have(target) && this.familiar !== target && !Array.from(this.riders.values()).includes(target) ? (this.riders.set($slot(_templateObject345 || (_templateObject345 = _taggedTemplateLiteral14(["crown-of-thrones"]))), target), !0) : !1;
    }
    /**
     * Set the provided modes for items that may be equipped in the outfit.
     *
     * This function does *not* equip items for the set modes; they must be
     * equipped separately.
     *
     * If a mode is already set for an item that is different from the provided
     * mode, this function will return false and not change the mode for that
     * item. (But other modes might still be changed if they are compatible.)
     *
     * Note that the superhero and instuctions of a retrocape can be set
     * independently (`undefined` is treated as "don't care").
     *
     * @param modes Modes to set in this outfit.
     * @returns True if all modes were sucessfully set, and false otherwise.
     */
  }, {
    key: "setModes",
    value: function(modes) {
      var _a, _b, compatible = !0, _iterator4 = _createForOfIteratorHelper9(modeableCommands2), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var mode = _step4.value;
          mode !== "retrocape" && this.modes[mode] && modes[mode] && this.modes[mode] !== modes[mode] && (compatible = !1);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return this.modes.retrocape && modes.retrocape && (this.modes.retrocape[0] && modes.retrocape[0] && this.modes.retrocape[0] !== modes.retrocape[0] && (compatible = !1), this.modes.retrocape[1] && modes.retrocape[1] && this.modes.retrocape[1] !== modes.retrocape[1] && (compatible = !1), this.modes.retrocape[0] = (_a = this.modes.retrocape[0]) !== null && _a !== void 0 ? _a : modes.retrocape[0], this.modes.retrocape[1] = (_b = this.modes.retrocape[1]) !== null && _b !== void 0 ? _b : modes.retrocape[1]), this.modes = _objectSpread5(_objectSpread5({}, modes), this.modes), compatible;
    }
    /**
     * Check if it is possible to equip a thing to this outfit using .equip().
     *
     * This does not change the current outfit.
     *
     * @param thing The thing to equip.
     * @param slot The slot to equip them.
     * @returns True if this thing can be equipped.
     */
  }, {
    key: "canEquip",
    value: function(thing, slot) {
      var outfit2 = this.clone();
      return outfit2.equip(thing, slot);
    }
    /**
     * Check if it is possible to equip a thing to this outfit using .equip(); if it is, do so.
     *
     * This does change the current outfit.
     * @param thing The thing to equip.
     * @param slot The slot to equip them.
     * @returns True if this thing was successfully equipped.
     */
  }, {
    key: "tryEquip",
    value: function(thing, slot) {
      return this.canEquip(thing, slot) && this.equip(thing, slot);
    }
  }, {
    key: "afterDress",
    value: function() {
      var _this$postActions;
      (_this$postActions = this.postActions).push.apply(_this$postActions, arguments);
    }
  }, {
    key: "beforeDress",
    value: function() {
      var _this$preActions;
      (_this$preActions = this.preActions).push.apply(_this$preActions, arguments);
    }
    /**
     * Equip this outfit.
     */
  }, {
    key: "_dress",
    value: function(refreshed) {
      var _this = this;
      this.familiar && (0, import_kolmafia24.useFamiliar)(this.familiar);
      var targetEquipment = Array.from(this.equips.values()), usedSlots = /* @__PURE__ */ new Set(), nonaccessorySlots = $slots(_templateObject354 || (_templateObject354 = _taggedTemplateLiteral14(["weapon, off-hand, hat, back, shirt, pants, familiar"]))), bjorn = this.riders.get($slot(_templateObject364 || (_templateObject364 = _taggedTemplateLiteral14(["buddy-bjorn"]))));
      bjorn && (this.equips.get($slot(_templateObject374 || (_templateObject374 = _taggedTemplateLiteral14(["back"])))) === $item(_templateObject384 || (_templateObject384 = _taggedTemplateLiteral14(["Buddy Bjorn"]))) || this.getBonus($item(_templateObject394 || (_templateObject394 = _taggedTemplateLiteral14(["Buddy Bjorn"]))))) && (usedSlots.add($slot(_templateObject404 || (_templateObject404 = _taggedTemplateLiteral14(["buddy-bjorn"])))), usedSlots.add($slot(_templateObject4110 || (_templateObject4110 = _taggedTemplateLiteral14(["crown-of-thrones"])))));
      var crown = this.riders.get($slot(_templateObject424 || (_templateObject424 = _taggedTemplateLiteral14(["crown-of-thrones"]))));
      crown && (this.equips.get($slot(_templateObject434 || (_templateObject434 = _taggedTemplateLiteral14(["hat"])))) === $item(_templateObject444 || (_templateObject444 = _taggedTemplateLiteral14(["Crown of Thrones"]))) || this.getBonus($item(_templateObject454 || (_templateObject454 = _taggedTemplateLiteral14(["Crown of Thrones"]))))) && (usedSlots.add($slot(_templateObject464 || (_templateObject464 = _taggedTemplateLiteral14(["buddy-bjorn"])))), usedSlots.add($slot(_templateObject474 || (_templateObject474 = _taggedTemplateLiteral14(["crown-of-thrones"])))));
      var _iterator5 = _createForOfIteratorHelper9(nonaccessorySlots), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var slot = _step5.value;
          (targetEquipment.includes((0, import_kolmafia24.equippedItem)(slot)) && this.equips.get(slot) !== (0, import_kolmafia24.equippedItem)(slot) || this.avoid.includes((0, import_kolmafia24.equippedItem)(slot)) || slot === $slot(_templateObject554 || (_templateObject554 = _taggedTemplateLiteral14(["weapon"]))) && weaponHands((0, import_kolmafia24.equippedItem)(slot)) !== 1 && this.equips.has($slot(_templateObject563 || (_templateObject563 = _taggedTemplateLiteral14(["offhand"])))) && !this.equips.has($slot(_templateObject573 || (_templateObject573 = _taggedTemplateLiteral14(["weapon"]))))) && (0, import_kolmafia24.equip)(slot, $item.none);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      var _iterator6 = _createForOfIteratorHelper9(nonaccessorySlots), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var _slot = _step6.value, equipment = this.equips.get(_slot);
          equipment && ((0, import_kolmafia24.equip)(_slot, equipment), usedSlots.add(_slot));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      var accessorySlots = $slots(_templateObject484 || (_templateObject484 = _taggedTemplateLiteral14(["acc1, acc2, acc3"]))), accessoryEquips = accessorySlots.map(function(slot2) {
        return _this.equips.get(slot2);
      }).filter(function(item6) {
        return item6 !== void 0;
      }), missingAccessories = [], _iterator7 = _createForOfIteratorHelper9(accessoryEquips), _step7;
      try {
        var _loop = function() {
          var accessory2 = _step7.value, alreadyEquipped = accessorySlots.find(function(slot2) {
            return !usedSlots.has(slot2) && (0, import_kolmafia24.equippedItem)(slot2) === accessory2;
          });
          alreadyEquipped ? usedSlots.add(alreadyEquipped) : missingAccessories.push(accessory2);
        };
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; )
          _loop();
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      for (var _i2 = 0, _missingAccessories = missingAccessories; _i2 < _missingAccessories.length; _i2++) {
        var accessory = _missingAccessories[_i2], unusedSlot = accessorySlots.find(function(slot2) {
          return !usedSlots.has(slot2);
        });
        if (unusedSlot === void 0)
          throw "No accessory slots remaining";
        (0, import_kolmafia24.equip)(unusedSlot, accessory), usedSlots.add(unusedSlot);
      }
      var modes = convertToLibramModes(this.modes);
      if (this.modifier.length > 0) {
        var allRequirements = [new Requirement(this.modifier, {
          preventSlot: _toConsumableArray10(usedSlots),
          preventEquip: this.avoid,
          modes: modes,
          bonusEquip: this.bonuses
        })];
        if (refreshed && allRequirements.push(FORCE_REFRESH_REQUIREMENT), !Requirement.merge(allRequirements).maximize()) {
          if (refreshed)
            throw new Error("Failed to maximize properly!");
          (0, import_kolmafia24.cliExecute)("refresh inventory"), this._dress(!0);
          return;
        }
        (0, import_kolmafia24.logprint)("Maximize: ".concat(this.modifier));
      }
      if (applyModes(modes), bjorn && (0, import_kolmafia24.haveEquipped)($item(_templateObject494 || (_templateObject494 = _taggedTemplateLiteral14(["Buddy Bjorn"])))) && ((0, import_kolmafia24.myEnthronedFamiliar)() === bjorn && (0, import_kolmafia24.enthroneFamiliar)($familiar.none), (0, import_kolmafia24.myBjornedFamiliar)() !== bjorn && (0, import_kolmafia24.bjornifyFamiliar)(bjorn)), crown && (0, import_kolmafia24.haveEquipped)($item(_templateObject504 || (_templateObject504 = _taggedTemplateLiteral14(["Crown of Thrones"])))) && ((0, import_kolmafia24.myBjornedFamiliar)() === crown && (0, import_kolmafia24.bjornifyFamiliar)($familiar.none), (0, import_kolmafia24.myEnthronedFamiliar)() !== crown && (0, import_kolmafia24.enthroneFamiliar)(crown)), this.familiar !== void 0 && (0, import_kolmafia24.myFamiliar)() !== this.familiar)
        throw "Failed to fully dress (expected: familiar ".concat(this.familiar, ")");
      var _iterator8 = _createForOfIteratorHelper9(nonaccessorySlots), _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
          var _slot2 = _step8.value;
          if (this.equips.has(_slot2) && (0, import_kolmafia24.equippedItem)(_slot2) !== this.equips.get(_slot2))
            throw "Failed to fully dress (expected: ".concat(_slot2, " ").concat(this.equips.get(_slot2), ")");
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      var _iterator9 = _createForOfIteratorHelper9(accessoryEquips), _step9;
      try {
        var _loop2 = function() {
          var accessory2 = _step9.value;
          if ((0, import_kolmafia24.equippedAmount)(accessory2) < accessoryEquips.filter(function(acc) {
            return acc === accessory2;
          }).length)
            throw "Failed to fully dress (expected: acc ".concat(accessory2, ")");
        };
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done; )
          _loop2();
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
      for (var _i3 = 0, _arr2 = [[$slot(_templateObject518 || (_templateObject518 = _taggedTemplateLiteral14(["buddy-bjorn"]))), $item(_templateObject524 || (_templateObject524 = _taggedTemplateLiteral14(["Buddy Bjorn"]))), import_kolmafia24.myBjornedFamiliar], [$slot(_templateObject534 || (_templateObject534 = _taggedTemplateLiteral14(["crown-of-thrones"]))), $item(_templateObject544 || (_templateObject544 = _taggedTemplateLiteral14(["Crown of Thrones"]))), import_kolmafia24.myEnthronedFamiliar]]; _i3 < _arr2.length; _i3++) {
        var _arr2$_i = _slicedToArray9(_arr2[_i3], 3), rider = _arr2$_i[0], throne = _arr2$_i[1], checkingFunction = _arr2$_i[2], wanted = this.riders.get(rider);
        if (_toConsumableArray10(this.equips.values()).includes(throne) && wanted && checkingFunction() !== wanted)
          throw "Failed to fully dress: (expected ".concat(rider, " ").concat(wanted, ")");
      }
    }
  }, {
    key: "dress",
    value: function() {
      var _iterator10 = _createForOfIteratorHelper9(this.preActions), _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
          var action = _step10.value;
          action();
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      this._dress(!1);
      var _iterator11 = _createForOfIteratorHelper9(this.postActions), _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
          var _action = _step11.value;
          _action();
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
    /**
     * Build an Outfit identical to this outfit.
     */
  }, {
    key: "clone",
    value: function() {
      var result = new Outfit2();
      return result.equips = new Map(this.equips), result.skipDefaults = this.skipDefaults, result.familiar = this.familiar, result.modifier = _toConsumableArray10(this.modifier), result.avoid = _toConsumableArray10(this.avoid), result.modes = _objectSpread5({}, this.modes), result.riders = new Map(this.riders), result.bonuses = new Map(this.bonuses), result.beforeDress.apply(result, _toConsumableArray10(this.preActions)), result.afterDress.apply(result, _toConsumableArray10(this.postActions)), result;
    }
    /**
     * Build an OutfitSpec identical to this outfit.
     */
  }, {
    key: "spec",
    value: function() {
      var _a, result = {
        modifier: _toConsumableArray10(this.modifier),
        avoid: _toConsumableArray10(this.avoid),
        skipDefaults: this.skipDefaults,
        modes: _objectSpread5({}, this.modes),
        bonuses: new Map(this.bonuses)
      };
      this.familiar && (result.familiar = this.familiar);
      var _iterator12 = _createForOfIteratorHelper9(outfitSlots), _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done; ) {
          var slotName = _step12.value, entry = this.equips.get((_a = (/* @__PURE__ */ new Map([["famequip", $slot(_templateObject603 || (_templateObject603 = _taggedTemplateLiteral14(["familiar"])))], ["offhand", $slot(_templateObject616 || (_templateObject616 = _taggedTemplateLiteral14(["off-hand"])))]])).get(slotName)) !== null && _a !== void 0 ? _a : (0, import_kolmafia24.toSlot)(slotName));
          entry && (result[slotName] = entry);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
      var riders = {}, buddyRider = this.riders.get($slot(_templateObject583 || (_templateObject583 = _taggedTemplateLiteral14(["buddy-bjorn"]))));
      buddyRider !== void 0 && (riders["buddy-bjorn"] = buddyRider);
      var throneRider = this.riders.get($slot(_templateObject593 || (_templateObject593 = _taggedTemplateLiteral14(["crown-of-thrones"]))));
      return throneRider !== void 0 && (riders["crown-of-thrones"] = throneRider), (buddyRider !== void 0 || throneRider !== void 0) && (result.riders = riders), this.preActions.length && (result.beforeDress = this.preActions), this.postActions.length && (result.afterDress = this.postActions), result;
    }
  }], [{
    key: "current",
    value: function() {
      var _a, outfit2 = new Outfit2(), familiar4 = (0, import_kolmafia24.myFamiliar)();
      if (outfit2.equip(familiar4))
        throw "Failed to create outfit from current state (expected: familiar ".concat(familiar4, ")");
      var _iterator13 = _createForOfIteratorHelper9(outfitSlots), _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done; ) {
          var slotName = _step13.value, slot = (_a = (/* @__PURE__ */ new Map([["famequip", $slot(_templateObject663 || (_templateObject663 = _taggedTemplateLiteral14(["familiar"])))], ["offhand", $slot(_templateObject672 || (_templateObject672 = _taggedTemplateLiteral14(["off-hand"])))]])).get(slotName)) !== null && _a !== void 0 ? _a : (0, import_kolmafia24.toSlot)(slotName), item6 = (0, import_kolmafia24.equippedItem)(slot);
          if (!outfit2.equip(item6, slot))
            throw "Failed to create outfit from current state (expected: ".concat(slot, " ").concat(item6, ")");
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      return (0, import_kolmafia24.haveEquipped)($item(_templateObject624 || (_templateObject624 = _taggedTemplateLiteral14(["Crown of Thrones"])))) && outfit2.riders.set($slot(_templateObject633 || (_templateObject633 = _taggedTemplateLiteral14(["crown-of-thrones"]))), (0, import_kolmafia24.myEnthronedFamiliar)()), (0, import_kolmafia24.haveEquipped)($item(_templateObject643 || (_templateObject643 = _taggedTemplateLiteral14(["Buddy Bjorn"])))) && outfit2.riders.set($slot(_templateObject653 || (_templateObject653 = _taggedTemplateLiteral14(["buddy-bjorn"]))), (0, import_kolmafia24.myBjornedFamiliar)()), outfit2.setModes(getCurrentModes2()), outfit2;
    }
  }, {
    key: "from",
    value: function(spec) {
      var error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _a, outfit2 = new Outfit2();
      if (spec instanceof Requirement) {
        var result = {};
        result.modifier = spec.maximizeParameters, !((_a = spec.maximizeOptions.forceEquip) === null || _a === void 0) && _a.length && (result.equip = spec.maximizeOptions.forceEquip), result.avoid = spec.maximizeOptions.preventEquip, result.bonuses = spec.maximizeOptions.bonusEquip, spec.maximizeOptions.modes && (result.modes = convertFromLibramModes(spec.maximizeOptions.modes));
        var cleanedResult = Object.fromEntries(_toConsumableArray10(Object.entries(result)).filter(function(_ref) {
          var _ref2 = _slicedToArray9(_ref, 2), v = _ref2[1];
          return v !== void 0;
        }));
        return Outfit2.from(cleanedResult);
      }
      var success = outfit2.equip(spec);
      if (!success && error)
        throw error;
      return success ? outfit2 : null;
    }
  }]), Outfit2;
}();
function convertToLibramModes(modes) {
  var _a;
  return {
    backupcamera: modes.backupcamera,
    umbrella: modes.umbrella,
    snowsuit: modes.snowsuit,
    edpiece: modes.edpiece,
    retrocape: (_a = modes.retrocape) === null || _a === void 0 ? void 0 : _a.filter(function(s) {
      return s !== void 0;
    }).join(" "),
    parka: modes.parka
  };
}
function convertFromLibramModes(modes) {
  return modes.retrocape ? _objectSpread5(_objectSpread5({}, modes), {}, {
    retrocape: modes.retrocape.split(" ")
  }) : modes;
}
function getCurrentModes2() {
  return {
    backupcamera: getMode("backupCameraMode", ["ml", "meat", "init"]),
    umbrella: getMode("umbrellaState", ["broken", "forward-facing", "bucket style", "pitchfork style", "constantly twirling", "cocoon"]),
    snowsuit: getMode("snowsuit", ["eyebrows", "smirk", "nose", "goatee", "hat"]),
    edpiece: getMode("edPiece", ["bear", "owl", "puma", "hyena", "mouse", "weasel", "fish"]),
    retrocape: [getMode("retroCapeSuperhero", ["vampire", "heck", "robot"]), getMode("retroCapeWashingInstructions", ["hold", "thrill", "kiss", "kill"])],
    parka: getMode("parkaMode", ["kachungasaur", "dilophosaur", "ghostasaurus", "spikolodon", "pterodactyl"])
  };
}
function getMode(property, options) {
  var val = get(property, "");
  return options.find(function(s) {
    return s === val;
  });
}

// node_modules/grimoire-kolmafia/dist/engine.js
var _templateObject120;
function _taggedTemplateLiteral15(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray11(arr) {
  return _arrayWithoutHoles11(arr) || _iterableToArray11(arr) || _unsupportedIterableToArray16(arr) || _nonIterableSpread11();
}
function _nonIterableSpread11() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray11(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles11(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray16(arr);
}
function _slicedToArray10(arr, i) {
  return _arrayWithHoles10(arr) || _iterableToArrayLimit10(arr, i) || _unsupportedIterableToArray16(arr, i) || _nonIterableRest10();
}
function _nonIterableRest10() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit10(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles10(arr) {
  if (Array.isArray(arr))
    return arr;
}
function ownKeys6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys6(Object(source), !0).forEach(function(key) {
      _defineProperty11(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty11(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper10(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray16(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray16(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray16(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray16(o, minLen);
  }
}
function _arrayLikeToArray16(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _defineProperties10(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass10(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties10(Constructor.prototype, protoProps), staticProps && _defineProperties10(Constructor, staticProps), Constructor;
}
function _classCallCheck12(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
var grimoireCCS = "grimoire_macro", Engine = /* @__PURE__ */ function() {
  function Engine2(tasks, options) {
    _classCallCheck12(this, Engine2), this.attempts = {}, this.propertyManager = new PropertiesManager(), this.tasks_by_name = /* @__PURE__ */ new Map(), this.cachedCcsContents = "", this.tasks = tasks, this.options = options != null ? options : {};
    var _iterator = _createForOfIteratorHelper10(tasks), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var task = _step.value;
        this.tasks_by_name.set(task.name, task);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.initPropertiesManager(this.propertyManager);
  }
  return _createClass10(Engine2, [{
    key: "getNextTask",
    value: function() {
      var _this = this;
      return this.tasks.find(function(task) {
        return _this.available(task);
      });
    }
    /**
     * Continually get the next task and execute it.
     * @param actions If given, only perform up to this many tasks.
     */
  }, {
    key: "run",
    value: function(actions) {
      for (var i = 0; i < (actions != null ? actions : 1 / 0); i++) {
        var task = this.getNextTask();
        if (!task)
          return;
        this.execute(task);
      }
    }
    /**
     * Close the engine and reset all properties.
     * After this has been called, this object should not be used.
     */
  }, {
    key: "destruct",
    value: function() {
      this.propertyManager.resetAll(), (0, import_kolmafia25.setAutoAttack)(0);
    }
    /**
     * Check if the given task is available at this moment.
     * @returns true if all dependencies are complete and the task is ready.
     *  Note that dependencies are not checked transitively. That is, if
     *  A depends on B which depends on C, then A is ready if B is complete
     *  (regardless of if C is complete or not).
     */
  }, {
    key: "available",
    value: function(task) {
      var _a, _b;
      if (((_a = task.limit) === null || _a === void 0 ? void 0 : _a.skip) !== void 0 && this.attempts[task.name] >= task.limit.skip)
        return !1;
      var _iterator2 = _createForOfIteratorHelper10((_b = task.after) !== null && _b !== void 0 ? _b : []), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var after = _step2.value, after_task = this.tasks_by_name.get(after);
          if (after_task === void 0)
            throw "Unknown task dependency ".concat(after, " on ").concat(task.name);
          if (!after_task.completed())
            return !1;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return !(task.ready && !task.ready() || task.completed());
    }
    /**
     * Perform all steps to execute the provided task.
     * This is the main entry point for the Engine.
     * @param task The current executing task.
     */
  }, {
    key: "execute",
    value: function(rawTask) {
      var _a, _b, _c, _d, _e;
      (0, import_kolmafia25.print)(""), (0, import_kolmafia25.print)("Executing ".concat(rawTask.name), "blue");
      var task = _objectSpread6(_objectSpread6({}, this.options.default_task_options), rawTask), postcondition = (_b = (_a = task.limit) === null || _a === void 0 ? void 0 : _a.guard) === null || _b === void 0 ? void 0 : _b.call(_a);
      this.acquireItems(task), this.acquireEffects(task);
      var task_combat = (_d = (_c = task.combat) === null || _c === void 0 ? void 0 : _c.clone()) !== null && _d !== void 0 ? _d : new CombatStrategy(), outfit2 = this.createOutfit(task), task_resources = new CombatResources();
      this.customize(task, outfit2, task_combat, task_resources), this.dress(task, outfit2), this.setCombat(task, task_combat, task_resources), this.setChoices(task, this.propertyManager);
      var _iterator3 = _createForOfIteratorHelper10(task_resources.all()), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var resource = _step3.value;
          (_e = resource.prepare) === null || _e === void 0 || _e.call(resource);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      for (this.prepare(task), this.do(task); this.shouldRepeatAdv(task); )
        _set("lastEncounter", ""), this.do(task);
      this.post(task), this.markAttempt(task), this.checkLimits(task, postcondition);
    }
    /**
     * Acquire all items for the task.
     * @param task The current executing task.
     */
  }, {
    key: "acquireItems",
    value: function(task) {
      var _a, acquire = undelay(task.acquire), _iterator4 = _createForOfIteratorHelper10(acquire || []), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var to_get = _step4.value, num_needed = (_a = to_get.num) !== null && _a !== void 0 ? _a : 1, num_have = (0, import_kolmafia25.itemAmount)(to_get.item) + (0, import_kolmafia25.equippedAmount)(to_get.item);
          if (!(num_needed <= num_have) && !(to_get.useful !== void 0 && !to_get.useful()) && (to_get.get ? to_get.get() : to_get.price !== void 0 ? (0, import_kolmafia25.buy)(to_get.item, num_needed - num_have, to_get.price) : Object.keys((0, import_kolmafia25.getRelated)(to_get.item, "fold")).length > 0 ? (0, import_kolmafia25.cliExecute)("fold ".concat(to_get.item)) : (0, import_kolmafia25.retrieveItem)(to_get.item, num_needed), (0, import_kolmafia25.itemAmount)(to_get.item) + (0, import_kolmafia25.equippedAmount)(to_get.item) < num_needed && !to_get.optional))
            throw "Task ".concat(task.name, " was unable to acquire ").concat(num_needed, " ").concat(to_get.item);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * Acquire all effects for the task.
     * @param task The current executing task.
     */
  }, {
    key: "acquireEffects",
    value: function(task) {
      var _a, effects = (_a = undelay(task.effects)) !== null && _a !== void 0 ? _a : [], songs = effects.filter(function(effect3) {
        return isSong(effect3);
      });
      if (songs.length > maxSongs())
        throw "Too many AT songs";
      for (var extraSongs = Object.keys((0, import_kolmafia25.myEffects)()).map(function(effectName) {
        return (0, import_kolmafia25.toEffect)(effectName);
      }).filter(function(effect3) {
        return isSong(effect3) && !songs.includes(effect3);
      }); songs.length + extraSongs.length > maxSongs(); ) {
        var toRemove = extraSongs.pop();
        if (toRemove === void 0)
          break;
        uneffect(toRemove);
      }
      var _iterator5 = _createForOfIteratorHelper10(effects), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var effect2 = _step5.value;
          ensureEffect(effect2);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
    /**
     * Create an outfit for the task with all required equipment.
     * @param task The current executing task.
     */
  }, {
    key: "createOutfit",
    value: function(task) {
      var spec = undelay(task.outfit);
      if (spec instanceof Outfit)
        return spec.clone();
      var outfit2 = new Outfit();
      if (spec !== void 0 && !outfit2.equip(spec) && !this.options.allow_partial_outfits)
        throw "Unable to equip all items for ".concat(task.name);
      return outfit2;
    }
    /**
     * Equip the outfit for the task.
     * @param task The current executing task.
     * @param outfit The outfit for the task, possibly augmented by the engine.
     */
  }, {
    key: "dress",
    value: function(task, outfit2) {
      task.do instanceof import_kolmafia25.Location && (0, import_kolmafia25.setLocation)(task.do), outfit2.dress();
    }
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /**
     * Perform any engine-specific customization for the outfit and combat plan.
     *
     * This is a natural method to override in order to:
     *   * Enable the use of any resources in the outfit or combat (e.g., allocate banishers).
     *   * Equip a default outfit.
     *   * Determine additional monster macros at a global level (e.g., use flyers).
     * @param task The current executing task.
     * @param outfit The outfit for the task.
     * @param combat The combat strategy so far for the task.
     * @param resources The combat resources assigned so far for the task.
     */
  }, {
    key: "customize",
    value: function(task, outfit2, combat, resources) {
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
    /**
     * Set the choice settings for the task.
     * @param task The current executing task.
     * @param manager The property manager to use.
     */
  }, {
    key: "setChoices",
    value: function(task, manager) {
      for (var _a, _i = 0, _Object$entries = Object.entries((_a = task.choices) !== null && _a !== void 0 ? _a : {}); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray10(_Object$entries[_i], 2), key = _Object$entries$_i[0], func = _Object$entries$_i[1];
        func !== void 0 && manager.setChoice(parseInt(key), undelay(func));
      }
    }
    /**
     * Save the combat macro for this task.
     * @param task The current executing task.
     * @param task_combat The completed combat strategy far for the task.
     * @param task_resources The combat resources assigned for the task.
     */
  }, {
    key: "setCombat",
    value: function(task, task_combat, task_resources) {
      var _a, macro = task_combat.compile(task_resources, (_a = this.options) === null || _a === void 0 ? void 0 : _a.combat_defaults, task.do instanceof import_kolmafia25.Location ? task.do : void 0);
      if (macro.save(), !this.options.ccs) {
        var otherCCSEntries = task_combat.compileCcs(), ccsContents = ["[default]", '"'.concat(macro.toString(), '"')].concat(_toConsumableArray11(otherCCSEntries)).join("\n");
        (0, import_kolmafia25.logprint)("CCS: ".concat(ccsContents.replace("\n", "\\n "))), ccsContents !== this.cachedCcsContents && ((0, import_kolmafia25.writeCcs)(ccsContents, grimoireCCS), (0, import_kolmafia25.cliExecute)("ccs ".concat(grimoireCCS)), this.cachedCcsContents = ccsContents);
      }
      var autoattack = task_combat.compileAutoattack();
      autoattack.toString().length > 1 ? ((0, import_kolmafia25.logprint)("Autoattack macro: ".concat(autoattack.toString())), autoattack.setAutoAttack()) : (0, import_kolmafia25.setAutoAttack)(0);
    }
    /**
     * Do any task-specific preparation.
     * @param task The current executing task.
     */
  }, {
    key: "prepare",
    value: function(task) {
      var _a;
      (_a = task.prepare) === null || _a === void 0 || _a.call(task);
    }
    /**
     * Actually perform the task.
     * @param task The current executing task.
     */
  }, {
    key: "do",
    value: function(task) {
      var result = typeof task.do == "function" ? task.do() : task.do;
      for (result instanceof import_kolmafia25.Location && (0, import_kolmafia25.adv1)(result, -1, ""), (0, import_kolmafia25.runCombat)(); (0, import_kolmafia25.inMultiFight)(); )
        (0, import_kolmafia25.runCombat)();
      (0, import_kolmafia25.choiceFollowsFight)() && (0, import_kolmafia25.runChoice)(-1);
    }
    /**
     * Check if the task.do should be immediately repeated without any prep.
     *
     * By default, this is only used to repeat a task if we hit one of:
     *   1. Halloweener dog noncombats,
     *   2. June cleaver noncombats,
     *   3. Lil' Doctor™ bag noncombat, or
     *   4. Turtle taming noncombats.
     * @param task The current executing task.
     * @returns True if the task should be immediately repeated.
     */
  }, {
    key: "shouldRepeatAdv",
    value: function(task) {
      return task.do instanceof import_kolmafia25.Location && lastEncounterWasWanderingNC();
    }
    /**
     * Do any task-specific wrapup activities.
     * @param task The current executing task.
     */
  }, {
    key: "post",
    value: function(task) {
      var _a;
      (_a = task.post) === null || _a === void 0 || _a.call(task);
    }
    /**
     * Mark that an attempt was made on the current task.
     * @param task The current executing task.
     */
  }, {
    key: "markAttempt",
    value: function(task) {
      task.name in this.attempts || (this.attempts[task.name] = 0), this.attempts[task.name]++;
    }
    /**
     * Check if the task has passed any of its internal limits.
     * @param task The task to check.
     * @throws An error if any of the internal limits have been passed.
     */
  }, {
    key: "checkLimits",
    value: function(task, postcondition) {
      var _a;
      if (task.limit) {
        var failureMessage = task.limit.message ? " ".concat(task.limit.message) : "";
        if (!task.completed()) {
          if (task.limit.tries && this.attempts[task.name] >= task.limit.tries)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.tries, " attempts. Please check what went wrong.").concat(failureMessage);
          if (task.limit.soft && this.attempts[task.name] >= task.limit.soft)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.soft, " attempts. Please check what went wrong (you may just be unlucky).").concat(failureMessage);
          if (task.limit.turns && task.do instanceof import_kolmafia25.Location && task.do.turnsSpent >= task.limit.turns)
            throw "Task ".concat(task.name, " did not complete within ").concat(task.limit.turns, " turns. Please check what went wrong.").concat(failureMessage);
          if (task.limit.unready && (!((_a = task.ready) === null || _a === void 0) && _a.call(task)))
            throw "Task ".concat(task.name, " is still ready, but it should not be. Please check what went wrong.").concat(failureMessage);
          if (task.limit.completed)
            throw "Task ".concat(task.name, " is not completed, but it should be. Please check what went wrong.").concat(failureMessage);
        }
        if (postcondition && !postcondition())
          throw "Task ".concat(task.name, " failed its guard. Please check what went wrong.").concat(failureMessage);
      }
    }
  }, {
    key: "getDefaultSettings",
    value: function() {
      return this.constructor.defaultSettings;
    }
    /**
     * Initialize properties for the script.
     * @param manager The properties manager to use.
     */
  }, {
    key: "initPropertiesManager",
    value: function(manager) {
      var _a;
      manager.set(this.getDefaultSettings()), this.options.ccs !== "" && (this.options.ccs === void 0 && (0, import_kolmafia25.readCcs)(grimoireCCS) === "" && (0, import_kolmafia25.writeCcs)("[ default ]\nabort", grimoireCCS), manager.set({
        customCombatScript: (_a = this.options.ccs) !== null && _a !== void 0 ? _a : grimoireCCS
      }));
    }
  }]), Engine2;
}();
Engine.defaultSettings = {
  logPreferenceChange: !0,
  logPreferenceChangeFilter: _toConsumableArray11(new Set([].concat(_toConsumableArray11(get("logPreferenceChangeFilter").split(",")), ["libram_savedMacro", "maximizerMRUList", "testudinalTeachings", "_lastCombatStarted"]))).sort().filter(function(a) {
    return a;
  }).join(","),
  battleAction: "custom combat script",
  autoSatisfyWithMall: !0,
  autoSatisfyWithNPCs: !0,
  autoSatisfyWithCoinmasters: !0,
  autoSatisfyWithStash: !1,
  dontStopForCounters: !0,
  maximizerFoldables: !0,
  hpAutoRecovery: "-0.05",
  hpAutoRecoveryTarget: "0.0",
  mpAutoRecovery: "-0.05",
  mpAutoRecoveryTarget: "0.0",
  afterAdventureScript: "",
  betweenBattleScript: "",
  choiceAdventureScript: "",
  familiarScript: "",
  currentMood: "apathetic",
  autoTuxedo: !0,
  autoPinkyRing: !0,
  autoGarish: !0,
  allowNonMoodBurning: !1,
  allowSummonBurning: !0,
  libramSkillsSoftcore: "none"
};
function maxSongs() {
  return have($skill(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral15(["Mariachi Memory"])))) ? 4 : 3;
}
var wanderingNCs = /* @__PURE__ */ new Set([
  // Halloweener dog noncombats
  "Wooof! Wooooooof!",
  "Playing Fetch*",
  // June cleaver noncombats
  "Aunts not Ants",
  "Bath Time",
  "Beware of Aligator",
  "Delicious Sprouts",
  "Hypnotic Master",
  "Lost and Found",
  "Poetic Justice",
  "Summer Days",
  "Teacher's Pet",
  // Lil' Doctor™ bag noncombat
  "A Pound of Cure",
  // Turtle taming noncombats
  "Nantucket Snapper",
  "Blue Monday",
  "Capital!",
  "Training Day",
  "Boxed In",
  "Duel Nature",
  "Slow Food",
  "A Rolling Turtle Gathers No Moss",
  "Slow Road to Hell",
  "C'mere, Little Fella",
  "The Real Victims",
  "Like That Time in Tortuga",
  "Cleansing your Palette",
  "Harem Scarum",
  "Turtle in peril",
  "No Man, No Hole",
  "Slow and Steady Wins the Brawl",
  "Stormy Weather",
  "Turtles of the Universe",
  "O Turtle Were Art Thou",
  "Allow 6-8 Weeks For Delivery",
  "Kick the Can",
  "Turtles All The Way Around",
  "More eXtreme Than Usual",
  "Jewel in the Rough",
  "The worst kind of drowning",
  "Even Tamer Than Usual",
  "Never Break the Chain",
  "Close, but Yes Cigar",
  "Armchair Quarterback",
  "This Turtle Rocks!",
  "Really Sticking Her Neck Out",
  "It Came from Beneath the Sewer? Great!",
  "Don't Be Alarmed, Now",
  "Puttin' it on Wax",
  "More Like... Hurtle",
  "Musk! Musk! Musk!",
  "Silent Strolling"
]), zoneSpecificNCs = /* @__PURE__ */ new Map([
  ["The Horror...", ["Frat House"]]
  // Duplicate choice name
]);
function lastEncounterWasWanderingNC() {
  var _a, last = get("lastEncounter");
  if (zoneSpecificNCs.has(last)) {
    var zones = (_a = zoneSpecificNCs.get(last)) !== null && _a !== void 0 ? _a : [];
    return zones.includes(get("lastAdventure"));
  } else
    return wanderingNCs.has(last);
}

// node_modules/grimoire-kolmafia/dist/route.js
init_kolmafia_polyfill();
function ownKeys7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    i % 2 ? ownKeys7(Object(source), !0).forEach(function(key) {
      _defineProperty12(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys7(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty12(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _createForOfIteratorHelper11(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray17(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray17(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray17(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray17(o, minLen);
  }
}
function _arrayLikeToArray17(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function getTasks(quests) {
  var implicitAfter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, _a, _b, result = [], _iterator = _createForOfIteratorHelper11(quests), _step;
  try {
    var _loop = function() {
      var quest = _step.value, questCompleted = quest.completed, _iterator3 = _createForOfIteratorHelper11(quest.tasks), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var _task2 = _step3.value, renamedTask = _objectSpread7({}, _task2);
          renamedTask.name = "".concat(quest.name, "/").concat(_task2.name), renamedTask.after = (_a = _task2.after) === null || _a === void 0 ? void 0 : _a.map(function(after2) {
            return after2.includes("/") ? after2 : "".concat(quest.name, "/").concat(after2);
          }), implicitAfter && _task2.after === void 0 && result.length > 0 && (renamedTask.after = [result[result.length - 1].name]), questCompleted !== void 0 && function() {
            var taskCompleted = _task2.completed;
            renamedTask.completed = function() {
              return questCompleted() || taskCompleted();
            };
          }(), result.push(renamedTask);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; )
      _loop();
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  for (var names = /* @__PURE__ */ new Set(), _i = 0, _result = result; _i < _result.length; _i++) {
    var task = _result[_i];
    names.add(task.name);
  }
  for (var _i2 = 0, _result2 = result; _i2 < _result2.length; _i2++) {
    var _task = _result2[_i2], _iterator2 = _createForOfIteratorHelper11((_b = _task.after) !== null && _b !== void 0 ? _b : []), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var after = _step2.value;
        if (!names.has(after))
          throw "Unknown task dependency ".concat(after, " of ").concat(_task.name);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  return result;
}

// node_modules/grimoire-kolmafia/dist/task.js
init_kolmafia_polyfill();

// node_modules/grimoire-kolmafia/dist/limit.js
init_kolmafia_polyfill();

// src/args.ts
init_kolmafia_polyfill();
var import_kolmafia26 = require("kolmafia"), args = Args.create("freecandydotexe", "A script that will not steal your identity but will do halloween for you", {
  blocks: Args.number({
    help: "The number of blocks to run (defaults to infinite)",
    default: 1 / 0
  }),
  treatOutfit: Args.string({
    help: "The outfit to use when checking houses for trick-or-treating",
    setting: "freecandy_treatOutfit",
    default: ""
  }),
  trickOutfit: Args.string({
    help: "A custom outfit to use when doing fights for trick-or-treating",
    setting: "freecandy_trickOutfit",
    default: ""
  }),
  familiar: Args.familiar({
    help: "The familiar to use for combats",
    setting: "freecandy_familiar",
    default: (0, import_kolmafia26.myFamiliar)()
  })
}, {
  positionalArgs: ["blocks"]
}), args_default = args;

// src/lib.ts
init_kolmafia_polyfill();
var import_kolmafia27 = require("kolmafia");
var import_kolmafia28 = require("kolmafia");
function printHighlight(message) {
  var color = (0, import_kolmafia28.isDarkMode)() ? "yellow" : "blue";
  (0, import_kolmafia27.print)(message, color);
}
function printError(message) {
  var color = "red";
  (0, import_kolmafia27.print)(message, color);
}
function getHistoricalSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++)
    items[_key] = arguments[_key];
  return sum(items, function(item6) {
    if ((0, import_kolmafia27.historicalAge)(item6) <= 7 && (0, import_kolmafia27.historicalPrice)(item6) > 0) {
      var isMallMin = (0, import_kolmafia27.historicalPrice)(item6) === Math.max(100, 2 * (0, import_kolmafia27.autosellPrice)(item6));
      return isMallMin ? (0, import_kolmafia27.autosellPrice)(item6) : 0.9 * (0, import_kolmafia27.historicalPrice)(item6);
    }
    return getSaleValue(item6);
  }) / items.length;
}
var State = {
  blocks: 0
}, today = Date.now() - (0, import_kolmafia27.gametimeToInt)() - 1e3 * 60 * 3.5;
function shouldRedigitize() {
  return SourceTerminal_exports.have() ? (0, import_kolmafia27.myAdventures)() * 1.1 < SourceTerminal_exports.getDigitizeUsesRemaining() * (5 * (get("_sourceTerminalDigitizeMonsterCount") * (1 + get("_sourceTerminalDigitizeMonsterCount"))) - 3) : !1;
}

// src/engine.ts
init_kolmafia_polyfill();
var import_kolmafia29 = require("kolmafia");
var _templateObject121, _templateObject229, _templateObject327;
function _taggedTemplateLiteral16(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _slicedToArray11(arr, i) {
  return _arrayWithHoles11(arr) || _iterableToArrayLimit11(arr, i) || _unsupportedIterableToArray18(arr, i) || _nonIterableRest11();
}
function _nonIterableRest11() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit11(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles11(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _createForOfIteratorHelper12(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray18(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray18(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray18(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray18(o, minLen);
  }
}
function _arrayLikeToArray18(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck13(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties11(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass11(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties11(Constructor.prototype, protoProps), staticProps && _defineProperties11(Constructor, staticProps), Constructor;
}
function _get2(target, property, receiver) {
  return typeof Reflect != "undefined" && Reflect.get ? _get2 = Reflect.get : _get2 = function(target2, property2, receiver2) {
    var base = _superPropBase2(target2, property2);
    if (base) {
      var desc = Object.getOwnPropertyDescriptor(base, property2);
      return desc.get ? desc.get.call(receiver2) : desc.value;
    }
  }, _get2(target, property, receiver || target);
}
function _superPropBase2(object, property) {
  for (; !Object.prototype.hasOwnProperty.call(object, property) && (object = _getPrototypeOf4(object), object !== null); )
    ;
  return object;
}
function _inherits4(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf4(subClass, superClass);
}
function _setPrototypeOf4(o, p) {
  return _setPrototypeOf4 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf4(o, p);
}
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn4(this, result);
  };
}
function _possibleConstructorReturn4(self, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized4(self);
}
function _assertThisInitialized4(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf4(o) {
  return _getPrototypeOf4 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf4(o);
}
function _defineProperty13(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
var CandyEngine = /* @__PURE__ */ function(_Engine) {
  _inherits4(CandyEngine2, _Engine);
  var _super = _createSuper4(CandyEngine2);
  function CandyEngine2(tasks) {
    var _this;
    return _classCallCheck13(this, CandyEngine2), _this = _super.call(this, tasks), _defineProperty13(_assertThisInitialized4(_this), "session", void 0), _defineProperty13(_assertThisInitialized4(_this), "aaBossFlag", void 0), _this.aaBossFlag = (0, import_kolmafia29.xpath)((0, import_kolmafia29.visitUrl)("account.php?tab=combat"), "//*[@id=\"opt_flag_aabosses\"]/label/input[@type='checkbox']@checked")[0] === "checked" ? 1 : 0, CandyEngine2.propertyManager = _this.propertyManager, _this.session = Session.current(), _this;
  }
  return _createClass11(CandyEngine2, [{
    key: "destruct",
    value: function() {
      _get2(_getPrototypeOf4(CandyEngine2.prototype), "destruct", this).call(this), (0, import_kolmafia29.visitUrl)("account.php?actions[]=flag_aabosses&flag_aabosses=".concat(this.aaBossFlag, "&action=Update"), !0), (0, import_kolmafia29.useFamiliar)(args_default.familiar), printHighlight("freecandy has run ".concat(State.blocks, " blocks, and produced the following items:"));
      var _iterator = _createForOfIteratorHelper12(Session.current().diff(this.session).items), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var _step$value = _slicedToArray11(_step.value, 2), item6 = _step$value[0], quantity = _step$value[1];
          printHighlight(" ".concat(item6, ": ").concat(quantity));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "available",
    value: function(task) {
      var isDrunk = (0, import_kolmafia29.myInebriety)() > (0, import_kolmafia29.inebrietyLimit)(), sobriety = task.sobriety;
      return isDrunk && sobriety === "sober" || !isDrunk && sobriety === "drunk" ? !1 : _get2(_getPrototypeOf4(CandyEngine2.prototype), "available", this).call(this, task);
    }
  }, {
    key: "dress",
    value: function(task, outfit2) {
      _get2(_getPrototypeOf4(CandyEngine2.prototype), "dress", this).call(this, task, outfit2), (0, import_kolmafia29.itemAmount)($item(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral16(["tiny stillsuit"])))) && (0, import_kolmafia29.equip)($familiar(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral16(["Mosquito"]))), $item(_templateObject327 || (_templateObject327 = _taggedTemplateLiteral16(["tiny stillsuit"]))));
    }
  }, {
    key: "prepare",
    value: function(task) {
      if (_get2(_getPrototypeOf4(CandyEngine2.prototype), "prepare", this).call(this, task), "combat" in task) {
        var hpTarget = clamp(0.4 * (0, import_kolmafia29.myMaxhp)(), 200, 2e3);
        (0, import_kolmafia29.restoreHp)(hpTarget);
        var mpTarget = Math.min(150, (0, import_kolmafia29.myMaxmp)());
        (0, import_kolmafia29.restoreMp)(mpTarget);
      }
    }
  }]), CandyEngine2;
}(Engine);
_defineProperty13(CandyEngine, "propertyManager", null);

// src/regularTasks.ts
init_kolmafia_polyfill();
var import_kolmafia40 = require("kolmafia");

// src/wanderer/index.ts
init_kolmafia_polyfill();
var import_kolmafia33 = require("kolmafia");

// src/wanderer/guzzlr.ts
init_kolmafia_polyfill();
var import_kolmafia31 = require("kolmafia");

// src/wanderer/lib.ts
init_kolmafia_polyfill();
var import_kolmafia30 = require("kolmafia");
var _templateObject130, _templateObject230, _templateObject328, _templateObject420, _templateObject519, _templateObject617, _templateObject715, _templateObject815, _templateObject915, _templateObject1012, _templateObject1111, _templateObject1210, _templateObject1310, _templateObject148, _templateObject158, _templateObject168, _templateObject178, _templateObject188, _templateObject198, _templateObject208, _templateObject2112, _templateObject2210, _templateObject238, _templateObject248, _templateObject258, _templateObject268, _templateObject278, _templateObject287, _templateObject297, _templateObject307, _templateObject3112, _templateObject329, _templateObject337, _templateObject346, _templateObject355, _templateObject365, _templateObject375, _templateObject385, _templateObject395, _templateObject405, _templateObject4111, _templateObject425, _templateObject435, _templateObject445, _templateObject455, _templateObject465, _templateObject475, _templateObject485, _templateObject495, _templateObject505, _templateObject5110, _templateObject525;
function _classCallCheck14(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperty14(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toConsumableArray12(arr) {
  return _arrayWithoutHoles12(arr) || _iterableToArray12(arr) || _unsupportedIterableToArray19(arr) || _nonIterableSpread12();
}
function _nonIterableSpread12() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray19(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray19(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray19(o, minLen);
  }
}
function _iterableToArray12(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles12(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray19(arr);
}
function _arrayLikeToArray19(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral17(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function realmAvailable(identifier) {
  return identifier === "fantasy" ? get("_frToday") || get("frAlways") : identifier === "pirate" ? get("_prToday") || get("prAlways") : get("_".concat(identifier, "AirportToday")) || get("".concat(identifier, "AirportAlways"));
}
function untangleDigitizes(turnCount, chunks) {
  var turnsPerChunk = turnCount / chunks, monstersPerChunk = Math.sqrt((turnsPerChunk + 3) / 5 + 1 / 4) - 1 / 2;
  return Math.round(chunks * monstersPerChunk);
}
function digitizedMonstersRemaining() {
  if (!SourceTerminal_exports.have())
    return 0;
  var digitizesLeft = SourceTerminal_exports.getDigitizeUsesRemaining();
  if (digitizesLeft === SourceTerminal_exports.getMaximumDigitizeUses())
    return untangleDigitizes((0, import_kolmafia30.myAdventures)(), SourceTerminal_exports.getMaximumDigitizeUses());
  var monsterCount = SourceTerminal_exports.getDigitizeMonsterCount() + 1, turnsLeftAtNextMonster = (0, import_kolmafia30.myAdventures)() - counter_exports.get("Digitize Monster");
  if (turnsLeftAtNextMonster <= 0)
    return 0;
  var turnsAtLastDigitize = turnsLeftAtNextMonster + ((monsterCount + 1) * monsterCount * 5 - 3);
  return untangleDigitizes(turnsAtLastDigitize, digitizesLeft + 1) - SourceTerminal_exports.getDigitizeMonsterCount();
}
var UnlockableZones = [{
  zone: "Spaaace",
  available: function() {
    return have($effect(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral17(["Transpondent"]))));
  },
  unlocker: $item(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral17(["transporter transponder"]))),
  noInv: !1
}, {
  zone: "Wormwood",
  available: function() {
    return have($effect(_templateObject328 || (_templateObject328 = _taggedTemplateLiteral17(["Absinthe-Minded"]))));
  },
  unlocker: $item(_templateObject420 || (_templateObject420 = _taggedTemplateLiteral17(["tiny bottle of absinthe"]))),
  noInv: !1
}, {
  zone: "Rabbit Hole",
  available: function() {
    return have($effect(_templateObject519 || (_templateObject519 = _taggedTemplateLiteral17(["Down the Rabbit Hole"]))));
  },
  unlocker: $item(_templateObject617 || (_templateObject617 = _taggedTemplateLiteral17(['"DRINK ME" potion']))),
  noInv: !1
}, {
  zone: "Conspiracy Island",
  available: function() {
    return realmAvailable("spooky");
  },
  unlocker: $item(_templateObject715 || (_templateObject715 = _taggedTemplateLiteral17(["one-day ticket to Conspiracy Island"]))),
  noInv: !0
}, {
  zone: "Dinseylandfill",
  available: function() {
    return realmAvailable("stench");
  },
  unlocker: $item(_templateObject815 || (_templateObject815 = _taggedTemplateLiteral17(["one-day ticket to Dinseylandfill"]))),
  noInv: !0
}, {
  zone: "The Glaciest",
  available: function() {
    return realmAvailable("cold");
  },
  unlocker: $item(_templateObject915 || (_templateObject915 = _taggedTemplateLiteral17(["one-day ticket to The Glaciest"]))),
  noInv: !0
}, {
  zone: "Spring Break Beach",
  available: function() {
    return realmAvailable("sleaze");
  },
  unlocker: $item(_templateObject1012 || (_templateObject1012 = _taggedTemplateLiteral17(["one-day ticket to Spring Break Beach"]))),
  noInv: !0
}];
function underwater(location) {
  return location.environment === "underwater";
}
var canAdventureOrUnlockSkipList = [].concat(_toConsumableArray12($locations(_templateObject1111 || (_templateObject1111 = _taggedTemplateLiteral17(["The Oasis, The Bubblin' Caldera, Barrrney's Barrr, The F'c'le, The Poop Deck, Belowdecks, 8-Bit Realm, Madness Bakery, The Secret Government Laboratory, The Dire Warren, Inside the Palindome, The Haiku Dungeon, An Incredibly Strange Place (Bad Trip), An Incredibly Strange Place (Mediocre Trip), An Incredibly Strange Place (Great Trip), El Vibrato Island"])))), _toConsumableArray12(import_kolmafia30.Location.all().filter(function(l) {
  return ["Clan Basement", "Psychoses"].includes(l.parent);
})));
function canAdventureOrUnlock(loc) {
  var skiplist = _toConsumableArray12(canAdventureOrUnlockSkipList);
  !have($item(_templateObject1210 || (_templateObject1210 = _taggedTemplateLiteral17(["repaid diaper"])))) && have($item(_templateObject1310 || (_templateObject1310 = _taggedTemplateLiteral17(["Great Wolf's beastly trousers"])))) && skiplist.push($location(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral17(["The Icy Peak"]))));
  var canUnlock = UnlockableZones.some(function(z) {
    return loc.zone === z.zone && (z.available() || !z.noInv);
  });
  return !underwater(loc) && !skiplist.includes(loc) && ((0, import_kolmafia30.canAdventure)(loc) || canUnlock);
}
function unlock(loc, value) {
  var unlockableZone = UnlockableZones.find(function(z) {
    return z.zone === loc.zone;
  });
  return unlockableZone ? unlockableZone.available() ? !0 : (0, import_kolmafia30.buy)(1, unlockableZone.unlocker, value) === 0 ? !1 : (0, import_kolmafia30.use)(unlockableZone.unlocker) : (0, import_kolmafia30.canAdventure)(loc);
}
var backupSkiplist = $locations(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral17(["The Overgrown Lot, The Skeleton Store, The Mansion of Dr. Weirdeaux, Professor Jacking's Huge-A-Ma-tron"]))), backupSafelist = $locations(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral17(["The Haunted Gallery, The Haunted Ballroom, The Haunted Library, The Penultimate Fantasy Airship, Cobb's Knob Barracks, The Castle in the Clouds in the Sky (Basement), The Castle in the Clouds in the Sky (Ground Floor), The Castle in the Clouds in the Sky (Top Floor), The Haiku Dungeon, Twin Peak, A Mob of Zeppelin Protesters"]))), yellowRaySafelist = $locations(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral17(["The Haunted Gallery, The Haunted Ballroom, The Haunted Library, Cobb's Knob Barracks, The Castle in the Clouds in the Sky (Basement), The Castle in the Clouds in the Sky (Ground Floor), The Haiku Dungeon, Twin Peak, A Mob of Zeppelin Protesters"])));
function canWanderTypeBackup(location) {
  return !backupSkiplist.includes(location) && (location.combatPercent >= 100 || backupSafelist.includes(location));
}
function canWanderTypeYellowRay(location) {
  return location === $location(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral17(["The Fun-Guy Mansion"]))) && get("funGuyMansionKills", 0) >= 100 ? !1 : !backupSkiplist.includes(location) && (location.combatPercent >= 100 || yellowRaySafelist.includes(location));
}
var wandererSkiplist = $locations(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral17(["The Batrat and Ratbat Burrow, Guano Junction, The Beanbat Chamber, A-Boo Peak"])));
function canWanderTypeWander(location) {
  return !wandererSkiplist.includes(location) && location.wanderers;
}
function canWander(location, type) {
  if (underwater(location))
    return !1;
  switch (type) {
    case "backup":
      return canWanderTypeBackup(location);
    case "yellow ray":
      return canWanderTypeYellowRay(location);
    case "wanderer":
      return canWanderTypeWander(location);
  }
}
var WandererTarget = (
  /**
   * Process for determining where to put a wanderer to extract additional value from it
   * @param name name of this wanderer - for documentation/logging purposes
   * @param location returns the location to adventure to target this; null only if something goes wrong
   * @param value the expected additional value of putting a single wanderer-fight into the zone for this
   * @param prepareTurn attempt to set up, spending meat and or items as necessary
   */
  function WandererTarget2(name, location, value) {
    var prepareTurn = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
      return !0;
    };
    _classCallCheck14(this, WandererTarget2), _defineProperty14(this, "name", void 0), _defineProperty14(this, "value", void 0), _defineProperty14(this, "location", void 0), _defineProperty14(this, "prepareTurn", void 0), this.name = name, this.value = value, this.location = location, this.prepareTurn = prepareTurn;
  }
), quartetChoice = get("lastQuartetRequest") || 4, unsupportedChoices = /* @__PURE__ */ new Map([
  [$location(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral17(["The Spooky Forest"]))), {
    502: 2,
    505: 2
  }],
  [$location(_templateObject2112 || (_templateObject2112 = _taggedTemplateLiteral17(["Guano Junction"]))), {
    1427: 1
  }],
  [$location(_templateObject2210 || (_templateObject2210 = _taggedTemplateLiteral17(["The Hidden Apartment Building"]))), {
    780: 6,
    1578: 6
  }],
  [$location(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral17(["The Black Forest"]))), {
    923: 1,
    924: 1
  }],
  [$location(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral17(["LavaCo\u2122 Lamp Factory"]))), {
    1091: 9
  }],
  [$location(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral17(["The Haunted Laboratory"]))), {
    884: 6
  }],
  [$location(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral17(["The Haunted Nursery"]))), {
    885: 6
  }],
  [$location(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral17(["The Haunted Storage Room"]))), {
    886: 6
  }],
  [$location(_templateObject287 || (_templateObject287 = _taggedTemplateLiteral17(["The Haunted Ballroom"]))), {
    106: 3,
    90: quartetChoice
  }],
  // Skip, and Choose currently playing song, or skip
  [$location(_templateObject297 || (_templateObject297 = _taggedTemplateLiteral17(["The Haunted Library"]))), {
    163: 4,
    888: 4,
    889: 5
  }],
  [$location(_templateObject307 || (_templateObject307 = _taggedTemplateLiteral17(["The Haunted Gallery"]))), {
    89: 6,
    91: 2
  }],
  [$location(_templateObject3112 || (_templateObject3112 = _taggedTemplateLiteral17(["The Hidden Park"]))), {
    789: 6
  }],
  [$location(_templateObject329 || (_templateObject329 = _taggedTemplateLiteral17(["A Mob of Zeppelin Protesters"]))), {
    1432: 1,
    856: 2,
    857: 2,
    858: 2
  }],
  [$location(_templateObject337 || (_templateObject337 = _taggedTemplateLiteral17(["A-Boo Peak"]))), {
    1430: 2
  }],
  [$location(_templateObject346 || (_templateObject346 = _taggedTemplateLiteral17(["Sloppy Seconds Diner"]))), {
    919: 6
  }],
  [$location(_templateObject355 || (_templateObject355 = _taggedTemplateLiteral17(["VYKEA"]))), {
    1115: 6
  }],
  [$location(_templateObject365 || (_templateObject365 = _taggedTemplateLiteral17(["The Castle in the Clouds in the Sky (Basement)"]))), {
    670: 4,
    671: 4,
    672: 1
  }],
  [$location(_templateObject375 || (_templateObject375 = _taggedTemplateLiteral17(["The Haunted Bedroom"]))), {
    876: 1,
    // old leather wallet, 500 meat
    877: 1,
    // old coin purse, 500 meat
    878: 1,
    // 400-600 meat
    879: 2,
    // grouchy spirit
    880: 2
    // a dumb 75 meat club
  }],
  [$location(_templateObject385 || (_templateObject385 = _taggedTemplateLiteral17(["The Copperhead Club"]))), {
    855: 4
  }],
  [$location(_templateObject395 || (_templateObject395 = _taggedTemplateLiteral17(["The Haunted Bathroom"]))), {
    882: 2
  }],
  // skip; it's the towel adventure but we don't want towels
  [$location(_templateObject405 || (_templateObject405 = _taggedTemplateLiteral17(["The Castle in the Clouds in the Sky (Top Floor)"]))), {
    1431: 1,
    675: 4,
    // Go to Steampunk choice
    676: 4,
    // Go to Punk Rock choice
    677: 1,
    // Fight Steam Punk Giant
    678: 3
    // Go to Steampunk choice
  }],
  [$location(_templateObject4111 || (_templateObject4111 = _taggedTemplateLiteral17(["The Castle in the Clouds in the Sky (Ground Floor)"]))), {
    672: 3,
    // Skip
    673: 3,
    // Skip
    674: 3,
    // Skip
    1026: 3
    // Skip
  }],
  [$location(_templateObject425 || (_templateObject425 = _taggedTemplateLiteral17(["The Hidden Office Building"]))), {
    786: 6
  }],
  [$location(_templateObject435 || (_templateObject435 = _taggedTemplateLiteral17(["Cobb's Knob Barracks"]))), {
    522: 2
  }],
  // skip
  [$location(_templateObject445 || (_templateObject445 = _taggedTemplateLiteral17(["The Penultimate Fantasy Airship"]))), {
    178: 2,
    182: 1
  }],
  // Skip, and Fight random enemy
  [$location(_templateObject455 || (_templateObject455 = _taggedTemplateLiteral17(["The Haiku Dungeon"]))), {
    297: 3
  }]
  // skip
]);
function defaultFactory() {
  return [new WandererTarget("Default", $location(_templateObject465 || (_templateObject465 = _taggedTemplateLiteral17(["The Haunted Kitchen"]))), 0)];
}
var WanderingSources = [{
  name: "CMG",
  item: $item(_templateObject475 || (_templateObject475 = _taggedTemplateLiteral17(["cursed magnifying glass"]))),
  max: 3,
  property: "_voidFreeFights",
  type: "wanderer"
}, {
  name: "Voter",
  item: $item(_templateObject485 || (_templateObject485 = _taggedTemplateLiteral17(['"I Voted!" sticker']))),
  max: 3,
  property: "_voteFreeFights",
  type: "wanderer"
}, {
  name: "Voter",
  item: $item(_templateObject495 || (_templateObject495 = _taggedTemplateLiteral17(['"I Voted!" sticker']))),
  max: 3,
  property: "_voteFreeFights",
  type: "wanderer"
}, {
  name: "Backup",
  item: $item(_templateObject505 || (_templateObject505 = _taggedTemplateLiteral17(["backup camera"]))),
  max: 11,
  property: "_backUpUses",
  type: "backup"
}];
function wandererTurnsAvailableToday(location) {
  var canWanderCache = {
    backup: canWander(location, "backup"),
    wanderer: canWander(location, "wanderer"),
    "yellow ray": canWander(location, "yellow ray")
  }, digitize = canWanderCache.backup ? digitizedMonstersRemaining() : 0, pigSkinnerRay = canWanderCache.backup && have($skill(_templateObject5110 || (_templateObject5110 = _taggedTemplateLiteral17(["Free-For-All"])))) ? Math.floor((0, import_kolmafia30.myAdventures)() / 25) : 0, yellowRayCooldown = have($skill(_templateObject525 || (_templateObject525 = _taggedTemplateLiteral17(["Fondeluge"])))) ? 50 : 100, yellowRay = canWanderCache["yellow ray"] ? Math.floor((0, import_kolmafia30.myAdventures)() / yellowRayCooldown) : 0, wanderers = sum(WanderingSources, function(source) {
    return canWanderCache[source.type] && have(source.item) ? clamp(get(source.property), 0, source.max) : 0;
  });
  return digitize + pigSkinnerRay + yellowRay + wanderers;
}

// src/wanderer/guzzlr.ts
var _templateObject131, _templateObject231, _templateObject330;
function _taggedTemplateLiteral18(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function considerAbandon(locationSkiplist) {
  var location = Guzzlr_exports.getLocation(), remaningTurns = Math.ceil((100 - get("guzzlrDeliveryProgress")) / (10 - get("_guzzlrDeliveries")));
  (0, import_kolmafia31.print)("Got guzzlr quest ".concat(Guzzlr_exports.getTier(), " at ").concat(Guzzlr_exports.getLocation(), " with remaining turns ").concat(remaningTurns)), // consider abandoning
  (!location || // if mafia faled to track the location correctly
  locationSkiplist.includes(location) || !canAdventureOrUnlock(location) || // or the zone is marked as "generally cannot adv"
  wandererTurnsAvailableToday(location) < remaningTurns) && ((0, import_kolmafia31.print)("Abandoning..."), Guzzlr_exports.abandon());
}
function acceptGuzzlrQuest(locationSkiplist) {
  for (Guzzlr_exports.isQuestActive() && considerAbandon(locationSkiplist); !Guzzlr_exports.isQuestActive(); )
    (0, import_kolmafia31.print)("Picking a guzzlr quest"), Guzzlr_exports.canPlatinum() && !(get("garbo_prioritizeCappingGuzzlr", !1) && Guzzlr_exports.haveFullPlatinumBonus()) ? Guzzlr_exports.acceptPlatinum() : Guzzlr_exports.canGold() && (Guzzlr_exports.haveFullBronzeBonus() || !Guzzlr_exports.haveFullGoldBonus()) ? Guzzlr_exports.acceptGold() : Guzzlr_exports.acceptBronze(), considerAbandon(locationSkiplist);
}
function guzzlrValue(tier) {
  var progressPerTurn = 100 / (10 - get("_guzzlrDeliveries")), buckValue = getSaleValue($item(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral18(["Never Don't Stop Not Striving"])))) / 1e3;
  switch (tier) {
    case null:
      return 0;
    case "bronze":
      return 3 * buckValue / progressPerTurn;
    case "gold":
      return 6 * buckValue / progressPerTurn;
    case "platinum":
      return 21.5 * buckValue / progressPerTurn;
  }
}
function guzzlrFactory(_type, locationSkiplist) {
  if (Guzzlr_exports.have()) {
    acceptGuzzlrQuest(locationSkiplist);
    var location = Guzzlr_exports.getLocation();
    if (location !== null) {
      var guzzlrBooze = Guzzlr_exports.getTier() === "platinum" ? Guzzlr_exports.getCheapestPlatinumCocktail() : Guzzlr_exports.getBooze();
      return [new WandererTarget("Guzzlr", location, guzzlrValue(Guzzlr_exports.getTier()), function() {
        if (!guzzlrBooze)
          return !1;
        if (!have(guzzlrBooze)) {
          var fancy = guzzlrBooze && (0, import_kolmafia31.craftType)(guzzlrBooze).includes("fancy");
          guzzlrBooze && (!fancy || fancy && (0, import_kolmafia31.toInt)(have($skill(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral18(["Expert Corner-Cutter"]))))) * (5 - get("_expertCornerCutterUsed")) + (0, import_kolmafia31.toInt)(have($skill(_templateObject330 || (_templateObject330 = _taggedTemplateLiteral18(["Rapid Prototyping"]))))) * (5 - get("_rapidPrototypingUsed")) > 0) ? (0, import_kolmafia31.retrieveItem)(guzzlrBooze) : guzzlrBooze && (0, import_kolmafia31.buy)(1, guzzlrBooze, guzzlrValue(Guzzlr_exports.getTier()));
        }
        return have(guzzlrBooze);
      })];
    }
  }
  return [];
}

// src/wanderer/lovebugs.ts
init_kolmafia_polyfill();
var _templateObject140, _templateObject239, _templateObject331, _templateObject421, _templateObject520, _templateObject618;
function _taggedTemplateLiteral19(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var LovebugTargets = [{
  element: "cold",
  location: $location(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral19(["VYKEA"]))),
  target: $item(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral19(["one-day ticket to The Glaciest"]))),
  cost: 50
}, {
  element: "sleaze",
  location: $location(_templateObject331 || (_templateObject331 = _taggedTemplateLiteral19(["The Fun-Guy Mansion"]))),
  target: $item(_templateObject421 || (_templateObject421 = _taggedTemplateLiteral19(["one-day ticket to Spring Break Beach"]))),
  cost: 100
}, {
  element: "spooky",
  location: $location(_templateObject520 || (_templateObject520 = _taggedTemplateLiteral19(["The Deep Dark Jungle"]))),
  target: $item(_templateObject618 || (_templateObject618 = _taggedTemplateLiteral19(["one-day ticket to Conspiracy Island"]))),
  cost: 50
}];
function lovebugsFactory() {
  return get("lovebugsUnlocked") ? LovebugTargets.filter(function(t) {
    return realmAvailable(t.element);
  }).map(function(t) {
    return new WandererTarget("Lovebugs ".concat(t.location), t.location, getSaleValue(t.target) * 0.05 / t.cost);
  }) : [];
}

// src/wanderer/yellowray.ts
init_kolmafia_polyfill();
var import_kolmafia32 = require("kolmafia");
function _toConsumableArray13(arr) {
  return _arrayWithoutHoles13(arr) || _iterableToArray13(arr) || _unsupportedIterableToArray20(arr) || _nonIterableSpread13();
}
function _nonIterableSpread13() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray13(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles13(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray20(arr);
}
function _createForOfIteratorHelper13(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray20(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray20(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray20(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray20(o, minLen);
  }
}
function _arrayLikeToArray20(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function averageYrValue(location) {
  var badAttributes = ["LUCKY", "ULTRARARE", "BOSS"], rates = (0, import_kolmafia32.appearanceRates)(location), monsters = Object.keys((0, import_kolmafia32.getLocationMonsters)(location)).map(function(m) {
    return (0, import_kolmafia32.toMonster)(m);
  }).filter(function(m) {
    return !badAttributes.some(function(s) {
      return m.attributes.includes(s);
    }) && rates[m.name] > 0;
  }), canDuplicate = SourceTerminal_exports.have() && SourceTerminal_exports.duplicateUsesRemaining() > 0;
  return monsters.length === 0 ? 0 : sum(monsters, function(m) {
    var items = (0, import_kolmafia32.itemDropsArray)(m).filter(function(drop) {
      return ["", "n"].includes(drop.type);
    }), duplicateFactor = canDuplicate && !m.attributes.includes("NOCOPY") ? 2 : 1;
    return duplicateFactor * sum(items, function(drop) {
      var yrRate = (drop.type === "" ? 100 : drop.rate) / 100;
      return yrRate * getHistoricalSaleValue(drop.drop);
    });
  }) / monsters.length;
}
function yrValues() {
  var values = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper13(import_kolmafia32.Location.all().filter(function(l) {
    return canAdventureOrUnlock(l) && !underwater(l);
  })), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var location = _step.value;
      values.set(location, averageYrValue(location));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return values;
}
function yellowRayFactory(type, locationSkiplist) {
  if (type === "yellow ray") {
    var _ret = function() {
      var validLocations = import_kolmafia32.Location.all().filter(function(location) {
        return canWander(location, "yellow ray") && canAdventureOrUnlock(location);
      }), locationValues = yrValues(), bestZones = /* @__PURE__ */ new Set([maxBy(validLocations, function(l) {
        var _locationValues$get;
        return (_locationValues$get = locationValues.get(l)) !== null && _locationValues$get !== void 0 ? _locationValues$get : 0;
      })]), _iterator2 = _createForOfIteratorHelper13(UnlockableZones), _step2;
      try {
        var _loop = function() {
          var unlockableZone = _step2.value, extraLocations = import_kolmafia32.Location.all().filter(function(l) {
            return l.zone === unlockableZone.zone && !locationSkiplist.includes(l);
          });
          bestZones.add(maxBy(_toConsumableArray13(extraLocations), function(l) {
            var _locationValues$get3;
            return (_locationValues$get3 = locationValues.get(l)) !== null && _locationValues$get3 !== void 0 ? _locationValues$get3 : 0;
          }));
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; )
          _loop();
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (bestZones.size > 0)
        return {
          v: _toConsumableArray13(bestZones).map(function(l) {
            var _locationValues$get2;
            return new WandererTarget("Yellow Ray ".concat(l), l, (_locationValues$get2 = locationValues.get(l)) !== null && _locationValues$get2 !== void 0 ? _locationValues$get2 : 0);
          })
        };
    }();
    if (typeof _ret == "object")
      return _ret.v;
  }
  return [];
}

// src/wanderer/index.ts
var _templateObject141;
function _taggedTemplateLiteral20(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray14(arr) {
  return _arrayWithoutHoles14(arr) || _iterableToArray14(arr) || _unsupportedIterableToArray21(arr) || _nonIterableSpread14();
}
function _nonIterableSpread14() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray14(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles14(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray21(arr);
}
function _createForOfIteratorHelper14(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray21(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray21(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray21(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray21(o, minLen);
  }
}
function _arrayLikeToArray21(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var wanderFactories = [defaultFactory, yellowRayFactory, lovebugsFactory, guzzlrFactory];
function bestWander(type, locationSkiplist, nameSkiplist) {
  var possibleLocations = /* @__PURE__ */ new Map(), _iterator = _createForOfIteratorHelper14(wanderFactories), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var wanderFactory = _step.value, wanderTargets = wanderFactory(type, locationSkiplist), _iterator2 = _createForOfIteratorHelper14(wanderTargets), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var wanderTarget = _step2.value;
          if (!nameSkiplist.includes(wanderTarget.name) && !locationSkiplist.includes(wanderTarget.location) && canWander(wanderTarget.location, type)) {
            var _possibleLocations$ge, wandererLocation = (_possibleLocations$ge = possibleLocations.get(wanderTarget.location)) !== null && _possibleLocations$ge !== void 0 ? _possibleLocations$ge : {
              location: wanderTarget.location,
              targets: [],
              value: 0
            };
            wandererLocation.targets = [].concat(_toConsumableArray14(wandererLocation.targets), [wanderTarget]), wandererLocation.value += wanderTarget.value, possibleLocations.set(wandererLocation.location, wandererLocation);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (possibleLocations.size === 0)
    throw "Could not determine a wander target!";
  return maxBy(_toConsumableArray14(possibleLocations.values()), function(w) {
    return w.value;
  });
}
function wanderWhere(type) {
  var nameSkiplist = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], locationSkiplist = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], candidate = bestWander(type, locationSkiplist, nameSkiplist), failed = candidate.targets.filter(function(target) {
    return !target.prepareTurn();
  }), badLocation = !canAdventureOrUnlock(candidate.location) || !unlock(candidate.location, candidate.value) || !canWander(candidate.location, type) ? [candidate.location] : [];
  if (failed.length > 0 || badLocation.length > 0)
    return wanderWhere(type, [].concat(_toConsumableArray14(nameSkiplist), _toConsumableArray14(failed.map(function(target) {
      return target.name;
    }))), [].concat(_toConsumableArray14(locationSkiplist), badLocation));
  var _CandyEngine$property, _unsupportedChoices$g;
  (_CandyEngine$property = CandyEngine.propertyManager) === null || _CandyEngine$property === void 0 || _CandyEngine$property.setChoices((_unsupportedChoices$g = unsupportedChoices.get(candidate.location)) !== null && _unsupportedChoices$g !== void 0 ? _unsupportedChoices$g : {});
  var targets = candidate.targets.map(function(t) {
    return t.name;
  }).join("; "), value = candidate.value.toFixed(2);
  return printHighlight("Wandering at ".concat(candidate.location, " for expected value ").concat(value, " (").concat(targets, ")")), candidate.location;
}
var sober = function() {
  return (0, import_kolmafia33.myInebriety)() <= (0, import_kolmafia33.inebrietyLimit)();
};
function drunkSafeWander(type) {
  return sober() ? wanderWhere(type) : $location(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral20(["Drunken Stupor"])));
}

// src/resources/index.ts
init_kolmafia_polyfill();

// src/resources/autumnaton.ts
init_kolmafia_polyfill();
var import_kolmafia34 = require("kolmafia");
var _templateObject149, _templateObject240;
function _toConsumableArray15(arr) {
  return _arrayWithoutHoles15(arr) || _iterableToArray15(arr) || _unsupportedIterableToArray22(arr) || _nonIterableSpread15();
}
function _nonIterableSpread15() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray22(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray22(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray22(o, minLen);
  }
}
function _iterableToArray15(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles15(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray22(arr);
}
function _arrayLikeToArray22(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral21(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function bestAutumnatonLocation(locations) {
  return maxBy(mostValuableUpgrade(locations), averageAutumnatonValue);
}
function averageAutumnatonValue(location, acuityOverride, slotOverride) {
  var badAttributes = ["LUCKY", "ULTRARARE", "BOSS"], rates = (0, import_kolmafia34.appearanceRates)(location), monsters = Object.keys((0, import_kolmafia34.getLocationMonsters)(location)).map(function(m) {
    return (0, import_kolmafia34.toMonster)(m);
  }).filter(function(m) {
    return !badAttributes.some(function(s) {
      return m.attributes.includes(s);
    }) && rates[m.name] > 0;
  });
  if (monsters.length === 0)
    return 0;
  var maximumDrops = slotOverride != null ? slotOverride : AutumnAton_exports.zoneItems(), acuityCutoff = 20 - (acuityOverride != null ? acuityOverride : AutumnAton_exports.visualAcuity()) * 5, validDrops = flat(monsters.map(function(m) {
    return (0, import_kolmafia34.itemDropsArray)(m);
  })).map(function(_ref) {
    var rate = _ref.rate, type = _ref.type, drop = _ref.drop;
    return {
      value: ["c", "0"].includes(type) ? 0 : getHistoricalSaleValue(drop),
      preAcuityExpectation: ["c", "0", ""].includes(type) ? 2 * rate / 100 : 0,
      postAcuityExpectation: rate >= acuityCutoff && ["c", "0", ""].includes(type) ? 8 * rate / 100 : 0
    };
  }), overallExpectedDropQuantity = sum(validDrops, function(_ref2) {
    var preAcuityExpectation = _ref2.preAcuityExpectation, postAcuityExpectation = _ref2.postAcuityExpectation;
    return preAcuityExpectation + postAcuityExpectation;
  }), expectedCollectionValue = sum(validDrops, function(_ref3) {
    var value = _ref3.value, preAcuityExpectation = _ref3.preAcuityExpectation, postAcuityExpectation = _ref3.postAcuityExpectation, adjustedDropAmount = (preAcuityExpectation + postAcuityExpectation) * Math.min(1, maximumDrops / overallExpectedDropQuantity);
    return adjustedDropAmount * value;
  });
  return seasonalItemValue(location) + expectedCollectionValue;
}
function seasonalItemValue(location, seasonalOverride) {
  var _AutumnAton$getUnique, autumnItems = $items(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral21(["autumn leaf, AutumnFest ale, autumn breeze, autumn dollar, autumn years wisdom"]))), avgValueOfRandomAutumnItem = getSaleValue.apply(void 0, _toConsumableArray15(autumnItems)), autumnMeltables = $items(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral21(["autumn debris shield, autumn leaf pendant, autumn sweater-weather sweater"]))), autumnItem = (_AutumnAton$getUnique = AutumnAton_exports.getUniques(location)) === null || _AutumnAton$getUnique === void 0 ? void 0 : _AutumnAton$getUnique.item, seasonalItemDrops = seasonalOverride != null ? seasonalOverride : AutumnAton_exports.seasonalItems();
  return autumnItem ? (seasonalItemDrops > 1 ? avgValueOfRandomAutumnItem : 0) + (autumnMeltables.includes(autumnItem) ? (
    // If we already have the meltable, then we get a random item, else value at 0
    (0, import_kolmafia34.availableAmount)(autumnItem) > 0 ? avgValueOfRandomAutumnItem : 0
  ) : getHistoricalSaleValue(autumnItem)) : seasonalItemDrops > 1 ? avgValueOfRandomAutumnItem : 0;
}
function expectedRemainingExpeditions() {
  var legs2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : AutumnAton_exports.legs(), availableAutumnatonTurns = (0, import_kolmafia34.myAdventures)() - AutumnAton_exports.turnsLeft(), quests = get("_autumnatonQuests"), legOffsetFactor = 11 * Math.max(quests - legs2 - 1, 0);
  return Math.floor(Math.sqrt(Math.pow(quests, 2) + 2 * (availableAutumnatonTurns - legOffsetFactor) / 11));
}
var profitRelevantUpgrades = ["leftarm1", "leftleg1", "rightarm1", "rightleg1", "cowcatcher", "periscope", "radardish"];
function profitFromExtraAcuity(bestLocationContainingUpgrade, bestLocationWithInstalledUpgrade) {
  return averageAutumnatonValue(bestLocationContainingUpgrade) + averageAutumnatonValue(bestLocationWithInstalledUpgrade) * Math.max(0, expectedRemainingExpeditions() - 1);
}
function profitFromExtraLeg(bestLocationContainingUpgrade, bestLocationWithInstalledUpgrade) {
  return averageAutumnatonValue(bestLocationContainingUpgrade) + averageAutumnatonValue(bestLocationWithInstalledUpgrade) * Math.max(0, expectedRemainingExpeditions(AutumnAton_exports.legs() + 1) - 1);
}
function profitFromExtraArm(bestLocationContainingUpgrade, bestLocationWithInstalledUpgrade) {
  return averageAutumnatonValue(bestLocationContainingUpgrade) + averageAutumnatonValue(bestLocationWithInstalledUpgrade) * Math.max(0, expectedRemainingExpeditions() - 1);
}
function profitFromExtraAutumnItem(bestLocationContainingUpgrade, bestLocationWithInstalledUpgrade) {
  return averageAutumnatonValue(bestLocationContainingUpgrade) + (seasonalItemValue(bestLocationWithInstalledUpgrade) + averageAutumnatonValue(bestLocationWithInstalledUpgrade)) * Math.max(0, expectedRemainingExpeditions() - 1);
}
function makeUpgradeValuator(fullLocations, currentBestLocation) {
  return function(upgrade2) {
    var upgradeLocations = fullLocations.filter(function(location) {
      var _AutumnAton$getUnique2;
      return ((_AutumnAton$getUnique2 = AutumnAton_exports.getUniques(location)) === null || _AutumnAton$getUnique2 === void 0 ? void 0 : _AutumnAton$getUnique2.upgrade) === upgrade2;
    });
    if (!upgradeLocations.length)
      return {
        upgrade: upgrade2,
        profit: 0
      };
    var bestLocationContainingUpgrade = maxBy(upgradeLocations, averageAutumnatonValue);
    switch (upgrade2) {
      case "periscope":
      case "radardish": {
        var bestLocationWithInstalledUpgrade = maxBy(fullLocations, function(loc) {
          return averageAutumnatonValue(loc, AutumnAton_exports.visualAcuity() + 1);
        });
        return {
          upgrade: upgrade2,
          profit: profitFromExtraAcuity(bestLocationContainingUpgrade, bestLocationWithInstalledUpgrade)
        };
      }
      case "rightleg1":
      case "leftleg1":
        return {
          upgrade: upgrade2,
          profit: profitFromExtraLeg(bestLocationContainingUpgrade, currentBestLocation)
        };
      case "rightarm1":
      case "leftarm1": {
        var _bestLocationWithInstalledUpgrade = maxBy(fullLocations, function(loc) {
          return averageAutumnatonValue(loc, void 0, AutumnAton_exports.zoneItems() + 1);
        });
        return {
          upgrade: upgrade2,
          profit: profitFromExtraArm(bestLocationContainingUpgrade, _bestLocationWithInstalledUpgrade)
        };
      }
      case "cowcatcher":
        return {
          upgrade: upgrade2,
          profit: profitFromExtraAutumnItem(bestLocationContainingUpgrade, currentBestLocation)
        };
      default:
        return {
          upgrade: upgrade2,
          profit: 0
        };
    }
  };
}
function mostValuableUpgrade(fullLocations) {
  var validLocations = fullLocations.filter(function(l) {
    return l.parent !== "Clan Basement";
  });
  if (expectedRemainingExpeditions() < 1)
    return validLocations;
  var currentUpgrades2 = AutumnAton_exports.currentUpgrades(), acquirableUpgrades = profitRelevantUpgrades.filter(function(upgrade2) {
    return !currentUpgrades2.includes(upgrade2);
  });
  if (acquirableUpgrades.length === 0)
    return validLocations;
  var currentBestLocation = maxBy(validLocations, averageAutumnatonValue), currentExpectedProfit = averageAutumnatonValue(currentBestLocation) * expectedRemainingExpeditions(), upgradeValuations = acquirableUpgrades.map(makeUpgradeValuator(validLocations, currentBestLocation)), _maxBy = maxBy(upgradeValuations, "profit"), highestValueUpgrade = _maxBy.upgrade, profitFromBestUpgrade = _maxBy.profit;
  if (profitFromBestUpgrade > currentExpectedProfit) {
    var upgradeLocations = validLocations.filter(function(location) {
      var _AutumnAton$getUnique3;
      return ((_AutumnAton$getUnique3 = AutumnAton_exports.getUniques(location)) === null || _AutumnAton$getUnique3 === void 0 ? void 0 : _AutumnAton$getUnique3.upgrade) === highestValueUpgrade;
    });
    return upgradeLocations;
  } else
    return validLocations;
}

// src/resources/cleaver.ts
init_kolmafia_polyfill();
var import_kolmafia35 = require("kolmafia");
var _templateObject150, _templateObject241, _templateObject338, _templateObject426, _templateObject521, _templateObject619, _templateObject716, _templateObject816;
function _toConsumableArray16(arr) {
  return _arrayWithoutHoles16(arr) || _iterableToArray16(arr) || _unsupportedIterableToArray23(arr) || _nonIterableSpread16();
}
function _nonIterableSpread16() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray23(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray23(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray23(o, minLen);
  }
}
function _iterableToArray16(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles16(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray23(arr);
}
function _arrayLikeToArray23(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral22(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var juneCleaverChoiceValues = {
  1467: {
    1: 0,
    2: 0,
    3: 5 * get("valueOfAdventure")
  },
  1468: {
    1: 0,
    2: 5,
    3: 0
  },
  1469: {
    1: 0,
    2: $item(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral22(["Dad's brandy"]))),
    3: 1500
  },
  1470: {
    1: 0,
    2: $item(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral22(["teacher's pen"]))),
    3: 0
  },
  1471: {
    1: $item(_templateObject338 || (_templateObject338 = _taggedTemplateLiteral22(["savings bond"]))),
    2: 250,
    3: 0
  },
  1472: {
    1: $item(_templateObject426 || (_templateObject426 = _taggedTemplateLiteral22(["trampled ticket stub"]))),
    2: $item(_templateObject521 || (_templateObject521 = _taggedTemplateLiteral22(["fire-roasted lake trout"]))),
    3: 0
  },
  1473: {
    1: $item(_templateObject619 || (_templateObject619 = _taggedTemplateLiteral22(["gob of wet hair"]))),
    2: 0,
    3: 0
  },
  1474: {
    1: 0,
    2: $item(_templateObject716 || (_templateObject716 = _taggedTemplateLiteral22(["guilty sprout"]))),
    3: 0
  },
  1475: {
    1: $item(_templateObject816 || (_templateObject816 = _taggedTemplateLiteral22(["mother's necklace"]))),
    2: 0,
    3: 0
  }
};
function valueJuneCleaverOption(result) {
  return result instanceof import_kolmafia35.Item ? getSaleValue(result) : result;
}
function bestJuneCleaverOption(id) {
  var options = [1, 2, 3];
  return maxBy(options, function(option) {
    return valueJuneCleaverOption(juneCleaverChoiceValues[id][option]);
  });
}
var juneCleaverSkipChoices;
function getJuneCleaverskipChoices() {
  return JuneCleaver_exports.skipsRemaining() > 0 ? (juneCleaverSkipChoices || (juneCleaverSkipChoices = _toConsumableArray16(JuneCleaver_exports.choices).sort(function(a, b) {
    return valueJuneCleaverOption(juneCleaverChoiceValues[a][bestJuneCleaverOption(a)]) - valueJuneCleaverOption(juneCleaverChoiceValues[b][bestJuneCleaverOption(b)]);
  }).splice(0, 3)), _toConsumableArray16(juneCleaverSkipChoices)) : [];
}
var juneCleaverChoices = Object.fromEntries(JuneCleaver_exports.choices.map(function(choice) {
  return [choice, function() {
    return getJuneCleaverskipChoices().includes(choice) ? 4 : bestJuneCleaverOption(choice);
  }];
})), choiceAdventuresValue;
function juneCleaverBonusEquip() {
  var _choiceAdventuresValu;
  return !JuneCleaver_exports.have() || (0, import_kolmafia35.myAdventures)() < get("_juneCleaverFightsLeft") ? /* @__PURE__ */ new Map() : ((_choiceAdventuresValu = choiceAdventuresValue) !== null && _choiceAdventuresValu !== void 0 || (choiceAdventuresValue = sum(_toConsumableArray16(JuneCleaver_exports.choices), function(choice) {
    return valueJuneCleaverOption(juneCleaverChoiceValues[choice][bestJuneCleaverOption(choice)]);
  }) / JuneCleaver_exports.choices.length), /* @__PURE__ */ new Map([[JuneCleaver_exports.cleaver, choiceAdventuresValue / JuneCleaver_exports.getInterval()]]));
}

// src/resources/cmc.ts
init_kolmafia_polyfill();
var import_kolmafia36 = require("kolmafia");
function coldMedicineCabinet() {
  for (var options = (0, import_kolmafia36.visitUrl)("campground.php?action=workshed"), i = 0, match, regexp = /descitem\((\d+)\)/g, itemChoices = /* @__PURE__ */ new Map(); (match = regexp.exec(options)) !== null; ) {
    i++;
    var item6 = (0, import_kolmafia36.descToItem)(match[1]);
    itemChoices.set(item6, i);
  }
  var bestItem = Array.from(itemChoices.keys()).map(function(i2) {
    return [i2, getSaleValue(i2)];
  }).sort(function(a, b) {
    return b[1] - a[1];
  })[0][0], bestChoice = itemChoices.get(bestItem);
  bestChoice && bestChoice > 0 && ((0, import_kolmafia36.visitUrl)("campground.php?action=workshed"), (0, import_kolmafia36.runChoice)(bestChoice));
}

// src/resources/pantsgiving.ts
init_kolmafia_polyfill();
var import_kolmafia37 = require("kolmafia");
var _templateObject151, _templateObject249, _templateObject339, _templateObject427, _templateObject526, _templateObject620, _templateObject717, _templateObject817, _templateObject916, _templateObject1013, _templateObject1112, _templateObject1211, _templateObject1311, _templateObject1410, _templateObject159;
function _taggedTemplateLiteral23(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var pantsgivingFoods = [{
  food: $item(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral23(["glass of raw eggs"]))),
  costOverride: function() {
    return 0;
  },
  canGet: function() {
    return have($item(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral23(["glass of raw eggs"]))));
  }
}, {
  food: $item(_templateObject339 || (_templateObject339 = _taggedTemplateLiteral23(["Affirmation Cookie"]))),
  canGet: function() {
    return !0;
  }
}, {
  food: $item(_templateObject427 || (_templateObject427 = _taggedTemplateLiteral23(["disco biscuit"]))),
  canGet: function() {
    return !0;
  }
}, {
  food: $item(_templateObject526 || (_templateObject526 = _taggedTemplateLiteral23(["ice rice"]))),
  canGet: function() {
    return !0;
  }
}, {
  food: $item(_templateObject620 || (_templateObject620 = _taggedTemplateLiteral23(["Tea, Earl Grey, Hot"]))),
  canGet: function() {
    return !0;
  }
}, {
  food: $item(_templateObject717 || (_templateObject717 = _taggedTemplateLiteral23(["Dreadsylvanian stew"]))),
  costOverride: function() {
    return 10 / 20 * Math.max(getSaleValue($item(_templateObject817 || (_templateObject817 = _taggedTemplateLiteral23(["electric Kool-Aid"])))), getSaleValue($item(_templateObject916 || (_templateObject916 = _taggedTemplateLiteral23(["bottle of Bloodweiser"])))));
  },
  canGet: function() {
    return have($item(_templateObject1013 || (_templateObject1013 = _taggedTemplateLiteral23(["Freddy Kruegerand"]))), 10) && (0, import_kolmafia37.isAccessible)($coinmaster(_templateObject1112 || (_templateObject1112 = _taggedTemplateLiteral23(["The Terrified Eagle Inn"])))) && (0, import_kolmafia37.myLevel)() >= 20;
  }
}, {
  food: $item(_templateObject1211 || (_templateObject1211 = _taggedTemplateLiteral23(["FantasyRealm turkey leg"]))),
  costOverride: function() {
    return 0;
  },
  canGet: function() {
    return !have($item(_templateObject1311 || (_templateObject1311 = _taggedTemplateLiteral23(["Rubee\u2122"]))), 100) || !get("_frToday") && !get("frAlways") ? !1 : have($item(_templateObject1410 || (_templateObject1410 = _taggedTemplateLiteral23(["FantasyRealm G. E. M."])))) ? !0 : ((0, import_kolmafia37.visitUrl)("place.php?whichplace=realm_fantasy&action=fr_initcenter"), (0, import_kolmafia37.runChoice)(1), have($item(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral23(["FantasyRealm G. E. M."])))));
  }
}], bestPantsgivingFood;
function getBestPantsgivingFood() {
  if (!bestPantsgivingFood) {
    var options = pantsgivingFoods.filter(function(_ref) {
      var canGet = _ref.canGet;
      return canGet();
    });
    options.length || (0, import_kolmafia37.abort)("No available pantsgiving foods--this should never happen!"), bestPantsgivingFood = maxBy(options, function(_ref2) {
      var _costOverride, food = _ref2.food, costOverride = _ref2.costOverride;
      return (_costOverride = costOverride == null ? void 0 : costOverride()) !== null && _costOverride !== void 0 ? _costOverride : (0, import_kolmafia37.mallPrice)(food);
    }, !0);
  }
  return bestPantsgivingFood;
}

// src/resources/trainrealm.ts
init_kolmafia_polyfill();
var _templateObject160, _templateObject250, _templateObject340, _templateObject428, _templateObject527, _templateObject621, _templateObject718, _templateObject818, _templateObject917, _templateObject1014, _templateObject1113, _templateObject1212, _templateObject1312, _templateObject1411, _templateObject1510, _templateObject169, _templateObject179, _templateObject189, _templateObject199, _templateObject209, _templateObject2113, _templateObject2211, _templateObject2310, _templateObject2410, _templateObject259, _templateObject269, _templateObject279, _templateObject288, _templateObject298, _templateObject308, _templateObject3113, _templateObject3210, _templateObject3310, _templateObject347, _templateObject356, _templateObject366, _templateObject376, _templateObject386, _templateObject396, _templateObject406, _templateObject4112, _templateObject429, _templateObject436, _templateObject446, _templateObject456, _templateObject466, _templateObject476, _templateObject486, _templateObject496;
function _toConsumableArray17(arr) {
  return _arrayWithoutHoles17(arr) || _iterableToArray17(arr) || _unsupportedIterableToArray24(arr) || _nonIterableSpread17();
}
function _nonIterableSpread17() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray24(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray24(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray24(o, minLen);
  }
}
function _iterableToArray17(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles17(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray24(arr);
}
function _arrayLikeToArray24(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _taggedTemplateLiteral24(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
var TRAIN_CANDIES = [$item(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral24(["cotton candy bale"]))), $item(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral24(["cotton candy cone"]))), $item(_templateObject340 || (_templateObject340 = _taggedTemplateLiteral24(["cotton candy pillow"]))), $item(_templateObject428 || (_templateObject428 = _taggedTemplateLiteral24(["cotton candy pinch"]))), $item(_templateObject527 || (_templateObject527 = _taggedTemplateLiteral24(["cotton candy plug"]))), $item(_templateObject621 || (_templateObject621 = _taggedTemplateLiteral24(["cotton candy skoshe"]))), $item(_templateObject718 || (_templateObject718 = _taggedTemplateLiteral24(["cotton candy smidgen"]))), $item(_templateObject818 || (_templateObject818 = _taggedTemplateLiteral24(["crazy little Turkish delight"]))), $item(_templateObject917 || (_templateObject917 = _taggedTemplateLiteral24(["Daffy Taffy"]))), $item(_templateObject1014 || (_templateObject1014 = _taggedTemplateLiteral24(["Elvish delight"]))), $item(_templateObject1113 || (_templateObject1113 = _taggedTemplateLiteral24(["explosion-flavored chewing gum"]))), $item(_templateObject1212 || (_templateObject1212 = _taggedTemplateLiteral24(["green candy heart"]))), $item(_templateObject1312 || (_templateObject1312 = _taggedTemplateLiteral24(["green gummi ingot"]))), $item(_templateObject1411 || (_templateObject1411 = _taggedTemplateLiteral24(["gummi canary"]))), $item(_templateObject1510 || (_templateObject1510 = _taggedTemplateLiteral24(["gummi salamander"]))), $item(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral24(["gummi snake"]))), $item(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral24(["Gummi-Gnauga"]))), $item(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral24(["honey stick"]))), $item(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral24(["honey-dipped locust"]))), $item(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral24(["jaba\xF1ero-flavored chewing gum"]))), $item(_templateObject2113 || (_templateObject2113 = _taggedTemplateLiteral24(["lavender candy heart"]))), $item(_templateObject2211 || (_templateObject2211 = _taggedTemplateLiteral24(["lime-and-chile-flavored chewing gum"]))), $item(_templateObject2310 || (_templateObject2310 = _taggedTemplateLiteral24(["marzipan skull"]))), $item(_templateObject2410 || (_templateObject2410 = _taggedTemplateLiteral24(["Mr. Mediocrebar"]))), $item(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral24(["orange candy heart"]))), $item(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral24(["pack of chewing gum"]))), $item(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral24(["pickle-flavored chewing gum"]))), $item(_templateObject288 || (_templateObject288 = _taggedTemplateLiteral24(["Piddles"]))), $item(_templateObject298 || (_templateObject298 = _taggedTemplateLiteral24(["pile of candy"]))), $item(_templateObject308 || (_templateObject308 = _taggedTemplateLiteral24(["pink candy heart"]))), $item(_templateObject3113 || (_templateObject3113 = _taggedTemplateLiteral24(["pixellated candy heart"]))), $item(_templateObject3210 || (_templateObject3210 = _taggedTemplateLiteral24(["Polka Pop"]))), $item(_templateObject3310 || (_templateObject3310 = _taggedTemplateLiteral24(["red gummi ingot"]))), $item(_templateObject347 || (_templateObject347 = _taggedTemplateLiteral24(["Rock Pops"]))), $item(_templateObject356 || (_templateObject356 = _taggedTemplateLiteral24(["Senior Mints"]))), $item(_templateObject366 || (_templateObject366 = _taggedTemplateLiteral24(["Steal This Candy"]))), $item(_templateObject376 || (_templateObject376 = _taggedTemplateLiteral24(["Sugar Cog"]))), $item(_templateObject386 || (_templateObject386 = _taggedTemplateLiteral24(["sugar shard"]))), $item(_templateObject396 || (_templateObject396 = _taggedTemplateLiteral24(["tamarind-flavored chewing gum"]))), $item(_templateObject406 || (_templateObject406 = _taggedTemplateLiteral24(["Tasty Fun Good rice candy"]))), $item(_templateObject4112 || (_templateObject4112 = _taggedTemplateLiteral24(["white candy heart"]))), $item(_templateObject429 || (_templateObject429 = _taggedTemplateLiteral24(["white chocolate chips"]))), $item(_templateObject436 || (_templateObject436 = _taggedTemplateLiteral24(["Wint-O-Fresh mint"]))), $item(_templateObject446 || (_templateObject446 = _taggedTemplateLiteral24(["yellow candy heart"]))), $item(_templateObject456 || (_templateObject456 = _taggedTemplateLiteral24(["yellow gummi ingot"]))), $item(_templateObject466 || (_templateObject466 = _taggedTemplateLiteral24(["Yummy Tummy bean"])))];
function candyFactoryValue() {
  var lastCalculated = get("garbo_candyFactoryValueDate", 0);
  if (!get("garbo_candyFactoryValue", 0) || today - lastCalculated > 7 * 24 * 60 * 60 * 1e3) {
    var averageDropValue = getHistoricalSaleValue.apply(void 0, TRAIN_CANDIES);
    _set("garbo_candyFactoryValue", averageDropValue), _set("garbo_candyFactoryValueDate", today);
  }
  return get("garbo_candyFactoryValue", 0);
}
var GOOD_TRAIN_STATIONS = [{
  piece: TrainSet_exports.Station.GAIN_MEAT,
  value: function() {
    return 900;
  }
}, {
  // Some day this'll be better
  piece: TrainSet_exports.Station.TRACKSIDE_DINER,
  value: function() {
    return getSaleValue.apply(void 0, _toConsumableArray17($items(_templateObject476 || (_templateObject476 = _taggedTemplateLiteral24(["bowl of cottage cheese, hot buttered roll, toast"])))));
  }
}, {
  piece: TrainSet_exports.Station.CANDY_FACTORY,
  value: candyFactoryValue
}, {
  piece: TrainSet_exports.Station.GRAIN_SILO,
  value: function() {
    return 2 * getSaleValue.apply(void 0, _toConsumableArray17($items(_templateObject486 || (_templateObject486 = _taggedTemplateLiteral24(["bottle of gin, bottle of vodka, bottle of whiskey, bottle of rum, bottle of tequila, boxed wine"])))));
  }
}, {
  piece: TrainSet_exports.Station.ORE_HOPPER,
  value: function() {
    return getSaleValue.apply(void 0, _toConsumableArray17($items(_templateObject496 || (_templateObject496 = _taggedTemplateLiteral24(["linoleum ore, asbestos ore, chrome ore, teflon ore, vinyl ore, velcro ore, bubblewrap ore, cardboard ore, styrofoam ore"])))));
  }
}], trainCycle;
function getBestCycle() {
  if (!trainCycle) {
    var cycle2 = [TrainSet_exports.Station.COAL_HOPPER].concat(_toConsumableArray17(GOOD_TRAIN_STATIONS.sort(function(_ref, _ref2) {
      var a = _ref.value, b = _ref2.value;
      return b() - a();
    }).map(function(_ref3) {
      var piece = _ref3.piece;
      return piece;
    })), [TrainSet_exports.Station.TOWER_FIZZY, TrainSet_exports.Station.VIEWING_PLATFORM]);
    trainCycle = cycle2;
  }
  return _toConsumableArray17(trainCycle);
}
function valueStation(station) {
  var _GOOD_TRAIN_STATIONS$, _GOOD_TRAIN_STATIONS$2;
  return station === TrainSet_exports.Station.COAL_HOPPER ? valueStation(getBestCycle()[1]) : (_GOOD_TRAIN_STATIONS$ = (_GOOD_TRAIN_STATIONS$2 = GOOD_TRAIN_STATIONS.find(function(_ref4) {
    var piece = _ref4.piece;
    return piece === station;
  })) === null || _GOOD_TRAIN_STATIONS$2 === void 0 ? void 0 : _GOOD_TRAIN_STATIONS$2.value()) !== null && _GOOD_TRAIN_STATIONS$ !== void 0 ? _GOOD_TRAIN_STATIONS$ : 0;
}
function valueOffset(offset) {
  var firstFortyTurns = 5 * sum(getBestCycle(), valueStation), extraTurns = sum(getBestCycle().slice(0, offset - 1), valueStation);
  return (firstFortyTurns + extraTurns) / (40 + offset);
}
var bestOffset = null;
function getBestOffset() {
  var _bestOffset;
  return (_bestOffset = bestOffset) !== null && _bestOffset !== void 0 ? _bestOffset : bestOffset = maxBy([2, 3, 4, 5, 6, 7, 8], valueOffset);
}
function getPrioritizedStations() {
  return getBestCycle().slice(0, getBestOffset() - 1);
}
function getRotatedCycle() {
  for (var offset = get("trainsetPosition") % 8, newPieces = [], defaultPieces = getBestCycle(), i = 0; i < 8; i++) {
    var newPos = (i + offset) % 8;
    newPieces[newPos] = defaultPieces[i];
  }
  return newPieces;
}
function rotateTrainToOptimalCycle() {
  return TrainSet_exports.setConfiguration(getRotatedCycle());
}
function willRotateTrainset() {
  return TrainSet_exports.canConfigure() && (!get("trainsetConfiguration") || !getPrioritizedStations().includes(TrainSet_exports.next()) && !arrayEquals(getRotatedCycle(), TrainSet_exports.cycle()));
}

// src/outfit.ts
init_kolmafia_polyfill();
var import_kolmafia38 = require("kolmafia");
var _templateObject161, _templateObject251, _templateObject341, _templateObject430, _templateObject528, _templateObject625, _templateObject719, _templateObject819, _templateObject918, _templateObject1015, _templateObject1114, _templateObject1213, _templateObject1313, _templateObject1412, _templateObject1511, _templateObject1610, _templateObject1710, _templateObject1810, _templateObject1910, _templateObject2010, _templateObject2114, _templateObject2212, _templateObject2311, _templateObject2411, _templateObject2510, _templateObject2610, _templateObject2710, _templateObject289, _templateObject299, _templateObject309, _templateObject3114, _templateObject3211, _templateObject3311, _templateObject348, _templateObject357, _templateObject367, _templateObject377, _templateObject387, _templateObject397, _templateObject407, _templateObject4113, _templateObject4210, _templateObject437, _templateObject447, _templateObject457, _templateObject467, _templateObject477, _templateObject487, _templateObject497, _templateObject506, _templateObject5111, _templateObject529, _templateObject535, _templateObject545, _templateObject555, _templateObject564, _templateObject574, _templateObject584, _templateObject594;
function _createForOfIteratorHelper15(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray25(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e2) {
        throw _e2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e3) {
    didErr = !0, err = _e3;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral25(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray18(arr) {
  return _arrayWithoutHoles18(arr) || _iterableToArray18(arr) || _unsupportedIterableToArray25(arr) || _nonIterableSpread18();
}
function _nonIterableSpread18() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray18(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles18(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray25(arr);
}
function _slicedToArray12(arr, i) {
  return _arrayWithHoles12(arr) || _iterableToArrayLimit12(arr, i) || _unsupportedIterableToArray25(arr, i) || _nonIterableRest12();
}
function _nonIterableRest12() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray25(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray25(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray25(o, minLen);
  }
}
function _arrayLikeToArray25(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit12(arr, i) {
  var _i = arr == null ? null : typeof Symbol != "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _arr = [], _n = !0, _d = !1, _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), !(i && _arr.length === i)); _n = !0)
        ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        !_n && _i.return != null && _i.return();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles12(arr) {
  if (Array.isArray(arr))
    return arr;
}
function treatValue(outfit2) {
  return sum(Object.entries((0, import_kolmafia38.outfitTreats)(outfit2)), function(_ref) {
    var _ref2 = _slicedToArray12(_ref, 2), candyName = _ref2[0], probability = _ref2[1];
    return probability * getSaleValue((0, import_kolmafia38.toItem)(candyName));
  });
}
function dropsValueFunction(drops) {
  return Array.isArray(drops) ? getSaleValue.apply(void 0, _toConsumableArray18(drops)) : sum(_toConsumableArray18(drops.entries()), function(_ref3) {
    var _ref4 = _slicedToArray12(_ref3, 2), item6 = _ref4[0], quantity = _ref4[1];
    return quantity * getSaleValue(item6);
  }) / sumNumbers(_toConsumableArray18(drops.values()));
}
function ensureBjorn(weightValue) {
  var meatValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, key = "weight:".concat(weightValue.toFixed(3), ";meat:").concat(meatValue);
  CrownOfThrones_exports.hasRiderMode(key) || CrownOfThrones_exports.createRiderMode(key, {
    dropsValueFunction: dropsValueFunction,
    modifierValueFunction: CrownOfThrones_exports.createModifierValueFunction(["Familiar Weight", "Meat Drop"], {
      "Familiar Weight": function(x) {
        return weightValue * x;
      },
      "Meat Drop": function(x) {
        return meatValue * x;
      }
    })
  });
  var result = CrownOfThrones_exports.pickRider(key);
  return result || (0, import_kolmafia38.abort)("Failed to make sensible bjorn decision!"), result;
}
function getTreatOutfit() {
  if (!args_default.treatOutfit) {
    var availableOutfits = (0, import_kolmafia38.getOutfits)().filter(function(name) {
      return (0, import_kolmafia38.outfitPieces)(name).every(function(piece) {
        return (0, import_kolmafia38.canEquip)(piece);
      });
    });
    printError("No treatOutfit given--doing some math to decide what to use"), availableOutfits.length || (0, import_kolmafia38.abort)("You don't seem to actually have any outfits available, my friend!"), args_default.treatOutfit = maxBy(availableOutfits, treatValue), printHighlight("We have a winner! We'll be trick-or-treating with ".concat(args_default.treatOutfit, "."));
  }
  return args_default.treatOutfit;
}
var _baseAdventureValue;
function baseAdventureValue() {
  if (!_baseAdventureValue) {
    var outfitCandyValue = treatValue(getTreatOutfit()), totOutfitCandyMultiplier = have($familiar(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral25(["Trick-or-Treating Tot"])))) ? 1.6 : 1, bowlValue = 1 / 5 * getSaleValue($item(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral25(["huge bowl of candy"])))), prunetsValue = have($familiar(_templateObject341 || (_templateObject341 = _taggedTemplateLiteral25(["Trick-or-Treating Tot"])))) ? 4 * 0.2 * getSaleValue($item(_templateObject430 || (_templateObject430 = _taggedTemplateLiteral25(["Prunets"])))) : 0, outfitCandyTotal = 3 * outfitCandyValue * totOutfitCandyMultiplier;
    _baseAdventureValue = 1 / 5 * (outfitCandyTotal + bowlValue + prunetsValue);
  }
  return _baseAdventureValue;
}
function snowSuit() {
  return !have($item(_templateObject528 || (_templateObject528 = _taggedTemplateLiteral25(["Snow Suit"])))) || get("_carrotNoseDrops") >= 3 ? /* @__PURE__ */ new Map([]) : /* @__PURE__ */ new Map([[$item(_templateObject625 || (_templateObject625 = _taggedTemplateLiteral25(["Snow Suit"]))), getSaleValue($item(_templateObject719 || (_templateObject719 = _taggedTemplateLiteral25(["carrot nose"])))) / 10]]);
}
function mayflowerBouquet() {
  if (!have($item(_templateObject819 || (_templateObject819 = _taggedTemplateLiteral25(["Mayflower bouquet"])))) || get("_mayflowerDrops") >= 10)
    return /* @__PURE__ */ new Map([]);
  var averageFlowerValue = getSaleValue.apply(void 0, _toConsumableArray18($items(_templateObject918 || (_templateObject918 = _taggedTemplateLiteral25(["tin magnolia, upsy daisy, lesser grodulated violet, half-orchid, begpwnia"]))))) * Math.max(0.01, 0.5 - get("_mayflowerDrops") * 0.11);
  return /* @__PURE__ */ new Map([[$item(_templateObject1015 || (_templateObject1015 = _taggedTemplateLiteral25(["Mayflower bouquet"]))), averageFlowerValue]]);
}
function sweatpants() {
  if (!have($item(_templateObject1114 || (_templateObject1114 = _taggedTemplateLiteral25(["designer sweatpants"])))))
    return /* @__PURE__ */ new Map();
  var needSweat = get("sweat") < 25 * (3 - get("_sweatOutSomeBoozeUsed"));
  if (!needSweat)
    return /* @__PURE__ */ new Map();
  var VOA = get("valueOfAdventure"), bestPerfectDrink = maxBy($items(_templateObject1213 || (_templateObject1213 = _taggedTemplateLiteral25(["perfect cosmopolitan, perfect negroni, perfect dark and stormy, perfect mimosa, perfect old-fashioned, perfect paloma"]))), import_kolmafia38.mallPrice, !0), perfectDrinkValuePerDrunk = (getAverageAdventures(bestPerfectDrink) * VOA - (0, import_kolmafia38.mallPrice)(bestPerfectDrink)) / 3, splendidMartiniValuePerDrunk = (getAverageAdventures($item(_templateObject1313 || (_templateObject1313 = _taggedTemplateLiteral25(["splendid martini"])))) + 2) * VOA - (0, import_kolmafia38.mallPrice)($item(_templateObject1412 || (_templateObject1412 = _taggedTemplateLiteral25(["splendid martini"])))), bonus = Math.max(perfectDrinkValuePerDrunk, splendidMartiniValuePerDrunk) * 2 / 25;
  return /* @__PURE__ */ new Map([[$item(_templateObject1511 || (_templateObject1511 = _taggedTemplateLiteral25(["designer sweatpants"]))), bonus]]);
}
function pantogram() {
  return !have($item(_templateObject1610 || (_templateObject1610 = _taggedTemplateLiteral25(["pantogram pants"])))) || !get("_pantogramModifier").includes("Drops Items") ? /* @__PURE__ */ new Map() : /* @__PURE__ */ new Map([[$item(_templateObject1710 || (_templateObject1710 = _taggedTemplateLiteral25(["pantogram pants"]))), 100]]);
}
function reallyEasyBonuses() {
  return new Map([[$item(_templateObject1810 || (_templateObject1810 = _taggedTemplateLiteral25(["lucky gold ring"]))), 400], [$item(_templateObject1910 || (_templateObject1910 = _taggedTemplateLiteral25(["Mr. Cheeng's spectacles"]))), 250], [$item(_templateObject2010 || (_templateObject2010 = _taggedTemplateLiteral25(["Mr. Screege's spectacles"]))), 180]].filter(function(_ref5) {
    var _ref6 = _slicedToArray12(_ref5, 1), item6 = _ref6[0];
    return have(item6);
  }));
}
function easyBonuses() {
  return new Map([].concat(_toConsumableArray18(reallyEasyBonuses()), _toConsumableArray18(juneCleaverBonusEquip()), _toConsumableArray18(snowSuit()), _toConsumableArray18(mayflowerBouquet()), _toConsumableArray18(sweatpants()), _toConsumableArray18(pantogram())));
}
var estimatedOutfitWeight;
function getEstimatedOutfitWeight() {
  if (!estimatedOutfitWeight) {
    var bonuses = easyBonuses(), freeAccessories = 3 - clamp(_toConsumableArray18(easyBonuses().keys()).length, 0, 3), openSlots = [].concat(_toConsumableArray18($slots(_templateObject2114 || (_templateObject2114 = _taggedTemplateLiteral25(["shirt, weapon, off-hand"])))), _toConsumableArray18(have($item(_templateObject2212 || (_templateObject2212 = _taggedTemplateLiteral25(["Buddy Bjorn"])))) ? [] : $slots(_templateObject2311 || (_templateObject2311 = _taggedTemplateLiteral25(["back"])))), _toConsumableArray18(bonuses.has($item(_templateObject2411 || (_templateObject2411 = _taggedTemplateLiteral25(["pantogram pants"])))) ? [] : $slots(_templateObject2510 || (_templateObject2510 = _taggedTemplateLiteral25(["pants"]))))), viableItems = import_kolmafia38.Item.all().filter(function(item6) {
      return have(item6) && (openSlots.includes((0, import_kolmafia38.toSlot)(item6)) || (0, import_kolmafia38.toSlot)(item6) === $slot(_templateObject2610 || (_templateObject2610 = _taggedTemplateLiteral25(["acc1"]))) && freeAccessories > 0);
    }), nonAccessoryWeightEquips = openSlots.map(function(slot) {
      return maxBy(viableItems.filter(function(item6) {
        return (0, import_kolmafia38.toSlot)(item6) === slot;
      }), function(item6) {
        return (0, import_kolmafia38.numericModifier)(item6, "Familiar Weight");
      });
    }), accessoryWeightEquips = freeAccessories ? viableItems.filter(function(item6) {
      return (0, import_kolmafia38.toSlot)(item6) === $slot(_templateObject2710 || (_templateObject2710 = _taggedTemplateLiteral25(["acc1"])));
    }).sort(function(a, b) {
      return (0, import_kolmafia38.numericModifier)(b, "Familiar Weight") - (0, import_kolmafia38.numericModifier)(a, "Familiar Weight");
    }).splice(0, freeAccessories) : [];
    estimatedOutfitWeight = sum([].concat(_toConsumableArray18(accessoryWeightEquips), _toConsumableArray18(nonAccessoryWeightEquips)), function(item6) {
      return (0, import_kolmafia38.numericModifier)(item6, "Familiar Weight");
    }) + (have($familiar(_templateObject289 || (_templateObject289 = _taggedTemplateLiteral25(["Temporal Riftlet"])))) ? 10 : 0) + (have($skill(_templateObject299 || (_templateObject299 = _taggedTemplateLiteral25(["Amphibian Sympathy"])))) ? 5 : 0);
  }
  return estimatedOutfitWeight;
}
var effectWeight;
function getEffectWeight() {
  return effectWeight || (effectWeight = sum(Object.entries((0, import_kolmafia38.myEffects)()).map(function(_ref7) {
    var _ref8 = _slicedToArray12(_ref7, 2), name = _ref8[0], duration = _ref8[1];
    return {
      effect: (0, import_kolmafia38.toEffect)(name),
      duration: duration
    };
  }).filter(function(_ref9) {
    var effect2 = _ref9.effect, duration = _ref9.duration;
    return (0, import_kolmafia38.numericModifier)(effect2, "Familiar Weight") && duration >= (0, import_kolmafia38.myAdventures)();
  }), function(_ref10) {
    var effect2 = _ref10.effect;
    return (0, import_kolmafia38.numericModifier)(effect2, "Familiar Weight");
  })), effectWeight;
}
function overallAdventureValue() {
  var _bjornChoice$dropPred, _bjornChoice$dropPred2, bonuses = easyBonuses(), bjornChoice = ensureBjorn(0), bjornValue = bjornChoice && (!((_bjornChoice$dropPred = (_bjornChoice$dropPred2 = bjornChoice.dropPredicate) === null || _bjornChoice$dropPred2 === void 0 ? void 0 : _bjornChoice$dropPred2.call(bjornChoice)) !== null && _bjornChoice$dropPred !== void 0) || _bjornChoice$dropPred) ? bjornChoice.probability * (typeof bjornChoice.drops == "number" ? bjornChoice.drops : dropsValueFunction(bjornChoice.drops)) : 0, itemAndMeatValue = sum(import_kolmafia38.Slot.all(), function(slot) {
    var _bonuses$get;
    return (_bonuses$get = bonuses.get((0, import_kolmafia38.equippedItem)(slot))) !== null && _bonuses$get !== void 0 ? _bonuses$get : 0;
  }) + baseAdventureValue() + ((0, import_kolmafia38.haveEquipped)($item(_templateObject309 || (_templateObject309 = _taggedTemplateLiteral25(["Buddy Bjorn"])))) || (0, import_kolmafia38.haveEquipped)($item(_templateObject3114 || (_templateObject3114 = _taggedTemplateLiteral25(["Crown of Thrones"])))) ? bjornValue : 0), stasisData = stasisFamiliars.get(args_default.familiar);
  return stasisData ? itemAndMeatValue + (20 + getEstimatedOutfitWeight() + getEffectWeight()) * stasisData.meatPerLb * clamp(stasisData.baseRate + actionRateBonus(), 0, 1) : adventureFamiliars.includes(args_default.familiar) ? itemAndMeatValue * 1e3 / (1e3 - getEffectWeight() - getEstimatedOutfitWeight() - 20) : itemAndMeatValue;
}
function pantsgiving() {
  var _turnArray$index, _costOverride;
  if (!have($item(_templateObject3211 || (_templateObject3211 = _taggedTemplateLiteral25(["Pantsgiving"])))))
    return /* @__PURE__ */ new Map();
  var count = get("_pantsgivingCount"), turnArray = [5, 50, 500, 5e3], index = (0, import_kolmafia38.myFullness)() === (0, import_kolmafia38.fullnessLimit)() ? get("_pantsgivingFullness") : turnArray.findIndex(function(x) {
    return count < x;
  }), turns = (_turnArray$index = turnArray[index]) !== null && _turnArray$index !== void 0 ? _turnArray$index : 5e4;
  if (turns - count > (0, import_kolmafia38.myAdventures)())
    return /* @__PURE__ */ new Map();
  var _getBestPantsgivingFo = getBestPantsgivingFood(), food = _getBestPantsgivingFo.food, costOverride = _getBestPantsgivingFo.costOverride, fullnessValue = overallAdventureValue() * (getAverageAdventures(food) + 1 + (get("_fudgeSporkUsed") ? 3 : 0)) - ((_costOverride = costOverride == null ? void 0 : costOverride()) !== null && _costOverride !== void 0 ? _costOverride : (0, import_kolmafia38.mallPrice)(food)) - (0, import_kolmafia38.mallPrice)($item(_templateObject3311 || (_templateObject3311 = _taggedTemplateLiteral25(["Special Seasoning"])))) - (get("_fudgeSporkUsed") ? (0, import_kolmafia38.mallPrice)($item(_templateObject348 || (_templateObject348 = _taggedTemplateLiteral25(["fudge spork"])))) : 0), pantsgivingBonus = fullnessValue / (turns * 0.9);
  return /* @__PURE__ */ new Map([[$item(_templateObject357 || (_templateObject357 = _taggedTemplateLiteral25(["Pantsgiving"]))), pantsgivingBonus]]);
}
function fullBonuses() {
  return new Map([].concat(_toConsumableArray18(easyBonuses()), _toConsumableArray18(pantsgiving())));
}
function treatOutfit() {
  var outfit2 = new Outfit(), pieces2 = (0, import_kolmafia38.outfitPieces)(getTreatOutfit()), _iterator = _createForOfIteratorHelper15(pieces2), _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var piece = _step.value;
      outfit2.equip(piece) || (0, import_kolmafia38.abort)("Could not equip all pieces of treat outfit: aborted on ".concat(piece));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return outfit2.equip($item(_templateObject367 || (_templateObject367 = _taggedTemplateLiteral25(["lucky Crimbo tiki necklace"])))), outfit2.equip($familiar(_templateObject377 || (_templateObject377 = _taggedTemplateLiteral25(["Trick-or-Treating Tot"])))), outfit2;
}
var adventureFamiliars = $familiars(_templateObject387 || (_templateObject387 = _taggedTemplateLiteral25(["Temporal Riftlet, Reagnimated Gnome"]))), MAGIC_NUMBER = 0.00123839009288, stasisFamiliars = /* @__PURE__ */ new Map([[$familiar(_templateObject397 || (_templateObject397 = _taggedTemplateLiteral25(["Ninja Pirate Zombie Robot"]))), {
  baseRate: 1 / 2,
  meatPerLb: 14.52
}], [$familiar(_templateObject407 || (_templateObject407 = _taggedTemplateLiteral25(["Cocoabo"]))), {
  baseRate: 1 / 3,
  meatPerLb: 13.2
}], [$familiar(_templateObject4113 || (_templateObject4113 = _taggedTemplateLiteral25(["Stocking Mimic"]))), {
  baseRate: 1 / 3,
  meatPerLb: 13.2
}], [$familiar(_templateObject4210 || (_templateObject4210 = _taggedTemplateLiteral25(["Feather Boa Constrictor"]))), {
  baseRate: 1 / 3,
  meatPerLb: 27.5
}]]), actionRateBonus = function() {
  return (0, import_kolmafia38.numericModifier)("Familiar Action Bonus") / 100 + ($items(_templateObject437 || (_templateObject437 = _taggedTemplateLiteral25(["short stack of pancakes, short stick of butter, short glass of water"]))).map(function(item6) {
    return (0, import_kolmafia38.effectModifier)(item6, "Effect");
  }).some(function(effect2) {
    return have(effect2);
  }) ? 1 : 0);
};
function combatOutfit() {
  var base = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, outfit2 = Outfit.from(base, new Error("Failed to construct outfit from spec ".concat((0, import_kolmafia38.toJson)(base))));
  outfit2.equip(args_default.familiar), outfit2.familiar === $familiar(_templateObject447 || (_templateObject447 = _taggedTemplateLiteral25(["Reagnimated Gnome"]))) && outfit2.equip($item(_templateObject457 || (_templateObject457 = _taggedTemplateLiteral25(["gnomish housemaid's kgnee"])))), get("questPAGhost") === "unstarted" && get("nextParanormalActivity") <= (0, import_kolmafia38.totalTurnsPlayed)() && (0, import_kolmafia38.myInebriety)() <= (0, import_kolmafia38.inebrietyLimit)() && outfit2.equip($item(_templateObject467 || (_templateObject467 = _taggedTemplateLiteral25(["protonic accelerator pack"]))));
  var weightValue = 0;
  if (outfit2.familiar || (0, import_kolmafia38.abort)("It looks like we're about to go adventuring without a familiar, and that feels deeply wrong"), adventureFamiliars.includes(outfit2.familiar))
    weightValue = Math.round(MAGIC_NUMBER * baseAdventureValue() * 100) / 100;
  else {
    var stasisData = stasisFamiliars.get(outfit2.familiar);
    if (stasisData) {
      var actionRate = stasisData.baseRate + actionRateBonus();
      actionRate < 1 && getFoldGroup($item(_templateObject477 || (_templateObject477 = _taggedTemplateLiteral25(["Loathing Legion helicopter"])))).some(function(foldable) {
        return have(foldable);
      }) && outfit2.equip($item(_templateObject487 || (_templateObject487 = _taggedTemplateLiteral25(["Loathing Legion helicopter"]))));
      var fullRate = clamp(actionRate + (outfit2.haveEquipped($item(_templateObject497 || (_templateObject497 = _taggedTemplateLiteral25(["Loathing Legion helicopter"])))) ? 0.25 : 0), 0, 1);
      weightValue = fullRate * stasisData.meatPerLb;
    } else
      SongBoom_exports.song() === "Total Eclipse of Your Meat" ? outfit2.modifier.push("0.25 Meat Drop") : outfit2.modifier.push("0.01 Item Drop");
  }
  if (weightValue) {
    var rounded = Math.round(1e3 * weightValue) / 1e3;
    outfit2.modifier.push("".concat(rounded, " Familiar Weight"));
  }
  var bjornChoice = ensureBjorn(weightValue);
  return have($item(_templateObject506 || (_templateObject506 = _taggedTemplateLiteral25(["Buddy Bjorn"])))) ? (outfit2.equip($item(_templateObject5111 || (_templateObject5111 = _taggedTemplateLiteral25(["Buddy Bjorn"])))), outfit2.bjornify(bjornChoice.familiar)) : have($item(_templateObject529 || (_templateObject529 = _taggedTemplateLiteral25(["Crown of Thrones"])))) && (outfit2.equip($item(_templateObject535 || (_templateObject535 = _taggedTemplateLiteral25(["Crown of Thrones"])))), outfit2.enthrone(bjornChoice.familiar)), outfit2.bonuses = fullBonuses(), outfit2;
}
var askedAboutTwoPiece = !1, trickHats = $items(_templateObject545 || (_templateObject545 = _taggedTemplateLiteral25(["invisible bag, witch hat, beholed bedsheet, wolfman mask, pumpkinhead mask, mummy costume"]))), twoPieces = ["Eldritch Equipage", "Bugbear Costume", "Filthy Hippy Disguise"];
function trickOutfit() {
  if (args_default.trickOutfit) {
    var outfit2 = new Outfit();
    outfit2.equip(args_default.familiar);
    var _iterator2 = _createForOfIteratorHelper15((0, import_kolmafia38.outfitPieces)(args_default.trickOutfit)), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var piece = _step2.value;
        outfit2.equip(piece) || (0, import_kolmafia38.abort)("Failed to equip ".concat(piece, " from trick outfit ").concat(args_default.trickOutfit));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return outfit2;
  }
  trickHats.some(function(hat) {
    return have(hat);
  }) || (0, import_kolmafia38.buy)(1, maxBy(trickHats, import_kolmafia38.mallPrice, !0));
  var trickHat = trickHats.find(function(i) {
    return have(i);
  });
  if (!trickHat) {
    var twoPiece = twoPieces.find(function(outfit3) {
      return (0, import_kolmafia38.outfitPieces)(outfit3).every(function(i) {
        return have(i) && (0, import_kolmafia38.canEquip)(i);
      });
    });
    twoPiece || (0, import_kolmafia38.abort)("Unable to find a good 1-piece or 2-piece outfit for trick-or-treating"), !askedAboutTwoPiece && !(0, import_kolmafia38.userConfirm)("We don't have access to a one-piece outfit, but we did find a two-piece outfit. Is that alright?") ? (printError("We cannot create a good trick outfit, and must give up."), (0, import_kolmafia38.abort)()) : askedAboutTwoPiece = !0;
    var _outfit = new Outfit(), _iterator3 = _createForOfIteratorHelper15((0, import_kolmafia38.outfitPieces)(twoPiece)), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var _piece = _step3.value;
        _outfit.equip(_piece) || (0, import_kolmafia38.abort)("Unable to equip ".concat(_piece, " from ").concat(twoPiece, "!"));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return combatOutfit(_outfit.spec());
  }
  return combatOutfit({
    hat: trickHat
  });
}
function digitizeOutfit() {
  if (get("_sourceTerminalDigitizeMonster") === $monster(_templateObject555 || (_templateObject555 = _taggedTemplateLiteral25(["Knob Goblin Embezzler"])))) {
    var outfit2 = new Outfit(), meatFamiliar = maxBy(import_kolmafia38.Familiar.all().filter(function(f) {
      return have(f);
    }), findLeprechaunMultiplier);
    outfit2.equip(meatFamiliar);
    var baseMeat = 1e3 + (SongBoom_exports.song() === "Total Eclipse of Your Meat" ? 25 : 0), leprechaunMultiplier = findLeprechaunMultiplier(meatFamiliar), leprechaunCoefficient = baseMeat / 100 * (2 * leprechaunMultiplier + Math.sqrt(leprechaunMultiplier)), bjornChoice = ensureBjorn(leprechaunCoefficient, baseMeat / 100);
    return have($item(_templateObject564 || (_templateObject564 = _taggedTemplateLiteral25(["Buddy Bjorn"])))) ? (outfit2.equip($item(_templateObject574 || (_templateObject574 = _taggedTemplateLiteral25(["Buddy Bjorn"])))), outfit2.bjornify(bjornChoice.familiar)) : have($item(_templateObject584 || (_templateObject584 = _taggedTemplateLiteral25(["Crown of Thrones"])))) && (outfit2.equip($item(_templateObject594 || (_templateObject594 = _taggedTemplateLiteral25(["Crown of Thrones"])))), outfit2.enthrone(bjornChoice.familiar)), outfit2.modifier.push("".concat(baseMeat / 100, " Meat Drop")), outfit2.modifier.push("0.72 Item Drop"), outfit2.bonuses = fullBonuses(), outfit2;
  }
  return combatOutfit();
}

// src/combat.ts
init_kolmafia_polyfill();
var import_kolmafia39 = require("kolmafia");
var _templateObject170, _templateObject260, _templateObject349, _templateObject431, _templateObject530, _templateObject626, _templateObject720, _templateObject820, _templateObject919, _templateObject1016, _templateObject1115, _templateObject1214, _templateObject1314, _templateObject1413, _templateObject1512, _templateObject1611, _templateObject1711, _templateObject1811, _templateObject1911, _templateObject2011, _templateObject2115, _templateObject2213, _templateObject2312, _templateObject2412, _templateObject2511, _templateObject2611, _templateObject2711, _templateObject2810, _templateObject2910;
function _taggedTemplateLiteral26(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray19(arr) {
  return _arrayWithoutHoles19(arr) || _iterableToArray19(arr) || _unsupportedIterableToArray26(arr) || _nonIterableSpread19();
}
function _nonIterableSpread19() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray26(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray26(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray26(o, minLen);
  }
}
function _iterableToArray19(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles19(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray26(arr);
}
function _arrayLikeToArray26(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck15(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties12(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass12(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties12(Constructor.prototype, protoProps), staticProps && _defineProperties12(Constructor, staticProps), Constructor;
}
function _inherits5(subClass, superClass) {
  if (typeof superClass != "function" && superClass !== null)
    throw new TypeError("Super expression must either be null or a function");
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: !0, configurable: !0 } }), superClass && _setPrototypeOf5(subClass, superClass);
}
function _setPrototypeOf5(o, p) {
  return _setPrototypeOf5 = Object.setPrototypeOf || function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf5(o, p);
}
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else
      result = Super.apply(this, arguments);
    return _possibleConstructorReturn5(this, result);
  };
}
function _possibleConstructorReturn5(self, call) {
  if (call && (typeof call == "object" || typeof call == "function"))
    return call;
  if (call !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized5(self);
}
function _assertThisInitialized5(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch (e) {
    return !1;
  }
}
function _getPrototypeOf5(o) {
  return _getPrototypeOf5 = Object.setPrototypeOf ? Object.getPrototypeOf : function(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  }, _getPrototypeOf5(o);
}
var Macro2 = /* @__PURE__ */ function(_StrictMacro) {
  _inherits5(Macro3, _StrictMacro);
  var _super = _createSuper5(Macro3);
  function Macro3() {
    return _classCallCheck15(this, Macro3), _super.apply(this, arguments);
  }
  return _createClass12(Macro3, [{
    key: "tryHaveSkill",
    value: function(skill) {
      return skill ? this.externalIf(have(skill), Macro3.trySkill(skill)) : this;
    }
  }, {
    key: "tryHaveItem",
    value: function(item6) {
      return item6 ? this.externalIf(have(item6), Macro3.tryItem(item6)) : this;
    }
  }, {
    key: "try",
    value: function(actions) {
      return this.step.apply(this, _toConsumableArray19(actions.map(function(action) {
        return action instanceof import_kolmafia39.Item ? Macro3.tryHaveItem(action) : Macro3.tryHaveSkill(action);
      })));
    }
  }, {
    key: "stasisItem",
    value: function() {
      var _find, spammableItem = (_find = $items(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral26(["dictionary, facsimile dictionary, spices"]))).find(function(item6) {
        return have(item6);
      })) !== null && _find !== void 0 ? _find : $item(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral26(["seal tooth"])));
      return Macro3.item(spammableItem);
    }
  }, {
    key: "kill",
    value: function() {
      return this.if_("monstername *ghost", Macro3.externalIf(have($skill(_templateObject349 || (_templateObject349 = _taggedTemplateLiteral26(["Silent Treatment"])))), Macro3.skill($skill(_templateObject431 || (_templateObject431 = _taggedTemplateLiteral26(["Silent Treatment"])))).attack().repeat()).skill($skill(_templateObject530 || (_templateObject530 = _taggedTemplateLiteral26(["Saucegeyser"])))).repeat()).attack().repeat();
    }
  }, {
    key: "stasis",
    value: function() {
      return this.try([$skill(_templateObject626 || (_templateObject626 = _taggedTemplateLiteral26(["Curse of Weaksauce"]))), $skill(_templateObject720 || (_templateObject720 = _taggedTemplateLiteral26(["Micrometeorite"]))), $skill(_templateObject820 || (_templateObject820 = _taggedTemplateLiteral26(["Shadow Noodles"]))), $skill(_templateObject919 || (_templateObject919 = _taggedTemplateLiteral26(["Shell Up"]))), $item(_templateObject1016 || (_templateObject1016 = _taggedTemplateLiteral26(["Time-Spinner"]))), $item(_templateObject1115 || (_templateObject1115 = _taggedTemplateLiteral26(["little red book"]))), $item(_templateObject1214 || (_templateObject1214 = _taggedTemplateLiteral26(["nasty-smelling moss"]))), $item(_templateObject1314 || (_templateObject1314 = _taggedTemplateLiteral26(["HOA citation pad"]))), $item(_templateObject1413 || (_templateObject1413 = _taggedTemplateLiteral26(["Great Wolf's lice"]))), $item(_templateObject1512 || (_templateObject1512 = _taggedTemplateLiteral26(["Mayor Ghost's scissors"]))), $item(_templateObject1611 || (_templateObject1611 = _taggedTemplateLiteral26(["Rain-Doh indigo cup"]))), $item(_templateObject1711 || (_templateObject1711 = _taggedTemplateLiteral26(["porquoise-handled sixgun"]))), $skill(_templateObject1811 || (_templateObject1811 = _taggedTemplateLiteral26(["Summon Love Gnats"]))), $skill(_templateObject1911 || (_templateObject1911 = _taggedTemplateLiteral26(["Bowl Straight Up"]))), $skill(_templateObject2011 || (_templateObject2011 = _taggedTemplateLiteral26(["Sing Along"])))]).externalIf(SourceTerminal_exports.isCurrentSkill($skill(_templateObject2115 || (_templateObject2115 = _taggedTemplateLiteral26(["Extract"])))), Macro3.skill($skill(_templateObject2213 || (_templateObject2213 = _taggedTemplateLiteral26(["Extract"]))))).while_("!pastround 11", Macro3.stasisItem());
    }
  }, {
    key: "redigitize",
    value: function() {
      return this.externalIf(shouldRedigitize(), Macro3.trySkill($skill(_templateObject2312 || (_templateObject2312 = _taggedTemplateLiteral26(["Digitize"])))));
    }
  }, {
    key: "default",
    value: function() {
      return this.if_($monster(_templateObject2412 || (_templateObject2412 = _taggedTemplateLiteral26(["All-Hallow's Steve"]))), Macro3.abort()).externalIf($familiars(_templateObject2511 || (_templateObject2511 = _taggedTemplateLiteral26(["Stocking Mimic, Ninja Pirate Zombie Robot, Comma Chameleon, Feather Boa Constrictor, Cocoabo"]))).includes(args_default.familiar), Macro3.stasis(), Macro3.try([].concat(_toConsumableArray19($skills(_templateObject2611 || (_templateObject2611 = _taggedTemplateLiteral26(["Curse of Weaksauce, Micrometeorite, Sing Along, Bowl Straight Up"])))), _toConsumableArray19($items(_templateObject2711 || (_templateObject2711 = _taggedTemplateLiteral26(["porquoise-handled sixgun, Rain-Doh indigo cup"])))))).externalIf(SourceTerminal_exports.isCurrentSkill($skill(_templateObject2810 || (_templateObject2810 = _taggedTemplateLiteral26(["Extract"])))), Macro3.skill($skill(_templateObject2910 || (_templateObject2910 = _taggedTemplateLiteral26(["Extract"])))))).kill();
    }
  }], [{
    key: "tryHaveSkill",
    value: function(skill) {
      return new Macro3().tryHaveSkill(skill);
    }
  }, {
    key: "tryHaveItem",
    value: function(item6) {
      return new Macro3().tryHaveItem(item6);
    }
  }, {
    key: "try",
    value: function(actions) {
      return new Macro3().try(actions);
    }
  }, {
    key: "stasisItem",
    value: function() {
      return new Macro3().stasisItem();
    }
  }, {
    key: "kill",
    value: function() {
      return new Macro3().kill();
    }
  }, {
    key: "stasis",
    value: function() {
      return new Macro3().stasis();
    }
  }, {
    key: "redigitize",
    value: function() {
      return new Macro3().redigitize();
    }
  }, {
    key: "default",
    value: function() {
      return new Macro3().default();
    }
  }]), Macro3;
}(StrictMacro), CandyStrategy = /* @__PURE__ */ function(_CombatStrategy) {
  _inherits5(CandyStrategy2, _CombatStrategy);
  var _super2 = _createSuper5(CandyStrategy2);
  function CandyStrategy2() {
    var _this, macro = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      return Macro2.default();
    };
    return _classCallCheck15(this, CandyStrategy2), _this = _super2.call(this), _this.autoattack(macro).macro(macro), _this;
  }
  return CandyStrategy2;
}(CombatStrategy);

// src/regularTasks.ts
var _templateObject171, _templateObject261, _templateObject350, _templateObject438, _templateObject531, _templateObject627, _templateObject721, _templateObject821, _templateObject920, _templateObject1017, _templateObject1116, _templateObject1215, _templateObject1315, _templateObject1414, _templateObject1513, _templateObject1612, _templateObject1712, _templateObject1812, _templateObject1912, _templateObject2012, _templateObject2116, _templateObject2214, _templateObject2313, _templateObject2413, _templateObject2512, _templateObject2612, _templateObject2712, _templateObject2811, _templateObject2911, _templateObject3010, _templateObject3115, _templateObject3212, _templateObject3312, _templateObject3410, _templateObject358, _templateObject368, _templateObject378, _templateObject388, _templateObject398, _templateObject408, _templateObject4114, _templateObject4211, _templateObject439, _templateObject448, _templateObject458, _templateObject468, _templateObject478, _templateObject488, _templateObject498, _templateObject507, _templateObject5112, _templateObject5210, _templateObject536, _templateObject546;
function _createForOfIteratorHelper16(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray27(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _taggedTemplateLiteral27(strings, raw) {
  return raw || (raw = strings.slice(0)), Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}
function _toConsumableArray20(arr) {
  return _arrayWithoutHoles20(arr) || _iterableToArray20(arr) || _unsupportedIterableToArray27(arr) || _nonIterableSpread20();
}
function _nonIterableSpread20() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray27(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray27(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray27(o, minLen);
  }
}
function _iterableToArray20(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles20(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray27(arr);
}
function _arrayLikeToArray27(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var MARKET_QUESTS = [{
  pref: "questM23Meatsmith",
  url: "shop.php?whichshop=meatsmith&action=talk"
}, {
  pref: "questM24Doc",
  url: "shop.php?whichshop=doc&action=talk"
}, {
  pref: "questM25Armorer",
  url: "shop.php?whichshop=armory&action=talk"
}], _digitizeInitialized = !0;
function digitizeInitialized() {
  _digitizeInitialized = !0;
}
var runSource = null;
function getRunSource() {
  if (!runSource) {
    var _tryFindFreeRun;
    runSource = (_tryFindFreeRun = tryFindFreeRun()) !== null && _tryFindFreeRun !== void 0 ? _tryFindFreeRun : ensureFreeRun({
      requireUnlimited: function() {
        return !0;
      },
      noFamiliar: function() {
        return !0;
      },
      noRequirements: function() {
        return !0;
      },
      maximumCost: function() {
        var _get3;
        return (_get3 = get("autoBuyPriceLimit")) !== null && _get3 !== void 0 ? _get3 : 2e4;
      }
    });
  }
  return runSource || (0, import_kolmafia40.abort)("Unable to find free run with which to initialize digitize!"), runSource;
}
var GLOBAL_TASKS = [].concat(_toConsumableArray20(MARKET_QUESTS.map(function(_ref) {
  var pref = _ref.pref, url = _ref.url;
  return {
    name: "Start Quest: ".concat(pref),
    completed: function() {
      return questStep(pref) > -1;
    },
    do: function() {
      (0, import_kolmafia40.visitUrl)(url), (0, import_kolmafia40.runChoice)(1);
    }
  };
})), [{
  name: "Acquire Kgnee",
  ready: function() {
    return have($familiar(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral27(["Reagnimated Gnome"])))) && !have($item(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral27(["gnomish housemaid's kgnee"])))) && !get("_freecandy_checkedGnome", !1);
  },
  completed: function() {
    return get("_freecandy_checkedGnome", !1);
  },
  do: function() {
    (0, import_kolmafia40.visitUrl)("arena.php"), (0, import_kolmafia40.runChoice)(4), _set("_freecandy_checkedGnome", !0);
  },
  outfit: {
    familiar: $familiar(_templateObject350 || (_templateObject350 = _taggedTemplateLiteral27(["Reagnimated Gnome"])))
  },
  limit: {
    tries: 1
  }
}, {
  name: "Ow!",
  completed: function() {
    return (0, import_kolmafia40.myHp)() > 0;
  },
  do: function() {
    return (0, import_kolmafia40.abort)("Ow! I have 0 hp!");
  }
}, {
  name: "Check combat lost",
  completed: function() {
    return !get("_lastCombatLost", !1);
  },
  do: function() {
    return (0, import_kolmafia40.abort)("Lost in combat!");
  }
}, {
  name: "Lick wounds",
  ready: function() {
    return have($skill(_templateObject438 || (_templateObject438 = _taggedTemplateLiteral27(["Tongue of the Walrus"]))));
  },
  completed: function() {
    return !have($effect(_templateObject531 || (_templateObject531 = _taggedTemplateLiteral27(["Beaten Up"]))));
  },
  do: function() {
    return (0, import_kolmafia40.useSkill)($skill(_templateObject627 || (_templateObject627 = _taggedTemplateLiteral27(["Tongue of the Walrus"]))));
  }
}, {
  name: "Sweat Out some Booze",
  completed: function() {
    return get("_sweatOutSomeBoozeUsed") >= 3;
  },
  ready: function() {
    return (0, import_kolmafia40.myInebriety)() > 0 && get("sweat") >= 25;
  },
  do: function() {
    return (0, import_kolmafia40.useSkill)($skill(_templateObject721 || (_templateObject721 = _taggedTemplateLiteral27(["Sweat Out Some Booze"]))));
  },
  outfit: {
    pants: $item(_templateObject821 || (_templateObject821 = _taggedTemplateLiteral27(["designer sweatpants"])))
  },
  sobriety: "sober"
}, {
  name: "Numberology",
  ready: function() {
    return Object.values((0, import_kolmafia40.reverseNumberology)()).includes(69) && get("skillLevel144") <= 3;
  },
  completed: function() {
    return get("_universeCalculated") >= get("skillLevel144");
  },
  do: function() {
    return (0, import_kolmafia40.cliExecute)("numberology 69");
  }
}, {
  name: "Magical Sauasage",
  ready: function() {
    return $items(_templateObject920 || (_templateObject920 = _taggedTemplateLiteral27(["magical sausage, magical sausage casing"]))).some(function(i) {
      return have(i);
    }) && $items(_templateObject1017 || (_templateObject1017 = _taggedTemplateLiteral27(["Kramco Sausage-o-Matic\u2122, replica Kramco Sausage-o-Matic\u2122"]))).some(function(i) {
      return have(i);
    });
  },
  completed: function() {
    return get("_sausagesEaten") >= 23;
  },
  do: function() {
    return (0, import_kolmafia40.eat)($item(_templateObject1116 || (_templateObject1116 = _taggedTemplateLiteral27(["magical sausage"]))));
  }
}, {
  name: "License to Chill",
  ready: function() {
    return have($item(_templateObject1215 || (_templateObject1215 = _taggedTemplateLiteral27(["License to Chill"]))));
  },
  completed: function() {
    return get("_licenseToChillUsed");
  },
  do: function() {
    return (0, import_kolmafia40.use)($item(_templateObject1315 || (_templateObject1315 = _taggedTemplateLiteral27(["License to Chill"]))));
  }
}, {
  name: "Fill Pantsgiving Fullness",
  ready: function() {
    return !$classes(_templateObject1414 || (_templateObject1414 = _taggedTemplateLiteral27(["Vampyre, Grey Goo"]))).includes((0, import_kolmafia40.myClass)()) && (0, import_kolmafia40.myFullness)() + 1 === (0, import_kolmafia40.fullnessLimit)();
  },
  completed: function() {
    return (0, import_kolmafia40.myFullness)() >= (0, import_kolmafia40.fullnessLimit)();
  },
  do: function() {
    var _getBestPantsgivingFo = getBestPantsgivingFood(), food = _getBestPantsgivingFo.food;
    get("_fudgeSporkUsed") || ((0, import_kolmafia40.retrieveItem)($item(_templateObject1513 || (_templateObject1513 = _taggedTemplateLiteral27(["fudge spork"])))), (0, import_kolmafia40.eat)($item(_templateObject1612 || (_templateObject1612 = _taggedTemplateLiteral27(["fudge spork"]))))), (0, import_kolmafia40.retrieveItem)(food), (0, import_kolmafia40.eat)(food);
  }
}, {
  name: "Autumn-Aton",
  completed: function() {
    return !AutumnAton_exports.available();
  },
  do: function() {
    AutumnAton_exports.sendTo(bestAutumnatonLocation);
  }
}, {
  name: "Cold Medicine Cabinet",
  ready: function() {
    return (0, import_kolmafia40.getWorkshed)() === $item(_templateObject1712 || (_templateObject1712 = _taggedTemplateLiteral27(["cold medicine cabinet"])));
  },
  completed: function() {
    return get("_coldMedicineConsults") >= 5 || get("_nextColdMedicineConsult") > (0, import_kolmafia40.totalTurnsPlayed)();
  },
  do: coldMedicineCabinet
}, {
  name: "Trainset",
  ready: function() {
    return TrainSet_exports.installed();
  },
  completed: function() {
    return !willRotateTrainset();
  },
  do: rotateTrainToOptimalCycle
}, {
  name: "Tune Snapper",
  ready: function() {
    return args_default.familiar === $familiar(_templateObject1812 || (_templateObject1812 = _taggedTemplateLiteral27(["Red-Nosed Snapper"])));
  },
  completed: function() {
    return Snapper_exports.getTrackedPhylum() === $phylum(_templateObject1912 || (_templateObject1912 = _taggedTemplateLiteral27(["dude"])));
  },
  do: function() {
    return Snapper_exports.trackPhylum($phylum(_templateObject2012 || (_templateObject2012 = _taggedTemplateLiteral27(["dude"]))));
  }
}, {
  name: "June Cleaver",
  completed: function() {
    return !JuneCleaver_exports.have() || !!get("_juneCleaverFightsLeft");
  },
  do: function() {
    return withProperty("recoveryScript", "", function() {
      var target = (0, import_kolmafia40.myInebriety)() > (0, import_kolmafia40.inebrietyLimit)() ? $location(_templateObject2116 || (_templateObject2116 = _taggedTemplateLiteral27(["Drunken Stupor"]))) : $location(_templateObject2214 || (_templateObject2214 = _taggedTemplateLiteral27(["Noob Cave"])));
      (0, import_kolmafia40.adv1)(target, -1, "");
    });
  },
  choices: juneCleaverChoices,
  outfit: {
    weapon: $item(_templateObject2313 || (_templateObject2313 = _taggedTemplateLiteral27(["June cleaver"])))
  },
  combat: new CandyStrategy(Macro2.abort())
}, {
  name: "Terminal Skills",
  ready: function() {
    return SourceTerminal_exports.have();
  },
  completed: function() {
    return SourceTerminal_exports.isCurrentSkill([$skill(_templateObject2413 || (_templateObject2413 = _taggedTemplateLiteral27(["Extract"]))), $skill(_templateObject2512 || (_templateObject2512 = _taggedTemplateLiteral27(["Duplicate"])))]);
  },
  do: function() {
    return SourceTerminal_exports.educate([$skill(_templateObject2612 || (_templateObject2612 = _taggedTemplateLiteral27(["Extract"]))), $skill(_templateObject2712 || (_templateObject2712 = _taggedTemplateLiteral27(["Duplicate"])))]);
  }
}, {
  name: "Proton Ghost",
  completed: function() {
    return get("questPAGhost") === "unstarted";
  },
  ready: function() {
    return have($item(_templateObject2811 || (_templateObject2811 = _taggedTemplateLiteral27(["protonic accelerator pack"])))) && !!get("ghostLocation");
  },
  do: function() {
    var _get22;
    return (_get22 = get("ghostLocation")) !== null && _get22 !== void 0 ? _get22 : (0, import_kolmafia40.abort)("Failed to find proper ghost location");
  },
  outfit: function() {
    return combatOutfit({
      back: $item(_templateObject2911 || (_templateObject2911 = _taggedTemplateLiteral27(["protonic accelerator pack"])))
    });
  },
  combat: new CandyStrategy(function() {
    return Macro2.trySkill($skill(_templateObject3010 || (_templateObject3010 = _taggedTemplateLiteral27(["Shoot Ghost"])))).trySkill($skill(_templateObject3115 || (_templateObject3115 = _taggedTemplateLiteral27(["Shoot Ghost"])))).trySkill($skill(_templateObject3212 || (_templateObject3212 = _taggedTemplateLiteral27(["Shoot Ghost"])))).trySkill($skill(_templateObject3312 || (_templateObject3312 = _taggedTemplateLiteral27(["Trap Ghost"]))));
  })
}, {
  name: "Vote Wanderer",
  ready: function() {
    return have($item(_templateObject3410 || (_templateObject3410 = _taggedTemplateLiteral27(['"I Voted!" sticker'])))) && (0, import_kolmafia40.totalTurnsPlayed)() % 11 === 1 && get("_voteFreeFights") < 3;
  },
  do: function() {
    return drunkSafeWander("wanderer");
  },
  completed: function() {
    return get("lastVoteMonsterTurn") === (0, import_kolmafia40.totalTurnsPlayed)();
  },
  outfit: function() {
    return combatOutfit({
      acc1: $item(_templateObject358 || (_templateObject358 = _taggedTemplateLiteral27(['"I Voted!" sticker'])))
    });
  },
  combat: new CandyStrategy()
}, {
  name: "Digitize Wanderer",
  completed: function() {
    return counter_exports.get("Digitize") > 0;
  },
  do: function() {
    return drunkSafeWander("wanderer");
  },
  prepare: function() {
    return shouldRedigitize() && SourceTerminal_exports.educate([$skill(_templateObject368 || (_templateObject368 = _taggedTemplateLiteral27(["Digitize"]))), $skill(_templateObject378 || (_templateObject378 = _taggedTemplateLiteral27(["Extract"])))]);
  },
  post: function() {
    return get("_sourceTerminalDigitizeMonsterCount") || (_digitizeInitialized = !1);
  },
  outfit: digitizeOutfit,
  combat: new CandyStrategy(function() {
    return Macro2.redigitize().default();
  })
}, {
  name: "Void Monster",
  ready: function() {
    return have($item(_templateObject388 || (_templateObject388 = _taggedTemplateLiteral27(["cursed magnifying glass"])))) && get("cursedMagnifyingGlassCount") === 13;
  },
  completed: function() {
    return get("_voidFreeFights") >= 5;
  },
  do: function() {
    return drunkSafeWander("wanderer");
  },
  outfit: function() {
    return combatOutfit({
      offhand: $item(_templateObject398 || (_templateObject398 = _taggedTemplateLiteral27(["cursed magnifying glass"])))
    });
  },
  combat: new CandyStrategy()
}, {
  name: "Kramco",
  ready: function() {
    return have($item(_templateObject408 || (_templateObject408 = _taggedTemplateLiteral27(["Kramco Sausage-o-Matic\u2122"]))));
  },
  completed: function() {
    return getKramcoWandererChance() < 1;
  },
  do: function() {
    return drunkSafeWander("wanderer");
  },
  post: digitizeInitialized,
  outfit: function() {
    return combatOutfit({
      offhand: $item(_templateObject4114 || (_templateObject4114 = _taggedTemplateLiteral27(["Kramco Sausage-o-Matic\u2122"])))
    });
  },
  combat: new CandyStrategy()
}, {
  name: "Yellow Ray: Fondeluge",
  ready: function() {
    return have($skill(_templateObject4211 || (_templateObject4211 = _taggedTemplateLiteral27(["Fondeluge"]))));
  },
  completed: function() {
    return have($effect(_templateObject439 || (_templateObject439 = _taggedTemplateLiteral27(["Everything Looks Yellow"]))));
  },
  do: function() {
    return wanderWhere("yellow ray");
  },
  sobriety: "sober",
  post: digitizeInitialized,
  outfit: combatOutfit,
  combat: new CandyStrategy(function() {
    return Macro2.tryHaveSkill($skill(_templateObject448 || (_templateObject448 = _taggedTemplateLiteral27(["Duplicate"])))).trySkill($skill(_templateObject458 || (_templateObject458 = _taggedTemplateLiteral27(["Fondeluge"])))).abort();
  })
}, {
  name: "Yellow Ray: Jurassic Parka",
  ready: function() {
    return have($item(_templateObject468 || (_templateObject468 = _taggedTemplateLiteral27(["Jurassic Parka"])))) && have($skill(_templateObject478 || (_templateObject478 = _taggedTemplateLiteral27(["Torso Awareness"]))));
  },
  completed: function() {
    return have($effect(_templateObject488 || (_templateObject488 = _taggedTemplateLiteral27(["Everything Looks Yellow"]))));
  },
  do: function() {
    return wanderWhere("yellow ray");
  },
  sobriety: "sober",
  post: digitizeInitialized,
  outfit: function() {
    return combatOutfit({
      shirt: $item(_templateObject498 || (_templateObject498 = _taggedTemplateLiteral27(["Jurassic Parka"]))),
      modes: {
        parka: "dilophosaur"
      }
    });
  },
  combat: new CandyStrategy(function() {
    return Macro2.tryHaveSkill($skill(_templateObject507 || (_templateObject507 = _taggedTemplateLiteral27(["Duplicate"])))).trySkill($skill(_templateObject5112 || (_templateObject5112 = _taggedTemplateLiteral27(["Spit jurassic acid"])))).abort();
  })
}, {
  name: "Free-for-All",
  ready: function() {
    return have($skill(_templateObject5210 || (_templateObject5210 = _taggedTemplateLiteral27(["Free-For-All"]))));
  },
  completed: function() {
    return have($effect(_templateObject536 || (_templateObject536 = _taggedTemplateLiteral27(["Everything Looks Red"]))));
  },
  do: function() {
    return wanderWhere("backup");
  },
  sobriety: "sober",
  post: digitizeInitialized,
  outfit: combatOutfit,
  combat: new CandyStrategy(Macro2.skill($skill(_templateObject546 || (_templateObject546 = _taggedTemplateLiteral27(["Free-For-All"])))))
}, {
  name: "Nemesis Assassin",
  completed: function() {
    return counter_exports.get("Nemesis Assassin window end") > 0;
  },
  do: function() {
    return drunkSafeWander("wanderer");
  },
  post: digitizeInitialized,
  outfit: combatOutfit,
  combat: new CandyStrategy()
}, {
  name: "Initialize Digitize",
  completed: function() {
    return _digitizeInitialized;
  },
  do: function() {
    var _getRunSource;
    return (_getRunSource = getRunSource()) === null || _getRunSource === void 0 || _getRunSource.prepare(), wanderWhere("backup");
  },
  post: function() {
    digitizeInitialized(), runSource = null;
  },
  outfit: function() {
    var _run$constraints, _run$constraints$equi, _run$constraints2, _run$constraints2$fam, run = getRunSource(), req = run == null || (_run$constraints = run.constraints) === null || _run$constraints === void 0 || (_run$constraints$equi = _run$constraints.equipmentRequirements) === null || _run$constraints$equi === void 0 ? void 0 : _run$constraints$equi.call(_run$constraints), familiar4 = run == null || (_run$constraints2 = run.constraints) === null || _run$constraints2 === void 0 || (_run$constraints2$fam = _run$constraints2.familiar) === null || _run$constraints2$fam === void 0 ? void 0 : _run$constraints2$fam.call(_run$constraints2), outfit2 = new Outfit();
    if (familiar4 && outfit2.equip(familiar4), req) {
      var _req$maximizeOptions$;
      req.maximizeParameters && (outfit2.modifier = req.maximizeParameters);
      var _iterator = _createForOfIteratorHelper16((_req$maximizeOptions$ = req.maximizeOptions.forceEquip) !== null && _req$maximizeOptions$ !== void 0 ? _req$maximizeOptions$ : []), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item6 = _step.value;
          outfit2.equip(item6) || (0, import_kolmafia40.abort)("Failed to equip item ".concat(item6, " for free running"));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return combatOutfit(outfit2.spec());
  },
  combat: new CandyStrategy(function() {
    var _getRunSource$macro, _getRunSource2;
    return Macro2.step((_getRunSource$macro = (_getRunSource2 = getRunSource()) === null || _getRunSource2 === void 0 ? void 0 : _getRunSource2.macro) !== null && _getRunSource$macro !== void 0 ? _getRunSource$macro : Macro2.abort());
  }),
  sobriety: "sober"
}]), regularTasks_default = GLOBAL_TASKS;

// src/trickTreatTasks.ts
init_kolmafia_polyfill();
var import_kolmafia41 = require("kolmafia");
function _createForOfIteratorHelper17(o, allowArrayLike) {
  var it = typeof Symbol != "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray28(o)) || allowArrayLike && o && typeof o.length == "number") {
      it && (o = it);
      var i = 0, F = function() {
      };
      return { s: F, n: function() {
        return i >= o.length ? { done: !0 } : { done: !1, value: o[i++] };
      }, e: function(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = !0, didErr = !1, err;
  return { s: function() {
    it = it.call(o);
  }, n: function() {
    var step = it.next();
    return normalCompletion = step.done, step;
  }, e: function(_e2) {
    didErr = !0, err = _e2;
  }, f: function() {
    try {
      !normalCompletion && it.return != null && it.return();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray28(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray28(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray28(o, minLen);
  }
}
function _arrayLikeToArray28(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var HOUSE_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], blockHtml = "", treated = !1, tricked = [];
function getBlockHtml() {
  return blockHtml || (blockHtml = (0, import_kolmafia41.visitUrl)("place.php?whichplace=town&action=town_trickortreat")), blockHtml;
}
function refreshBlock() {
  blockHtml = (0, import_kolmafia41.visitUrl)("place.php?whichplace=town&action=town_trickortreat");
}
function resetBlock() {
  refreshBlock(), treated = !1, tricked = [], State.blocks++;
}
function ensureInHalloween() {
  var onPage = (0, import_kolmafia41.handlingChoice)() && (0, import_kolmafia41.lastChoice)() === 804;
  onPage || refreshBlock();
}
var TRICK_TREAT_TASKS = [{
  name: "Treat",
  ready: function() {
    return !treated;
  },
  completed: function() {
    return !getBlockHtml().match(/whichhouse=\d*>[^>]*?house_l/);
  },
  outfit: treatOutfit,
  prepare: ensureInHalloween,
  do: function() {
    var _iterator = _createForOfIteratorHelper17(HOUSE_NUMBERS), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var house = _step.value;
        getBlockHtml().match(RegExp("whichhouse=".concat(house, ">[^>]*?house_l"))) ? (tricked.push(house), (0, import_kolmafia41.visitUrl)("choice.php?whichchoice=804&option=3&whichhouse=".concat(house, "&pwd"))) : getBlockHtml().match(RegExp("whichhouse=".concat(house, ">[^>]*?starhouse"))) && (tricked.push(house), (0, import_kolmafia41.visitUrl)("choice.php?whichchoice=804&option=3&whichhouse=".concat(house, "&pwd")), (0, import_kolmafia41.runChoice)(2), refreshBlock());
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    treated = !0;
  }
}, {
  name: "Trick",
  ready: function() {
    return tricked.length < HOUSE_NUMBERS.length;
  },
  completed: function() {
    return !getBlockHtml().match(/whichhouse=\d*>[^>]*?house_d/);
  },
  prepare: ensureInHalloween,
  do: function() {
    var _iterator2 = _createForOfIteratorHelper17(HOUSE_NUMBERS), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var house = _step2.value;
        if (!tricked.includes(house) && (tricked.push(house), getBlockHtml().match(RegExp("whichhouse=".concat(house, ">[^>]*?house_d"))))) {
          (0, import_kolmafia41.visitUrl)("choice.php?whichchoice=804&option=3&whichhouse=".concat(house, "&pwd"));
          do
            (0, import_kolmafia41.runCombat)();
          while ((0, import_kolmafia41.inMultiFight)());
          return;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    tricked.length < HOUSE_NUMBERS.length && (0, import_kolmafia41.abort)("We thought there were unvisited trickable houses left, but alas! there are not!");
  },
  outfit: trickOutfit,
  combat: new CandyStrategy()
}, {
  name: "Reset Block",
  ready: function() {
    return (0, import_kolmafia41.myAdventures)() >= 5;
  },
  completed: function() {
    return refreshBlock(), getBlockHtml().includes("whichhouse=");
  },
  prepare: ensureInHalloween,
  do: function() {
    (0, import_kolmafia41.visitUrl)("choice.php?whichchoice=804&pwd&option=1"), resetBlock(), getBlockHtml().includes("whichhouse=") || (0, import_kolmafia41.abort)("Something went awry when finding a new block!");
  }
}], trickTreatTasks_default = TRICK_TREAT_TASKS;

// src/index.ts
var import_kolmafia42 = require("kolmafia");
function _toConsumableArray21(arr) {
  return _arrayWithoutHoles21(arr) || _iterableToArray21(arr) || _unsupportedIterableToArray29(arr) || _nonIterableSpread21();
}
function _nonIterableSpread21() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray29(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray29(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray29(o, minLen);
  }
}
function _iterableToArray21(iter) {
  if (typeof Symbol != "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles21(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray29(arr);
}
function _arrayLikeToArray29(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function main() {
  var argstring = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Args.fill(args_default, argstring), args_default.help) {
    Args.showHelp(args_default);
    return;
  }
  var nemesisStep = function() {
    return questStep("questG04Nemesis");
  }, doingNemesis = nemesisStep() >= 17 && nemesisStep() < 25, noMoreAdventures = function() {
    return (0, import_kolmafia42.myAdventures)() <= 0 ? ((0, import_kolmafia42.print)("Out of adventures! Stopping.", "red"), !0) : !1;
  }, doneWithNemesis = function() {
    return doingNemesis && nemesisStep() >= 25 ? ((0, import_kolmafia42.print)("Fought the final nemesis wanderer! Stopping.", "red"), !0) : !1;
  }, doneWithBlocks = function() {
    return State.blocks >= args_default.blocks ? ((0, import_kolmafia42.print)("Finished ".concat(args_default.blocks, " blocks!"), "red"), !0) : !1;
  };
  _set("_lastCombatLost", !1);
  var quest = {
    name: "hacking your system",
    completed: function() {
      return noMoreAdventures() || doneWithNemesis() || doneWithBlocks();
    },
    tasks: [].concat(_toConsumableArray21(regularTasks_default), _toConsumableArray21(trickTreatTasks_default))
  }, engine = new CandyEngine(getTasks([quest]));
  try {
    engine.run();
  } finally {
    engine.destruct();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
