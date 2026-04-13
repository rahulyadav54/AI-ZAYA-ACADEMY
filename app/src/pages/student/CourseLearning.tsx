import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockCourses, mockLessons, mockQuizzes } from '@/data/mockData';
import {
  Play,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Clock,
  BookOpen,
  Award,
} from 'lucide-react';

export function CourseLearning() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('content');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<{ score: number; total: number; passed: boolean } | null>(null);

  const course = mockCourses.find((c) => c.id === id);
  const lessons = mockLessons.filter((l) => l.courseId === id).sort((a, b) => a.order - b.order);
  const quizzes = mockQuizzes.filter((q) => q.courseId === id);

  const currentLesson = currentLessonId
    ? lessons.find((l) => l.id === currentLessonId)
    : lessons[0];

  const currentQuiz = quizzes[0];

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Button onClick={() => navigate('/student/courses')}>Back to My Courses</Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleLessonComplete = () => {
    // Mark lesson as complete and move to next
    const currentIndex = lessons.findIndex((l) => l.id === currentLesson?.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLessonId(lessons[currentIndex + 1].id);
    }
  };

  const handleQuizSubmit = () => {
    if (!currentQuiz) return;
    
    let correct = 0;
    currentQuiz.questions.forEach((q, idx) => {
      if (q.correctAnswer === quizAnswers[idx]) correct++;
    });

    setQuizResults({
      score: correct,
      total: currentQuiz.questions.length,
      passed: correct >= currentQuiz.questions.length * 0.7,
    });
    setQuizSubmitted(true);
  };

  const progress = Math.round((lessons.findIndex((l) => l.id === currentLesson?.id) + 1) / lessons.length * 100);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/student/courses')}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{course.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Lesson {lessons.findIndex((l) => l.id === currentLesson?.id) + 1} of {lessons.length}</span>
                <span>•</span>
                <span>{progress}% complete</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-32 h-2" />
          </div>
        </div>

        <div className="flex-1 grid lg:grid-cols-4 gap-6 overflow-hidden">
          {/* Video Player Area */}
          <div className="lg:col-span-3 flex flex-col overflow-hidden">
            <Card className="flex-1 flex flex-col overflow-hidden">
              {/* Video */}
              <div className="aspect-video bg-black flex items-center justify-center">
                {currentLesson ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-white text-center">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Select a lesson to start learning</p>
                  </div>
                )}
              </div>

              {/* Lesson Info & Tabs */}
              <div className="flex-1 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="mx-4 mt-4">
                    <TabsTrigger value="content">Overview</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  </TabsList>

                  <ScrollArea className="flex-1 p-4">
                    <TabsContent value="content" className="mt-0">
                      {currentLesson && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {currentLesson.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{currentLesson.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{currentLesson.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>Lesson {currentLesson.order}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="resources" className="mt-0">
                      <div className="space-y-3">
                        {[
                          { name: 'Lesson Slides.pdf', size: '2.4 MB' },
                          { name: 'Source Code.zip', size: '1.8 MB' },
                          { name: 'Cheat Sheet.pdf', size: '856 KB' },
                        ].map((resource) => (
                          <div
                            key={resource.name}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-violet-600" />
                              <div>
                                <p className="font-medium text-gray-900">{resource.name}</p>
                                <p className="text-sm text-gray-500">{resource.size}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-0">
                      <div className="space-y-4">
                        <textarea
                          className="w-full h-48 p-4 rounded-lg border resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          placeholder="Take notes while watching the lesson..."
                        />
                        <Button>Save Notes</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="quiz" className="mt-0">
                      {currentQuiz && !showQuiz && !quizSubmitted && (
                        <div className="text-center py-8">
                          <Award className="h-16 w-16 mx-auto text-violet-600 mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {currentQuiz.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Test your knowledge with {currentQuiz.questions.length} questions
                          </p>
                          <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
                        </div>
                      )}

                      {showQuiz && !quizSubmitted && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-gray-900">{currentQuiz.title}</h3>
                          {currentQuiz.questions.map((question, qIndex) => (
                            <Card key={question.id}>
                              <CardContent className="p-4">
                                <p className="font-medium text-gray-900 mb-4">
                                  {qIndex + 1}. {question.question}
                                </p>
                                <div className="space-y-2">
                                  {question.options.map((option, oIndex) => (
                                    <label
                                      key={oIndex}
                                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${qIndex}`}
                                        checked={quizAnswers[qIndex] === oIndex}
                                        onChange={() => {
                                          const newAnswers = [...quizAnswers];
                                          newAnswers[qIndex] = oIndex;
                                          setQuizAnswers(newAnswers);
                                        }}
                                        className="h-4 w-4 text-violet-600"
                                      />
                                      <span>{option}</span>
                                    </label>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Button
                            onClick={handleQuizSubmit}
                            disabled={quizAnswers.length < currentQuiz.questions.length}
                            className="w-full"
                          >
                            Submit Quiz
                          </Button>
                        </div>
                      )}

                      {quizSubmitted && quizResults && (
                        <div className="text-center py-8">
                          <div className={`h-20 w-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                            quizResults.passed ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <Award className={`h-10 w-10 ${quizResults.passed ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {quizResults.passed ? 'Congratulations!' : 'Keep Practicing!'}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            You scored {quizResults.score} out of {quizResults.total} (
                            {Math.round((quizResults.score / quizResults.total) * 100)}%)
                          </p>
                          {quizResults.passed && (
                            <p className="text-green-600 mb-4">You passed the quiz!</p>
                          )}
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline" onClick={() => { setShowQuiz(false); setQuizSubmitted(false); setQuizAnswers([]); }}>
                              Retake Quiz
                            </Button>
                            <Button onClick={() => setActiveTab('content')}>
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </div>

              {/* Navigation */}
              <div className="p-4 border-t flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={lessons.findIndex((l) => l.id === currentLesson?.id) === 0}
                  onClick={() => {
                    const currentIndex = lessons.findIndex((l) => l.id === currentLesson?.id);
                    if (currentIndex > 0) {
                      setCurrentLessonId(lessons[currentIndex - 1].id);
                    }
                  }}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  onClick={handleLessonComplete}
                  disabled={lessons.findIndex((l) => l.id === currentLesson?.id) === lessons.length - 1}
                >
                  Next Lesson
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar - Lesson List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 flex-1 overflow-hidden">
                <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
                <ScrollArea className="h-[calc(100%-2rem)]">
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => setCurrentLessonId(lesson.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                          currentLesson?.id === lesson.id
                            ? 'bg-violet-100 text-violet-900'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {index < lessons.findIndex((l) => l.id === currentLesson?.id) ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
                              {lesson.order}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm line-clamp-2 ${
                            currentLesson?.id === lesson.id ? 'text-violet-900' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
