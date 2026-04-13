import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/types';

// Simulated AI responses based on common learning topics
const aiResponses: Record<string, string> = {
  'react': 'React is a JavaScript library for building user interfaces. It uses components, props, and state to create dynamic UIs. The key concepts include:\n\n1. Components - Reusable UI building blocks\n2. JSX - HTML-like syntax in JavaScript\n3. Props - Data passed to components\n4. State - Internal component data\n5. Hooks - Functions like useState and useEffect for managing state and side effects',
  'hooks': 'React Hooks are functions that let you use state and other React features in functional components:\n\n• useState - Manage component state\n• useEffect - Handle side effects\n• useContext - Access React context\n• useRef - Reference DOM elements\n• useCallback - Memoize functions\n• useMemo - Memoize values\n\nHooks must be called at the top level of your component and cannot be called conditionally.',
  'javascript': 'JavaScript is a versatile programming language used for web development. Key features include:\n\n• Dynamic typing\n• First-class functions\n• Prototype-based object orientation\n• Event-driven programming\n• Asynchronous operations with Promises and async/await\n\nModern JavaScript (ES6+) includes features like arrow functions, destructuring, modules, and classes.',
  'html': 'HTML (HyperText Markup Language) is the standard markup language for web pages. Key elements include:\n\n• <html>, <head>, <body> - Document structure\n• <h1> to <h6> - Headings\n• <p> - Paragraphs\n• <div>, <span> - Containers\n• <a> - Links\n• <img> - Images\n• <form>, <input> - Forms\n\nSemantic HTML5 elements like <header>, <nav>, <main>, <article>, and <footer> improve accessibility and SEO.',
  'css': 'CSS (Cascading Style Sheets) is used to style HTML elements. Key concepts include:\n\n• Selectors - Target specific elements\n• Box Model - Content, padding, border, margin\n• Flexbox - One-dimensional layout\n• Grid - Two-dimensional layout\n• Media Queries - Responsive design\n• Transitions & Animations - Visual effects\n\nModern CSS includes variables, custom properties, and powerful layout systems.',
  'python': 'Python is a high-level, interpreted programming language known for its simplicity. Key features:\n\n• Clean, readable syntax\n• Dynamic typing\n• Extensive standard library\n• Object-oriented programming\n• Great for data science, web development, and automation\n\nPopular libraries include NumPy, Pandas, Django, and Flask.',
  'default': 'That\'s a great question! Let me help you understand this concept better.\n\nCould you provide more context about what specific aspect you\'d like to learn? For example:\n\n• Are you looking for a basic explanation?\n• Do you need help with a specific problem?\n• Would you like code examples?\n• Are you preparing for an exam or project?\n\nI\'m here to help you learn effectively!',
};

function generateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for keywords in the message
  for (const [keyword, response] of Object.entries(aiResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Check for common question patterns
  if (lowerMessage.includes('explain') || lowerMessage.includes('what is') || lowerMessage.includes('how to')) {
    return 'I\'d be happy to explain that! Based on your question, here\'s what you need to know:\n\n' + aiResponses['default'];
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('stuck')) {
    return 'I\'m here to help you! Don\'t worry, learning takes time and practice.\n\nLet me know:\n1. What topic are you working on?\n2. What specific part is confusing?\n3. Have you tried any solutions?\n\nTogether we\'ll figure this out!';
  }
  
  if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('practice')) {
    return 'Great idea to practice! Here are some tips for effective learning:\n\n• Review the lesson material first\n• Take notes on key concepts\n• Try the practice quizzes available in each lesson\n• Apply concepts in small projects\n• Review incorrect answers to understand mistakes\n\nWould you like me to generate some practice questions on a specific topic?';
  }
  
  return aiResponses['default'];
}

export function useAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI tutor. I can help you with:\n\n• Explaining course concepts\n• Answering your questions\n• Providing code examples\n• Suggesting practice exercises\n• Summarizing lessons\n\nWhat would you like to learn today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate AI response
    const aiResponse = generateAIResponse(content);
    
    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I\'m your AI tutor. How can I help you with your learning today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
}
