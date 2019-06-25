import { MEDIA_QUERIES_ON_SIZE_SELECTION_MUTATION } from "~/store/mediaQueries";
import { addListener } from "~/utils/media-queries";

// Here we declare all needed mediaQuery listeners to update media store module
export default function({ app }) {
  addListener(size => {
    app.store.commit(MEDIA_QUERIES_ON_SIZE_SELECTION_MUTATION, size);
  });
}
