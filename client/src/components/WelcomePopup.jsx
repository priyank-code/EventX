import { motion } from "framer-motion";

export default function WelcomePopup({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full"
      >
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">
          Welcome 🎉
        </h1>
        <p className="text-xl font-semibold text-gray-700">
          {name}
        </p>

        <p className="mt-3 text-gray-500">Redirecting...</p>
      </motion.div>
    </motion.div>
  );
}
