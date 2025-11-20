#!/usr/bin/env bash
SCRIPT_ROOT=$(cd $(dirname $0); pwd)

cd $SCRIPT_ROOT/..

API_DOC_OUTPUT_DIR=doc/sc/api

rm -rf $API_DOC_OUTPUT_DIR
rm -f doc/sc/kebab-rag.md

# check if any files in src is not stashed in git
if [[ -n $(git status --porcelain "./index.ts" "./main.ts" "./lib" "./sys") ]]; then
    echo "Error: You have unstaged changes. Please commit or stash them before generating API docs."
    exit 1
fi

mkdir -p $(dirname $API_DOC_OUTPUT_DIR)

npx typedoc \
  --entryPoints "index.ts" "main.ts" "lib/**/*.ts" "sys/{ctr,mod,route}.ts" \
  --exclude "**/*.d.ts" \
  --out $API_DOC_OUTPUT_DIR \
  --readme none \
  --name "Documents for @maiyunnet/kebab" \
  --hostedBaseUrl "https://maiyunnet.github.io/kebab/" \
  --plugin typedoc-plugin-markdown \
  --sourceLinkTemplate "https://github.com/maiyunnet/kebab/blob/master/{path}#L{line}" \
  --entryFileName "index"

# --- 去除前导尾随 ---

find $API_DOC_OUTPUT_DIR -name "*.md" -type f | while read file; do
    sed -i 's/^--- *//; s/ *---$//' "$file"
done

# --- 定义额外的单文件列表 ---
# extra_files=("doc/sc/quick-start.md" "doc/sc/another-single.md")
extra_files=("doc/sc/quick-start.md")

# --- 处理单文件 ---
for f in "${extra_files[@]}"; do
  if [ -f "$f" ]; then
    # --- 去掉路径和 .md ---
    # filename=$(basename "$f" .md)
    filename=$(basename "$f")
    printf "\n%s\n---\n\n" "$filename" >> "doc/sc/kebab-rag.md"
    cat "$f" >> "doc/sc/kebab-rag.md"
  fi
done

# --- 合并所有 md 成一个文件，保留模块标题 ---
find "$API_DOC_OUTPUT_DIR" -name "*.md" | sort | while read file; do
  # --- 计算相对路径（相对于 API_DOC_OUTPUT_DIR） ---
  relpath="${file#$API_DOC_OUTPUT_DIR/}"
  # --- 去掉 .md 扩展名 ---
  # module_name="${relpath%.md}"

  # printf "\n%s\n---\n\n" "$module_name" >> "doc/sc/kebab-rag.md"
  printf "\n%s\n---\n\n" "$relpath" >> "doc/sc/kebab-rag.md"
  cat "$file" >> "doc/sc/kebab-rag.md"
done