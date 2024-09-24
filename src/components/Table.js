import React from "react";  // Importa React.
import Form from "./Form";  // Importa o componente Form para editar os dados do usuário.

const Table = ({ users, postUser, updateUser, deleteUser }) => {  // Define o componente funcional Table, recebendo props.
	const showUpdateUser = id => {  // Função para mostrar ou ocultar o formulário de atualização para um usuário específico.
		const form = document.getElementsByClassName(`show-form-${id}`);  // Seleciona o elemento do formulário correspondente ao id do usuário.
		form[0].classList.toggle("hide-form");  // Alterna a classe "hide-form" para mostrar ou esconder o formulário.
	};

	const Row = ({ user }) => {  // Componente interno Row para representar uma linha da tabela para cada usuário.
		return (
			<>
				<div className='row'>  // Div para a linha da tabela.
					<div>{user.name}</div>  // Exibe o nome do usuário.
					<div>{user.email}</div>  // Exibe o email do usuário.
					<div>{user.phone}</div>  // Exibe o telefone do usuário.
					<div>{user.companies.name}</div>  // Exibe o nome da empresa associada ao usuário.
					<div className='buttons'>  // Div para os botões de ação.
						<button onClick={() => showUpdateUser(user.id)}>Update</button>  // Botão para atualizar, chama showUpdateUser com o id do usuário.
						<button onClick={() => deleteUser(user.id)}>Delete</button>  // Botão para deletar, chama deleteUser com o id do usuário.
					</div>
				</div>
				<div className={`hide-form show-form-${user.id}`}>  // Div que contém o formulário de atualização, inicia oculta.
					<Form userData={user} postUser={postUser} updateUser={updateUser} />  // Renderiza o componente Form, passando os dados do usuário e funções de manipulação.
				</div>
			</>
		);
	};

	return (
		<div className='table'>  // Div principal da tabela.
			<div className='titles'>  // Div para os títulos das colunas.
				<div>Name</div>  // Título da coluna para o nome.
				<div>Email</div>  // Título da coluna para o email.
				<div>Phone</div>  // Título da coluna para o telefone.
				<div>Company</div>  // Título da coluna para a empresa.
				<div>Actions</div>  // Título da coluna para ações.
			</div>
			<div className='rows'>  // Div para as linhas da tabela.
				{users && users.map(u => <Row user={u} key={u.id} />)}  // Mapeia a lista de usuários e renderiza uma Row para cada um.
			</div>
		</div>
	);
};

export default Table;  // Exporta o componente Table para uso em outras partes da aplicação.

