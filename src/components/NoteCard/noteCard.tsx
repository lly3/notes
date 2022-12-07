import {Card, CardBody, CardFooter, Center, Divider, Flex, Tag, Text} from "@chakra-ui/react"
import {SimplifyNote} from "../../App"

type NoteCardProps = {
  note: SimplifyNote
}

function NoteCard({note}: NoteCardProps) {
  return (
    <Card>
      <CardBody>
        <Center>
          <Text fontSize='xl' as='b'>{note.title}</Text>
        </Center>
        <Divider my={2} />
        <CardFooter>
          <Flex flexWrap='wrap' gap={2}>
            {note.tags.map((tag) => {
              return <Tag key={tag.id}>
                {tag.title}
              </Tag>
            })}
          </Flex>
        </CardFooter>
      </CardBody>
    </Card>
  )
}

export default NoteCard
