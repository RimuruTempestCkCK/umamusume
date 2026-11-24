import { Link, useParams } from 'react-router-dom'

const messages: Record<string, string> = {
  '400': 'The request could not be understood. Please check the address and try again.',
  '403': 'You do not have permission to access this page.',
  '404': 'The page you are looking for could not be found.',
  '405': 'The requested action is not allowed on this page.',
  '414': 'The requested address is too long. Please try a shorter one.',
  '416': 'The requested range is not available.',
  '500': 'An unexpected error occurred on our end. Please try again later.',
  '501': 'This feature has not been implemented yet.',
  '502': 'The server received an invalid response. Please try again later.',
  '503': 'The service is temporarily unavailable. Please try again later.',
  '504': 'The server took too long to respond. Please try again later.',
}

export default function ErrorPage() {
  const { code = '' } = useParams()
  const message = messages[code] ?? 'An unexpected error occurred. Please try again later.'

  return (
    <main id="main" className="error-page">
      <div className="error-page__inner">
        <h1>Error {code}</h1>
        <p>{message}</p>
        <Link to="/" className="button-link">Back to Top</Link>
      </div>
    </main>
  )
}
