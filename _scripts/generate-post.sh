#!/bin/bash
# generate-post.sh — Generates the next blog post from the content queue
#
# Runs on: dexterslabserver (Linux)
# Triggered by: n8n cron workflow (Mon/Wed/Fri 6:00 AM PT)
#
# Flow:
#   1. Pull latest main
#   2. Pick next pending topic from _data/content-queue.yml
#   3. Create a branch
#   4. Use Claude CLI to write the markdown post
#   5. Update queue status to "drafted"
#   6. Commit, push, create PR
#
# Requirements:
#   - git, python3, pyyaml, claude CLI, gh CLI
#   - Repo cloned at REPO_DIR with push access

# Ensure ~/.local/bin is in PATH (needed for non-interactive SSH sessions like n8n)
export PATH="/home/d-exe/.local/bin:$PATH"

set -euo pipefail

REPO_DIR="/home/d-exe/TitanCleaningService"
QUEUE_FILE="$REPO_DIR/_data/content-queue.yml"
POSTS_DIR="$REPO_DIR/_posts"
TODAY=$(date +%Y-%m-%d)
GH="/home/d-exe/.local/bin/gh"

cd "$REPO_DIR"
git checkout main
git pull origin main

# ── 1. Find next pending topic ────────────────────────────────────

TOPIC_JSON=$(python3 -c "
import yaml, json, sys
with open('$QUEUE_FILE') as f:
    queue = yaml.safe_load(f)
for item in queue:
    if item['status'] == 'pending':
        print(json.dumps(item))
        sys.exit(0)
print('NONE')
sys.exit(0)
")

if [ "$TOPIC_JSON" = "NONE" ]; then
    echo "$(date): No pending topics in queue. Exiting."
    exit 0
fi

# Parse topic fields
SLUG=$(echo "$TOPIC_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['slug'])")
TITLE=$(echo "$TOPIC_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['title'])")
KEYWORD=$(echo "$TOPIC_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['target_keyword'])")
CLUSTER=$(echo "$TOPIC_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['cluster'])")
TAGS_YAML=$(echo "$TOPIC_JSON" | python3 -c "
import json, sys
tags = json.load(sys.stdin)['tags']
for t in tags:
    print(f'  - {t}')
")
BRIEF=$(echo "$TOPIC_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin)['brief'])")

BRANCH="blog/${TODAY}-${SLUG}"
POST_FILE="${POSTS_DIR}/${TODAY}-${SLUG}.md"

echo "$(date): Generating post — ${TITLE}"
echo "  Slug: ${SLUG}"
echo "  Keyword: ${KEYWORD}"
echo "  Branch: ${BRANCH}"

# ── 2. Create branch ──────────────────────────────────────────────

git checkout -b "$BRANCH"

# ── 3. Generate post with Claude CLI ──────────────────────────────

cat <<PROMPT_EOF | claude -p --output-format text --tools "" > "$POST_FILE"
You are writing a blog post for Titan Cleaning Service (titancleaningservice.ca), a professional carpet and cleaning company in Victoria, BC, Vancouver Island. Owner: Joanne Michaels. Phone: (250) 710-5244. Email: info@titancleaningservice.ca.

Write a complete blog post in Jekyll markdown format. Output ONLY the markdown file content (front matter + body), nothing else.

Start with this EXACT front matter:

---
title: "${TITLE}"
description: "[Write a compelling 150-160 character meta description targeting: ${KEYWORD}]"
date: ${TODAY}
author: "Titan Cleaning Service"
image: /images/hero/pristine-living-room.webp
tags:
${TAGS_YAML}
---

Then write the blog post body. Content brief:

${BRIEF}

Writing requirements:
- 800-1200 words, conversational but authoritative tone
- Use Canadian English spelling (colour, favourite, metre, fibre, etc.)
- Include the target keyword '${KEYWORD}' naturally 3-5 times
- Use H2 (##) and H3 (###) headings for clear structure
- Include 2-3 internal links to relevant pages:
  - Service pages: /services/carpet-cleaning.html, /services/upholstery-cleaning.html, /services/tile-grout-cleaning.html, /services/mattress-cleaning.html, /services/pressure-washing.html, /services/floor-waxing-and-stripping.html
  - Pricing: /pricing.html
  - Areas: /areas-we-serve/, /areas-we-serve/victoria.html, /areas-we-serve/langford.html, etc.
  - Contact: /contact.html
- End with a clear CTA section: link to /contact.html for free quote + phone (250) 710-5244
- Write for real homeowners, not search engines. Be helpful, specific, and practical.
- Reference Victoria/Vancouver Island climate and local context where relevant
- Do NOT wrap the output in markdown code fences — output raw markdown only
PROMPT_EOF

# Verify the file was created and has content
if [ ! -s "$POST_FILE" ]; then
    echo "$(date): ERROR — Post file is empty or missing. Aborting."
    git checkout main
    git branch -D "$BRANCH"
    exit 1
fi

echo "$(date): Post generated — $(wc -w < "$POST_FILE") words"

# ── 4. Update queue status ────────────────────────────────────────

python3 -c "
import yaml
with open('$QUEUE_FILE') as f:
    queue = yaml.safe_load(f)
for item in queue:
    if item['slug'] == '${SLUG}':
        item['status'] = 'drafted'
        item['publish_date'] = '${TODAY}'
        break
with open('$QUEUE_FILE', 'w') as f:
    yaml.dump(queue, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
"

# ── 5. Commit and push ───────────────────────────────────────────

git add "$POST_FILE" "$QUEUE_FILE"
git commit -m "Add blog post: ${TITLE}"
git push -u origin "$BRANCH"

# ── 6. Create PR ─────────────────────────────────────────────────

$GH pr create \
    --title "Blog: ${TITLE}" \
    --body "$(cat <<EOF
## New Blog Post

**Topic:** ${TITLE}
**Target Keyword:** \`${KEYWORD}\`
**Cluster:** ${CLUSTER}
**Word count:** $(wc -w < "$POST_FILE")

### Preview
The post will go live at: \`/blog/${SLUG}.html\`

### Checklist
- [ ] Content is accurate and helpful
- [ ] Canadian English spelling
- [ ] Internal links work
- [ ] CTA is clear

---
*Auto-generated by the Titan blog content pipeline*
EOF
)"

# ── 7. Clean up ──────────────────────────────────────────────────

git checkout main

echo "$(date): Done — PR created for '${TITLE}'"
