#!/bin/bash

rm -R -f ./tmp
mkdir ./tmp
touch ./tmp/f1.txt
touch ./tmp/f2.txt
touch ./tmp/a1.txt
touch ./tmp/a2.txt

npm start -- -d ./tmp -p f -r z

rm -R -f ./tmp
