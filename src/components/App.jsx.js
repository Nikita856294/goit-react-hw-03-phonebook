import './App.css';
import React, { Component } from 'react';
import GlobalStyle from './Components/GlobalStyle';
import Section from './Components/Section';
import Container from './Components/Container';
import Form from './Components/ContactForm';
import ContactList from './Components/ContactsList';
import Filter from './Components/Filter';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const findName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (findName) {
      return alert(` ${name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  render() {
    const nozmalizedContacts = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(nozmalizedContacts),
    );
    return (
      <div className="root">
        <GlobalStyle />
        <Container>
          <h1>Phonebook</h1>
          <Form onSubmit={this.addContact} />
          <Section title={'Contacts'}>
            <Filter value={this.filter} onChange={this.changeFilter} />
            <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
          </Section>
        </Container>
      </div>
    );
  }
}

export default App;
