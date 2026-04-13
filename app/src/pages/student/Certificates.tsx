import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { mockCertificates } from '@/data/mockData';
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  Trophy,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export function Certificates() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const certificates = mockCertificates.filter((c) => c.userId === user?.id);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Certificates</h2>
            <p className="text-gray-600">View and download your earned certificates</p>
          </div>
          <Button onClick={() => navigate('/courses')}>
            Earn More Certificates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
              <p className="text-sm text-gray-500">Certificates Earned</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500">Courses Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto text-violet-500 mb-2" />
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-500">Avg. Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Grid */}
        {certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4 shadow-lg">
                        <Award className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        Certificate of Completion
                      </h3>
                      <p className="text-gray-600 mb-4">This certifies that</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        {cert.userName}
                      </p>
                      <p className="text-gray-600 mb-2">has successfully completed</p>
                      <p className="text-xl font-semibold text-gray-900 mb-4">
                        {cert.courseName}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <span>Issued on {new Date(cert.issuedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>ID: {cert.certificateId}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400" />
                  </div>

                  {/* Actions */}
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Button className="flex-1" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Award className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Complete courses to earn certificates and showcase your achievements
            </p>
            <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
