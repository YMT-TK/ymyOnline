import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProjectsList from './pages/ProjectsList';
import WebGallery from './pages/WebGallery';

/**
 * 主应用组件
 * 整合路由和页面
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/websites" element={<WebGallery />} />
      </Routes>
    </Router>
  );
}

export default App
