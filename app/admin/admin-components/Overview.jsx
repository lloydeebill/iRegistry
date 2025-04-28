"use client";

export default function Overview() {
	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Hi there, Loidee Bee</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Registrations Section */}
				<section className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-2xl font-bold mb-6">Registrations</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">
								Pending Birth Registrations
							</h4>
							<p className="text-3xl font-bold mt-2">10</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">
								Confirmed Birth Registrations
							</h4>
							<p className="text-3xl font-bold mt-2">50</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">
								Pending Death Registrations
							</h4>
							<p className="text-3xl font-bold mt-2">5</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">
								Confirmed Death Registrations
							</h4>
							<p className="text-3xl font-bold mt-2">20</p>
						</div>
					</div>
				</section>

				{/* Requests Section */}
				<section className="bg-white p-6 rounded-lg shadow-md">
					<h3 className="text-2xl font-bold mb-6">Requests</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">
								Pending Birth Requests
							</h4>
							<p className="text-3xl font-bold mt-2">8</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">
								Confirmed Birth Requests
							</h4>
							<p className="text-3xl font-bold mt-2">45</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-yellow-600 font-semibold">
								Pending Death Requests
							</h4>
							<p className="text-3xl font-bold mt-2">2</p>
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<h4 className="text-green-600 font-semibold">
								Confirmed Death Requests
							</h4>
							<p className="text-3xl font-bold mt-2">18</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
