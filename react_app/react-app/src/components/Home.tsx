import React, { useState} from 'react';
import { useAuth } from '../hooks/useAuth';
import useFetch from "../hooks/useFetch";
import { ParticipantList, ParticipantForm, SearchBar, Leaderboard } from './components';
// To do- fix the home page, push to github, remove leaderboard, debug the frontend

const Home: React.FC= () => {
    const { user } = useAuth();
    const { data: participants, isLoading, isError} = useFetch<any[]>('../nodejs_web_server/getParticipants'), headers: {  Authorization: `Bearer ${user.token}`};    //Change the address from where to fetch.
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

    const handleSearch = (id: number) => {
        
        useFetch(`https://localhost:5000/employees/:${id}`);
    };

    const handleEdit = (participant: any) => {
        setSelectedParticipant(participant);
    };

    const handleDelete = (participant: any) => {
        useFetch(`/participants/${participant.id}`, { method: 'DELETE' });
    };
    
    return (
        <div className='flex flex-col min h-screen bg-gray-100'>
            <header className='bg-blue-500 text-white p-4'>
                <h1 className = "text-3xl font-bold"> Welcome to MentorSHPE 2025</h1>
            </header>
            <main className='p-4'>
                <div className = "mb-4">
                    <h2 className='text-xl font-bold text-grey-800'>Event Management</h2>
                    <ParticipantList participants = {participants} onSearch = {handleSearch}/>
                </div>
                <div className='mb-4'>
                    <h2 className='text-xl font-bold text-gray-800'> MentorSHPE Leaderboard </h2>
                        <div className='mb-4'>
                            <Leaderboard> </Leaderboard>
                        </div>   
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Search Participants</h2>
                        <SearchBar onSearch={handleSearch} />
                </div>
                {user && (
                    <>
                        {user.role === 'admin' && (
                             <div className = "mb-4">
                             <h2 className='text-xl font-bold text-gray-800'> Admin panel</h2>
                             <ParticipantForm 
                                 onAdd = {(participant: any)=> useFetch('/api/participants', { method: 'POST', body: participant})}
                                 onEdit = {(participant: any)=> useFetch(`/api/participants/${participant.id}`, { method: 'PUT', body: participant})}
                                 onDelete = {(participant: any) => useFetch (`/api/participants/${participant.id}`, { method: 'DELETE'})}
                                 selectedParticipant = {selectedParticipant}
                             />
                         </div>
                        )}

                        {user.role === 'editor' && (
                            <div className = "mb-4">
                                <h2 className='text-xl font-bold text-gray-800'> Editor panel</h2>
                                <ParticipantForm
                                    onEdit = {(participant: any)=> useFetch(`/api/participants/${participant.id}`, { method: 'PUT', body: participant})}
                                    selectedParticipant = {selectedParticipant}
                                />
                            </div>
                        )}
                    </>
                )}
                
            </main>
        </div>
    )
}

export default Home
