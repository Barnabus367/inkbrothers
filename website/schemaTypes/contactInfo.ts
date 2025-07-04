import { defineType } from 'sanity'

export default defineType({
  name: 'contactInfo',
  type: 'object',
  title: 'Kontaktinformationen',
  fields: [
    { name: 'address', type: 'string', title: 'Adresse' },
    { name: 'phone', type: 'string', title: 'Telefon' },
    { name: 'email', type: 'string', title: 'E-Mail' },
    { name: 'openingHours', type: 'string', title: 'Öffnungszeiten' }
  ]
})
