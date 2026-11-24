import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import News from './pages/News'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Media from './pages/Media'
import Article from './pages/Article'
import NewsDetail from './pages/NewsDetail'
import SteamLP from './pages/SteamLP'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news/:id/" element={<NewsDetail />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/" element={<Characters />} />
        <Route path="/characters/:slug" element={<CharacterDetail />} />
        <Route path="/characters/:slug/" element={<CharacterDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/" element={<Media />} />
        <Route path="/about" element={<Article slug="about" />} />
        <Route path="/about/" element={<Article slug="about" />} />
        <Route path="/devices" element={<Article slug="devices" />} />
        <Route path="/devices/" element={<Article slug="devices" />} />
        <Route path="/policy" element={<Article slug="policy" />} />
        <Route path="/policy/" element={<Article slug="policy" />} />
        <Route path="/privacy-choices" element={<Article slug="privacy-choices" />} />
        <Route path="/privacy-choices/" element={<Article slug="privacy-choices" />} />
        <Route path="/terms" element={<Article slug="terms" />} />
        <Route path="/terms/" element={<Article slug="terms" />} />
        <Route path="/fan-createdguide" element={<Article slug="fan-createdguide" />} />
        <Route path="/fan-createdguide/" element={<Article slug="fan-createdguide" />} />
        <Route path="/visitingstables-guidelines" element={<Article slug="visitingstables-guidelines" />} />
        <Route path="/visitingstables-guidelines/" element={<Article slug="visitingstables-guidelines" />} />
        <Route path="/promotion/steam_lp" element={<SteamLP />} />
        <Route path="/promotion/steam_lp/" element={<SteamLP />} />
        <Route path="/error/:code" element={<ErrorPage />} />
        <Route path="/error/:code/" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
