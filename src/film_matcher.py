#!/usr/bin/env python

import sys
import os
import json

accepted_ext = ['.avi', '.mp4', '.mpg', '.ogg', '.mkv'];

args = sys.argv
args.pop(0)

if len(args) == 0:
    sys.exit(0)

dirs = [ { 'path': d, 'count': 0 } for d in args ]
films = []

def check_file(filename):
    ext = os.path.splitext(filename)[1]

    if ext not in accepted_ext:
        return False

    return True

for i, location in enumerate(dirs):
    for dirpath, dirnames, filenames in os.walk(location['path']):
        for filepath in [f for f in filenames if check_file(f)]:
            dirs[i]['count'] = dirs[i]['count'] + 1
            films.append( os.path.abspath(os.path.join(dirpath, filepath)) )

# return json
# sys.stdout.write( json.dumps(str( {'films': films, 'dirs': dirs} )) )
sys.stdout.write(json.dumps({'films': films, 'dirs': dirs}))
