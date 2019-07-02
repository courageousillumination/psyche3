import DefaultEditRenderer from "psyche/components/renderers/default/default-edit-renderer";
import DefaultShortRenderer from "psyche/components/renderers/default/default-short-renderer";
import JournalLongRenderer from "psyche/components/renderers/journal/journal-long-renderer";
import { Renderer } from "psyche/components/renderers/renderer";

const JournalRenderer: Renderer = {
  edit: DefaultEditRenderer,
  long: JournalLongRenderer,
  short: DefaultShortRenderer
};
export default JournalRenderer;
