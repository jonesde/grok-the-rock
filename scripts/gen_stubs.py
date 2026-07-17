#!/usr/bin/env python3
"""Generate MINIMAL stub locale files for grok-the-rock.

Strategy:
- Keep proper noun "Grok" as-is. Translate "Grok the Rock" per language.
- Localize only the *verb* "grok" per language (the -ear coinage pattern).
- The agent noun "Grokkers" stays English everywhere (user decision).
- Stubs contain ONLY the localized UI chrome plus two demonstration keys that
  show the grok-verb coinage in context ("dedication" and "about.name.1").
- All other strings are OMITTED, so the i18n loader falls back to the inline
  English original (captured by captureOriginal() in i18n.js). This keeps the
  stub files clean -- no leftover Spanish prose -- until a human translator
  fills them in.
"""
import re

SRC = "lang/es.js"

# Per-language grok-verb coinage and localized UI chrome.
# verb_inf, verb_ger (gerund/participle), verb_refl (reflexive), verb_1p (1st pl)
LANGS = {
    "fr": {
        "title": "Grok le Rocher - Trois Histoires Silencieuses",
        "nav_rules": "Règles de Grok",
        "nav_about": "À propos de Grok",
        "nav_book": "Le Livre",
        "h1": "Grok le Rocher",
        "h2": "Être · Réparer · Voir",
        "h3": "Trois Histoires Silencieuses",
        "verb_inf": "groker", "verb_ger": "grokant", "verb_refl": "se groker", "verb_1p": "grokons",
    },
    "de": {
        "title": "Grok der Fels - Drei Stille Geschichten",
        "nav_rules": "Grok-Regeln",
        "nav_about": "Über Grok",
        "nav_book": "Das Buch",
        "h1": "Grok der Fels",
        "h2": "Sein · Reparieren · Sehen",
        "h3": "Drei Stille Geschichten",
        "verb_inf": "grokken", "verb_ger": "grokkend", "verb_refl": "sich grokken", "verb_1p": "grokken wir",
    },
    "it": {
        "title": "Grok la Roccia - Tre Storie Silenziose",
        "nav_rules": "Regole di Grok",
        "nav_about": "Su Grok",
        "nav_book": "Il Libro",
        "h1": "Grok la Roccia",
        "h2": "Essere · Riparare · Vedere",
        "h3": "Tre Storie Silenziose",
        "verb_inf": "grokkare", "verb_ger": "grokkando", "verb_refl": "grokkarsi", "verb_1p": "grokkiamo",
    },
    "pt": {
        "title": "Grok a Rocha - Três Histórias Silenciosas",
        "nav_rules": "Regras de Grok",
        "nav_about": "Sobre Grok",
        "nav_book": "O Livro",
        "h1": "Grok a Rocha",
        "h2": "Ser · Reparar · Ver",
        "h3": "Três Histórias Silenciosas",
        "verb_inf": "grokar", "verb_ger": "grokando", "verb_refl": "grokar-se", "verb_1p": "grokamos",
    },
    "nl": {
        "title": "Grok de Rots - Drie Stille Verhalen",
        "nav_rules": "Grok-regels",
        "nav_about": "Over Grok",
        "nav_book": "Het Boek",
        "h1": "Grok de Rots",
        "h2": "Zijn · Herstellen · Zien",
        "h3": "Drie Stille Verhalen",
        "verb_inf": "grokken", "verb_ger": "grokkend", "verb_refl": "zich grokken", "verb_1p": "grokken we",
    },
    "ru": {
        "title": "Грок-камень - Три Тихие Истории",
        "nav_rules": "Правила Грока",
        "nav_about": "О Гроке",
        "nav_book": "Книга",
        "h1": "Грок-камень",
        "h2": "Быть · Чинить · Видеть",
        "h3": "Три Тихие Истории",
        "verb_inf": "грокать", "verb_ger": "грокая", "verb_refl": "грокать себя", "verb_1p": "грокаем",
    },
    "zh": {
        "title": "格罗克岩石 - 三个静默的故事",
        "nav_rules": "格罗克规则",
        "nav_about": "关于格罗克",
        "nav_book": "书",
        "h1": "格罗克岩石",
        "h2": "存在 · 修复 · 看见",
        "h3": "三个静默的故事",
        # Chinese has no inflection; verb form = transliterated name + 格罗克化
        "verb_inf": "格罗克化", "verb_ger": "格罗克化中", "verb_refl": "让自己格罗克化", "verb_1p": "格罗克化",
    },
    "ja": {
        "title": "グロク・ロック - 三つの静かな物語",
        "nav_rules": "グロクのルール",
        "nav_about": "グロクについて",
        "nav_book": "本",
        "h1": "グロク・ロック",
        "h2": "在る・直す・見る",
        "h3": "三つの静かな物語",
        "verb_inf": "グロクする", "verb_ger": "グロクして", "verb_refl": "自分をグロクする", "verb_1p": "グロクする",
    },
    "ko": {
        "title": "그록 락 - 세 편의 조용한 이야기",
        "nav_rules": "그록의 규칙",
        "nav_about": "그록에 대하여",
        "nav_book": "책",
        "h1": "그록 락",
        "h2": "존재하기 · 고치기 · 보기",
        "h3": "세 편의 조용한 이야기",
        "verb_inf": "그록하다", "verb_ger": "그록하며", "verb_refl": "스스로 그록하기", "verb_1p": "그록하자",
    },
    "ar": {
        "title": "غروك الصخرة - ثلاث قصص صامتة",
        "nav_rules": "قواعد غروك",
        "nav_about": "عن غروك",
        "nav_book": "الكتاب",
        "h1": "غروك الصخرة",
        "h2": "يكون · يصلح · يرى",
        "h3": "ثلاث قصص صامتة",
        "verb_inf": "يَجرُكّ", "verb_ger": "جَرْكّ", "verb_refl": "يَجرُكّ نفسه", "verb_1p": "نَجرُكّ",
    },
}

# Replacement map: Spanish grok-verb tokens -> localized.
def verb_replace(text, L):
    text = text.replace("grokkearse a sí mismo", L["verb_refl"])
    text = text.replace("grokkearnos a nosotros mismos", L["verb_refl"])
    text = text.replace("grokkeando", L["verb_ger"])
    text = text.replace("grokkeamos", L["verb_1p"])
    text = text.replace("grokkearse", L["verb_refl"])
    text = text.replace("grokkearnos", L["verb_refl"])
    text = text.replace("grokkear", L["verb_inf"])
    text = re.sub(r"grokke[ar]+", L["verb_inf"], text)
    return text


def main():
    for code, L in LANGS.items():
        lines = [
            '// STUB locale for grok-the-rock.',
            '// Only UI chrome is localized. All other strings fall back to the',
            '// inline English original (the i18n loader shows English for any',
            '// key omitted here) until a human translator fills them in.',
            '//',
            '// Convention: keep the proper noun "Grok" as-is. Translate "Grok the Rock" per language.',
            '// recognizable transliteration. Localize only the VERB "grok" using',
            '// the productive verb-forming slot of this language. The agent noun',
            '// "Grokkers" stays English everywhere.',
            f'// Coined verb ({code}): {L["verb_inf"]} (inf.) / {L["verb_ger"]} (ger.) / {L["verb_refl"]} (refl.)',
            'window.I18N = window.I18N || {};',
            f'window.I18N.{code} = {{',
            f'  "__title": "{L["title"]}",',
            '',
            f'  "site.title": "{L["title"]}",',
            f'  "nav.rules": "{L["nav_rules"]}",',
            f'  "nav.about": "{L["nav_about"]}",',
            f'  "nav.book": "{L["nav_book"]}",',
            '',
            f'  "title.h1": "{L["h1"]}",',
            f'  "title.h2": "{L["h2"]}",',
            f'  "title.h3": "{L["h3"]}",',
            '',
            f'  "site.title.rules": "{L["title"]}",',
            f'  "site.title.about": "{L["title"]}"',
            '};',
            '',
        ]
        with open(f"lang/{code}.js", "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        print(f"wrote lang/{code}.js")


if __name__ == "__main__":
    main()
