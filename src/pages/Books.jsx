// @refresh reset 
import {useState,useEffect} from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import {firestore} from '../firebase'


firestore.enablePersistence()
.catch(err=>{
  if (err.code === "failed-precondition") 
    console.log("persistence failed!")
  else if (err.code === "unimplemented")
    console.log("lack of browser support!")
})

function Books(){

  const [books,setBooks]= useState([])
  
  useEffect(()=> {
    const unsub= firestore
      .collection("books")
      .orderBy("createdAt","desc")
      .onSnapshot(snapshot => {
        let documents= []
        snapshot.forEach(doc => {
          documents.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setBooks(documents)
      })

    return ()=> unsub()
  },[])

  const deleteBook = (id)=> {
    firestore.collection('books').doc(id).delete()
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <div className="books__container">
      {
        books?.map((book) => (
          <div key={book.id} className="book">
            <div className="head">
              <div className="info">
                <h1>{book.name}</h1>
                <h4>{book.category}</h4>
              </div>
              <div className="actions">
                <button onClick={()=> deleteBook(book.id)} className="deleteBtn">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <div className="desc">{book.description}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Books