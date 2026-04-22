import remarkGfm from "remark-gfm";

export function options() {
  return {
    mdxPluginOptions: {
      mdxCompileOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  };
}
