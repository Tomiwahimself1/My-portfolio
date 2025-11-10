import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Heart, Menu, X, Package, DollarSign, Users, TrendingUp, CreditCard, Trash2, Plus, Minus, LogOut, Settings, BarChart3, ChevronRight, Star, Filter } from 'lucide-react';

export default function EcommercePlatform() {
  const [currentView, setCurrentView] = useState('store');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [products] = useState([
    { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: '🎧', rating: 4.5, stock: 15, description: 'Premium noise-canceling wireless headphones' },
    { id: 2, name: 'Smart Watch', price: 199.99, category: 'Electronics', image: '⌚', rating: 4.8, stock: 8, description: 'Fitness tracking smartwatch' },
    { id: 3, name: 'Laptop Backpack', price: 49.99, category: 'Accessories', image: '🎒', rating: 4.3, stock: 25, description: 'Water-resistant laptop backpack' },
    { id: 4, name: 'Coffee Maker', price: 89.99, category: 'Home', image: '☕', rating: 4.6, stock: 12, description: 'Programmable coffee maker' },
    { id: 5, name: 'Running Shoes', price: 129.99, category: 'Fashion', image: '👟', rating: 4.7, stock: 20, description: 'Lightweight running shoes' },
    { id: 6, name: 'Desk Lamp', price: 34.99, category: 'Home', image: '💡', rating: 4.4, stock: 30, description: 'LED desk lamp adjustable' },
    { id: 7, name: 'Bluetooth Speaker', price: 59.99, category: 'Electronics', image: '🔊', rating: 4.5, stock: 18, description: 'Portable Bluetooth speaker' },
    { id: 8, name: 'Yoga Mat', price: 29.99, category: 'Sports', image: '🧘', rating: 4.2, stock: 40, description: 'Non-slip yoga mat' },
  ]);

  const [adminStats] = useState({
    totalRevenue: 45678.90,
    totalOrders: 234,
    totalCustomers: 156,
    averageOrderValue: 195.20
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setCart(savedCart);
    setWishlist(savedWishlist);
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutFormChange = (e) => {
    setCheckoutForm({ ...checkoutForm, [e.target.name]: e.target.value });
  };

  const processPayment = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'Processing',
      customer: checkoutForm.fullName,
      email: checkoutForm.email
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    setCheckoutForm({
      fullName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    alert('Order placed successfully! 🎉');
    setCurrentView('store');
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setIsAdmin(role === 'admin');
    setCurrentView(role === 'admin' ? 'admin' : 'store');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView('store');
  };

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => setCurrentView('store')} className="text-2xl font-bold hover:scale-105 transition-transform">
            🛒 ShopHub
          </button>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentView('store')} className="hover:text-blue-200 transition-colors">
              Store
            </button>
            {isLoggedIn && isAdmin && (
              <button onClick={() => setCurrentView('admin')} className="hover:text-blue-200 transition-colors flex items-center">
                <Settings size={18} className="mr-1" /> Admin
              </button>
            )}
            <button onClick={() => setCurrentView('cart')} className="relative hover:text-blue-200 transition-colors">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center hover:text-blue-200 transition-colors">
                <LogOut size={18} className="mr-1" /> Logout
              </button>
            ) : (
              <button onClick={() => setCurrentView('login')} className="flex items-center hover:text-blue-200 transition-colors">
                <User size={18} className="mr-1" /> Login
              </button>
            )}
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentView('store'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded">
              Store
            </button>
            {isLoggedIn && isAdmin && (
              <button onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded">
                Admin Dashboard
              </button>
            )}
            <button onClick={() => { setCurrentView('cart'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded">
              Cart ({cartItemCount})
            </button>
            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded">
                Logout
              </button>
            ) : (
              <button onClick={() => { setCurrentView('login'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded">
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  const StoreView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to ShopHub</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all">
            <div className="text-8xl text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50">
              {product.image}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`${wishlist.some(item => item.id === product.id) ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform`}
                >
                  <Heart size={20} fill={wishlist.some(item => item.id === product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center mb-2">
                <Star size={16} className="text-yellow-500" fill="currentColor" />
                <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                <span className="ml-auto text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CartView = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => setCurrentView('store')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                <div className="text-6xl">{item.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="font-bold text-xl text-blue-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => setCurrentView('store')}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CheckoutView = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={checkoutForm.fullName}
                onChange={handleCheckoutFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={checkoutForm.email}
                onChange={handleCheckoutFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={checkoutForm.address}
                onChange={handleCheckoutFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={checkoutForm.city}
                  onChange={handleCheckoutFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={checkoutForm.zipCode}
                  onChange={handleCheckoutFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CreditCard className="mr-2" /> Payment Information
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={checkoutForm.cardNumber}
                onChange={handleCheckoutFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                maxLength="16"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={checkoutForm.expiryDate}
                  onChange={handleCheckoutFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  maxLength="5"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={checkoutForm.cvv}
                  onChange={handleCheckoutFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  maxLength="3"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={processPayment}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all mb-3"
            >
              Place Order ${cartTotal.toFixed(2)}
            </button>
            <button
              onClick={() => setCurrentView('cart')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} />
            <TrendingUp size={24} />
          </div>
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-3xl font-bold">${adminStats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Package size={32} />
            <BarChart3 size={24} />
          </div>
          <p className="text-sm opacity-90">Total Orders</p>
          <p className="text-3xl font-bold">{adminStats.totalOrders}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Users size={32} />
            <TrendingUp size={24} />
          </div>
          <p className="text-sm opacity-90">Total Customers</p>
          <p className="text-3xl font-bold">{adminStats.totalCustomers}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={32} />
            <ChevronRight size={24} />
          </div>
          <p className="text-sm opacity-90">Avg Order Value</p>
          <p className="text-3xl font-bold">${adminStats.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Package className="mr-2 text-blue-600" /> Recent Orders
          </h2>
          <div className="space-y-4">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{new Date(order.date).toLocaleDateString()}</span>
                  <span className="font-bold text-blue-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-purple-600" /> Product Inventory
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map(product => (
              <div key={product.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{product.image}</span>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </div>
                <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {product.stock} in stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome to ShopHub</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('customer')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center"
          >
            <User className="mr-2" size={24} />
            Login as Customer
          </button>
          <button
            onClick={() => handleLogin('admin')}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-lg font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all flex items-center justify-center"
          >
            <Settings className="mr-2" size={24} />
            Login as Admin
          </button>
          <button
            onClick={() => setCurrentView('store')}
            className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-50 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            💡 Demo Mode: Click any login option to explore the platform
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentView === 'store' && <StoreView />}
      {currentView === 'cart' && <CartView />}
      {currentView === 'checkout' && <CheckoutView />}
      {currentView === 'admin' && <AdminView />}
      {currentView === 'login' && <LoginView />}
    </div>
  );
}