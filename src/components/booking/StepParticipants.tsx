import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InputField, SelectField } from '../ui/FormField';
import { gotraOptions } from '../../data/poojas';
import { useBookingStore } from '../../store/bookingStore';

const participantSchema = z.object({
  name: z.string().min(2, 'Enter at least 2 characters'),
  gotra: z.string().min(1, 'Please select a gotra'),
});

const schema = z.object({
  participants: z.array(participantSchema),
});

type FormValues = z.infer<typeof schema>;

export default function StepParticipants() {
  const { devotee, pooja, participants, setParticipants, nextStep, prevStep } = useBookingStore();
  const count = pooja.numberOfPersons;

  const defaultParticipants = Array.from({ length: count }, (_, i) => {
    if (participants[i]) return participants[i];
    if (i === 0) return { name: devotee.fullName, gotra: devotee.gotra };
    return { name: '', gotra: '' };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { participants: defaultParticipants },
  });

  const onSubmit = (data: FormValues) => {
    setParticipants(data.participants);
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <Card className="cursor-default p-10">
        <h2 className="font-heading mb-6 text-2xl text-maroon">Participants ({count})</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Array.from({ length: count }, (_, i) => (
            <div
              className="mb-5 rounded-xl border border-dashed border-gold/40 p-5"
              key={i}
            >
              <div className="mb-3 text-[0.9rem] font-semibold text-gold">
                Participant {i + 1}
              </div>
              <InputField
                label="Name"
                required
                placeholder={`Participant ${i + 1} Name`}
                error={errors.participants?.[i]?.name?.message}
                {...register(`participants.${i}.name` as const)}
              />
              <SelectField
                label="Gotra"
                required
                placeholder={`Participant ${i + 1} Gotra`}
                options={gotraOptions}
                error={errors.participants?.[i]?.gotra?.message}
                {...register(`participants.${i}.gotra` as const)}
              />
            </div>
          ))}
          <div className="mt-8 flex justify-between gap-4 *:flex-1">
            <Button type="button" variant="secondary" onClick={prevStep}>
              ← Back
            </Button>
            <Button type="submit" variant="primary">
              Review Booking →
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
