import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable and efficient code following best practices',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solving',
      description: 'Analytical thinking to tackle complex challenges',
    },
    {
      icon: Rocket,
      title: 'Fast Learner',
      description: 'Quick to adapt and learn new technologies and frameworks',
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'Collaborative approach to software development',
    },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">About Me</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-700 mb-6">
              I'm a Computer Science undergraduate student with a passion for software development 
              and technology. I love turning complex problems into simple, beautiful, and intuitive 
              solutions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              My journey in computer science has been driven by curiosity and a desire to create 
              meaningful applications that make a difference. I'm constantly learning and exploring 
              new technologies to expand my skill set.
            </p>
            <p className="text-lg text-gray-700">
              When I'm not coding, you can find me contributing to open-source projects, 
              participating in hackathons, or exploring the latest tech trends.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Icon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
