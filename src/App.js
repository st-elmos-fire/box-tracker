
import React, { Component } from 'react'
import fire from './fire'
import Logo from './Logo.png'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: null,
      location: '',
      boxes: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const boxesRef = fire.database().ref('Boxes')
    boxesRef.orderByChild('number').on('value', (snapshot) => {
      let boxes = snapshot.val()
      let newState = []
      for (let box in boxes) {
        newState.push({
          id: box,
          number: parseInt(boxes[box].number, 10),
          location: boxes[box].location,
          contents: boxes[box].contents
        })
      }
      this.setState({
        boxes: newState
      })
    })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const boxesRef = fire.database().ref('Boxes')
    const box = {
      number: parseInt(this.state.number),
      location: this.state.location,
      contents: this.state.contents.split('\n')
    }
    boxesRef.push(box)
    this.setState({
      number: null,
      location: '',
      contents: ''
    })
  }

  removeBox (boxId) {
    const boxRef = fire.database().ref(`/Boxes/${boxId}`)
    boxRef.remove()
  }

  editBox (boxId) {
    this.state.boxes.map((box) => {
      if (box.id === boxId) {
        this.setState({
          number: parseInt(box.number, 10),
          location: box.location,
          contents: box.contents.join(',').replace(/,/g, '\n')
        })
        this.removeBox(boxId)
      }
    })
  }

  // Renders a sorted list of boxes in order of box number
  showBoxes () {
    return [].concat(this.state.boxes)
    .sort((a, b) => parseInt(a.number, 10) - parseInt(b.number, 10))
    .map((box) => {
      return (
        <li key={box.id} className={`box to-${box.location.toLowerCase().replace(' ', '-')}`}>
          <h2>Box #: {box.number}</h2>
          <span className='destination'>{box.location}</span>
          <ul>
            {box.contents.map((item) => {
              return (
                <li key={item}>{item}</li>
              )
            })}
          </ul>
          <button onClick={() => this.editBox(box.id)}>Edit Box</button>
          <button onClick={() => this.removeBox(box.id)}>Delete Box</button>
        </li>
      )
    })
  }

  render () {
    return (
      <div>
        <h1><img src={Logo} alt='Box tracker' />Box tracker</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='input-container'>
            <label htmlFor='number'>Add the box number</label>
            <input type='number' name='number' placeholder='Box #' onChange={this.handleChange} value={this.state.number} />
          </div>
          <div className='input-container'>
            <label htmlFor='location'>Which room should this box go in the new house?</label>
            <select name='location' value={this.state.location} onChange={this.handleChange}>
              <option>Select room</option>
              <option value='Kitchen'>Kitchen</option>
              <option value='Dining Room'>Dining Room</option>
              <option value='Store Room'>Store Room</option>
              <option value='Living Room'>Living Room</option>
              <option value='Bathroom'>Bathroom</option>
              <option value='Bedroom 1'>Bedroom 1</option>
              <option value='Bedroom 2'>Bedroom 2</option>
              <option value='Bedroom 3'>Bedroom 3</option>
              <option value='Bedroom 4'>Bedroom 4</option>
              <option value='Garden Shed'>Garden Shed</option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor='contents'>What is in the box? (Each item on it's own line)</label>
            <textarea name='contents' placeholder='What does the box contain?' onChange={this.handleChange} value={this.state.contents} />
          </div>
          <button>Update box </button>
        </form>
        <ul>
          { this.showBoxes() }
        </ul>
      </div>
    )
  }
}

export default App
