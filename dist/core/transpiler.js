"use strict";
/*//////////////////////////////////
         POPSCRIPT LANGUAGE
             Transpiler
//////////////////////////////////*/
exports.__esModule = true;
var parser_1 = require("./parser");
var tokens_1 = require("./tokens/tokens");
var tabdown_1 = require("./tabdown");
var FS = require("fs");
var PATH = require("path");
var Beautify = require("js-beautify");
var content;
var variables = {};
var functions = [];
var folder;
var Transpiler = /** @class */ (function () {
    function Transpiler(file_content) {
        parser_1.Tokenizer.addTokenSet(tokens_1["default"]);
        content = file_content.split(/\n/g);
    }
    Transpiler.prototype.transpile = function (filename) {
        if (!folder)
            folder = PATH.dirname(filename);
        var code = [];
        var export_stat = false;
        for (var index in content) {
            if (content.hasOwnProperty(index)) {
                var line = content[index];
                var tokens = parser_1.Tokenizer.tokenize(line);
                var context = [], built = [], var_name = '';
                var _loop_1 = function (item_token) {
                    if (tokens.hasOwnProperty(item_token)) {
                        var item = tokens[item_token], value_1 = item.value, token = item.token;
                        if (!token)
                            return { value: console.log('Can\'t understand this keyword "' + value_1 + '" at line', index) };
                        switch (token) {
                            case 'STRING':
                            case 'INT': {
                                if (context.filter(function (x) { return ['VARIABLE::USE', 'VARIABLE::DECLARATION'].includes(x); }).length > 0 &&
                                    variables[var_name] !== 'array') {
                                    variables[var_name] = token.toLowerCase();
                                    if (context.includes('MODULE::REQUIRE')) {
                                        built.push('"./' + value_1.slice(1, value_1.length - 1).replace('.ps', '.js') + '"');
                                        FS.readFile(folder + '/' + value_1.slice(1, value_1.length - 1), 'UTF-8', function (error, content) {
                                            if (error)
                                                throw error;
                                            new Transpiler(content.split(/\r?\n/g).join('\n')).transpile(folder + '/' + value_1.slice(1, value_1.length - 1).replace('.ps', '.js'));
                                        });
                                    }
                                    else {
                                        built.push(value_1);
                                    }
                                }
                                else {
                                    built.push(value_1);
                                }
                                break;
                            }
                            case 'OPTIONAL': {
                                context.push('FUNCTION::OPTIONAL');
                                break;
                            }
                            case 'COMMENT': {
                                built.push('//' + value_1.trim().slice(2));
                                break;
                            }
                            case 'WORD': {
                                if (!context.includes('FUNCTION::START')) {
                                    if (variables[value_1] !== undefined) {
                                        built.push(value_1);
                                        context.push('VARIABLE::USE');
                                    }
                                    else if (functions.includes(value_1)) {
                                        built.push(value_1);
                                        context.push('FUNCTION::CALL');
                                    }
                                    else {
                                        built.push("var " + value_1);
                                        variables[value_1] = '';
                                        context.push('VARIABLE::DECLARATION');
                                    }
                                }
                                else if (context.includes('FUNCTION::START')) {
                                    if (!context.includes('FUNCTION::ARGUMENTS')) {
                                        if (export_stat) {
                                            built.push(value_1 + '= function');
                                        }
                                        else {
                                            built.push(value_1);
                                        }
                                        functions.push(value_1);
                                    }
                                    else {
                                        built.push(value_1);
                                        variables[value_1] = '';
                                        if (context.includes('FUNCTION::OPTIONAL')) {
                                            built.push(' = \'\',');
                                            context.splice(context.findIndex(function (x) { return x === 'FUNCTION::OPTIONAL'; }), 1);
                                        }
                                        else {
                                            built.push(',');
                                        }
                                    }
                                }
                                else {
                                    built.push(value_1);
                                }
                                var_name = value_1;
                                break;
                            }
                            case 'ARGUMENTS': {
                                built.push('(');
                                context.push('FUNCTION::ARGUMENTS');
                                break;
                            }
                            case 'IMPORT': {
                                context.push('MODULE::IMPORT');
                                break;
                            }
                            case 'FROM': {
                                if (context.includes('MODULE::IMPORT')) {
                                    built.push('= require(');
                                    context.push('MODULE::REQUIRE');
                                }
                                break;
                            }
                            case 'SIGNS': {
                                if (value_1 === '=') {
                                    if (context.includes('CONDITION::START')) {
                                        built.push('==');
                                    }
                                    else if (context.filter(function (x) { return ['VARIABLE::USE', 'VARIABLE::DECLARATION'].includes(x); }).length > 0) {
                                        built.push('=');
                                    }
                                }
                                else {
                                    if (value_1 === '-') {
                                        if (!var_name)
                                            break;
                                        if (!variables[var_name])
                                            break;
                                        switch (variables[var_name]) {
                                            case 'string': {
                                                built.push('.replace(');
                                                context.push('STRING::REMOVE');
                                                break;
                                            }
                                            case 'array': {
                                                built.push('.filter(x => x !== ');
                                                context.push('ARRAY::REMOVE');
                                                break;
                                            }
                                            case 'int': {
                                                built.push(value_1);
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        built.push(value_1);
                                    }
                                }
                                break;
                            }
                            case 'INDEX': {
                                built.push('[' + value_1.slice(1, value_1.length - 1) + ']');
                                break;
                            }
                            case 'PROPERTY': {
                                built.push('.' + value_1.slice(1));
                                break;
                            }
                            case 'L_PAREN':
                            case 'R_PAREN': {
                                built.push(value_1);
                                break;
                            }
                            case 'ARRAY': {
                                if (value_1 === ':=')
                                    built.push('[');
                                else if (value_1 === '=:')
                                    built.push(']');
                                break;
                            }
                            case 'COMMA': {
                                built.push(value_1);
                                break;
                            }
                            case 'ADD': {
                                switch (variables[var_name]) {
                                    case 'string':
                                    case 'int': {
                                        built.push('+=');
                                        break;
                                    }
                                    case 'array': {
                                        built.push('.push(');
                                        context.push('ARRAY::PUSH');
                                        break;
                                    }
                                }
                                break;
                            }
                            case 'REMOVE': {
                                switch (variables[var_name]) {
                                    case 'int': {
                                        built.push('-=');
                                        break;
                                    }
                                    case 'string': {
                                        built.push(' = ' + var_name + '.replace(');
                                        context.push('STRING::REMOVE');
                                        break;
                                    }
                                    case 'array': {
                                        built.push(' = ' + var_name + '.filter(x => x !== ');
                                        context.push('ARRAY::REMOVE');
                                        break;
                                    }
                                }
                                break;
                            }
                            case 'EXPORT': {
                                export_stat = true;
                                built.push('module.exports.');
                                break;
                            }
                            case 'IF': {
                                built.push('if(');
                                context.push('CONDITION::START');
                                break;
                            }
                            case 'ELIF': {
                                built.push('else if(');
                                context.push('CONDITION::START');
                                break;
                            }
                            case 'ELSE': {
                                built.push('else:');
                                break;
                            }
                            case 'TABS': {
                                if (parseInt(item_token) === 0) {
                                    built.push(value_1);
                                }
                                break;
                            }
                            case 'AND': {
                                if (context.includes('STRING::REMOVE')) {
                                    built.push(', ""); ');
                                    context.splice(context.findIndex(function (x) { return x === 'STRING::REMOVE'; }), 1);
                                }
                                if (context.includes('ARRAY::REMOVE')) {
                                    built.push('); ');
                                    context.splice(context.findIndex(function (x) { return x === 'ARRAY::REMOVE'; }), 1);
                                }
                                if (context.includes('ARRAY::PUSH')) {
                                    built.push('); ');
                                    context.splice(context.findIndex(function (x) { return x === 'ARRAY::PUSH'; }), 1);
                                }
                                if (context.includes('PRINT::START')) {
                                    built.push('); ');
                                    context.splice(context.findIndex(function (x) { return x === 'PRINT::START'; }), 1);
                                }
                                if (context.includes('CONDITION::START')) {
                                    built.push('&&');
                                }
                                if (context.includes('MODULE::REQUIRE')) {
                                    built.push('); ');
                                    context.splice(context.findIndex(function (x) { return x === 'MODULE::REQUIRE'; }), 1);
                                }
                                break;
                            }
                            case 'LOOP': {
                                built.push('for(');
                                context.push('LOOP::START');
                                break;
                            }
                            case 'WHILE': {
                                built.push('while(');
                                context.push('LOOP::START');
                                break;
                            }
                            case 'FUNCTION': {
                                if (!export_stat) {
                                    built.push('function ');
                                }
                                context.push('FUNCTION::START');
                                break;
                            }
                            case 'IN': {
                                built.push(' in ');
                                break;
                            }
                            case 'PRINT': {
                                built.push('console.log(');
                                context.push('PRINT::START');
                                break;
                            }
                        }
                    }
                };
                for (var item_token in tokens) {
                    var state_1 = _loop_1(item_token);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                if (context.includes('STRING::REMOVE')) {
                    built.push(', "")');
                    context.splice(context.findIndex(function (x) { return x === 'STRING::REMOVE'; }), 1);
                }
                if (context.includes('ARRAY::REMOVE')) {
                    built.push(')');
                    context.splice(context.findIndex(function (x) { return x === 'ARRAY::REMOVE'; }), 1);
                }
                if (context.includes('ARRAY::PUSH')) {
                    built.push(')');
                    context.splice(context.findIndex(function (x) { return x === 'ARRAY::PUSH'; }), 1);
                }
                if (context.includes('PRINT::START')) {
                    built.push(')');
                    context.splice(context.findIndex(function (x) { return x === 'PRINT::START'; }), 1);
                }
                if (context.includes('CONDITION::START')) {
                    built.push('):');
                    context.splice(context.findIndex(function (x) { return x === 'CONDITION::START'; }), 1);
                }
                if (context.includes('LOOP::START')) {
                    built.push('):');
                    context.splice(context.findIndex(function (x) { return x === 'LOOP::START'; }), 1);
                }
                if (context.includes('FUNCTION::ARGUMENTS')) {
                    built.push('):');
                    export_stat = false;
                    context.splice(context.findIndex(function (x) { return x === 'FUNCTION::ARGUMENTS'; }), 1);
                }
                if (context.includes('MODULE::REQUIRE')) {
                    built.push(')');
                    context.splice(context.findIndex(function (x) { return x === 'MODULE::REQUIRE'; }), 1);
                }
                code.push(built.join(''));
                built = [];
                context = [];
            }
        }
        FS.writeFile(filename, Beautify(new tabdown_1["default"](code).tab().join('\n')), function (error) {
            if (error)
                throw error;
        });
    };
    return Transpiler;
}());
exports["default"] = Transpiler;
