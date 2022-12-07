import {NoteData, Tag} from "../../App"
import FormNote from "../FormNote/formNote"

type CreateNoteProps = {
  availableTags: Tag[]
  onCreateNote: (noteData: NoteData) => void
}

function CreateNote({availableTags, onCreateNote}: CreateNoteProps) {
  return (
    <FormNote formTitle="Create Note" availableTags={availableTags} onSubmit={onCreateNote} />
  )
}

export default CreateNote
