import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

// Swiper Styles
import "swiper/css";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Event Organizer",
    review: "EventX helped me sell out my event quickly. Super smooth platform!",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Attendee",
    review: "Ticket booking experience was seamless and very fast!",
    rating: 4,
    img: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Aman Verma",
    role: "Organizer",
    review: "Amazing dashboard. Managing events feels effortless now.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: 4,
    name: "Priya Desai",
    role: "Attendee",
    review: "I loved the UI and reminders. Very professional experience.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=14",
  },
  {
    id: 5,
    name: "Karan Mehta",
    role: "Event Host",
    review: "EventX boosted my event reach and improved ticket sales.",
    rating: 4,
    img: "https://i.pravatar.cc/100?img=15",
  },
  {
    id: 6,
    name: "Divya Shah",
    role: "Attendee",
    review: "Super easy checkout! Took less than 30 seconds.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=16",
  },
  {
    id: 7,
    name: "Vikram Thakur",
    role: "Organizer",
    review: "Support team is extremely helpful. Highly recommended.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=17",
  },
  {
    id: 8,
    name: "Nisha Gupta",
    role: "Attendee",
    review: "Great experience overall. Smooth, fast, and user-friendly.",
    rating: 4,
    img: "https://i.pravatar.cc/100?img=18",
  },
  {
    id: 9,
    name: "Rohit Yadav",
    role: "Event Manager",
    review: "EventX saved us hours of manual work. Love it!",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=19",
  },
  {
    id: 10,
    name: "Aarti Nair",
    role: "Attendee",
    review: "Beautiful design and fast performance. Very impressed.",
    rating: 5,
    img: "https://i.pravatar.cc/100?img=20",
  },
];

export default function UserReviews() {
  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-100 py-16 px-6">

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center text-4xl font-bold text-gray-800"
      >
        User Testimonials
      </motion.h2>

      <p className="text-center text-gray-600 mt-2 text-lg">
        What people say about EventX
      </p>

      <div className="max-w-7xl mx-auto mt-12">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop={true}
          spaceBetween={25}
          slidesPerView={3}
          speed={900}
          className="pb-10"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
<motion.div
  initial={{ opacity: 0, scale: 0.85 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
  className="bg-white rounded-2xl shadow-lg p-7 border border-gray-200 flex flex-col h-[225px] mb-5"
>
  {/* User Info */}
  <div className="flex items-center gap-4">
    <img
      src={review.img}
      className="w-16 h-16 rounded-full shadow-md"
      alt="User"
    />
    <div>
      <h3 className="font-semibold text-gray-800 text-lg">
        {review.name}
      </h3>
      <p className="text-sm text-gray-500">{review.role}</p>
    </div>
  </div>

  {/* Review */}
  <p className="text-gray-600 mt-4 text-md leading-relaxed flex-1">
    "{review.review}"
  </p>

  {/* Stars */}
  <div className="flex mt-4">
    {[...Array(review.rating)].map((_, idx) => (
      <FaStar key={idx} className="text-yellow-400 text-xl" />
    ))}
  </div>
</motion.div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
