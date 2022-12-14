import {fireEvent, prettyDOM, render, screen} from '@testing-library/react'
import App, {SimplifyNote} from '../App'
import {BrowserRouter, useNavigate} from 'react-router-dom'
import {act} from 'react-dom/test-utils'

// TODOs
// test CRUD methods in App.tsx via CreateNote, EditNote components
// test renderability of NoteList, NoteCard, Note components

describe('Notes Application', () => {
  beforeEach(() => {
    render(<BrowserRouter><App /></BrowserRouter>)
  })

  describe('NoteList component', () => {
    // can render NoteList
    test('Render NoteList component', async () => {
      const title = await screen.findByText('Notes')
      expect(title).toBeInTheDocument()
    })

    // can render note card
    test('Render NoteCard component', async () => {
      const container: HTMLDivElement = await screen.findByTestId('notes-container')
      expect(container.children.length).toEqual(3); // equal to mock data
    })

    // can create note
    test('Create note', async () => {
      const createButton = await screen.findByTestId('create-button')
      act(() => {
        createButton.click()
      })
      const titleInput: HTMLInputElement = await screen.findByTestId('title-input')
      const textarea: HTMLTextAreaElement = await screen.findByTestId('textarea')
      const submitButton = await screen.findByText('Save')
      fireEvent.change(titleInput, {target: {value: 'hello from test!'}})
      fireEvent.change(textarea, {target: {value: 'this is textarea!'}})
      act(() => {
        submitButton.click()
      })

      const newNote = await screen.findByText('hello from test!')
      expect(newNote).toBeInTheDocument()
    })

    describe('Tags', () => {
      test('Create tag', async () => {
        const editTags = await screen.findByText('Edit Tags')
        act(() => {
          editTags.click()
        })
        const newTagInput = await screen.findByTestId('new-tag')
        fireEvent.change(newTagInput, {target: {value: 'new tag!'}})
        const addButton = await screen.findByText('+')
        act(() => {
          addButton.click()
        })
        const tagsContainer = await screen.findByTestId('tags-container')

        const cancelButton = await screen.findByTestId('close-button')
        act(() => {
          cancelButton.click()
        })

        expect(tagsContainer.children.length).toEqual(5)
      })
    })
  })

  describe('ShowNote component', () => {
    // can render ShowNote
    test('Render ShowNote component', async () => {
      const note = await screen.findByText(/minecraft/i)
      act(() => {
        note.click()
      })
      const title = await screen.findByText(/minecraft/i)
      expect(title).toBeInTheDocument()
    })

    // can edit note
    test('Edit note', async () => {
      const editButton = await screen.findByText('Edit')
      act(() => {
        editButton.click()
      })
      const titleInput: HTMLInputElement = await screen.findByTestId('title-input')
      const textarea: HTMLInputElement = await screen.findByTestId('textarea')
      const submitButton = await screen.findByText('Save')
      fireEvent.change(titleInput, {target: {value: 'test edit input!'}})
      fireEvent.change(textarea, {target: {value: 'test edit textarea!'}})
      act(() => {
        submitButton.click()
      })

      const editNote = await screen.findByText('test edit input!')
      expect(editNote).toBeInTheDocument()
    })
  })

})


