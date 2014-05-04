function include(filename) {
        print('including ' + filename + '\n');
	sys_engine.eval( new Packages.java.io.FileReader( new Packages.java.io.File( sys_script_path + '/' + filename + ".js" ) ) );
        print('Success with ' + filename + '\n');
}

function isDefined(a) {
    return typeof a == 'undefined';
}