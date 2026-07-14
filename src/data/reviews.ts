export interface Review {
  id: string;
  clientName: string;
  clientPhoto: string;
  location: string;
  rating: number;
  reviewText: string;
  isFeatured?: boolean;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    clientName: 'Rajesh Kumar',
    clientPhoto: 'https://i.pravatar.cc/150?img=12',
    location: 'Bengaluru',
    rating: 5,
    reviewText: 'The Satyanarayana Pooja was conducted with such devotion. Everything was arranged perfectly and on time.',
    isFeatured: true,
  },
  {
    id: 'r2',
    clientName: 'Priya Sharma',
    clientPhoto: 'https://i.pravatar.cc/150?img=32',
    location: 'Mumbai',
    rating: 5,
    reviewText: 'Booking a pooja was so easy through this platform. The pandit ji was knowledgeable and warm.',
    isFeatured: true,
  },
  {
    id: 'r3',
    clientName: 'Anil Deshpande',
    clientPhoto: 'https://i.pravatar.cc/150?img=51',
    location: 'Pune',
    rating: 4,
    reviewText: 'Great experience overall. Would love more time-slot options for weekends.',
  },
  {
    id: 'r4',
    clientName: 'Meera Iyer',
    clientPhoto: 'https://i.pravatar.cc/150?img=45',
    location: 'Chennai',
    rating: 5,
    reviewText: 'The products I ordered — especially the rudraksha mala — felt truly authentic and blessed.',
  },
  {
    id: 'r5',
    clientName: 'Vikram Singh',
    clientPhoto: 'https://i.pravatar.cc/150?img=15',
    location: 'Delhi',
    rating: 5,
    reviewText: 'Our family Navagraha Pooja brought so much peace. Thank you for such a divine experience.',
    isFeatured: true,
  },
];
