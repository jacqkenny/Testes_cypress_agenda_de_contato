describe('Testes funcionalidades, editar, adicionar e deletar contatos', () => {
    beforeEach(() => {
      cy.visit('https://agenda-contatos-react.vercel.app/');
    });
  
    it('Teste adicionar novo contato', () => {
      const novoContato = {
        text: 'Sdney Fernandes',
        email: 'fsidney987@gmail.com',
        tel: '1234567890',
      };
  
      cy.get('.sc-gLDzan.ckeKmo').within(() => {
        cy.get('input[type="text"]').type('Sdney Fernandes');
        cy.get('input[type="email"]').type('fsidney987@gmail.com');
        cy.get('input[type="tel"]').type('1234567890');
  
        cy.get('.adicionar').click();
      });
  
      cy.get('.sc-beqWaB eQdhbg contato').first().within(() => {
        cy.get('.sc-dmqHEX frIrmM').within(() => {
          cy.get('.sc-eDDNvR.cTVgex').find('li').should('have.length', 1);
          cy.get('.sc-eDDNvR.cTVgex li').eq(0).should('contain', novoContato.text);
          cy.get('.sc-eDDNvR.cTVgex li').eq(0).should('contain', novoContato.email);
          cy.get('.sc-eDDNvR.cTVgex li').eq(0).should('contain', novoContato.tel);
  
          cy.get('.edit').click();
  
          cy.get('.sc-gLDzan.ckeKmo').should('be.visible');
  
          cy.get('.sc-gLDzan.ckeKmo.MuiButtonBase-root.MuiButton-root.MuiButton-text').click();
  
          cy.get('.delete').click();
  
          cy.get('.sc-eDDNvR cTVgex').find('li').should('not.exist');
        });
      });
    });
  });