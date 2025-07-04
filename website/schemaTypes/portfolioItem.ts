import { defineType } from 'sanity'

export default defineType({
  name: 'portfolioItem',
  type: 'document',
  title: 'Portfolio-Eintrag',
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'year', type: 'string', title: 'Jahr' },
    { name: 'artist', type: 'string', title: 'Künstler' },
    { name: 'category', type: 'string', title: 'Kategorie' },
    { name: 'image', type: 'image', title: 'Bild' },
    { name: 'alt', type: 'string', title: 'Alt-Text' }
  ]
})
