import { defineType } from 'sanity'

export default defineType({
  name: 'page',
  type: 'document',
  title: 'Seite',
  fields: [
    { name: 'title', type: 'string', title: 'Titel' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    {
      name: 'contentBlocks',
      type: 'array',
      title: 'Inhaltsblöcke',
      of: [
        { type: 'block' },
        { type: 'image', title: 'Bild' },
        { type: 'reference', name: 'portfolioRef', to: [{ type: 'portfolioItem' }], title: 'Portfolio-Eintrag' },
        { type: 'reference', name: 'crewRef', to: [{ type: 'crewMember' }], title: 'Crew-Mitglied' },
        { type: 'contactInfo', name: 'contactBlock', title: 'Kontaktinformationen' }
      ]
    }
  ]
})
