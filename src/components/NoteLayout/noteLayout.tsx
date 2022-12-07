import {Outlet, useParams} from "react-router-dom"
import {Note} from "../../App"

type NoteLayoutProps = {
  notes: Note[]
}

function NoteLayout({notes}: NoteLayoutProps) {
  const {id} = useParams()
  const note = notes.find(note => note.id === id)

  return (
    <Outlet context={note} />
  )
}

export default NoteLayout
