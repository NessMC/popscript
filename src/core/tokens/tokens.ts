/*//////////////////////////////////
         POPSCRIPT LANGUAGE
               Tokens
//////////////////////////////////*/

export default {

    // BASIC

    SPACE       : /\s/                    , // Match any spaces
    TABS        : /^\s+/                  , // Match start tabs
    DOT         : /\./                    , // Match any dots
    COMMA       : /,/                     , // Match any comma
    L_PAREN     : /\(/                    , // Match any left parenthesis
    R_PAREN     : /\)/                    , // Match any right parenthesis
    COLON       : /:/                     , // Match colon char 
    CALL        : /=>/                    , // Match arguments start like fn test => coucou

    // TYPES

    STRING      : /(['"])(.*?)(['"])/     , // Match any strings
    INT         : /-?\d+/                 , // Match any digits
    OPTIONAL    : /opt/                   , // Match optional type
    BOOLEAN     : /true|false/            , // Match boolean
    TYPES       : /string|int|array|any/  , // Match types

    // KEYWORDS

    FUNCTION    : /fn/                    , // Match function keyword
    ALIASE      : /aliase/                , // Match aliase keyword
    MULTIPLES   : /mul/                   , // Match spread arguments
    NATIVE      : /native\s+".*?"/        , // Match native code

    IF          : /if/                    , // Match if condition
    ELIF        : /elif/                  , // Match else if condition
    ELSE        : /else/                  , // Match else condition

    WHILE       : /while/                 , // Match while keyword
    LOOP        : /for/                   , // Match loop keyword
    IN          : /in/                    , // Match "in" in loop keyword

    RETURN      : /return/                , // Match return keyword

    IMPORT      : /import/                , // Match import keyword


    // OTHER

    AFTER       : /then|and/              , // Match after keyword
    ARGUMENT    : /&/                     , // Match argument
    WORD        : /\w+/                   , // Match any words
    SIGNS       : /[><=+\-*\/%|]+/         , // Match any sign
    NOT         : /not|!/                 , // Match not keyword
    COMMENT     : /;.*/                   , // Match comments

}