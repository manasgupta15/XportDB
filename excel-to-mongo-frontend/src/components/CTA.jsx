import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Upload, Store & Fetch – It’s That Easy!
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8">
          Start managing your data effortlessly with XportDB.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.3 }}
          onClick={() => (window.location.href = "/")} // Redirect to Home Page
          className="bg-white text-blue-600 font-semibold px-8 py-3 text-lg rounded-full shadow-md hover:bg-blue-50 transition"
        >
          Get Started for Free
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTA;
