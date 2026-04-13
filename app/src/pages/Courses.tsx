import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CourseCard } from '@/components/courses/CourseCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockCourses, courseCategories, courseLevels } from '@/data/mockData';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All Levels' ||
        course.level === selectedLevel.toLowerCase();

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All Levels');
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All Levels';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-violet-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg text-violet-100 mb-8">
              Discover world-class courses taught by industry experts. 
              Start learning today and transform your career.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white border-0 shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Courses */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>

            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredCourses.length}</span> courses
            </p>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm mb-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Level
                  </label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-8">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery('')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('All')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedLevel !== 'All Levels' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                  Level: {selectedLevel}
                  <button onClick={() => setSelectedLevel('All Levels')}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {courseCategories.filter(c => c !== 'All').map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-xl text-center transition-all ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-50 hover:bg-violet-50 text-gray-700 hover:text-violet-700'
                }`}
              >
                <span className="font-medium">{category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
