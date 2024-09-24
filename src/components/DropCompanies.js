import React, { useState, useEffect } from "react";  // Importa React e hooks useState e useEffect.
import { httpHelper } from "../helpers/httpHelper";  // Importa o helper HTTP para realizar requisições.

const DropCompanies = ({ companiesId, handleValue }) => {  // Define o componente funcional DropCompanies, recebendo props.
	const [companies, setCompanies] = useState(null);  // Cria um estado para armazenar a lista de empresas.
	const [company, setCompany] = useState(companiesId);  // Cria um estado para armazenar a empresa selecionada, inicializando com companiesId.

	const url = "http://localhost:5000/companies";  // Define a URL da API para acessar as empresas.
	const api = httpHelper();  // Inicializa o helper HTTP.

	useEffect(() => {  // Hook para executar um efeito colateral.
		api
			.get(url)  // Chama o método get do helper HTTP para obter a lista de empresas.
			.then(res => {  // Se a requisição for bem-sucedida...
				setCompanies([{ id: 0, name: "Select Company" }, ...res]);  // Adiciona uma opção padrão e armazena a resposta no estado companies.
			})
			.catch(err => console.log(err));  // Captura e loga qualquer erro que ocorra.
	}, []);  // O array vazio indica que o efeito será executado apenas uma vez, semelhante a componentDidMount.

	if (!companies) return null;  // Se a lista de empresas ainda não foi carregada, retorna null (não renderiza nada).

	return (  // Retorna o JSX a ser renderizado.
		<select
			name='companiesId'  // Nome do elemento select.
			value={company}  // Define o valor atual do select como a empresa selecionada.
			onChange={e => {  // Define uma função para lidar com mudanças na seleção.
				setCompany(e.target.value);  // Atualiza o estado company com o valor selecionado.
				handleValue(e);  // Chama a função handleValue passada como prop, passando o evento.
			}}
		>
			{companies.map(c => (  // Mapeia a lista de empresas para criar as opções do select.
				<option value={c.id} key={c.id}>  // Para cada empresa, cria um elemento option com o id como valor e o nome como texto.
					{c.name}
				</option>
			))}
		</select>
	);
};

export default DropCompanies;  // Exporta o componente DropCompanies para uso em outras partes da aplicação.
