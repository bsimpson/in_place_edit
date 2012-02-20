#!/bin/bash

SRCDIR="src"
OUTFILE="${SRCDIR}/in_place_edit.min.js"

NODE=$(which node)
if [ $? -eq 1 ]; then
	echo "Node.js is required."
	exit 1
fi

UGLIFYJS=$(which uglifyjs) # `npm -g install uglify-js`
if [ $? -eq 1 ]; then
	echo "Uglify-js is required:"
	echo "npm -g install uglify-js"
	exit 1
fi

${UGLIFYJS} -o ${OUTFILE}.tmp -nc ${SRCDIR}/in_place_edit.js
cat ${SRCDIR}/license.txt ${OUTFILE}.tmp > ${OUTFILE}
rm ${OUTFILE}.tmp