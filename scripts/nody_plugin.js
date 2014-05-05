var Plugin = {
   _loaded: {}
};

function ndPlugin(name, varname) {
   if (Plugin._loaded[name] === undefined) {
      include('plugin/' + name);
      Plugin._loaded[name] = true;
   }

   eval(name + '_init.apply(this,arguments);');
}