# Cybersecurity showcase

The section lives in the right side of the `/cybersecurity` hero. The rest of the page is unchanged by this section update.

## Editing

- `src/components/cybersecurity/showcase-data.ts`: one collection containing IDs, button labels, illustrative role titles, explanations, frameworks, portrait URLs and alt text.
- `src/components/cybersecurity/security-showcase.tsx`: individual 640 ms 3D flips and staggered updates every 1.45 seconds.
- `src/components/cybersecurity/security-showcase.module.css`: scoped 6-column, 7-row mosaic, perspective, portrait framing, stable layout and reduced-motion styles.
- `public/images/cybersecurity/`: local WebP portraits (800 px maximum dimension). Replace images here or update the paths in the collection.
- `src/app/(site)/cybersecurity/page.tsx`: section integration.
- `package.json` and `package-lock.json`: Motion dependency.

Role explanations appear below the mosaic. An invisible sizing grid reserves room for the longest explanation, keeping the mosaic and surrounding content stable during selection. Tiles retain the same six-column layout on mobile. Keep IDs unique. Roles describe illustrative work, not named employees, certifications or endorsements.

## Behavior

The reference recording shows automatic portrait/framework tile changes while the surrounding hero remains fixed. The implementation uses 42 tiny boxes in six columns and seven rows. Each has a portrait face and a black framework face. Individual boxes rotate around their vertical axis, not the entire card. A dispersed deterministic sequence flips two boxes every 1.45 seconds; each flip takes 640 ms and begins after a short initial delay. Tile positions and the grid dimensions stay fixed.

Visible playback controls and placeholder captions have been removed for the public marketing page. Keyboard focus, a hidden browser tab and scrolling the mosaic out of view suspend animation; hovering a specific tile holds that tile while others continue. Pointer selection keeps the loop running. Keyboard navigation holds the loop while the grid has focus. Selected tiles have a stable inset outline. Reduced motion disables automatic changes and makes manual changes instant. A live matchMedia subscription handles preference changes without reloading; the installed Motion hook only reads the preference once per mount. Selecting a tile flips it and updates the short role explanation beneath the mosaic. Arrow keys move through the boxes; Home and End reach the first and last. Focus stays on the same button throughout each flip. Each tile has one persistent accessible button; its two visual faces are hidden from assistive technology. Every portrait remains paired with the same illustrative role, explanation and relevant framework, all from one editable collection.

## Portrait generation

Generated with the built-in imagegen tool; fictional adults, not real staff. No source photographs were found in the repository. Source PNGs remain in the tool's generated-images directory; production WebPs are local to this project.

Final prompt for `public/images/cybersecurity/program-lead.webp`:

> Use case: photorealistic-natural. Create a single fictional editorial headshot for a cybersecurity role showcase website. Black woman in her early 40s, deep brown skin, natural shoulder-length twists, understated charcoal office attire. Authentic warm composed expression, head and shoulders, looking toward camera, centered consistent portrait crop, soft office window lighting, neutral warm gray softly blurred office background. Visible natural skin texture, realistic facial details. No text, logos, watermark, costumes, hacker cliches, endorsement or certification marks. Save the generated asset for use in the local website project.

Final prompt for `public/images/cybersecurity/information-security-manager.webp`:

> Use case: photorealistic-natural. Single fictional editorial cybersecurity professional headshot for a website. Subject: Black man in his late 50s, medium-dark brown skin, close cropped silver natural hair and a neatly trimmed salt-and-pepper beard, relaxed dark gray business casual shirt. Head and shoulders, centered square portrait, authentic composed friendly expression, looking at camera, soft office window lighting, warm gray softly blurred office background. Visible skin texture, natural realistic facial details, consistent editorial photography framing. No text, logos, watermark, costume, hacker cliches, certification or endorsement marks.

Final prompt for `public/images/cybersecurity/controls-lead.webp`:

> Use case: photorealistic-natural. Single fictional editorial cybersecurity professional headshot for a website. Subject: Black woman in her late 20s, medium brown skin, short natural afro, understated dark office attire. Head and shoulders, centered square portrait, authentic composed friendly expression, looking at camera, soft office window lighting, warm gray softly blurred office background. Visible skin texture, natural realistic facial details, consistent editorial photography framing. No text, logos, watermark, costume, hacker cliches, certification or endorsement marks.

## Verification

- TypeScript and the production build passed, including all 41 generated pages.
- Native Edge preview verified at desktop size and 375 px emulated phone width. The direct browser connector is unavailable, but native browser control worked.
- Observed independent 3D flips inside the fixed grid, including a mid-flip frame, with all nine local portraits loaded.
- Verified pointer selection updates the matching role and leaves autoplay running.
- Verified arrow-key navigation updates the role and pauses the loop; tile states stayed unchanged across a pause interval.
- Verified rapid mobile-emulated selections settle on the latest tile without shifting the detail area.
- Verified changing reduced-motion emulation updates the mounted component to Motion off without a reload, stops the loop and still permits manual selection. Reset the preference after the test.
- Closed DevTools, reset device emulation and left the normal desktop preview open at the hero.
- Physical-device touch, Safari and performance profiling were not tested.
- The existing lint script (`next lint`) is unsupported by the installed Next.js version; lint configuration was kept outside this section change.

Manual review: open `/cybersecurity`, observe scattered boxes flipping without clicking, click a box to flip it and explore the role, navigate with arrows, inspect at 390 px width, and enable reduced motion to confirm instant manual changes and disabled automatic flips.

## Additional mosaic portraits

Six additional fictional portraits were generated with the built-in imagegen tool and saved as WebP assets under `public/images/cybersecurity/`. Each uses this final prompt template with its subject inserted:

> Use case: photorealistic-natural. Single fictional cybersecurity professional editorial headshot for a tiny website portrait tile. Subject: {subject}. Centered head-and-shoulders portrait, entire head visible with a little space above hair, looking at camera with natural confident friendly expression. Neutral light gray softly blurred office background, soft window lighting, realistic facial anatomy and visible skin texture. Consistent framing and authentic photography. No text, watermark, logos, costumes, hacker cliches, certification or endorsement marks.

| Asset filename | Subject |
| --- | --- |
| security-engineer.webp | Black man in his early 30s, dark brown skin, short natural coily hair and neatly trimmed beard, charcoal crew-neck and casual blazer |
| incident-responder.webp | Black woman in her 50s, medium brown skin, short salt-and-pepper natural curls, simple dark blouse |
| cloud-specialist.webp | Black woman in her early 30s, dark brown skin, natural hair in a high puff, thin understated glasses, gray office shirt |
| threat-analyst.webp | Black man in his 40s, lighter brown skin, shaved head, close beard, simple black office shirt |
| identity-engineer.webp | Black man in his late 20s, medium brown skin, short natural locs, navy casual office shirt |
| audit-lead.webp | Black woman in her 60s, deep brown skin, short silver natural afro, charcoal office jacket |

The `securityShowcaseItems` collection in `showcase-data.ts` controls every portrait path, role, explanation, topic label and framework. The fixed tile arrangement is near the top of `security-showcase.tsx`.

The production build passed for the mosaic update, including generation of all 41 pages.

Final HTTP verification: `/cybersecurity` returned 200 with exactly 42 mosaic buttons, and all nine local WebP portrait URLs returned 200. All nine portrait assets were visually inspected.

## Production marketing update

The founder-focused security-review section links to `/contact?securityReview=1#engagement-form`, prefilling a free 15-minute call request. It requests a conversation; it does not claim a booked appointment. The user will replace the current generated role artwork with real photographs later; the imagery does not identify staff or endorse the business. Asset paths remain in `showcase-data.ts`. Simulated copilot responses, fake API examples and unfinished article stubs are removed from the public experience.
