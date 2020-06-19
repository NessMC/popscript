!function(e){var n={};function t(r){if(n[r])return n[r].exports;var s=n[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,t),s.l=!0,s.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var s in e)t.d(r,s,function(n){return e[n]}.bind(null,s));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n){e.exports=require("fs")},function(e,n,t){"use strict";n.__esModule=!0;var r=t(2);t(0).readFile("./index.ps","UTF-8",(function(e,n){if(e)throw e;new r.default(n.split(/\r?\n/g).join("\n")).transpile()}))},function(e,n,t){"use strict";n.__esModule=!0;var r=t(3),s=t(5),i=function(){function e(e){this.variables={},this.functions=[],r.Tokenizer.addTokenSet(s.default),this.content=e.split(/\n/g)}return e.prototype.transpile=function(){var e=[];for(var n in this.content)if(this.content.hasOwnProperty(n)){var t=this.content[n],s=r.Tokenizer.tokenize(t),i=[],u=[],o="";for(var a in s)if(s.hasOwnProperty(a)){var c=s[a],l=c.value,f=c.token;if(!f)return console.log("Can't understand this keyword \""+l+'" at line',n);switch(f){case"STRING":case"INT":u.push(l),i.filter((function(e){return["VARIABLE::USE","VARIABLE::DECLARATION"].includes(e)})).length>0&&"array"!==this.variables[o]&&(this.variables[o]=f.toLowerCase());break;case"COMMENT":u.push("//"+l.trim().slice(2));break;case"WORD":void 0!==this.variables[l]?(u.push(l),i.push("VARIABLE::USE")):(u.push("var "+l),this.variables[l]="",i.push("VARIABLE::DECLARATION")),o=l;break;case"SIGNS":"="===l?i.filter((function(e){return["VARIABLE::USE","VARIABLE::DECLARATION"].includes(e)})).length>0&&u.push("="):u.push(l);break;case"INDEX":u.push("["+l.slice(1,l.length-1)+"]");break;case"PROPERTY":u.push("."+l.slice(1));break;case"L_PAREN":case"R_PAREN":i.filter((function(e){return["VARIABLE::USE","VARIABLE::DECLARATION"].includes(e)})).length>0&&("L_PAREN"===f?u.push("["):"R_PAREN"===f&&u.push("]"),this.variables[o]="array");break;case"COMMA":u.push(l);break;case"ADD":switch(this.variables[o]){case"string":case"int":u.push("+=");break;case"array":u.push(".push("),i.push("ARRAY::PUSH")}break;case"REMOVE":switch(this.variables[o]){case"int":u.push("-=");break;case"string":u.push(" = "+o+".replace("),i.push("STRING::REMOVE");break;case"array":u.push(".filter(x => x !== "),i.push("ARRAY::REMOVE")}break;case"AND":i.includes("STRING::REMOVE")?(u.push(', ""), '),i.splice(i.findIndex((function(e){return"STRING::REMOVE"===e})),1)):i.includes("ARRAY::REMOVE")?(u.push("), "),i.splice(i.findIndex((function(e){return"ARRAY::REMOVE"===e})),1)):i.includes("ARRAY::PUSH")&&(u.push(")"),i.splice(i.findIndex((function(e){return"ARRAY::PUSH"===e})),1))}}i.includes("STRING::REMOVE")?(u.push(', "")'),i.splice(i.findIndex((function(e){return"STRING::REMOVE"===e})),1)):i.includes("ARRAY::REMOVE")?(u.push(")"),i.splice(i.findIndex((function(e){return"ARRAY::REMOVE"===e})),1)):i.includes("ARRAY::PUSH")&&(u.push(")"),i.splice(i.findIndex((function(e){return"ARRAY::PUSH"===e})),1)),e.push(u.join("")),u=[],i=[]}console.log(e)},e}();n.default=i},function(e,n,t){"use strict";n.__esModule=!0,n.Tokenizer=void 0;var r=t(4),s=function(){function e(){}return e.addTokenSet=function(e){for(var n in e)this.tokens[n]=e[n]},e.tokenize=function(e){return r.scanner(e,this)},e.tokens={},e.customOut={},e.ignore={},e.functions={},e}();n.Tokenizer=s},function(e,n,t){"use strict";function r(e,n,t){var r={token:e,value:n};return e in t.customOut&&(r.customOut=t.customOut[e]),r}function s(e,n,t){return null!==e&&(e.index<n.startToken||e.index===n.startToken&&e[0].length>n.endToken)&&(n.startToken=e.index,n.tokenValue=e[0],n.endToken=e[0].length,n.currToken=t),n}function i(e,n){var t={endToken:0,startToken:Number.MAX_SAFE_INTEGER,tokenValue:"",currToken:""};for(var r in e){if(e.hasOwnProperty(r))t=s(n.match(e[r]),t,r)}return t}n.__esModule=!0,n.scanner=void 0,n.scanner=function(e,n){for(var t=n.tokens,s=[];e;){var u=i(t,e),o=u.endToken,a=u.startToken,c=u.tokenValue,l=u.currToken;0!==a&&(c=e.substring(0,a),l=n.errTok,o=a),n.ignore[l]||s.push(r(l,c,n)),l in n.functions&&n.functions[l](),e=e.substring(o)}return s}},function(e,n,t){"use strict";n.__esModule=!0,n.default={SPACE:/\s/,TABS:/^\s+/,DOT:/\./,COMMA:/,/,L_PAREN:/\(/,R_PAREN:/\)/,ARGUMENTS:/=>/,PROPERTY:/:\w+/,INDEX:/<.*?>/,STRING:/(['"])(.*?)(['"])/,INT:/-?\d+/,OPTIONAL:/opt/,BOOLEAN:/true|false/,FUNCTION:/fn/,IF:/if/,ELIF:/elif/,ELSE:/else/,WHILE:/while/,LOOP:/loop/,AS:/as/,PRINT:/print/,RETURN:/return/,ADD:/(\+=|=\+)/,REMOVE:/(-=|=-)/,AND:/and|&/,WORD:/\w+/,SIGNS:/[><=+\-*\/%|]/,NOT:/not|!/,COMMENT:/--.*/}}]);