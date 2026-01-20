// components/CTA.jsx
import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Schedule a consultation with our experts to discuss how we can drive your digital transformation journey
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <MessageSquare className="mr-3" size={20} />
                Contact Our Team
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <Calendar className="mr-3" size={20} />
                Schedule Demo
              </button>
            </div>

            <p className="text-indigo-200 mt-8 text-sm">
              Response within 24 hours • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;