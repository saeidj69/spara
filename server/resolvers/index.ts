import { Profile } from '../types'
import type { Resolvers } from './types'
import { URLResolver, DateTimeResolver } from 'graphql-scalars'
import {
  rand,
  randAvatar,
  randEmail,
  randFullName,
  randFutureDate,
  randPastDate,
  randSentence,
  randUrl,
  randUserName,
  randUuid,
} from '@ngneat/falso'

const scalarResolvers = {
  URL: URLResolver,
  DateTime: DateTimeResolver,
}

export const resolvers: Resolvers = {
  ...scalarResolvers,

  Query: {
    me() {
      const profile: Profile = {
        subscription: {
          plan: rand(['ENTERPRISE', 'FREE', 'PRO']),
          startDate: randPastDate().toISOString(),
          endDate: randFutureDate().toISOString(),
        },
        avatar: randAvatar(),
        bio: randSentence(),
        website: randUrl(),
      }

      const user = {
        id: randUuid(),
        name: randFullName(),
        username: randUserName(),
        email: randEmail(),
        profile,
      }

      return user
    },
  },
}
