'use strict'

var fs = require('fs');

util.getFileSize = function(location) {
    var size;
    var st = fs.statSync(location);
    if (st == null) {
        return 0;
    }

    var sizeM = st.size / 1.0e6
    size = sizeM + 'MB';
    if (sizeM > 1024.0) {
        size = sizeM / 1024.0 + 'GB';
    }
    return size;
}

// http://stackoverflow.com/a/105074/1232796
util.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
