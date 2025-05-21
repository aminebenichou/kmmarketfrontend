'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MessageCircleIcon } from 'lucide-react';

interface Message {
  text: string | string[];
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const predefinedAnswers: Record<string, string[]> = {
    'Comment puis-je augmenter mes ventes sur KM Market ?': [
      '• Publiez des annonces claires avec de belles photos.',
      '• Mettez à jour vos annonces régulièrement.',
      '• Proposez des prix compétitifs.',
      '• Répondez rapidement aux messages des acheteurs.',
      '• Utilisez la publicité payante pour booster votre visibilité.',
    ],
    'Comment rendre mon annonce plus attractive ?': [
      '• Choisissez un bon titre (ex. : “Chaussures Nike neuves à petit prix”).',
      '• Ajoutez plusieurs photos claires.',
      '• Soyez précis dans la description : état, marque, taille, etc.',
      '• Indiquez si vous offrez la livraison ou une réduction.',
      '• Utiliser km publicité',
    ],
    'Quel est le meilleur moment pour publier une annonce ?': [
      'Publiez vos annonces en fin de journée (17h-22h) ou le week-end. C’est à ce moment-là que les utilisateurs sont le plus actifs.',
    ],
    'Que faire pour fidéliser mes clients ?': [
      '• Offrez un petit cadeau ou une réduction sur le prochain achat.',
      '• Communiquez avec respect et professionnalisme.',
      '• Soyez ponctuel pour les rendez-vous ou les livraisons.',
      '• Répondez rapidement à leurs messages.',
    ],
  };

  const handleSendMessage = (question: string) => {
    const userMessage: Message = { text: question, sender: 'user' };
    const botMessage: Message = {
      text: predefinedAnswers[question] ?? 'Désolé, je peux seulement répondre à quelques questions prédéfinies.',
      sender: 'bot',
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setUserInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            style={{
              backgroundColor: '#007AFF',
              color: 'white',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <MessageCircleIcon size={24} />
          </button>
        </DialogTrigger>

        <DialogContent
          style={{
            maxWidth: '400px',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            backgroundColor: '#f7f7f7',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogHeader
            style={{
              paddingBottom: '15px',
              borderBottom: '1px solid #e0e0e0',
              marginBottom: '15px',
            }}
          >
            <DialogTitle style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Chat with us
            </DialogTitle>
            <DialogDescription style={{ color: '#777', fontSize: '0.9rem' }}>
              Posez l'une de ces questions pour commencer.
            </DialogDescription>
          </DialogHeader>

          <div
            ref={chatContainerRef}
            style={{
              maxHeight: '300px',
              overflowY: 'auto',
              marginBottom: '15px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '70%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#0577e3' : '#E5E5EA',
                  color: msg.sender === 'user' ? '#fff' : '#000',
                  borderRadius: '18px',
                  padding: '8px 14px',
                  marginBottom: '8px',
                  wordBreak: 'break-word',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                }}
              >
                {Array.isArray(msg.text)
                  ? msg.text.map((line: string, i: number) => <div key={i}>{line}</div>)
                  : msg.text}
              </div>
            ))}
          </div>

          {/* Predefined questions buttons */}
          <div
            className="flex overflow-x-auto space-x-2 mb-4"
            style={{ paddingBottom: '10px' }}
          >
            {Object.keys(predefinedAnswers).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSendMessage(question)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '9999px',
                }}
              >
                {question}
              </Button>
            ))}
          </div>

          <form className="flex" onSubmit={handleSubmit}>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Posez une question..."
              style={{
                flex: '1',
                padding: '10px',
                borderRadius: '20px',
                border: '1px solid #ccc',
                marginRight: '10px',
                fontSize: '0.9rem',
              }}
            />
            <Button
              type="submit"
              variant="default"
              style={{
                padding: '10px 15px',
                borderRadius: '20px',
                backgroundColor: '#007AFF',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBot;
