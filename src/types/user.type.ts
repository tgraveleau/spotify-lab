import { Image } from './common.type'

export type User = {
  id: string
  displayName: string
  images?: Image[]
}
