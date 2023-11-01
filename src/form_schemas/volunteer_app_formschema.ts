import { z } from 'zod';

export const volunteerSchema = z.object({
  eventName: z.string().min(1, 'required'),
  description: z.string().min(1, 'required'),
  hours: z.number(),
  minutes: z.number(),
});

export type VolunteerFormSchema = z.infer<typeof volunteerSchema>;
