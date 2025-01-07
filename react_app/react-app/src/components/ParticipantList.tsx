import React, { useEffect, useState } from 'react';

interface Participant {
  id: string;
  name: string;
  role: string;
}

interface ParticipantListProps {
  onSearch: (participant: Participant) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({ onSearch }) => {
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch('/api/participants'); // Replace with your actual API endpoint.
        if (!response.ok) {
          throw new Error('Failed to fetch participants');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Error fetching participants:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  if (isLoading) {
    return <p>Loading participants...</p>;
  }

  if (isError) {
    return <p>Error loading participants. Please try again later.</p>;
  }

  if (!participants || participants.length === 0) {
    return <p>No participants found.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">Participants</h3>
      <ul>
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSearch(participant)}
          >
            {participant.name} ({participant.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
