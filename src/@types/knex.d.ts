//eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    user: {
      userId: string
      name: string
      meals: string
      created_at: string
      session_id?: string
    },
    meals: {
      id: string
      name: string
      description: string
      date_time: string
      within_diet: boolean
      user_id: string
      created_at: string
    }
  }
}