# CCAST Documentation Hub

Source repository for **docs.ccast.ndsu.edu** — user documentation for NDSU's Center for Computationally Assisted Science and Technology (CCAST).

Built with [MkDocs](https://www.mkdocs.org/) and the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme, following the Docs-as-Code approach used by HPC centers such as ALCF and NERSC.

## Repository layout

```
ccast-docs/
├── mkdocs.yml            # single site configuration file (theme, features, navigation)
├── requirements.txt      # Python dependencies
├── .github/workflows/    # CI: build check + GitHub Pages deploy
└── docs/
    ├── index.md          # homepage
    ├── stylesheets/      # ndsu branding
    ├── assets/           # ndsu logo
    ├── getting-started/  # user guide, logging in, FAQ
    ├── running-jobs/     # Slurm and legacy PBS job submission
    ├── systems/          # Thunder, Thunder Prime
    ├── software/         # Python, R, MATLAB, Gaussian, LAMMPS, GROMACS, containers, ...
    ├── storage-data/     # data management, Globus
    ├── policies/         # usage policies
    ├── training/         # bootcamps, workshops, internship program
    └── about/            # center overview, publications, research highlights
```

## Local preview

```bash
module load python/3.12.2
pip install -r requirements.txt
```
From a new terminal on your laptop:
```
ssh -L 8001:127.0.0.1:8000 user.name@prime.ccast.ndsu.edu
```

Then, in another terminal/session on the cluster, run:
```
cd ccast-docs
module load python/3.12.2
mkdocs serve
```

Open <http://127.0.0.1:8001>. The browser refreshes automatically as pages are edited.

## Making changes

1. Create a branch, edit or add Markdown files under `docs/`.
2. If you add a page, register it under `nav:` in `mkdocs.yml`.
3. Preview locally with `mkdocs serve`.
4. Open a pull request; a second staff member reviews and merges.

## Migration status

All 27 Knowledge Base articles and PDF guides have been auto-converted to Markdown as a starting point. **Every page carries a "Migration note" admonition until reviewed.** During review, for each page:

- [ ] Verify headings (auto-detected; some may be missing or wrong)
- [ ] Verify code blocks (shell commands and job scripts were fenced heuristically)
- [ ] Re-insert screenshots/figures (images were not migrated; page images from the KB export are available on request)
- [ ] Rebuild any tables (flattened to text during conversion)
- [ ] Fix multi-line links and re-flow hard-wrapped paragraphs
- [ ] Remove the migration note admonition when done

Each page's migration note links back to its source KB article for side-by-side comparison.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes to GitHub Pages. For production, the built `site/` directory can instead be served from CCAST/NDSU web infrastructure at docs.ccast.ndsu.edu (see the modernization proposal).
