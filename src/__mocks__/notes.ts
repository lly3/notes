import {Note, Tag} from "../App";

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

const tagsHC: Tag[] = [
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

function createNotes() {
  return notesHC
}

function createTags() {
  return tagsHC
}

export {
  createTags,
  createNotes
}
