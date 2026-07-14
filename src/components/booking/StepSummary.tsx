import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useBookingStore } from '../../store/bookingStore';
import { calculatePoojaPrice } from '../../lib/pricing';

function generateBookingId(): string {
  const rand = Math.floor(1000 + (Date.now() % 9000));
  return `BK${rand}`;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gold/15 py-3 text-[0.95rem]">
      <span className="text-maroon/70">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}

export default function StepSummary() {
  const { devotee, pooja, participants, prevStep, reset } = useBookingStore();
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId] = useState(generateBookingId);

  const total = calculatePoojaPrice(pooja.poojaType, pooja.numberOfPersons);

  if (confirmed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="cursor-default px-10 py-15 text-center">
          <div className="mb-4 text-[3rem]">🙏</div>
          <h2 className="font-heading mb-3 text-3xl text-maroon">Booking Received!</h2>
          <p className="mb-2 leading-relaxed text-indigo-deep/75">
            Thank you, {devotee.fullName}. Your {pooja.poojaType} booking request has been
            received.
          </p>
          <p className="mb-2 leading-relaxed text-indigo-deep/75">
            Our team will reach out on WhatsApp at {devotee.phoneNumber} shortly with a payment
            link to confirm your slot.
          </p>
          <div className="mt-4 inline-block rounded-full bg-[image:var(--gradient-gold)] px-6 py-2.5 font-bold tracking-[0.04em] text-indigo-deep">
            {bookingId}
          </div>
          <div className="mt-8 flex justify-between gap-4 *:flex-1">
            <Button variant="secondary" onClick={reset}>
              Book Another Pooja
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
      <Card className="cursor-default p-10">
        <h2 className="font-heading mb-6 text-2xl text-maroon">Review Your Booking</h2>

        <SummaryRow label="Devotee" value={devotee.fullName} />
        <SummaryRow label="Phone" value={devotee.phoneNumber} />
        <SummaryRow label="Gotra" value={devotee.gotra} />
        <SummaryRow label="Pooja" value={pooja.poojaType} />
        <SummaryRow label="Date & Time" value={`${pooja.poojaDate} at ${pooja.poojaTime}`} />
        <SummaryRow label="Participants" value={participants.map((p) => p.name).join(', ')} />
        {pooja.specialInstructions && (
          <SummaryRow label="Instructions" value={pooja.specialInstructions} />
        )}

        <div className="mt-3 flex justify-between pt-5 text-xl">
          <span>Total Amount</span>
          <span className="font-heading font-bold text-gold">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mt-8 flex justify-between gap-4 *:flex-1">
          <Button type="button" variant="secondary" onClick={prevStep}>
            ← Back
          </Button>
          <Button type="button" variant="primary" onClick={() => setConfirmed(true)}>
            Book via WhatsApp
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
