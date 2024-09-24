import React, { useState } from "react";  // Importa React e o hook useState.
import DropComapies from "./DropCompanies";  // Importa o componente DropCompanies para selecionar empresas.

const Form = ({ userData = {}, postUser, updateUser }) => {  // Define o componente funcional Form, recebendo props.
	const [user, setUser] = useState({  // Cria um estado para armazenar os dados do usuário.
		name: userData.name ?? "",  // Inicializa o nome com o valor de userData ou uma string vazia.
		username: userData.username ?? "",  // Inicializa o username com o valor de userData ou uma string vazia.
		email: userData.email ?? "",  // Inicializa o email com o valor de userData ou uma string vazia.
		phone: userData.phone ?? "",  // Inicializa o telefone com o valor de userData ou uma string vazia.
		companiesId: userData.companiesId ?? "0",  // Inicializa o companiesId com o valor de userData ou "0".
	});

	const handleValue = e => {  // Função para lidar com mudanças nos campos de entrada.
		setUser({ ...user, [e.target.name]: e.target.value });  // Atualiza o estado do usuário, mantendo os outros campos intactos.
	};

	const submitUser = e => {  // Função chamada ao enviar o formulário.
		e.preventDefault();  // Prevê o comportamento padrão de envio do formulário.

		if (user.companiesId === "0") return;  // Se nenhuma empresa for selecionada, não faz nada.

		if (userData.id) {  // Se userData contém um id (indicando que está atualizando um usuário existente)...
			updateUser(userData.id, user);  // Chama a função updateUser com o id do usuário e os dados atualizados.
		} else {
			postUser(user);  // Caso contrário, chama a função postUser para adicionar um novo usuário.
		}
	};

	return (  // Retorna o JSX a ser renderizado.
		<form onSubmit={submitUser} className='row'>  // Define o formulário com a função submitUser chamada ao ser enviado.
			<input
				type='text'
				name='name'  // Nome do campo (usado para identificar no estado).
				value={user.name}  // Define o valor do campo como o nome do usuário.
				placeholder='Name'  // Texto de espaço reservado para o campo.
				onChange={e => handleValue(e)}  // Chama handleValue ao mudar o valor do campo.
			/>
			<input
				type='email'
				name='email'  // Nome do campo para o email.
				value={user.email}  // Define o valor do campo como o email do usuário.
				placeholder='Email'  // Texto de espaço reservado para o campo.
				onChange={e => handleValue(e)}  // Chama handleValue ao mudar o valor do campo.
			/>
			<input
				type='tel'
				name='phone'  // Nome do campo para o telefone.
				value={user.phone}  // Define o valor do campo como o telefone do usuário.
				placeholder='Phone (10)'  // Texto de espaço reservado para o campo.
				pattern='[0-9]{10}'  // Define um padrão para validar o número de telefone.
				onChange={e => handleValue(e)}  // Chama handleValue ao mudar o valor do campo.
			/>
			<DropComapies companiesId={user.companiesId} handleValue={handleValue} />  // Renderiza o componente DropCompanies, passando o ID da empresa e handleValue.
			<input
				className='btn-submit'
				type='submit'  // Botão de envio do formulário.
				value={`${!userData.id ? "Add new user" : "Save user"}`}  // O texto do botão muda dependendo se está adicionando ou editando.
			/>
		</form>
	);
};

export default Form;  // Exporta o componente Form para uso em outras partes da aplicação.

