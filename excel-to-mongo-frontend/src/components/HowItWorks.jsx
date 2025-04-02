import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Upload Your Excel File",
    description: "Drag and drop or select an Excel file to upload.",
    delay: 0.2,
  },
  {
    title: "Choose Your Database",
    description: "Select the database where you want to store the data.",
    delay: 0.4,
  },
  {
    title: "Store and Fetch",
    description: "Save your data securely and retrieve it anytime.",
    delay: 0.6,
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12 ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
        <p className="text-gray-600 mt-2">
          Simple and efficient steps to manage your data.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step.delay, duration: 0.8 }}
            className="p-6 md:p-8 w-full md:w-1/3 text-center border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
