import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Skills() {
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'SQL'],
    },
    {
      category: 'Web Development',
      skills: ['React', 'Django', 'Node.js', 'HTML/CSS', 'Tailwind CSS', 'REST APIs'],
    },
    {
      category: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'PostgreSQL', 'MongoDB', 'Linux', 'VS Code'],
    },
    {
      category: 'Concepts',
      skills: ['Data Structures', 'Algorithms', 'OOP', 'Database Design', 'Agile', 'Version Control'],
    },
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Skills & Technologies</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary"
                      className="text-sm py-1.5 px-3"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
