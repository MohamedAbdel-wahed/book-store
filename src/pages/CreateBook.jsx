// @refresh reset 
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {firestore,timestamp} from '../firebase'

function CreateBook() {
  const history= useHistory()

  const [name,setName]= useState("")
  const [category,setCategory]= useState("")
  const [description,setDescription]= useState("")

  const handleSubmit= (e)=> {
    e.preventDefault()
    firestore.collection('books').add({ name, category, description,createdAt: timestamp() })
    history.push("/books")
  }

  return (
    <div className="createForm_container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">Add New Book</h1>
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="field"
            placeholder="Book Name"
            required
          />
        </div>
        <div>
          <select
            className="field"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              select category
            </option>
            <option value="classics">classics</option>
            <option value="history">history</option>
            <option value="detective">detective</option>
            <option value="fantasy">fantasy</option>
            <option value="adventure">adventure</option>
            <option value="horror">horror</option>
            <option value="comic">comic</option>
          </select>
        </div>
        <div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
            rows="3"
            className="field"
            placeholder="Book Description"
            required
          ></textarea>
        </div>
        <div>
          <button className="createBtn">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBook
