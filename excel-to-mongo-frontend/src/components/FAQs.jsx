import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "upload",
    question: "Can I upload multiple files?",
    answer:
      "Yes! You can upload multiple Excel files at once and manage them easily through our batch processing feature. The system supports up to 20 files simultaneously with a maximum total size of 500MB.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Absolutely! XportDB uses AES-256 encryption for data at rest and TLS 1.3 for data in transit. We also offer optional two-factor authentication and comply with GDPR regulations to ensure your data remains protected.",
  },
  {
    id: "fetch",
    question: "How do I fetch my data?",
    answer:
      "Simply go to your dashboard, select the database, and retrieve your files instantly. You can export data in multiple formats including CSV, JSON, or directly to your connected applications via our API.",
  },
  {
    id: "support",
    question: "What support options are available?",
    answer:
      "We provide 24/7 email support with an average response time of 2 hours. Enterprise customers also get dedicated phone support and a customer success manager.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-12 font-forum">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about XportDB. Can't find an answer?
            Contact our team.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <button
                aria-expanded={openIndex === index}
                aria-controls={`faq-${faq.id}`}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg md:text-xl font-semibold text-blue-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-700 text-base md:text-lg leading-relaxed">
                      {faq.answer}
                      {faq.id === "upload" && (
                        <div className="mt-3 text-sm text-blue-600">
                          Pro tip: Use our template for optimal formatting!
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
