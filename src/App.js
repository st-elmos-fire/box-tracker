import React, { Component } from 'react'
import fire from './fire'
import Logo from './Logo.png'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: null,
      location: '',
      boxes: [],
      orderBy: 'number',
      showContents: true
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

  toggleContentShow () {
    this.setState({
      showContents: !this.state.showContents // flip boolean value
    }, function () {
      console.log(this.state)
    }.bind(this))
  }

  handleSubmit (e) {
    e.preventDefault()
    const boxesRef = fire.database().ref('Boxes')
    const box = {
      number: parseInt(this.state.number, 10),
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

  // TODO: This can't be added until the edit box issue is fixed
  claimBox (number) {
    // e.preventDefault()
    const boxesRef = fire.database().ref('Boxes')
    const box = {
      number: number,
      location: 'Unassigned',
      contents: []
    }
    boxesRef.push(box)
  }

  removeBox (boxId) {
    const boxRef = fire.database().ref(`/Boxes/${boxId}`)
    boxRef.remove()
  }

  // FIXME: Refactor these effectively deletes and recreates the box, which is not ideal behaviour
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
      return (box.id)
    })
  }

  // Renders a sorted list of boxes in order of box number
  // TODO: Add order by 'latest' (will require a timestamp added to the db)
  showBoxes (orderBy = this.state.orderBy, showContents = this.state.showContents) {
    let sortingMethod = ''
    switch (orderBy) {
      case 'number':
        sortingMethod = (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
        break
      case 'numberReverse':
        sortingMethod = (b, a) => parseInt(a.number, 10) - parseInt(b.number, 10)
        break
      case 'location':
        sortingMethod = (b, a) => {
          var nameA = a.location.toUpperCase() // ignore upper and lowercase
          var nameB = b.location.toUpperCase() // ignore upper and lowercase
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1
          }

          // names must be equal
          return 0
        }
        break
    }

    return [].concat(this.state.boxes)
      .sort(sortingMethod)
      .map((box) => {
        return (
          <li key={box.id} className={`box to-${box.location.toLowerCase().replace(' ', '-')}`}>
            <h2>Box #: {box.number}</h2>
            <span className='destination'>{box.location}</span>
            {(showContents) ? this.showBoxContents(box) : null}
            <button onClick={() => this.editBox(box.id)}>
              Edit Box
            </button>
            <button onClick={() => this.removeBox(box.id)}>
              Delete Box
            </button>
          </li>
        )
      })
  }

  showBoxContents (box) {
    if (box.contents && box.contents.length) {
      return (
        <ul>
          {box.contents.map((item) => {
            return (
              <li key={item + box.id}>
                {item}
              </li>
            )
          })}
        </ul>
      )
    }
  }

  // search (query) {
  //   // TODO add search
  // }

  // exportForPrint (type) {
  //   // TODO add export function which creates a printable version
  //   // either with or without box contents and orders by room
  // }

  render () {
    return (
      <div>
        <h1><img src={Logo} alt='Box tracker' />Box tracker</h1>
        <div className='order-and-filter'>
          <label>Sort order
          <select name='orderBy' value={this.state.orderBy} onChange={this.handleChange}>
            <option value='number'>
              Number Order
            </option>
            <option value='numberReverse'>
              Reverse Number Order
            </option>
            <option value='location'>
              Location Order
            </option>
          </select>
          </label>
          <label>
            Show box contents?
            <input
              type='checkbox'
              name='showContents'
              checked={this.state.showContents}
              onChange={this.toggleContentShow.bind(this, 'showContents')} />
          </label>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='input-container'>
            <label htmlFor='number'>
              Add the box number
            </label>
            <input
              type='number'
              name='number'
              placeholder='Box #'
              onChange={this.handleChange}
              value={this.state.number} />
            <span className='next-box'>Previous box <strong>{this.state.boxes.length}</strong></span>
          </div>
          <div className='input-container'>
            <label htmlFor='location'>
              Which room should this box go in the new house?
            </label>
            <select name='location' value={this.state.location} onChange={this.handleChange}>
              <option>
                Select room
              </option>
              <option value='Kitchen'>
                Kitchen
              </option>
              <option value='Dining Room'>
                Dining Room
              </option>
              <option value='Box Room'>
                Box Room
              </option>
              <option value='Living Room'>
                Living Room
              </option>
              <option value='Bathroom'>
                Bathroom
              </option>
              <option value='Master Bedroom'>
                Master Bedroom
              </option>
              <option value='Guest Room'>
                Guest Room
              </option>
              <option value='Cols Room'>
                Cols Room
              </option>
              <option value='Als Room'>
                Als Room
              </option>
              <option value='Garden Shed'>
                Garden Shed
              </option>
            </select>
          </div>
          <div className='input-container'>
            <label htmlFor='contents'>
              What is in the box? (Each item on it's own line)
            </label>
            <textarea
              name='contents'
              placeholder='What does the box contain?'
              onChange={this.handleChange}
              value={this.state.contents} />
          </div>
          <button>
            Update box
          </button>
        </form>
        <ul>
          {this.showBoxes(this.state.orderBy)}
        </ul>
      </div>
    )
  }
}

export default App
