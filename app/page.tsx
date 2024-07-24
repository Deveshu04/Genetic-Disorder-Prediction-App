import PredictionForm from './components/PredictionForm'

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Genetic Prediction</h1>
            <PredictionForm />
        </div>
    )
}