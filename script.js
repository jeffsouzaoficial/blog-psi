// Dark mode toggle

(function () {
/*caixinha "toggle" = procure no HTML o elemento com id "dark-toggle"
se (toggle é NULO / NÃO ACHOU) {pare aqui, não execute mais nada} */
  var toggle = document.getElementById('dark-toggle');
  if (!toggle) return;

 /*Função chamada "setTheme" que recebe um valor "escuro" (verdadeiro ou falso):
  - Se escuro for verdadeiro, adiciona a classe "dark-mode" no body; se for falso, remove
  - Muda o texto escondido do botão: se está escuro, fala "Ativar modo claro"; se está claro, fala "Ativar modo escuro. Acessibilidade (só quem usa leitor de tela percebe)."
  - Salva no navegador: "1" se escuro, "0" se claro */ 
  function setTheme(dark) {
    document.body.classList.toggle('dark-mode', dark);
    toggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
    localStorage.setItem('dark-mode', dark ? '1' : '0');
  }

/*"Se a última escolha salva foi modo escuro, já ativa o modo escuro ao carregar a página." */  
  if (localStorage.getItem('dark-mode') === '1') setTheme(true);

/*"Quando o usuário clicar no botão, inverte o estado atual: se está escuro, fica claro; se está claro, fica escuro." */  
  toggle.addEventListener('click', function () {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
})();

// Posts são renderizados via Liquid no server-side

// Header compacto ao rolar
(function () {
  var header = document.querySelector('.site-header');
  var headerTop = document.querySelector('.header-top');
/*"Se um dos dois não existir, pare." Proteção para não quebrar se a página não tiver header. */
  if (!header || !headerTop) return;

 /*"Se o usuário rolou mais que a altura do tí­tulo grande, adiciona a classe site-header--compact ao header. Senão, remove." */ 
 /*função atualizarCabecalho() {
  se (quantidadeRolada > alturaDoTitulo) {
    cabecalho.listaDeClasses.adicionar('site-header--compact')
  } senão {
    cabecalho.listaDeClasses.remover('site-header--compact')
  }
} */ 
 function updateHeader() {
    if (window.scrollY > headerTop.offsetHeight) {
      header.classList.add('site-header--compact');
    } else {
      header.classList.remove('site-header--compact');
    }
  }

/*"Quando o usuário rolar a página, execute a função. E execute uma vez agora ao carregar também."*/
// { passive: true } avisa o navegador que esta funÃ§Ã£o nÃ£o vai cancelar o scroll,
// permitindo que a rolagem da pÃ¡gina fique mais suave e sem travamentos.  
window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
})();

// Hamburger menu
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var wrapper = document.querySelector('.bottom-row-inner');
  if (!toggle || !wrapper) return; // Se algum dos dois nÃ£o existir, para por segurança

  toggle.addEventListener('click', function () {  // Escuta o clique no botão hamburger
    wrapper.classList.toggle('nav-open');
    toggle.setAttribute(
      'aria-label',  // Atributo de acessibilidade
      wrapper.classList.contains('nav-open') ? 'Fechar menu' : 'Abrir menu'
    );
  });
})();

function validarContato(e) {
  const email = document.getElementById('contato-email').value.trim();
  const whats = document.getElementById('contato-whats').value.trim();
  const msg = document.getElementById('contato-mensagem').value.trim();

  /*se (email ESTÃ VAZIO E whats ESTÃ VAZIO)
  "Se nem email nem WhatsApp foram preenchidos, então..." */
  if (!email && !whats) {
    alert('Preencha seu e-mail ou WhatsApp.');
    return false;
  }

  /* se (email NÃO ESTIVER VAZIO E NÃO(formato-de-email).testa(email))
  Se o campo de email foi preenchido e o email não passar no teste de formato vÃ¡lido, então..." */
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Informe um e-mail válido.');
    return false;
  }

  /* se (whats NÃO ESTIVER VAZIO E NÃO(10 a 13 di­gitos).testa(whats.limpaTudoQueNaoENumero())) 
  "Se o campo WhatsApp foi preenchido e, depois de remover tudo que não for número, não tiver entre 10 e 13 dígitos, então mostre o alerta de WhatsApp inválido."*/
  if (whats && !/^\d{10,13}$/.test(whats.replace(/\D/g, ''))) {
    alert('Informe um WhatsApp válido com DDD (apenas números).');
    return false;
  }

  /*Se o campo de mensagem estiver vazio*/
  if (!msg) {
    alert('Descreva o que está sentindo.');
    return false;
  }
  alert('Mensagem enviada! Em breve entrarei em contato.');
  return false;
}
