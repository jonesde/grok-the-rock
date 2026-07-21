# L10n Notes for Grok the Rock

## General translation guidance

- **This is a children's book.** The text is literal, simple, and meant to be read aloud. Prefer short, direct sentences that work for a young listener.
- **Preserve literal meaning over poetic license.** Symbolic elements (water, rock, hole, clay, fire, pebble, tree, basket, melon, moss) carry deliberate layered meaning — translate them directly; the symbolism transfers across cultures.
- **Word play and double entendres** exist (e.g. "Grok Rules" = rules of Grok / rules of relating / Grok rules!). Where possible, preserve them. Where impossible, prefer the literal meaning and note the loss.
- **Keep the tone gentle.** No harsh or aggressive language. Grok is a calm, quiet, restorative presence. Match that register.
- **Animal names**: use common/local names for emu, wombat, kookaburra, echidna, cockatoo, possum, lizard, tortoise, kangaroo. If an Australian animal is unfamiliar in the target culture, use a similar local animal or a descriptive phrase rather than leaving the English name unexplained.
- **Proper noun "Grok"** stays as-is (recognizable transliteration where script differs). Translate **"Grok the Rock"** into the target language (e.g. Spanish "Grok la Roca", French "Grok le Rocher", German "Grok der Fels"). The agent noun **"Grokkers"** stays English everywhere.
- **"grok" as a verb** is coined per language using the productive verb-forming slot (see table below). Three forms are needed: infinitive, gerund/participle (for "grokking the world"), and reflexive (for "grokking himself").
- **HTML keys**: some i18n keys are full HTML blocks (`data-i18n-html`). Preserve the `<p>`, `<b>`, `<em>`, `<hr>`, `<a>` structure exactly — only translate the text content between/within tags.
- **"Rockmelon" note**: In the About page, the melon is a cantaloupe, which is called "rockmelon" in Australia. If the target language has a similar wordplay between "rock" and a melon name, use it. Otherwise translate literally and note the lost pun.

## Verb form conventions for each language

| Code | Language | Infinitive | Gerund / Participle | Reflexive (p8 context) | Reflexive (collective context) |
|------|----------|-----------|---------------------|----------------------|-------------------------------|
| **am** | Amharic | መግሮክ (mägrok) | እየገረከ (eyägäräkä) | ራሱን መግሮክ (rasun mägrok) | — |
| **ar** | Arabic | يُغرِك (yughrik) | غَرْك (ghark, masdar) | يُغرِك نفسه (yughrik nafsahu) | أنفسهم (anfusuhum, "themselves") |
| **bn** | Bengali | গ্রক করা (grok kôra) | গ্রক করতে করতে (grok korte korte) | নিজেকে গ্রক করা (nijeke grok kôra) | — |
| **ca** | Catalan | grokar | grokant | grokar-se | — |
| **cs** | Czech | grokovat | grokujíc | grokovat se | — |
| **da** | Danish | grokke | grokkende | grokke sig | — |
| **de** | German | grokken | grokkend | sich selbst zu grokken | sich selbst (p24: "selbst auszuprobieren") |
| **el** | Greek | γκροκάρω (grokáro) | γκροκάροντας (grokárontas) | γκροκάρομαι (grokáromai) | — |
| **en** | English | grok | grokking | grok oneself | — |
| **es** | Spanish | grokkear | grokkeando | grokkearse a sí mismo | por sí mismos (p24) |
| **eu** | Basque | grokatu | grokatzen | bere burua grokatu | — |
| **fa** | Persian | گروک کردن (grok kardan) | در حال گروک کردن (dar hāl-e grok kardan) | خود را گروک کردن (khod rā grok kardan) | خودمان (khodamān) |
| **fi** | Finnish | grokata | grokaten | grokata itseään | — |
| **fr** | French | groker | grokant | se groker lui-même | nous-mêmes (about.shame: "Se groker nous-mêmes") |
| **gu** | Gujarati | ગ્રૉક કરવું (grok karvũ) | ગ્રૉક કરતાં (grok kartā̃) | પોતાને ગ્રૉક કરવું (potāne grok karvũ) | — |
| **ha** | Hausa | gurokā | yana gurokāwa | gurokā kansa | — |
| **he** | Hebrew | לִגרוֹק (ligrok) | גּוֹרֵק (gorek) | לִגרוֹק אֶת עַצְמוֹ (ligrok et atzmo) | בְּעַצְמָם (b'atzam, p24: "themselves") |
| **hi** | Hindi | ग्रॉक करना (grok karnā) | ग्रॉक करते हुए (grok karte hue) | खुद को ग्रॉक करना (khud ko grok karnā) | खुद को (khud ko, p24) |
| **hu** | Hungarian | grokolni | grokolva | grokolni magát | — |
| **ig** | Igbo | groku | na-egroku | groku onwe ya | — |
| **id** | Indonesian | menggrok | sedang menggrok | menggrok diri | — |
| **it** | Italian | grokkare | grokkando | grokkarsi | da sé (about.shame: "distanza da sé") |
| **ja** | Japanese | グロックする (gurokku suru) | グロックして (gurokku shite) | 自分をグロックする (jibun o gurokku suru) | 自身を (jishin o, about.shame) / 自分自身を (jibunjishin o, "ourselves") |
| **kn** | Kannada | ಗ್ರಾಕ್ ಮಾಡು (grāk māḍu) | ಗ್ರಾಕ್ ಮಾಡುತ್ತ (grāk māḍutta) | ತನ್ನನ್ನು ತಾನೇ ಗ್ರಾಕ್ ಮಾಡಿಕೊ (tannannu tānē grāk māḍiko) | — |
| **ko** | Korean | 그록하다 (geurok-hada) | 그록하며 (geurok-hamyeo) | 자기 자신을 그록하기 (jacjajineul geurok-hagi) | 스스로 (seuseuro, p24: "themselves") |
| **mr** | Marathi | ग्रॉक करणे (grok karṇe) | ग्रॉक करताना (grok kartānā) | स्वतःला ग्रॉक करणे (svataḥlā grok karṇe) | — |
| **ms** | Malay | menggrok | sedang menggrok | menggrok diri | — |
| **my** | Burmese | ဂရော့က်လုပ် (grauk lup) | ဂရော့က်လုပ်နေ (grauk lup ne) | ကိုယ့်ကိုယ်ကို ဂရော့က်လုပ် (kui. kuikui grau lup) | — |
| **ne** | Nepali | ग्रोक गर्ने (grok garne) | ग्रोक गर्दै (grok gardai) | आफैलाई ग्रोक गर्ने (āphailāī grok garne) | — |
| **nl** | Dutch | grokken | grokkend | zichzelf te grokken | zelf (p24: "zelf uit te proberen") / Onszelf (about.shame: "Onszelf grokken") |
| **no** | Norwegian | grokke | grokkende | grokke seg selv | seg selv (dedication, p6, p8) / selv (p24) |
| **pa** | Punjabi | ਗ੍ਰੋਕ ਕਰਨਾ (grok karnā) | ਗ੍ਰੋਕ ਕਰਦਿਆਂ (grok kardeā̃) | ਆਪਣੇ ਆਪ ਨੂੰ ਗ੍ਰੋਕ ਕਰਨਾ (apṇe āp nū̃ grok karnā) | — |
| **pl** | Polish | grokować | grokując | grokować się | — |
| **pt** | Portuguese | grokkar | grokkando | grokkar-se | por si mesmos (p24) / a nós mesmos (about.shame) |
| **ro** | Romanian | a groca | grocând | a se groca | — |
| **ru** | Russian | грокать (grokat') | грокая (grokaya) | грокать самого себя (grokat' samovo sebya) | самих себя (about.shame: "Грокать самих себя") / сами (p24) |
| **sv** | Swedish | grokka | grokkande | grokka sig | — |
| **ta** | Tamil | குரோக் செய்ய (kurōk seyyā) | குரோக் செய்து கொண்டிருக்கும் (kurōk seytu koṇṭirukkum) | தன்னைத் தானே குரோக் செய்து கொள்ள (taṉṉait tāṉē kurōk seytu koḷḷa) | — |
| **sw** | Swahili | kuguroka | akiguroka | kujiguroka | — |
| **th** | Thai | กร็อก (gròk) | กำลังกร็อก (gamlang gròk) | กร็อกตัวเอง (gròk dtua-eeng) | — |
| **tl** | Tagalog | gumrok | gumrogrok | gumrok sa sarili | — |
| **tr** | Turkish | groklamak | groklayarak | kendini groklamak | — |
| **uk** | Ukrainian | ґрокати (grokaty) | ґрокаючи (grokayuchy) | ґрокати себе (grokaty sebe) | — |
| **ur** | Urdu | گروک کرنا (grok karnā) | گروک کرتے ہوئے (grok karte hue) | خود کو گروک کرنا (khud ko grok karnā) | ہمیں خود (hamīn khud, about.shame) |
| **vi** | Vietnamese | grok | đang grok | tự grok | — |
| **yo** | Yoruba | grok | ń grok | grok ara rẹ̀ | grok ara wa |
| **zh** | Chinese | 格罗克化 (géluókè huà) | 格罗克化中 (géluókè huà zhōng) | 格罗克化自己 (géluókè huà zìjǐ) | 我们自己 (about.shame: "格罗克化我们自己") |

### Notes on reflexive forms

- **Intensified reflexives are standard.** In the p8 context ("grokking himself" — an introspective moment), all translators added an intensifier to the reflexive pronoun. This is the natural choice in each language, not a deviation. The "Reflexive (p8 context)" column reflects the actual forms used.
- **Collective "ourselves" in about.shame.1.** The shame section uses plural reflexives ("grokking ourselves"). Each language adapts this with its own plural/collective reflexive form (shown in the "Reflexive (collective context)" column).
- **p24 "themselves" context.** In the p24 section, "themselves" is often rendered with a simpler form (e.g., German "selbst", Dutch "zelf", Norwegian "selv", Russian "сами") rather than the full intensified reflexive, reflecting a shift from introspective to observational context.

### Notes on specific verb forms

- **Arabic**: Root is غ-ر-ك (gh-r-k), matching the noun transliteration غروك. Form IV `أفعل` (yughrik) gives a natural causative feel. The masdar غَرْك (ghark) serves as the gerund/verbal noun.
- **Swahili**: `guroka` inserts an epenthetic `u` because Swahili phonotactics disallow initial `gr-` consonant clusters. The `ku-` prefix marks the infinitive, `-ki-` marks the situational/gerund, and `-ji-` marks the reflexive object.
- **Ukrainian**: Uses `ґ` (ghe, U+0490) rather than `г` (he) to preserve the hard /g/ sound; standard Ukrainian `г` is pronounced /ɦ/.
- **Hebrew**: Root is ג-ר-ק (g-r-k), matching the noun גרוק. Pi'el or pa'al binyan; `ligrok` follows the pa'al pattern for a hollow root.
- **French**: Also needs `grokons` (1st person plural) for the sentence "until we grok it" in the About page.
- **Amharic**: Uses Ge'ez script. The infinitive prefix `መ-` (mä-) is attached to the borrowed root. The gerund uses the `እየ-` (eyä-) progressive prefix with internal vowel changes.
- **Burmese**: Verbs do not conjugate; aspect is marked by particles. `လုပ်` (lup, "do/make") is the light verb. The continuous particle `နေ` (ne) marks ongoing action. The reflexive uses the reduplicated `ကိုယ့်ကိုယ်ကို` (kui. kuikui, "self by self").
- **Hausa**: `gurokā` inserts an epenthetic `u` to break the initial `gr-` cluster (parallel to Swahili). The `-ā` suffix marks the grade-1 infinitive. The continuous form `yana gurokāwa` uses the progressive marker `yana` + the grade-1 continuous suffix `-wā`.
- **Yoruba**: Yoruba is a tonal language; `grok` is used as a bare verb (Yoruba has no distinct infinitive form). The continuous marker `ń` precedes the verb. The reflexive uses `ara` (body/self) + the appropriate possessive pronoun (`rẹ̀` = his/her, `wa` = our).
- **Persian**: Uses the compound verb pattern `گروک کردن` (grok kardan, "to grok do"). The gerund uses the prepositional phrase `در حال` (dar hāl-e, "in the state of") + the infinitive. The reflexive uses `خود را` (khod rā, "self [obj.]").
- **Urdu**: Written in Nastaliq script. Follows the same compound verb pattern as Hindi (`گروک کرنا`, grok karnā) but in Perso-Arabic script. The gerund `گروک کرتے ہوئے` (grok karte hue) is identical in structure to Hindi.
- **Punjabi**: Written in Gurmukhi script (for Indian Punjabi). Uses the compound verb pattern `ਗ੍ਰੋਕ ਕਰਨਾ` (grok karnā). The gerund `ਗ੍ਰੋਕ ਕਰਦਿਆਂ` (grok kardeā̃) uses the conjunctive participle form.
- **Tamil**: Uses the Dravidian verb pattern. `செய்ய` (seyyā, "to do") is the light verb. The continuous form uses `செய்து கொண்டிருக்கும்` (seytu koṇṭirukkum, "having done, remains"), the standard Tamil continuous construction. The reflexive uses the reduplicated `தன்னைத் தானே` (taṉṉait tāṉē, "self by self").
- **Igbo**: Uses the borrowed verb `groku` with Igbo prefix patterns. The continuous marker `na-` + subject prefix `e-` gives `na-egroku`. The reflexive uses `onwe` (self) + possessive `ya` (his/her).
- **Telugu**: Uses the compound verb pattern `గ్రోక్ చేయడం` (grōk cēyaḍaṁ, "to do grok"). The continuous `గ్రోక్ చేస్తూ` (grōk cēstū) uses the present participle. The reflexive uses the reduplicated `తనను తాను` (tananu tānu, "self by self").
- **Marathi**: Uses the compound verb `ग्रॉक करणे` (grok karṇe). The gerund `ग्रॉक करताना` (grok kartānā) uses the "while doing" form. The reflexive uses `स्वतःला` (svataḥlā, "to oneself").
- **Gujarati**: Uses the compound verb `ગ્રૉક કરવું` (grok karvũ). The gerund `ગ્રૉક કરતાં` (grok kartā̃) uses the adverbial participle. The reflexive uses `પોતાને` (potāne, "to oneself").
- **Kannada**: Uses the compound verb `ಗ್ರಾಕ್ ಮಾಡು` (grāk māḍu, "do grok"). The continuous `ಗ್ರಾಕ್ ಮಾಡುತ್ತ` (grāk māḍutta) uses the present participle. The reflexive uses the reduplicated `ತನ್ನನ್ನು ತಾನೇ` (tannannu tānē, "self by self").
- **Nepali**: Uses the compound verb pattern `ग्रोक गर्ने` (grok garne). The gerund `ग्रोक गर्दै` (grok gardai) uses the progressive form. The reflexive uses `आफैलाई` (āphailāī, "to oneself"), an intensified form of `आफू` (āphū).
- **Malay**: Closely parallel to Indonesian. Uses the `meng-` prefix for the active verb form. The continuous uses `sedang` (currently). The reflexive uses `diri` (self).

## English display overrides (`lang/en.js`)

HTML book sources keep a few **chrome alternates** (`Grok`, `Lord Ikthiss`) so a search for the exact spine names (`Grok the Rock`, `Hai Ikthiss`) stays at **32** per book. `lang/en.js` restores the full names at display time for:

- `site.title` / `hai.site.title` (and thus `document.title` via `i18n.js`)
- `cover.title` / `hai.cover.title`
- `dedication` (seelink: `Grok the Rock = Stranger…`)

Do not put those full chrome strings back into `index.html` / `tall-tales.html` source.

### index.html (story book) — 60 keys

| Key | Type | Content |
|-----|------|---------|
| `site.title` | text | "Grok the Rock - Three Quiet Stories" |
| `nav.print` | text | "Print" |
| `nav.rules` | text | "Rules" |
| `nav.about` | text | "About" |
| `cover.alt` | alt | Short **scene description** of cover art (English in HTML; omit key to fall back) |
| `cover.title` | html | `<h1>...</h1><h3>...</h3><h2>...</h2>` (overlay; hidden for en) |
| `title.h1` | text | "Grok the Rock" |
| `title.h3` | text | "Three Quiet Stories" |
| `title.h2` | text | "Being · Mending · Seeing" |
| `credit.1`–`credit.7` | text | Credits / CC0 notice |
| `credit.companion` | html | Reverse companion link to Tall Tales |
| `dedication.alt` | alt | Scene description of dedication art |
| `dedication` | html | Full dedication block with `<p>`, `<b>`, `<hr>`, `<a>` |
| `p1.alt`–`p26.alt` | alt | Short visual scene descriptions (not story retells; not "Page N") |
| `p2`–`p26` | html | Story page content (each a block of `<p>`, `<hr>`) |
| `c1.title` | html | Chapter 1 title overlay |
| `c2.title` | html | Chapter 2 title overlay |
| `c3.title` | html | Chapter 3 title overlay |

**Alt text notes:** English scene alts live in the HTML `alt` attributes. Missing `*.alt` keys fall back to English via `i18n.js`. Do not ship stub alts like "Page 2".

**Spine name + alts:** The exact two-word surface name (`Grok the Rock` / `Hai Ikthiss`) is a structural marker targeting **32** occurrences per book across story captions, title chrome, and **image alts** (and image prompts in the draft markdown). When a locale translates alts, put the translated two-word spine in the **same alt keys** where English has it (and omit it where English uses only the short name, e.g. `p12.alt` “Grok’s feet”, or Kai-only Tall Tales beats). Hebrew does this: Quiet Stories alts use **גרוק הצור**; Tall Tales alts use **האי איקתיס**. Story-body Hebrew may keep niqqud on the spine (`גְּרוֹק הַצּוּר` / `הָאִי אִיקְתִּיס`); alts and chrome use the unpointed form.

### tall-tales.html — Hai keys (`hai.*`)

Same shape as Quiet Stories, all prefixed with `hai.`:

| Key | Type | Content |
|-----|------|---------|
| `hai.site.title` | text | "Hai Ikthiss - Three Tall Tales" |
| `hai.cover.alt` / `hai.dedication.alt` / `hai.p1.alt`–`hai.p26.alt` | alt | Scene descriptions |
| `hai.cover.title`, `hai.title.*`, `hai.credit.*`, `hai.dedication` | text/html | Title page + credits + dedication |
| `hai.p2`–`hai.p9`, `hai.p11`–`hai.p17`, `hai.p19`–`hai.p26` | html | Story captions (no p1/p10/p18 — chapter title pages) |
| `hai.c1.title`–`hai.c3.title` | html | Chapter title overlays |
| `nav.book` / `nav.tall` | text | Shared nav ("Quiet Stories" / "Tall Tales") |

**Structural markers (keep parallel across languages):**
- Spine name **Hai Ikthiss** appears on the chapter openers and key beats (same role as "Grok the Rock"). Animals in Ch.1 praise say **Lord Ikthiss**; the humble seed form is **Kai**.
- Each chapter’s first story page opens with: *Hai Ikthiss ruled the forest from atop the tall tree.*
- Chapter arc titles stay **Being · Mending · Seeing** (or the language’s established Quiet Stories equivalents — Hebrew uses שלום · תיקון · ראייה).
- Agent phrase **Tall Tellers** (dedication) stays English where "Grokkers" does; book titles translate (e.g. Tolkien → local *Lord of the Rings* title).
- English cast: stag, badger, raven, Pip (hedgehog), fox, stoat, pheasant, old owl. Use common local animal names.
- Shared symbols with Quiet Stories (keep literal): melon/cantaloupe, water, hollow cup, seed, root, tree, lift / far sight.
- HTML chrome alternates in source (`Lord Ikthiss`) are restored to full **Hai Ikthiss** via `lang/en.js` (`hai.site.title`, `hai.cover.title`). Do not put full spine chrome back into `tall-tales.html`.

### Hebrew special case (`he` / `he-phon`)

Hebrew is not a plain phonetic port — names and a few symbols lean on layers in `GrokTheRock-Symbolism.md` and the Quiet Stories conventions already in `lang/he.js`.

**Quiet Stories (locked):**
- **Grok the Rock** → גרוק הצור (צור = rock of the Psalms; see `GrokDavid.md`)
- **Being** → שלום (wholeness/peace, not bare "existence")
- Verb root ג-ר-ק; Grokkers stays English
- Story pages use full niqqud; chrome is lighter
- `he-phon` repeats Hebrew and adds Latin phonetics (`<p class="phon">…</p>`; story lines also `dir="rtl"`)

**Tall Tales names:**

| English | Hebrew | Notes |
|---------|--------|--------|
| Hai Ikthiss (spine) | הָאִי אִיקְתִּיס / האי איקתיס | Keep two-word spine. **האי** is a stable transliteration of *Hai* (already in chapter titles); full story niqqud uses הָאִי. **איקתיס** preserves the *Ikthiss* sound (ichthys / fish echo in art and dedication). Do not translate the spine into a descriptive phrase. |
| Lord Ikthiss | אֲדוֹן אִיקְתִּיס | Natural Hebrew **אדון** + same surname; gentle title, not royal pomp. Not לורד. |
| Kai | קַאי / קאי | Humble seed name; stay as proper noun. |
| Pip | פִּיפּ | Same as Quiet Stories. Tall Tales Pip is a **hedgehog** (קִפּוֹד), not the Quiet Stories echidna (קִפּוֹדָן). |
| Three Tall Tales | שלושה סיפורי גובה | Matches `nav.tall` = סיפורי גובה |
| Lord of the Rings | שר הטבעות | Standard Hebrew book title |

**Tall Tales wording choices (Hebrew):**
- Opening spine line: *מָשַׁל בַּיַּעַר מֵרֹאשׁ הָעֵץ הַגָּבוֹהַּ* (gentle "ruled," not harsh conquest).
- **Hollow cup** → כּוֹס חֲלוּלָה / כּוֹס שְׁבָחִים; purpose is **לִשְׁפֹּךְ** (pour down), not collect praise.
- **Hook / living join** (p6) → **וָו** + חִבּוּר חַי (letter *vav* = join/hook; matches the draft lesson and Sefer Yetzirah layer — prefer this over a plain "קרס").
- **Living walking seed** → זֶרַע חַי מְהַלֵּךְ; **walking tall tree** → עֵץ גָּבוֹהַּ מְהַלֵּךְ.
- **Far sight** → הַמַּבָּט הָרָחוֹק (already in `hai.c3.title`).
- Ch.2 mending beats stay close to Quiet Stories Hebrew (`p12`–`p17`), swapping Grok→Kai and cast animals.
- Animals: אַיָּל, גִּירִית, עוֹרֵב, קִפּוֹד, שׁוּעָל, סְמוּר, פַּסְיוֹן, יַנְשׁוּף.
- Companion links in Quiet Stories Hebrew should use the translated Tall Tales title (האי איקתיס — שלושה סיפורי גובה), not leftover English.
- **Alts required for Hebrew** (`cover.alt`, `dedication.alt`, `p1.alt`–`p26.alt`, and all `hai.*.alt`): real scene translations with spine names in the same slots as English, so the marker layout matches when `he` / `he-phon` is selected.

### Tall Tales names (Latin / Romance: es, fr, it, pt)

| English | es | fr | it | pt |
|---------|----|----|----|-----|
| Hai Ikthiss (spine) | Hai Ikthiss | Hai Ikthiss | Hai Ikthiss | Hai Ikthiss |
| Lord Ikthiss | Señor Ikthiss | Seigneur Ikthiss | Signore Ikthiss | Senhor Ikthiss |
| Kai / Pip | Kai / Pip | Kai / Pip | Kai / Pip | Kai / Pip |
| Three Tall Tales | Tres Cuentos Altos | Trois Contes Hauts | Tre Racconti Alti | Três Contos Altos |
| Lord of the Rings | El Señor de los Anillos | Le Seigneur des anneaux | Il Signore degli Anelli | O Senhor dos Anéis |
| Tall Tellers | Tall Tellers (English) | Tall Tellers | Tall Tellers | Tall Tellers |
| Arc (from Quiet Stories) | Ser · Remendar · Ver | Être · Réparer · Voir | Essere · Riparare · Vedere | Ser · Remendar · Ver |

**Chapter subtitles:**
- es: Hai y el elogio vacío · Kai camina abajo · Hai y la vista lejana
- fr: Hai et la louange vide · Kai marche en bas · Hai et le regard lointain
- it: Hai e la lode vuota · Kai cammina sotto · Hai e lo sguardo lontano
- pt: Hai e o elogio vazio · Kai caminha embaixo · Hai e o olhar distante

**Animals:** stag/ciervo/cerf/cervo/cervo · badger/tejón/blaireau/tasso/texugo · raven/cuervo/corbeau/corvo/corvo · hedgehog/erizo/hérisson/riccio/ouriço · fox/zorro/renard/volpe/raposa · stoat/comadreja/hermine/ermellino/doninha · pheasant/faisán/faisan/fagiano/faisão · owl/búho/hibou/gufo/coruja.

**Wording:** hollow cup → copa hueca / coupe creuse / coppa vuota / copo oco (pour down, not collect). Keep living walking seed / walking tall tree compounds. Ch.2 stays close to Quiet Stories mending beats. Companion links in Quiet Stories must use the translated Tall Tales title. Full `hai.*` story + alts required (same key set as Hebrew).

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
| `nav.book` | text | "Quiet Stories" |
| `nav.tall` | text | "Tall Tales" |
| `nav.menu` | text | "Menu" |
| `nav.close` | text | "Close" |
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
