import { Link } from 'react-router-dom';
import type { Course } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, BookOpen, Play } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean;
}

export function CourseCard({ course, showEnrollButton = true }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
          {course.category}
        </Badge>

        {/* Level Badge */}
        <Badge className={`absolute top-3 right-3 ${levelColors[course.level]}`}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </Badge>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-violet-600 ml-1" />
          </div>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <span className="text-white font-bold text-lg">${course.price}</span>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{course.studentsCount.toLocaleString()} students</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-violet-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-500 mb-3">{course.instructorName}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessonsCount} lessons</span>
          </div>
        </div>
      </CardContent>

      {showEnrollButton && (
        <CardFooter className="p-5 pt-0">
          <Link to={`/courses/${course.id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              View Details
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
