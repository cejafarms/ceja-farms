# /images — photo slots

Drop photos in this folder using the **exact filenames** below and they appear
automatically — no code changes needed.

Save as JPG (quality ~85), sRGB. Match the **aspect ratio** so nothing crops
oddly; the pixel sizes are recommended targets.

## How an empty slot behaves

There are no grey "placeholder" panels any more. A slot whose photo hasn't
landed yet either **disappears** (card, project, gallery and photo-grid
pictures — the card simply reads as a text card) or becomes a **brand-toned
surface** that flows with the page (the big hero and callout backgrounds,
where something has to sit behind the copy).

Card and project photos are dropped **as a set**, so a row never ends up half
photographed and half not. That means a `.cards` row only shows pictures once
*every* photo in it has landed.

To see what's still missing while you work, add `show-slots` to the `<body>`
tag of a page — the empty slots light up with their filename and target size.

---

## ✅ Already filled

**From the four photos supplied 3 Sep 2026** (originals kept as
`Screenshot 2026-09-03 *.png` — safe to delete once you're happy with the crops):

| File | Used on |
|---|---|
| `strip-vinyards.jpg`, `strip-rentals.jpg`, `strip-tap.jpg` | Home — feature strip |
| `service-vineyard-removal.jpg`, `service-field-services.jpg` | Home — service cards |
| `vy-removal.jpg`, `vy-maintenance.jpg` | Vinyards — solution cards |
| `gallery-1..4.jpg` | Vinyards — photo strip |

**From the two cherry photos emailed 8 Sep 2026** (`IMG_3025`, `IMG_3028` —
originals kept in the project root, git-ignored):

| File | Used on |
|---|---|
| `cherry-hero.jpg` | Cherries — page hero |
| `strip-cherries.jpg` | Home — feature strip |
| `cherry-gallery-1.jpg`, `cherry-gallery-2.jpg` | Cherries — photo strip |

**Frames pulled from the drone and phone footage** (the masters are in the
project root, git-ignored). These are cut from 960×540–1280×720 video, so they
are soft on high-DPI screens — replacing any of them with a real camera file
under the same name is a straight upgrade:

| File | Source clip | Used on |
|---|---|---|
| `hero-vineyard-removal.jpg` | pulling vinyards | Home — hero |
| `vineyard-hero.jpg` | pulling vinyards | Vinyards — page hero |
| `tap-hero.jpg`, `tap-what-is.jpg`, `tap-eligible-bg.jpg` | pulling vinyards / Moving debree | Tap |
| `tap-vineyard-sunset.jpg` | pulling vinyards | Home + Vinyards — TAP callout |
| `about-hero.jpg`, `about-band-bg.jpg` | Moving debree / pulling vinyards | About |
| `projects-hero.jpg`, `projects-cta.jpg` | pulling vinyards / Moving debree | Projects |
| `rentals-hero.jpg`, `rentals-project.jpg` | Moving equiptment | Rentals |
| `contact-hero.jpg` | Moving equiptment | Contact |
| `gallery-5.jpg` | Moving debree | Vinyards — photo strip |
| `cherry-gallery-3..5.jpg`, `tap-orchard.jpg` | cherry harvest clips | Cherries |
| `cherry-harvest-poster.jpg` | cherry harvest clip | Cherries — video poster |
| `community-lodi-parade-poster.jpg`, `community-harvest-crews-poster.jpg` | community clips | Home — video posters |

---

## Still needed

Until these land, the cards they belong to show as text cards (or, for
`about-crew.jpg`, a warm gradient panel). Nothing looks broken without them.

### Home — service cards
Photographed as a set: all four are needed before *any* of the six service
cards show a picture.

| Filename | Size | Ratio | Subject |
|---|---|---|---|
| `service-vineyard-planting.jpg` | 900 × 320 | 45:16 | Newly planted, staked vineyard rows |
| `service-grape-harvesting.jpg` | 900 × 320 | 45:16 | Bins of picked wine grapes |
| `service-cherry-planting.jpg` | 900 × 320 | 45:16 | Blossoming cherry orchard |
| `service-cherry-harvesting.jpg` | 900 × 320 | 45:16 | Ripe cherries ready to pick |

### Vinyards — solution cards
| Filename | Size | Ratio | Subject |
|---|---|---|---|
| `vy-planting.jpg` | 800 × 480 | 5:3 | Newly planted vineyard with grow tubes |
| `vy-harvesting.jpg` | 800 × 480 | 5:3 | Harvest trailer full of wine grapes |

### Cherries — solution cards
| Filename | Size | Ratio | Subject |
|---|---|---|---|
| `ch-planting.jpg` | 800 × 450 | 16:9 | Young staked cherry trees |
| `ch-development.jpg` | 800 × 450 | 16:9 | Cherry blossom on the branch |
| `ch-harvesting.jpg` | 800 × 450 | 16:9 | Picking crew working a row from a harvest rig |
| `ch-postharvest.jpg` | 800 × 450 | 16:9 | Bins of picked cherries at the edge of the orchard |

### Rentals — equipment cards
| Filename | Size | Ratio | Subject |
|---|---|---|---|
| `eq-dozers.jpg` | 800 × 600 | 4:3 | Dozer on a job |
| `eq-tractors.jpg` | 800 × 600 | 4:3 | Tractor with an implement |
| `eq-loaders.jpg` | 800 × 600 | 4:3 | Wheel loader |
| `eq-flail-mowers.jpg` | 800 × 600 | 4:3 | Flail mower in a vineyard row |
| `eq-water-trucks.jpg` | 800 × 600 | 4:3 | Water truck on a field road |

### Projects — project cards
`project-1.jpg` … `project-8.jpg`, 900 × 600 (3:2). One photo per project, in
the order the cards appear on the page.

### About
| Filename | Size | Ratio | Subject |
|---|---|---|---|
| `about-crew.jpg` | 1000 × 900 | 10:9 | Team member looking out over a vineyard |
| `about-1..4.jpg` | 800 × 600 | 4:3 | Four-up grid: tractor in a row, summer vines, cherry blossom, water truck |
| `owner.jpg` | 600 × 600 | 1:1 | Portrait of David Ceja (shown as a circle) |
