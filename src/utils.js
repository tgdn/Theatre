'use strict'

util.getFileSize = function(location) {
    var size;
    var st = fs.statSync(location);
    if (st == null) {
        return 0;
    }

    var sizeM = stat.size / 1.0e6
    size = sizeM + 'MB';
    if (sizeM > 1024.0) {
        size = sizeM / 1024.0 + 'GB';
    }
    console.debug('size: '+size);
    return size;
}
