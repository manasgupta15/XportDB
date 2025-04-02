import { motion } from "framer-motion";
import { Bolt, ShieldCheck, Database } from "lucide-react";

const features = [
  {
    title: "Fast Processing",
    description: "Upload large files in seconds.",
    icon: <Bolt className="text-blue-600 w-10 h-10" />,
    delay: 0.2,
  },
  {
    title: "Secure Storage",
    description: "Your data stays safe.",
    icon: <ShieldCheck className="text-green-600 w-10 h-10" />,
    delay: 0.4,
  },
  {
    title: "Multiple DB Support",
    description: "Connect any database.",
    icon: <Database className="text-purple-600 w-10 h-10" />,
    delay: 0.6,
  },
];

const KeyFeatures = () => {
  return (
    <div className="w-full py-16 px-6 md:px-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Key Features</h2>
        <p className="text-gray-600 mt-2">
          Discover what makes XportDB powerful and efficient.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: feature.delay, duration: 0.8 }}
            className="p-6 md:p-8 w-full md:w-1/3 text-center border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
