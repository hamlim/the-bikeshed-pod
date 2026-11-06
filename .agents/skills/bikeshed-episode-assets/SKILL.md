---
name: bikeshed-episode-assets
description: Generate promotional assets for new episodes of The Bikeshed Podcast (bikeshedpod.com) from a VTT or transcript file — produces a recommended title, a short summary, a tweet-length post, a list of episode tags, and a detailed markdown summary (in a code block) matching the show's established format and voice. Use whenever the user uploads podcast captions, a VTT file, or a transcript and asks for an episode summary, title, tweet, tags, show notes, or "episode assets" for The Bikeshed (also called "Bikeshed pod" or "the pod"), even if they don't list every deliverable explicitly.
---

# Bikeshed Episode Assets

Matt co-hosts The Bikeshed Podcast (bikeshedpod.com) with Scott and Dillon. After each recording, he generates a set of promotional assets from the episode's VTT captions. This skill captures the format and voice he's settled on so the output is ready to publish without much editing.

The five deliverables, in the order he wants them in the response:

1. **Recommended title** — punchy, ~5 words, often coining a hook phrase from the episode itself
2. **Short summary** — 2-4 sentences naming the hosts (with Matt listed last) and the main topic
3. **Tweet** — under 280 characters
4. **Tags** — a handful of lowercase, hyphenated topic tags, shared as a plain list
5. **Detailed summary** — full markdown starting with `## Summary`, wrapped in a fenced code block so the raw markdown can be copy-pasted

---

## Step 1: Locate and read the captions

The captions are usually uploaded to `/mnt/user-data/uploads/`, typically named `captions.vtt`. If the filename isn't given, list the uploads directory first and pick the obvious transcript file.

VTT files for full episodes can run 1000+ lines. **Read the whole transcript, not just the start** — the title-worthy hook phrase, the side topic that makes the summary feel specific, or the standup beats that give the post personality often live in the middle or end. Use multiple `view` calls with `view_range` to cover the whole file.

## Step 2: Identify the structure of the episode

A typical Bikeshed episode has three structural pieces. Listen for all three as you read:

- **Main topic** — usually a tweet, blog post, PR, or industry debate the hosts react to. Identify the source (who tweeted/wrote it) and the core argument or tension.
- **Side topics** — related rabbit holes the conversation takes. Sometimes these are juicier than the main topic and deserve their own section in the detailed summary.
- **Standup / life updates** — personal beats at the start or end (sports, books, gym, side projects, family). This is part of the show's character; **include it in the detailed summary as its own section**, don't strip it.

When referring to the hosts, use first names: **Matt, Scott, and Dillon**. In the **short summary** specifically, list **Matt last** (e.g., "Scott, Dillon, and Matt...") — see the short summary style below.

## Step 3: Generate the five assets

Output them inline in the chat response — no file creation. Use this exact structure so it copy-pastes cleanly into the publishing flow:

````markdown
## Recommended Title
**[Title]**

## Short Summary
[2-4 sentences, Matt listed last]

## Tweet
[Tweet copy]

## Tags
[lowercase-hyphenated-tag]
[another-tag]
[and-so-on]

## Detailed Summary

```markdown
## Summary

[1-2 sentence framing paragraph — do NOT restate the title or short summary]

### [Main topic section]
...

### [Side topic section]
...

### Standup / Life Updates
...
```
````

### Title style

Aim for roughly **5 words** — sometimes shorter, and try not to exceed **8 words**. A single punchy hook phrase usually does the work better than a long descriptive title.

The hook should re-use a specific phrase the hosts coined, repeated, or laughed about in the episode — something that feels specific to *this* episode, not interchangeable with any other tech podcast. Past episodes leaned on hooks like:

- "The 19,000-Line Slopfork"
- "AI Adoption Reality Check"
- "Selling the Increment"

(These ran longer in the past with a trailing `: [plain-English description]`; going forward, keep it to the tight hook and drop the long descriptive tail.)

As you read the transcript, watch for terms the hosts emphasize, repeat, or laugh about. Those are usually the strongest hook candidates.

### Short summary style

- Open by naming the hosts, with **Matt listed last** ("Scott, Dillon, and Matt...")
- One sentence frames the main topic and the angle
- Optionally one sentence on a meaty side topic
- Optionally a "Plus..." sentence previewing standup beats — this gives the summary personality

Aim for 2-4 sentences total. Punchy beats thorough; the detailed summary is where thoroughness goes.

### Tweet style

- Open with `New episode 🚲` (the bike emoji is a recurring visual motif)
- Hook in plain language, with a hint of voice
- Don't append the `bikeshedpod.com` URL — leave it out of the tweet copy
- **Count characters** — must be under 280

### Tags style

A handful of topic tags (aim for ~5-8) that categorize the episode for the publishing flow.

- All **lowercase**, words separated by `-` (hyphens) instead of spaces, with **no punctuation** (e.g., `ai-agents`, `open-source-governance`, `node-js`, `frontend-tooling`)
- Draw them from the episode's actual topics — the main topic, meaty side topics, and recurring themes
- Present them as a **plain list, one tag per line, with no bullets and no code fence**, so they're trivial to copy straight into the episode file

### Detailed summary style

This is the meatiest deliverable. It should feel like a thoughtful set of show notes — substantive enough that someone could decide whether to listen based on it alone, tight enough to read in under 90 seconds.

- Wrap the entire detailed summary in a fenced code block with `markdown` as the language so the raw markdown can be copied
- Lead with a `## Summary` heading — **do not** add a `#` title heading, and **never restate the recommended title or the short summary**
- Under `## Summary`, a 1-2 sentence opening paragraph framing the episode (fresh framing, not a rehash of the short summary)
- `###` section headers for each major topic and for the standup section
- **Bold** key terms, names, and concepts (DCO, virtual file system, RSC, slopfork) — it scans well and signals what matters
- Quote or paraphrase specific moments when they add flavor (e.g., *Matteo's response: "I made all the decisions, I fixed the AI's mistakes, it's still my code."*)
- Include the standup/life updates as their own section, usually at the end — that's part of the show

## Voice notes

The Bikeshed is technical but conversational. Match that:

- Substantive on the tech (AI agents, runtimes, OSS governance, frontend tooling, build systems) without being dry
- Don't editorialize beyond what the hosts say — your job is to summarize *their* take, not add your own
- A little wit is welcome; the show has a sense of humor

## After delivering

Don't pile on alternatives unprompted. If the title or tweet feels borderline, offer one alternative angle. Otherwise, deliver the draft and let Matt ask for tweaks.
