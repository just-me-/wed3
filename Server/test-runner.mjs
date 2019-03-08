import jasmine from "jasmine-node";
//import JasmineConsoleReporter from "jasmine-console-reporter"

jasmine.executeSpecsInFolder( {
    specFolders: [ "./spec/" ],
    matcher: new RegExp(".(mjs)$", "i"),
    isVerbose: true,
    includeStackTrace: true
});
/*
const jasmine = new Jasmine();
jasmine.loadConfigFile( "./support/jasmine.json" );

jasmine.env.clearReporters();
/*jasmine.addReporter( new JasmineConsoleReporter( {
    colors: true,
    cleanStack: true,
    verbosity: 4,
    listStyle: 'indent',
    activity: false
} ) )* /

jasmine.execute();*/