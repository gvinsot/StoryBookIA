import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Generate from './pages/Generate';
import History from './pages/History';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/history" element={<History />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;