/**
 * Keeps the browser-chrome tint (<meta name="theme-color">) matched to the
 * nav band, which is the topmost strip of the page in either theme.
 */
export function syncThemeColor() {
  const nav = document.querySelector('.site-nav')
  const meta = document.querySelector('meta[name="theme-color"]')
  if (!nav || !meta) return
  const band = getComputedStyle(nav).getPropertyValue('--bg').trim()
  if (band) meta.setAttribute('content', band)
}
