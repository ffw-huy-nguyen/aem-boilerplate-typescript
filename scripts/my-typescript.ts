import { toCamelCase } from './aem';

export const myTypeScriptFunction = (name: string): string => {
  return `Just want to say hello to ${toCamelCase(name)}`
}
