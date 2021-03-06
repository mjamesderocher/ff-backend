export default {
  name: 'imageObject',
  title: 'Image',
  type: 'object',
  fields: [
    {
      name: 'embed',
      title: 'Image Document',
      type: 'reference', to: {type: 'imageDoc'},
    },
    { 
      name: 'caption',
      type: 'simpleBlockContent',
      title: 'Caption'
    }
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'embed.file'
    }
  }
}