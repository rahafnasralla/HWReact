import {Component} from 'react';
class TODO extends Component {
    constructor(props) {
        super(props)
        this.state = {
            add_update : "Add",
            reset_cancel : "Reset",
            title : "",
            desc : "",
            ptr : "",
            todo : []
        }
    }

    onTitleChanged(e) {
        this.setState({
            title : e.target.value
        })
    }
    onDescChanges(e) {
        this.setState({
            desc : e.target.value
        })
    }

    async add(e) {
        e.preventDefault();
        if(this.state.add_update==="Add") {
        let num = this.state.todo.length +1 ;
        await   this.setState({
                todo : [...this.state.todo,{title :this.state.title, id : num,
                            desc : this.state.desc
                            }],
                title : "",
                desc: ""
            }) 
        }
        
        if(this.state.add_update==="Update") {
            const _todo = JSON.parse(JSON.stringify(this.state.todo));
            let i =this.state.ptr-1;
            _todo[i].title = this.state.title;
            _todo[i].desc = this.state.desc;
            this.setState({
                add_update : "Add",
                reset_cancel : "reset",
                todo : _todo,
                title : "",
                desc: ""
            })

        }
        
    }

    _reset(e){
        e.preventDefault();
        this.setState({
            title : "",
            desc : ""
        })
        if(this.state.reset_cancel==="Cancel") {
            this.setState(
                {
                    add_update : "Add",
                    reset_cancel : "reset"
                }
            )
        }
    }

    _edit(e) {
        e.preventDefault();
        const _todo = JSON.parse(JSON.stringify(this.state.todo));
        this.setState({title :_todo[e.target.value].title , ptr : _todo[e.target.value].id ,
        desc : _todo[e.target.value].desc ,
        add_update :"Update",
        reset_cancel: "Cancel" } 
         )
        
    }

    async _delete(e) {
        e.preventDefault();
        const _todo = JSON.parse(JSON.stringify(this.state.todo));
        _todo.splice(e.target.value, 1);
        await this.setState({ todo : _todo
        ,title : "", desc : "" });    
    }


    render() {
        return (
            <div>
                <div style={{margin : '10px 0px 10px 0px'}}>
                    Simple TODO List 
                </div>
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                    </div>
                    <input type="text" name="title" id="title" 
                        value ={this.state.title} onChange={this.onTitleChanged.bind(this)} 
                    />
                    <div>
                        <label htmlFor="desc" >Description</label>
                    </div>
                    <textarea name="desc" id="desc" cols="30" rows="10"
                    value ={this.state.desc} onChange={this.onDescChanges.bind(this)} ></textarea>
                    <div>
                    <button type='button' style ={{margin : "3px"}} onClick={this.add.bind(this)}>{this.state.add_update}</button>

                    <button type='button' style ={{margin : "3px"}} onClick={this._reset.bind(this)}>{this.state.reset_cancel}</button>
                    </div>
                </form>

                <div>
                    {this.state.todo.map((item,idx) => {
                        return (
                            <div key={idx}>
                                <h4>{item.title}</h4>
                                <div>{item.desc}</div>
                                <button type='button' style ={{margin : "3px"}} value={idx} onClick={this._edit.bind(this)} >Edit</button>
                                <button type='button' style ={{margin : "3px"}} value={idx} onClick={this._delete.bind(this)}>Delete</button>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default TODO; 