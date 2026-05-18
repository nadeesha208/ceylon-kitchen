/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  UtensilsCrossed, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight, 
  Award, 
  Info,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Phone,
  Flame,
  Leaf
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  category: "Sri Lankan" | "Asian";
  tags?: string[];
}

interface Spice {
  id: number;
  name: string;
  description: string;
  image: string;
}

// --- Constants & Data ---
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Classic Chicken Kottu",
    description: "Finely chopped parata bread stir-fried with tender chicken, fresh vegetables, eggs, and authentic Ceylon spices.",
    price: "€12.50",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=800",
    category: "Sri Lankan",
    tags: ["Signature", "Spicy"]
  },
  {
    id: 2,
    name: "Cheese & Omelet Kottu",
    description: "A rich and creamy twist on the classic kottu, featuring a velvety cheese sauce and soft omelet layers.",
    price: "€13.50",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800",
    category: "Sri Lankan",
    tags: ["Vegetarian Option", "Popular"]
  },
  {
    id: 3,
    name: "Egg Parata with Dhal",
    description: "Multi-layered flaky parata served with a comforting bowl of slow-cooked red lentil curry.",
    price: "€8.00",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    category: "Sri Lankan"
  },
  {
    id: 4,
    name: "Ceylon Rice & Curry Set",
    description: "The ultimate Lankan meal. Steamed rice served with 5 seasonal vegetable curries, dhal, and papadum.",
    price: "€14.00",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1542367592-884976073ef4?auto=format&fit=crop&q=80&w=800",
    category: "Sri Lankan",
    tags: ["Authentic"]
  },
  {
    id: 5,
    name: "Crispy Spring Rolls",
    description: "Hand-rolled golden pastry filled with seasoned garden vegetables and Asian aromatics.",
    price: "€6.50",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800",
    category: "Asian"
  },
  {
    id: 6,
    name: "Asian Special Fried Rice",
    description: "Wok-fired rice with a medley of meats, vegetables, and house-made soy-ginger glaze.",
    price: "€11.50",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800",
    category: "Asian"
  }
];

const SPICES: Spice[] = [
  {
    id: 1,
    name: "Ceylon Cinnamon",
    description: "Known as 'True Cinnamon', it possesses a delicate, sweet flavor with woody notes. Sourced directly from our family plantations in Sri Lanka.",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "Green Cardamom",
    description: "The 'Queen of Spices'. These aromatic pods provide an intense, citrusy floral note that elevates our rice and meat dishes.",
    image: "https://images.unsplash.com/photo-1626132646529-5006375bc163?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Lankan Cloves",
    description: "Strong and pungent with a warm, numbing sweetness. Essential for the deep complex flavors of our black curries.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Black Gold Pepper",
    description: "Piped from the hills of Kandy, Sri Lankan black pepper is famous for its high piperine content and robust heat.",
    image: "https://images.unsplash.com/photo-1511202473859-99f655cc2817?auto=format&fit=crop&q=80&w=600"
  }
];

// --- Components ---

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={14} 
          className={i < Math.floor(rating) ? "fill-gold text-gold" : "text-gray-600"} 
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">({rating})</span>
    </div>
  );
};

const SectionTitle = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="mb-12 text-center md:text-left">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-gold uppercase tracking-[0.3em] text-xs font-semibold block mb-2"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl lg:text-6xl font-serif text-paper"
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Sri Lankan" | "Asian">("Sri Lankan");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredMenu = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-luxury-black">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-luxury-black/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Flame className="text-gold" size={28} />
            <span className="text-2xl font-serif luxury-text-gradient tracking-tight">CEYLON KITCHEN</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#menu" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">The Menu</a>
            <a href="#spices" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Our Spices</a>
            <a href="#about" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Our Story</a>
            <a 
              href="https://foody.com.cy" 
              target="_blank" 
              className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-luxury-black transition-all rounded-full text-xs uppercase tracking-widest font-semibold"
            >
              Order on Foody
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-paper">
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] bg-luxury-black p-10 flex flex-col items-center justify-center text-center gap-8"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8">
              <X size={32} />
            </button>
            <a href="#menu" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">The Menu</a>
            <a href="#spices" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">Our Spices</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif">Our Story</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-serif font-bold text-gold">Order Now</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542367592-884976073ef4?auto=format&fit=crop&q=80&w=2000" 
            alt="Sri Lankan Feast"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-sm font-semibold mb-6 block">Refined Sri Lankan Cuisine</span>
            <h1 className="text-6xl md:text-8xl lg:text-[120px] leading-[0.9] font-serif mb-8 italic">
              Taste of <br />
              <span className="not-italic luxury-text-gradient">Ceylon</span>
            </h1>
            <p className="text-lg md:text-xl text-paper/70 max-w-2xl mx-auto mb-10 font-light">
              Experience the soul of Sri Lanka in Larnaca. Prepared with 20+ years of culinary tradition and authentic spices.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href="#menu" 
                className="group relative px-10 py-4 bg-gold text-luxury-black font-bold uppercase tracking-widest overflow-hidden rounded-sm"
              >
                <span className="relative z-10 flex items-center gap-2">View Menu <ChevronRight size={18} /></span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
              <div className="flex items-center gap-6">
                 <div className="flex flex-col items-start">
                   <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Open Daily</span>
                   <span className="text-sm font-light">6:00 PM — 10:00 PM</span>
                 </div>
                 <div className="h-8 w-px bg-white/20" />
                 <div className="flex flex-col items-start">
                   <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Larnaca</span>
                   <span className="text-sm font-light">Cyprus</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-px h-20 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Expertise & Story */}
      <section id="about" className="py-24 bg-luxury-gray">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
              alt="Chef at work"
              className="rounded-2xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-[80px]" />
            <div className="absolute top-10 left-10 p-6 glass-card rounded-xl z-20">
              <Award className="text-gold mb-2" size={32} />
              <div className="text-3xl font-serif">20+ Years</div>
              <div className="text-[10px] uppercase tracking-wider opacity-60">Culinary Expertise</div>
            </div>
          </motion.div>

          <div>
            <SectionTitle subtitle="Our Heritage" title="A Legacy in Every Grain." />
            <p className="text-paper/60 leading-loose mb-8 text-lg font-light italic">
              "Cooking is not just about feed, it's about feeling. Growing up in the heart of the Spice Island, I learned that a great meal starts with the snap of a cinnamon stick and the roar of a hot wok."
            </p>
            <p className="text-paper/50 leading-loose mb-10">
              With over two decades of experience in the food industry across Asia and now Cyprus, our owner brings the uncompromised flavors of Colombo and Kandy to Larnaca. We don't adapt our food to fit the world; we bring the world to our kitchen.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Leaf className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-lg">100% Raw</h4>
                  <p className="text-xs opacity-50">Natural Ingredients</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Flame className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-serif text-lg">Daily Fresh</h4>
                  <p className="text-xs opacity-50">Cooked to Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="Selection" title="The Culinary Journal." />
        
        <div className="flex justify-center md:justify-start gap-4 mb-12">
          {(["Sri Lankan", "Asian"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all border ${activeTab === cat ? "bg-gold text-luxury-black border-gold" : "bg-transparent text-paper border-white/20 hover:border-gold"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group glass-card rounded-3xl overflow-hidden hover:border-gold/50 transition-colors"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-luxury-black/60 backdrop-blur-md text-[10px] uppercase tracking-tighter text-gold rounded-full border border-gold/20 leading-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif text-paper leading-tight">{item.name}</h3>
                    <span className="text-gold font-bold">{item.price}</span>
                  </div>
                  <StarRating rating={item.rating} />
                  <p className="mt-4 text-paper/50 text-sm leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Spices Showcase */}
      <section id="spices" className="py-24 bg-luxury-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="Our Secret" title="The Soul of Ceylon." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SPICES.map((spice, idx) => (
              <motion.div
                key={spice.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-6"
              >
                <div className="aspect-square rounded-2xl overflow-hidden group">
                  <img 
                    src={spice.image} 
                    alt={spice.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-gold mb-3 flex items-center gap-2">
                    <span className="text-xs opacity-30">0{spice.id}</span>
                    {spice.name}
                  </h4>
                  <p className="text-sm text-paper/50 leading-relaxed font-light">
                    {spice.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-luxury-black border-t border-white/10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Flame className="text-gold" size={28} />
              <span className="text-3xl font-serif luxury-text-gradient tracking-tight">CEYLON KITCHEN</span>
            </div>
            <p className="text-paper/40 max-w-sm mb-8 font-light leading-loose">
              Bringing the authentic heat and aromatic heritage of Sri Lanka to the shores of Larnaca. Every plate tells a story of 20 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-luxury-black transition-all">
                <Leaf size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-luxury-black transition-all">
                <UtensilsCrossed size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-8">Visit Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0" size={20} />
                <span className="text-sm opacity-60 font-light">Larnaca City Center,<br />Cyprus</span>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="text-gold shrink-0" size={20} />
                <span className="text-sm opacity-60 font-light">6:00 PM — 10:00 PM<br />Open Daily (CY Time)</span>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h4 className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-8">Order Online</h4>
            <a 
              href="https://foody.com.cy" 
              className="flex items-center justify-between p-4 glass-card rounded-2xl group hover:border-gold transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold">f.</div>
                <div>
                  <div className="text-sm font-semibold">Foody App</div>
                  <div className="text-[10px] opacity-50 uppercase tracking-widest">Order Now</div>
                </div>
              </div>
              <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <div className="mt-6 flex items-center gap-4 text-paper/40">
              <Phone size={18} />
              <span className="text-sm">+357 00 000000</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-xs tracking-widest uppercase">&copy; 2026 Ceylon Kitchen Larnaca. All Rights Reserved.</p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Sustainability</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
