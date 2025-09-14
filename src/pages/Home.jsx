








import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';


function Home() {
 const { user } = useAuth(); // live from context if available


 const [username, setUsername] = useState('');


 useEffect(() => {
   if (user) {
     setUsername(user.email.split('@')[0]|| '');
   }
 }, [user]);


 return (
   <>
     <style jsx>{`
       @keyframes neonGlow {
         0%, 100% { box-shadow: 0 0 20px #00f5ff, 0 0 40px #00f5ff; }
         50% { box-shadow: 0 0 30px #00f5ff, 0 0 50px #00f5ff; }
       }


       @keyframes textGlow {
         0%, 100% { text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff69b4; }
         50% { text-shadow: 0 0 15px #ff69b4, 0 0 25px #ff69b4; }
       }


       @keyframes gradientShift {
         0% { background-position: 0% 50%; }
         50% { background-position: 100% 50%; }
         100% { background-position: 0% 50%; }
       }


       .neon-overlay {
         position: fixed;
         top: 0; left: 0; right: 0; bottom: 0;
         background: radial-gradient(circle at 20% 30%, rgba(0,245,255,0.15), transparent 70%),
                     radial-gradient(circle at 80% 70%, rgba(255,0,110,0.15), transparent 70%),
                     radial-gradient(circle at 50% 90%, rgba(131,56,236,0.15), transparent 70%);
         background-size: 200% 200%;
         animation: gradientShift 12s ease infinite;
         z-index: -1;
       }


       .neon-card {
         background: rgba(255, 255, 255, 0.1);
         backdrop-filter: blur(15px);
         border: 1px solid rgba(0, 245, 255, 0.3);
         border-radius: 20px;
         transition: all 0.3s ease;
       }


       .neon-card:hover {
         border: 1px solid rgba(0, 245, 255, 0.6);
         box-shadow: 0 15px 50px rgba(0, 245, 255, 0.2);
         transform: translateY(-5px);
       }


       .neon-text {
         color: #000000;
         text-shadow: 0 0 10px #00f5ff, 0 0 20px #00f5ff;
         animation: textGlow 2s ease-in-out infinite alternate;
       }
     `}</style>


     <NavBar />
     <div className="neon-overlay"></div>


     {/* Hero Section */}
     <div style={{
       minHeight: '70vh',
       display: 'flex',
       alignItems: 'center',
       padding: '0 60px',
       position: 'relative',
       color: 'white'
     }}>
       <div style={{ maxWidth: '2000px', margin: '0 auto', width: '100%', zIndex: 1 }}>
         <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
           Hi, <strong className="neon-text">{username || 'Guest'}!</strong>
         </p>


         <h1 style={{
           fontSize: '3.5rem',
           fontWeight: '700',
           marginBottom: '20px',
           color: '#000000',
           textShadow: '0 0 20px #ff69b4'
         }}>
           Welcome to SereneSpace
         </h1>


         <p style={{ fontSize: '1.3rem', marginBottom: '30px', maxWidth: '600px' }}>
           Support and evidence-based tools to help you thrive emotionally and mentally.
         </p>


         <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.85, maxWidth: '500px' }}>
           Begin your path to wellness with reliable resources and compassionate care.
         </p>
       </div>
     </div>


     {/* rest of your UI (features, mission) remains exactly the same */}
   </>
 );
}


export default Home;


