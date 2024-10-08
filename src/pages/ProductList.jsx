// import React, { useState, useEffect } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"
// import { domainurl } from "../App"

// const ProductList = () => {
// 	const [categories, setCategories] = useState([])
// 	const [selectedCategory, setSelectedCategory] = useState(null)
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const apiUrl = `${domainurl}/api/products/details` // Make sure this URL is correct
// 				console.log("API URL:", apiUrl)
// 				const response = await axios.get(apiUrl)
// 				console.log("API Response:", response.data) // Log the response data
// 				setCategories(response.data.categories)
// 				setSelectedCategory(response.data.categories[0]?._id) // Initially show the first product
// 			} catch (error) {
// 				toast.error(error.message)
// 			} finally {
// 				setLoading(false) // Set loading to false after data is fetched
// 			}
// 		}

// 		fetchData()
// 	}, [])

// 	const handleCategoryClick = (categoryId) => {
// 		setSelectedCategory(categoryId)
// 	}

// 	const selectedCategoryData = categories.find(
// 		(category) => category._id === selectedCategory
// 	)

// 	return (
// 		<div className="container mx-auto p-4">
// 			{loading ? ( // Show loader when loading
// 				<div className="grid place-items-center min-h-[80vh]">
// 					<div className="w-16  h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
// 				</div>
// 			) : (
// 				<>
// 					<div className="inline-block gap20 overflow-auto space-x-4 w-full">
// 						{categories.map((category) => (
// 							<button
// 								key={category._id}
// 								onClick={() => handleCategoryClick(category._id)}
// 								className={`py-2 px-4 rounded ${
// 									selectedCategory === category._id
// 										? "bg-pink-500 text-white"
// 										: "bg-gray-200 text-gray-700 inline-block  mt-4"
// 								}`}
// 							>
// 								{category.name}
// 							</button>
// 						))}
// 					</div>
// 					{selectedCategoryData ? (
// 						selectedCategoryData.subcategories.length === 0 ? (
// 							<p>No products in this category</p>
// 						) : (
// 							selectedCategoryData.subcategories.map((subcategory) => (
// 								<div key={subcategory._id}>
// 									<h2 className="text-xl font-bold my-4">{subcategory.name}</h2>
// 									{subcategory.products.length === 0 ? (
// 										<p className="flex items-center justify-center h-[60%] w-full text-2xl">
// 											No products in this subcategory
// 										</p>
// 									) : (
// 										<div className="grid grid-cols-4 gap-4">
// 											{subcategory.products.map((product) => (
// 												<div
// 													key={product._id}
// 													className="bg-white p-4 rounded shadow"
// 												>
// 													<div
// 														className="p-5"
// 														style={{ background: product.color }}
// 													>
// 														<img
// 															src={product.img}
// 															alt={product.name}
// 															className="w-[150px] h-32 object-cover mb-2"
// 															loading="lazy" // Lazy loading
// 														/>
// 													</div>
// 													<h3 className="text-lg font-semibold">
// 														{product.name}
// 													</h3>
// 													<p className="text-gray-600">{product.bg}</p>
// 												</div>
// 											))}
// 										</div>
// 									)}
// 								</div>
// 							))
// 						)
// 					) : (
// 						<p className="flex items-center justify-center  w-full text-3xl">
// 							No products in this category
// 						</p>
// 					)}{" "}
// 				</>
// 			)}
// 		</div>
// 	)
// }

// export default ProductList

import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { domainurl } from "../App"
import { AiOutlineDelete } from "react-icons/ai"
import { FaRegEdit, FaSave } from "react-icons/fa"

const ProductList = () => {
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `${domainurl}/api/products/details`
				const response = await axios.get(apiUrl)
				setCategories(response.data.categories)
				setSelectedCategory(response.data.categories[0]?._id)
			} catch (error) {
				toast.error(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleCategoryClick = (categoryId) => {
		setSelectedCategory(categoryId)
	}

	const handleEditClick = (productId) => {
		navigate(`/product/update/${productId}`)
	}

	const handleDeleteClick = async (productId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?"
		)
		if (confirmDelete) {
			try {
				await axios.delete(`${domainurl}/api/products/${productId}`)
				toast.success("Product deleted successfully")
				setCategories((prevCategories) =>
					prevCategories.map((category) => ({
						...category,
						subcategories: category.subcategories.map((subcategory) => ({
							...subcategory,
							products: subcategory.products.filter(
								(product) => product._id !== productId
							),
						})),
					}))
				)
			} catch (error) {
				toast.error(error.response?.data?.message || "Error deleting product")
			}
		}
	}

	const selectedCategoryData = categories.find(
		(category) => category._id === selectedCategory
	)

	return (
		<div className="container mx-auto p-4">
			{loading ? (
				<div className="grid place-items-center min-h-[80vh]">
					<div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
				</div>
			) : (
				<>
					<div className="inline-block gap20 overflow-auto space-x-4 w-full">
						{categories.map((category) => (
							<button
								key={category._id}
								onClick={() => handleCategoryClick(category._id)}
								className={`py-2 px-4 rounded ${
									selectedCategory === category._id
										? "bg-pink-500 text-white"
										: "bg-gray-200 text-gray-700 inline-block mt-4"
								}`}
							>
								{category.name}
							</button>
						))}
					</div>
					{selectedCategoryData ? (
						selectedCategoryData.subcategories.length === 0 ? (
							<p>No products in this category</p>
						) : (
							selectedCategoryData.subcategories.map((subcategory) => (
								<div key={subcategory._id}>
									<h2 className="text-xl font-bold my-4">{subcategory.name}</h2>
									{subcategory.products.length === 0 ? (
										<p className="flex items-center justify-center h-[60%] w-full text-2xl">
											No products in this subcategory
										</p>
									) : (
										<div className="grid grid-cols-4 gap-4">
											{subcategory.products.map((product) => (
												<div
													key={product._id}
													className="bg-white p-4 rounded shadow"
												>
													<div
														className="p-5"
														style={{ background: product.color }}
													>
														<img
															src={product.img}
															alt={product.name}
															className="w-[150px] h-32 object-cover mb-2"
															loading="lazy"
														/>
													</div>
													<div className="flex justify-between items-center">
														<div>
															<h3 className="text-lg font-semibold">
																{product.name}
															</h3>
															<p className="text-gray-600">{product.bg}</p>
														</div>
														<div className="flex space-x-2 mt-2">
															<button
																onClick={() => handleEditClick(product._id)}
																className="px-3 py-2 bg-blue-500 text-white rounded"
															>
																<FaRegEdit />
															</button>
															<button
																onClick={() => handleDeleteClick(product._id)}
																className="px-3 py-2 bg-red-500 text-white rounded"
															>
																<AiOutlineDelete />
															</button>
														</div>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							))
						)
					) : (
						<p className="flex items-center justify-center w-full text-3xl">
							No products in this category
						</p>
					)}
				</>
			)}
		</div>
	)
}

export default ProductList
