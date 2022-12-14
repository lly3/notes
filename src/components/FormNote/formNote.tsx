import {Button, Container, Flex, FormControl, FormLabel, Heading, HStack, Input, Textarea} from "@chakra-ui/react"
import {FormEvent, useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidv4 } from 'uuid'
import {Note, NoteData, Tag} from "../../App"

type FormNoteProps = {
  formTitle: string
  availableTags: Tag[]
  onSubmit: (data: NoteData) => void
} & Partial<NoteData>

function FormNote({formTitle, availableTags, onSubmit, title = '', tags = [], description = ''}: FormNoteProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      description: bodyRef.current!.value,
      tags: selectedTags
    })

    navigate('..')
  }
  return (
    <>
      <Heading m={5}>{formTitle}</Heading>
      <form onSubmit={handleSubmit}>
        <HStack>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input ref={titleRef} defaultValue={title} data-testid="title-input" />
          </FormControl>
          <FormControl>
            <FormLabel>Tags</FormLabel>
            <CreatableReactSelect
              onCreateOption={(label) => {
                const newTag = {id: uuidv4(), title: label}
                setSelectedTags(prevTags => {
                  return [...prevTags, newTag]
                })
              }}
              value={selectedTags.map((tag) => {
                return {value: tag.id, label: tag.title}
              })}
              options={availableTags.map((tag) => {
                return {value: tag.id, label: tag.title}
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return {id: tag.value, title: tag.label}
                  })
                )
              }}
              isMulti
              data-testid="react-select"
            />
          </FormControl>
        </HStack>
        <FormControl my={3} isRequired>
          <FormLabel>Body</FormLabel>
          <Textarea rows={10} ref={bodyRef} defaultValue={description} data-testid="textarea"/>
        </FormControl>
        <Flex justify={'end'} gap={3} my={3}>
          <Button variant={'outline'} onClick={() => navigate('..')}>Cancel</Button>
          <Button colorScheme={'blue'} type='submit'>Save</Button>
        </Flex>
      </form>
    </>
  )
}

export default FormNote
