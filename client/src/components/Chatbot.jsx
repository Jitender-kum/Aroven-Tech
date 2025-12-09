import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! 👋 Welcome to Aroven Tech. What are you looking to build today?", sender: "bot", type: "options", step: "start" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // User ka poora data yahan jama hoga (e.g., Service: Web, Type: E-commerce)
  const [leadData, setLeadData] = useState({});
  const [currentStep, setCurrentStep] = useState("start");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isOpen, isTyping]);

  // 🔥 THE LOGIC SCRIPT (Yahan dimaag hai)
  const script = {
    // 1. START
    start: {
      text: "What are you looking to build today?",
      options: [
        { label: "🌐 Website / Web App", next: "web_type" },
        { label: "📱 Mobile App", next: "app_type" },
        { label: "🤖 AI / Chatbot", next: "budget" },
        { label: "🤔 Just Exploring / Other", next: "other_query" }
      ]
    },

    // 2. WEB PATH
    web_type: {
      text: "Great! What kind of website do you need?",
      options: [
        { label: "🛒 E-commerce (Store)", next: "budget" },
        { label: "🏢 Corporate / Portfolio", next: "budget" },
        { label: "💻 SaaS Product", next: "budget" }
      ]
    },

    // 3. APP PATH
    app_type: {
      text: "Nice! Which platform are we targeting?",
      options: [
        { label: "🤖 Android Only", next: "budget" },
        { label: "🍎 iOS Only", next: "budget" },
        { label: "📱 Hybrid (Both)", next: "budget" }
      ]
    },

    // 4. BUDGET (Common Step)
    budget: {
      text: "Got it. What is your estimated budget?",
      options: [
        { label: "💰 Under ₹20k", next: "get_contact" },
        { label: "💰💰 ₹20k - ₹50k", next: "get_contact" },
        { label: "💰💰💰 ₹50k+", next: "get_contact" }
      ]
    },

    // 5. OTHER QUERY
    other_query: {
      text: "No problem! Please type your specific requirement below. 👇",
      type: "input_query" // Special flag to show input box
    },

    // 6. FINAL CONTACT
    get_contact: {
      text: "Perfect! Last step: Please enter your Email or Phone so our team can send you the quote/details. 📧",
      type: "input_contact" // Special flag to show input box
    }
  };

  // --- LOGIC ENGINE ---

  const handleOptionClick = (option) => {
    // 1. User Choice Show karo
    const userMsg = { text: option.label, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    // 2. Data save karo (History build ho rahi hai)
    setLeadData(prev => ({ ...prev, [currentStep]: option.label }));

    // 3. Typing Animation
    setIsTyping(true);

    setTimeout(() => {
      const nextStepKey = option.next;
      setCurrentStep(nextStepKey); // Step update

      const nextStepData = script[nextStepKey];

      // Bot ka naya sawal add karo
      setMessages(prev => [...prev, { 
        text: nextStepData.text, 
        sender: "bot", 
        type: nextStepData.options ? "options" : "text", // Agar options hain to button dikhao
        step: nextStepKey
      }]);

      setIsTyping(false);
    }, 800);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput("");
    setIsTyping(true);

    // LOGIC for Inputs
    if (currentStep === "other_query") {
      setLeadData(prev => ({ ...prev, query: userInput }));
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: script.get_contact.text, sender: "bot" }]);
        setCurrentStep("get_contact");
        setIsTyping(false);
      }, 800);
    } 
    
    else if (currentStep === "get_contact") {
      // FINAL SUBMISSION TO SERVER
      setMessages(prev => [...prev, { text: "Analyzing requirements... 🧠", sender: "bot" }]);

      // Compile Final Message for Admin
      const finalMessage = `
        🤖 BOT LEAD SUMMARY:
        - Path: ${leadData.start || 'Direct'}
        - Type: ${leadData.web_type || leadData.app_type || 'N/A'}
        - Budget: ${leadData.budget || 'N/A'}
        - Query: ${leadData.query || 'N/A'}
      `;

      try {
        const res = await fetch('https://aroven-tech.onrender.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "Smart Bot Lead",
            email: userInput, // Phone/Email
            message: finalMessage
          })
        });

        if (res.ok) {
          setTimeout(() => {
            setMessages(prev => [...prev, { text: "✅ Done! We have received your details. Expect a call/email shortly. 🚀", sender: "bot" }]);
            setIsTyping(false);
          }, 1000);
        } else { throw new Error(); }
      } catch (err) {
        setTimeout(() => {
          setMessages(prev => [...prev, { text: "❌ Connection Error. Please try WhatsApp button.", sender: "bot" }]);
          setIsTyping(false);
        }, 1000);
      }
    }
  };

  // Helper to get current options
  const currentOptions = script[currentStep]?.options || [];

  return (
    <div className="chatbot-wrapper">
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <span style={{fontSize: '1.8rem'}}>🤖</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
               <div style={{background: '#fff', borderRadius:'50%', padding:'5px', display:'flex'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="AI" width="24" />
              </div>
              <div>
                <h4 style={{margin:0, fontSize:'1rem', color: 'white'}}>Aroven Assistant</h4>
                <span style={{fontSize:'0.7rem', color:'#4ade80'}}>● Smart Flow</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{background:'none', border:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>×</button>
          </div>

          {/* Chat Area */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} style={{display:'flex', flexDirection:'column', alignItems: msg.sender==='user'?'flex-end':'flex-start', width:'100%'}}>
                <div className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                  {msg.text}
                </div>
                
                {/* Agar ye last message hai aur options available hain, to dikhao */}
                {!isTyping && index === messages.length - 1 && msg.type === "options" && currentOptions.length > 0 && (
                  <div className="options-container">
                    {currentOptions.map((opt, i) => (
                      <button key={i} className="option-btn" onClick={() => handleOptionClick(opt)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-msg typing">
                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area (Sirf tab dikhega jab input chahiye) */}
          {(script[currentStep]?.type === "input_query" || script[currentStep]?.type === "input_contact") && !isTyping && (
            <form onSubmit={handleSend} className="chat-input-area">
              <input 
                type="text" 
                placeholder={currentStep === "get_contact" ? "Enter Email or Phone..." : "Type your query here..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
              />
              <button type="submit">➤</button>
            </form>
          )}
          
          {/* Agar Menu hai to input block karo */}
          {script[currentStep]?.options && !isTyping && (
             <div className="chat-input-area" style={{justifyContent:'center', color:'#666', fontSize:'0.8rem'}}>
              Select an option above 👆
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Chatbot;