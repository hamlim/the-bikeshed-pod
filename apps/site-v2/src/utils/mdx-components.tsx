import { Anchor } from "#/components/anchor";

export function useMDXComponents() {
  return {
    h1: (props: any) => (
      <h1
        className="text-4xl font-bold text-gray-900 dark:text-gray-100"
        {...props}
      />
    ),
    h2: (props: any) => (
      <h2
        className="text-3xl font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),
    h3: (props: any) => (
      <h3
        className="text-2xl font-medium text-gray-700 dark:text-gray-300"
        {...props}
      />
    ),
    h4: (props: any) => (
      <h4
        className="text-xl font-medium text-gray-600 dark:text-gray-400"
        {...props}
      />
    ),
    h5: (props: any) => (
      <h5 className="text-lg font-medium text-gray-500" {...props} />
    ),
    h6: (props: any) => (
      <h6
        className="text-base font-medium text-gray-400 dark:text-gray-600"
        {...props}
      />
    ),
    a: Anchor,
    p: (props: any) => <p {...props} />,
    ul: (props: any) => <ul {...props} />,
    ol: (props: any) => <ol {...props} />,
    li: (props: any) => <li {...props} />,
    blockquote: (props: any) => <blockquote {...props} />,
    pre: (props: any) => <pre data-mdx="true" {...props} />,
  };
}
