import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InputField, SelectField, TextareaField } from '../ui/FormField';
import { poojaTypeOptions } from '../../data/poojas';
import { useBookingStore } from '../../store/bookingStore';

const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const schema = z.object({
  poojaType: z.string().min(1, 'Please select a pooja type'),
  numberOfPersons: z.coerce.number().min(1, 'At least 1 person').max(6, 'Max 6 persons'),
  poojaDate: z.string().min(1, 'Please select a date'),
  poojaTime: z.string().min(1, 'Please select a time'),
  specialInstructions: z.string().max(500, 'Max 500 characters').optional(),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export default function StepPoojaDetails() {
  const { pooja, setPooja, nextStep, prevStep } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormValues>({
    resolver: zodResolver(schema),
    defaultValues: pooja,
  });

  const onSubmit = (data: FormValues) => {
    setPooja(data);
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <Card className="cursor-default p-10">
        <h2 className="font-heading mb-6 text-2xl text-maroon">Pooja Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectField
            label="Pooja Type"
            required
            placeholder="Select a pooja"
            options={poojaTypeOptions}
            error={errors.poojaType?.message}
            {...register('poojaType')}
          />
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            <InputField
              label="Number of Persons"
              required
              type="number"
              min={1}
              max={6}
              error={errors.numberOfPersons?.message}
              {...register('numberOfPersons')}
            />
            <InputField
              label="Pooja Date"
              required
              type="date"
              min={todayStr()}
              error={errors.poojaDate?.message}
              {...register('poojaDate')}
            />
          </div>
          <InputField
            label="Pooja Time"
            required
            type="time"
            error={errors.poojaTime?.message}
            {...register('poojaTime')}
          />
          <TextareaField
            label="Special Instructions"
            placeholder="Any special requirements..."
            maxLength={500}
            error={errors.specialInstructions?.message}
            {...register('specialInstructions')}
          />
          <div className="mt-8 flex justify-between gap-4 *:flex-1">
            <Button type="button" variant="secondary" onClick={prevStep}>
              ← Back
            </Button>
            <Button type="submit" variant="primary">
              Continue →
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
