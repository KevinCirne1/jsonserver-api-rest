import { LogoIcon } from "./assets/icons";  // Importa o componente LogoIcon de um arquivo de ícones localizado na pasta assets.
import CrudUser from "./components/CrudUser";  // Importa o componente CrudUser de um arquivo localizado na pasta components.
import "./styles/App.css";  // Importa o arquivo de estilo CSS para aplicar estilos ao componente App.

function App() {  // define o componente funcional App.
	return (  // vai retornar o JSX que vai ser renderizado
		<>  
			<header>  // Define a seção de cabeçalho do aplicativo.
				<div className='header__content'>  // Div tem o conteúdo do cabeçalho
					<div className='logo'>  // Div que tem o logotipo e o título.
						<LogoIcon />  // Renderiza o componente LogoIcon
						<strong>JSON SERVER API</strong>  // Renderiza um texto em negrito que indica o nome da aplicação.
					</div>
				</div>
			</header>
			<main>  // Define a seção principal do aplicativo.
				<CrudUser />  // Renderiza o componente CrudUser, que provavelmente lida com operações de criação, leitura, atualização e exclusão (CRUD) de usuários.
			</main>
		</>  
	);
}

export default App;  // Exporta o componente App para que possa ser importado e utilizado em outros arquivos.
