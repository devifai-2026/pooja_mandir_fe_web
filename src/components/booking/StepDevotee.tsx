import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InputField, SelectField } from '../ui/FormField';
import { gotraOptions } from '../../data/poojas';
import { useBookingStore } from '../../store/bookingStore';

const schema = z.object({
  fullName: z.string().min(2, 'Enter at least 2 characters'),
  phoneNumber: z
    .string()
    .regex(/^\+?91?[6-9]\d{9}$/, 'Enter a valid Indian phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  gotra: z.string().min(1, 'Please select your gotra'),
});

type FormValues = z.infer<typeof schema>;

export default function StepDevotee() {
  const { devotee, setDevotee, nextStep } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: devotee,
  });

  const onSubmit = (data: FormValues) => {
    setDevotee(data);
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <Card className="cursor-default p-10">
        <h2 className="font-heading mb-6 text-2xl text-maroon">Devotee Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Full Name"
            required
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            <InputField
              label="Phone Number"
              required
              placeholder="+91 9876543210"
              error={errors.phoneNumber?.message}
              {...register('phoneNumber')}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          <SelectField
            label="Gotra"
            required
            placeholder="Select your gotra"
            options={gotraOptions}
            error={errors.gotra?.message}
            {...register('gotra')}
          />
          <div className="mt-8 flex justify-between gap-4 *:flex-1">
            <Button type="submit" variant="primary">
              Continue →
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
