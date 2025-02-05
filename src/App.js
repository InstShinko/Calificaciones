import React, { useState } from 'react';
import logo from './Vblanco.png';
import { db } from './BD/firebase-config';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [grades, setGrades] = useState([]);
  const [course, setCourse] = useState('');
  const [average, setAverage] = useState('');

  const handleInputChange = (e) => {
    setId(e.target.value);
  };

  const fetchGrades = async () => {
    const docRef = doc(db, "Alumnos", id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setCourse(docSnap.data().Curso);
      setAverage(docSnap.data().Promedio);

      const creditosCollection = collection(docRef, "Creditos");
      const querySnapshot = await getDocs(creditosCollection);
      const gradesList = querySnapshot.docs.map(doc => doc.data());
      setGrades(gradesList);
    } else {
      console.log("No such document!");
      setCourse('');
      setAverage('');
      setGrades([]);
    }
  };

  return (
    <div className='App'>

      <img src={logo} className="App-logo m-3" alt="logo" />

      
      <div className='container'>
        <div className='row'>
        <div className='col-9'>
         
        <input 
        className='form-control m-1'
        type="number" 
        placeholder="Ingrese ID del estudiante" 
        value={id} 
        onChange={handleInputChange} 
        />
         
        </div>

        <div className='col-3'>
        <button
        className='btn btn-primary  m-1 w-100'
        onClick={fetchGrades}>Buscar
        </button>
        </div>
     
        </div>
      
      </div>
    <div>
    {course && <h2>Curso: {course}</h2>}
    {average && <h2>Promedio: {average}</h2>}
    </div>
      {grades.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th>Materia</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.Materia}</td>
                <td>{grade.Calificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;