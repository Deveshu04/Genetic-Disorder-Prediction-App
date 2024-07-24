import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between">
                <Link href="/" className="text-xl font-bold">Genetic Prediction</Link>
                <div>
                    <Link href="/" className="mr-4">Home</Link>
                    <Link href="/insights" className="mr-4">Insights</Link>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
            </nav>
        </header>
    )
}