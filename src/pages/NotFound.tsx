import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main id="main" className="error-page">
      <div className="error-page__inner">
        <h1>Error 404</h1>
        <p>The page you are looking for could not be found.</p>
        <Link to="/" className="button-link">Back to Top</Link>
      </div>
    </main>
  )
}
