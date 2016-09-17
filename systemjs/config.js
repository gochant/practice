System.config({
    baseURL: './',
    transpiler: 'plugin-babel',
    defaultJSExtensions: true,
    map: {
        'text': './node_modules/systemjs-plugin-text/text.js',
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js'
        ,
        jquery: './node_modules/jquery/dist/jquery'
    },
    meta: {
        'templates/*.html': {
            loader: 'text'
        }
//            ,
//            './**/*.js': {
//                format: 'esm'
//            }
    }
});
