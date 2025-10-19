# Come incorporare il widget su una pagina

Per il dev, apri `apps/widget/index.html` con `pnpm dev:widget`.
In produzione, builderai un bundle JS da includere via `<script>`.

Esempio (prod, dopo `pnpm --filter @ns/widget build`):
```html
<div id="nx-widget"></div>
<script type="module" src="/path/al/bundle.js"></script>
```
