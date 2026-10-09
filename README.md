# Roi Nañawa · portfolio site

A one-page static site: `index.html`, `styles.css`, `script.js` and the `assets/` folder. There is no build step, and it also works when you open `index.html` straight from disk.

## Publish on GitHub Pages

1. **Create the repository.** On GitHub, create a new **public** repository named exactly `<your-username>.github.io`. Your username is the name in your profile URL, `github.com/<your-username>`. Your git noreply address suggests it is `Rowee723`, which would make the repository `Rowee723.github.io`. Leave "Add a README" unticked.
2. **Upload the files.** On the new repository's page, click **uploading an existing file**. Drag in the *contents* of this folder, not the folder itself, so that `index.html` sits at the top level of the repository:
   - `index.html`, `styles.css`, `script.js`, `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `README.md`
   - the whole `assets` folder

   Then click **Commit changes**.

   If you use git instead:
   ```sh
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. **Turn on Pages.** In the repository, go to **Settings → Pages → Build and deployment** and set:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**

   Click **Save**. After a minute or two the site is live at `https://<your-username>.github.io/`, always in lowercase. The Pages settings screen shows the address and a **Visit site** button.
4. **Check the share preview address.** LinkedIn, Slack and similar apps need absolute URLs for the preview image. The `<head>` of `index.html` uses `https://rowee723.github.io/` in five places: `canonical`, `og:url`, `og:image`, `twitter:image` and a comment. If your username is different, find and replace that address with yours, then upload `index.html` again. Once the site is live, you can paste the link into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to check the preview and refresh LinkedIn's cache.
5. **Before you share the link anywhere,** open `https://<your-username>.github.io/assets/img/og-card.jpg` in a browser and check the image loads. LinkedIn and Slack keep the first preview they fetch, so a link shared before the site is live, or under a different address, stays without a picture until you refresh it in the Post Inspector.
6. **Then update the resume:** the portfolio link in the PDF still points to the Canva site. Change it to your new address in the source document, set the document title to "Roi Tristan A. Nañawa – Resume" so it shows in the browser tab, and export the PDF again.

## Swap a screenshot

All images are in `assets/img/`.

- **Same file name, same shape: no code change.** Replace the file with your new image under the same name, keeping the same orientation and roughly the same proportions.
- **Different proportions:** each `<img>` in `index.html` has `width` and `height` attributes, which reserve space while the page loads. Set them to the new image's pixel size. Only the ratio matters. Current sizes:

  | Images | Size |
  | --- | --- |
  | Blockstone Island screenshots | 324 × 700 |
  | Fill This Hole screenshots | 394 × 700 |
  | Instant Garden screenshots | 1280 × 592 |
  | WrestleQuest, Mutya and Mega Cat stills | 1280 × 720 |
  | Operation S.Y.B.E.R. stills | 1280 × 606 |
  | App icons | 512 × 512 (plus a 256 × 256 `-256` copy) |
  | Share card (`og-card.jpg`) | 1200 × 630 |

- **Size variants:** most images come in two sizes, listed in the `<img>`'s `srcset`, and the browser picks the one that suits the screen. Landscape stills have a 640 px wide `-640.jpg` copy, icons a `-256.jpg` copy, the WrestleQuest key art a `-320.jpg` copy, and the Blockstone Island key art and phone shots a double-size `-2x.jpg` copy (647 × 1400). When you swap an image, replace every size of it, or remove the `srcset` and `sizes` attributes from that `<img>`.
- **Keep files small:** aim for 250 KB or less per image. Export as JPG at about 80% quality and no wider than 1280 px; [Squoosh](https://squoosh.app) does this in the browser.
- **Update the alt text** on that `<img>` so it describes the new picture.
- **Add or remove a screenshot:** copy or delete one `<div class="phone …">` or `<div class="screen …">` block inside that game's `gallery-track`. On phones, each gallery becomes a sideways-swipe strip by itself.
- **Keep the credit lines** (`<figcaption class="credit">`) under each game's images. The store art belongs to the studios and publishers.
- **See the change:** GitHub Pages and browsers cache files. If the old image still shows, press Ctrl+F5. LinkedIn caches the share card separately; re-run the Post Inspector to refresh it.

## Update the resume

Replace `assets/Roi_Nanawa_Resume.pdf`, keeping the same file name. Use a version with no phone number, because anyone can download this file.
