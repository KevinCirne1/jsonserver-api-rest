import React, { useState, useEffect } from "react";  // Importa React e hooks useState e useEffect.
import Form from "./Form";  // Importa o componente Form para adicionar novos usuários.
import Table from "./Table";  // Importa o componente Table para exibir a lista de usuários.

import { httpHelper } from "../helpers/httpHelper";  // Importa o helper HTTP que foi definido anteriormente.

const CrudUser = () => {  // Define o componente funcional CrudUser.
	const [users, setUsers] = useState(null);  // Cria um estado para armazenar a lista de usuários.

	const url = "http://localhost:5000/users";  // Define a URL da API para acessar os usuários.
	const api = httpHelper();  // Inicializa o helper HTTP.

	useEffect(() => {  // Hook para executar um efeito colateral.
		getUsers();  // Chama a função getUsers ao montar o componente.
	}, []);  // O array vazio indica que o efeito será executado apenas uma vez, semelhante a componentDidMount.

	const postUser = user => {  // Função para enviar um novo usuário para a API.
		api
			.post(`${url}`, { body: user })  // Chama o método post do helper HTTP, passando o usuário.
			.then(res => getUsers())  // Após a criação do usuário, chama getUsers para atualizar a lista.
			.catch(err => console.log(err));  // Captura e loga qualquer erro que ocorra.
	};

	const updateUser = (id, user) => {  // Função para atualizar um usuário existente.
		api
			.put(`${url}/${id}`, { body: user })  // Chama o método put do helper HTTP, passando o ID e os dados atualizados.
			.then(res => getUsers())  // Atualiza a lista de usuários após a atualização.
			.catch(err => console.log(err));  // Captura e loga qualquer erro que ocorra.
	};

	const deleteUser = id => {  // Função para deletar um usuário.
		api
			.del(`${url}/${id}`, {})  // Chama o método del do helper HTTP, passando o ID do usuário a ser deletado.
			.then(res => getUsers())  // Atualiza a lista de usuários após a deleção.
			.catch(err => console.log(err));  // Captura e loga qualquer erro que ocorra.
	};

	const getUsers = () => {  // Função para obter a lista de usuários da API.
		api
			.get(`${url}?_expand=companies`)  // Chama o método get do helper HTTP, incluindo dados de empresas relacionadas.
			.then(res => {
				setUsers(res);  // Atualiza o estado users com a resposta da API.
			})
			.catch(err => console.log(err));  // Captura e loga qualquer erro que ocorra.
	};

	if (!users) return null;  // Se a lista de usuários ainda não foi carregada, retorna null (não renderiza nada).

	return (  // Retorna o JSX a ser renderizado.
		<>
			<h3>New user</h3>  // Cabeçalho para o formulário de novo usuário.
			<Form postUser={postUser} />  // Renderiza o componente Form, passando a função postUser como prop.
			<div className='all-users'>  // Contêiner para a lista de todos os usuários.
				<h3>All users</h3>  // Cabeçalho para a tabela de usuários.
				<Table  // Renderiza o componente Table, passando os usuários e funções de manipulação.
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/>
			</div>
		</>
	);
};

export default CrudUser;  // Exporta o componente CrudUser para uso em outras partes da aplicação.

