export const httpHelper = () => {  // Exporta uma função chamada httpHelper, que cria um conjunto de funções para realizar requisições HTTP.
	const customFetch = async (url, options = {}) => {  // Define uma função assíncrona customFetch que recebe uma URL e opções de configuração.
		const defaultMethod = "GET";  // Define o método HTTP padrão como "GET".
		const defaultHeaders = {  // Define os cabeçalhos padrão para a requisição.
			"Content-Type": "application/json",  // Define o tipo de conteúdo como JSON.
			Accept: "application/json",  // Define que a resposta esperada é em JSON.
		};
		const controller = new AbortController();  // Cria um novo controlador de abortos para gerenciar requisições canceláveis.
		options.signal = controller.signal;  // Adiciona o sinal do controlador às opções, permitindo cancelar a requisição.

		options.method = options.method || defaultMethod;  // Se um método não for fornecido, usa o método padrão (GET).
		options.headers = options.headers  // Define os cabeçalhos da requisição, mesclando cabeçalhos personalizados com os padrões.
			? { ...defaultHeaders, ...options.headers }  // Se cabeçalhos personalizados forem fornecidos, mescla-os.
			: defaultHeaders;  // Caso contrário, usa os cabeçalhos padrão.

		options.body = JSON.stringify(options.body) || false;  // Converte o corpo da requisição em JSON ou define como false se não houver corpo.
		if (!options.body) delete options.body;  // Se não houver corpo, remove a propriedade body das opções.

		setTimeout(() => {  // Define um timeout para abortar a requisição após 3 segundos.
			controller.abort();  // Chama o método abort do controlador para cancelar a requisição.
		}, 3000);

		try {
			const response = await fetch(url, options);  // Tenta realizar a requisição usando fetch.
			return await response.json();  // Retorna a resposta da requisição convertida em JSON.
		} catch (err) {  // Captura qualquer erro durante a requisição.
			return err;  // Retorna o erro.
		}
	};

	const get = (url, options = {}) => customFetch(url, options);  // Define uma função get que chama customFetch com método GET.

	const post = (url, options) => {  // Define uma função post para realizar requisições POST.
		options.method = "POST";  // Define o método como POST.
		return customFetch(url, options);  // Chama customFetch com as opções atualizadas.
	};

	const put = (url, options) => {  // Define uma função put para realizar requisições PUT.
		options.method = "PUT";  // Define o método como PUT.
		return customFetch(url, options);  // Chama customFetch com as opções atualizadas.
	};

	const del = (url, options) => {  // Define uma função del para realizar requisições DELETE.
		options.method = "DELETE";  // Define o método como DELETE.
		return customFetch(url, options);  // Chama customFetch com as opções atualizadas.
	};

	return {  // Retorna um objeto contendo as funções de requisição (get, post, put, del).
		get,
		post,
		put,
		del,
	};
};
