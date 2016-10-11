import uuid from 'node-uuid';
import Notes from './Notes.jsx';
import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Learn Webpack'
                },
                {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry'
                }
            ]
        }
    }
    render() {
        const notes = this.state.notes;

        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} onEdit={this.editNote} onDelete={this.deleteNode} />
            </div>
        );
    }
    addNote = () => {
        // 这里 = () => {} 的写法是从哪里来的？？ ES7...
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'New task'
            }])
        });
    }
    editNote = (id, task) => {
        if(!task.trim()){
            return;
        }
        
        const notes = this.state.notes.map(note => {
            if(note.id === id && task){
                note.task = task;
            }
            
            return note;
        });
        
        this.setState({notes});
    }
    deleteNode = (id, e) => {
        e.stopPropagation();
        
        this.setState({
            notes: this.state.notes.filter(note => note.id !== id)
        });
    }
}