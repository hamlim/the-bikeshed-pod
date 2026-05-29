---
name: episode-summary
description: Generate promotional assets for new episodes of The Bikeshed Podcast (bikeshedpod.com) from a VTT or transcript file — produces a recommended title, a short summary, a detailed markdown summary (in a code block), and a tweet-length post matching the show's established format and voice. Use whenever the user uploads podcast captions, a VTT file, or a transcript and asks for an episode summary, title, tweet, show notes, or "episode assets" for The Bikeshed (also called "Bikeshed pod" or "the pod"), even if they don't list every deliverable explicitly.
---

# Bikeshed Episode Assets

Matt co-hosts The Bikeshed Podcast (bikeshedpod.com) with Scott and Dillon. After each recording, he generates four promotional assets from the episode's VTT captions. This skill captures the format and voice he's settled on so the output is ready to publish without much editing.

The four deliverables, in the order he wants them in the response:

1. **Recommended title** — punchy, often coining a hook phrase from the episode itself
2. **Short summary** — 2-4 sentences naming the hosts and the main topic
3. **Tweet** — under 280 characters, ends with `bikeshedpod.com`
4. **Detailed summary** — full markdown, wrapped in a fenced code block so the raw markdown can be copy-pasted

---

## Step 1: Locate and read the captions

The captions are usually uploaded to `/mnt/user-data/uploads/`, typically named `captions.vtt`. If the filename isn't given, list the uploads directory first and pick the obvious transcript file.

VTT files for full episodes can run 1000+ lines. **Read the whole transcript, not just the start** — the title-worthy hook phrase, the side topic that makes the summary feel specific, or the standup beats that give the post personality often live in the middle or end. Use multiple `view` calls with `view_range` to cover the whole file.

## Step 2: Identify the structure of the episode

A typical Bikeshed episode has three structural pieces. Listen for all three as you read:

- **Main topic** — usually a tweet, blog post, PR, or industry debate the hosts react to. Identify the source (who tweeted/wrote it) and the core argument or tension.
- **Side topics** — related rabbit holes the conversation takes. Sometimes these are juicier than the main topic and deserve their own section in the detailed summary.
- **Standup / life updates** — personal beats at the start or end (sports, books, gym, side projects, family). This is part of the show's character; **include it in the detailed summary as its own section**, don't strip it.

When referring to the hosts, use first names: **Matt, Scott, and Dillon** (in that order when listing all three).

## Step 3: Generate the four assets

Output them inline in the chat response — no file creation. Use this exact structure so it copy-pastes cleanly into the publishing flow:

````markdown
## Recommended Title
**[Title]**

## Short Summary
[2-4 sentences]

## Tweet
[Tweet copy ending in bikeshedpod.com]

## Detailed Summary

```markdown
# [Title]

[1-2 sentence framing paragraph]

## [Main topic section]
...

## [Side topic section]
...

## Standup / Life Updates
...
```
````

### Title style

Format: `[Memorable hook]: [Plain-English description]`

The hook usually re-uses a specific phrase the hosts coined or repeated in the episode. Past examples:

- "The 19,000-Line Slopfork: Node.js, Claude Code, and the AI Contribution Crisis"
- "AI Adoption Reality Check: Slop Code, $500K Bills, and the Two People Who Actually Tried"
- "Selling the Increment: PR Scope, Nitpicks, and Token Anxiety"

The hook does the work — it should feel specific to *this* episode, not interchangeable with any other tech podcast. As you read the transcript, watch for terms the hosts emphasize, repeat, or laugh about. Those are usually the strongest hook candidates.

### Short summary style

- Open by naming the hosts ("Matt, Scott, and Dillon...")
- One sentence frames the main topic and the angle
- Optionally one sentence on a meaty side topic
- Optionally a "Plus..." sentence previewing standup beats — this gives the summary personality

Aim for 2-4 sentences total. Punchy beats thorough; the detailed summary is where thoroughness goes.

### Tweet style

- Open with `New episode 🚲` (the bike emoji is a recurring visual motif)
- Hook in plain language, with a hint of voice
- End with `bikeshedpod.com` (no `https://`, no `www.`)
- **Count characters** — must be under 280

### Detailed summary style

This is the meatiest deliverable. It should feel like a thoughtful set of show notes — substantive enough that someone could decide whether to listen based on it alone, tight enough to read in under 90 seconds.

- Wrap the entire detailed summary in a fenced code block with `markdown` as the language so the raw markdown can be copied
- `#` heading matching the recommended title
- 1-2 sentence opening paragraph framing the episode
- `##` section headers for each major topic, with `###` subsections for clean sub-points
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
