import { type SchemaTypeDefinition } from 'sanity'
import { localeString } from './localeString'
import { localeText } from './localeText'
import { landingPage } from './landingPage'
import { dish } from './dish'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, landingPage, dish],
}
