import { Calculator, AlertCircle, CheckCircle2, Home, Paintbrush } from 'lucide-react';
import { useState } from 'react';

interface CalculationResult {
  paintArea: number;
  estimatedPrice: number;
  factor: number;
}

export function PaintCalculator() {
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculatePaint = () => {
    const areaValue = parseFloat(area);
    const roomsValue = parseInt(rooms);

    if (isNaN(areaValue) || isNaN(roomsValue) || areaValue <= 0 || roomsValue <= 0) {
      return;
    }

    // Determine conversion factor based on number of rooms
    let factor = 3.7;
    if (roomsValue <= 2) {
      factor = 3.2;
    } else if (roomsValue === 3) {
      factor = 3.5;
    } else if (roomsValue <= 5) {
      factor = 3.7;
    } else {
      factor = 4.0;
    }

    // Calculate painting area
    const paintArea = areaValue * factor;

    // Calculate price based on progressive table
    let price = 0;
    if (paintArea <= 15) {
      price = 399.90;
    } else if (paintArea <= 50) {
      price = paintArea * 22.90;
    } else if (paintArea <= 100) {
      price = paintArea * 21.90;
    } else if (paintArea <= 200) {
      price = paintArea * 20.90;
    } else if (paintArea <= 500) {
      price = paintArea * 18.90;
    } else {
      price = paintArea * 17.90;
    }

    setResult({
      paintArea,
      estimatedPrice: price,
      factor,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-green-600 text-white rounded-t-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Paintbrush className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Simulador de Pintura</h1>
          </div>
          <p className="text-green-100">Estimativa rápida para serviços de pintura residencial</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="area" className="block text-gray-700 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-green-600" />
                  Tamanho do imóvel (m²)
                </div>
              </label>
              <input
                type="number"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                placeholder="Ex: 80"
                min="0"
              />
            </div>

            <div>
              <label htmlFor="rooms" className="block text-gray-700 font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Quantidade de cômodos
                </div>
              </label>
              <input
                type="number"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition-colors"
                placeholder="Ex: 4"
                min="0"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculatePaint}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calcular Estimativa
          </button>

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Resultado da Simulação
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm mb-1">Fator de conversão</p>
                    <p className="text-2xl font-bold text-green-700">{result.factor.toFixed(1)}x</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm mb-1">Área de pintura</p>
                    <p className="text-2xl font-bold text-green-700">{result.paintArea.toFixed(1)} m²</p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow">
                    <p className="text-gray-600 text-sm mb-1">Valor estimado</p>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(result.estimatedPrice)}</p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Importante - Caráter de Simulação
                </h4>
                <p className="text-yellow-800 mb-3">
                  Esta calculadora gera <strong>apenas uma estimativa inicial de valor</strong>.
                </p>
                <p className="text-yellow-800 mb-3">
                  O resultado apresentado deve ser tratado como <strong>SIMULAÇÃO DE PREÇO</strong>, podendo sofrer alterações após a <strong>visita técnica obrigatória</strong> realizada pelo profissional responsável pelo serviço.
                </p>
                <p className="text-yellow-800">
                  A confirmação final do escopo, prazo e valor do serviço será realizada exclusivamente após a avaliação técnica no local.
                </p>
              </div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-8 space-y-4">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-blue-900 mb-3">Premissas consideradas nesta simulação</h4>
              <p className="text-blue-800 mb-3">
                O valor estimado considera que as paredes e tetos estejam prontos para pintura, necessitando apenas de <strong>pequenas correções pontuais</strong>, como remoção de buchas ou parafusos.
              </p>
              <p className="text-blue-800 font-medium mb-2">O escopo considerado inclui:</p>
              <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                <li>Lixamento fino da superfície para melhorar aderência</li>
                <li>Aplicação de fundo preparador ou selador quando necessário</li>
                <li>Aplicação de até 3 demãos de tinta</li>
                <li>Uso de tinta standard ou premium</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Não estão considerados nesta simulação</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Massa corrida ou massa acrílica em grandes áreas</li>
                <li>Correção de trincas estruturais</li>
                <li>Regularização de superfícies</li>
                <li>Tratamento de infiltrações ou umidade</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Caso essas necessidades sejam identificadas na visita técnica, <strong>serviços complementares poderão ser recomendados e adicionados ao orçamento final</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>Leroy Merlin - Facilitando o atendimento ao cliente</p>
        </div>
      </div>
    </div>
  );
}
