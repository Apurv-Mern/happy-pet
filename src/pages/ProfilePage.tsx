import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ProfilePage = () => {
  const { user } = useAuthStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 sm:mt-10 mb-6 sm:mb-10 px-4"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl text-[#003863]">
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="text-lg font-semibold text-[#003863]">{user?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg font-semibold text-[#003863]">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">User Type</label>
                <p className="text-lg font-semibold text-[#003863]">{user?.userType || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Preferred Language</label>
                <p className="text-lg font-semibold text-[#003863]">{user?.preferredLanguage || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfilePage
