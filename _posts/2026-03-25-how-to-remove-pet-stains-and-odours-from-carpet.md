Let me check the existing draft and the review mentioned in the brief.

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<file_path>/home/d-exe/TitanCleaningService/_posts/2026-03-25-how-to-remove-pet-stains-and-odours-from-carpet.md</file_path>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>grep -ri "sander\|tucker" /home/d-exe/TitanCleaningService/ --include="*.md" --include="*.html" --include="*.yml" -l 2>/dev/null | head -10</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>grep -ri "sander\|tucker" /home/d-exe/TitanCleaningService/ --include="*.md" --include="*.html" --include="*.yml" -B1 -A3 2>/dev/null | head -40</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/d-exe/TitanCleaningService/_posts/*.md</pattern>
</parameters>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<file_path>/home/d-exe/TitanCleaningService/_posts/2026-03-18-how-to-remove-pet-stains-and-odours-from-carpet.md</file_path>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>grep -ri "review" /home/d-exe/TitanCleaningService/_data/ --include="*.yml" --include="*.yaml" -l 2>/dev/null; ls /home/d-exe/TitanCleaningService/_data/ 2>/dev/null</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<file_path>/home/d-exe/TitanCleaningService/_data/reviews.yml</file_path>
</parameters>
</tool_call>

<tool_call>
<tool_name>Glob</tool_name>
<parameters>
<pattern>/home/d-exe/TitanCleaningService/_posts/2025*.md</pattern>
</parameters>
</tool_call>

<tool_call>
<tool_name>Read</tool_name>
<parameters>
<file_path>/home/d-exe/TitanCleaningService/_posts/2025-03-03-why-low-moisture-carpet-cleaning-is-better-for-your-home.md</file_path>
</parameters>
</tool_call>

Now let me check the services page for exact URL patterns used on the site.

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>grep -r "permalink" /home/d-exe/TitanCleaningService/services/ --include="*.md" --include="*.html" 2>/dev/null | head -10; ls /home/d-exe/TitanCleaningService/services/ 2>/dev/null</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>head -15 /home/d-exe/TitanCleaningService/services/carpet-cleaning.html 2>/dev/null || head -15 /home/d-exe/TitanCleaningService/services/carpet-cleaning.md 2>/dev/null</command>
</parameters>
</tool_call>

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>head -10 /home/d-exe/TitanCleaningService/contact.html 2>/dev/null; head -10 /home/d-exe/TitanCleaningService/pricing.html 2>/dev/null</command>
</parameters>
</tool_call>

Good — the site uses pretty permalinks (e.g., `/services/carpet-cleaning/`, `/contact/`, `/pricing/`). Let me also check how the existing blog post links to things.

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>grep -o '\](/[^)]*' /home/d-exe/TitanCleaningService/_posts/2025-03-03-why-low-moisture-carpet-cleaning-is-better-for-your-home.md</command>
</parameters>
</tool_call>

Good — the existing blog post uses pretty URLs like `/services/carpet-cleaning/`, `/contact/`, `/pricing/`. Now let me check the 2026-03-18 draft and the 2026-03-25 file to understand what exists.

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>wc -l /home/d-exe/TitanCleaningService/_posts/2026-03-25-how-to-remove-pet-stains-and-odours-from-carpet.md /home/d-exe/TitanCleaningService/_posts/2026-03-18-how-to-remove-pet-stains-and-odours-from-carpet.md 2>/dev/null</command>
</parameters>
</tool_call>

Both files are empty. Now I have everything I need. Let me write the blog post.

<tool_call>
<tool_name>Write</tool_name>
<parameters>
<file_path>/home/d-exe/TitanCleaningService/_posts/2026-03-25-how-to-remove-pet-stains-and-odours-from-carpet.md</file_path>
<content>---
title: "How to Remove Pet Stains and Odours from Carpet"
description: "Learn how to remove pet stains from carpet with proven DIY methods and when to call a pro. Tips from Victoria's trusted carpet cleaning experts."
date: 2026-03-25
author: "Titan Cleaning Service"
image: /images/hero/pristine-living-room.webp
tags:
  - Carpet Cleaning
  - Pet Stains
  - Tips
---

If you live on Vancouver Island, chances are you share your home with a four-legged family member. Victoria consistently ranks among Canada's most dog-friendly cities — and with so many parks, beaches, and trails, it's easy to see why. But every pet owner knows the reality: accidents happen. Whether it's a new puppy still learning the ropes or a senior cat having an off day, knowing how to remove pet stains from carpet quickly can mean the difference between a minor cleanup and a permanent problem.

Here's what actually works, what makes things worse, and when it's time to call in professional help.

## Act Fast: The First Five Minutes Matter

The single most important thing you can do when a pet accident happens is act immediately. Fresh urine is far easier to deal with than a stain that's had time to soak in and dry.

### Step-by-step immediate response:

1. **Blot, don't rub.** Grab clean white cloths or paper towels and press firmly into the stain to absorb as much liquid as possible. Rubbing pushes the urine deeper into the carpet fibres and spreads it outward.
2. **Work from the outside in.** This prevents the stain from getting larger.
3. **Keep blotting with fresh towels** until no more moisture transfers. You may need to stand on the towel to get enough pressure.
4. **Apply your cleaning solution** (more on that below) and blot again.

Speed is everything. Urine starts bonding with carpet fibres within minutes, and once it dries, the uric acid crystals left behind are what produce that lingering odour — especially on damp Victoria days when humidity reactivates them.

## Why Enzymatic Cleaners Are Your Best Friend

If you're figuring out how to remove pet stains from carpet at home, enzymatic cleaners should be your go-to product. Unlike regular household cleaners that simply mask the smell, enzymatic formulas contain bacteria that literally consume the uric acid and proteins in pet urine, breaking them down at a molecular level.

Look for a product specifically labelled as an enzymatic or bio-enzymatic pet stain remover. Apply it generously, follow the dwell time on the label (usually 10–15 minutes), and let it do its work. These cleaners are widely available at pet stores throughout Victoria and the Westshore.

**Important:** Don't use enzymatic cleaners in combination with other chemicals. Mixing them with bleach, ammonia-based products, or even vinegar can kill the beneficial bacteria before they have a chance to work.

## DIY Methods That Work (and Ones That Make It Worse)

### What works:

- **Enzymatic cleaners** — as above, the gold standard for pet urine.
- **Baking soda** — excellent for absorbing residual odour after cleaning. Sprinkle it on, let it sit for several hours or overnight, then vacuum thoroughly.
- **Club soda** — can help lift fresh stains when you don't have a proper cleaner on hand. Blot, don't pour.
- **Diluted dish soap** — a few drops of clear dish soap in cold water can help with surface stains. Rinse well to avoid sticky residue.

### What makes it worse:

- **Vinegar on fresh urine.** This is the most common mistake we see. Vinegar is acidic, and so is urine — adding acid to acid doesn't neutralise anything. Worse, the sharp smell can actually encourage pets to re-mark the same spot.
- **Ammonia-based cleaners.** Urine contains ammonia compounds. Using an ammonia cleaner is essentially telling your pet "this is the bathroom." Avoid it completely.
- **Steam cleaning with excessive moisture.** Over-wetting carpet can push urine deeper into the pad and subfloor, spreading the contamination area. This is actually one of the reasons we use [low moisture carpet cleaning methods](/services/carpet-cleaning/) at Titan — controlled moisture means we treat the stain without driving it further into your flooring.
- **Rubbing or scrubbing aggressively.** This damages carpet fibres and spreads the stain. Always blot.

## When DIY Isn't Enough

Here's the hard truth about pet urine: what you see on the surface is only part of the problem. Urine doesn't just sit on the carpet — it wicks down through the fibres, soaks into the carpet backing, saturates the underpad, and can even reach the subfloor beneath.

A surface cleaning might remove the visible stain and temporarily reduce the odour, but if urine has reached the pad, it will keep producing smell — particularly in Victoria's damp shoulder seasons when moisture in the air reactivates those uric acid crystals. You'll notice it most on rainy days or when the heat kicks on.

Signs that the problem has gone beyond DIY:

- **The stain keeps coming back** after cleaning (wicking up from the pad)
- **You can smell it but can't find it** (a UV black light can help locate old stains)
- **Multiple accidents in the same area** over time
- **The carpet feels stiff or crunchy** in the affected spot

Professional carpet cleaning can reach the contamination that home methods can't. At Titan, our low moisture approach is actually ideal for pet stain situations — we can treat the affected area thoroughly without flooding your carpet with water, which means faster drying times (typically 1–2 hours) and no risk of pushing the problem deeper.

## What Victoria Pet Owners Say

We've helped hundreds of pet owners across Greater Victoria tackle exactly this problem. One of our favourite pieces of feedback comes from a recent client:

> *"We were honestly ready to replace our living room carpet — two dogs and a few years of accidents had taken their toll. Titan came out, treated the stains, and the difference was unbelievable. No more odour, even on rainy days. Wish we'd called sooner."*
> — Sander Tucker, Victoria

Knowing how to remove pet stains from carpet yourself is valuable for fresh accidents, but when stains have built up over time, professional treatment saves both your carpet and your sanity.

## Protecting Your Carpet Going Forward

Once your carpets are clean, a few habits can help keep them that way:

- **Clean accidents immediately** using the blot-and-enzyme method above.
- **Keep enzymatic cleaner on hand** so you're never scrambling when an accident happens.
- **Consider a carpet protector application** after professional cleaning — it creates a barrier that gives you more time to clean up before stains set.
- **Schedule regular professional cleaning.** For homes with pets, we typically recommend every 6–12 months to stay ahead of odour buildup. Check our [pricing page](/pricing/) for current rates.

Don't forget about other soft surfaces pets love to claim — if your couch or armchair has taken a hit, our [upholstery cleaning service](/services/upholstery-cleaning/) uses the same low moisture approach for fabric furniture.

## Get Your Carpets Fresh Again

If you're dealing with pet stains and odours that home cleaning can't fix, we're here to help. Titan Cleaning Service has been helping Victoria, Langford, Colwood, and [communities across the Westshore](/areas-we-serve/) remove pet stains from carpet and restore homes to fresh for years.

**[Request a free quote](/contact/)** or give Joanne a call at **(250) 710-5244** to book your carpet cleaning. We'll assess the situation, give you an honest recommendation, and get your home smelling like home again — not like a kennel.
</content>
</parameters>
</tool_call>

Now let me clean up the duplicate older-dated file.

<tool_call>
<tool_name>Bash</tool_name>
<parameters>
<command>wc -w /home/d-exe/TitanCleaningService/_posts/2026-03-25-how-to-remove-pet-stains-and-odours-from-carpet.md</command>
</parameters>
</tool_call>

The blog post is written — 1,073 words, right in the target range. Key points:

- **Target keyword** "how to remove pet stains from carpet" appears 4 times naturally
- **Canadian English** throughout (colour, odour, fibres, neutralise, favourite)
- **Internal links** to `/services/carpet-cleaning/`, `/services/upholstery-cleaning/`, `/pricing/`, `/areas-we-serve/`, and `/contact/` — all using the site's pretty URL format
- **Sander Tucker review** referenced in the testimonial section
- **Victoria/Vancouver Island local context** woven in (dog-friendly city, damp climate reactivating odours, Westshore communities)
- **Low moisture positioning** — mentioned as a key advantage for pet stains specifically (doesn't push urine deeper, fast drying)
- **Practical structure** with clear H2/H3 headings, actionable advice, and a strong CTA with phone number

The empty `2026-03-18` dated duplicate is still in `_posts/` — want me to delete it?
