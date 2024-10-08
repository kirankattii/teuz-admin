// import React, { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"
// import { toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { domainurl } from "../App"
// import { AiOutlineDelete } from "react-icons/ai"
// import { FaRegEdit, FaSave } from "react-icons/fa"

// const CategoryDetails = ({ back }) => {
// 	const { id } = useParams()
// 	const [category, setCategory] = useState(null)
// 	const [loading, setLoading] = useState(true)
// 	const [subcategories, setSubcategories] = useState([])
// 	const navigate = useNavigate()

// 	const goBack = () => {
// 		console.log("clicked")
// 		navigate(-1)
// 	}

// 	useEffect(() => {
// 		axios
// 			.get(`${domainurl}/api/products/category/${id}`)
// 			.then((response) => {
// 				setCategory(response.data)
// 				setLoading(false)
// 			})
// 			.catch((error) => {
// 				toast.error(error.message)
// 				setLoading(false)
// 			})
// 	}, [id])

// 	useEffect(() => {
// 		if (category && category.subcategories) {
// 			const fetchProductsForSubcategories = async () => {
// 				const subcategoriesWithProducts = await Promise.all(
// 					category.subcategories.map(async (subcategory) => {
// 						const response = await axios.get(
// 							`${domainurl}/api/products/subcategory/${subcategory._id}`
// 						)
// 						return {
// 							...subcategory,
// 							products: response.data.products,
// 						}
// 					})
// 				)
// 				setSubcategories(subcategoriesWithProducts)
// 			}
// 			fetchProductsForSubcategories()
// 		}
// 	}, [category])

// 	const handleDeleteSubcategory = (subcategoryId) => {
// 		if (window.confirm("Are you sure you want to delete this subcategory?")) {
// 			axios
// 				.delete(`${domainurl}/api/subcategories/${subcategoryId}`)
// 				.then((response) => {
// 					toast.success("Subcategory deleted successfully")
// 					setSubcategories(
// 						subcategories.filter((sub) => sub._id !== subcategoryId)
// 					)
// 				})
// 				.catch((error) => {
// 					toast.error(error.message)
// 				})
// 		}
// 	}

// 	const handleDeleteProduct = (productId) => {
// 		if (window.confirm("Are you sure you want to delete this product?")) {
// 			axios
// 				.delete(`${domainurl}/api/products/${productId}`)
// 				.then((response) => {
// 					toast.success("Product deleted successfully")
// 					setSubcategories(
// 						subcategories.map((sub) => ({
// 							...sub,
// 							products: sub.products.filter((prod) => prod._id !== productId),
// 						}))
// 					)
// 				})
// 				.catch((error) => {
// 					toast.error(error.message)
// 				})
// 		}
// 	}

// 	const handleEditProduct = (productId) => {
// 		navigate(`/product/update/${productId}`)
// 	}

// 	if (loading) {
// 		return <div>Loading...</div>
// 	}

// 	if (!category) {
// 		return <div>Category not found</div>
// 	}

// 	return (
// 		<div className="container mx-auto p-4">
// 			<button
// 				onClick={back}
// 				className="bg-blue-500 text-white px-4 py-2 rounded"
// 			>
// 				Go Back
// 			</button>
// 			<h1 className="text-2xl font-bold mb-4">{category.name}</h1>
// 			{subcategories && subcategories.length > 0 ? (
// 				subcategories.map((subcategory) => (
// 					<div
// 						key={subcategory._id}
// 						className="mb-4"
// 					>
// 						<div className="flex justify-between">
// 							<h2 className="text-xl font-semibold mb-2">{subcategory.name}</h2>
// 							<button
// 								onClick={() => handleDeleteSubcategory(subcategory._id)}
// 								className="text-red-500"
// 							>
// 								Delete Subcategory
// 							</button>
// 						</div>
// 						<div className="space-y-2 mt-2">
// 							{subcategory.products && subcategory.products.length > 0 ? (
// 								subcategory.products.map((product) => (
// 									<div
// 										key={product._id}
// 										className="max-w-[900px] grid grid-cols-[1fr_2fr_1fr_1fr]  justify-between items-center bg-gray-100 p-2 rounded"
// 										// style={{ backgroundColor: product.bg }}
// 									>
// 										{/* <div className=" grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]  items-center"> */}
// 										<img
// 											src={product.img}
// 											alt={product.name}
// 											className="w-16 h-16 object-cover rounded"
// 										/>
// 										<span className="ml-4">{product.name}</span>
// 										<input
// 											type="color"
// 											value={product.color}
// 										/>
// 										{/* </div> */}
// 										{/* <div className="space-x-2"> */}
// 										<div className="flex gap-10 items-end justify-center">
// 											<button
// 												onClick={() => handleEditProduct(product._id)}
// 												className="text-blue-500 text-2xl"
// 											>
// 												<FaRegEdit />
// 											</button>
// 											<button
// 												onClick={() => handleDeleteProduct(product._id)}
// 												className="text-red-500 text-2xl"
// 											>
// 												<AiOutlineDelete />
// 											</button>
// 										</div>
// 										{/* </div> */}
// 									</div>
// 								))
// 							) : (
// 								<li>No products found</li>
// 							)}
// 						</div>
// 					</div>
// 				))
// 			) : (
// 				<div>No subcategories found</div>
// 			)}
// 		</div>
// 	)
// }

// export default CategoryDetails

import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { domainurl } from "../App"
import { AiOutlineDelete } from "react-icons/ai"
import { FaRegEdit, FaSave } from "react-icons/fa"

const CategoryDetails = ({ back }) => {
	const { id } = useParams()
	const [category, setCategory] = useState(null)
	const [loading, setLoading] = useState(true)
	const [subcategories, setSubcategories] = useState([])
	const [editSubcategoryId, setEditSubcategoryId] = useState(null)
	const [editSubcategoryName, setEditSubcategoryName] = useState("")
	const navigate = useNavigate()

	const goBack = () => {
		console.log("clicked")
		navigate(-1)
	}

	useEffect(() => {
		axios
			.get(`${domainurl}/api/products/category/${id}`)
			.then((response) => {
				setCategory(response.data)
				setLoading(false)
			})
			.catch((error) => {
				toast.error(error.message)
				setLoading(false)
			})
	}, [id])

	useEffect(() => {
		if (category && category.subcategories) {
			const fetchProductsForSubcategories = async () => {
				const subcategoriesWithProducts = await Promise.all(
					category.subcategories.map(async (subcategory) => {
						const response = await axios.get(
							`${domainurl}/api/products/subcategory/${subcategory._id}`
						)
						return {
							...subcategory,
							products: response.data.products,
						}
					})
				)
				setSubcategories(subcategoriesWithProducts)
			}
			fetchProductsForSubcategories()
		}
	}, [category])

	const handleDeleteSubcategory = (subcategoryId) => {
		if (window.confirm("Are you sure you want to delete this subcategory?")) {
			axios
				.delete(`${domainurl}/api/subcategories/${subcategoryId}`)
				.then((response) => {
					toast.success("Subcategory deleted successfully")
					setSubcategories(
						subcategories.filter((sub) => sub._id !== subcategoryId)
					)
				})
				.catch((error) => {
					toast.error(error.message)
				})
		}
	}

	const handleDeleteProduct = (productId) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			axios
				.delete(`${domainurl}/api/products/${productId}`)
				.then((response) => {
					toast.success("Product deleted successfully")
					setSubcategories(
						subcategories.map((sub) => ({
							...sub,
							products: sub.products.filter((prod) => prod._id !== productId),
						}))
					)
				})
				.catch((error) => {
					toast.error(error.message)
				})
		}
	}

	const handleEditSubcategory = (subcategoryId, subcategoryName) => {
		setEditSubcategoryId(subcategoryId)
		setEditSubcategoryName(subcategoryName)
	}

	const handleSaveSubcategory = (subcategoryId) => {
		axios
			.put(`${domainurl}/api/subcategories/${subcategoryId}`, {
				name: editSubcategoryName,
				category: category.name,
			})
			.then((response) => {
				toast.success("Subcategory updated successfully")
				setSubcategories(
					subcategories.map((sub) =>
						sub._id === subcategoryId
							? { ...sub, name: editSubcategoryName }
							: sub
					)
				)
				setEditSubcategoryId(null)
				setEditSubcategoryName("")
			})
			.catch((error) => {
				toast.error(error.message)
			})
	}

	const handleEditProduct = (productId) => {
		navigate(`/product/update/${productId}`)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (!category) {
		return <div>Category not found</div>
	}

	return (
		<div className="container mx-auto p-4">
			<button
				onClick={back}
				className="bg-blue-500 text-white px-4 py-2 rounded"
			>
				Go Back
			</button>
			<h1 className="text-2xl font-bold mb-4">{category.name}</h1>
			{subcategories && subcategories.length > 0 ? (
				subcategories.map((subcategory) => (
					<div
						key={subcategory._id}
						className="mb-4"
					>
						<div className="flex justify-between">
							{editSubcategoryId === subcategory._id ? (
								<input
									type="text"
									value={editSubcategoryName}
									onChange={(e) => setEditSubcategoryName(e.target.value)}
									className="text-xl font-semibold mb-2  border-2 border-black"
								/>
							) : (
								<h2 className="text-xl font-semibold mb-2">
									{subcategory.name}
								</h2>
							)}
							<div>
								{editSubcategoryId === subcategory._id ? (
									<button
										onClick={() => handleSaveSubcategory(subcategory._id)}
										className="border-2 bg-black text-green-500 px-4 py-1"
									>
										{/* <FaSave /> */}
										Save
									</button>
								) : (
									<button
										onClick={() =>
											handleEditSubcategory(subcategory._id, subcategory.name)
										}
										className="border-2 bg-black text-white px-4 py-1"
									>
										{/* <FaRegEdit /> */}
										Edit
									</button>
								)}
								<button
									onClick={() => handleDeleteSubcategory(subcategory._id)}
									className="border-2 bg-black text-white px-4 py-1"
								>
									{/* <AiOutlineDelete /> */}
									Delete
								</button>
							</div>
						</div>
						<div className="space-y-2 mt-2">
							{subcategory.products && subcategory.products.length > 0 ? (
								subcategory.products.map((product) => (
									<div
										key={product._id}
										className="max-w-[900px] grid grid-cols-[1fr_2fr_1fr_1fr] justify-between items-center bg-gray-100 p-2 rounded"
									>
										<img
											src={product.img}
											alt={product.name}
											className="w-16 h-16 object-cover rounded"
										/>
										<span className="ml-4">{product.name}</span>
										<input
											type="color"
											value={product.color}
										/>
										<div className="flex gap-10 items-end justify-center">
											<button
												onClick={() => handleEditProduct(product._id)}
												className="text-blue-500 text-2xl"
											>
												<FaRegEdit />
											</button>
											<button
												onClick={() => handleDeleteProduct(product._id)}
												className="text-red-500 text-2xl"
											>
												<AiOutlineDelete />
											</button>
										</div>
									</div>
								))
							) : (
								<li>No products found</li>
							)}
						</div>
					</div>
				))
			) : (
				<div>No subcategories found</div>
			)}
		</div>
	)
}

export default CategoryDetails
