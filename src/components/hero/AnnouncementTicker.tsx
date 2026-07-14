import { Link } from 'react-router-dom';
import { InfiniteMovingCards } from '../ui/aceternity/infinite-moving-cards';

const MESSAGE = '11,000 Chandra Moola Mantra Japa & Havan — JULY 19';

/**
 * Thin scrolling announcement bar under the navbar (marquee reusing the
 * Aceternity InfiniteMovingCards loop).
 */
export default function AnnouncementTicker() {
  return (
    <div className="absolute top-[68px] right-0 left-0 z-[5] border-y border-gold/20 bg-indigo-deep/60 backdrop-blur-md">
      <InfiniteMovingCards speed="slow" gap={0} className="py-2">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className="flex items-center gap-2 pr-12 text-[0.75rem] font-semibold tracking-[0.08em] whitespace-nowrap text-incense/90"
          >
            <span aria-hidden="true">🔔</span>
            {MESSAGE}
            <Link to="/book-pooja" className="text-gold-light underline-offset-2 hover:underline">
              Book Now →
            </Link>
          </span>
        ))}
      </InfiniteMovingCards>
    </div>
  );
}
