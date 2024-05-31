describe('Testar funcionalidades, editar, adicionar e excluir contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
  });

  it('Teste adicionar, editar e excluir contato', () => {
    const novoContato = {
      text: 'Sdney Fernandes',
      email: 'fsidney@gmail.com',
      tel: '71992032184',
    };

    //Estava dando um erro que eu não conseguia resolver, então adicionei varios log e screenshots, para inserir tempo e expecificidade para identificar o erro

    cy.log('Adicionando novo contato');
    cy.get('.sc-gLDzan.ckeKmo').within(() => {
      cy.get('input[type="text"]').type(novoContato.text);
      cy.get('input[type="email"]').type(novoContato.email);
      cy.get('input[type="tel"]').type(novoContato.tel);
      cy.get('.adicionar').click();
    });

    cy.log('Novo contato adicionado');
    cy.screenshot('novo-contato-adicionado');

    cy.log('Verificando novo contato adicionado');
    cy.get('.sc-beqWaB.eQdhbg.contato').last().within(() => {
      cy.get('.sc-dmqHEX.frIrmM').within(() => {
        cy.get('.sc-eDDNvR.cTVgex li').eq(0).should('contain', novoContato.text);
        cy.get('.sc-eDDNvR.cTVgex li').eq(1).should('contain', novoContato.tel);
        cy.get('.sc-eDDNvR.cTVgex li').eq(2).should('contain', novoContato.email);
      });
    });

    cy.log('Novo contato verificado');
    cy.screenshot('novo-contato-verificado');

    cy.get('.sc-beqWaB.eQdhbg.contato').last().within(() => {
      cy.log('Clicando no botão de editar');
      cy.get('.edit').click();
    });

    cy.log('Esperando o formulário de edição ser visível');
    cy.get('.sc-gLDzan.ckeKmo').should('be.visible');
    cy.screenshot('formulario-edicao-visivel');

    cy.log('Editando informações do contato');
    cy.get('.sc-gLDzan.ckeKmo').within(() => {
      cy.get('input[type="text"]').clear().type('Sdney Pereira Fernandes');
      cy.get('input[type="email"]').clear().type('fsidney.pereira@gmail.com');
      cy.get('input[type="tel"]').clear().type('71992032185');
      cy.get('button[type="submit"]').click(); 
    });

    cy.log('Contato editado');
    cy.screenshot('contato-editado');

    cy.log('Verificando contato editado');
    cy.get('.sc-beqWaB.eQdhbg.contato').last().within(() => {
      cy.get('.sc-dmqHEX.frIrmM').within(() => {
        cy.get('.sc-eDDNvR.cTVgex li').eq(0).should('contain', 'Sdney Pereira Fernandes');
        cy.get('.sc-eDDNvR.cTVgex li').eq(1).should('contain', '71992032185');
        cy.get('.sc-eDDNvR.cTVgex li').eq(2).should('contain', 'fsidney.pereira@gmail.com');
      });
    });

    cy.log('Contato editado verificado');
    cy.screenshot('contato-editado-verificado');

    cy.get('.sc-beqWaB.eQdhbg.contato').last().within(() => {
      cy.log('Clicando no botão de deletar');
      cy.get('.delete').click();
    });

    cy.log('Contato deletado');
    cy.screenshot('contato-deletado');

    cy.log('Verificando se o contato foi excluído');
    cy.get('.sc-beqWaB.eQdhbg.contato').last().within(() => {
      cy.get('.sc-eDDNvR.cTVgex li').should('not.contain', 'Sdney Pereira Fernandes');
    });

    cy.log('Contato excluído verificado');
    cy.screenshot('contato-excluido-verificado');
  });
});

