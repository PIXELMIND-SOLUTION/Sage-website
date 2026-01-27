import React from "react";
import { useParams } from "react-router-dom";
import Service from '../Data/ServiceData';

const ServiceDetails = () => {
  const { name } = useParams();

  const service = Service.find((s) => s.title === name);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">
        Service not found
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-20">
      <div className="mb-12">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient}
            flex items-center justify-center mb-4`}
        >
          <div className="text-white">{service.icon}</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          {service.title}
        </h1>

        <p className="text-gray-600 max-w-3xl">
          {service.desc}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">
          Key Features
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 bg-gray-50 border rounded-lg p-4"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceDetails;
