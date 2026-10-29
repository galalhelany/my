#!/usr/bin/env python3
"""Generate static, bilingual product cards using the existing project-card markup.

Run after editing data/independent-products.json. --check verifies committed HTML
without writing it. No build step or browser-side renderer is required.
"""
import argparse
from html import escape
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
START = "    <!-- independent-products:start -->"
END = "    <!-- independent-products:end -->"


def render_card(product, lang, labels):
    copy = product[lang]
    image = product["image"]
    # An optional localized caseStudyUrl can later use the existing second zone.
    case_url = copy.get("caseStudyUrl")
    content_url = case_url or product["liveUrl"]
    content_attrs = ('data-project-cursor-zone="case"' if case_url else
                     'target="_blank" rel="noopener noreferrer" data-project-cursor-zone="live"')
    e = lambda value: escape(str(value), quote=True)
    logo = product['logo']
    # Keep the method name readable and together inside Arabic copy as well.
    description = e(copy['description']).replace('Flow Pomodoro.', '<bdi dir="ltr">Flow&nbsp;Pomodoro.</bdi>')
    description = description.replace('Flow Pomodoro', '<bdi dir="ltr">Flow&nbsp;Pomodoro</bdi>')
    return f'''          <li class="project-card-item">
            <article class="project-card project-card--dual project-card--product" data-project-dual-card
              data-product-id="{e(product['id'])}" data-project-live-label="{e(labels['liveLabel'])}">
              <figure>
                <figcaption>
                  <a class="project-card__case-content" href="{e(content_url)}" {content_attrs}
                    aria-label="{e(copy.get('caseStudyLabel', copy['name']) if case_url else copy['linkLabel'])}">
                    <span class="project-card__date"><span aria-hidden="true"></span>{e(copy['status'])}</span>
                    <img class="project-card__logo" src="{e(logo['src'])}" alt="{e(copy['logoAlt'])}"
                      width="{logo['width']}" height="{logo['height']}" loading="lazy" decoding="async">
                    <h3 class="project-card__name"><bdi>{e(copy['name'])}</bdi></h3>
                    <p class="project-card__description">{description}</p>
                  </a>
                </figcaption>
                <a class="project-card__media-link" href="{e(product['liveUrl'])}" target="_blank"
                  rel="noopener noreferrer" data-project-cursor-zone="live" aria-label="{e(copy['linkLabel'])}">
                  <img src="{e(image['src'])}" alt="{e(copy['alt'])}"
                    width="{image['width']}" height="{image['height']}" loading="lazy" decoding="async">
                </a>
                <span class="project-card__cursor" aria-hidden="true">
                  <svg class="project-card__cursor-icon" viewBox="0 0 24 24">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                  <span data-project-cursor-label>{e(labels['liveLabel'])}</span>
                </span>
              </figure>
            </article>
          </li>'''


def render(data, lang):
    labels = data["section"][lang]
    cards = "\n".join(render_card(product, lang, labels) for product in data["products"])
    return f'''{START}
    <section class="section independent-products" id="things-ive-built" aria-labelledby="independent-products-title">
      <div class="content">
        <header class="project-showcase__intro">
          <h2 id="independent-products-title">{escape(labels['title'])}</h2>
          <p>{escape(labels['description'])}</p>
        </header>
        <ul class="project-grid">
{cards}
        </ul>
      </div>
    </section>
{END}'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    data = json.loads((ROOT / "data/independent-products.json").read_text())
    stale = []
    for lang, filename in (("en", "index.html"), ("ar", "index-ar.html")):
        path = ROOT / filename
        current = path.read_text()
        generated = render(data, lang)
        if START in current:
            updated = re.sub(re.escape(START) + r".*?" + re.escape(END),
                             lambda _: generated, current, flags=re.S)
        else:
            marker = '    <section class="section values" id="principles">'
            assert current.count(marker) == 1, "Expected one Principles section"
            updated = current.replace(marker, generated + "\n\n" + marker)
        if current != updated:
            stale.append(filename)
            if not args.check:
                path.write_text(updated)
    if args.check and stale:
        parser.exit(1, "Product markup is stale: " + ", ".join(stale) + "\n")
    print("Product markup is up to date." if args.check else "Product sections generated.")


if __name__ == "__main__":
    main()
