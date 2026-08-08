#!/usr/bin/env python3
"""
Generate the German site from the English pages + i18n.js.

    python3 build-i18n.py

Each language gets its own URL — /cea/ and /de/cea/ — because that is what
Google requires in order to index both. A single URL that swaps language in
JavaScript is only ever crawled in its fallback language, which is how every
German string on this site used to be invisible to search engines.

Same shape as build-gallery.py: a local script whose output is committed.
GitHub Pages still serves plain files; nothing builds in CI.

What it does, per page:

  * rewrites the English fallbacks from i18n.js `en:`  (so i18n.js is the
    single source of truth and fallbacks cannot drift)
  * writes de/<path> with the `de:` values, lang="de", German canonical and
    og:url, og:locale de_CH
  * rewrites internal links to stay inside the language tree
  * adds reciprocal hreflang (en / de / x-default) to both copies

Run it after ANY edit to i18n.js. `node validate.js` fails if you forget.
"""

import json, os, re, shutil, subprocess, sys

ROOT   = os.path.dirname(os.path.abspath(__file__))
ORIGIN = 'https://jimenofonseca.com'

# i18n.js ends in an IIFE that touches document/localStorage, so read it
# through node with those stubbed — the same trick validate.js uses.
DUMP = """
const vm=require('vm'),fs=require('fs');
const s={document:{documentElement:{classList:{add(){},toggle(){}},setAttribute(){}},
  querySelectorAll:()=>({forEach(){}}),addEventListener(){},readyState:'complete',title:''},
  localStorage:{getItem:()=>null,setItem(){}},console};
s.window=s;vm.createContext(s);
vm.runInContext(fs.readFileSync(process.argv[1],'utf8'),s);
process.stdout.write(JSON.stringify(s.TRANSLATIONS));
"""


def translations():
    out = subprocess.run(['node', '-e', DUMP, os.path.join(ROOT, 'i18n.js')],
                         capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def source_pages():
    """The English content pages. Redirect stubs and de/ are excluded."""
    pages = ['index.html']
    for d in sorted(os.listdir(ROOT)):
        p = os.path.join(d, 'index.html')
        if d in ('de', '_old', 'assets', 'node_modules', 'private-src'):
            continue
        if d.startswith('.') or d.startswith('_'):
            continue
        if os.path.isdir(os.path.join(ROOT, d)) and os.path.exists(os.path.join(ROOT, p)):
            pages.append(p)
    return [p for p in pages
            if '<meta http-equiv="refresh"' not in read(p)]


def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read()


def write(rel, s):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def attr(t):
    return esc(t).replace('"', '&quot;')


def url_for(rel):
    """'index.html' -> '/'   'cea/index.html' -> '/cea/'"""
    return '/' if rel == 'index.html' else '/' + os.path.dirname(rel) + '/'


def apply_lang(html, t):
    """Swap every data-i18n* fallback for its value in `t`."""
    def text(m):
        tag, attrs, key = m.group(1), m.group(2), m.group(3)
        return f'<{tag}{attrs}>{esc(t[key])}</{tag}>' if key in t else m.group(0)
    html = re.sub(r'<(\w+)([^>]*\bdata-i18n="([^"]+)"[^>]*)>[\s\S]*?</\1>', text, html)

    def html_(m):
        tag, attrs, key = m.group(1), m.group(2), m.group(3)
        return f'<{tag}{attrs}>{t[key]}</{tag}>' if key in t else m.group(0)
    html = re.sub(r'<(\w+)([^>]*\bdata-i18n-html="([^"]+)"[^>]*)>[\s\S]*?</\1>', html_, html)

    def content(m):
        head, key, mid = m.group(1), m.group(2), m.group(3)
        return f'{head}{key}{mid}content="{attr(t[key])}"' if key in t else m.group(0)
    html = re.sub(r'(<[^>]*\bdata-i18n-content=")([^"]+)("[^>]*\b)content="[^"]*"', content, html)

    def aria(m):
        head, key, mid = m.group(1), m.group(2), m.group(3)
        return f'{head}{key}{mid}aria-label="{attr(t[key])}"' if key in t else m.group(0)
    html = re.sub(r'(<[^>]*\bdata-i18n-aria=")([^"]+)("[^>]*\b)aria-label="[^"]*"', aria, html)
    return html


def translate_static_meta(html, en, de):
    """og: and twitter: tags are deliberately static — scrapers do not run JS,
    so they carry no data-i18n attribute and the fallback swap above misses
    them. Left alone, a German page shared on LinkedIn shows an English card.

    Match each content="…" against the `en:` values and swap in the German
    one only on an exact hit, so URLs, image dimensions and og:locale are
    never touched by accident."""
    rev = {}
    for k, v in en.items():
        if isinstance(v, str) and k in de:
            rev.setdefault(attr(v), k)

    def swap(m):
        head, value = m.group(1), m.group(2)
        key = rev.get(value)
        return f'{head}content="{attr(de[key])}"' if key else m.group(0)

    return re.sub(r'(<meta (?:property|name)="(?:og|twitter):[^"]+"\s+)content="([^"]*)"',
                  swap, html)


def hreflang_block(path):
    """Reciprocal annotations. x-default points at English."""
    en, de = ORIGIN + url_for(path), ORIGIN + '/de' + url_for(path)
    return (f'  <link rel="alternate" hreflang="en" href="{en}" />\n'
            f'  <link rel="alternate" hreflang="de" href="{de}" />\n'
            f'  <link rel="alternate" hreflang="x-default" href="{en}" />\n')


def strip_hreflang(html):
    return re.sub(r'  <link rel="alternate" hreflang="[^"]*" href="[^"]*" />\n', '', html)


def add_hreflang(html, path):
    html = strip_hreflang(html)
    # sits directly after the canonical, which every page has
    return re.sub(r'(  <link rel="canonical" href="[^"]*" />\n)',
                  lambda m: m.group(1) + hreflang_block(path), html, count=1)


INTERNAL = re.compile(r'href="(/(?!de/)[^"]*)"')
ASSET    = re.compile(r'\.(css|js|jpg|jpeg|png|svg|webp|mp4|ico|xml|txt)$')


def to_german(html, path, en, de):
    """Everything that has to change for the /de/ copy."""
    html = html.replace('<html lang="en">', '<html lang="de">', 1)
    html = translate_static_meta(html, en, de)

    # internal navigation stays inside the German tree; assets do not move
    def link(m):
        href = m.group(1)
        if ASSET.search(href.split('#')[0].split('?')[0]):
            return m.group(0)
        return f'href="/de{href}"'
    html = INTERNAL.sub(link, html)

    en_url, de_url = ORIGIN + url_for(path), ORIGIN + '/de' + url_for(path)
    html = html.replace(f'<link rel="canonical" href="{en_url}" />',
                        f'<link rel="canonical" href="{de_url}" />', 1)
    html = html.replace(f'<meta property="og:url" content="{en_url}" />',
                        f'<meta property="og:url" content="{de_url}" />', 1)
    html = html.replace('<meta property="og:locale" content="en" />',
                        '<meta property="og:locale" content="de_CH" />', 1)
    # Person JSON-LD url must agree with this page's canonical
    html = html.replace(f'"url": "{en_url}"', f'"url": "{de_url}"')

    # language switcher: German page offers English
    html = re.sub(
        r'            <span class="opt lang-opt active">EN</span>\n'
        r'            <span class="sep">/</span>\n'
        r'            <a class="opt lang-opt" href="[^"]*" hreflang="de" lang="de">DE</a>\n',
        f'            <a class="opt lang-opt" href="{url_for(path)}" hreflang="en" lang="en">EN</a>\n'
        '            <span class="sep">/</span>\n'
        '            <span class="opt lang-opt active">DE</span>\n', html)
    return html


def main():
    T = translations()
    en, de = T['en'], T['de']
    pages = source_pages()

    de_dir = os.path.join(ROOT, 'de')
    if os.path.isdir(de_dir):
        shutil.rmtree(de_dir)

    for p in pages:
        src = read(p)

        # English page: refresh fallbacks from en:, add hreflang
        out_en = add_hreflang(apply_lang(src, en), p)
        write(p, out_en)

        # German page: de: values, then all the URL/locale rewrites
        out_de = to_german(add_hreflang(apply_lang(src, de), p), p, en, de)
        write(os.path.join('de', p), out_de)

        print(f'  {p:<34} -> de/{p}')

    print(f'\n{len(pages)} pages x 2 languages. Now run: node validate.js')


if __name__ == '__main__':
    sys.exit(main())
