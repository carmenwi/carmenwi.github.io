import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github, Star } from 'lucide-react';
import { GridBackground } from './GridBackground';

const projects = [
  {
    id: 1,
    title: 'Predictor de Ventas IA',
    subtitle: 'Machine Learning • Time Series',
    description: 'Sistema predictivo que aumentó la precisión de pronósticos en un 34% usando Random Forest y técnicas avanzadas de series temporales.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    gradient: 'from-blue-500 to-blue-700',
    featured: true,
    metrics: { accuracy: '94%', improvement: '+34%' },
    icon: '📈'
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    subtitle: 'Data Visualization • Real-time',
    description: 'Plataforma interactiva que centraliza KPIs empresariales con actualizaciones en tiempo real.',
    tech: ['Plotly', 'PostgreSQL', 'Docker', 'FastAPI'],
    gradient: 'from-purple-500 to-blue-600',
    featured: false,
    metrics: { users: '500+', uptime: '99.9%' },
    icon: '📊'
  },
  {
    id: 3,
    title: 'Análisis de Sentimientos',
    subtitle: 'NLP • Deep Learning',
    description: 'Motor de procesamiento de texto que analiza sentimientos con 89% de precisión usando BERT.',
    tech: ['TensorFlow', 'BERT', 'Python', 'FastAPI'],
    gradient: 'from-green-500 to-blue-600',
    featured: true,
    metrics: { accuracy: '89%', speed: '0.2s' },
    icon: '💭'
  },
  {
    id: 4,
    title: 'Sistema Anti-fraude',
    subtitle: 'Anomaly Detection • ML',
    description: 'Detector de anomalías que redujo fraudes en 67% usando isolation forest y clustering.',
    tech: ['Scikit-learn', 'Kafka', 'MLflow', 'Redis'],
    gradient: 'from-red-500 to-blue-600',
    featured: false,
    metrics: { reduction: '67%', alerts: '24/7' },
    icon: '🔍'
  },
  {
    id: 5,
    title: 'Motor de Recomendaciones',
    subtitle: 'Recommendation Systems',
    description: 'Sistema híbrido que incrementó engagement en 45% combinando múltiples algoritmos.',
    tech: ['Surprise', 'Redis', 'Kubernetes', 'Python'],
    gradient: 'from-orange-500 to-blue-600',
    featured: false,
    metrics: { engagement: '+45%', response: '<100ms' },
    icon: '🎯'
  },
  {
    id: 6,
    title: 'Pipeline ETL Cloud',
    subtitle: 'Data Engineering • MLOps',
    description: 'Infraestructura automatizada que procesa 10M+ registros diarios con monitoreo integrado.',
    tech: ['Airflow', 'AWS', 'Terraform', 'Docker'],
    gradient: 'from-teal-500 to-blue-600',
    featured: true,
    metrics: { records: '10M+', reliability: '99.8%' },
    icon: '⚙️'
  }
];

export function Projects() {
  return (
    <section className="py-24 relative bg-white overflow-hidden">
      <GridBackground variant="diagonal" intensity="light" />
      
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
            <Star className="w-4 h-4" />
            <span>Proyectos Destacados</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">
            Soluciones que{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              generan impacto
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proyectos reales que demuestran cómo transformo datos complejos en valor empresarial tangible
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Proyecto destacado principal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-blue-100 hover:border-blue-200 transition-all duration-300">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="text-2xl"
                      >
                        {projects[0].icon}
                      </motion.div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs uppercase tracking-wider">
                        Proyecto Destacado
                      </span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl text-gray-900">
                      {projects[0].title}
                    </h3>
                    
                    <p className="text-lg text-blue-600">
                      {projects[0].subtitle}
                    </p>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    {projects[0].description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {projects[0].tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{projects[0].metrics.accuracy}</div>
                        <div className="text-xs text-gray-600">Precisión</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{projects[0].metrics.improvement}</div>
                        <div className="text-xs text-gray-600">Mejora</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="flex items-center gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/80 hover:bg-white rounded-2xl transition-colors duration-200 shadow-lg"
                    >
                      <Github className="w-5 h-5 text-gray-700" />
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/25"
                    >
                      <span>Ver proyecto</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Elemento decorativo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Resto de proyectos en grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(1).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="text-2xl"
                      >
                        {project.icon}
                      </motion.div>
                      {project.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>📊</span>
                        <span>{Object.values(project.metrics)[0]}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.a
                          href="#"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                        >
                          <Github className="w-4 h-4 text-gray-600" />
                        </motion.a>
                        <motion.a
                          href="#"
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-600" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Línea decorativa gradient */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient} rounded-b-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}