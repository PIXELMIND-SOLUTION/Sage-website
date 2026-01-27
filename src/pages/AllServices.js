import React from "react";
import { Link } from "react-router-dom";
import Service from '../Data/ServiceData';

const AllServices = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-12">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Service.map((item) => (
          <Link
            key={item.slug}
            to={`/services/${item.slug}`}
            className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
          >
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} 
                flex items-center justify-center mb-4`}
            >
              <div className="text-white">{item.icon}</div>
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>

            <div className="mt-4 font-semibold text-sm text-indigo-600">
              View Details →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllServices;
