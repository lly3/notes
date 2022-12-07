import {v4 as uuidv4} from 'uuid'
import {Container} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import NoteList from "./components/NoteList/noteList";
import CreateNote from './components/CreateNote/createNote';
import {useEffect, useState} from 'react';
import NoteLayout from './components/NoteLayout/noteLayout';
import Note from './components/Note/note';
import ShowNote from './components/Note/note';
import EditNote from './components/EditNote/editNote';

export type Tag = {
  id: string
  title: string
}

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  description: string
  tags: Tag[]
}

export type SimplifyNote = {
  id: string
  title: string
  tags: Tag[]
}


const notesHC: Note[] = [
  {
    id: '1',
    title: 'How to build a webside',
    description: 'test tests tetest tests tetest tests tetest tests tetttt',
    tags: [
      {
        id: '1',
        title: 'Education'
      },
      {
        id: '2',
        title: 'Webdev'
      },
      {
        id: '3',
        title: 'React'
      },
    ],
  },
  {
    id: '2',
    title: 'How to build a modern house in minecraft',
    description: 'test tests tetest tests tetest tests tetest tests tetttt',
    tags: [
      {
        id: '4',
        title: 'Gaming',
      },
      {
        id: '5',
        title: 'Minecraft',
      },
    ],
  },
  {
    id: '3',
    title: 'Create react app with vite step by step',
    description: 'test tests tetest tests tetest tests tetest tests tetttt',
    tags: [
      {
        id: '1',
        title: 'Education'
      },
      {
        id: '6',
        title: 'Vite'
      },
      {
        id: '3',
        title: 'React'
      },
    ],
  }
]

const tagsHC = [
  {
    id: '1',
    title: 'Education'
  },
  {
    id: '6',
    title: 'Vite'
  },
  {
    id: '3',
    title: 'React'
  },
]

function App() {
  const [notes, setNotes] = useState<Note[]>(notesHC)
  const [tags, setTags] = useState<Tag[]>(tagsHC)

  useEffect(() => {
    setNotes(prevNotes => prevNotes.map(note => {
      return {...note, tags: tags.filter(tag => {
        return note.tags.some(noteTag => noteTag.id === tag.id)
      }) }
    }))
  }, [tags])

  const onCreateNote = (noteData: NoteData) => {
    const newNote = {id: uuidv4(), ...noteData}
    setNotes(prevNotes => {
      return [...prevNotes, newNote]
    })
    setTags(prevTags => {
      return [...prevTags, ...noteData.tags.filter(noteTag => {
        return prevTags.every(tag => {
          return noteTag.id !== tag.id
        })
      })]
    })
  }

  const onEditNote = (noteData: NoteData, id: string) => {
    setNotes(prevNotes => prevNotes.map(note => {
      if(note.id === id) {
        return {id, ...noteData}
      }
      return note
    }))
  }

  const onCreateTag = (title: string) => {
    const newTag = {id: uuidv4(), title}
    setTags(prevTags => [...prevTags, newTag])
  }

  const onEditTag = (newTitle: string, id: string) => {
    setTags(prevTags => prevTags.map(tag => {
      if(tag.id === id) {
        return {id, title: newTitle}
      }
      return tag
    }))
  }

  const onDeleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id))
  }

  return (
    <Container my={3}>
      <Routes>
        <Route path="/" element={
          <NoteList notes={notes} availableTags={tags} onEditTag={onEditTag} onDeleteTag={onDeleteTag} onCreateTag={onCreateTag} />
        } />
        <Route path='/create' element={
          <CreateNote availableTags={tags} onCreateNote={onCreateNote} />
        } />
        <Route path='/:id' element={
          <NoteLayout notes={notes} />
          } >
          <Route index element={
            <ShowNote /> 
            } />
          <Route path='edit' element={
            <EditNote availableTags={tags} onEditNote={onEditNote} />
            } />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
