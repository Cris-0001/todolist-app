import React, {useState} from "react";

type Props = {
    onTaksCreated: ()=> void;
};

const AddTaskForm:React.FC<Props> = ({ onTaksCreated}) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Enviando título:", title);


        if (!title.trim()) return;

        try{
            const res = await fetch('http://localhost:5000/api/tasks',{
                method: 'Post',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({title})
            });

            if (res.ok){
                setTitle('');
                onTaksCreated(); // Esto recarga la lista
            }else{
                console.log('Error al crear tarea');
            }
        }catch(error){
            console.error('Error al conectar al servidor', error);
        }
    };

    return(
        <form onSubmit={handleSubmit} style={{marginBottom: '1rem'}}>
            <input
            type="text"
            placeholder="Nueva tarea..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{padding: '0.5rem', marginRight: '0.5rem', width: '300px'}}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default AddTaskForm;