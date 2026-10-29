# BLUBBA — Ethereum / Leonida Fan Website

A finished **static**, responsive one-page site inspired by the section order of the supplied Chunkee reference. Independent HTML/CSS/JavaScript; **no build step, npm, Node, React, or external packages required**.

## Launch the site immediately

1. Extract this ZIP.
2. Open `index.html` in a browser for a quick preview. For full testing, use a local web server.
3. Deploy the entire extracted folder to **GitHub Pages**, **Netlify**, or **Cloudflare Pages**. The publishing directory is the project root (the folder containing `index.html`). There is **no build command**.

### Local preview (recommended)

In the extracted folder:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000`.

### GitHub Pages

1. Create a public GitHub repository (e.g., `blubba`).
2. Upload `index.html`, `styles.css`, `script.js`, `config.js`, and the `assets/` folder to the **repository root**.
3. In repository Settings → Pages, select **Deploy from a branch** → `main` / `(root)` → Save.
4. GitHub Pages will publish at `https://YOUR_USERNAME.github.io/blubba/` (or your custom domain).

### Netlify / Cloudflare Pages

- Netlify: drag the extracted site folder into the Netlify deployment UI, or connect the repository with no build command and publication directory `.`.
- Cloudflare Pages: connect the repository, use no build command, set output directory to `.`.

## Before token launch — IMPORTANT

Open `config.js`:

```js
window.BLUBBA_CONFIG = {
  tokenName: 'Blubba',
  symbol: 'BLUBBA',
  chainId: 1,
  contractAddress: '',        // Set to your actual ERC-20 contract on Ethereum mainnet
  xUrl: '',                   // Your actual official profile, or leave blank
  telegramUrl: '',            // Your actual official group, or leave blank
  customUniswapUrl: '',       // Optional; default is generated after CA is set
  customChartUrl: ''          // Optional; default is generated after CA is set
};
```

Until a **valid real Ethereum-mainnet CA** is entered, buy/chart/Etherscan links remain disabled. Do **not** paste a wallet address or a token address from another chain.

No fabricated contract addresses, social handles, or guaranteed-return claims are bundled.

## Page structure

1. Animated broadcast strip + floating navigation
2. Full-screen hero with HUD (local Leonida time) + calls to action
3. Leonida postcard and Blubba's origin story
4. Nine horizontally draggable and swipeable chapters
5. Interactive nine-pin mission board with persistent progress and a completion reward
6. Two wanted posters and Blubba's rap sheet
7. Fourteen-image media gallery with lightbox, keyboard navigation and download
8. Four-step Ethereum buying guide, verified CA and auto-enabled Uniswap/DEX Screener/Etherscan links
9. Footer and fan-fiction/risk disclaimers

## File map

- `index.html` — all section markup and SEO tags
- `styles.css` — original Ethereum-indigo/silver visual system and responsive design
- `script.js` — chapter carousel, map missions, gallery, mobile menu, clock, CA checks
- `config.js` — your adjustable token info, contract and social links
- `assets/` — bundled Blubba images, including responsive variants
- `design/asset-contact-sheet.jpg` — art overview

## Images

The source artwork was generated in conversation and then processed into site-ready WebP assets. The V3 visual collection contains scene substitutions: the reference motorcycle chapter is a **jet-ski escape**, and the bar chapter is **coastal after-hours**. The mural is a composite that uses some of the original user-supplied reference street surroundings. These differences are reflected in the new captions rather than mislabeling the art.

The WebP image `*-master.webp` sizes are not claimed as native 4K; the site uses 800/1280 variants to balance load speed and image detail. Original generated arts are a mix of native ~1672×941 and designed variants.

## Rights and risk

This is an independent fan-made meme concept, **not** affiliated with Rockstar Games, Take-Two Interactive, Ethereum Foundation or Uniswap. Do not imply official endorsement or use someone else's trademarks as a purported official project. Crypto trading is highly risky and the site makes no profit guarantees. Review the legal rights for all artwork prior to commercial publication, particularly the composite mural.

## Maintenance tips

- To change a scene while preserving structure, replace `assets/meme-XX-800.webp` and `assets/meme-XX-1280.webp` with images of the same aspect ratio.
- To change chapter names or narrative, edit `chapterData` in `script.js`.
- To change the missions, edit the `missions` array in `script.js` (coordinates are percentages).
- To change accent colors, edit the CSS variables at the top of `styles.css`.
- To add/replace media images, edit the `media` array in `script.js`.

Designed for desktop and mobile. No analytics, trackers, wallet connection, or private-key handling are included.
