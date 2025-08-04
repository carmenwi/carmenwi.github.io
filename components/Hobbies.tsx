import { motion } from 'motion/react';
import { GridBackground } from './GridBackground';

const hobbies = [
  {
    title: 'Fotografía',
    description: 'Capturando momentos únicos y entrenando mi ojo analítico para ver patrones en la composición.',
    icon: '📸',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    delay: 0
  },
  {
    title: 'Senderismo',
    description: 'Explorando la naturaleza para desconectar y encontrar perspectiva lejos de los algoritmos.',
    icon: '🥾',
    color: 'from-green-400 to-blue-500',
    bgColor: 'bg-green-50',
    delay: 0.1
  },
  {
    title: 'Lectura Técnica',
    description: 'Manteniéndome al día con papers de investigación y nuevas metodologías en data science.',
    icon: '📚',
    color: 'from-purple-400 to-blue-500',
    bgColor: 'bg-purple-50',
    delay: 0.2
  },
  {
    title: 'Open Source',
    description: 'Contribuyendo a proyectos de la comunidad y compartiendo conocimiento en mi tiempo libre.',
    icon: '💻',
    color: 'from-gray-500 to-blue-600',
    bgColor: 'bg-gray-50',
    delay: 0.3
  },
  {
    title: 'Cocina Experimental',
    description: 'Aplicando pensamiento científico en la cocina, probando nuevas técnicas como si fueran experimentos.',
    icon: '👨‍🍳',
    color: 'from-orange-400 to-blue-500',
    bgColor: 'bg-orange-50',
    delay: 0.4
  },
  {
    title: 'Gaming Estratégico',
    description: 'Disfrutando juegos que requieren análisis profundo, estrategia y resolución de problemas complejos.',
    icon: '🎮',
    color: 'from-red-400 to-blue-500',
    bgColor: 'bg-red-50',
    delay: 0.5
  }
];

export function Hobbies() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-blue-50/30 to-white overflow-hidden">
      <GridBackground variant="dots" intensity="light" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm mb-6"
          >
            <span>✨</span>
            <span>Más Allá del Código</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            Pasiones que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              inspiran creatividad
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intereses que complementan mi vida profesional y nutren mi capacidad de ver problemas desde nuevas perspectivas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: hobby.delay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group cursor-pointer"
            >
              <div className={`relative p-8 ${hobby.bgColor} rounded-3xl border border-white/50 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 overflow-hidden`}>
                {/* Fondo gradient en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${hobby.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
                
                {/* Contenido */}
                <div className="relative z-10 space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl mb-4"
                  >
                    {hobby.icon}
                  </motion.div>
                  
                  <h3 className="text-xl text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {hobby.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {hobby.description}
                  </p>
                  
                  {/* Indicador de progreso decorativo */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    transition={{ duration: 1, delay: hobby.delay + 0.3 }}
                    viewport={{ once: true }}
                    className={`h-1 bg-gradient-to-r ${hobby.color} rounded-full mt-4`}
                  />
                </div>

                {/* Elementos decorativos flotantes */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full blur-sm"
                />
                
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: hobby.delay 
                  }}
                  className="absolute bottom-4 right-4 w-2 h-2 bg-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}