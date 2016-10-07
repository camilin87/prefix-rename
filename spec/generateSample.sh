#!/bin/bash

rm -R -f ./tmp-int
mkdir ./tmp-int
touch ./tmp-int/f1.txt
touch ./tmp-int/f2.txt
touch ./tmp-int/a1.txt
touch ./tmp-int/a2.txt

npm start -- -d ./tmp-int -p f -r z

ls -1a ./tmp-int >> ./tmp-int/_actual.txt

cat <<EOT >> ./tmp-int/_expected.txt
.
..
_actual.txt
a1.txt
a2.txt
z1.txt
z2.txt
EOT

diff ./tmp-int/_expected.txt ./tmp-int/_actual.txt > ./tmp-int/_diff.txt

echo "DifferencesStart"
cat ./tmp-int/_diff.txt
echo "DifferencesEnd"

rm -R -f ./tmp-int
