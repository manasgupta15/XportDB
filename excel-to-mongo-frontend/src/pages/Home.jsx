import { motion } from "framer-motion";
import FileUpload from "../components/FileUpload";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrustedStats from "../components/TrustedStats";
import HowItWorks from "../components/HowItWorks";
import KeyFeatures from "../components/KeyFeatures ";
import UserTestimonials from "../components/UserTestimonials";
import FAQs from "../components/FAQs";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col items-center justify-center px-6 mt-15">
        {/* Animated Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl text-center my-12"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 font-poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to <span className="text-blue-600">XportDB 🚀</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 mt-4 font-inter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            XportDB is a powerful platform that allows you to seamlessly upload
            Excel files and store them in your MongoDB database.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-gray-700 mt-2 font-inter"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Secure, fast, and hassle-free. Get started today and experience a
            new way to manage your data effortlessly!
          </motion.p>
        </motion.div>

        {/* File Upload Component */}
        <motion.div
          id="upload"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full flex items-center justify-center mb-16"
        >
          <FileUpload />
        </motion.div>

        {/* Trusted By & Live Stats Component */}
        <TrustedStats />
        <HowItWorks />
        <KeyFeatures />
        <UserTestimonials />
        <FAQs />
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default Home;
