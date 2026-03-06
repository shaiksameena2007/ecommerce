import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRouter from './AppRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
    return (
        <AppProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                        <AppRouter />
                    </main>
                    <Footer />
                    <ChatBot />
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
