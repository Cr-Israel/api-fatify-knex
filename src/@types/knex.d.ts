//eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    user: {
      id: string
      name: string
      meals: string
      created_at: string
      session_id?: string
    },
    meals: {
      id: string
      name: string
      description: string
      dateTime: string
      withinDiet: boolean
      userId: string
      created_at: string
    }
  }
}