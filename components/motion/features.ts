/**
 * Isolated so the bundler can split it out.
 *
 * `LazyMotion` only defers its features if they live behind a dynamic import
 * that resolves to a *separate module*. Importing `domAnimation` inline in the
 * provider — even inside `import()` — leaves it in the same chunk as `m`,
 * because the bundler has already pulled that module into the initial graph.
 */
export { domAnimation as default } from 'motion/react'
