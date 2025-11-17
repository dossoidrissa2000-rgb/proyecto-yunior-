
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { OutputType } from './types';
import { generateDocument } from './services/geminiService';

const initialProjectBrief = `Projecto: Sitio Web de Capacitación para Desarrolladores

Descripción:
Crear un sitio web para un programa de capacitación dirigido a desarrolladores. El sitio debe proporcionar información sobre el curso, horarios y fechas.

Horarios de las sesiones de capacitación:
- Lunes: 14:00 a 17:00
- Martes: 15:00 a 18:00
- Viernes: 14:00 a 17:00

Fechas de las sesiones:
- 16 de diciembre de 2025
- 20 de diciembre de 2025
- 25 de diciembre de 2025`;

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(initialProjectBrief);
  const [outputType, setOutputType] = useState<OutputType>(OutputType.Summary);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useFastModel, setUseFastModel] = useState<boolean>(true);

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const result = await generateDocument(inputText, outputType, useFastModel);
      setGeneratedContent(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`An error occurred: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [inputText, outputType, useFastModel]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col md:flex-row gap-6 lg:gap-8">
        <div className="md:w-1/2 lg:w-5/12 flex flex-col">
          <InputPanel
            inputText={inputText}
            setInputText={setInputText}
            outputType={outputType}
            setOutputType={setOutputType}
            isLoading={isLoading}
            handleGenerate={handleGenerate}
            useFastModel={useFastModel}
            setUseFastModel={setUseFastModel}
          />
        </div>
        <div className="md:w-1/2 lg:w-7/12 flex flex-col">
          <OutputPanel
            generatedContent={generatedContent}
            isLoading={isLoading}
            error={error}
            outputType={outputType}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
