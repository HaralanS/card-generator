import { useEffect, useState } from 'react';
import {initializeApp} from "firebase/app";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";
import Detailsbutton from './Detailsbutton';

const firebaseApp = initializeApp( {
  apiKey: "AIzaSyAH63P77eIezXWsxVhU7A1u7rxe6Jxy-CQ",
  authDomain: "projeto-heroes01.firebaseapp.com",
  projectId: "projeto-heroes01",
});

function Home() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("heroi");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState([]);
  const [cardFilter, setCardFilter] = useState([]);
  const [filterValue, setFilterValue] = useState('todos');

  const db = getFirestore(firebaseApp);
  const cardCollectionRef = collection(db, "card-list");

  async function createCard() {
    const card = await addDoc(cardCollectionRef, {
      name, image, type, description
    })
    // console.log(card)
    location.reload();
  }

  useEffect(() => {
    const getCards = async () => {
      const data = await getDocs(cardCollectionRef);
      setCards(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
      setCardFilter(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }
    getCards()
  }, []);

  async function deleteCard(id) {
    const cardDoc = doc(db, 'card-list', id);
    await deleteDoc(cardDoc);
    location.reload();
  }

  function filterCards() {
    let list = [];
    if (filterValue === 'heroi') {
      list = cards.filter((e) => e.type === 'heroi' ? e : null);
      setCardFilter([...list]);
    } else if (filterValue === 'vilao') {
      list = cards.filter((e) => e.type === 'vilao' ? e : null)
      setCardFilter([...list]);
    } else {
      setCardFilter([...cards]);
    }
  }

  useEffect(() => filterCards(), [filterValue])

  return (
    <>
      <div className='bg-img'>
        <header className='header'>
          <h1 className='main-title'>Gerador de Card de Personagens</h1>
        </header>

        <div className='main-container'>
        <div className='form-container'>
          <label className='form-label'>Nome:</label>
          <input type="text" placeholder='Nome...' value={name} onChange={e => setName(e.target.value)} /><br />
          <label className='form-label' htmlFor="">Url da imagem:</label>
          <input type="text" placeholder='Url da imagem...' value={image} onChange={e => setImage(e.target.value)} /><br />
          <label className='form-label' htmlFor="">Tipo:</label>
          <select value={type}  onChange={e => setType(e.target.value)} required >
          <option value=''>Selecione...</option>
            <option value="heroi">Heroi</option>
            <option value="vilao">Vilao</option>
          </select><br />
          <label className='form-label' htmlFor="">Descricao:</label>
          <textarea cols="30" rows="10" placeholder='Descricao do personagem...' value={description} onChange={e => setDescription(e.target.value)} ></textarea><br />
          <button className='form-button' onClick={createCard}>Criar Card</button>
        </div>

        <div className='filter-box'>
          <h3>Filtre os personagens por tipo:</h3>
          <select value={filterValue} onChange={e => setFilterValue(e.target.value)}  >
          <option value="todos">Todos</option>
          <option value="heroi">Heroi</option>
            <option value="vilao">Vilao</option>
          </select>
        </div>

        <div className='cardlist-container'>
        {cardFilter.map((card) => {
            const cardclass = card.type;
            
            return (
              <div key={card.id} className={`card ${cardclass}` }>
                <h2 className='card-name'>{card.name}</h2>
                <div className='img-box'>
                <img className='card-image' src={card.image} alt={card.name} />
                </div>
                
                <h3 className='card-type'>{card.type}</h3>
                {/* <p className='card-p'>{card.description}</p> */}
                <div className='button-box'>
                  <button className='card-button' onClick={() => {
                    deleteCard(card.id)
                   }}>Excluir</button>
                  <Detailsbutton character={card} />
                </div>
                
              </div>
            )
          })}
        </div>
        </div>

        
        
          
        
      </div>
    </>
  )
}

export default Home