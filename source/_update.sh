#!/bin/sh

cat ./js/_Util.js ./js/_core.js > ./js/main.js
sed -i "s/#.*/#$(printf %x $(date +%s))/g" plain.appcache
