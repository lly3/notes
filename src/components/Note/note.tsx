import {Button, Flex, Heading, Tag, Text} from "@chakra-ui/react"
import {Link, useOutletContext} from "react-router-dom"
import {Note} from "../../App"

function ShowNote() {
  const note = useOutletContext<Note>()

  return (
    <>
      <Heading>{note.title}</Heading>
      <Flex my={3} gap={2}>
        {note.tags.map(tag => {
          return (
            <Tag key={tag.id}>
              {tag.title}
            </Tag>
          )
        })}
      </Flex>
      <Text>{note.description}</Text>
      <Flex justify={'end'} my={3} gap={3}>
        <Link to={'..'}>
          <Button variant={'outline'}>Back</Button>
        </Link>
        <Link to={`/${note.id}/edit`}>
          <Button colorScheme={'blue'}>Edit</Button>
        </Link>
      </Flex>
    </> 
  )
}

export default ShowNote
