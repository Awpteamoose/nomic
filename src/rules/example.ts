import { z } from 'zod';
import { defineRule } from '../lib/types.ts';

const STATE = z.object({
  foo: z.number(),
});

export default defineRule({
  id: 'example',
  load: () => STATE.parse({ foo: 4 }),
  check: async ({ api }) => {
    console.log('💚');

    if (api.pr) {
      const isGrateful = api.pr.body?.match(/I am grateful for \w{5}\w+./);

      if (isGrateful) {
        console.log('🎉');
      } else {
        throw new Error('PR body does not contain a gratitude message');
      }
    }
  },
});
