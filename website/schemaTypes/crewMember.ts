import { defineType } from 'sanity'

export default defineType({
  name: 'crewMember',
  type: 'document',
  title: 'Crew-Mitglied',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'role', type: 'string', title: 'Rolle' },
    { name: 'experience', type: 'string', title: 'Erfahrung' },
    { name: 'quote', type: 'string', title: 'Zitat' },
    { name: 'specialties', type: 'array', of: [{ type: 'string' }], title: 'Spezialgebiete' },
    { name: 'instagram', type: 'string', title: 'Instagram' },
    { name: 'image', type: 'image', title: 'Bild' },
    { name: 'alt', type: 'string', title: 'Alt-Text' }
  ]
})
