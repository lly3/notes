import {Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Spacer, useDisclosure} from "@chakra-ui/react"
import {useMemo, useRef, useState} from "react"
import {Link} from "react-router-dom"
import ReactSelect from "react-select"
import {SimplifyNote, Tag} from "../../App"
import NoteCard from "../NoteCard/noteCard"

type NoteListProps = {
  notes: SimplifyNote[]
  availableTags: Tag[]
  onEditTag: (newTitle: string, id: string) => void
  onDeleteTag: (id: string) => void
  onCreateTag: (title: string) => void
}

function NoteList({notes, availableTags, onEditTag, onDeleteTag, onCreateTag}: NoteListProps) {
  const [title, setTitle] = useState('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const newTagTitle = useRef<HTMLInputElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return note.title.includes(title) && (
        selectedTags.length === 0 || selectedTags.every(tag => {
          return note.tags.some(noteTag => noteTag.title === tag.title)
        })
      )
  })}, [title, selectedTags, notes])

  return (
    <>
      <Flex align={'center'}>
        <Heading m={5}>Notes</Heading>
        <Spacer />
        <Box>
          <Link to={'create'} data-testid="create-button">
            <Button colorScheme={'blue'} mr={2}>Create</Button>
          </Link>
          <Button onClick={onOpen} colorScheme={'gray'} variant='outline'>Edit Tags</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Tags</ModalHeader>
              <ModalCloseButton />
              <ModalBody data-testid="tags-container">
                {availableTags.map((tag) => 
                <HStack key={tag.id} my={3}>
                  <Input defaultValue={tag.title} onChange={e => onEditTag(e.target.value, tag.id)} data-testid={'tag-'+tag.id} />
                  <Button colorScheme={'red'} onClick={() => onDeleteTag(tag.id)}>X</Button>
                </HStack>
                )}
                <HStack my={3}>
                  <Input ref={newTagTitle} data-testid="new-tag"/>
                  <Button colorScheme={'green'} onClick={() => onCreateTag(newTagTitle.current!.value)}>+</Button>
                </HStack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme={'blue'} onClick={onClose} data-testid="close-button">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <HStack my={5}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} placeholder="Enter your title here" />
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <ReactSelect 
            onChange={(tags) => {
              setSelectedTags(tags.map((tag) => {
                return {id: tag.value, title: tag.label}
              }))
            }}
            options={availableTags.map((tag => {
              return { value: tag.id, label: tag.title }
            }))}
            isMulti
          />
        </FormControl>
      </HStack>
      <SimpleGrid columns={2} spacing={5} data-testid="notes-container">
        {filteredNotes.map((note, index) => {
          return <Link to={`/${note.id}`} key={note.id} >
            <NoteCard note={note} />
          </Link>
        })}
      </SimpleGrid>
    </>
  )
}

export default NoteList
