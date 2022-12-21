import { builder } from '../builder';
import prisma from "../../db/prisma";

interface PreferenceProps {
  key: string,
  value: string
}

builder.prismaNode('Preference', {
  findUnique: (id) => ({ id: id }),
  id: { resolve: (preference) => preference.id },
  fields: (t) => ({   
    key: t.exposeString('key'),
    value: t.exposeString('value'),

    apis: t.relation('apis'),
    user: t.relation('user')
  }),
});

// builder.mutationField('createPreferenceforApi', (t) => 
//   t.prismaField({
//     type: "Preference",
//     args: {
//       preferences: t.arg.stringList()
//     },
//     resolve: async (query, root, args, ctx) => {
//       if (!ctx.session.user.email || args.preferences == null) return null;

//       let check;
//       const preferenceIds: string[] = [];

//       //create preferences
//       args.preferences.map(async (preference) => {
//         const parsedPreference: PreferenceProps = JSON.parse(preference);
//         check = await prisma.preference.create({
//           data: {
//             key: parsedPreference.key,
//             value: parsedPreference.value,
//             user: {
//               connect: {
//                 email: ctx.session.user.email
//               }
//             }
//           }
//         })
//         preferenceIds.push(check.id);
//       })
//       console.log(preferenceIds);
//       return check;
//     }
//   })
// );