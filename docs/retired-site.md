# The site before the Intro / Work / Art reduction

Everything here describes pages that are **no longer published**. They live in
`_old/retired-pages/`, which Jekyll's underscore rule keeps off the live site,
and their URLs serve 404 by deliberate choice.

Kept because the reasoning was expensive to arrive at and would have to be
re-derived from scratch if any of this comes back. **Nothing in this file
describes the current site** — for that, read `CLAUDE.md`.

Retired: `/principles/`, `/digital-transformation/`, `/cea/`, `/ipcc/`,
`/appearances/`, `/publications/`, `/music/`, `/photography/`, and the
`/open-source/` redirect stub. `/music/` and `/photography/` were merged into
`/art/`, which is live — its copy keys (`v2.music.*`, `v2.photo.*`) survived
the prune.

The 152 i18n keys these pages used were deleted from `i18n.js` in the same
commit. `git log -- i18n.js` has them.

---

## ⚠ Case studies must mirror the home page

Each case-study page closes with an **Outcome / Impact** pair. The home
page's Key enterprise outcomes render the **Impact half of the same keys** —
not a copy, the same string:

| Page | Home outcome | Case study renders | Home page renders |
|---|---|---|---|
| `/digital-transformation/` | 01 | `about.out1.outcome` + `about.out1.impact` | `about.out1.impact` |
| `/cea/` | 02 | `about.out2.outcome` + `about.out2.impact` | `about.out2.impact` |
| `/ipcc/` | 03 | `about.out3.outcome` + `about.out3.impact` | `about.out3.impact` |

⚠ **Keep the short claims aligned to the careful long one, not the reverse.**
`ipcc.cs3` is precise: scenarios were *submitted to the IPCC panel, which
aggregated them with those of more than 15 other selected teams and
published the averaged projections*. `about.out3.impact` had drifted to
"informing worldwide environmental policy since 2021" — a much bigger claim
in a more prominent place — and the outcome title to "contribution to global
policy". Both were pulled back to the aggregation wording. The short,
prominent version is the one a reader checks first; it must be the most
conservative, not the most flattering.

**The word "Insights" is gone for the same reason.** "Insights for the IPCC"
and "Insights for IPCC" can be read as authorship of the report. The page is
now **"Data and models contributed to the IPCC 6th Assessment Report"**
(`v2.ipcc.title`, `v2.about.out3.title`, `ipcc.title`, and the static
`og:title`/`twitter:title` on `ipcc/index.html`), with the short form
**"Contribution to the IPCC"** in the sidebar (`nav.openSource`) where the
full phrase will not fit 240px. German: *"Zum 6. IPCC-Sachstandsbericht
beigesteuerte Daten und Modelle"* / *"Beitrag zum IPCC"*. The key is still
called `nav.openSource` — it dates from when the page lived at
`/open-source/`; do not rename it, nothing gains from the churn.

Editing an `.impact` key updates the home page and the case study together,
which is the point — a headhunter who reads the summary on the home page
and then opens the case study must not find two different claims.
**Never fork these into page-specific keys.**

The home page deliberately shows **Impact only, unlabelled**, so all three
of its sections read the same way: title, one paragraph, optional link. The
`.outcome` strings are the concrete "what was built" detail and live on the
case study, which is what the "See case study →" link is for.

**Nothing is labelled any more, on either surface.** The case studies used
to print an `OUTCOME` / `IMPACT` mono sub-label above each of the two
paragraphs in the final chapter; those are gone, and the keys that held them
(`v2.about.outcome.label`, `v2.about.impact.label`) were deleted as orphans —
they rendered nowhere else. The `.cs-result` hairline between the two
paragraphs stays, and is now what separates them. `.cs-result-key` went from
`style.css` with the markup.

This is the same call the home page got earlier: one section heading, then
prose. A sub-label directly under a heading that says nearly the same word
("The Outcome" over "OUTCOME") is noise, and labelling one paragraph makes
the reader look for the label on the next.

### ⚠ Employer financials are off the site, deliberately

**Never restore Axpo revenue figures.** The impact line for outcome 01 used
to read "secured CHF 30m in at-risk business and launched CHF 1.5m in
net-new digital services", and the case-study stat band led with
"&gt;30 mCHF revenue secured". Both were removed: they are **Axpo's P&L** —
revenue at risk, new revenue booked — published by an employee on a site
whose video makes the employer unmistakable.

The distinction that governs this:

| Keep | Cut |
|---|---|
| `about.proof2` — "a multi-million CHF budget". Budget **scope is your own authority**, standard executive-CV material, and says nothing about the employer's commercial performance. | Anything describing revenue, margin, pipeline or business won/at risk. |

**Method is as sensitive as outcome.** `transf.cs2` used to say "new
technological services were introduced at a deliberately low margin until
their value was visible" — Axpo's internal pricing strategy, stated in the
past tense as something the employer did. Arguably worse than the revenue
figures, because it is *how they price*, not *what they earned*.

The test: *"I do X"* is a position. *"We did X at Axpo"* is disclosure.

**The low-margin framing is gone from the site entirely**, including from
principle 05 where it had survived in the first person. It read as a pricing
trick rather than a leadership position — cheap, and faintly manipulative.
Principle 05 now argues the honest version of the same insight: *make the
value visible before asking for the budget*, because value demonstrated in
use argues better than a business case. **Do not reintroduce margin or
pricing language anywhere**, in either voice.

**The principles name no employer.** `about.p8` used to say "why we lead our
field at Axpo"; it now says "why the teams I lead set the pace in their
field". `/principles/` is the page most likely to be read as general
position rather than reportage, so keeping the employer out of it removes
the antecedent that made neighbouring paragraphs — the balance-sheet
observation in 05, "the organisation does the work wrong today" in 03 — read
as being about a specific company.

**Name the issuing body on every credential.** The short bio said "a
certified Agile Practitioner" with no issuer for as long as it existed — the
exact kind of unattributed claim a search consultant probes. It is now "a
PMI Agile Certified Practitioner (PMI-ACP)" in English and "PMI Agile
Certified Practitioner (PMI-ACP)" in German; the credential is a proper
noun, so it stays in English on the German page, as is normal in German CVs.
If a credential cannot be attributed, cut it — next to the ETH doctorate and
CIGRE membership an unverifiable certification is a net negative.

**Never describe the role as running a "department" / "Abteilung".** The
word was removed from every string in both languages — the bio, Proof of
scale, principles 01 and 02, the Axpo case study and its `og:`/`twitter:`
description. Jimeno is positioning for a larger remit, and "built the
Digital Engineering department" reads smaller than "built Digital
Engineering". `v2.role` and the JSON-LD `jobTitle` ("Head of Digital
Engineering") already carry the seniority; naming the unit only caps it.

**Do not overclaim seniority either.** `v2.about.proof2.label` read "Budget
and P&L oversight". Managing a budget is not owning a profit-and-loss
statement, and it is one of the standard things a search consultant probes
to test whether a technology leader is genuinely commercial. It now reads
"Budget ownership".

**Proof of scale carries magnitude, not figures.** `about.proof1` and
`about.proof2` used to read "from zero to 20 engineers and application
managers" and "a budget of CHF 10m". Both are now bands — "a full team of
engineers and application managers", "a multi-million CHF budget" — because
Jimeno does not want exact numbers findable online, even ones that are his
own authority rather than the employer's performance.

⚠ **Know the cost of this.** The section is called *Proof of scale*, and a
number is what makes something proof. Items 1 and 2 now carry none; only
item 3's "75+ countries" survives, and that is City Energy Analyst — his own
open-source project, not employer data. If the section ever reads thin, that
is why.

Prefer "a multi-million CHF budget" over shorthand like "CHF MM+": MM is
American banking usage that most readers, and most German speakers, will
take for a typo.

The transformation claim is what reads CDIO; the number never was. Magnitude
is kept the safe way: the impact line ends "a protected, multi-million CHF
service line" — a band, not a booked figure. Other phrasings in the same
register: "an eight-figure portfolio". **Never a number tied to Axpo's
results.**

The stat band follows the same test. It led with "400 Stakeholders", a
headcount that says nothing about what changed; it now reads "40+ business
processes digitised" and "20+ teams" — scope of change and organisational
reach, both the author's own work rather than the employer's performance.
The body of `transf.cs3` used to keep "a group of 400 stakeholders" on the
grounds that a sentence gives a figure context where a stat box does not.
**That call was reversed.** It now reads "several hundred stakeholders":
context does not stop it being an internal headcount, and the same
magnitude-without-figures rule that governs Proof of scale applies to prose.

Three more employer-financial statements came off the case study in the same
pass. All three had survived the earlier revenue sweep because none of them
carried a number:

| Was | Now | Why |
|---|---|---|
| `v2.about.out1.title` "— from OPEX to revenue-generating value" | "— from cost line to core capability" | Asserted the unit generates revenue. Renders on the **home page** as well as the case study, so it was the most prominent employer-financial claim on the site. |
| `v2.transf.lede` / `transf.desc` "from an OPEX liability into protected core value" | "made digital engineering a protected core capability" | Classified a named business unit on the employer's books. `transf.desc` is also the share-card description, so it travelled off-site. |
| `transf.cs1` "a critical, margin-improving service" | "a critical service" | Margin. |
| `transf.cs3` "with a team built overseas to sustain delivery" | "to own and sustain them" | Stated offshored delivery as fact about a Swiss utility — works-council sensitivity. The rewrite keeps the maintenance point the clause was making. |

⚠ **A claim with no number in it can still be disclosure.** That is the
lesson of this pass: "revenue-generating" and "OPEX liability" are
statements about the employer's books, and they sat on the site through two
earlier sweeps precisely because both sweeps were looking for figures.

Deliberately kept: "Axpo's first Digital Twin as a Service" — Axpo markets
it publicly and `transf.cs3` links to their own page about it. Also kept:
`transf.cs1`'s "digital engineering reads to finance as operational overhead
with unclear return", which is framed as a sector observation and is the
setup the whole case study rests on.

⚠ One consequence to know about: outcome 02's `.impact` string carries no
numbers, so the home page no longer states CEA's "over 75 countries" or
"30+ enterprise clients" on that row. The 75-countries claim still appears
in Proof of scale (`about.proof3`). **Do not fix this by adding the numbers
to `about.out2.impact`** — that key also renders on `/cea/`, directly below
an Outcome line that already states them, and the no-repetition rule below
exists precisely to stop that.

### Case study page shape

Every case study runs the same flow:

```
page-intro   eyebrow · H1 · lede · full-width stat band
01 WHY       The Problem     <ns>.cs1
02 HOW       The Execution   <ns>.cs2 + <ns>.cs3
03 WHAT      The Outcome     about.outN.outcome + about.outN.impact
page-media   the talk video — LAST, before the pager
page-nav     closed loop 01 → 02 → 03 → 01
```

`<ns>` is `transf`, `cea` or `ipcc`. Section titles come from the shared
keys `v2.cs.challenge` / `v2.cs.strategy` / `v2.cs.outcome`, and the
Why/How/What rail labels from `v2.cs.why` / `.how` / `.what`.

`v2.cs.outcome` reads **"The Outcome"** (was "The Result"). German stays
**"Das Ergebnis"** — German does not split Result/Outcome the way English
does, and `Das Resultat` would read as the narrower of the two. This is a
case where EN/DE parity is satisfied without both sides changing; do not
"fix" the German to match the English edit.

**Chapters must not repeat each other.** The Execution chapter says *how*
the work was done — approach, sequence, what was stood up. It must not
restate the numbers or first-of claims that belong to The Outcome. This is
easy to get wrong: all three pages once carried their own outcome twice
(Axpo's DACH-first substation in both, CEA's 75 countries in both, the
IPCC contribution in both). A quick check before shipping copy:

```bash
node -e "…compare <ns>.cs2 + <ns>.cs3 against about.outN.* for shared claims…"
```

The video sits at the end deliberately: it is a talk *about* the work, so
it corroborates a claim the reader has already met, and being below the
fold means its lazy-loaded iframe usually never loads at all.


## Home page

The home page *is* the About page — **there is no `/about/` URL**, and
nothing links to one. The sidebar group named "About" is anchors into this
page (`#bio`, `#proof`, `#outcomes`) plus the `/principles/` link. Worth
knowing, because a group called "About" invites the assumption that
`/about/` exists. Sections, in order:

1. Hero — `hero.h1` + `hero.p`, portrait right, Short Bio beside it
   (the third-person copy-ready bio, for recruiters and event organisers)
2. **01 Proof of scale** — org footprint, budget oversight, global reach
3. **02 Key enterprise outcomes** — three, each **title + the Impact
   paragraph only, unlabelled**, plus a "See case study →" link pointing at
   `/digital-transformation/`, `/cea/` and `/ipcc/` respectively.
4. **03 Operating principles** — a curated **five** (01, 03, 04, 05, 08),
   each title + one-line summary only, then a "Read the principles in
   full →" link to `/principles/`, which carries all eight in full
5. **04 Recently** — one line and a link to the LinkedIn profile; the
   `#recently` anchor the sidebar's News item points at. This was nine
   LinkedIn embeds (six, then nine). **Do not reintroduce them**: they were
   unfiltered, aged badly, duplicated a surface that already exists, and
   cost ~7.5s of script evaluation on an emulated mid-range phone — the
   largest single cost on the page by a wide margin. Copy lives in
   `v2.recently.line`; `.feed-grid` and `.feed-item` were deleted from
   `style.css` with them, leaving `.recently-line` and `.feed-more`.

Retired when this replaced the old home page: the **Selected Work** list
(five quantified initiative rows), the **Now** section (it restated the
hero almost verbatim) and the **Connect** section (it duplicated the
sidebar's links 11–13).

## ⚠ The principles live in two places — don't merge them back

The eight operating principles are split across two pages by design:

| | Home page `#principles` | `/principles/` |
|---|---|---|
| number + `v2.about.pN.title` | **5 of 8** (01, 03, 04, 05, 08) | all 8 |
| `v2.about.pN.sum` (one line) | **5 of 8** | all 8 |
| `about.pN` (the long body) | ❌ | ✅ |

**The home page shows a curated five, not all eight**: 01 (make room for
invention), 03 (integration is expectation management), 04 (plan to
maintain), 05 (liability to protected value) and 08 (aim to be first — and
know when not to). Omitted are 02 (structure then get out of the way), 06
(the customer of my customer) and 07 (hold a high bar) — the three that read
closest to general leadership advice rather than a position.

⚠ 05 used to collide with Key outcome 01 in wording — "from liability to
protected value" against "from OPEX to revenue-generating value", about a
screen apart. Outcome 01 is now "from cost line to core capability", so the
overlap is smaller but not gone. Check the pair whenever either is reworded.

**Principle 07 was rewritten from scratch**: "Meritocracy, and leading by
example" became "Hold a high bar, and make it reachable". The old version
opened "I do it and show it first" and argued that the best performers get
the hardest problems — which reads as intensity and self-regard rather than
a leadership position. The new one keeps the standard-from-the-team's-own-
work argument, adds the leader's duty to make the bar *reachable*, and
frames access to the visible work as a route anyone can take. Its body runs
to three paragraphs, so it uses `about.p7` + `about.p7b` + `about.p7c` —
the same shape principle 03 uses.

**Principle 01 lost its hackathon texture** (phone ban, pizza, "two days of
marathon focus"). It signalled intensity culture and read startup rather
than executive. The protected block of time each quarter, the real
challenge, the no-permission-needed clause and the three things it buys all
survive; only the sensory detail went.

**Principle 05's closing sentence was rewritten.** "secure excellent
capability, nationally and internationally, at genuinely good value" read as
offshoring or labour arbitrage — a live sensitivity in a Swiss utility with
a works council. It now argues that the same visibility which wins a budget
is what lets its cost be questioned in the open.

**They keep their real numbers (01, 03, 04, 05, 08), not 01–05.** The
number is the principle's identity across both pages, and the gaps are the
honest signal that there are more behind the link.

The bodies were 1,089 of the home page's 1,350 words — 81% of everything
below the hero — so a recruiter hit eight full essays before reaching the
LinkedIn feed. Moving them out, and then curating the home page list down
to five, took it from 1,350 words to **319**.

Two things to keep true:

- **The keys are shared, not forked.** `v2.about.pN.title` and
  `v2.about.pN.sum` render on both pages, exactly like the case-study
  Outcome/Impact keys. Editing one updates both — that is the point. Never
  fork them into page-specific keys.
- **`index.html` keeps `id="principles"`** even though nothing in the
  sidebar points at it any more. Old deep links (`/#principles`) still land
  on the summary list.

Adding a ninth principle means editing **both** pages: title + summary on
the home page, title + summary + body on `/principles/`.
