import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
}

export const HelpCenter = () => {
  const [activeHelpTab, setActiveHelpTab] = useState('general')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <>
    <div className='my-scrollbar'>
      <h3 className='text-[18px] sm:text[20px] md:text-[28px] text-[#003863] font-bold text-left'>Help Centre</h3>
      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>1. What is the Happy Dog & Happy Cat Product Knowledge Hub?</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>The Happy Dog & Happy Cat Product Knowledge Hub is an online platform operated by Happy Pet Investment Holding GmbH, Rechberghausen, Germany.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>It is designed for professional partners who work with our brands, including:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Distributors and importers</li>
          <li>Pet shops and retail partners</li>
          <li>Veterinary clinics and veterinary staff</li>
          <li>Breeders</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>With the Product Knowledge Hub, you can:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Watch <span className='font-bold'>video courses</span> about our brands, ranges and nutrition concepts </li>
          <li>Access <span className='font-bold'>product fact sheets</span> and key <span className='font-bold'>sales arguments / USPs</span> </li>
          <li>Download <span className='font-bold'>PDF materials</span> to support your daily work with Happy Dog & Happy Cat </li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'><span className='font-bold'>Note:</span> The Product Knowledge Hub is neither an online shop nor a consumer advice portal. <br></br>
          It is a professional information and training platform for partners who work with our brands.
        </p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you are unsure whether this platform is suitable for you, please get in touch with us at <span className='font-bold'>info@happypet.biz.</span></p>
      </div>


      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>2. Accounts & access</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>2.1. Who can sign up?</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>Anyone interested in learning more about Happy Dog and Happy Cat, or working in the pet sector (e.g., as a distributor, retailer, veterinarian, or breeder), can create an account.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>2.2. Creating your account</p>
        <ul className='list-decimal pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Go to the sign-up page of the <span className='font-bold'>Happy Dog & Happy Cat Product Knowledge Hub.</span></li>
          <li>Enter your <span className='font-bold'>name, email address, company and country.</span></li>
          <li>Confirm your registration.</li>
          <li>You will receive a confirmation email with further instructions.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you do not receive a confirmation email:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Check your spam or junk folder.</li>
          <li>If you still cannot find it, please get in touch with info@happypet.biz with your name and the email address you used for registration.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>2.3. Resetting your password</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you forget your password:</p> 
        <ul className='list-decimal pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Go to the login page of the Product Knowledge Hub.</li>
          <li>Click on <span className='font-bold'>“Forgot password?”</span>.</li>
          <li>Enter the email address linked to your account.</li>
          <li>Follow the instructions in the password reset email.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you do not receive a reset email after a few minutes, please:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Check your spam folder.</li>
          <li>If necessary, contact <span className='font-bold'>info@happypet.biz</span> and mention that you are unable to reset your password.</li>
        </ul>
      </div>


      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>3. Navigating the Product Knowledge Hub</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>You can access the Product Knowledge Hub via:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>The <span className='font-bold'>website</span> in your browser</li>
          <li>The <span>app,</span> available on the Apple and Google Play Store</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>We recommend using a modern browser such as <span className='font-bold'>Chrome, Microsoft Edge or Safari.</span></p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>3.1. Home / Dashboard</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>After logging in, you will first see your <span className='font-bold'>home area</span> (dashboard). Here you can:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>See featured or new video courses</li>
          <li>Quickly return to the content you recently watched</li>
          <li>Discover product information and materials relevant to your region</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>3.2. Video courses and learning content</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>In the Knowledge Hub section, you will find:</p> 
        <ul className='list-decimal pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Video-based training on Happy Dog & Happy Cat</li>
          <li>Explanations of our ranges, concepts and key benefits</li>
          <li>Guidance on how to position products with different customer types (e.g. pet shops, breeders, vets)</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you are unsure where to start, we recommend beginning with the introductory courses for our main ranges.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>3.3. Product fact sheets & USPs</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>In the <span>Learning Module</span> area, you can:</p> 
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Browse product fact sheets</li>
          <li>Look up key selling points and <span className='font-bold'>USPs</span></li>
          <li>Download materials that you can reuse in your professional work with the brands</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'><span className='font-bold'>Important:</span> Product formulas, labels and legal requirements can differ by country. 
          The <span className='font-bold'>local packaging</span> and official technical documentation are always binding.
        </p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>3.4. Language settings</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>The Product Knowledge Hub is currently available in:</p> 
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>English (default)</li>
          <li>German</li>
          <li>Arabic</li>
          <li>Thai</li>
          <li>Bahasa Indonesia</li>
          <li>Malay</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>To switch the language:</p> 
        <ul className='list-decimal pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Log in to the Hub.</li>
          <li>Open the language or profile menu</li>
          <li>Select your preferred language from the list.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you cannot find your preferred language or run into issues with the translations, please contact <span className='font-bold'>info@happypet.biz.</span></p>
      </div>


      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>4. Viewing activity & usage information</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>The system can show which content has been watched and how the platform is used. This helps us:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Understand which topics are most relevant</li>
          <li>Improve and update our content</li>
          <li>Plan future videos and materials</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>This usage information is linked to your account and is primarily used for content improvement and reporting purposes.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you have questions about how your viewing data is used, please contact <span className='font-bold'>info@happypet.biz.</span></p>
      </div>

      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>5. How your data is used (short explanation)</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>To operate the Happy Dog & Happy Cat Product Knowledge Hub, we store and process only the data needed to provide the service, specifically:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Your <span className='font-bold'>name</span></li>
          <li>Your <span>email address</span></li>
          <li>Your <span>company</span></li>
          <li>Your <span>country</span></li>
          <li>Basic information about which content is accessed</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>We use this data to:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Create and manage your account</li>
          <li>Provide you with access to content and downloads</li>
          <li>Understand which topics are most interesting for our partners</li>
          <li>Improve the relevance and quality of the Product Knowledge Hub</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>For complete legal information, including your rights and contact details for data protection queries, please refer to the <span className='font-bold'>Terms & Policies / Privacy Policy</span> section linked in the footer of the Hub.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you have any questions in the meantime, please feel free to contact us at <span className='font-bold'>info@happypet.biz.</span></p> 
      </div>

      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>6. Technical requirements & troubleshooting</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>6.1. Devices and browsers</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>You can use the Happy Dog & Happy Cat Product Knowledge Hub via:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li><span className='font-bold'>Desktop or laptop</span> using a modern browser (Chrome, Edge, Safari)</li>
          <li>The <span className='font-bold'>app</span> is available on supported mobile devices, where available</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>For the best experience:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Keep your browser updated to the latest version</li>
          <li>Enable JavaScript and allow cookies for the Hub</li>
          <li>Use headphones or speakers for video audio</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-medium'>6.2. Common issues & solutions</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-bold'>I can’t log in</p> 
        <ul className='list-decimal pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Check that you are using the correct email address and password.</li>
          <li>Try the <span>“Forgot password?”</span> link.</li>
          <li>If the issue continues, email <span className='font-bold'>info@happypet.biz</span> with a short description of the problem.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-bold'>Videos are not playing or keep stopping</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Refresh the page and try again.</li>
          <li>Check your internet connection.</li>
          <li>Try another supported browser.</li>
          <li>If the problem persists, contact <span className='font-bold'>info@happypet.biz</span> and mention which course or video is affected.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] font-bold'>Downloads do not open</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Make sure you have a PDF reader installed.</li>
          <li>Try downloading the file again.</li>
          <li>If the file still does not open, send the file name and a screenshot (if possible) to <span className='font-bold'>info@happypet.biz</span>.</li>
        </ul>
      </div>



      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>7. Content responsibility & veterinary disclaimer</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>All content in the Happy Dog & Happy Cat Product Knowledge Hub is created with great care by the Happy Pet team. Still:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Product formulas, declarations and packaging may differ by <span className='font-bold'>country and region</span>.</li>
          <li>Legal requirements and feed regulations also differ between markets. </li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'><span className='font-bold'>For binding information,</span> always refer to:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>The actual product packaging in your market, and</li>
          <li>Official technical documentation provided by Happy Pet or your local distributor.</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>The content in the Hub is intended for professional use only, providing training and informational resources. <br></br>
        It does not replace individual veterinary advice. For any questions about the health of a particular animal, always consult a veterinarian.</p>
      </div>

      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>8. Using downloads and brand materials</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>The Product Knowledge Hub provides downloads (for example, PDF fact sheets) to support you in presenting and selling <span className='font-bold'>Happy Dog and Happy Cat</span>.</p>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>You may typically use these materials for:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Internal training in your organisation</li>
          <li>Presentations and sales talks about Happy Dog and Happy Cat</li>
          <li>Marketing activities that promote Happy Dog and Happy Cat products</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>Please do <span className='font-bold'>not:</span></p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Use our materials for other brands or products</li>
          <li>Modify logos, pack shots or key visuals in ways that change or damage the brand image</li>
          <li>Share internal or non-public documents with competitors or unauthorised third parties</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If you are unsure whether you can use a particular document or image for a specific purpose, please contact <span className='font-bold'>info@happypet.biz</span> before using it.</p>
      </div>


      <div className='mt-3 sm:mt-3 md:mt-5'>
        <h4 className='text-[16px] sm:text-[18px] md:text-[20px] text-[#003863] font-bold'>9. Need more help?</h4>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>If your question is not answered in this Help Centre or if you experience any problems with the Happy Dog & Happy Cat Product Knowledge Hub, we are happy to assist you.</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li className='font-bold'>General support & feedback: info@happypet.biz</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>Please include, where relevant:</p>
        <ul className='list-disc pl-8 mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863] text-[14px] sm:text-[16px] md:text-[18px]'>
          <li>Your <span className='font-bold'>name</span></li>
          <li>The <span className='font-bold'>email address</span> you used to register</li>
          <li>Which <span className='font-bold'>page, video or file</span> are you asking about</li>
          <li>Screenshots if you are reporting a technical issue</li>
        </ul>
        <p className='text-[14px] sm:text-[16px] md:text-[18px] mt-[10px] sm:mt-[10px] md:mt-[14px] text-[#003863]'>We will review your request and respond as soon as possible.</p>
      </div>

    </div>

    </>
  )
}
