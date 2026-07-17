# L10n Notes for Grok the Rock

## General translation guidance

- **This is a children's book.** The text is literal, simple, and meant to be read aloud. Prefer short, direct sentences that work for a young listener.
- **Preserve literal meaning over poetic license.** Symbolic elements (water, rock, hole, clay, fire, pebble, tree, basket, melon, moss) carry deliberate layered meaning — translate them directly; the symbolism transfers across cultures.
- **Word play and double entendres** exist (e.g. "Grok Rules" = rules of Grok / rules of relating / Grok rules!). Where possible, preserve them. Where impossible, prefer the literal meaning and note the loss.
- **Keep the tone gentle.** No harsh or aggressive language. Grok is a calm, quiet, restorative presence. Match that register.
- **Animal names**: use common/local names for emu, wombat, kookaburra, echidna, cockatoo, possum, lizard, tortoise, kangaroo. If an Australian animal is unfamiliar in the target culture, use a similar local animal or a descriptive phrase rather than leaving the English name unexplained.
- **Proper noun "Grok" / "Grok la Roca"** stays as-is (recognizable transliteration where script differs). The agent noun **"Grokkers"** stays English everywhere.
- **"grok" as a verb** is coined per language using the productive verb-forming slot (see table below). Three forms are needed: infinitive, gerund/participle (for "grokking the world"), and reflexive (for "grokking himself").
- **HTML keys**: some i18n keys are full HTML blocks (`data-i18n-html`). Preserve the `<p>`, `<b>`, `<em>`, `<hr>`, `<a>` structure exactly — only translate the text content between/within tags.
- **"Rockmelon" note**: In the About page, the melon is a cantaloupe, which is called "rockmelon" in Australia. If the target language has a similar wordplay between "rock" and a melon name, use it. Otherwise translate literally and note the lost pun.

## Verb form conventions for each language

| Code | Language | Infinitive | Gerund / Participle | Reflexive |
|------|----------|-----------|---------------------|-----------|
| **ar** | Arabic | يُغرِك (yughrik) | غَرْك (ghark, masdar) | يُغرِك نفسه (yughrik nafsahu) |
| **bn** | Bengali | গ্রক করা (grok kôra) | গ্রক করতে করতে (grok korte korte) | নিজেকে গ্রক করা (nijeke grok kôra) |
| **ca** | Catalan | grokar | grokant | grokar-se |
| **cs** | Czech | grokovat | grokujíc | grokovat se |
| **da** | Danish | grokke | grokkende | grokke sig |
| **de** | German | grokken | grokkend | sich grokken |
| **el** | Greek | γκροκάρω (grokáro) | γκροκάροντας (grokárontas) | γκροκάρομαι (grokáromai) |
| **en** | English | grok | grokking | grok oneself |
| **es** | Spanish | grokkear | grokkeando | grokkearse |
| **eu** | Basque | grokatu | grokatzen | bere burua grokatu |
| **fi** | Finnish | grokata | grokaten | grokata itseään |
| **fr** | French | groker | grokant | se groker (also: grokons, 1pl) |
| **he** | Hebrew | לִגרוֹק (ligrok) | גּוֹרֵק (gorek) | לִגרוֹק את עצמו (ligrok et atzmo) |
| **hi** | Hindi | ग्रॉक करना (grok karnā) | ग्रॉक करते हुए (grok karte hue) | खुद को ग्रॉक करना (khud ko grok karnā) |
| **hu** | Hungarian | grokolni | grokolva | grokolni magát |
| **id** | Indonesian | menggrok | sedang menggrok | menggrok diri |
| **it** | Italian | grokkare | grokkando | grokkarsi |
| **ja** | Japanese | グロクする (guroku suru) | グロクして (guroku shite) | 自分をグロクする (jibun o guroku suru) |
| **ko** | Korean | 그록하다 (geurok-hada) | 그록하며 (geurok-hamyeo) | 스스로 그록하기 (seuseuro geurok-hagi) |
| **nl** | Dutch | grokken | grokkend | zich grokken |
| **no** | Norwegian | grokke | grokkende | grokke seg |
| **pl** | Polish | grokować | grokując | grokować się |
| **pt** | Portuguese | grokar | grokando | grokar-se |
| **ro** | Romanian | a groca | grocând | a se groca |
| **ru** | Russian | грокать (grokat') | грокая (grokaya) | грокать себя (grokat' sebya) |
| **sv** | Swedish | grokka | grokkande | grokka sig |
| **sw** | Swahili | kuguroka | akiguroka | kujiguroka |
| **th** | Thai | กร็อก (gròk) | กำลังกร็อก (gamlang gròk) | กร็อกตัวเอง (gròk dtua-eeng) |
| **tl** | Tagalog | gumrok | gumrogrok | gumrok sa sarili |
| **tr** | Turkish | groklamak | groklayarak | kendini groklamak |
| **uk** | Ukrainian | ґрокати (grokaty) | ґрокаючи (grokayuchy) | ґрокати себе (grokaty sebe) |
| **vi** | Vietnamese | grok | đang grok | tự grok |
| **zh** | Chinese | 格罗克化 (géluókè huà) | 格罗克化中 (géluókè huà zhōng) | 让自己格罗克化 (ràng zìjǐ géluókè huà) |

### Notes on specific verb forms

- **Arabic**: Root is غ-ر-ك (gh-r-k), matching the noun transliteration غروك. Form IV `أفعل` (yughrik) gives a natural causative feel. The masdar غَرْك (ghark) serves as the gerund/verbal noun.
- **Swahili**: `guroka` inserts an epenthetic `u` because Swahili phonotactics disallow initial `gr-` consonant clusters. The `ku-` prefix marks the infinitive, `-ki-` marks the situational/gerund, and `-ji-` marks the reflexive object.
- **Ukrainian**: Uses `ґ` (ghe, U+0490) rather than `г` (he) to preserve the hard /g/ sound; standard Ukrainian `г` is pronounced /ɦ/.
- **Hebrew**: Root is ג-ר-ק (g-r-k), matching the noun גרוק. Pi'el or pa'al binyan; `ligrok` follows the pa'al pattern for a hollow root.
- **French**: Also needs `grokons` (1st person plural) for the sentence "until we grok it" in the About page.

## Translation keys by page

### index.html (story book) — 60 keys

| Key | Type | Content |
|-----|------|---------|
| `site.title` | text | "Grok the Rock - Three Quiet Stories" |
| `nav.print` | text | "Print" |
| `nav.rules` | text | "Grok Rules" |
| `nav.about` | text | "About Grok" |
| `cover.alt` | alt | "Cover Art" |
| `cover.title` | html | `<h1>...</h1><h3>...</h3><h2>...</h2>` (overlay; hidden for en) |
| `title.h1` | text | "Grok the Rock" |
| `title.h3` | text | "Three Quiet Stories" |
| `title.h2` | text | "Being · Mending · Seeing" |
| `credit.1`–`credit.7` | text | Credits / CC0 notice |
| `dedication.alt` | alt | "Dedication Page" |
| `dedication` | html | Full dedication block with `<p>`, `<b>`, `<hr>`, `<a>` |
| `p1.alt` | alt | "Page 1 (Chapter 1 title page)" |
| `p2.alt`–`p26.alt` | alt | Page alt texts |
| `p2`–`p26` | html | Story page content (each a block of `<p>`, `<hr>`) |
| `c1.title` | html | Chapter 1 title overlay |
| `c2.title` | html | Chapter 2 title overlay |
| `c3.title` | html | Chapter 3 title overlay |

### grok-rules.html — 30 keys

| Key | Type | Content |
|-----|------|---------|
| `site.title.rules` | text | "Grok the Rock - Rules of Relating" |
| `rules.hero.title` | html | Title |
| `rules.hero.essence` | html | Subtitle |
| `rules.what.title` | text | "What is Grok?" |
| `rules.what.1`–`rules.what.3` | text | Definition paragraphs |
| `rules.what.note` | html | Note with links |
| `rules.origin.title` | text | "How these rules came to be" |
| `rules.origin.1`–`rules.origin.2` | text | Narrative paragraphs |
| `rules.origin.quote` | html | Blockquote |
| `rules.r1.title`–`rules.r10.title` | html | Rule titles |
| `rules.r1.body`–`rules.r10.body` | html | Rule bodies |
| `rules.closing.1`–`rules.closing.2` | html | Closing paragraphs |
| `rules.footnote` | html | Footer |

### about-grok.html — 59 keys

| Key | Type | Content |
|-----|------|---------|
| `site.title.about` | text | "Grok the Rock - About Grok" |
| `nav.book` | text | "The Book" |
| `about.hero.title` | html | "About Grok the Rock" |
| `about.hero.essence` | html | Subtitle |
| `about.intro.1`–`about.intro.4` | html | Intro paragraphs |
| `about.shame.title` | text | Shame section heading |
| `about.shame.1`–`about.shame.3` | html | Shame section body |
| `about.what.title` | text | "What is Grok?" |
| `about.what.1`–`about.what.3` | html | Definition paragraphs |
| `about.what.note` | html | Note with link |
| `about.limestone.title` | text | "Why is he gray limestone?" |
| `about.limestone.1` | html | Intro paragraph |
| `about.limestone.quote` | html | Blockquote (gray rock method) |
| `about.limestone.2` | html | Geology paragraph |
| `about.rock.title` | text | "Why is he a rock...?" |
| `about.rock.1`–`about.rock.2` | html | Symbology paragraphs |
| `about.melon.title` | text | "Why a cantaloupe melon?" |
| `about.melon.1` | html | Rockmelon paragraph |
| `about.name.title` | text | "How do you read his name?" |
| `about.name.1` | html | Name meaning paragraph |
| `about.clay.title` | text | "Clay" |
| `about.clay.1`–`about.clay.2` | html | Clay paragraphs |
| `about.basket.title` | text | "The clay-lined basket" |
| `about.basket.1` | html | Basket paragraph |
| `about.animals.title` | text | "The animals as status-types" |
| `about.animals.1` | html | Animals paragraph |
| `about.pebble.title` | text | "The small feeling..." |
| `about.pebble.1` | html | Pebble paragraph |
| `about.tree.title` | text | "The tall tree" |
| `about.tree.1` | html | Tree paragraph |
| `about.moss.title` | text | "The moss on Grok's head" |
| `about.moss.1` | html | Moss paragraph |
| `about.stranger.title` | text | "Grok the Rock = Stranger... + Grug" |
| `about.stranger.body` | html | Large two-column body |
| `about.footnote` | html | Footer |

## Implementation phases

| Phase | Languages | Status |
|-------|-----------|--------|
| — | en | Source (inline HTML) |
| — | es, fr | Done |
| 1 | de, it, pt, nl, ru, zh, ja, ko, ar | Stubs — fill remaining ~140 keys |
| 2 | no, sv, da | Scandinavian |
| 3 | pl, cs, ro, hu, uk | Eastern/Central European |
| 4 | el, tr, he, ca | Mediterranean / Middle Eastern |
| 5 | hi, bn, th, vi, id | South / Southeast Asian |
| 6 | fi, sw, eu, tl | Outliers |

## File structure

Each `lang/XX.js` follows the same pattern:

```js
window.I18N = window.I18N || {};
window.I18N.XX = {
  "__title": "Translated page title",
  // All keys from the three pages, in order:
  // index.html keys, then rules keys, then about keys, then cover/chapter overlays
};
```

The i18n loader (`i18n.js`) lazy-loads `lang/XX.js` scripts on language switch. Each language also needs an entry in the `LANGS` object in `i18n.js` with its native name.