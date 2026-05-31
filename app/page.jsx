'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Sweets', 'Hot', 'Pickles', 'Karampodi'];

const getWeight = (category, sub_category) => {
  if (category === 'Sweets')     return '200g';
  if (category === 'Hot')        return '200g';
  if (category === 'Karampodi')  return '250g';
  if (category === 'Pickles')    return sub_category === 'Non-Veg' ? '650g' : '150g';
  return '';
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { cart, setCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const getQty = (id) => cart.find((item) => item.id === id)?.quantity ?? 0;

  const increase = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const filtered = products.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>🌶️ Konaseema Snacks</h1>
        <p>Authentic home-made snacks, sweets &amp; pickles from the heart of Andhra Pradesh — delivered to your door.</p>
      </div>

      <div className="container py-4">
        {/* Search + Filter Row */}
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              placeholder="Search snacks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="cat-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-pill ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-muted mb-3" style={{ fontSize: '0.87rem' }}>
          Showing <strong>{filtered.length}</strong> {category !== 'All' ? category : ''} item{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <div className="row g-3">
          {filtered.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="product-card">
                <div className="product-card-img-wrap">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                  />
                  <div className="product-img-badges">
                    <span className={`cat-badge cat-${product.category}`}>
                      {product.category}
                    </span>
                    {product.sub_category === 'Non-Veg' && (
                      <span className="subcategory-nonveg">Non-Veg</span>
                    )}
                  </div>
                </div>
                <div className="product-card-body">
                  <div className="product-name-row">
                    <span className={`veg-symbol ${product.sub_category === 'Non-Veg' ? 'non-veg' : 'veg'}`}>
                      <span className="veg-dot" />
                    </span>
                    <h6 className="product-name">{product.name}</h6>
                  </div>

                  {product.description && (
                    <p className="product-desc">{product.description}</p>
                  )}

                  <div className="product-footer">
                    <div>
                      <span className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
                      <span className="product-weight-tag">{getWeight(product.category, product.sub_category)}</span>
                    </div>
                    {getQty(product.id) === 0 ? (
                      <button className="btn-add-cart" onClick={() => increase({ ...product, weight: getWeight(product.category, product.sub_category) })}>
                        + Add
                      </button>
                    ) : (
                      <div className="qty-stepper">
                        <button className="qty-step-btn" onClick={() => decrease(product.id)}>−</button>
                        <span className="qty-step-val">{getQty(product.id)}</span>
                        <button className="qty-step-btn" onClick={() => increase({ ...product, weight: getWeight(product.category, product.sub_category) })}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-5">
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <p className="text-muted mt-2">No products found for "<strong>{search}</strong>"</p>
          </div>
        )}
      </div>

      {/* Our Story Section */}
      <section className="our-story-section">
        <div className="our-story-inner">
          <div className="our-story-header">
            <span className="our-story-leaf">🌴</span>
            <h2 className="our-story-title">మా కథ – కొనసీమ రుచుల ప్రయాణం</h2>
            <span className="our-story-leaf">🌴</span>
          </div>

          <div className="our-story-body">
            <p>
              ఆంధ్రప్రదేశ్ హృదయంలో ఉన్న అందమైన Konaseema నేలలో పుట్టిన సంప్రదాయ రుచులను
              ప్రతి ఇంటికీ తీసుకెళ్లాలనే ఆలోచనతో మా ప్రయాణం ప్రారంభమైంది. చిన్నప్పటి నుండి
              అమ్మమ్మ చేతి అరిసెలు, గవ్వలు, చెక్కిలాలు, పొంగణాలు వంటి స్నాక్స్ మనకు ఇచ్చిన
              ఆ ఇంటి వాసన, ఆ ప్రేమ… అదే అనుభూతిని మళ్లీ అందరికీ చేరవేయాలనేది మా లక్ష్యం.
            </p>
            <p>
              మా దగ్గర తయారయ్యే ప్రతి స్నాక్‌లో స్వచ్ఛమైన పదార్థాలు, సంప్రదాయ విధానం, మరియు
              ఇంటి రుచికి దగ్గరైన ప్రేమ కలిసుంటాయి. ప్రతి ముద్దలో కొనసీమ సంస్కృతి, ప్రతి
              రుచిలో ఆత్మీయత ఉంటుంది.
            </p>
            <p>
              ఇది కేవలం స్నాక్స్ అమ్మే వ్యాపారం కాదు…<br />
              మన ఊరి జ్ఞాపకాలను, పండుగల ఆనందాన్ని, అమ్మ చేతి రుచిని మళ్లీ మీ ముందుకు
              తీసుకురావాలనే చిన్న ప్రయత్నం.
            </p>

            <blockquote className="our-story-quote">
              "ఒక్కసారి రుచి చూస్తే… కొనసీమ మీ హృదయంలో నిలిచిపోతుంది." 🌿
            </blockquote>
          </div>

          <div className="our-story-proprietor">
            <div className="proprietor-avatar">S</div>
            <div>
              <div className="proprietor-name">Santhosh</div>
              <div className="proprietor-role">Proprietor, Konaseema Snacks</div>
              <a href="tel:+917731911229" className="proprietor-phone">📞 +91 77319 11229</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
