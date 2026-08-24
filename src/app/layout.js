import './globals.css'

export const metadata = {
  title: 'Avon',
  description: 'A Web Playing for streaming',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className='noTabs dark'>
        {children}
      </body>
    </html>
  )
}
