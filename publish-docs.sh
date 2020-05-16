#!/bin/sh

cd packages/flowjv-builder
npm run export
touch out/.nojekyll
rm -rf ../../docs
mv out ../../docs
git add ../../docs
git commit -m 'PUBLISH DOCS!'
git push origin master
echo "Published Docs!"