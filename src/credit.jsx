import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Credit = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Sample data for demonstration
  const [pendingLoans] = useState([
    {
      id: 1,
      name: 'John Doe',
      amount: 50000,
      bankName: 'First Bank',
      accountNumber: '1234567890',
      creditScore: 720,
      income: 150000,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Jane Smith',
      amount: 75000,
      bankName: 'GTBank',
      accountNumber: '0987654321',
      creditScore: 680,
      income: 200000,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      amount: 30000,
      bankName: 'Access Bank',
      accountNumber: '5678901234',
      creditScore: 550,
      income: 80000,
      status: 'pending'
    }
  ]);

  const [acceptedLoans, setAcceptedLoans] = useState([
    {
      id: 4,
      name: 'Sarah Williams',
      amount: 60000,
      bankName: 'Zenith Bank',
      accountNumber: '3456789012',
      creditScore: 750,
      income: 180000,
      status: 'accepted'
    }
  ]);

  const [rejectedLoans, setRejectedLoans] = useState([
    {
      id: 5,
      name: 'David Brown',
      amount: 100000,
      bankName: 'UBA',
      accountNumber: '7890123456',
      creditScore: 500,
      income: 60000,
      status: 'rejected',
      reason: 'Low credit score and insufficient income'
    }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
  };

  const approveLoan = (loan) => {
    setAcceptedLoans([...acceptedLoans, { ...loan, status: 'accepted' }]);
  };

  const rejectLoan = (loan) => {
    setRejectedLoans([...rejectedLoans, { 
      ...loan, 
      status: 'rejected',
      reason: 'Did not meet lending criteria'
    }]);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Credit Application System</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Credit Application System</h1>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </header>

      <nav className="navigation">
        <button 
          className={activeTab === 'pending' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('pending')}
        >
          Pending Loans ({pendingLoans.length})
        </button>
        <button 
          className={activeTab === 'accepted' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted Loans ({acceptedLoans.length})
        </button>
        <button 
          className={activeTab === 'rejected' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected Loans ({rejectedLoans.length})
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'pending' && (
          <div className="loans-section">
            <h2>Pending Loan Applications</h2>
            {pendingLoans.length === 0 ? (
              <p className="empty-state">No pending loan applications</p>
            ) : (
              <div className="loans-grid">
                {pendingLoans.map((loan) => (
                  <div key={loan.id} className="loan-card">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                    </div>
                    <div className="action-buttons">
                      <button 
                        className="btn-approve"
                        onClick={() => approveLoan(loan)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => rejectLoan(loan)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'accepted' && (
          <div className="loans-section">
            <h2>Accepted Loan Applications</h2>
            {acceptedLoans.length === 0 ? (
              <p className="empty-state">No accepted loan applications</p>
            ) : (
              <div className="loans-grid">
                {acceptedLoans.map((loan) => (
                  <div key={loan.id} className="loan-card accepted">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                    </div>
                    <div className="status-badge success">Approved</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="loans-section">
            <h2>Rejected Loan Applications</h2>
            {rejectedLoans.length === 0 ? (
              <p className="empty-state">No rejected loan applications</p>
            ) : (
              <div className="loans-grid">
                {rejectedLoans.map((loan) => (
                  <div key={loan.id} className="loan-card rejected">
                    <h3>{loan.name}</h3>
                    <div className="loan-details">
                      <p><strong>Loan Amount:</strong> ₦{loan.amount.toLocaleString()}</p>
                      <p><strong>Bank:</strong> {loan.bankName}</p>
                      <p><strong>Account Number:</strong> {loan.accountNumber}</p>
                      <p><strong>Credit Score:</strong> {loan.creditScore}</p>
                      <p><strong>Annual Income:</strong> ₦{loan.income.toLocaleString()}</p>
                      <p><strong>Reason:</strong> {loan.reason}</p>
                    </div>
                    <div className="status-badge danger">Rejected</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
        }

        .login-box h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
          font-size: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .btn-primary {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
        }

        .app-container {
          min-height: 100vh;
          background: #f5f7fa;
        }

        .header {
          background: white;
          padding: 20px 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header h1 {
          color: #333;
          font-size: 24px;
        }

        .btn-logout {
          padding: 10px 20px;
          background: #ff4757;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn-logout:hover {
          background: #e84118;
        }

        .navigation {
          background: white;
          padding: 0 40px;
          display: flex;
          gap: 10px;
          border-bottom: 2px solid #e0e0e0;
        }

        .nav-btn {
          padding: 15px 25px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: #666;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          color: #667eea;
        }

        .nav-btn.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }

        .main-content {
          padding: 40px;
        }

        .loans-section h2 {
          color: #333;
          margin-bottom: 30px;
          font-size: 28px;
        }

        .empty-state {
          text-align: center;
          color: #999;
          font-size: 18px;
          padding: 60px 20px;
        }

        .loans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 25px;
        }

        .loan-card {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }

        .loan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .loan-card.accepted {
          border-left: 4px solid #2ecc71;
        }

        .loan-card.rejected {
          border-left: 4px solid #e74c3c;
        }

        .loan-card h3 {
          color: #333;
          margin-bottom: 20px;
          font-size: 20px;
        }

        .loan-details {
          margin-bottom: 20px;
        }

        .loan-details p {
          margin-bottom: 10px;
          color: #555;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .btn-approve,
        .btn-reject {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-approve {
          background: #2ecc71;
          color: white;
        }

        .btn-approve:hover {
          background: #27ae60;
        }

        .btn-reject {
          background: #e74c3c;
          color: white;
        }

        .btn-reject:hover {
          background: #c0392b;
        }

        .status-badge {
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 12px;
          text-align: center;
          margin-top: 15px;
        }

        .status-badge.success {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.danger {
          background: #f8d7da;
          color: #721c24;
        }

        @media (max-width: 768px) {
          .header {
            padding: 15px 20px;
          }

          .header h1 {
            font-size: 18px;
          }

          .navigation {
            padding: 0 20px;
            overflow-x: auto;
          }

          .main-content {
            padding: 20px;
          }

          .loans-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Credit;