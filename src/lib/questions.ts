// Banco de preguntas por tema
export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number; // index
  explanation: string;
  tip?: string;
};

export type Topic = {
  id: string;
  title: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  questions: Question[];
};

export const TOPICS: Record<string, Topic> = {
  ventas: {
    id: "ventas",
    title: "Técnicas de Venta",
    icon: "🤝",
    color: "#7C3AED",
    gradient: "from-purple-600 to-purple-800",
    description: "Domina el arte de convencer y cerrar tratos exitosos",
    questions: [
      {
        id: 1,
        question: "¿Cuál es el primer paso en el proceso de ventas?",
        options: [
          "Cerrar el trato",
          "Prospección y búsqueda de clientes",
          "Hacer la presentación",
          "Superar objeciones",
        ],
        correct: 1,
        explanation: "La prospección es la base de todo proceso de ventas. Sin clientes potenciales, no hay venta posible.",
        tip: "💡 Dedica al menos el 30% de tu tiempo a buscar nuevos prospectos.",
      },
      {
        id: 2,
        question: "¿Qué significa la técnica de venta AIDA?",
        options: [
          "Atención, Interés, Deseo, Acción",
          "Análisis, Inversión, Decisión, Acuerdo",
          "Atracción, Información, Demostración, Aceptación",
          "Afirmación, Identificación, Desarrollo, Aplicación",
        ],
        correct: 0,
        explanation: "AIDA es un modelo clásico: captura la Atención, genera Interés, crea Deseo y lleva a la Acción de compra.",
        tip: "💡 AIDA fue creado por E. St. Elmo Lewis en 1898 y sigue siendo muy efectivo.",
      },
      {
        id: 3,
        question: "¿Cuál es la mejor forma de manejar una objeción de precio?",
        options: [
          "Ignorar la objeción y seguir con la presentación",
          "Bajar el precio inmediatamente",
          "Resaltar el valor y beneficios del producto",
          "Decir que el precio no es negociable",
        ],
        correct: 2,
        explanation: "Cuando un cliente dice que algo es caro, realmente está preguntando '¿Vale la pena?' Muestra el valor.",
        tip: "💡 Nunca bajes el precio sin obtener algo a cambio del cliente.",
      },
      {
        id: 4,
        question: "¿Qué es el cierre de venta '¿Por qué no?'",
        options: [
          "Preguntar al cliente qué razones tiene para no comprar",
          "Insistir agresivamente hasta que compre",
          "Una técnica para ignorar las objeciones",
          "Ofrecer descuentos sorpresa al final",
        ],
        correct: 0,
        explanation: "Esta técnica invierte la carga: el cliente debe justificar por qué NO compraría en lugar de por qué sí.",
        tip: "💡 Úsala con cuidado, solo cuando la conversación ya está muy avanzada.",
      },
      {
        id: 5,
        question: "¿Qué es la escucha activa en ventas?",
        options: [
          "Hablar mucho para convencer al cliente",
          "Prestar atención plena al cliente, hacer preguntas y demostrar comprensión",
          "Escuchar música mientras el cliente habla",
          "Anotar todo lo que dice el cliente sin responder",
        ],
        correct: 1,
        explanation: "La escucha activa te permite entender realmente las necesidades del cliente para ofrecer soluciones precisas.",
        tip: "💡 Los mejores vendedores escuchan el 70% del tiempo y hablan solo el 30%.",
      },
      {
        id: 6,
        question: "¿Qué es el upselling?",
        options: [
          "Vender a clientes del competidor",
          "Ofrecer un producto más caro o de mayor categoría al cliente",
          "Dar descuentos masivos para vender más",
          "Vender online en lugar de presencialmente",
        ],
        correct: 1,
        explanation: "El upselling consiste en ofrecer una versión superior o más completa del producto que el cliente está considerando.",
        tip: "💡 Amazon genera el 35% de sus ingresos gracias a técnicas de upselling y cross-selling.",
      },
      {
        id: 7,
        question: "¿Cuál es el objetivo principal de un rapport en ventas?",
        options: [
          "Vender lo más rápido posible",
          "Crear una conexión de confianza con el cliente",
          "Presentar todas las características del producto",
          "Negociar el precio desde el inicio",
        ],
        correct: 1,
        explanation: "El rapport es la base de la relación vendedor-cliente. Sin confianza, no hay venta duradera.",
        tip: "💡 Encuentra algo en común con tu cliente en los primeros 2 minutos de conversación.",
      },
      {
        id: 8,
        question: "¿Qué es el cross-selling?",
        options: [
          "Vender en mercados internacionales",
          "Ofrecer productos complementarios al que el cliente ya compró o va a comprar",
          "Competir con otros vendedores por el mismo cliente",
          "Vender en diferentes plataformas simultáneamente",
        ],
        correct: 1,
        explanation: "El cross-selling (venta cruzada) aumenta el ticket promedio al sugerir productos que complementan la compra principal.",
        tip: "💡 '¿Desea papas con su orden?' es el cross-selling más famoso del mundo.",
      },
    ],
  },
  atencion: {
    id: "atencion",
    title: "Atención al Cliente",
    icon: "💬",
    color: "#EC4899",
    gradient: "from-pink-600 to-rose-700",
    description: "Crea experiencias memorables y fideliza clientes",
    questions: [
      {
        id: 1,
        question: "¿Cuál es el tiempo máximo recomendado para responder a un cliente en canales digitales?",
        options: ["24 horas", "1 hora", "1 semana", "3 días"],
        correct: 1,
        explanation: "En la era digital, los clientes esperan respuestas rápidas. More than 1 hour significantly drops satisfaction.",
        tip: "💡 El 82% de los clientes espera respuesta en menos de 10 minutos en redes sociales.",
      },
      {
        id: 2,
        question: "¿Cómo se llama la métrica que mide la satisfacción del cliente con una sola pregunta?",
        options: ["KPI", "NPS (Net Promoter Score)", "ROI", "CRM"],
        correct: 1,
        explanation: "El NPS pregunta '¿Qué tan probable es que recomiendes nuestra empresa?' y clasifica a los clientes.",
        tip: "💡 Un NPS por encima de 50 se considera excelente.",
      },
      {
        id: 3,
        question: "Cuando un cliente está enojado, ¿cuál es la primera cosa que debes hacer?",
        options: [
          "Explicarle por qué se equivoca",
          "Escucharle y mostrar empatía",
          "Transferirlo a otro departamento",
          "Pedirle que se calme primero",
        ],
        correct: 1,
        explanation: "La empatía desactiva la emoción negativa del cliente. Primero valida sus sentimientos, luego resuelve.",
        tip: "💡 Frases como 'Entiendo tu frustración' son más poderosas que cualquier solución técnica.",
      },
    ],
  },
  liderazgo: {
    id: "liderazgo",
    title: "Liderazgo",
    icon: "👑",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-600",
    description: "Desarrolla habilidades para guiar equipos al éxito",
    questions: [
      {
        id: 1,
        question: "¿Cuál es la diferencia entre un jefe y un líder?",
        options: [
          "No hay diferencia, son lo mismo",
          "El jefe tiene más experiencia que el líder",
          "El jefe ordena, el líder inspira e involucra al equipo",
          "El líder tiene más autoridad formal",
        ],
        correct: 2,
        explanation: "Un jefe usa su posición para mandar; un líder usa su influencia, ejemplo y visión para motivar.",
        tip: "💡 'Un jefe dice: ve. Un líder dice: vamos.' — John C. Maxwell",
      },
      {
        id: 2,
        question: "¿Qué estilo de liderazgo es más efectivo según la situación?",
        options: [
          "Siempre el liderazgo autoritario",
          "El liderazgo situacional (adaptar el estilo al equipo y tarea)",
          "Siempre el liderazgo democrático",
          "El liderazgo laissez-faire en todos los casos",
        ],
        correct: 1,
        explanation: "El liderazgo situacional de Hersey y Blanchard dice que no existe un estilo único; debes adaptarte.",
        tip: "💡 Un experto necesita autonomía; un novato necesita dirección clara.",
      },
    ],
  },
  negociacion: {
    id: "negociacion",
    title: "Negociación",
    icon: "🎯",
    color: "#10B981",
    gradient: "from-emerald-600 to-teal-700",
    description: "Aprende a cerrar acuerdos favorables siempre",
    questions: [
      {
        id: 1,
        question: "¿Qué es el BATNA en negociación?",
        options: [
          "La mejor oferta que puedes hacer",
          "La Mejor Alternativa a un Acuerdo Negociado",
          "El margen de ganancia mínimo aceptable",
          "Una técnica de presión psicológica",
        ],
        correct: 1,
        explanation: "BATNA (Best Alternative To a Negotiated Agreement) es tu plan B si la negociación falla. Conocerlo te da poder.",
        tip: "💡 Nunca entres a una negociación sin tener claro tu BATNA.",
      },
      {
        id: 2,
        question: "¿Cuál es el enfoque de la negociación 'ganar-ganar'?",
        options: [
          "Que solo yo gane lo más posible",
          "Que ambas partes logren sus objetivos principales",
          "Dividir exactamente en dos partes iguales",
          "Que ninguna parte ceda nada",
        ],
        correct: 1,
        explanation: "Ganar-ganar busca crear valor para ambas partes, construyendo relaciones duraderas y acuerdos sostenibles.",
        tip: "💡 Se basa en el libro 'Getting to Yes' de Fisher y Ury de Harvard.",
      },
    ],
  },
};
