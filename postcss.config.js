// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import autoprefixer from "autoprefixer";
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import { purgeCSSPlugin } from "@fullhuman/postcss-purgecss";

const IN_PRODUCTION = process.env.NODE_ENV === "production";

const StyleBlocks = /<style[^]+?<\/style>/gi;
const CSSSelectors = /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g;
const TransitionsClasses = /-(leave|enter|appear)(|-(to|from|active))$/;
const CursorClasses = /^(?!(|.*?:)cursor-move).+-move$/;
const RouterLinkClasses = /^router-link(|-exact)-active$/;
const ScopedClasses = /data-v-.*/;

const anyHTMLFile = `./public/**/*.html`;
const anyVUEFile = `./src/**/*.vue`;

export default {
  plugins: [
    autoprefixer,
    IN_PRODUCTION &&
      purgeCSSPlugin({
        content: [anyHTMLFile, anyVUEFile],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(StyleBlocks, "");
          return contentWithoutStyleBlocks.match(CSSSelectors) || [];
        },
        safelist: [
          "html",
          "body",
          /^bg-/,
          /^[data-bs-theme=dark]/,
          ".version",
          TransitionsClasses,
          CursorClasses,
          RouterLinkClasses,
          ScopedClasses,
        ],
      }),
  ],
};
