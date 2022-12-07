import {useOutletContext} from "react-router-dom"
import {Note, NoteData, Tag} from "../../App"
import FormNote from "../FormNote/formNote"

type EditNoteProps = {
  availableTags: Tag[]
  onEditNote: (data: NoteData, id: string) => void
}

function EditNote({availableTags, onEditNote}: EditNoteProps) {
  const note = useOutletContext<Note>()

  return (
    <FormNote formTitle="Edit Note" availableTags={availableTags} onSubmit={noteData => onEditNote(noteData, note.id)} title={note.title} tags={note.tags} description={note.description} />
  )
}

export default EditNote
