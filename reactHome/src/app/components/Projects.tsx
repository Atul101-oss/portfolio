import { useEffect, useState } from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  created_at: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch('http://127.0.0.1:8000/api/v1/projects_serialzer')
        const response = await fetch('https://portfolio-production-6791.up.railway.app/api/v1/projects_manual');
        // const response = await fetch('http://127.0.0.1:8000/api/v1/projects_manual');

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        console.log("API RESPONSE 1:", data);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // const fetchProjects = async () => {
  //   try {
  //     // Simulating API call - replace with actual Django endpoint
  //     // const response = await fetch('YOUR_DJANGO_API_URL/api/projects/');
  //     // const data = await response.json();

  //     // Mock data for demonstration
  //     await new Promise(resolve => setTimeout(resolve, 1000));

  //     const mockProjects: Project[] = [
  //       {
  //         id: 1,
  //         title: 'E-Commerce Platform',
  //         description: 'A full-stack e-commerce application with user authentication, product management, and payment integration.',
  //         technologies: ['React', 'Django', 'PostgreSQL', 'Stripe'],
  //         github_url: 'https://github.com/username/project',
  //         live_url: 'https://project-demo.com',
  //         created_at: '2024-01-15',
  //       },
  //       {
  //         id: 2,
  //         title: 'Task Management System',
  //         description: 'Collaborative task management tool with real-time updates and team collaboration features.',
  //         technologies: ['React', 'Django REST', 'WebSockets', 'Redis'],
  //         github_url: 'https://github.com/username/project',
  //         created_at: '2024-02-20',
  //       },
  //       {
  //         id: 3,
  //         title: 'Weather Dashboard',
  //         description: 'Interactive weather dashboard displaying real-time weather data and forecasts for multiple locations.',
  //         technologies: ['React', 'OpenWeather API', 'Chart.js'],
  //         github_url: 'https://github.com/username/project',
  //         live_url: 'https://weather-demo.com',
  //         created_at: '2024-03-10',
  //       },
  //     ];

  //     setProjects(mockProjects);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"></div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No projects uploaded yet.</p>
            <p className="text-gray-500">Check back soon for exciting projects!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  {project.github_url && (
                    <Button variant="outline" size="sm" className="gap-2 flex-1" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.live_url && (
                    <Button size="sm" className="gap-2 flex-1" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
