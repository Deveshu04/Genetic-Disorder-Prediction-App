import DashboardTable from '../components/DashboardTable'

export default function Dashboard() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Admin Dashboard</h1>
            <DashboardTable />
        </div>
    )
}