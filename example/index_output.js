module.exports=function(r,e){"use strict";var t={};function __webpack_require__(e){if(t[e]){return t[e].exports}var _=t[e]={i:e,l:false,exports:{}};var a=true;try{r[e].call(_.exports,_,_.exports,__webpack_require__);a=false}finally{if(a)delete t[e]}_.l=true;return _.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(653)}return startup()}({653:function(){function factorial(r){return r>1&&(r*=factorial(r-1)),r}console.log(factorial(5))}});