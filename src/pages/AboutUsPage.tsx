import { motion } from 'framer-motion'

const AboutUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex mt-6 sm:mt-10 mb-6 sm:mb-10 items-center justify-center bg-gradient-to-br px-4"
    >
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#003863] mb-4">
          About Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are dedicated to making pet care easier and more accessible for everyone.
        </p>
      </div>
    </motion.div>
  )
}

export default AboutUsPage
