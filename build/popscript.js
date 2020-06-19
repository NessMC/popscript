!function(n){var e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(r,o,function(e){return n[e]}.bind(null,o));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=1)}([function(n,e){n.exports=require("fs")},function(n,e,t){"use strict";e.__esModule=!0;var r=t(2);t(0).readFile("./index.ps","UTF-8",(function(n,e){if(n)throw n;new r.default(e.split(/\r?\n/g).join("\n")).transpile()}))},function(n,e,t){"use strict";e.__esModule=!0;var r=t(3),o=t(5),u=function(){function n(n){this.variables={},this.functions=[],r.Tokenizer.addTokenSet(o.default),this.content=n.split(/\n/g)}return n.prototype.transpile=function(){var n=[];for(var e in this.content)if(this.content.hasOwnProperty(e)){var t=this.content[e],o=r.Tokenizer.tokenize(t),u=[];for(var i in o)if(o.hasOwnProperty(i)){var s=o[i],a=s.value,c=s.token;if(!c)return console.log("Can't understand this keyword \""+a+'" at line',e);switch(c){case"STRING":u.push(a);break;case"COMMENT":u.push("//"+a.trim().slice(2))}}n.push(u.join("")),u=[],[]}},n}();e.default=u},function(n,e,t){"use strict";e.__esModule=!0,e.Tokenizer=void 0;var r=t(4),o=function(){function n(){}return n.addTokenSet=function(n){for(var e in n)this.tokens[e]=n[e]},n.tokenize=function(n){return r.scanner(n,this)},n.tokens={},n.customOut={},n.ignore={},n.functions={},n}();e.Tokenizer=o},function(n,e,t){"use strict";function r(n,e,t){var r={token:n,value:e};return n in t.customOut&&(r.customOut=t.customOut[n]),r}function o(n,e,t){return null!==n&&(n.index<e.startToken||n.index===e.startToken&&n[0].length>e.endToken)&&(e.startToken=n.index,e.tokenValue=n[0],e.endToken=n[0].length,e.currToken=t),e}function u(n,e){var t={endToken:0,startToken:Number.MAX_SAFE_INTEGER,tokenValue:"",currToken:""};for(var r in n){if(n.hasOwnProperty(r))t=o(e.match(n[r]),t,r)}return t}e.__esModule=!0,e.scanner=void 0,e.scanner=function(n,e){for(var t=e.tokens,o=[];n;){var i=u(t,n),s=i.endToken,a=i.startToken,c=i.tokenValue,f=i.currToken;0!==a&&(c=n.substring(0,a),f=e.errTok,s=a),e.ignore[f]||o.push(r(f,c,e)),f in e.functions&&e.functions[f](),n=n.substring(s)}return o}},function(n,e,t){"use strict";e.__esModule=!0,e.default={SPACE:/\s/,TABS:/^\s+/,DOT:/\./,COMMA:/,/,L_PAREN:/\(/,R_PAREN:/\)/,ARGUMENTS:/=>/,INDEX:/:/,STRING:/(['"])(.*?)(['"])/,INT:/-?\d+/,OPTIONAL:/opt/,BOOLEAN:/true|false/,FUNCTION:/fn/,IF:/if/,ELIF:/elif/,ELSE:/else/,WHILE:/while/,LOOP:/loop/,PRINT:/print/,RETURN:/return/,ADD:/(\+=|=\+)/,REMOVE:/(-=|=-)/,WORD:/\w+/,SIGNS:/[><=+\-*\/%|]/,NOT:/not|!/,AND:/and|&/,COMMENT:/--.*/}}]);