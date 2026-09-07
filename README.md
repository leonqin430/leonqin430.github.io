# Personal Homepage

A static personal academic homepage. Layout follows
[Pingchuan Ma's template](https://github.com/PingchuanMa/PingchuanMa.github.io)
(which is explicitly offered for reuse); colors, font, and the Selected/All
publication toggle follow [Grace Luo's homepage](https://graceluo.net).
No framework — plain HTML/CSS/JS, fully self-contained except Google Fonts.

## Structure

```
index.html        # all content lives here
css/style.css     # palette tokens at the top, layout below
js/script.js      # theme toggle, Selected/All filter, bibtex collapse/copy
assets/           # profile photo + publication teasers (to be added)
```

## Editing content

- Everything marked `TODO` / `[brackets]` in `index.html` is placeholder.
- **Publications**: copy a `.pub-item` block (text-only; no teaser figures
  by design). Add `data-tags="selected"` to entries that should appear under
  the "Selected" filter (default view); entries with `data-tags=""` only
  appear under "All".
- **Colors**: all in the `:root` block at the top of `css/style.css`
  (dark theme, the site default) and the `:root[data-theme="light"]`
  block below it (the toggle choice).

## Preview locally

Just open `index.html` in a browser, or:

```
python3 -m http.server 8000
```

## Deploy (GitHub Pages)

1. Create a repo named `<username>.github.io`.
2. Push these files to its `main` branch.
3. The site appears at `https://<username>.github.io` within a minute.
