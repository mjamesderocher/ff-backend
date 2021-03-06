import { FaImage } from 'react-icons/fa'
import FaceTagger from '../components/FaceTagger'

export default {
  name: 'imageDoc',
  title: 'Image',
  icon: FaImage,
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    },
    {
        name: 'slug',
        title: 'Slug',
        type: 'localeSlug',
        options: {
            source: 'title',
            maxLength: 96,
            isUnique: input => input
        },
        validation: Rule => Rule.required()
    },
    {
      name: 'file',
      type: 'image',
      title: 'Image File',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'Alt Text',
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'faceTags',
          title: 'Face Tags',
          type: 'object',
          inputComponent: FaceTagger,
          options: {
            imageField: 'file',
            isHighlighted: true
          },
          fields: [
            {
              name: 'faces',
              type: 'array',
              of: [{
                type: 'object',
                preview: {
                  select: {
                    title: 'person.title.en',
                    media: 'person.mainImage.file',
                    x: 'x',
                    y: 'y'
                  },
                  prepare(selection) {
                    const {x,y,title,media} = selection
                    return {
                      title: title,
                      media: media,
                      subtitle: `x: ${x}, y: ${y}`
                    }
                  }
                },
                fields: [
                  {
                    name: 'person',
                    type: 'reference', 
                    to: [{type: 'person'}]
                  },
                  {
                    name: 'x',
                    type: 'number',
                    validation: Rule => Rule.required().min(0).max(1)
                  },
                  {
                    name: 'y',
                    type: 'number',
                    validation: Rule => Rule.required().min(0).max(1)
                  },
                  {
                    name: 'size',
                    type: 'number',
                    validation: Rule => Rule.required().min(0).max(1)
                  }
                ]
              }]
            }
          ],
        }
      ]
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: Rule => Rule.unique().error('You can only have one of a person'),
      of: [{type: 'reference', to: [{type: 'person'}, {type: 'organization'}]}]
    },
    {
      name: 'date',
      type: 'dateObject',
      title: 'Date Created',
    },
    {
      name: 'dateEnd',
      type: 'dateObject',
      title: 'Latest Possible Date Created',
    },
    {
      name: 'source',
      type: 'url',
      title: 'Source URL',
    },
    {
      name: 'license',
      type: 'string',
      title: 'License Type',
      options: {
        list: [
          {title: 'Unknown', value: 'NA'},
          {title: 'Copyright', value: 'C'},
          {title: 'Public Domain', value: 'PD'},
          {title: 'Creative Commons Attribution (CC BY)', value: 'CC_BY'},
          {title: 'Creative Commons Attribution ShareAlike (CC BY-SA)', value: 'CC_BY-SA'},
          {title: 'Creative Commons Attribution-NoDerivs (CC BY-ND)', value: 'CC_BY-ND'},
          {title: 'Creative Commons Attribution-NonCommercial (CC BY-NC)', value: 'CC_BY-NC'},
          {title: 'Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)', value: 'CC_BY-NC-SA'},
          {title: 'Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)', value: 'CC_BY-NC-ND'},
        ]
      }
    },
    {
      name: 'permissionGranted',
      type: 'boolean',
      title: 'Used with permission',
    },
    {
      name: 'notes',
      type: 'simpleBlockContent',
      title: 'Internal Notes',
      description: 'You might want to put details here about how the permission was attained, in case it was ever needed.'
    }
  ],
  initialValue: {
    permissionGranted: false,
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'file'
    }
  }
}