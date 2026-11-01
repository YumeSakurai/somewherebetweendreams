# Private writing studio — setup required once

The ZIP now contains the CMS files and the site-side integration. The publishing connection is **not active yet** because Decap Turbo must first be connected to the GitHub repository and its site ID added to `admin/config.yml`.

## What is included

- `admin/` — private Decap CMS interface, configuration, YouTube embed control and preview styling.
- Homepage — a `New Post` shortcut that is hidden by default and appears in the same browser after a successful CMS login.
- `_layouts/post.html` and `style.css` — per-post typography controls.
- `_config.yml` — GitHub Pages project-site URL/base path.

## One-time secure connection

1. Create a Decap Turbo account at https://decapcms.org/turbo/ .
2. In Turbo, connect GitHub and install/authorize the Decap Turbo GitHub App for the repository `YumeSakurai/somewherebetweendreams`.
3. Create a Turbo site for:
   - Provider: GitHub
   - Repository: `YumeSakurai/somewherebetweendreams`
   - Branch: `main`
   - Config path: `admin/config.yml`
   - Admin interface URL: `https://yumesakurai.github.io/somewherebetweendreams/admin/`
4. Copy the Site ID shown in the Turbo site's Overview page.
5. Open `admin/config.yml` in GitHub and replace:
   `REPLACE_WITH_YOUR_DECAP_TURBO_SITE_ID`
   with the actual Site ID. Do not add quotation marks unless the ID format requires them.
6. Upload/commit the updated site files to the `main` branch and wait for GitHub Pages to finish deploying.
7. Open `https://yumesakurai.github.io/somewherebetweendreams/admin/` and sign in with the Turbo account that owns the site.

Turbo access is the security boundary: only the Turbo account/site members you authorize can publish. The homepage button's local-storage marker is only a visibility convenience; it is not the security mechanism.

## Publishing a post

In the editor, create a Journal Post and manually set:
- Post title (your date-style titles are supported)
- Post date and time
- Preview
- Published toggle

Then choose alignment, font family, font size, line spacing and paragraph spacing. Write in the rich-text body. Use the image control to upload images into `journal-images`, or the YouTube video control to embed a video. Save/publish to commit the post to GitHub.

## Notes

- The CMS generates filenames in the Jekyll date-based format `YYYY-MM-DD-slug.md`. The title remains whatever you type in the title field.
- Images are saved in `journal-images` and their public paths include the GitHub Pages project base path.
- `Save`/`Publish` in Decap writes a Git commit; GitHub Pages then rebuilds the public site.
- The New Post shortcut appears in the browser after CMS login. If it is not visible on an already-open homepage tab, refresh that tab.
- This first version provides rich-text formatting, image uploads, YouTube embeds, and per-post typography settings. It does not provide arbitrary per-word font-size/color controls; those would require a custom rich-text editor extension.
