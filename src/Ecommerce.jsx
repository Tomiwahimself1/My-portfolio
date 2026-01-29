import React, { useState } from 'react';
import { ShoppingCart, User, Search, Heart, Menu, X, Package, DollarSign, Users, TrendingUp, Trash2, Plus, Minus, LogOut, Settings, BarChart3, Star, Filter, ArrowLeft, Check, Truck, AlertCircle, CreditCard } from 'lucide-react';

export default function EcommercePlatform() {
  const [view, setView] = useState('store');
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notifs, setNotifs] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', card: '', exp: '', cvv: '' });

  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, cat: 'Electronics', img: '🎧', rating: 4.5, stock: 15, desc: 'Premium noise-canceling headphones with 30-hour battery', reviews: 128, sold: 450 },
    { id: 2, name: 'Smart Watch', price: 199.99, cat: 'Electronics', img: '⌚', rating: 4.8, stock: 8, desc: 'Fitness tracking smartwatch with heart rate monitor', reviews: 256, sold: 890 },
    { id: 3, name: 'Laptop Backpack', price: 49.99, cat: 'Accessories', img: '🎒', rating: 4.3, stock: 25, desc: 'Water-resistant laptop backpack with USB port', reviews: 89, sold: 320 },
    { id: 4, name: 'Coffee Maker', price: 89.99, cat: 'Home', img: '☕', rating: 4.6, stock: 12, desc: 'Programmable coffee maker with thermal carafe', reviews: 167, sold: 540 },
    { id: 5, name: 'Running Shoes', price: 129.99, cat: 'Fashion', img: '👟', rating: 4.7, stock: 20, desc: 'Lightweight running shoes with advanced cushioning', reviews: 203, sold: 670 },
    { id: 6, name: 'Desk Lamp', price: 34.99, cat: 'Home', img: '💡', rating: 4.4, stock: 30, desc: 'LED adjustable desk lamp with multiple brightness', reviews: 145, sold: 480 },
    { id: 7, name: 'Bluetooth Speaker', price: 59.99, cat: 'Electronics', img: '🔊', rating: 4.5, stock: 18, desc: 'Portable waterproof Bluetooth speaker', reviews: 192, sold: 720 },
    { id: 8, name: 'Yoga Mat', price: 29.99, cat: 'Sports', img: '🧘', rating: 4.2, stock: 40, desc: 'Non-slip eco-friendly yoga mat with strap', reviews: 98, sold: 380 }
  ]);

  const stats = { revenue: 45678.90, orderCount: 234, customers: 156, avg: 195.20 };
  const notify = (msg, type = 'success') => {
    const id = Date.now();
    setNotifs(p => [...p, { id, msg, type }]);
    setTimeout(() => setNotifs(p => p.filter(n => n.id !== id)), 3000);
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || p.cat === category));
  const cats = ['all', ...new Set(products.map(p => p.cat))];
  const addCart = p => {
    const exist = cart.find(i => i.id === p.id);
    if (exist) {
      if (exist.qty >= p.stock) { notify('Stock limit!', 'error'); return; }
      setCart(cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
    } else setCart([...cart, { ...p, qty: 1 }]);
    notify(`${p.name} added!`);
  };
  const removeCart = id => { setCart(cart.filter(i => i.id !== id)); notify('Removed'); };
  const updateQty = (id, qty) => {
    const p = products.find(pr => pr.id === id);
    if (qty > p.stock) { notify('Exceeds stock!', 'error'); return; }
    qty === 0 ? removeCart(id) : setCart(cart.map(i => i.id === id ? { ...i, qty } : i));
  };
  const toggleWish = p => {
    wishlist.some(i => i.id === p.id) ? (setWishlist(wishlist.filter(i => i.id !== p.id)), notify('Removed from wishlist')) : (setWishlist([...wishlist, p]), notify('Added to wishlist!'));
  };

  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const checkout = () => {
    if (!form.name || !form.email) { notify('Fill all fields!', 'error'); return; }
    setProducts(products.map(p => {
      const c = cart.find(i => i.id === p.id);
      return c ? { ...p, stock: p.stock - c.qty, sold: p.sold + c.qty } : p;
    }));
    setOrders([...orders, { id: `ORD${Date.now()}`, items: cart, total: total * 1.1, date: new Date().toISOString(), status: 'Processing', customer: form.name }]);
    setCart([]);
    setForm({ name: '', email: '', address: '', city: '', zip: '', card: '', exp: '', cvv: '' });
    notify('Order placed! 🎉');
    setView('orders');
  };

  const login = role => { setLoggedIn(true); setAdmin(role === 'admin'); setView(role === 'admin' ? 'admin' : 'store'); notify(`Welcome!`); };
  const logout = () => { setLoggedIn(false); setAdmin(false); setView('store'); notify('Logged out'); };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`@keyframes slide{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifs.map(n => (
          <div key={n.id} className={`px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${n.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white font-semibold`} style={{animation:'slide 0.3s'}}>
            {n.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span>{n.msg}</span>
          </div>
        ))}
      </div>

      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => setView('store')} className="text-2xl font-bold hover:scale-105 transition">🛒 ShopHub</button>
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => setView('store')}>Store</button>
              {loggedIn && <><button onClick={() => setView('orders')}>Orders</button><button onClick={() => setView('wishlist')} className="relative"><Heart size={20}/>{wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}</button></>}
              {admin && <button onClick={() => setView('admin')} className="flex items-center"><Settings size={18} className="mr-1"/>Admin</button>}
              <button onClick={() => setView('cart')} className="relative"><ShoppingCart size={24}/>{count > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">{count}</span>}</button>
              {loggedIn ? <button onClick={logout}><LogOut size={18}/></button> : <button onClick={() => setView('login')}><User size={18}/></button>}
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
          </div>
        </div>
      </nav>

      {view === 'store' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to ShopHub</h1>
          <p className="text-gray-600 mb-6">Discover amazing products 🎉</p>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1"><Search className="absolute left-3 top-3 text-gray-400" size={20}/><input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/></div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="px-4 py-3 border rounded-lg">{cats.map(c => <option key={c} value={c}>{c === 'all' ? 'All' : c}</option>)}</select>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-6"><h2 className="text-2xl font-bold">🎁 Free shipping over $50!</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition">
                <div onClick={() => setSelected(p)} className="text-7xl text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer">{p.img}</div>
                <div className="p-4">
                  <div className="flex justify-between mb-2"><h3 className="font-bold">{p.name}</h3><button onClick={() => toggleWish(p)} className={wishlist.some(i => i.id === p.id) ? 'text-red-500' : 'text-gray-400'}><Heart size={20} fill={wishlist.some(i => i.id === p.id) ? 'currentColor' : 'none'}/></button></div>
                  <p className="text-sm text-gray-600 mb-2">{p.desc}</p>
                  <div className="flex items-center mb-2"><Star size={16} className="text-yellow-500" fill="currentColor"/><span className="ml-1 text-sm">{p.rating}</span></div>
                  <div className="flex justify-between text-xs mb-3"><span className={p.stock < 10 ? 'text-red-500' : ''}>{p.stock} stock</span><span>{p.sold} sold</span></div>
                  <div className="flex justify-between items-center"><span className="text-2xl font-bold text-blue-600">${p.price}</span><button onClick={() => addCart(p)} disabled={p.stock === 0} className={`${p.stock === 0 ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600'} text-white px-4 py-2 rounded-lg`}>{p.stock === 0 ? 'Out' : 'Add'}</button></div>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
              <div className="bg-white rounded-2xl max-w-4xl w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between mb-6"><h2 className="text-3xl font-bold">{selected.name}</h2><button onClick={() => setSelected(null)}><X size={24}/></button></div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-9xl text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">{selected.img}</div>
                  <div>
                    <p className="text-gray-600 mb-6">{selected.desc}</p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center"><Star size={20} className="text-yellow-500 mr-2" fill="currentColor"/><span className="font-semibold">{selected.rating}</span></div>
                      <div className="flex items-center"><Package size={20} className="mr-3 text-blue-600"/><span>{selected.stock} available</span></div>
                      <div className="flex items-center"><Truck size={20} className="mr-3 text-purple-600"/><span>Free shipping over $50</span></div>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-6">${selected.price}</div>
                    <div className="flex gap-3">
                      <button onClick={() => {addCart(selected);setSelected(null)}} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold">Add to Cart</button>
                      <button onClick={() => toggleWish(selected)} className={`px-6 py-4 rounded-lg border-2 ${wishlist.some(i => i.id === selected.id) ? 'border-red-500 text-red-500' : 'border-gray-300'}`}><Heart size={24} fill={wishlist.some(i => i.id === selected.id) ? 'currentColor' : 'none'}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'cart' && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8"><button onClick={() => setView('store')} className="mr-4"><ArrowLeft size={24}/></button><h1 className="text-4xl font-bold">Cart</h1></div>
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg"><ShoppingCart size={64} className="mx-auto text-gray-400 mb-4"/><p className="text-xl mb-6">Cart is empty</p><button onClick={() => setView('store')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg">Shop Now</button></div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(i => (
                  <div key={i.id} className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                    <div className="text-6xl">{i.img}</div>
                    <div className="flex-1"><h3 className="font-bold">{i.name}</h3><p>${i.price}</p></div>
                    <div className="flex items-center space-x-2"><button onClick={() => updateQty(i.id, i.qty - 1)} className="bg-gray-200 p-2 rounded"><Minus size={16}/></button><span className="px-4">{i.qty}</span><button onClick={() => updateQty(i.id, i.qty + 1)} className="bg-gray-200 p-2 rounded"><Plus size={16}/></button></div>
                    <div className="font-bold text-xl text-blue-600">${(i.price * i.qty).toFixed(2)}</div>
                    <button onClick={() => removeCart(i.id)} className="text-red-500"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
              <div><div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold mb-4">Summary</h2><div className="space-y-3 mb-6"><div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div><div className="flex justify-between"><span>Shipping</span><span className="text-green-600">FREE</span></div><div className="flex justify-between"><span>Tax</span><span>${(total * 0.1).toFixed(2)}</span></div><div className="border-t pt-3 flex justify-between text-xl font-bold"><span>Total</span><span className="text-blue-600">${(total * 1.1).toFixed(2)}</span></div></div><button onClick={() => setView('checkout')} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold mb-3">Checkout</button><button onClick={() => setView('store')} className="w-full border-2 py-3 rounded-lg">Continue</button></div></div>
            </div>
          )}
        </div>
      )}

      {view === 'checkout' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8"><button onClick={() => setView('cart')} className="mr-4"><ArrowLeft size={24}/></button><h1 className="text-4xl font-bold">Checkout</h1></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold mb-4">Shipping</h2><div className="space-y-4"><input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border rounded-lg"/><input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border rounded-lg"/><input type="text" placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full px-4 py-3 border rounded-lg"/></div></div>
              <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold mb-4">Payment</h2><input type="text" placeholder="Card" value={form.card} onChange={e => setForm({...form, card: e.target.value})} className="w-full px-4 py-3 border rounded-lg"/></div>
            </div>
            <div><div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-2xl font-bold mb-4">Summary</h2><div className="mb-6">{cart.map(i => <div key={i.id} className="flex justify-between mb-2"><span>{i.name} x {i.qty}</span><span>${(i.price * i.qty).toFixed(2)}</span></div>)}</div><div className="border-t pt-4 mb-6"><div className="flex justify-between text-2xl font-bold"><span>Total</span><span className="text-blue-600">${(total * 1.1).toFixed(2)}</span></div></div><button onClick={checkout} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold">Place Order</button></div></div>
          </div>
        </div>
      )}

      {view === 'orders' && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl"><Package size={64} className="mx-auto text-gray-400 mb-4"/><p className="text-xl mb-6">No orders</p><button onClick={() => setView('store')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg">Start Shopping</button></div>
          ) : (
            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between mb-4"><div><p className="font-bold">Order #{o.id}</p><p className="text-sm text-gray-600">{new Date(o.date).toLocaleDateString()}</p></div><span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-semibold">{o.status}</span></div>
                  <div className="space-y-2 mb-4">{o.items.map(i => <div key={i.id} className="flex justify-between"><span>{i.name} x {i.qty}</span><span>${(i.price * i.qty).toFixed(2)}</span></div>)}</div>
                  <div className="border-t pt-4 flex justify-between font-bold"><span>Total</span><span className="text-blue-600">${o.total.toFixed(2)}</span></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'wishlist' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Wishlist</h1>
          {wishlist.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl"><Heart size={64} className="mx-auto text-gray-400 mb-4"/><p className="text-xl mb-6">No items</p><button onClick={() => setView('store')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg">Browse</button></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(p => (
                <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="text-7xl text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50">{p.img}</div>
                  <div className="p-4"><h3 className="font-bold mb-2">{p.name}</h3><div className="flex justify-between items-center"><span className="text-2xl font-bold text-blue-600">${p.price}</span><div className="flex gap-2"><button onClick={() => addCart(p)} className="bg-blue-500 text-white px-3 py-2 rounded">Add</button><button onClick={() => toggleWish(p)} className="text-red-500"><Trash2 size={18}/></button></div></div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-500 text-white rounded-xl p-6"><DollarSign size={32}/><p className="text-sm mt-2">Revenue</p><p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p></div>
            <div className="bg-purple-500 text-white rounded-xl p-6"><Package size={32}/><p className="text-sm mt-2">Orders</p><p className="text-3xl font-bold">{stats.orderCount}</p></div>
            <div className="bg-green-500 text-white rounded-xl p-6"><Users size={32}/><p className="text-sm mt-2">Customers</p><p className="text-3xl font-bold">{stats.customers}</p></div>
            <div className="bg-orange-500 text-white rounded-xl p-6"><TrendingUp size={32}/><p className="text-sm mt-2">Avg Order</p><p className="text-3xl font-bold">${stats.avg.toFixed(2)}</p></div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            {orders.slice(-5).reverse().map(o => (
              <div key={o.id} className="border-b py-4 flex justify-between"><div><p className="font-bold">#{o.id}</p><p className="text-sm text-gray-600">{o.customer}</p></div><span className="text-blue-600 font-bold">${o.total.toFixed(2)}</span></div>
            ))}
          </div>
        </div>
      )}

      {view === 'login' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to ShopHub</h1>
            <div className="space-y-4">
              <button onClick={() => login('customer')} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold flex items-center justify-center"><User className="mr-2"/>Login as Customer</button>
              <button onClick={() => login('admin')} className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-lg font-bold flex items-center justify-center"><Settings className="mr-2"/>Login as Admin</button>
              <button onClick={() => setView('store')} className="w-full border-2 py-4 rounded-lg font-bold">Continue as Guest</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}