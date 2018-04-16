import React, {Component} from 'react';
import {
  Button, Card, InputLabel, Panel, PanelBody, Table
} from '@digituz/react-components';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentItem: '',
      toDoItems: [
        { id: 123, description: 'buy pizza' },
        { id: 124, description: 'buy chocolate' },
        { id: 125, description: 'conquer the world' },
      ]
    };
  }

  updateItem(item) {
    this.setState({
      currentItem: item,
    });
  }

  addItem() {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.push({
      id: (new Date()).getTime(),
      description: this.state.currentItem,
    });
    this.setState({
      toDoItems,
      currentItem: '',
    });
  }

  removeItem(itemToRemove) {
    const toDoItems = this.state.toDoItems.filter((item) => {
      return item.id !== itemToRemove.id;
    });

    this.setState({
      toDoItems,
    });
  }

  render() {
    const columns = [
      { title: 'Description', property: 'description' },
      {
        title: 'Action',
        headerClass: 'action-column',
        columnClass: 'center',
        render: (item) => (<Button className='danger' onClick={() => {this.removeItem(item)}} text="X" />)
      }
    ];

    return (
      <Panel>
        <PanelBody>
          <div className="sm-12">
            <Card title="Add New Item">
              <InputLabel
                label="Add a new task"
                inputId="new-to-do"
                onBlur={(item) => { this.updateItem(item); }}
                value={this.state.currentItem}
              />
              <Button onClick={() => {this.addItem()}} text="Add Item" />
            </Card>

            <Card title="To Do Items">
              <Table columns={columns} data={this.state.toDoItems} />
            </Card>
          </div>
        </PanelBody>
      </Panel>
    );
  }
}

export default App;
