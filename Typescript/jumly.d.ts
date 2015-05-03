/// <reference path="jquery.d.ts" />

interface Options {
	into : JQuery | NodeSelector; 
}

interface Jumly {
    eval( element : JQuery,  options: Options) : any 
} 

declare var JUMLY : Jumly;