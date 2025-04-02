import { motion } from "framer-motion";
import CountUp from "react-countup";

const TrustedStats = () => {
  return (
    <div className="w-full flex flex-col items-center mb-16 px-4 md:px-8">
      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-6 text-center w-full"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Trusted by Top Companies & Developers
        </h2>
        <div className="flex flex-wrap justify-center gap-15">
          {["MICROSOFT", "GOOGLE", "META", "AMAZON", "NETFLIX"].map(
            (brand, index) => (
              <img
                key={index}
                src={`/assets/${brand}.svg`}
                alt={brand}
                className="h-12 md:h-16 transition duration-300"
              />
            )
          )}
        </div>
      </motion.div>

      {/* Live Stats Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-center"
      >
        <div className="shadow-lg rounded-lg p-8">
          <h3 className="text-5xl font-bold text-blue-600">
            <CountUp start={0} end={50000} duration={3} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2 text-lg">Active Users</p>
        </div>
        <div className="shadow-lg rounded-lg p-8">
          <h3 className="text-5xl font-bold text-green-600">
            <CountUp start={0} end={1000000} duration={3} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2 text-lg">Files Uploaded</p>
        </div>
        <div className="shadow-lg rounded-lg p-8">
          <h3 className="text-5xl font-bold text-purple-600">
            <CountUp start={0} end={10000} duration={3} separator="," />+
          </h3>
          <p className="text-gray-600 mt-2 text-lg">Databases Connected</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustedStats;
