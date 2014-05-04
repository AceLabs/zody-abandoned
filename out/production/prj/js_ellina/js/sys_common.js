function include(filename) {
	sys_engine.eval( new Packages.java.io.FileReader( new Packages.java.io.File( sys_script_path + '/' + filename + ".js" ) ) );
}

function isDefined(a) {
    return typeof a == 'undefined';
}