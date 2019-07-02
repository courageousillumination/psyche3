import DefaultRenderer from "psyche/components/renderers/default";
import { Renderer } from "psyche/components/renderers/renderer";

const getRenderer = (noteType: string): Renderer => {
  switch (noteType) {
    default:
      return DefaultRenderer;
  }
};

export default getRenderer;
