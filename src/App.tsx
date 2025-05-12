import React, { useState } from 'react';
import {
  Baby, Shirt, Sofa, Sparkles, Puzzle, Instagram, Facebook, MessageCircle, ChevronRight, Star, ListChecks, Download, BookOpen
} from 'lucide-react';
import { z } from 'zod';

// --- VOLTAR A USAR OS ALIASES ---
import { Button } from './components/ui/button'; // Usar alias
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose, DialogFooter
} from './components/ui/dialog'; // Usar aliasq
import { Input } from './components/ui/input'; // Usar alias
import { Label } from './components/ui/label'; // Usar alias

function App() {
  const links = [
    {
      title: 'Roupas',
      icon: <Shirt />,
      description: 'Coleção Primavera/Verão',
      url: 'https://wa.me/5537998436410?text=Ol%C3%A1!%20Vim%20do%20Instagram%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20roupinhas'
    },
    {
      title: 'Móveis',
      icon: <Sofa />,
      description: 'Decoração e Conforto',
      url: 'https://wa.me/553798456914?text=Ol%C3%A1!%20Vim%20do%20Instagram%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20linha%20de%20m%C3%B3veis'
    },
    {
      title: 'Enxoval',
      icon: <Sparkles />,
      description: 'Itens Essenciais',
      url: 'https://wa.me/553798048372?text=Ol%C3%A1!%20Vim%20do%20Instagram%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20linha%20de%20enxoval'
    },
    {
      title: 'Brinquedos',
      icon: <Puzzle />,
      description: 'Diversão e Aprendizado',
      url: 'https://wa.me/5537998436410?text=Ol%C3%A1!%20Vim%20do%20Instagram%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20linha%20de%20brinquedos'
    }
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, url: 'https://www.instagram.com/lojamachinebaby', label: 'Instagram' },
    { icon: <Facebook size={24} />, url: 'https://www.facebook.com/p/Machine-Baby-100052590804873', label: 'Facebook' },
  ];

  // --- Estados ---
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // --- Esquemas de Validação Zod ---
  const nameSchema = z.string().min(1, { message: "O nome é obrigatório." });
  const phoneSchema = z.string()
    .min(1, { message: "O WhatsApp é obrigatório." })
    .regex(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/, {
      message: "Formato de WhatsApp inválido. Por favor, preencha como o exemplo: (37) 99999-9999 ou (37) 999999999."
    });

  // --- Função de Download ---
  const triggerPdfDownload = () => {
    const link = document.createElement('a');
    // Usar caminho absoluto para o arquivo na pasta public
    link.href = '/lista-enxoval.pdf';
    link.setAttribute('download', 'lista-completa-enxoval-bebe-machine-baby.pdf'); // Nome do arquivo baixado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- Função de Envio do Formulário ---
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne recarregamento da página

    // Limpar erros anteriores
    setNameError('');
    setPhoneError('');

    // Validação com Zod
    const nameValidation = nameSchema.safeParse(name);
    const phoneValidation = phoneSchema.safeParse(phone);

    let hasError = false;
    if (!nameValidation.success) {
      setNameError(nameValidation.error.errors[0].message);
      hasError = true;
    }

    if (!phoneValidation.success) {
      setPhoneError(phoneValidation.error.errors[0].message);
      hasError = true;
    }

    if (hasError) {
      return; // Interrompe se a validação falhar
    }

    // --- LÓGICA QUE SÓ RODA APÓS ENVIO VÁLIDO ---
    console.log('Dados Coletados:', { name, phone }); // Opcional: Enviar para API, etc.
    
    // Enviar dados para o webhook
    console.log('Iniciando envio para webhook...');
    fetch('https://n8n.f5.marketing/webhook/site-machine-baby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      },
      mode: 'cors', // Adicionar modo CORS explícito
      body: JSON.stringify({ 
        name, 
        phone,
        source: 'site-machine-baby',
        date: new Date().toISOString()
      }),
    })
    .then(response => {
      console.log('Status da resposta:', response.status);
      if (!response.ok) {
        throw new Error(`Falha ao enviar dados: ${response.status}`);
      }
      // Verificar se a resposta contém JSON antes de tentar converter
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return null; // Retornar null se não for JSON
    })
    .then((data) => {
      console.log('Dados enviados com sucesso para o webhook', data);
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
      
      // Log adicional para debugar problemas de rede/CORS
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Erro de rede ou CORS. Verifique se o servidor está acessível e permitindo requisições desta origem.');
      }
    })
    .finally(() => {
      triggerPdfDownload(); // Dispara o download
      setName(''); // Limpa o campo nome
      setPhone(''); // Limpa o campo telefone
      setNameError('');
      setPhoneError('');
      setIsModalOpen(false); // FECHA o modal
    });
    // --- FIM DA LÓGICA DE SUCESSO ---
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Logo and Profile */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-white shadow-lg">
            <img
              src="mb-logo.png" // Certifique-se que mb-logo.png está na pasta public
              alt="Machine Baby"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Baby className="text-pink-400" />
            <h1 className="text-2xl font-semibold text-gray-800">Machine Baby</h1>
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
          {/* Links existentes */}
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
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

          {/* --- NOVO: Botão e Modal --- */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button
                className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 text-left flex items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <ListChecks />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-800">Lista de Enxoval Grátis</h2>
                  <p className="text-sm text-gray-500">Baixe nossa lista completa em PDF</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] rounded-xl bg-white border-0 shadow-xl">
              <div className="bg-gradient-to-r from-pink-100 to-blue-100 -m-6 mb-4 p-6 rounded-t-xl">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <ListChecks className="w-8 h-8 text-pink-500" />
                </div>
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-xl text-center font-semibold text-gray-800">Baixe sua Lista de Enxoval</DialogTitle>
                  <DialogDescription className="text-center text-gray-600">
                    Preencha seus dados abaixo para receber a lista completa gratuitamente.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* --- Formulário --- */}
              <form onSubmit={handleFormSubmit} className="grid gap-5 px-2">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-pink-400 focus:ring-pink-400"
                    placeholder="Seu nome completo"
                    required
                  />
                  {nameError && <p className="text-sm text-red-500 mt-1">{nameError}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-lg border-gray-300 focus:border-pink-400 focus:ring-pink-400"
                    placeholder="(XX) 9XXXX-XXXX"
                    required
                  />
                  {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                </div>

                <DialogFooter className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="w-full sm:w-auto">Cancelar</Button>
                  </DialogClose>
                  {/* Botão que dispara o handleFormSubmit */}
                  <Button type="submit" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600">
                    Baixar Lista Agora
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </form> {/* --- Fim Formulário --- */}

            </DialogContent>
          </Dialog> {/* --- Fim Novo Botão e Modal --- */}

          {/* Botão Catálogo de Móveis */}
          <a
            href="https://wa.me/c/553798436410"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-500">
                <BookOpen />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium text-gray-800">Catálogo de Móveis</h2>
                <p className="text-sm text-gray-500">Veja nossa coleção completa</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-pink-500"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* WhatsApp Button */}
        <div className="fixed bottom-8 right-8 hidden md:block">
          <a
            href="https://wa.me/553798048372" // Verifique se este é o número correto
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Fale Conosco</span>
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Machine Baby. Todos os direitos reservados.
          </p>
          <p className="text-center text-gray-500 text-sm">
            Desenvolvido por <a href="https://f5.marketing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">f5.marketing</a>
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;