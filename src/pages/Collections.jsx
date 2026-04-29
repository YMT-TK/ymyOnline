import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/collections/ToolCard";
import { loadToolIndex } from "../utils/loadTools";
import { useState, useEffect } from "react";

/**
 * 收藏页面
 * 展示所有工具的网格布局
 */
export default function Collections() {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const data = await loadToolIndex();
      setTools(data);
      setFilteredTools(data);
      setLoading(false);
    };
    fetchTools();
  }, []);

  const getCategories = () => {
    const cats = ['全部', ...new Set(tools.map(t => t.category))];
    return cats;
  };

  const filterTools = (search, category) => {
    let result = [...tools];

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(lowerSearch) ||
        t.description.toLowerCase().includes(lowerSearch) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(lowerSearch)))
      );
    }

    if (category !== '全部') {
      result = result.filter(t => t.category === category);
    }

    setFilteredTools(result);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterTools(value, activeCategory);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    filterTools(searchText, cat);
  };

  const categories = getCategories();

  if (loading) {
    return (
      <div className="dark bg-background text-on-surface font-body min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-tertiary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-label text-tertiary tracking-widest uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark bg-background text-on-surface font-body selection:bg-tertiary-container/30 min-h-screen">
      {/* 动态背景 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid animate-grid-flow"></div>
        <div className="scanline-overlay animate-scanline"></div>
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-tertiary/10 blur-[150px] rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-30"></div>
      </div>

      {/* 顶部导航 */}
      <Navigation />

      {/* 主要内容 */}
      <main className="relative pt-24 pb-20 min-h-screen z-10">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Header & Filter Bar */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-tertiary/10 border border-tertiary/20 text-tertiary text-[10px] font-label tracking-[0.2em] uppercase animate-pulse">
                Tool Collections // Arsenal
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-surface">
                工具<span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-primary to-tertiary">收藏夹</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative group">
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full md:w-80 px-5 py-3 bg-surface-container-low/50 border border-outline/20 rounded-lg text-on-surface placeholder:text-outline font-body text-sm focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all duration-300"
              />
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-tertiary transition-colors">
                search
              </span>
            </div>
          </header>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 p-1 bg-surface-container-low rounded-lg border border-outline-variant/10 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-5 py-2 text-xs font-label uppercase tracking-widest transition-all duration-300 transform active:scale-95 relative overflow-hidden group ${
                  activeCategory === cat
                    ? 'bg-tertiary text-on-tertiary shadow-[0_0_15px_rgba(167,255,179,0.3)]'
                    : 'text-on-surface-variant hover:text-tertiary hover:bg-tertiary/5 rounded'
                }`}
              >
                <span className="relative z-10">[{cat}]</span>
                {activeCategory !== cat && (
                  <div className="absolute inset-0 bg-tertiary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          {filteredTools.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline/30 mb-4">search_off</span>
              <p className="font-headline text-xl text-outline">没有找到匹配的工具</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}
