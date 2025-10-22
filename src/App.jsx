import React, { useState, useEffect } from 'react';
import { Home, Building2, MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Search, Bed, Bath, Maximize, DollarSign, ChevronLeft, ChevronRight, Star, Menu, X, Filter, Heart, Share2, Calendar } from 'lucide-react';

// Mock Data
const PROPERTIES = [
  {
    id: 1,
    title: "Departamento Moderno en Palermo",
    type: "Departamento",
    price: 285000,
    location: "Palermo, CABA",
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800", "https://images.unsplash.com/photo-1502672260066-6bc35f0a1e4e?w=800"],
    description: "Hermoso departamento a estrenar con excelente iluminación natural y vistas panorámicas.",
    featured: true,
    status: "Venta",
    coordinates: { lat: -34.5875, lng: -58.4205 }
  },
  {
    id: 2,
    title: "Casa Quinta en Nordelta",
    type: "Casa",
    price: 620000,
    location: "Nordelta, Buenos Aires",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    description: "Espectacular casa quinta con jardín, piscina y seguridad 24hs en barrio cerrado.",
    featured: true,
    status: "Venta",
    coordinates: { lat: -34.4133, lng: -58.6456 }
  },
  {
    id: 3,
    title: "Loft Industrial en Colegiales",
    type: "Loft",
    price: 195000,
    location: "Colegiales, CABA",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    images: ["https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800"],
    description: "Loft de diseño con techos altos y estilo industrial moderno.",
    featured: false,
    status: "Venta",
    coordinates: { lat: -34.5731, lng: -58.4469 }
  },
  {
    id: 4,
    title: "Oficina Corporativa Puerto Madero",
    type: "Oficina",
    price: 450000,
    location: "Puerto Madero, CABA",
    bedrooms: 0,
    bathrooms: 2,
    area: 180,
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    description: "Oficina premium con vistas al río, ideal para empresas de tecnología.",
    featured: true,
    status: "Alquiler",
    coordinates: { lat: -34.6131, lng: -58.3628 }
  },
  {
    id: 5,
    title: "Penthouse Recoleta",
    type: "Penthouse",
    price: 890000,
    location: "Recoleta, CABA",
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
    description: "Exclusivo penthouse con terraza privada y amenities de lujo.",
    featured: true,
    status: "Venta",
    coordinates: { lat: -34.5875, lng: -58.3928 }
  },
  {
    id: 6,
    title: "Departamento Luminoso en Belgrano",
    type: "Departamento",
    price: 310000,
    location: "Belgrano, CABA",
    bedrooms: 3,
    bathrooms: 2,
    area: 95,
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    description: "Amplio departamento con balcón, cocina moderna y excelente ubicación.",
    featured: false,
    status: "Venta",
    coordinates: { lat: -34.5631, lng: -58.4558 }
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "María González",
    role: "Compradora",
    text: "Excelente atención y profesionalismo. Encontré mi departamento ideal gracias a JFG Props. El proceso fue transparente y rápido.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Inversor",
    text: "La mejor decisión fue confiar en JFG Props para mi inversión inmobiliaria. Muy recomendables.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200"
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Vendedora",
    text: "Vendí mi propiedad en tiempo récord. El equipo es muy profesional y me mantuvieron informada en todo momento.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"
  }
];

// Utility Functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(price);
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (page, property = null) => {
    setCurrentPage(page);
    setSelectedProperty(property);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage} 
        navigate={navigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      {currentPage === 'home' && <HomePage navigate={navigate} />}
      {currentPage === 'properties' && <PropertiesPage navigate={navigate} />}
      {currentPage === 'property' && selectedProperty && (
        <PropertyDetailPage property={selectedProperty} navigate={navigate} />
      )}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'blog' && <BlogPage />}
      
      <Footer navigate={navigate} />
    </div>
  );
}

// Navbar Component
function Navbar({ currentPage, navigate, mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'properties', label: 'Propiedades' },
    { id: 'about', label: 'Nosotros' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-4' : 'bg-white/95 backdrop-blur-sm py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <Building2 className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-2xl font-bold text-gray-900">JFG Props</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => navigate('contact')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contactar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Home Page
function HomePage({ navigate }) {
  return (
    <div>
      <Hero navigate={navigate} />
      <QuickSearch navigate={navigate} />
      <Stats />
      <FeaturedProperties navigate={navigate} />
      <TestimonialCarousel />
      <CTASection navigate={navigate} />
    </div>
  );
}

// Hero Section
function Hero({ navigate }) {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Encuentra tu hogar perfecto
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Más de 15 años ayudando a familias a encontrar el lugar de sus sueños
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('properties')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium text-lg"
              >
                Ver Propiedades
              </button>
              <button 
                onClick={() => navigate('contact')}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-medium text-lg"
              >
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Search
function QuickSearch({ navigate }) {
  const [searchType, setSearchType] = useState('Venta');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div className="relative -mt-20 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex gap-4 mb-6">
            {['Venta', 'Alquiler'].map(type => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  searchType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tipo de propiedad</option>
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
              <option value="Loft">Loft</option>
              <option value="Oficina">Oficina</option>
              <option value="Penthouse">Penthouse</option>
            </select>
            
            <input
              type="text"
              placeholder="Ubicación"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <button 
              onClick={() => navigate('properties')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Search className="h-5 w-5" />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Section
function Stats() {
  const stats = [
    { value: '500+', label: 'Propiedades' },
    { value: '1,200+', label: 'Clientes Felices' },
    { value: '15+', label: 'Años de Experiencia' },
    { value: '98%', label: 'Satisfacción' }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-blue-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Featured Properties
function FeaturedProperties({ navigate }) {
  const featured = PROPERTIES.filter(p => p.featured).slice(0, 3);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Propiedades Destacadas
          </h2>
          <p className="text-xl text-gray-600">
            Descubre nuestras mejores opciones disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              navigate={navigate}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('properties')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Ver Todas las Propiedades
          </button>
        </div>
      </div>
    </div>
  );
}

// Property Card
function PropertyCard({ property, navigate }) {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
      onClick={() => navigate('property', property)}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[imageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {property.status}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
            <Share2 className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-500">{property.type}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Bed className="h-5 w-5 mr-1" />
            <span className="text-sm">{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-1" />
            <span className="text-sm">{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-5 w-5 mr-1" />
            <span className="text-sm">{property.area}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Testimonials Carousel
function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600">
            Miles de familias confían en nosotros
          </p>
        </div>

        <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <img
              src={TESTIMONIALS[current].image}
              alt={TESTIMONIALS[current].name}
              className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
            />
            
            <div className="flex justify-center mb-4">
              {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            <p className="text-xl text-gray-700 mb-6 italic">
              "{TESTIMONIALS[current].text}"
            </p>

            <div className="font-bold text-gray-900">{TESTIMONIALS[current].name}</div>
            <div className="text-gray-500">{TESTIMONIALS[current].role}</div>
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// CTA Section
function CTASection({ navigate }) {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para encontrar tu próxima propiedad?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Nuestro equipo de expertos está listo para ayudarte en cada paso del camino
        </p>
        <button 
          onClick={() => navigate('contact')}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-medium text-lg"
        >
          Contactar Ahora
        </button>
      </div>
    </div>
  );
}

// Properties Page
function PropertiesPage({ navigate }) {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = PROPERTIES.filter(property => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) return false;
    if (filters.status && property.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todas las Propiedades
          </h1>
          <p className="text-xl text-gray-600">
            {filteredProperties.length} propiedades disponibles
          </p>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-6 md:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Filter className="h-5 w-5" />
          Filtros
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-bold mb-4">Filtros</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Loft">Loft</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dormitorios mínimos
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio mínimo (USD)
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio máximo (USD)
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    placeholder="1,000,000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => setFilters({type: '', minPrice: '', maxPrice: '', bedrooms: '', status: ''})}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    navigate={navigate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">
                  No se encontraron propiedades con estos filtros
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Property Detail Page
function PropertyDetailPage({ property, navigate }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hola, estoy interesado en ${property.title}`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-500">
          <button onClick={() => navigate('home')} className="hover:text-blue-600">Inicio</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('properties')} className="hover:text-blue-600">Propiedades</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-96">
                <img
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((currentImage - 1 + property.images.length) % property.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImage((currentImage + 1) % property.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              {property.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === idx ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {property.status}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{property.type}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-gray-200">
                <div className="text-center">
                  <Bed className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-500">Dormitorios</div>
                </div>
                <div className="text-center">
                  <Bath className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-500">Baños</div>
                </div>
                <div className="text-center">
                  <Maximize className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-500">m²</div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Características</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Cocina equipada
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Calefacción central
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Aire acondicionado
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    Seguridad 24hs
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Mapa interactivo</p>
                  <p className="text-sm text-gray-400">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contactar al vendedor
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Enviar Mensaje
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mb-3">
                  <Phone className="h-5 w-5" />
                  Llamar Ahora
                </button>
                <button className="w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                  <Calendar className="h-5 w-5" />
                  Agendar Visita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sobre JFG Props
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 15 años conectando personas con sus hogares ideales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800"
              alt="Oficina"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Fundada en 2009, JFG Props nació con la visión de revolucionar el mercado inmobiliario 
              argentino, brindando un servicio personalizado y transparente a cada uno de nuestros clientes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Con más de 1,200 familias satisfechas y un portafolio de más de 500 propiedades, 
              nos hemos consolidado como una de las inmobiliarias más confiables de la región.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nuestro equipo de profesionales altamente capacitados trabaja incansablemente para 
              asegurar que cada transacción sea exitosa y cada cliente encuentre exactamente lo que busca.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-white mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excelencia</h3>
              <p className="text-blue-100">
                Compromiso con la calidad en cada detalle
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Confianza</h3>
              <p className="text-blue-100">
                Transparencia y honestidad en todas nuestras operaciones
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovación</h3>
              <p className="text-blue-100">
                Tecnología de punta para mejor experiencia
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestro Equipo</h2>
          <p className="text-xl text-gray-600 mb-12">
            Profesionales comprometidos con tu satisfacción
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Julia Fernández", role: "Directora General", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
              { name: "Franco García", role: "Gerente Comercial", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
              { name: "Gabriela Torres", role: "Asesora Senior", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Page
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Gracias por contactarnos. Te responderemos pronto.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600">
            Estamos aquí para ayudarte a encontrar tu propiedad ideal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="compra">Quiero comprar</option>
                  <option value="venta">Quiero vender</option>
                  <option value="alquiler">Busco alquilar</option>
                  <option value="tasacion">Solicitar tasación</option>
                  <option value="info">Información general</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-blue-100">Av. Santa Fe 1234, Piso 5<br />Palermo, CABA, Argentina</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <p className="text-blue-100">+54 11 4567-8900</p>
                    <p className="text-blue-100">+54 11 15-9876-5432</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-blue-100">info@jfgprops.com</p>
                    <p className="text-blue-100">ventas@jfgprops.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Horarios de Atención</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Lunes - Viernes</span>
                  <span>9:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sábados</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog Page
function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Consejos para Compradores Primerizos",
      excerpt: "Guía completa para quienes buscan comprar su primera propiedad en Argentina.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      date: "15 de Octubre, 2025",
      category: "Consejos",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Tendencias del Mercado Inmobiliario 2025",
      excerpt: "Análisis de las principales tendencias que están moldeando el mercado actual.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      date: "10 de Octubre, 2025",
      category: "Mercado",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Cómo Preparar tu Propiedad para la Venta",
      excerpt: "Tips esenciales para maximizar el valor de tu propiedad antes de venderla.",
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800",
      date: "5 de Octubre, 2025",
      category: "Ventas",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Inversión Inmobiliaria: Guía para Principiantes",
      excerpt: "Todo lo que necesitas saber para comenzar a invertir en propiedades.",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800",
      date: "1 de Octubre, 2025",
      category: "Inversión",
      readTime: "10 min"
    },
    {
      id: 5,
      title: "Barrios Emergentes en Buenos Aires",
      excerpt: "Descubre las zonas con mayor potencial de crecimiento en la ciudad.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      date: "25 de Septiembre, 2025",
      category: "Ubicación",
      readTime: "7 min"
    },
    {
      id: 6,
      title: "Financiamiento: Créditos Hipotecarios Explicados",
      excerpt: "Guía completa sobre opciones de financiamiento para tu próxima propiedad.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
      date: "20 de Septiembre, 2025",
      category: "Finanzas",
      readTime: "9 min"
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog & Noticias
          </h1>
          <p className="text-xl text-gray-600">
            Consejos, tendencias y novedades del mundo inmobiliario
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover"
              />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                  Destacado
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>{blogPosts[0].date}</span>
                  <span>{blogPosts[0].readTime} de lectura</span>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-fit">
                  Leer Más
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map(post => (
            <article 
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Suscríbete a Nuestro Newsletter
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Recibe las últimas noticias, consejos y propiedades destacadas directamente en tu email
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer({ navigate }) {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">JFG Props</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tu socio confiable en el mercado inmobiliario desde 2009.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-blue-700 p-2 rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('home')} className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => navigate('properties')} className="text-gray-400 hover:text-white transition-colors">
                  Propiedades
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => navigate('blog')} className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="text-gray-400 hover:text-white transition-colors">
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Compra de Propiedades</li>
              <li className="hover:text-white transition-colors cursor-pointer">Venta de Propiedades</li>
              <li className="hover:text-white transition-colors cursor-pointer">Alquiler</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tasaciones</li>
              <li className="hover:text-white transition-colors cursor-pointer">Asesoramiento</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Av. Santa Fe 1234, Piso 5<br />Palermo, CABA</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+54 11 4567-8900</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@jfgprops.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 JFG Props. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
