import { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    
    try {
      // Correct endpoint matching your server/index.js
      // Sending payload as { task: input } to match the backend expectation
      const response = await axios.post('http://localhost:5001/api/tasks', { 
        task: input 
      });
      
      setTasks(response.data);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Error: Make sure the Server (Terminal 1) is running on port 5001!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#1e293b' }}>SmartFlow AI Task Architect</h1>
        <p style={{ color: '#64748b' }}>Transform your project ideas into structured action plans.</p>
      </header>
      
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <textarea 
          rows="5" 
          style={{ 
            width: '100%', 
            marginBottom: '20px', 
            padding: '15px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
          placeholder="Example: Finalize the OpenClaw gateway, prepare for the tech interview, and buy vintage beef for dinner..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button 
          onClick={handleGenerate}
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '14px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            backgroundColor: loading ? '#94a3b8' : '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'AI is Architecting...' : 'Generate Task List'}
        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        {tasks.length > 0 && <h2 style={{ marginBottom: '20px', color: '#334155' }}>Your Action Plan:</h2>}
        
        {tasks.map((task, index) => (
          <div key={index} style={{ 
            border: '1px solid #e2e8f0', 
            padding: '20px', 
            marginBottom: '15px', 
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: '#1e293b' }}>{task.title}</h3>
              <span style={{ fontSize: '20px' }}>
                {task.icon === 'code' ? '💻' : 
                 task.icon === 'work' ? '💼' : 
                 task.icon === 'fastfood' ? '🥩' : 
                 task.icon === 'shopping_cart' ? '🛒' : '📝'}
              </span>
            </div>
            
            <p style={{ margin: '5px 0', color: '#475569', lineHeight: '1.5' }}>{task.description}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <span style={{ 
                backgroundColor: '#f1f5f9', 
                padding: '4px 10px', 
                borderRadius: '6px',
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                Category: {task.category || 'General'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;