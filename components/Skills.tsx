import { motion } from 'motion/react';
import { GridBackground } from './GridBackground';

const skillCategories = [
  {
    title: 'Machine Learning',
    icon: '🤖',
    color: 'from-blue-500 to-blue-600',
    skills: ['Python', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'XGBoost'],
    level: 95
  },
  {
    title: 'Data Analysis',
    icon: '📊',
    color: 'from-blue-600 to-purple-600',
    skills: ['Pandas', 'NumPy', 'SQL', 'R', 'Statistical Analysis'],
    level: 92
  },
  {
    title: 'Visualization',
    icon: '📈',
    color: 'from-purple-500 to-blue-500',
    skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI'],
    level: 88
  },
  {
    title: 'Big Data & Cloud',
    icon: '☁️',
    color: 'from-blue-400 to-cyan-500',
    skills: ['Spark', 'AWS', 'Docker', 'Kubernetes', 'Airflow'],
    level: 85
  }
];

const floatingIcons = ['🧠', '⚡', '🔍', '💡', '🎯', '🚀'];

export function Skills() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <GridBackground variant="grid" intensity="light" className="opacity-50" />
      
      {/* Elementos flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              opacity: { delay: index * 0.2, duration: 0.5 },
              scale: { delay: index * 0.2, duration: 0.5 },
              y: { 
                duration: 3 + index * 0.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: index * 0.3
              },
              rotate: { 
                duration: 8 + index * 2, 
                repeat: Infinity, 
                ease: "linear",
                delay: index * 0.5
              }
            }}
            className="absolute text-2xl"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index % 3) * 20}%`,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm mb-6"
          >
            <span>💪</span>
            <span>Habilidades Técnicas</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            Mi arsenal de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              tecnologías
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas y frameworks que domino para crear soluciones de datos impactantes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Fondo gradient que aparece en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icono y título */}
                <div className="relative z-10 space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl mb-2"
                  >
                    {category.icon}
                  </motion.div>
                  
                  <h3 className="text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  {/* Barra de nivel */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Nivel</span>
                      <span className="text-sm font-medium text-blue-600">{category.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${category.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                        className={`h-2 bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                  
                  {/* Lista de skills */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        • {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Elemento decorativo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br ${category.color} rounded-full opacity-20`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}