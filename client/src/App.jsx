import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Services from './pages/public/Services.jsx';
import Portfolio from './pages/public/Portfolio.jsx';
import ProjectDetail from './pages/public/ProjectDetail.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import Contact from './pages/public/Contact.jsx';
import RequestQuote from './pages/public/RequestQuote.jsx';
import NotFound from './pages/public/NotFound.jsx';
import { PrivacyPolicy, Terms } from './pages/public/LegalPages.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProjects from './pages/admin/AdminProjects.jsx';
import AdminBlog from './pages/admin/AdminBlog.jsx';
import AdminServices from './pages/admin/AdminServices.jsx';
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx';
import AdminMessages from './pages/admin/AdminMessages.jsx';
import AdminQuotes from './pages/admin/AdminQuotes.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';

function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-a-quote" element={<RequestQuote />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/quotes" element={<AdminQuotes />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
