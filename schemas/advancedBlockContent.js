import advancedBlockMarks from './advancedBlockMarks.js'

export default {
  name: 'advancedBlockContent',
  title: 'Content',
  type: 'array',      
      of: [
        {
          type: 'block',
          marks: {
            annotations: [...advancedBlockMarks]
          }
        },
        {
          type: 'imageObject'
        },
        {
          type: 'videoObject'
        },
        {
          type: 'audioObject'
        },
        {
          type: 'blockQuoteObject'
        },
        {
          type: 'chartBlock'
        },
        {
          type: 'newspaperArticleObject'
        },
        {
          type: 'mapObject'
        },
      ]
  
}