#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd $SCRIPT_ROOT/..

API_DOC_OUTPUT_DIR=doc/sc/api
SRC_DIR=lib

rm -rf $API_DOC_OUTPUT_DIR

# check if any files in src is not stashed in git
if [[ -n $(git status --porcelain $SRC_DIR) ]]; then
    echo "Error: You have unstaged changes. Please commit or stash them before generating API docs."
    exit 1
fi

npx typedoc \
    --out api \
    --readme none \
    --name "Documents for @maiyunnet/kebab" \
    --hostedBaseUrl "https://maiyunnet.github.io/kebab/" \
    --plugin typedoc-plugin-markdown \
#    --plugin typedoc-vitepress-theme \
    --sourceLinkTemplate "https://github.com/maiyunnet/kebab/blob/master/{path}#L{line}" \
    $SRC_DIR/*.ts \
    $SRC_DIR/db/*.ts \
    $SRC_DIR/net/*.ts \
    $SRC_DIR/ssh/*.ts

mkdir -p $(dirname $API_DOC_OUTPUT_DIR)
mv api $API_DOC_OUTPUT_DIR
