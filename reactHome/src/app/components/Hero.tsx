import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold mb-6">
            AA
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Computer Science Student
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Passionate about building innovative solutions and learning new technologies.
          Currently pursuing my undergraduate degree in Computer Science.
        </p>

        <div className="flex gap-4 justify-center flex-wrap mb-12">
          <Button size="lg" className="gap-2">
            <a href="https://github.com/Atul101-oss/">
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <a href="https://linkedin.com/atul-oss/">
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <a href="https://wa.me/919911654787">
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </Button>
        </div>

        <div className="flex gap-8 justify-center text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">10+</div>
            <div className="text-gray-600">Projects</div>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div>
            <div className="text-3xl font-bold text-purple-600">5+</div>
            <div className="text-gray-600">Technologies</div>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div>
            <div className="text-3xl font-bold text-blue-600">3+</div>
            <div className="text-gray-600">Years Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
}
