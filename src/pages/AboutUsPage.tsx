import { motion } from 'framer-motion'

const AboutUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[url('/assets/images/background.png')] bg-cover bg-center"
    >
      <div className="container mx-auto py-20">
      <div className="">
        <h1 className="heading-line text-[#003863] text-[64px]">
          About Us
        </h1>
        <p className="text-[#003863] text-[20px] font-bold mx-auto pb-6">
          We offer the best services for your pets, contact us today and book a service
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
        <div>
          <p className="text-[#0E213A] text-[18px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
          <p className="text-[#0E213A] text-[18px] pt-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </p>
          <button className="bg-[#003863] text-white px-6 py-3 rounded-[5px] flex items-center gap-[26px] hover:bg-[#004C82] transition mt-10">
            <span className="text-lg font-medium">Read More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>        
        <div className="about-image">
          <img className="rounded-[15px] w-full max-w-[580px]" src="/assets/images/about.png" alt="" />
        </div>        
      </div>
      </div>

    </motion.div>
  )
}

export default AboutUsPage
