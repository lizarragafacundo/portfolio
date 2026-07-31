/**
 * Decorative ASCII art. Every consumer renders these inside
 * `<pre aria-hidden="true">` — screen readers get real headings instead.
 *
 * Note the escaped backslashes: these are template literals, so `\` must be
 * doubled to survive to the DOM.
 */

/** FIGlet-style "FACUNDO", 60 columns wide. */
export const NAME_BANNER = [
  '███████╗ █████╗  ██████╗██╗   ██╗███╗   ██╗██████╗  ██████╗ ',
  '██╔════╝██╔══██╗██╔════╝██║   ██║████╗  ██║██╔══██╗██╔═══██╗',
  '█████╗  ███████║██║     ██║   ██║██╔██╗ ██║██║  ██║██║   ██║',
  '██╔══╝  ██╔══██║██║     ██║   ██║██║╚██╗██║██║  ██║██║   ██║',
  '██║     ██║  ██║╚██████╗╚██████╔╝██║ ╚████║██████╔╝╚██████╔╝',
  '╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝  ╚═════╝ ',
].join('\n')

/** Stick figure for the Posture demo panel. */
export const POSE_FIGURE = [
  '    .---.    ',
  '   / o o \\   ',
  '   \\  ^  /   ',
  '  __|___|__  ',
  ' /  |   |  \\ ',
  '    |   |    ',
  '    |   |    ',
  '   _|   |_   ',
  '  |_|   |_|  ',
].join('\n')

export const FOOTER_BOX = [
  '╔══════════════════════════════════════╗',
  '║  engineered end-to-end · Buenos Aires  ║',
  '╚══════════════════════════════════════╝',
].join('\n')
