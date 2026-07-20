# Contribute to These Docs

These guides are built with [MkDocs](https://www.mkdocs.org/) and the
[Material](https://squidfunk.github.io/mkdocs-material/) theme, and the source
lives on GitHub. Corrections and additions from CCAST users are welcome.

## Quick fixes

Every page has a pencil icon in its top-right corner. It opens that page's
Markdown source in the GitHub editor, where you can make a change and open a
pull request without cloning anything.

## Larger changes

```bash
git clone https://github.com/SaraTolba/ccast-docs.git
cd ccast-docs
python -m venv env && source env/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Then open the local preview URL that `mkdocs serve` prints.

Before opening a pull request, confirm the site still builds cleanly:

```bash
mkdocs build --strict
```

`--strict` turns broken links, missing pages, and pages left out of the
navigation into build failures rather than warnings.

## Reporting a problem

If something is wrong but you would rather not edit it yourself, open an issue
on the repository or email
[ndsu.ccast.support@ndsu.edu](mailto:ndsu.ccast.support@ndsu.edu).
