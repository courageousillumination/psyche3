import DefaultEditRenderer from "psyche/components/renderers/default/default-edit-renderer";
import DefaultLongRenderer from "psyche/components/renderers/default/default-long-renderer";
import DefaultShortRenderer from "psyche/components/renderers/default/default-short-renderer";
import { Renderer } from "psyche/components/renderers/renderer";

const DefaultRenderer: Renderer = {
  edit: DefaultEditRenderer,
  long: DefaultLongRenderer,
  short: DefaultShortRenderer
};
export default DefaultRenderer;
