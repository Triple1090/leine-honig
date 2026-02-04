'use client';

export default function ProductList() {
  const products = [
    { name: 'Frühtracht', size: '500g', price: '7,00 €', desc: 'Cremig & mild' },
    { name: 'Sommertracht', size: '500g', price: '7,00 €', desc: 'Kräftig & aromatisch' },
    { name: 'Waldblüte', size: '500g', price: '8,00 €', desc: 'Dunkel & würzig' },
  ];

  return (
    <section id="sorten" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Überschrift */}
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
            Aus der Region Neustadt
          </h2>
          <h3 className="text-3xl font-extrabold text-stone-800">
            Unsere Sorten
          </h3>
        </div>

        {/* Die Liste */}
        <div className="grid gap-4">
          {products.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-center bg-stone-50 p-6 rounded-2xl hover:shadow-md hover:border-primary/30 border border-transparent transition-all">
              
              {/* Linke Seite: Name & Beschreibung */}
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="text-xl font-bold text-stone-800">{item.name}</h4>
                <p className="text-stone-500 text-sm">{item.desc}</p>
              </div>

              {/* Rechte Seite: Preis & Button */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="block text-xs text-stone-400 font-mono">{item.size}</span>
                  <span className="block text-lg font-bold text-primary-dark">{item.price}</span>
                </div>
                {/* Kleiner Plus-Button (Deko) */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  +
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}