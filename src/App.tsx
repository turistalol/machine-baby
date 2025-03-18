import React from 'react';
import {
  Baby,
  Shirt,
  Sofa,
  Sparkles,
  Puzzle,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ChevronRight,
  Star
} from 'lucide-react';

function App() {
  const links = [
    { title: 'Roupas', icon: <Shirt />, description: 'Coleção Primavera/Verão' },
    { title: 'Móveis', icon: <Sofa />, description: 'Decoração e Conforto' },
    { title: 'Enxoval', icon: <Sparkles />, description: 'Itens Essenciais' },
    { title: 'Brinquedos', icon: <Puzzle />, description: 'Diversão e Aprendizado' },
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, url: '#', label: 'Instagram' },
    { icon: <Facebook size={24} />, url: '#', label: 'Facebook' },
    { icon: <Youtube size={24} />, url: '#', label: 'Youtube' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Logo and Profile */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=300"
              alt="Baby Store"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Baby className="text-pink-400" />
            <h1 className="text-2xl font-semibold text-gray-800">Baby Dreams</h1>
          </div>
          <p className="text-gray-600 text-center">Produtos especiais para momentos únicos</p>
        </div>

        {/* New Collection Badge */}
        <div className="flex items-center justify-center mb-8">
          <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
            <Star size={16} className="fill-current" />
            Nova Coleção Disponível
          </span>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.title}
              href="#"
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  {link.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-800">{link.title}</h2>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-pink-500"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* WhatsApp Button */}
        <div className="fixed bottom-8 right-8">
          <a
            href="#"
            className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Fale Conosco</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;