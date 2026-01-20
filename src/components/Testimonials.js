// components/Testimonials.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "SageTech transformed our digital infrastructure, resulting in 40% operational efficiency gains. Their expertise in cloud migration was exceptional.",
      author: "Sarah Johnson",
      position: "CTO, Global Financial Services",
      company: "Fortune 500 Banking Corporation",
      rating: 5
    },
    {
      quote: "The AI-driven analytics platform developed by SageTech provided unprecedented insights into our supply chain, optimizing costs by 30% annually.",
      author: "Michael Chen",
      position: "CIO",
      company: "Leading Manufacturing Conglomerate",
      rating: 5
    },
    {
      quote: "Their cybersecurity framework implementation not only secured our systems but also ensured full regulatory compliance across 15 countries.",
      author: "David Rodriguez",
      position: "Head of Technology",
      company: "International Healthcare Provider",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 font-medium mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What Industry Leaders Say
          </h2>
          <p className="text-xl text-gray-600">
            Hear from executives who have partnered with us on their digital transformation journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center">
              <Quote className="w-8 h-8 text-indigo-600" />
            </div>

            {/* Rating */}
            <div className="flex mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-2xl text-gray-800 mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-200 to-violet-200 flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-indigo-700">
                  {testimonials[currentIndex].author.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].position}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;