import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIChat } from '@/hooks/useAIChat';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Trash2,
  Lightbulb,
  BookOpen,
  Code,
  HelpCircle,
} from 'lucide-react';

const quickPrompts = [
  {
    icon: BookOpen,
    label: 'Explain a concept',
    prompt: 'Can you explain React hooks in simple terms?',
  },
  {
    icon: Code,
    label: 'Code help',
    prompt: 'How do I create a custom hook in React?',
  },
  {
    icon: Lightbulb,
    label: 'Study tips',
    prompt: 'What are some effective study techniques for programming?',
  },
  {
    icon: HelpCircle,
    label: 'Practice questions',
    prompt: 'Can you give me some practice questions about JavaScript?',
  },
];

export function AITutor() {
  const { messages, isLoading, sendMessage, clearChat } = useAIChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
    setInput('');
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return;
    await sendMessage(prompt);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Tutor</h2>
              <p className="text-sm text-gray-500">Your personal learning assistant</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>

        <div className="flex-1 grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Quick Prompts */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Prompts</h3>
                <div className="space-y-2">
                  {quickPrompts.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleQuickPrompt(item.prompt)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-violet-50 transition-colors text-left"
                    >
                      <div className="h-8 w-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-violet-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Be specific with your questions</li>
                  <li>• Ask for code examples</li>
                  <li>• Request step-by-step explanations</li>
                  <li>• Get help with debugging</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role === 'user'
                                ? 'bg-violet-600'
                                : 'bg-gradient-to-br from-violet-600 to-indigo-600'
                            }`}
                          >
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              message.role === 'user'
                                ? 'bg-violet-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="whitespace-pre-line text-sm">
                              {message.content}
                            </div>
                            <span
                              className={`text-xs mt-1 block ${
                                message.role === 'user' ? 'text-violet-200' : 'text-gray-500'
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-violet-600" />
                          <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-gray-50">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your courses..."
                    className="flex-1 h-12"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
