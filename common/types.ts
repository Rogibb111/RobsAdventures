import { Trip } from "@prisma/client"

export type ModifiedLocation = {
  id: number
  gmailId: string
  tripId: number
  longitude: string
  latitude: string
  createdAt: string
  updatedAt: string
}

export type ModifiedMessage = {
  id: number
  gmailId: string
  tripId: number
  message: string
  createdAt: string
  updatedAt: string
}

export type AppProps = {
  page: string
  tokenURL: String | null,
  apiKey: string,
  locations: ModifiedLocation[]
  messages: ModifiedMessage[]
  trips: Trip[]
}