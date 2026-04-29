import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProjectsList from './pages/ProjectsList';
import WebGallery from './pages/WebGallery';
import Collections from './pages/Collections';
import ToolDetail from './pages/ToolDetail';

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
        <Route path="/collections" element={<Collections />} />
        <Route path="/tool/:id" element={<ToolDetail />} />
      </Routes>
    </Router>
  );
}

export default App
