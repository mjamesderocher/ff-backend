import { FaRegFileAlt } from 'react-icons/fa'
import docMetadata from './docMetadata'

export default {
  name: 'publicationArticle',
  title: 'Publication Article',
  icon: FaRegFileAlt,
  type: 'document',
  fields: [
    ...docMetadata,
    {
      name: 'parent',
      title: 'Publication',
      type: 'reference',
      to: {type: 'publication'},
      validation: Rule => Rule.required()
    },
    {
      name: 'pageStart',
      title: 'Start Page',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'pageEnd',
      title: 'End Page',
      type: 'number'
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'dateObject',
      validation: Rule => Rule.required()
    },
    {
      name: 'volume',
      title: 'Volume',
      type: 'number'
    },
    {
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'number'
    },
    {
      name: 'url',
      title: 'Source URL',
      type: 'url',
      fieldset: 'source'
    },
    {
      title: 'Is the source behind a paywall?',
      name: 'paywall',
      type: 'boolean',
      fieldset: 'source'
    }
  ],
  fieldsets: [
    {
      name: 'source', 
      title: 'Source',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'metadata', 
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  initialValue: {
    paywall: false
  },
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage.file'
    },
  }
}