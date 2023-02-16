import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const mdPreprocess = () => ({
  markup: async ({ content, filename }) => {
    if (!filename.endsWith('.md')) {
      return {
        code: content
      }
    }

    const code = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content)

    return {
      code: code.value
    }
  },
})

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdPreprocess(),
  ],
}
