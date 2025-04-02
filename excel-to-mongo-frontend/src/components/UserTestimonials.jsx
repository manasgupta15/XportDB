// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// const testimonials = [
//   {
//     id: 1,
//     name: "John Doe",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     role: "Data Analyst",
//     review:
//       "XportDB made my workflow so much easier! The speed and simplicity are unmatched. I've reduced my data processing time by 60% since switching.",
//     rating: 5,
//   },
//   {
//     id: 2,
//     name: "Sarah Smith",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     role: "Database Administrator",
//     review:
//       "I love how secure and fast this platform is. Uploading data has never been smoother! The team's support is exceptional when we need assistance.",
//     rating: 5,
//   },
//   {
//     id: 3,
//     name: "Michael Lee",
//     avatar: "https://randomuser.me/api/portraits/men/56.jpg",
//     role: "CTO, TechStart Inc.",
//     review:
//       "Multiple database support is a game changer. We migrated three different database systems seamlessly. Highly recommended!",
//     rating: 4.5,
//   },
//   {
//     id: 4,
//     name: "Emma Johnson",
//     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     role: "Software Engineer",
//     review:
//       "The intuitive interface saved us weeks of training time. Our team was productive from day one with XportDB.",
//     rating: 5,
//   },
// ];

// const UserTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

//   const nextTestimonial = useCallback(() => {
//     setDirection(1);
//     setCurrentIndex((prevIndex) =>
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   }, []);

//   const prevTestimonial = useCallback(() => {
//     setDirection(-1);
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   }, []);

//   const goToTestimonial = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     let interval;
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         nextTestimonial();
//       }, 8000);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, nextTestimonial]);

//   const currentTestimonial = testimonials[currentIndex];

//   return (
//     <section className="w-full py-16 md:py-24 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-8 md:mb-12">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl font-bold text-blue-900"
//           >
//             Trusted by Data Professionals
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="text-gray-700 mt-3 md:mt-4 text-lg md:text-xl max-w-2xl mx-auto"
//           >
//             Join thousands of satisfied users who transformed their data
//             workflows
//           </motion.p>
//         </div>

//         <div className="relative h-[200px] md:h-[250px]">
//           <AnimatePresence mode="wait" custom={direction}>
//             <motion.div
//               key={currentTestimonial.id}
//               custom={direction}
//               initial={{ opacity: 0, x: direction * 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: direction * -100 }}
//               transition={{ duration: 0.6, ease: "easeInOut" }}
//               className="absolute inset-0 flex items-center justify-center"
//             >
//               <div className="w-full max-w-4xl bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-blue-100">
//                 <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={currentTestimonial.avatar}
//                       alt={currentTestimonial.name}
//                       className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-600 shadow-md object-cover"
//                       loading="lazy"
//                     />
//                     <div className="mt-3 md:mt-4 text-center">
//                       <h3 className="text-xl font-semibold text-blue-900">
//                         {currentTestimonial.name}
//                       </h3>
//                       <p className="text-gray-500 text-sm">
//                         {currentTestimonial.role}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-center md:text-left">
//                     <div className="flex justify-center md:justify-start gap-1 mb-3 md:mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-5 h-5 ${
//                             i < Math.floor(currentTestimonial.rating)
//                               ? "fill-yellow-500 text-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="ml-2 text-gray-600">
//                         {currentTestimonial.rating.toFixed(1)}
//                       </span>
//                     </div>
//                     <blockquote className="text-gray-700 text-lg md:text-xl italic leading-relaxed">
//                       "{currentTestimonial.review}"
//                     </blockquote>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           <button
//             onClick={() => {
//               setIsAutoPlaying(false);
//               prevTestimonial();
//             }}
//             onMouseEnter={() => setIsAutoPlaying(false)}
//             className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft className="w-6 h-6 text-blue-700" />
//           </button>
//           <button
//             onClick={() => {
//               setIsAutoPlaying(false);
//               nextTestimonial();
//             }}
//             onMouseEnter={() => setIsAutoPlaying(false)}
//             className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight className="w-6 h-6 text-blue-700" />
//           </button>
//         </div>

//         <div className="flex justify-center mt-8 md:mt-10 gap-2">
//           {testimonials.map((testimonial, index) => (
//             <button
//               key={testimonial.id}
//               onClick={() => {
//                 setIsAutoPlaying(false);
//                 goToTestimonial(index);
//               }}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 index === currentIndex
//                   ? "bg-blue-600 w-6"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//               aria-label={`Go to testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserTestimonials;

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Data Analyst",
    review:
      "XportDB made my workflow so much easier! The speed and simplicity are unmatched. I've reduced my data processing time by 60% since switching.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Database Administrator",
    review:
      "I love how secure and fast this platform is. Uploading data has never been smoother! The team's support is exceptional when we need assistance.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Lee",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    role: "CTO, TechStart Inc.",
    review:
      "Multiple database support is a game changer. We migrated three different database systems seamlessly. Highly recommended!",
    rating: 4.5,
  },
];

const UserTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextTestimonial, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Trusted by Data Professionals
          </h2>
          <p className="text-gray-700 mt-2 text-base md:text-lg max-w-xl mx-auto">
            Join thousands of satisfied users
          </p>
        </div>

        <div className="relative h-[320px] md:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-4xl p-6 md:p-8 rounded-xl shadow-md border border-blue-100">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-blue-600 shadow-sm"
                    />
                    <div className="mt-2 text-center">
                      <h3 className="text-lg font-semibold text-blue-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(currentTestimonial.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 text-base italic">
                      "{currentTestimonial.review}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6 gap-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-blue-600 w-4" : "bg-gray-300"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
