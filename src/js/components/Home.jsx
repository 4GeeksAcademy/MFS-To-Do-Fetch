import React, { useEffect, useState } from "react";

//create your first component


const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])
	const crearUsuario = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/MartinF", {
				method: "POST",
				headers: { "Content-Type": "application/json" }
			});

			if (response.ok) {
				console.log("Usuario creado correctamente");
			} else {
				console.log("Error al crear usuario:", response.status);
			}
		} catch (error) {
			console.log("Error al crear usuario:", error);
		}
	};

	const obtenerTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/MartinF")
			console.log(response)
			if (response.status == 404) {
				crearUsuario()
				return
			}
			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.log(error)
		}

	}

	const agregarTarea = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/MartinF", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					"label": tarea,
					"is_done": false
				})

			})
				console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		obtenerTareas()
	}, [])

	return (
		<div className="container">
			<h1>TODO List</h1>
			<input
				type="text"
				className="form-control"
				value={tarea}
				onChange={(e) => setTarea(e.target.value)}
			/>
			<button className="btn btn-success" onClick={(e)=>agregarTarea(e)}>Crear </button>
		</div>
	);
};

export default Home;