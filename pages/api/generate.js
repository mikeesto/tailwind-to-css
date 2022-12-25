import tailwind from "tailwindcss";
import postcss from "postcss";

export default async function handler(req, res) {
  const ast = await postcss([
    tailwind({
      content: [{ raw: req.body, extension: "css" }],
      corePlugins: {
        preflight: false,
      },
    }),
  ]).process("@tailwind base; @tailwind components; @tailwind utilities", {
    from: undefined,
  });

  const css = [];
  const singleClassSelectorRegex = /^\.\S+$/;

  ast.root.nodes.forEach((node) => {
    if (node.type === "rule" && node.selector.match(singleClassSelectorRegex)) {
      const rule = node.nodes[0]; // Seems possible to get more than one node so this is likely wrong...
      if (rule.type === "decl") {
        css.push(`${rule.prop}: ${rule.value}; \n`);
      }
      return;
    }

    // Handle media rules
    if (node.type === "atrule") {
      css.push(`\n@media ${node.params} {\n`);
      node.nodes.forEach((x) => {
        if (x.type === "rule") {
          const rule = x.nodes[0];
          css.push(`  ${rule.prop}: ${rule.value}; \n`);
        }
      });
      css.push("};\n");
    }
  });

  if (css.length === 0) {
    css.push("No tailwind utilities found");
  }

  res.status(200).json({ css: css.join("") });
}
